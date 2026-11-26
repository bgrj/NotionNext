import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { fail, requireActor } from '@/apps/wuzai/miniprogram/common/activities'
import { MINI_PREFIX } from './miniIdentity'
import { countsAsVerifiedBug, verifiedBugKey } from './membershipRewards'

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

function isFeedbackImage(image) {
  return typeof image === 'string' && image.length > 0 && image.length <= 1000000 &&
    /^[A-Za-z0-9+/]+={0,2}$/.test(image)
}

export function validateFeedback(input) {
  const description = typeof input.description === 'string' ? input.description.trim() : ''
  const alipayCode = typeof input.alipayCode === 'string' ? input.alipayCode.trim() : ''
  if (!description || description.length > 2000)
    fail('invalid_feedback', '请填写问题描述，最多 2000 字。')
  if ((input.alipayCode !== undefined && typeof input.alipayCode !== 'string') || (alipayCode && !isFeedbackImage(alipayCode)))
    fail('invalid_feedback', '收款码图片无效，请重新选择或移除。')
  const severity = input.severity === undefined ? 'minor' : input.severity
  if (!SEVERITIES.includes(severity)) fail('invalid_feedback', '请选择问题严重程度。')
  if (!/^[a-zA-Z0-9_-]{12,80}$/.test(input.clientRequestId || ''))
    fail('invalid_feedback', '反馈标识不正确，请重新打开反馈页。')
  const screenshots = input.screenshots === undefined ? [] : input.screenshots
  if (!Array.isArray(screenshots) || screenshots.length > 4 ||
      screenshots.some(image => !isFeedbackImage(image)))
    fail('invalid_feedback', '最多上传 4 张图片，请压缩后重试。')
  return { description, alipayCode, severity, clientRequestId: input.clientRequestId, screenshots }
}

async function normalizeFeedbackImage(image, errorCode = 'invalid_feedback_image', message = '截图过大或无效，请选择较小的 JPG / PNG 图片。') {
  try {
    const decoder = sharp(Buffer.from(image, 'base64'), { limitInputPixels: 20000000 })
    const meta = await decoder.metadata()
    if (!['jpeg', 'png'].includes(meta.format)) throw new Error('format')
    const bytes = await decoder.rotate().resize(960, 1280, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 68 }).toBuffer()
    if (bytes.length > 250000) throw new Error('size')
    return bytes.toString('base64')
  } catch {
    fail(errorCode, message)
  }
}
const ADMIN_STATUSES = ['pending', 'reviewed', 'paid', 'rejected', 'duplicate']
const SEVERITY_LABELS = {
  suggestion: '建议',
  minor: '一般问题',
  major: '严重问题',
  blocking: '无法使用'
}
const STATUS_LABELS = {
  pending: '待核实',
  reviewed: '已核实',
  paid: '已发奖',
  rejected: '无效',
  duplicate: '重复'
}

const REVIEW = `-- feedback-review-v2
if redis.call('GET', KEYS[1]) ~= ARGV[1] then return 'conflict' end
local remaining = redis.call('PTTL', KEYS[1])
if remaining == -1 then remaining = tonumber(ARGV[5]) * 1000 end
if remaining < 1 then return 'conflict' end
redis.call('SET', KEYS[1], ARGV[2], 'PX', remaining)
if ARGV[3] == '1' then redis.call('SADD', KEYS[2], ARGV[4])
elseif ARGV[3] == '0' then redis.call('SREM', KEYS[2], ARGV[4]) end
return ARGV[2]`

function receipt(row) {
  return { id: row.id, status: row.status, rewardFen: row.rewardFen, createdAt: row.createdAt }
}

function summarizeFeedback(row) {
  if (!row || typeof row !== 'object') return null
  return {
    id: row.id,
    status: row.status || 'pending',
    statusLabel: STATUS_LABELS[row.status] || STATUS_LABELS.pending,
    severity: row.severity,
    severityLabel: SEVERITY_LABELS[row.severity] || row.severity || '',
    rewardFen: Number(row.rewardFen) || 500,
    userNumber: row.userNumber ?? null,
    createdAt: row.createdAt || '',
    reviewedAt: row.reviewedAt || '',
    note: typeof row.note === 'string' ? row.note : '',
    descriptionPreview: String(row.description || '').slice(0, 120),
    screenshotCount: Array.isArray(row.screenshots) ? row.screenshots.length : 0,
    hasAlipayCode: !!row.alipayCode,
    hasLegacyContact: typeof row.contact === 'string' && !!row.contact
  }
}

function detailFeedback(row) {
  const summary = summarizeFeedback(row)
  if (!summary) return null
  return {
    ...summary,
    description: row.description || '',
    screenshots: Array.isArray(row.screenshots) ? row.screenshots : [],
    alipayCode: row.alipayCode || '',
    // Legacy text contact kept readable for older records only.
    contact: typeof row.contact === 'string' ? row.contact : ''
  }
}

export async function listMiniFeedback(redis, options = {}) {
  const limit = Math.min(100, Math.max(1, Number(options.limit) || 40))
  const offset = Math.max(0, Number(options.offset) || 0)
  const status = ADMIN_STATUSES.includes(options.status) ? options.status : ''
  const total = Number(await redis.zcard(feedbackIndex)) || 0
  const ids = await redis.zrevrange(feedbackIndex, 0, Math.min(total, 500) - 1)
  if (!ids.length) return { total: 0, items: [], nextOffset: null }
  const raw = await redis.mget(ids.map(feedbackKey))
  const items = []
  for (const value of raw) {
    if (!value) continue
    let row
    try {
      row = JSON.parse(value)
    } catch {
      continue
    }
    const summary = summarizeFeedback(row)
    if (!summary) continue
    if (status && summary.status !== status) continue
    items.push(summary)
  }
  const page = items.slice(offset, offset + limit)
  const nextOffset = offset + limit < items.length ? offset + limit : null
  return { total: status ? items.length : total, items: page, nextOffset }
}

export async function getMiniFeedback(redis, id) {
  if (typeof id !== 'string' || !/^[a-f0-9]{32}$/.test(id))
    fail('not_found', '没有找到这条反馈。', 404)
  const raw = await redis.get(feedbackKey(id))
  if (!raw) fail('not_found', '没有找到这条反馈。', 404)
  let row
  try {
    row = JSON.parse(raw)
  } catch {
    fail('not_found', '没有找到这条反馈。', 404)
  }
  return detailFeedback(row)
}

export async function updateMiniFeedbackStatus(redis, id, input = {}, now = Date.now()) {
  if (typeof id !== 'string' || !/^[a-f0-9]{32}$/.test(id))
    fail('not_found', '没有找到这条反馈。', 404)
  const status = input.status
  if (!ADMIN_STATUSES.includes(status))
    fail('invalid_feedback', '请选择有效的处理状态。')
  const note = typeof input.note === 'string' ? input.note.trim().slice(0, 500) : ''
  const key = feedbackKey(id)
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const raw = await redis.get(key)
    if (!raw) fail('not_found', '没有找到这条反馈。', 404)
    let row
    try { row = JSON.parse(raw) } catch { fail('not_found', '没有找到这条反馈。', 404) }
    row.status = status
    row.note = note
    row.reviewedAt = new Date(now).toISOString()
    const ownerKnown = /^[a-f0-9]{64}$/.test(row.owner || '')
    const qualifies = ownerKnown ? (countsAsVerifiedBug(row) ? '1' : '0') : '-1'
    const result = await redis.eval(REVIEW, 2, key, verifiedBugKey(ownerKnown ? row.owner : 'unattributed'), raw, JSON.stringify(row), qualifies, id, RETENTION_SECONDS)
    if (result !== 'conflict') return detailFeedback(JSON.parse(result))
  }
  fail('feedback_conflict', '反馈记录刚刚发生变化，请刷新后重试。', 409)
}

export {
  ADMIN_STATUSES,
  SEVERITY_LABELS,
  STATUS_LABELS,
  summarizeFeedback,
  detailFeedback
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
  for (const image of clean.screenshots)
    screenshots.push(await normalizeFeedbackImage(image))
  const alipayCode = clean.alipayCode ? await normalizeFeedbackImage(
    clean.alipayCode,
    'invalid_feedback_image',
    '收款码过大或无效，请选择较小的 JPG / PNG 图片。'
  ) : ''
  const row = { id, owner, userNumber: actor.user?.number || null, description: clean.description,
    alipayCode, severity: clean.severity, screenshots, fingerprint,
    status: 'pending', rewardFen: 500, createdAt: new Date(now).toISOString() }
  const result = await redis.eval(SAVE, 3, feedbackKey(id),
    MINI_PREFIX + 'feedback-quota:' + owner + ':' + row.createdAt.slice(0, 10), feedbackIndex,
    JSON.stringify(row), RETENTION_SECONDS, now, id, now - RETENTION_SECONDS * 1000)
  if (result === 'limited') fail('feedback_limit', '今日反馈已达 5 次，请明天再试。', 429)
  const stored = JSON.parse(result)
  if (stored.fingerprint !== fingerprint) fail('feedback_conflict', '上次提交结果待核对，请勿更改后重复提交。', 409)
  return receipt(stored)
}
