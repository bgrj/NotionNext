import axios from 'axios'
import { randomBytes } from 'node:crypto'
import { validBearerToken } from './bearerAuth'

const STATE_COOKIE = 'notion_oauth_state'

function getOAuthConfig() {
  if (process.env.ENABLE_NOTION_OAUTH !== 'true') return null
  const clientId = process.env.OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_CLIENT_SECRET
  const redirectUri = process.env.OAUTH_REDIRECT_URI
  if (!clientId || !clientSecret || !redirectUri) return null
  try {
    const url = new URL(redirectUri)
    const localDev =
      process.env.NODE_ENV !== 'production' &&
      url.hostname === 'localhost' &&
      url.protocol === 'http:'
    if (
      url.username ||
      url.password ||
      url.hash ||
      (url.protocol !== 'https:' && !localDev)
    ) {
      return null
    }
  } catch {
    return null
  }
  return { clientId, clientSecret, redirectUri }
}

export function setOAuthResponseHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0')
  res.setHeader('Referrer-Policy', 'no-referrer')
}

function stateCookie(value, maxAge) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${STATE_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`
}

function readStateCookie(req) {
  if (typeof req.cookies?.[STATE_COOKIE] === 'string')
    return req.cookies[STATE_COOKIE]
  const raw = req.headers?.cookie
  if (typeof raw !== 'string') return ''
  const match = raw
    .split(';')
    .map(part => part.trim())
    .find(part => part.startsWith(`${STATE_COOKIE}=`))
  return match ? match.slice(STATE_COOKIE.length + 1) : ''
}

export function startNotionOAuth(req, res) {
  setOAuthResponseHeaders(res)
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
  const config = getOAuthConfig()
  if (!config)
    return res.status(503).json({ error: 'Notion OAuth is disabled' })
  const state = randomBytes(32).toString('base64url')
  const url = new URL('https://api.notion.com/v1/oauth/authorize')
  url.search = new URLSearchParams({
    owner: 'user',
    response_type: 'code',
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    state
  }).toString()
  res.setHeader('Set-Cookie', stateCookie(state, 600))
  return res.redirect(302, url.toString())
}

/**
 * The old demo had no server-side token store. Keep it a status-only demo:
 * never put tokens, codes, credentials or workspace data in logs/props/URLs.
 * A real integration needs a separately reviewed persistence flow.
 */
export async function completeNotionOAuth(req, res) {
  setOAuthResponseHeaders(res)
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return { ok: false, status: 405, message: 'Method Not Allowed' }
  }
  const config = getOAuthConfig()
  if (!config)
    return { ok: false, status: 503, message: 'Notion OAuth is disabled' }
  const code = req.query?.code
  const state = req.query?.state
  const expectedState = readStateCookie(req)
  if (
    typeof code !== 'string' ||
    !code ||
    code.length > 2048 ||
    typeof state !== 'string' ||
    state.length > 128 ||
    !validBearerToken(`Bearer ${state}`, expectedState)
  ) {
    return { ok: false, status: 400, message: 'Invalid OAuth request or state' }
  }
  res.setHeader('Set-Cookie', stateCookie('', 0))
  try {
    const response = await axios.post(
      'https://api.notion.com/v1/oauth/token',
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.redirectUri
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')}`
        },
        timeout: 15000,
        maxRedirects: 0,
        maxContentLength: 64 * 1024
      }
    )
    if (
      response.status !== 200 ||
      typeof response.data?.access_token !== 'string'
    ) {
      return { ok: false, status: 502, message: 'OAuth exchange failed' }
    }
    return { ok: true, status: 200, message: '授权完成' }
  } catch {
    // Axios errors may contain authorization headers and response tokens.
    return { ok: false, status: 502, message: 'OAuth exchange failed' }
  }
}
