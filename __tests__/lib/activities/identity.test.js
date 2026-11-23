import {
  bridgeSignature,
  resolveActivityActor
} from '@/lib/activities/identity'
jest.mock('@clerk/nextjs/server', () => ({ getAuth: () => ({ userId: null }) }))
jest.mock('@/lib/beings/clerkClient', () => ({ getClerkClient: jest.fn() }))

describe('native WeChat cloud gateway authentication', () => {
  const now = Date.parse('2030-01-01T00:00:00Z')
  const secret = 'test-only-bridge-key'
  const appId = 'wx-test-app'
  const makeRequest = (overrides = {}) => {
    const body = {
      action: 'mine',
      identity: { appId, openId: 'valid_openid_123', name: '读者' }
    }
    const timestamp = String(now),
      nonce = 'a'.repeat(32)
    return {
      body,
      headers: {
        'x-wuzai-timestamp': timestamp,
        'x-wuzai-nonce': nonce,
        'x-wuzai-signature': bridgeSignature(secret, timestamp, nonce, body),
        ...overrides
      }
    }
  }
  beforeEach(() => {
    process.env.WUZAI_MINI_APP_ID = appId
    process.env.WUZAI_MINI_BRIDGE_SECRET = secret
  })
  afterEach(() => {
    delete process.env.WUZAI_MINI_APP_ID
    delete process.env.WUZAI_MINI_BRIDGE_SECRET
  })
  test('derives identity only from a signed, fresh, one-use cloud request', async () => {
    const actor = await resolveActivityActor(
      makeRequest(),
      { set: jest.fn().mockResolvedValue('OK') },
      now
    )
    expect(actor).toEqual({
      id: 'wx:wx-test-app:valid_openid_123',
      name: '读者',
      platform: 'wechat'
    })
  })
  test('rejects tampered identities and payloads', async () => {
    const req = makeRequest()
    req.body.identity.openId = 'another_user_123'
    await expect(
      resolveActivityActor(req, { set: jest.fn() }, now)
    ).rejects.toMatchObject({ status: 401 })
  })
  test('rejects stale requests', async () => {
    await expect(
      resolveActivityActor(makeRequest(), { set: jest.fn() }, now + 60001)
    ).rejects.toMatchObject({ status: 401 })
  })
  test('rejects replayed requests', async () => {
    await expect(
      resolveActivityActor(
        makeRequest(),
        { set: jest.fn().mockResolvedValue(null) },
        now
      )
    ).rejects.toMatchObject({ code: 'replayed' })
  })
  test('does not accept unsigned identity fields from the browser', async () => {
    const req = makeRequest()
    delete req.headers['x-wuzai-signature']
    expect(await resolveActivityActor(req, {}, now)).toBeNull()
  })
  test('disabled bridge cannot be used before deployment configuration', async () => {
    delete process.env.WUZAI_MINI_BRIDGE_SECRET
    await expect(
      resolveActivityActor(makeRequest(), {}, now)
    ).rejects.toMatchObject({ status: 401 })
  })
})
