const VERCOUNT_V2 = 'https://events.vercount.one/api/v2/log'
const VERCOUNT_V1 = 'https://events.vercount.one/log'
const IBRUCE_JSONP =
  'https://busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback'
const VID_COOKIE = 'ob_vid'
const LEGACY_UV_COOKIE = 'ob_site_uv'
const SID_COOKIE = 'ob_sid'
const HIT_COOKIE = 'ob_hit'
const STAT_COOKIE = 'ob_stat'
const SESSION_SECONDS = 30 * 60
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
  return Number.isFinite(n) && n >= 0 ? Math.trunc(n) : 0
}

function normalizeCounts(payload) {
  const data =
    payload?.data && typeof payload.data === 'object' ? payload.data : payload
  if (!data || typeof data !== 'object') return null
  const site_pv = toCount(data.site_pv)
  const page_pv = toCount(data.page_pv)
  let site_uv = toCount(data.site_uv)
  let page_uv = toCount(data.page_uv)
  if (site_uv > site_pv) site_uv = site_pv
  if (!page_uv) page_uv = Math.min(page_pv, site_uv || page_pv)
  if (page_uv > page_pv) page_uv = page_pv
  if (site_uv > 0 && page_uv > site_uv) page_uv = site_uv
  return { site_pv, site_uv, page_pv, page_uv }
}

function parseCounts(payload) {
  return normalizeCounts(payload)
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

function parseCookieHeader(header) {
  const out = {}
  String(header || '')
    .split(';')
    .forEach(part => {
      const trimmed = part.trim()
      if (!trimmed) return
      const i = trimmed.indexOf('=')
      if (i === -1) return
      const key = trimmed.slice(0, i)
      const value = trimmed.slice(i + 1)
      try {
        out[key] = decodeURIComponent(value)
      } catch {
        out[key] = value
      }
    })
  return out
}

function pageKey(pageUrl) {
  try {
    const parsed = new URL(pageUrl)
    return parsed.pathname.replace(/\/+$/, '') || '/'
  } catch {
    return '/'
  }
}

function newId() {
  return crypto.randomUUID()
}

function cookiePair(name, value, maxAge) {
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax; Secure; HttpOnly`
}

function encodeStat(counts, key) {
  return [key, counts.site_pv, counts.site_uv, counts.page_pv, counts.page_uv].join('|')
}

function decodeStat(raw) {
  const parts = String(raw || '').split('|')
  if (parts.length !== 5) return null
  return normalizeCounts({
    site_pv: parts[1],
    site_uv: parts[2],
    page_pv: parts[3],
    page_uv: parts[4]
  })
    ? {
        key: parts[0],
        ...normalizeCounts({
          site_pv: parts[1],
          site_uv: parts[2],
          page_pv: parts[3],
          page_uv: parts[4]
        })
      }
    : null
}

function inspectVisit(cookieHeader, pageUrl) {
  const cookies = parseCookieHeader(cookieHeader)
  const key = pageKey(pageUrl)
  const hadVid = Boolean(cookies[VID_COOKIE] || cookies[LEGACY_UV_COOKIE])
  const vid = cookies[VID_COOKIE] || newId()
  const isNewSession = !cookies[SID_COOKIE]
  const sid = cookies[SID_COOKIE] || newId()
  const hit = `${sid}:${key}`
  const samePageSession = cookies[HIT_COOKIE] === hit
  const lastStat = decodeStat(cookies[STAT_COOKIE])
  return {
    vid,
    sid,
    key,
    isNewVisitor: !hadVid,
    isNewSession,
    samePageSession,
    lastStat: lastStat && lastStat.key === key ? lastStat : null
  }
}

function visitCookieHeaders(visit, counts) {
  return [
    cookiePair(VID_COOKIE, visit.vid, 31536000),
    cookiePair(SID_COOKIE, visit.sid, SESSION_SECONDS),
    cookiePair(HIT_COOKIE, `${visit.sid}:${visit.key}`, SESSION_SECONDS),
    cookiePair(STAT_COOKIE, encodeStat(counts, visit.key), SESSION_SECONDS)
  ]
}

function hasUvCookie(cookieHeader) {
  const cookies = parseCookieHeader(cookieHeader)
  return Boolean(cookies[VID_COOKIE] || cookies[LEGACY_UV_COOKIE])
}

function uvCookieHeader() {
  return cookiePair(VID_COOKIE, newId(), 31536000)
}

module.exports = {
  UV_COOKIE: VID_COOKIE,
  VID_COOKIE,
  SESSION_SECONDS,
  resolvePageUrl,
  parseCounts,
  normalizeCounts,
  parseIbruceJsonp,
  fetchRemoteCounts,
  inspectVisit,
  visitCookieHeaders,
  hasUvCookie,
  uvCookieHeader
}
