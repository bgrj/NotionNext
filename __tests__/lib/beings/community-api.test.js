/** @jest-environment node */
import { createCommunityHandler } from '@/pages/api/ourbeings/v1/[[...path]]'
import { createMemoryCommunityStore } from '@/lib/beings/community/model'

jest.mock('@/lib/beings/community/blobStore', () => ({
  communityBlobStore: jest.fn(),
  communityStorageEnabled: () => false
}))
jest.mock('@/lib/beings/community/server', () => ({
  requestCommunityActor: jest.fn(),
  sameOriginMutation: jest.requireActual('@/lib/beings/community/server')
    .sameOriginMutation
}))
let store, count
beforeEach(() => {
  store = createMemoryCommunityStore()
  count = 0
})
const call = async ({
  actor = null,
  method = 'GET',
  path = ['workspace'],
  query = {},
  body,
  headers = {},
  enabled = true
} = {}) => {
  const res = {
    statusCode: 200,
    headers: {},
    setHeader: jest.fn((key, value) => {
      res.headers[key] = value
    }),
    status: jest.fn(code => {
      res.statusCode = code
      return res
    }),
    json: jest.fn(data => {
      res.body = data
      return res
    })
  }
  const handler = createCommunityHandler({
    storeFactory: () => store,
    enabled: () => enabled,
    actorOf: async () => actor,
    now: () => Date.parse('2026-10-31T04:00:00Z'),
    id: () => `id_${++count}`
  })
  await handler(
    {
      method,
      query: { path, ...query },
      body,
      headers: { host: 'ourbeings-preview.example.invalid', ...headers }
    },
    res
  )
  return res
}
test('anonymous private query and command return 401 with private no-store headers', async () => {
  for (const method of ['GET', 'POST']) {
    const result = await call({
      method,
      path: method === 'POST' ? ['commands'] : ['workspace'],
      body: { type: 'content.create', input: { title: 'secret' } }
    })
    expect(result.statusCode).toBe(401)
    expect(result.headers['Cache-Control']).toContain('no-store')
    expect(JSON.stringify(result.body)).not.toContain('secret')
  }
})
test('owner is derived from the verified request, never from posted ownerId or query', async () => {
  const result = await call({
    actor: { id: 'user_A' },
    method: 'POST',
    path: ['commands'],
    body: {
      type: 'content.create',
      input: {
        title: 'A',
        kind: 'journal',
        ownerId: 'user_B',
        visibility: 'public'
      }
    }
  })
  expect(result.statusCode).toBe(200)
  expect(result.body.data.ownerId).toBe('user_A')
  expect(result.body.data.visibility).toBe('private')
  const foreign = await call({
    actor: { id: 'user_B' },
    path: ['content', result.body.data.id],
    query: { ownerId: 'user_A' }
  })
  expect(foreign.statusCode).toBe(404)
})
test.each([
  { origin: 'https://external.example.invalid' },
  { 'sec-fetch-site': 'cross-site' },
  { origin: 'not a url' }
])(
  'cross-site mutations are rejected before changing storage %#',
  async headers => {
    const result = await call({
      actor: { id: 'user_A' },
      method: 'POST',
      path: ['commands'],
      headers,
      body: { type: 'content.create', input: { title: 'A' } }
    })
    expect(result.statusCode).toBe(403)
    expect(Object.keys((await store.read()).state.contents)).toHaveLength(0)
  }
)
test('same-origin form mutation succeeds and never trusts a moderator flag in body', async () => {
  const result = await call({
    actor: { id: 'user_A' },
    method: 'POST',
    path: ['commands'],
    headers: { origin: 'https://ourbeings-preview.example.invalid' },
    body: {
      type: 'review.decide',
      input: {
        moderator: true,
        kind: 'contents',
        id: 'unknown',
        revision: 1,
        approve: true
      }
    }
  })
  expect(result.statusCode).toBe(403)
})
test('disabled storage explicitly reports unavailable instead of saved-success', async () => {
  const result = await call({ enabled: false, path: ['status'] })
  expect(result.body.storage).toBe(false)
  const publicResult = await call({ enabled: false, path: ['feed'] })
  expect(publicResult.body.data).toMatchObject({ items: [], unavailable: true })
})
test('unsupported methods and malformed command bodies are rejected', async () => {
  expect((await call({ method: 'DELETE' })).statusCode).toBe(405)
  expect(
    (
      await call({
        method: 'POST',
        path: ['commands'],
        actor: { id: 'user_A' },
        body: []
      })
    ).statusCode
  ).toBe(400)
})
test('unknown storage errors return no internal token, body or SDK payload', async () => {
  const res = {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }
  const handler = createCommunityHandler({
    storeFactory: () => {
      throw new Error('private-secret-canary')
    },
    enabled: () => true,
    actorOf: async () => ({ id: 'user_A' }),
    id: () => 'request_safe'
  })
  await handler(
    { method: 'GET', query: { path: ['workspace'] }, headers: {} },
    res
  )
  expect(res.status).toHaveBeenCalledWith(503)
  expect(JSON.stringify(res.json.mock.calls)).not.toContain(
    'private-secret-canary'
  )
})
