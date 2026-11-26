import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'
import { fail } from '@/apps/wuzai/miniprogram/common/activities'
const TICKET_TTL = 180
const SESSION_TTL = 12 * 60 * 60
const PREFIX = 'wuzai:admin-scan:'
const OWNER = PREFIX + 'owner'

const ticketKey = ticket => PREFIX + 'ticket:' + ticket
const sessionKey = token =>
  PREFIX + 'session:' + createHash('sha256').update(token).digest('hex')

function same(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string' || left.length !== right.length)
    return false
  try {
    return timingSafeEqual(Buffer.from(left), Buffer.from(right))
  } catch {
    return false
  }
}

export function adminKeyMatches(actual) {
  const expected = process.env.WUZAI_FEEDBACK_ADMIN_TOKEN
  if (typeof expected !== 'string' || expected.length < 16) return false
  return same(expected, actual)
}

async function limited(redis) {
  const hits = Number(await redis.incr(PREFIX + 'rate'))
  if (hits === 1 && typeof redis.expire === 'function')
    await redis.expire(PREFIX + 'rate', 600)
  if (hits > 30)
    fail('rate_limited', '二维码生成过于频繁，请稍后再试。', 429)
}

export function scanConfirmUrl(ticket) {
  return `https://ourbeings.com/our-beings/feedback-scan?ticket=${ticket}`
}

export async function beginAdminScan(redis) {
  await limited(redis)
  const ticket = randomBytes(16).toString('hex')
  const saved = await redis.set(
    ticketKey(ticket),
    JSON.stringify({ purpose: 'enter', status: 'pending' }),
    'EX',
    TICKET_TTL
  )
  if (saved !== 'OK') fail('unavailable', '暂时无法生成二维码。', 503)
  return { ticket, url: scanConfirmUrl(ticket), expiresIn: TICKET_TTL }
}

export async function confirmWebScan(redis, ticket) {
  if (!/^[a-f0-9]{32}$/.test(ticket || ''))
    fail('invalid_ticket', '这个二维码已经失效。')
  const raw = await redis.get(ticketKey(ticket))
  if (!raw) fail('invalid_ticket', '这个二维码已经失效。')
  const record = JSON.parse(raw)
  if (!record.session) {
    record.session = 'scan_' + randomBytes(32).toString('base64url')
    await redis.set(sessionKey(record.session), 'web', 'EX', SESSION_TTL)
    record.status = 'approved'
    await redis.set(ticketKey(ticket), JSON.stringify(record), 'EX', TICKET_TTL)
  }
  return { status: 'approved' }
}

export async function confirmAdminScan(redis, { ticket, openId }) {
  if (!/^[a-f0-9]{32}$/.test(ticket || ''))
    fail('invalid_ticket', '这个二维码已经失效。')
  if (!/^[A-Za-z0-9_-]{10,100}$/.test(openId || ''))
    fail('invalid_bridge', '微信身份验证失败。', 401)
  const raw = await redis.get(ticketKey(ticket))
  if (!raw) fail('invalid_ticket', '这个二维码已经失效。')
  const record = JSON.parse(raw)
  if (record.purpose === 'bind') {
    await redis.set(OWNER, openId)
    record.status = 'bound'
    await redis.set(ticketKey(ticket), JSON.stringify(record), 'EX', TICKET_TTL)
    return { status: 'bound' }
  }
  const owner = await redis.get(OWNER)
  if (!owner || !same(owner, openId))
    fail('admin_wechat_denied', '这台微信不能进入后台。', 403)
  if (!record.session) {
    record.session = 'scan_' + randomBytes(32).toString('base64url')
    await redis.set(sessionKey(record.session), openId, 'EX', SESSION_TTL)
    record.status = 'approved'
    await redis.set(ticketKey(ticket), JSON.stringify(record), 'EX', TICKET_TTL)
  }
  return { status: 'approved' }
}

export async function readAdminScan(redis, ticket) {
  if (!/^[a-f0-9]{32}$/.test(ticket || ''))
    fail('invalid_ticket', '这个二维码已经失效。')
  const raw = await redis.get(ticketKey(ticket))
  if (!raw)
    return { status: 'expired', message: '二维码已过期，请重新生成。' }
  const record = JSON.parse(raw)
  if (record.status === 'approved' && record.session)
    return { status: 'approved', session: record.session }
  if (record.status === 'bound') return { status: 'bound' }
  return { status: 'pending' }
}

export async function adminSessionValid(redis, token) {
  if (typeof token !== 'string' || !/^scan_[A-Za-z0-9_-]{43}$/.test(token))
    return false
  return Boolean(await redis.get(sessionKey(token)))
}
