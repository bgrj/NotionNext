/** @jest-environment node */
import {
  adminSessionValid,
  beginAdminScan,
  confirmAdminScan,
  readAdminScan
} from '@/lib/activities/adminScan'

function memoryRedis() {
  const data = new Map()
  return {
    async get(key) {
      return data.has(key) ? data.get(key) : null
    },
    async set(key, value, ...args) {
      if (args.includes('NX') && data.has(key)) return null
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
  test('asks for the admin key before any wechat is bound', async () => {
    const redis = memoryRedis()
    const renderCode = jest.fn()
    const result = await beginAdminScan(redis, { purpose: 'enter', renderCode })
    expect(result.unbound).toBe(true)
    expect(renderCode).not.toHaveBeenCalled()
  })

  test('binds the scanning wechat and later admits only that wechat', async () => {
    const redis = memoryRedis()
    const renderCode = jest.fn(async () => 'img')
    const bind = await beginAdminScan(redis, { purpose: 'bind', renderCode })
    await confirmAdminScan(redis, { ticket: bind.ticket, openId: 'owner-openid' })
    expect((await readAdminScan(redis, bind.ticket)).status).toBe('bound')

    const entry = await beginAdminScan(redis, { purpose: 'enter', renderCode })
    await expect(
      confirmAdminScan(redis, { ticket: entry.ticket, openId: 'other-openid' })
    ).rejects.toMatchObject({ code: 'admin_wechat_denied' })

    await confirmAdminScan(redis, { ticket: entry.ticket, openId: 'owner-openid' })
    const approved = await readAdminScan(redis, entry.ticket)
    expect(approved.status).toBe('approved')
    expect(approved.session).toMatch(/^scan_[A-Za-z0-9_-]{43}$/)
    expect(await adminSessionValid(redis, approved.session)).toBe(true)
    expect(await adminSessionValid(redis, 'scan_' + 'a'.repeat(43))).toBe(false)
  })

  test('an expired ticket cannot be confirmed', async () => {
    const redis = memoryRedis()
    await expect(
      confirmAdminScan(redis, { ticket: 'a'.repeat(32), openId: 'owner-openid' })
    ).rejects.toMatchObject({ code: 'invalid_ticket' })
  })
})
