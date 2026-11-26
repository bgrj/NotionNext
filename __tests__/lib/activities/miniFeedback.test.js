/** @jest-environment node */
import sharp from 'sharp'
import { feedbackKey, submitMiniFeedback, validateFeedback } from '@/lib/activities/miniFeedback'
const actor = { id: 'wx:app:owner', user: { number: 7 } }
const input = { description: '打开首页之后点击活动封面，等待一分钟仍然不能进入详情页面。',
  contact: 'test-wechat', severity: 'major', clientRequestId: 'feedback-test-123456', screenshots: [] }
function database() {
  const rows = new Map()
  return { rows, get: jest.fn(async key => rows.get(key) || null), eval: jest.fn(async (_script, _count, key, _quota, _index, value) => {
    if (!rows.has(key)) rows.set(key, value)
    return rows.get(key)
  }) }
}
test('feedback uses authenticated identity, a fixed pending reward, and a private receipt', async () => {
  const redis = database()
  const result = await submitMiniFeedback(redis, actor, { ...input, rewardFen: 9999, status: 'paid', owner: 'forged' })
  expect(result).toMatchObject({ status: 'pending', rewardFen: 500 })
  expect(Object.keys(result).sort()).toEqual(['createdAt', 'id', 'rewardFen', 'status'])
  const row = JSON.parse(redis.rows.get(feedbackKey(result.id)))
  expect(row.owner).toMatch(/^[a-f0-9]{64}$/)
  expect(row.userNumber).toBe(7)
  expect(row.contact).toBe(input.contact)
  expect(JSON.stringify(result)).not.toContain(input.contact)
  expect(redis.eval.mock.calls[0]).toContain(90 * 86400)
})
test('a lost-response retry returns the same receipt and never stores another reward', async () => {
  const redis = database()
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
  const result = await submitMiniFeedback(redis, actor, { ...input, screenshots: [bytes.toString('base64')] })
  const row = JSON.parse(redis.rows.get(feedbackKey(result.id)))
  const meta = await sharp(Buffer.from(row.screenshots[0], 'base64')).metadata()
  expect(meta.width).toBeLessThanOrEqual(960)
  expect(meta.height).toBeLessThanOrEqual(1280)
  expect(meta.exif).toBeUndefined()
  expect([...redis.rows.keys()]).not.toContain(expect.stringContaining('cover:'))
  expect(result.screenshots).toBeUndefined()
})
test('invalid data and images cannot be saved; quotas fail explicitly', async () => {
  const redis = database()
  await expect(submitMiniFeedback(redis, null, input)).rejects.toMatchObject({ status: 401 })
  for (const patch of [{ description: '短' }, { contact: '' }, { severity: 'forged' }, { clientRequestId: '../id' }, { screenshots: Array(5).fill('a') }, { screenshots: ['https://example.com/private.png'] }])
    expect(() => validateFeedback({ ...input, ...patch })).toThrow()
  await expect(submitMiniFeedback(redis, actor, { ...input, screenshots: [Buffer.from('invalid').toString('base64')] }))
    .rejects.toMatchObject({ code: 'invalid_feedback_image' })
  expect(redis.eval).not.toHaveBeenCalled()
  redis.eval.mockResolvedValue('limited')
  await expect(submitMiniFeedback(redis, actor, input)).rejects.toMatchObject({ code: 'feedback_limit', status: 429 })
})
