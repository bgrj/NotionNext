const VERCOUNT_V2 = 'https://events.vercount.one/api/v2/log'
const VERCOUNT_V1 = 'https://events.vercount.one/log'
const IBRUCE_JSONP =
  'https://busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback'
const UV_COOKIE = 'ob_site_uv'
const REQUEST_TIMEOUT_MS = 4000

function normalizeHost(host) {
  return String(host || '')
    .split(',')[0]
    .trim()
    .replace(/:\d+$/, '')
    .toLowerCase()
}

function hostsMatch(pageHost, requestHost) {
  if (!pageHost || !requestHost) return false
  if (pageHost === requestHost) return true
  return pageHost === `www.${requestHost}` || requestHost === `www.${pageHost}`
}

function resolvePageUrl(rawUrl, requestHost) {
  const host = normalizeHost(requestHost)
  if (!host) return null
  let parsed
  try {
    parsed = new URL(String(rawUrl || ''))
  } catch {
    return null
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null
  if (!hostsMatch(parsed.hostname.toLowerCase(), host)) return null
  parsed.hash = ''
  return parsed.toString()
}

function toCount(value) {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? n : 0
}

function parseCounts(payload) {
  const data =
    payload?.data && typeof payload.data === 'object' ? payload.data : payload
  if (!data || typeof data !== 'object') return null
  return {
    site_pv: toCount(data.site_pv),
    site_uv: toCount(data.site_uv),
    page_pv: toCount(data.page_pv)
  }
}

function parseIbruceJsonp(text) {
  const match = String(text || '').match(/^[^(]*\((\{[\s\S]*\})\)\s*;?\s*$/)
  if (!match) return null
  try {
    return parseCounts(JSON.parse(match[1]))
  } catch {
    return null
  }
}

async function fetchJson(url, options, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    const text = await response.text()
    return { ok: response.ok, status: response.status, text }
  } finally {
    clearTimeout(timer)
  }
}

async function fetchRemoteCounts({ pageUrl, isNewUv }) {
  try {
    const v2 = await fetchJson(VERCOUNT_V2, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: pageUrl, isNewUv: Boolean(isNewUv) })
    })
    if (v2.ok) {
      const counts = parseCounts(JSON.parse(v2.text))
      if (counts) return counts
    }
  } catch {}

  try {
    const v1 = await fetchJson(VERCOUNT_V1, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: pageUrl })
    })
    if (v1.ok) {
      const counts = parseCounts(JSON.parse(v1.text))
      if (counts) return counts
    }
  } catch {}

  try {
    const ibruce = await fetchJson(
      IBRUCE_JSONP,
      {
        method: 'GET',
        headers: { Referer: pageUrl }
      },
      2500
    )
    const counts = parseIbruceJsonp(ibruce.text)
    if (counts) return counts
  } catch {}

  return null
}

function hasUvCookie(cookieHeader) {
  return String(cookieHeader || '')
    .split(';')
    .some(part => part.trim().startsWith(`${UV_COOKIE}=`))
}

function uvCookieHeader() {
  return `${UV_COOKIE}=1; Path=/; Max-Age=31536000; SameSite=Lax; Secure`
}

module.exports = {
  UV_COOKIE,
  resolvePageUrl,
  parseCounts,
  parseIbruceJsonp,
  fetchRemoteCounts,
  hasUvCookie,
  uvCookieHeader
}
