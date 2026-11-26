/** @jest-environment node */
import {
  adminSessionValid,
  beginAdminScan,
  confirmAdminScan,
  confirmAdminScanIfPending,
  confirmWebScan,
  miniProgramAdminImage,
  readAdminScan
} from '@/lib/activities/adminScan'

function memoryRedis() {
  const data = new Map()
  return {
    async get(key) {
      return data.has(key) ? data.get(key) : null
    },
    async set(key, value) {
      data.set(key, String(value))
      return 'OK'
    },
    async incr(key) {
      const next = Number(data.get(key) || 0) + 1
      data.set(key, String(next))
      return next
    },
    async expire() {
      return 1
    }
  }
}

describe('admin wechat scan', () => {
  test('a webpage confirmation does not admit any WeChat account', async () => {
    const redis = memoryRedis()
    const scan = await beginAdminScan(redis)
    expect(scan.ticket).toMatch(/^[a-f0-9]{32}$/)
    expect(scan.url).toBeUndefined()
    await expect(confirmWebScan(redis, scan.ticket)).rejects.toMatchObject({
      code: 'admin_wechat_denied',
      status: 403
    })
    expect((await readAdminScan(redis, scan.ticket)).status).toBe('pending')
  })

  test('only the bound WeChat identity can admit the computer', async () => {
    const redis = memoryRedis()
    const owner = 'ownerOpenId_1'
    const bind = await beginAdminScan(redis)
    const raw = await redis.get('wuzai:admin-scan:ticket:' + bind.ticket)
    const record = JSON.parse(raw)
    record.purpose = 'bind'
    await redis.set('wuzai:admin-scan:ticket:' + bind.ticket, JSON.stringify(record))
    await confirmAdminScan(redis, { ticket: bind.ticket, openId: owner })

    const scan = await beginAdminScan(redis)
    await expect(
      confirmAdminScan(redis, { ticket: scan.ticket, openId: 'someoneElse_2' })
    ).rejects.toMatchObject({ code: 'admin_wechat_denied', status: 403 })
    await confirmAdminScan(redis, { ticket: scan.ticket, openId: owner })
    const approved = await readAdminScan(redis, scan.ticket)
    expect(approved.status).toBe('approved')
    expect(await adminSessionValid(redis, approved.session)).toBe(true)
  })

  test('an ordinary activity id is not treated as an admin scan', async () => {
    const redis = memoryRedis()
    await expect(
      confirmAdminScanIfPending(redis, {
        ticket: 'a'.repeat(32),
        openId: 'ownerOpenId_1'
      })
    ).resolves.toBeNull()
  })

  test('the mini-program code carries this ticket and not a webpage login', async () => {
    const originalFetch = global.fetch
    process.env.WUZAI_MINI_APP_ID = 'wx-real-app'
    process.env.WUZAI_MINI_APP_SECRET = 'server-only-secret'
    const jpeg = Uint8Array.from([0xff, 0xd8, 0xff, 0x00, 1, 2, 3, 4, 5])
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: async () => ({ access_token: 'token-value' }) })
      .mockResolvedValueOnce({
        headers: { get: () => 'image/jpeg' },
        arrayBuffer: async () => jpeg.buffer.slice(jpeg.byteOffset, jpeg.byteOffset + jpeg.byteLength)
      })
    const image = await miniProgramAdminImage('ab'.repeat(16))
    expect(image.startsWith('data:image/jpeg;base64,')).toBe(true)
    expect(image).not.toContain('server-only-secret')
    const codeCall = fetch.mock.calls[1]
    expect(codeCall[0]).toContain('/wxa/getwxacode?')
    expect(JSON.parse(codeCall[1].body).path).toBe(
      'pages/publish/publish?id=' + 'ab'.repeat(16)
    )
    delete process.env.WUZAI_MINI_APP_ID
    delete process.env.WUZAI_MINI_APP_SECRET
    global.fetch = originalFetch
  })
})
