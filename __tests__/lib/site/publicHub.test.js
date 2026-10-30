/** @jest-environment node */
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const assert = require('node:assert/strict')
const runCase =
  typeof globalThis.test === 'function'
    ? globalThis.test
    : require('node:test').test
const root = path.resolve(__dirname, '../../..')

function load(relative, names, dependencies = {}) {
  const source = fs
    .readFileSync(path.join(root, relative), 'utf8')
    .replace(/^import[^\n]*\n/gm, '')
    .replace(/^export /gm, '')
  const context = { module: { exports: {} }, ...dependencies }
  vm.runInNewContext(
    `${source}\nmodule.exports = { ${names.join(', ')} }`,
    context
  )
  return context.module.exports
}

const access = load('lib/security/articleAccess.js', ['isProtectedPost'])
const urls = load('lib/utils/postTitleUrl.js', [
  'encodePostPath',
  'resolvePostSlugBase'
])
const { buildPublicHub, PUBLIC_HUB_LIMIT } = load(
  'lib/site/publicHub.js',
  ['buildPublicHub', 'PUBLIC_HUB_LIMIT'],
  { ...access, ...urls }
)
const post = (overrides = {}) => ({
  id: 'public',
  slug: 'public-note',
  title: 'Public note',
  category: ['道'],
  type: 'Post',
  status: 'Published',
  publishDate: 1,
  ...overrides
})
const plain = value => JSON.parse(JSON.stringify(value))

runCase('only published entries enter the public hub', () => {
  const data = buildPublicHub([
    post(),
    ...['Invisible', 'Draft', 'Deleted', undefined].map((status, i) =>
      post({ id: `hidden-${i}`, status })
    )
  ])
  assert.deepEqual(
    plain(data.posts).map(item => item.id),
    ['public']
  )
})

runCase('password protected and protected DTO entries are omitted', () => {
  const data = buildPublicHub([
    post({ password: 'SECRET' }),
    post({ id: 'locked', protected: true })
  ])
  assert.equal(data.posts.length, 0)
})

runCase('the three content domains use the same published objects', () => {
  const data = buildPublicHub(
    ['我的存在', '我们的存在', '道', '术'].map((category, i) =>
      post({ id: `p-${i}`, category })
    )
  )
  assert.deepEqual(
    plain(data.posts).map(item => item.domain),
    ['existence', 'existence', 'dao', 'shu']
  )
})

runCase('unrelated categories and non-content page types stay out', () => {
  const data = buildPublicHub([
    post({ category: ['友情链接'] }),
    post({ type: 'Member' }),
    post({ type: 'Page' })
  ])
  assert.equal(data.posts.length + data.events.length, 0)
})

runCase('published events are separate and protected events stay out', () => {
  const data = buildPublicHub([
    post({ type: 'Event', category: [] }),
    post({ id: 'locked', type: 'Event', protected: true }),
    post()
  ])
  assert.equal(data.events.length, 1)
  assert.equal(data.events[0].domain, 'event')
  assert.equal(data.posts.length, 0)
})

runCase(
  'the DTO excludes bodies, credentials, personal and registration fields',
  () => {
    const data = buildPublicHub([
      post({
        content: 'PRIVATE_CANARY',
        blockMap: { text: 'PRIVATE_CANARY' },
        privateMetadata: { body: 'PRIVATE_CANARY' },
        email: 'PRIVATE_CANARY',
        registrations: ['PRIVATE_CANARY']
      })
    ])
    assert.equal(JSON.stringify(data).includes('PRIVATE_CANARY'), false)
    assert.deepEqual(
      Object.keys(data.posts[0]).sort(),
      ['id', 'title', 'href', 'summary', 'date', 'domain', 'label'].sort()
    )
  }
)

runCase(
  'deduplication retains the newest entry without changing its stable id',
  () => {
    const data = buildPublicHub([
      post({ title: 'old' }),
      post({ title: 'new', publishDate: 2 })
    ])
    assert.equal(data.posts.length, 1)
    assert.equal(data.posts[0].id, 'public')
    assert.equal(data.posts[0].title, 'new')
  }
)

runCase(
  'newest entries appear first without mutating the source catalogue',
  () => {
    const source = [post({ id: 'old' }), post({ id: 'new', publishDate: 2 })]
    const snapshot = JSON.stringify(source)
    assert.deepEqual(
      plain(buildPublicHub(source).posts).map(item => item.id),
      ['new', 'old']
    )
    assert.equal(JSON.stringify(source), snapshot)
  }
)

runCase(
  'conflicting non-public duplicates prevent public snapshots from returning',
  () => {
    for (const change of [{ status: 'Draft' }, { protected: true }]) {
      for (const publishDate of [undefined, 0, 2]) {
        const data = buildPublicHub([post(), post({ ...change, publishDate })])
        assert.equal(data.posts.length, 0)
      }
    }
  }
)

runCase('bounded payload counts only eligible public objects', () => {
  const pages = Array.from({ length: 30 }, (_, i) =>
    post({ id: `p-${i}`, publishDate: i })
  )
  pages.push(post({ id: 'private', status: 'Draft' }))
  const data = buildPublicHub(pages)
  assert.equal(data.posts.length, PUBLIC_HUB_LIMIT)
  assert.equal(data.postsTotal, 30)
})

runCase('entries without a stable id or original route are omitted', () => {
  const data = buildPublicHub([post({ id: '' }), post({ slug: '' })])
  assert.equal(data.posts.length, 0)
})

runCase('original permalinks are reused and links stay on this site', () => {
  const data = buildPublicHub([post({ slug: 'notes/2026/10/31/book/title' })])
  assert.equal(data.posts[0].href, '/notes/2026/10/31/book')
  for (const slug of [
    'https://example.test/article',
    '//example.test/article',
    'javascript:alert(1)'
  ]) {
    assert.equal(buildPublicHub([post({ slug })]).posts.length, 0)
  }
})

runCase('date and summary fields remain bounded plain values', () => {
  const data = buildPublicHub([
    post({ summary: 'a'.repeat(500), publishDay: { secret: 'PRIVATE_CANARY' } })
  ])
  assert.equal(data.posts[0].summary.length, 180)
  assert.equal(data.posts[0].date, '')
  assert.equal(
    buildPublicHub([post({ publishDay: '2026-10-31' })]).posts[0].date,
    '2026-10-31'
  )
})

runCase('missing catalogues produce an honest empty state', () => {
  for (const source of [undefined, null, {}, []]) {
    assert.deepEqual(plain(buildPublicHub(source)), {
      posts: [],
      events: [],
      postsTotal: 0,
      eventsTotal: 0
    })
  }
})

async function routeProps(relative) {
  let source = fs.readFileSync(path.join(root, relative), 'utf8')
  source = source.slice(source.indexOf('export async function getStaticProps'))
  const paths = source.indexOf('export async function getStaticPaths')
  if (paths >= 0) source = source.slice(0, paths)
  const catalogue = [
    post(),
    post({ id: 'draft', status: 'Draft' }),
    post({ id: 'event', type: 'Event' })
  ]
  const context = {
    module: { exports: {} },
    process: { env: {} },
    fetchGlobalAllData: async () => ({
      allPages: structuredClone(catalogue),
      latestPosts: [],
      NOTION_CONFIG: {}
    }),
    buildPublicHub,
    finalizeListPageProps: props => {
      delete props.allPages
      return props
    },
    isOurBeingsCategory: value => value === '我们的存在',
    isExistenceCategory: () => false,
    OUR_BEINGS_CATEGORY: '我们的存在',
    EXISTENCE_CATEGORY: '我的存在',
    BLOG: { NEXT_REVALIDATE_SECOND: 60 },
    siteConfig: (key, fallback) => fallback
  }
  vm.runInNewContext(
    `${source.replace(/^export /gm, '')}\nmodule.exports = getStaticProps`,
    context
  )
  return context.module.exports({
    params: { category: '我们的存在', page: '2' },
    locale: 'zh-CN'
  })
}

for (const relative of [
  'pages/our-beings/index.js',
  'pages/category/[category]/index.js',
  'pages/category/[category]/page/[page].js'
]) {
  runCase(
    `the real route publishes the same hub DTO: ${relative}`,
    async () => {
      const { props } = await routeProps(relative)
      assert.equal(props.publicHub.posts.length, 1)
      assert.equal(props.publicHub.events.length, 1)
      assert.equal(props.publicHub.posts[0].id, 'public')
      assert.equal('allPages' in props, false)
    }
  )
}
