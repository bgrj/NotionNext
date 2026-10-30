/** @jest-environment node */
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const assert = require('node:assert/strict')
const runCase =
  typeof globalThis.test === 'function'
    ? globalThis.test
    : require('node:test').test

const root = process.env.SOURCE_ROOT
  ? path.resolve(process.env.SOURCE_ROOT)
  : path.resolve(__dirname, '../../..')

// Adapt static ESM imports for this isolated test; SDKs are injected below.
// The application functions themselves execute unchanged.
function loadModule(relativePath, dependencies = {}, extraExports = []) {
  let source = fs.readFileSync(path.join(root, relativePath), 'utf8')
  const names = [
    ...source.matchAll(/^export\s+(?:async\s+)?(?:const|function)\s+(\w+)/gm)
  ].map(match => match[1])
  for (const match of source.matchAll(/^export default (?:async )?function (\w+)/gm)) {
    names.push(match[1])
  }
  source = source
    .replace(/^import\s+[\s\S]*?\sfrom\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
    .replace(/^export default /gm, '')
    .replace(/^export /gm, '')
  const sandbox = {
    module: { exports: {} },
    console: { error() {}, warn() {}, log() {} },
    process: { env: { NOTION_TOKEN: 'synthetic-test-token' } },
    ...dependencies
  }
  vm.runInNewContext(
    `${source}\nmodule.exports = { ${[...names, ...extraExports].join(', ')} }`,
    sandbox,
    { filename: relativePath }
  )
  return sandbox.module.exports
}

function application() {
  const existence = loadModule('themes/my-theme/existence.js')
  const beings = loadModule('themes/my-theme/beings.js', existence)
  const clerk = loadModule('lib/beings/clerkClient.js', beings)
  return { beings, clerk }
}

function userWith(writings, isPublic = true) {
  return {
    id: 'user_synthetic',
    primaryEmailAddress: { emailAddress: 'reader@example.test' },
    publicMetadata: {
      handle: 'reader', seat: 2, public: isPublic, name: 'Reader'
    },
    privateMetadata: { writings }
  }
}

const nonPublicValues = [false, undefined, null, 'false', 'true', 1, {}]

runCase('new website writing stays private without an explicit choice', () => {
  const { beings } = application()
  const writing = beings.sanitizeWriting({ room: 'dao', body: 'Synthetic note' })
  assert.equal(writing.public, false)
})

runCase('public author view contains only explicitly public writing', () => {
  const { clerk } = application()
  const writings = [
    { id: 'public', public: true },
    ...nonPublicValues.map((flag, index) => ({ id: `private-${index}`, public: flag }))
  ]
  const result = clerk.publicWritingsOf(userWith(writings))
  assert.equal(JSON.stringify(result.map(item => item.id)), '["public"]')
})

runCase('the complete public profile lookup does not expose string false content', async () => {
  const { clerk } = application()
  const user = userWith([
    { id: 'private', public: 'false', body: 'PRIVATE_CANARY' },
    { id: 'public', public: true, body: 'Public note' }
  ])
  const client = { users: { getUserList: async () => ({ data: [user] }) } }
  const result = await clerk.findPublicBeingRecord(client, 'reader')
  assert.equal(result.writings.length, 1)
  assert.equal(result.writings[0].id, 'public')
  assert.equal(JSON.stringify(result).includes('PRIVATE_CANARY'), false)
})

runCase('a private profile is not returned even with an explicitly public item', async () => {
  const { clerk } = application()
  const user = userWith([{ id: 'public', public: true }], false)
  const client = { users: { getUserList: async () => ({ data: [user] }) } }
  assert.equal(await clerk.findPublicBeingRecord(client, 'reader'), null)
})

function notionPublisher() {
  const { beings } = application()
  const calls = { constructed: 0, retrieved: 0, created: [], updated: [] }
  class Client {
    constructor() {
      calls.constructed += 1
      this.databases = {
        retrieve: async () => {
          calls.retrieved += 1
          return {
            properties: {
              title: { type: 'title' }, type: { type: 'select' },
              category: { type: 'select' }, status: { type: 'select' }
            }
          }
        }
      }
      this.pages = {
        create: async request => {
          calls.created.push(request)
          return { id: 'synthetic-page' }
        },
        update: async request => { calls.updated.push(request) }
      }
    }
  }
  return {
    calls,
    publisher: loadModule('lib/beings/notionStore.js', { ...beings, Client })
  }
}

for (const flag of nonPublicValues) {
  const label = flag && typeof flag === 'object' ? 'object' : JSON.stringify(flag)
  runCase(`Notion publication skips non-public flag ${label}`, async () => {
    const { publisher, calls } = notionPublisher()
    const writing = { id: 'note', room: 'dao', title: 'A note', body: 'PRIVATE_CANARY', public: flag }
    const result = await publisher.publishWritingToSite({ handle: 'reader', name: 'Reader' }, writing)
    assert.equal(result.skipped, true)
    assert.equal(calls.constructed, 0)
    assert.equal(calls.created.length, 0)
    assert.equal(calls.updated.length, 0)
  })
}

runCase('explicit public choice still creates the expected Notion publication', async () => {
  const { publisher, calls } = notionPublisher()
  const result = await publisher.publishWritingToSite(
    { handle: 'reader', name: 'Reader' },
    { id: 'note', room: 'dao', title: 'A note', body: 'Public note', public: true }
  )
  assert.equal(result.created, true)
  assert.equal(calls.created.length, 1)
  assert.equal(calls.created[0].properties.status.select.name, 'Published')
})

runCase('existing explicitly public Notion publication can still be updated', async () => {
  const { publisher, calls } = notionPublisher()
  const result = await publisher.publishWritingToSite(
    { handle: 'reader', name: 'Reader' },
    { id: 'note', room: 'shu', public: true, notionPageId: 'synthetic-existing' }
  )
  assert.equal(result.updated, true)
  assert.equal(calls.updated.length, 1)
  assert.equal(calls.created.length, 0)
})

function apiSync() {
  const { beings } = application()
  const calls = { archive: 0, publication: 0, revalidated: [] }
  const api = loadModule('pages/api/beings/me.js', {
    ...beings,
    isNotionWriteEnabled: () => true,
    upsertBeingArchive: async () => { calls.archive += 1 },
    publishWritingToSite: async (being, writing) => {
      calls.publication += 1
      return { writing, category: '道' }
    },
    notionWarningOf: () => 'synthetic-error'
  }, ['syncNotion'])
  return { api, calls }
}

for (const flag of nonPublicValues) {
  const label = flag && typeof flag === 'object' ? 'object' : JSON.stringify(flag)
  runCase(`API sync does not dispatch publication for flag ${label}`, async () => {
    const { api, calls } = apiSync()
    await api.syncNotion({
      being: { handle: 'reader' }, writing: { public: flag },
      res: { revalidate: async route => calls.revalidated.push(route) }
    })
    assert.equal(calls.archive, 1)
    assert.equal(calls.publication, 0)
    assert.equal(calls.revalidated.length, 0)
  })
}

runCase('API sync still publishes an explicit public item', async () => {
  const { api, calls } = apiSync()
  await api.syncNotion({
    being: { handle: 'reader' }, writing: { public: true },
    res: { revalidate: async route => calls.revalidated.push(route) }
  })
  assert.equal(calls.publication, 1)
  assert.equal(calls.revalidated.length, 2)
})
