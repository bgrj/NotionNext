import { createHmac, createHash, timingSafeEqual } from 'node:crypto'
import BLOG from '@/blog.config'

const SESSION_TTL_SECONDS = 60 * 60

export function getArticleAuthSecret() {
  const secret = process.env.ARTICLE_AUTH_SECRET
  return typeof secret === 'string' && secret.trim().length >= 32
    ? secret.trim()
    : ''
}

export function articleCookieName(articleId) {
  const digest = createHash('sha256')
    .update(String(articleId || ''))
    .digest('hex')
    .slice(0, 12)
  const prefix = process.env.NODE_ENV === 'production' ? '__Host-' : ''
  return `${prefix}ob_a_${digest}`
}

export function signArticleSession({ articleId, version, expiresAt }) {
  const secret = getArticleAuthSecret()
  if (!secret || !articleId) return ''
  const payload = Buffer.from(
    JSON.stringify({
      articleId,
      version: String(version || '1'),
      exp: expiresAt
    })
  ).toString('base64url')
  const mac = createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${mac}`
}

export function readArticleSession(token) {
  const secret = getArticleAuthSecret()
  if (!secret || typeof token !== 'string') return null
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [payload, mac] = parts
  const expected = createHmac('sha256', secret)
    .update(payload)
    .digest('base64url')
  const left = Buffer.from(mac)
  const right = Buffer.from(expected)
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (!data?.articleId || !data?.exp) return null
    if (Number(data.exp) <= Date.now()) return null
    return data
  } catch {
    return null
  }
}

export function createArticleSessionCookie(post) {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000
  const token = signArticleSession({
    articleId: post.id,
    version: post.lastEditedDate || '1',
    expiresAt
  })
  if (!token) return ''
  const secure = process.env.NODE_ENV === 'production'
  return [
    `${articleCookieName(post.id)}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${SESSION_TTL_SECONDS}`,
    secure ? 'Secure' : ''
  ]
    .filter(Boolean)
    .join('; ')
}

const ARTICLE_COOKIE_NAME = /^(?:__Host-)?ob_a_[a-f0-9]{12}$/

export function parseCookieHeader(header) {
  const out = new Map()
  if (typeof header !== 'string' || !header) return out
  header.split(';').forEach(part => {
    const index = part.indexOf('=')
    if (index === -1) return
    const key = part.slice(0, index).trim()
    const value = part.slice(index + 1).trim()
    if (!ARTICLE_COOKIE_NAME.test(key)) return
    try {
      out.set(key, decodeURIComponent(value))
    } catch {
      out.set(key, value)
    }
  })
  return out
}

export function sessionAllowsArticle(req, post) {
  if (!post?.id) return false
  const cookies = parseCookieHeader(req?.headers?.cookie)
  const token = cookies.get(articleCookieName(post.id))
  const session = readArticleSession(token)
  if (!session) return false
  if (session.articleId !== post.id) return false
  if (String(session.version) !== String(post.lastEditedDate || '1'))
    return false
  return true
}

export function isAllowedRequestOrigin(req) {
  const origin = req?.headers?.origin
  if (typeof origin !== 'string' || !origin) return false
  let originUrl
  try {
    originUrl = new URL(origin)
  } catch {
    return false
  }
  if (originUrl.protocol !== 'http:' && originUrl.protocol !== 'https:') {
    return false
  }
  const requestHost = String(
    req?.headers?.['x-forwarded-host'] || req?.headers?.host || ''
  )
    .split(',')[0]
    .trim()
    .toLowerCase()
  if (requestHost && originUrl.host.toLowerCase() === requestHost) return true
  try {
    if (originUrl.origin === new URL(BLOG.LINK).origin) return true
  } catch {
    // The canonical site URL is optional when the request host already matched.
  }
  if (process.env.NODE_ENV === 'production') return false
  return originUrl.hostname === 'localhost' || originUrl.hostname === '127.0.0.1'
}

export function clientRequestKey(req) {
  const forwarded = req?.headers?.['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim()
  }
  return req?.socket?.remoteAddress || 'unknown'
}
