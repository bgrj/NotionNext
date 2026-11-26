/** @jest-environment node */
import {
  adminSessionValid,
  beginAdminScan,
  confirmAdminScan,
  confirmWebScan,
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
    expect(scan.url).toContain('/our-beings/feedback-scan?ticket=')
    expect(scan.url).not.toContain('pages/admin-gate')
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
})
