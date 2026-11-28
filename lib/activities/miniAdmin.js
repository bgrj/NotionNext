import { createHash } from 'node:crypto'
import { fail, requireActor } from '@/apps/wuzai/miniprogram/common/activities'
import { MINI_PREFIX } from './miniIdentity'
import { REPORT_IMAGE_LIMIT, reportRecord } from './devReportBundle'

const PREFIX = 'wuzai:{activities:v1}:'
export const DATASETS = {
  events: { label: '活动与云端草稿', prefix: PREFIX + 'event:' },
  accounts: { label: '账号资料', prefix: MINI_PREFIX + 'account:' },
  memberships: { label: '会员与礼遇', prefix: MINI_PREFIX + 'membership:' },
  media: { label: '上传图片', prefix: MINI_PREFIX + 'cover:' },
  writings: { label: '用户创作', prefix: 'wuzai:{writings:v1}:' },
  clients: { label: '设备同步数据', prefix: MINI_PREFIX + 'client-state:' },
  credit: { label: '信用记录', prefix: PREFIX + 'credit:' },
  reports: { label: '开发与测试记录', prefix: MINI_PREFIX + 'dev-report:' }
}
const digest = value => createHash('sha256').update(value).digest('hex')
const attachmentKey = hash => MINI_PREFIX + 'dev-report-asset:' + hash
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
const hidden = /^(?:hostId|actorId|owner|openId|unionid|session_key|sessionKey|token|access_token|accessToken|refreshToken|authorization|appSecret|secret|password|complianceToken|fingerprint|requestHash|basis|signature|session)$/i
export function redact(value) {
  if (Array.isArray(value)) return value.map(redact)
  if (typeof value === 'string' && value.startsWith('wx:')) return '[身份已隐藏]'
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(Object.entries(value).filter(([key]) => !hidden.test(key)).map(([key, item]) => [key.startsWith('wx:') ? 'participant-' + digest(key).slice(0, 10) : key, redact(item)]))
}
function dataset(name) {
  if (!Object.hasOwn(DATASETS, name)) fail('invalid_dataset', '没有找到该数据分类。', 400)
  return DATASETS[name]
}
function validRecord(name, id) {
  dataset(name)
  if (typeof id !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(id)) fail('invalid_record', '数据标识无效。', 400)
  // Writing indexes share the prefix; they are never record endpoints.
  if (name === 'writings' && !/^[a-f0-9-]{32,64}$/.test(id)) fail('invalid_record', '数据标识无效。', 400)
  return DATASETS[name].prefix + id
}
const labelKey = (name, id) => MINI_PREFIX + 'admin-label:' + name + ':' + id
function parse(raw) { try { return JSON.parse(raw) } catch { return null } }
function summary(name, id, row, label) {
  return {
    id, title: row.title || row.name || (row.number ? `存在者${row.number}号` : DATASETS[name].label),
    state: row.state || row.status || '', userNumber: row.userNumber || row.number || null,
    at: row.updatedAt || row.syncedAt || row.createdAt || row.expiresAt || '',
    source: label?.source || row.source || row.origin?.environment || 'historical',
    note: label?.note || '',
    ...(name === 'media' ? { image: '/api/our-beings/covers/' + id } : {})
  }
}
export async function listAdminData(redis, options = {}) {
  const name = options.dataset, { prefix } = dataset(name)
  const cursor = /^\d+$/.test(String(options.cursor || '0')) ? String(options.cursor || '0') : '0'
  const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', prefix + '*', 'COUNT', 60)
  const valid = keys.filter(key => {
    try { validRecord(name, key.slice(prefix.length)); return true } catch { return false }
  })
  const items = []
  // SCAN is incremental; do not use KEYS or read a whole media library into memory.
  const labels = valid.length ? await redis.mget(valid.map(key => labelKey(name, key.slice(prefix.length)))) : []
  const raw = name === 'media' ? [] : valid.length ? await redis.mget(valid) : []
  valid.forEach((key, index) => {
    const id = key.slice(prefix.length), row = name === 'media' ? {} : parse(raw[index])
    if (!row) return
    const item = summary(name, id, row, parse(labels[index]))
    const q = String(options.query || '').trim().toLowerCase()
    if (q && !JSON.stringify(item).toLowerCase().includes(q)) return
    if (options.source && item.source !== options.source) return
    items.push(item)
  })
  return { items, nextCursor: String(nextCursor), storage: 'Redis', dataset: name }
}
export async function getAdminData(redis, name, id) {
  const key = validRecord(name, id)
  if (name === 'media') {
    if (!(await redis.exists(key))) fail('not_found', '没有找到这条数据。', 404)
    return { id, image: '/api/our-beings/covers/' + id }
  }
  const row = parse(await redis.get(key))
  if (!row) fail('not_found', '没有找到这条数据。', 404)
  return { ...redact(row), id, management: parse(await redis.get(labelKey(name, id))) }
}
export async function labelAdminData(redis, input) {
  const key = validRecord(input.dataset, input.id)
  if (!['release', 'develop', 'trial', 'historical'].includes(input.source)) fail('invalid_source', '请选择数据来源。', 400)
  if (!(await redis.exists(key))) fail('not_found', '没有找到这条数据。', 404)
  const label = { source: input.source, note: String(input.note || '').trim().slice(0, 500), updatedAt: new Date().toISOString() }
  await redis.set(labelKey(input.dataset, input.id), JSON.stringify(label))
  return label
}
export async function saveDevReport(redis, input) {
  let record
  try {
    record = reportRecord(input)
  } catch (error) {
    fail('invalid_report', error.message, 400)
  }
  const { title, body, attachment } = record
  let screenshot
  if (attachment) {
    const { data, type, sha256, name } = attachment
    const bytes = Buffer.from(data, 'base64')
    const hasImageSignature = type === 'image/png'
      ? bytes.subarray(0, pngSignature.length).equals(pngSignature)
      : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 &&
        bytes[bytes.length - 2] === 255 && bytes[bytes.length - 1] === 217
    if (!hasImageSignature || bytes.length > REPORT_IMAGE_LIMIT || digest(bytes) !== sha256 || bytes.toString('base64') !== data)
      fail('invalid_attachment', '截图格式或摘要与归档记录不符。', 400)
    await redis.set(attachmentKey(sha256), data, 'NX')
    screenshot = { name, type, sha256, size: bytes.length }
  }
  // Retrying a partially imported bundle must not duplicate or overwrite evidence.
  const id = digest(title + '\0' + body + (screenshot ? '\0' + screenshot.sha256 : ''))
  const key = DATASETS.reports.prefix + id
  const row = { id, title, body, source: 'develop', createdAt: new Date().toISOString(), ...(screenshot ? { attachment: screenshot } : {}) }
  const created = await redis.set(key, JSON.stringify(row), 'NX')
  if (created) return row
  const existing = parse(await redis.get(key))
  if (!existing) fail('unavailable', '暂时无法确认归档结果，请重试。', 503)
  return existing
}

export async function getDevReportAttachment(redis, id, hash) {
  const record = parse(await redis.get(validRecord('reports', id)))
  const attachment = record?.attachment
  if (!attachment || typeof hash !== 'string' || !/^[a-f0-9]{64}$/.test(hash) || hash !== attachment.sha256)
    fail('not_found', '没有找到这张验收截图。', 404)
  const encoded = await redis.get(attachmentKey(hash))
  if (typeof encoded !== 'string') fail('not_found', '没有找到这张验收截图。', 404)
  const bytes = Buffer.from(encoded, 'base64')
  if (bytes.length !== attachment.size || digest(bytes) !== hash)
    fail('unavailable', '截图暂时无法读取，请重新校验归档。', 503)
  return { bytes, type: attachment.type }
}
export async function syncClientState(redis, actor, input = {}) {
  requireActor(actor)
  if (actor.platform !== 'wechat') fail('forbidden', '请使用小程序账号。', 403)
  if (!Number.isSafeInteger(input.userNumber) || input.userNumber !== actor.user?.number)
    fail('forbidden', '请使用当前账户重新操作。', 403)
  const device = input.deviceId
  if (typeof device !== 'string' || !/^[a-zA-Z0-9-]{8,80}$/.test(device)) fail('invalid_state', '设备标识无效。')
  const id = digest(digest(actor.id) + ':' + device)
  const key = DATASETS.clients.prefix + id
  if (input.remove === true) {
    await redis.del(key, labelKey('clients', id))
    return { removed: true }
  }
  if (input.backupConsent !== true) fail('invalid_state', '请在设置中确认备份。')
  const state = input.state
  if (!state || typeof state !== 'object' || Array.isArray(state)) fail('invalid_state', '设备数据格式无效。')
  const clean = {}
  for (const key of ['drafts', 'writingDrafts', 'preferences', 'favorites', 'blocked', 'removedCards', 'existence', 'city', 'language']) {
    if (state[key] !== undefined) clean[key] = redact(state[key])
  }
  const data = JSON.stringify(clean)
  if (Buffer.byteLength(data) > 700000) fail('invalid_state', '设备数据过大，请先整理草稿。')
  const row = {
    userNumber: actor.user?.number || null, title: `${actor.name} · 设备数据`,
    source: ['develop', 'trial', 'release'].includes(input.environment) ? input.environment : 'historical',
    state: clean, syncedAt: new Date().toISOString()
  }
  await redis.set(key, JSON.stringify(row), 'EX', 30 * 86400)
  return { syncedAt: row.syncedAt }
}
