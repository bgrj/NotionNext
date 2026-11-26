/** @jest-environment node */
import sharp from 'sharp'
import { verifiedBugKey, rewardOwner } from '@/lib/activities/membershipRewards'
import { rewardRedis } from '@/test-support/activities/rewardRedis'
import {
  feedbackIndex,
  feedbackKey,
  getMiniFeedback,
  listMiniFeedback,
  submitMiniFeedback,
  updateMiniFeedbackStatus,
  summarizeFeedback,
  validateFeedback
} from '@/lib/activities/miniFeedback'
const actor = { id: 'wx:app:owner', user: { number: 7 } }
async function alipayCode() {
  return (await sharp({ create: { width: 640, height: 640, channels: 3, background: '#1677ff' } })
    .png()
    .toBuffer()).toString('base64')
}
function database() {
  const rows = new Map()
  const index = []
  const ttl = new Map()
  const rewardDb = rewardRedis()
  return {
    rows,
    get: jest.fn(async key => rows.get(key) || null),
    mget: jest.fn(async keys => keys.map(key => rows.get(key) || null)),
    zcard: jest.fn(async () => index.length),
    zrevrange: jest.fn(async (_key, start, stop) => {
      const end = stop < 0 ? index.length : stop + 1
      return index.slice(start, end)
    }),
    ttl: jest.fn(async key => ttl.get(key) ?? 90 * 86400),
    set: jest.fn(async (key, value, mode, seconds) => {
      rows.set(key, value)
      if (mode === 'EX') ttl.set(key, seconds)
      return 'OK'
    }),
    eval: jest.fn(async (_script, _count, key, _quota, _index, value, _retention, now, id) => {
      if (_script.includes('feedback-review-v2')) {
        rewardDb.rows.set(key, rows.get(key))
        const result = await rewardDb.eval(_script, _count, key, _quota, _index, value, _retention, now, id)
        rows.set(key, rewardDb.rows.get(key))
        return result
      }
      if (!rows.has(key)) {
        rows.set(key, value)
        ttl.set(key, 90 * 86400)
        index.unshift(id)
      }
      return rows.get(key)
    })
  }
}
test('feedback uses authenticated identity, a fixed pending reward, and a private receipt', async () => {
  const redis = database()
  const code = await alipayCode()
  const input = { description: '打开首页之后点击活动封面，等待一分钟仍然不能进入详情页面。',
    alipayCode: code, severity: 'major', clientRequestId: 'feedback-test-123456', screenshots: [] }
  const result = await submitMiniFeedback(redis, actor, { ...input, rewardFen: 9999, status: 'paid', owner: 'forged' })
  expect(result).toMatchObject({ status: 'pending', rewardFen: 500 })
  expect(Object.keys(result).sort()).toEqual(['createdAt', 'id', 'rewardFen', 'status'])
  const row = JSON.parse(redis.rows.get(feedbackKey(result.id)))
  expect(row.owner).toMatch(/^[a-f0-9]{64}$/)
  expect(row.userNumber).toBe(7)
  expect(row.alipayCode).toMatch(/^[A-Za-z0-9+/]+={0,2}$/)
  expect(row.contact).toBeUndefined()
  expect(JSON.stringify(result)).not.toContain(code)
  expect(redis.eval.mock.calls[0]).toContain(90 * 86400)
})

test('re-reviewing the same bug never inflates its membership contribution, and invalidation removes it', async () => {
  const db = rewardRedis()
  const owner = rewardOwner(actor)
  const id = 'c'.repeat(32)
  db.rows.set(feedbackKey(id), JSON.stringify({ id, owner, severity: 'minor', status: 'pending' }))
  await updateMiniFeedbackStatus(db, id, { status: 'reviewed' })
  await updateMiniFeedbackStatus(db, id, { status: 'paid' })
  expect(await db.scard(verifiedBugKey(owner))).toBe(1)
  await updateMiniFeedbackStatus(db, id, { status: 'duplicate' })
  expect(await db.scard(verifiedBugKey(owner))).toBe(0)
  await updateMiniFeedbackStatus(db, id, { status: 'rejected' })
  expect(await db.scard(verifiedBugKey(owner))).toBe(0)
})

test('suggestions never count; previously accepted bug IDs survive image retention expiry', async () => {
  const db = rewardRedis()
  const owner = rewardOwner(actor)
  const id = 'd'.repeat(32)
  db.rows.set(feedbackKey(id), JSON.stringify({ id, owner, severity: 'suggestion', status: 'pending' }))
  await updateMiniFeedbackStatus(db, id, { status: 'paid' })
  expect(await db.scard(verifiedBugKey(owner))).toBe(0)
  db.rows.set(feedbackKey(id), JSON.stringify({ id, owner, severity: 'major', status: 'reviewed' }))
  db.reports.push(id)
  const { readAnnualMembership } = require('@/lib/activities/annualMembership')
  await readAnnualMembership(db, actor)
  db.rows.delete(feedbackKey(id))
  expect((await readAnnualMembership(db, actor)).offers.find(offer => offer.id === 'beta').count).toBe(1)
})
test('a lost-response retry returns the same receipt and never stores another reward', async () => {
  const redis = database()
  const input = { description: '打开首页之后点击活动封面，等待一分钟仍然不能进入详情页面。',
    alipayCode: await alipayCode(), severity: 'major', clientRequestId: 'feedback-test-123456', screenshots: [] }
  const first = await submitMiniFeedback(redis, actor, input)
  expect(await submitMiniFeedback(redis, actor, input)).toEqual(first)
  expect(redis.eval).toHaveBeenCalledTimes(1)
  await expect(submitMiniFeedback(redis, actor, { ...input, description: input.description + '修改' }))
    .rejects.toMatchObject({ code: 'feedback_conflict', status: 409 })
  const other = await submitMiniFeedback(redis, { ...actor, id: 'wx:app:other' }, input)
  expect(other.id).not.toBe(first.id)
})
test('screenshots are decoded, metadata stripped, resized and kept out of public cover storage', async () => {
  const redis = database()
  const bytes = await sharp({ create: { width: 1800, height: 2600, channels: 3, background: '#faf7f1' } }).png().toBuffer()
  const input = { description: '打开首页之后点击活动封面，等待一分钟仍然不能进入详情页面。',
    alipayCode: await alipayCode(), severity: 'major', clientRequestId: 'feedback-test-123456',
    screenshots: [bytes.toString('base64')] }
  const result = await submitMiniFeedback(redis, actor, input)
  const row = JSON.parse(redis.rows.get(feedbackKey(result.id)))
  const meta = await sharp(Buffer.from(row.screenshots[0], 'base64')).metadata()
  expect(meta.width).toBeLessThanOrEqual(960)
  expect(meta.height).toBeLessThanOrEqual(1280)
  expect(meta.exif).toBeUndefined()
  expect([...redis.rows.keys()]).not.toContain(expect.stringContaining('cover:'))
  expect(result.screenshots).toBeUndefined()
  expect(result.alipayCode).toBeUndefined()
})
test('description-only feedback is accepted without a screenshot, collection code or severity choice', async () => {
  const redis = database()
  const result = await submitMiniFeedback(redis, actor, { description: '页面卡住', clientRequestId: 'feedback-description-only-123' })
  expect(result).toMatchObject({ status: 'pending', rewardFen: 500 })
  const stored = JSON.parse(redis.rows.get(feedbackKey(result.id)))
  expect(stored).toMatchObject({ description: '页面卡住', alipayCode: '', screenshots: [], severity: 'minor' })
  expect(summarizeFeedback(stored).hasAlipayCode).toBe(false)
  expect((await listMiniFeedback(redis)).items[0].screenshotCount).toBe(0)
  expect((await getMiniFeedback(redis, result.id)).alipayCode).toBe('')
})

test('blank descriptions and invalid supplied images cannot be saved; quotas fail explicitly', async () => {
  const redis = database()
  const code = await alipayCode()
  const input = { description: '打开首页之后点击活动封面，等待一分钟仍然不能进入详情页面。',
    alipayCode: code, severity: 'major', clientRequestId: 'feedback-test-123456', screenshots: [] }
  await expect(submitMiniFeedback(redis, null, input)).rejects.toMatchObject({ status: 401 })
  for (const patch of [{ description: '' }, { description: ' \n ' }, { description: 'a'.repeat(2001) }, { alipayCode: 'not-base64' }, { alipayCode: 123 }, { severity: 'forged' }, { clientRequestId: '../id' }, { screenshots: null }, { screenshots: Array(5).fill('a') }, { screenshots: ['https://example.com/private.png'] }])
    expect(() => validateFeedback({ ...input, ...patch })).toThrow()
  await expect(submitMiniFeedback(redis, actor, { ...input, screenshots: [Buffer.from('invalid').toString('base64')] }))
    .rejects.toMatchObject({ code: 'invalid_feedback_image' })
  await expect(submitMiniFeedback(redis, actor, { ...input, alipayCode: Buffer.from('invalid').toString('base64') }))
    .rejects.toMatchObject({ code: 'invalid_feedback_image' })
  expect(redis.eval).not.toHaveBeenCalled()
  redis.eval.mockResolvedValue('limited')
  await expect(submitMiniFeedback(redis, actor, input)).rejects.toMatchObject({ code: 'feedback_limit', status: 429 })
})

test('omitted and empty optional fields produce the same retry receipt', async () => {
  const redis = database()
  const input = { description: '点击后没有反应', clientRequestId: 'feedback-optional-retry-123' }
  const first = await submitMiniFeedback(redis, actor, input)
  expect(await submitMiniFeedback(redis, actor, { ...input, alipayCode: '', screenshots: [], severity: 'minor' })).toEqual(first)
  expect(redis.rows.size).toBe(1)
})
test('admin can list, open and update feedback without exposing images in the list', async () => {
  const redis = database()
  const input = { description: '打开首页之后点击活动封面，等待一分钟仍然不能进入详情页面。',
    alipayCode: await alipayCode(), severity: 'major', clientRequestId: 'feedback-admin-123456', screenshots: [] }
  const created = await submitMiniFeedback(redis, actor, input)
  const listed = await listMiniFeedback(redis, { status: 'pending' })
  expect(listed.total).toBe(1)
  expect(listed.items[0]).toMatchObject({ id: created.id, hasAlipayCode: true, status: 'pending' })
  expect(listed.items[0].alipayCode).toBeUndefined()
  expect(listed.items[0].screenshots).toBeUndefined()
  const detail = await getMiniFeedback(redis, created.id)
  expect(detail.alipayCode).toMatch(/^[A-Za-z0-9+/]+={0,2}$/)
  const updated = await updateMiniFeedbackStatus(redis, created.id, { status: 'paid', note: '已转账' })
  expect(updated).toMatchObject({ status: 'paid', note: '已转账' })
  expect(updated.statusLabel).toBe('已发奖')
  expect(JSON.parse(redis.rows.get(feedbackKey(created.id)))).toMatchObject({ status: 'paid', note: '已转账' })
  expect(feedbackIndex).toContain('feedback-index')
})
