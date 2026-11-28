import { createHash, randomBytes } from 'node:crypto'
import { fail } from '@/apps/wuzai/miniprogram/common/activities'

export const MINI_PREFIX = 'wuzai:{activities:v1}:mini:'
const digest = value => createHash('sha256').update(value).digest('hex')
export const accountKey = id => MINI_PREFIX + 'account:' + digest(id)
export const publicProfileId = id => digest(id)
export const DEFAULT_NICKNAME = '存在者0号'
const SESSION_SECONDS = 7200
export const REGISTER = `
local existing=redis.call('GET',KEYS[1])
if existing then return existing end
local number=redis.call('INCR',KEYS[2])
local user=cjson.encode({number=number,name='存在者'..string.format('%.0f',number)..'号',bio='',avatar='初',createdAt=ARGV[1]})
redis.call('SET',KEYS[1],user)
return user`

export function publicMiniUser(user, id) {
  return {
    authenticated: true,
    platform: 'wechat',
    number: user.number,
    name: user.name,
    nickname: user.nickname || '',
    ...(id ? { profileId: publicProfileId(id) } : {}),
    bio: user.bio || '',
    signatureUnified: user.signatureUnified === true,
    avatar: user.avatar || '初'
  }
}
export async function wechatJson(url, options = {}) {
  let response
  try {
    response = await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(8000)
    })
  } catch {
    fail('wechat_unavailable', '暂时无法连接微信，请稍后重试。', 503)
  }
  if (!response.ok)
    fail('wechat_unavailable', '微信服务暂时不可用，请稍后重试。', 503)
  try {
    return await response.json()
  } catch {
    fail('wechat_unavailable', '微信服务返回异常，请稍后重试。', 503)
  }
}
export async function loginMini(redis, code, now = Date.now()) {
  const appId = process.env.WUZAI_MINI_APP_ID
  const secret = process.env.WUZAI_MINI_APP_SECRET
  if (!appId || !secret)
    fail(
      'wechat_not_configured',
      '微信登录尚未配置完成，可以先浏览活动和整理本地草稿。',
      503
    )
  if (typeof code !== 'string' || !/^[A-Za-z0-9_-]{10,256}$/.test(code))
    fail('invalid_login_code', '微信登录凭证已失效，请重新登录。', 401)
  const query = new URLSearchParams({
    appid: appId,
    secret,
    js_code: code,
    grant_type: 'authorization_code'
  })
  const identity = await wechatJson(
    'https://api.weixin.qq.com/sns/jscode2session?' + query.toString()
  )
  if (
    identity.errcode ||
    !/^[A-Za-z0-9_-]{10,100}$/.test(identity.openid || '')
  )
    fail('wechat_login_required', '微信登录未完成，请重新登录后重试。', 401)
  const id = `wx:${appId}:${identity.openid}`
  const user = JSON.parse(
    await redis.eval(
      REGISTER,
      2,
      accountKey(id),
      MINI_PREFIX + 'counter:' + appId,
      new Date(now).toISOString()
    )
  )
  const token = randomBytes(32).toString('base64url')
  const expiresAt = now + SESSION_SECONDS * 1000
  await redis.set(
    MINI_PREFIX + 'session:' + digest(token),
    JSON.stringify({ id, expiresAt }),
    'EX',
    SESSION_SECONDS
  )
  // session_key and OPENID stay on the server; the client gets an opaque session.
  return {
    user: publicMiniUser(user, id),
    token,
    expiresAt,
    expiresIn: SESSION_SECONDS
  }
}
export async function resolveMiniActor(redis, authorization, now = Date.now()) {
  if (!authorization) return null
  if (
    typeof authorization !== 'string' ||
    !/^Bearer [A-Za-z0-9_-]{43}$/.test(authorization)
  )
    fail('wechat_login_required', '请重新登录。', 401)
  const token = authorization.slice(7)
  const raw = await redis.get(MINI_PREFIX + 'session:' + digest(token))
  if (!raw) fail('wechat_login_required', '登录已过期，请重新登录。', 401)
  const session = JSON.parse(raw)
  if (
    session.expiresAt <= now ||
    !session.id.startsWith(`wx:${process.env.WUZAI_MINI_APP_ID}:`)
  )
    fail('wechat_login_required', '登录已过期，请重新登录。', 401)
  const user = JSON.parse((await redis.get(accountKey(session.id))) || 'null')
  if (!user) fail('wechat_login_required', '请重新登录。', 401)
  return { id: session.id, name: user.name, platform: 'wechat', user }
}
export async function updateMiniProfile(redis, actor, input) {
  const patch = {}
  if (Object.prototype.hasOwnProperty.call(input, 'nickname')) {
    if (typeof input.nickname !== 'string' || /[\u0000-\u001f\u007f]/.test(input.nickname) || Array.from(input.nickname.trim()).length > 20)
      fail('invalid_profile', '昵称最多20个字符，不能包含换行。')
    patch.nickname = input.nickname.trim()
  }
  const unified = Object.prototype.hasOwnProperty.call(input, 'signature')
  if (unified && (typeof input.signature !== 'string' || input.signature.trim().length > 280))
    fail('invalid_profile', '个人签名最多 280 字。')
  const bio =
    unified ? input.signature.trim() : typeof input.bio === 'string'
      ? input.bio.trim().slice(0, actor.user.signatureUnified ? 280 : 100)
      : actor.user.bio || ''
  const marks = ['初', '山', '海', '木', '光', '书']
  const stored = /^\/api\/our-beings\/covers\/[a-f0-9]{64}$/
  const avatar =
    marks.includes(input.avatar) || stored.test(input.avatar || '')
      ? input.avatar
      : marks.includes(actor.user.avatar) || stored.test(actor.user.avatar || '')
        ? actor.user.avatar
        : '初'
  if (unified || typeof input.bio === 'string') Object.assign(patch, { bio, ...(unified ? { signatureUnified: true } : {}) })
  if (Object.prototype.hasOwnProperty.call(input, 'avatar')) patch.avatar = avatar
  // Merge only submitted fields with the latest account inside Redis. Concurrent
  // avatar and nickname edits must not restore an older signature or identity.
  const raw = await redis.eval(UPDATE_PROFILE, 1, accountKey(actor.id), JSON.stringify(patch))
  if (!raw) fail('wechat_login_required', '请重新登录。', 401)
  return publicMiniUser(JSON.parse(raw), actor.id)
}

export const UPDATE_PROFILE = `
local raw=redis.call('GET',KEYS[1])
if not raw then return false end
local user=cjson.decode(raw)
local patch=cjson.decode(ARGV[1])
for key,value in pairs(patch) do user[key]=value end
local updated=cjson.encode(user)
redis.call('SET',KEYS[1],updated)
return updated`
