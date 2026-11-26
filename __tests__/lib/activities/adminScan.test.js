/** @jest-environment node */
import {
  adminSessionValid,
  beginAdminScan,
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
  test('a phone confirmation admits the computer that showed the code', async () => {
    const redis = memoryRedis()
    const scan = await beginAdminScan(redis)
    expect(scan.url).toContain('/our-beings/feedback-scan?ticket=')
    expect(scan.url).not.toContain('pages/admin-gate')
    await confirmWebScan(redis, scan.ticket)
    const approved = await readAdminScan(redis, scan.ticket)
    expect(approved.status).toBe('approved')
    expect(approved.session).toMatch(/^scan_[A-Za-z0-9_-]{43}$/)
    expect(await adminSessionValid(redis, approved.session)).toBe(true)
  })

  test('an expired ticket cannot be confirmed', async () => {
    const redis = memoryRedis()
    await expect(confirmWebScan(redis, 'a'.repeat(32))).rejects.toMatchObject({
      code: 'invalid_ticket'
    })
  })
})
