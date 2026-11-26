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

async function limited(redis) {
  const hits = Number(await redis.incr(PREFIX + 'rate'))
  if (hits === 1 && typeof redis.expire === 'function')
    await redis.expire(PREFIX + 'rate', 600)
  if (hits > 30)
    fail('rate_limited', '二维码生成过于频繁，请稍后再试。', 429)
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
  return { ticket, expiresIn: TICKET_TTL }
}

export async function confirmWebScan() {
  fail(
    'admin_wechat_denied',
    '只有已绑定的微信可以进入后台。这个网页不能核对微信号，所以不能在这里确认。',
    403
  )
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
    const owner = await redis.get(OWNER)
    if (owner && !same(owner, openId))
      fail('admin_wechat_denied', '这台微信不能进入后台。', 403)
    if (!owner) await redis.set(OWNER, openId)
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

export async function confirmAdminScanIfPending(redis, { ticket, openId }) {
  if (!/^[a-f0-9]{32}$/.test(ticket || '')) return null
  const raw = await redis.get(ticketKey(ticket))
  if (!raw) return null
  return confirmAdminScan(redis, { ticket, openId })
}

function entryPath(ticket) {
  return `pages/publish/publish?id=${ticket}`
}

async function wechatAccessToken() {
  const appId = process.env.WUZAI_MINI_APP_ID
  const secret = process.env.WUZAI_MINI_APP_SECRET
  if (!appId || !secret)
    fail('wechat_not_configured', '微信登录尚未配置完成。', 503)
  const query = new URLSearchParams({
    grant_type: 'client_credential',
    appid: appId,
    secret
  })
  let response
  try {
    response = await fetch('https://api.weixin.qq.com/cgi-bin/token?' + query.toString(), {
      signal: AbortSignal.timeout(8000)
    })
  } catch {
    fail('wechat_unavailable', '暂时无法连接微信，请稍后重试。', 503)
  }
  const data = await response.json().catch(() => ({}))
  if (typeof data.access_token !== 'string' || !data.access_token)
    fail('wechat_unavailable', '暂时无法连接微信，请稍后重试。', 503)
  return data.access_token
}

export async function miniProgramAdminImage(ticket) {
  const token = await wechatAccessToken()
  let bytes = Buffer.alloc(0)
  try {
    const code = await fetch(
      'https://api.weixin.qq.com/wxa/getwxacode?access_token=' + encodeURIComponent(token),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: entryPath(ticket), width: 280 }),
        signal: AbortSignal.timeout(8000)
      }
    )
    bytes = Buffer.from(await code.arrayBuffer())
    if (bytes.length > 8 && bytes[0] !== 0x7b) {
      const type = code.headers.get('content-type') || ''
      const mime = type.includes('png') ? 'image/png' : 'image/jpeg'
      return `data:${mime};base64,${bytes.toString('base64')}`
    }
  } catch (error) {
    if (error?.status) throw error
  }
  let link = ''
  try {
    const linked = await fetch(
      'https://api.weixin.qq.com/wxa/generate_urllink?access_token=' +
        encodeURIComponent(token),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: 'pages/publish/publish',
          query: `id=${ticket}`,
          expire_type: 0,
          expire_time: Math.floor(Date.now() / 1000) + 170
        }),
        signal: AbortSignal.timeout(8000)
      }
    )
    const data = await linked.json()
    if (typeof data.url_link === 'string') link = data.url_link
  } catch (error) {
    if (error?.status) throw error
  }
  if (!/^https:\/\/(?:wxaurl|wxmpurl)\.cn\//.test(link))
    fail('wechat_code_failed', '暂时无法生成小程序码。', 503)
  const QRCode = (await import('qrcode')).default
  return QRCode.toDataURL(link, {
    margin: 1,
    width: 240,
    errorCorrectionLevel: 'M'
  })
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
