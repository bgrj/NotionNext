import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { fail, requireActor } from '@/apps/wuzai/miniprogram/common/activities'
import { MINI_PREFIX } from './miniIdentity'

const RETENTION_SECONDS = 90 * 86400
const SEVERITIES = ['suggestion', 'minor', 'major', 'blocking']
const hash = text => createHash('sha256').update(text).digest('hex')
export const feedbackKey = id => MINI_PREFIX + 'feedback:' + id
export const feedbackIndex = MINI_PREFIX + 'feedback-index'
const SAVE = `
local previous = redis.call('GET', KEYS[1])
if previous then return previous end
local count = redis.call('INCR', KEYS[2])
if count == 1 then redis.call('EXPIRE', KEYS[2], 86400) end
if count > 5 then return 'limited' end
redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[2])
redis.call('ZADD', KEYS[3], ARGV[3], ARGV[4])
redis.call('ZREMRANGEBYSCORE', KEYS[3], '-inf', ARGV[5])
return ARGV[1]`

export function validateFeedback(input) {
  const description = typeof input.description === 'string' ? input.description.trim() : ''
  const contact = typeof input.contact === 'string' ? input.contact.trim() : ''
  if (description.length < 20 || description.length > 2000)
    fail('invalid_feedback', '请用 20–2000 字描述问题与复现步骤。')
  if (!contact || contact.length > 100)
    fail('invalid_feedback', '请填写 1–100 字的联系方式，方便核实问题和发放奖励。')
  if (!SEVERITIES.includes(input.severity)) fail('invalid_feedback', '请选择问题严重程度。')
  if (!/^[a-zA-Z0-9_-]{12,80}$/.test(input.clientRequestId || ''))
    fail('invalid_feedback', '反馈标识不正确，请重新打开反馈页。')
  if (!Array.isArray(input.screenshots) || input.screenshots.length > 4 ||
      input.screenshots.some(image => typeof image !== 'string' || image.length > 1000000 || !/^[A-Za-z0-9+/]+={0,2}$/.test(image)))
    fail('invalid_feedback', '最多上传 4 张图片，请压缩后重试。')
  return { description, contact, severity: input.severity, clientRequestId: input.clientRequestId, screenshots: input.screenshots }
}
function receipt(row) {
  return { id: row.id, status: row.status, rewardFen: row.rewardFen, createdAt: row.createdAt }
}
export async function submitMiniFeedback(redis, actor, input, now = Date.now()) {
  requireActor(actor)
  const clean = validateFeedback(input)
  const owner = hash(actor.id)
  const id = hash(owner + ':' + clean.clientRequestId).slice(0, 32)
  const fingerprint = hash(JSON.stringify(clean))
  const existing = await redis.get(feedbackKey(id))
  if (existing) {
    const row = JSON.parse(existing)
    if (row.fingerprint !== fingerprint) fail('feedback_conflict', '上次提交结果待核对，请勿更改后重复提交。', 409)
    return receipt(row)
  }
  const screenshots = []
  for (const image of clean.screenshots) {
    try {
      const decoder = sharp(Buffer.from(image, 'base64'), { limitInputPixels: 20000000 })
      const meta = await decoder.metadata()
      if (!['jpeg', 'png'].includes(meta.format)) throw new Error('format')
      const bytes = await decoder.rotate().resize(960, 1280, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 68 }).toBuffer()
      if (bytes.length > 250000) throw new Error('size')
      screenshots.push(bytes.toString('base64'))
    } catch {
      fail('invalid_feedback_image', '截图过大或无效，请选择较小的 JPG / PNG 图片。')
    }
  }
  const row = { id, owner, userNumber: actor.user?.number || null, description: clean.description,
    contact: clean.contact, severity: clean.severity, screenshots, fingerprint,
    status: 'pending', rewardFen: 500, createdAt: new Date(now).toISOString() }
  const result = await redis.eval(SAVE, 3, feedbackKey(id),
    MINI_PREFIX + 'feedback-quota:' + owner + ':' + row.createdAt.slice(0, 10), feedbackIndex,
    JSON.stringify(row), RETENTION_SECONDS, now, id, now - RETENTION_SECONDS * 1000)
  if (result === 'limited') fail('feedback_limit', '今日反馈已达 5 次，请明天再试。', 429)
  const stored = JSON.parse(result)
  if (stored.fingerprint !== fingerprint) fail('feedback_conflict', '上次提交结果待核对，请勿更改后重复提交。', 409)
  return receipt(stored)
}
