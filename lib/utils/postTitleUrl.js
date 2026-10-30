/**
 * Post permalink helpers.
 * Address-bar and WeChat sharing use an ASCII path.
 * Copyright display can still show a readable title after that path.
 */

export const POST_TITLE_SEGMENT_MAX = 120
export const CANONICAL_ORIGIN = 'https://www.ourbeings.com'

const ENABLED = new Set(['true', '1', 'yes', '__yes__'])
const DISABLED = new Set(['false', '0', 'no', '__no__'])

export function isEnabledFlag(value, fallback = false) {
  if (value === undefined || value === null || value === '') return fallback
  if (typeof value === 'boolean') return value
  const normalized = String(value).trim().toLowerCase()
  if (ENABLED.has(normalized)) return true
  if (DISABLED.has(normalized)) return false
  return fallback
}

export function sanitizePostTitleSegment(title) {
  let text = String(title || '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[\\/#?%]+/g, '')
    .replace(/\s*\|+\s*/g, '｜')
    .replace(/[ \t\u00A0]+/g, '　')
    .replace(/^[\s\u3000]+|[\s\u3000]+$/g, '')

  text = [...text]
    .map(ch => {
      if (/[A-Za-z0-9\-._~]/.test(ch) || ch.charCodeAt(0) > 127) return ch
      const code = ch.charCodeAt(0)
      if (code >= 33 && code <= 126) return String.fromCharCode(code + 0xfee0)
      return ''
    })
    .join('')

  if (!text) return ''
  return text.length > POST_TITLE_SEGMENT_MAX
    ? text.slice(0, POST_TITLE_SEGMENT_MAX)
    : text
}

export function decodeSlugSegment(part) {
  let current = String(part || '')
  for (let i = 0; i < 3; i++) {
    try {
      const next = decodeURIComponent(current)
      if (next === current) break
      current = next
    } catch {
      break
    }
  }
  return current
}

export function normalizeSlugPath(value) {
  return String(value || '')
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean)
    .map(decodeSlugSegment)
    .join('/')
}

export function canonicalOrigin(link) {
  try {
    let raw = String(link || CANONICAL_ORIGIN).trim()
    if (!raw) return CANONICAL_ORIGIN
    if (raw.startsWith('//')) raw = `https:${raw}`
    if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`
    const url = new URL(raw)
    const host = url.hostname.replace(/^www\./i, '').toLowerCase()
    if (host === 'ourbeings.com') return CANONICAL_ORIGIN
    url.protocol = 'https:'
    return url.origin
  } catch {
    return CANONICAL_ORIGIN
  }
}

export function appendPostTitleToSlug(slug, title) {
  const base = normalizeSlugPath(slug)
  const segment = sanitizePostTitleSegment(title)
  if (!base) return segment
  if (!segment) return base
  if (base === segment || base.endsWith(`/${segment}`)) return base
  return `${base}/${segment}`
}

export function prettyPostPath(slugOrHref) {
  let value = String(slugOrHref || '')
  try {
    if (/^https?:\/\//i.test(value)) {
      value = new URL(value).pathname
    }
  } catch {
    // keep value
  }
  value = value.split('#')[0].split('?')[0]
  const path = normalizeSlugPath(value)
  return path ? `/${path}` : '/'
}

export function encodePostPath(slug) {
  return prettyPostPath(slug)
}

export function prettyPostUrl(origin, slugOrHref) {
  return `${canonicalOrigin(origin)}${prettyPostPath(slugOrHref)}`
}

export function publicPostUrl(origin, post) {
  return prettyPostUrl(
    origin,
    resolvePostSlugBase(post) || post?.slug || post?.href
  )
}

export function displayPostUrl(origin, post) {
  const shortUrl = publicPostUrl(origin, post)
  if (!post || String(post.type) !== 'Post') return shortUrl
  const titleSeg = sanitizePostTitleSegment(post.title)
  if (!titleSeg) return shortUrl
  if (shortUrl.endsWith(`/${titleSeg}`)) return shortUrl
  return `${shortUrl}/${titleSeg}`
}

const DATED_POST_BASE = /^([^/]+\/\d{4}\/\d{2}\/\d{2}\/[^/]+)(?:\/.*)?$/

export function resolvePostSlugBase(post) {
  const explicit = normalizeSlugPath(post?.slugBase)
  if (explicit) return explicit
  const slug = normalizeSlugPath(post?.slug || post?.href)
  if (!slug) return ''
  const dated = slug.match(DATED_POST_BASE)
  return dated ? dated[1] : slug
}

export function matchRequestedPostSlug(post, fullSlug) {
  if (!post || String(post.type || '').includes('Menu')) return null
  const requested = normalizeSlugPath(fullSlug)
  if (!requested) return null
  const slug = normalizeSlugPath(post.slug)
  const slugBase = resolvePostSlugBase(post)
  if (slugBase && requested === slugBase) return 'exact'
  if (slug && requested === slug && slug === slugBase) return 'exact'
  if (post.id && String(post.id) === requested) return 'exact'
  if (slugBase && requested.startsWith(`${slugBase}/`)) return 'alias'
  if (slug && requested === slug) return 'alias'
  return null
}

export function syncPrettyPostUrl(post) {
  if (typeof window === 'undefined' || !post?.slug) return
  const currentPath = window.location.pathname
  if (!matchRequestedPostSlug(post, currentPath)) return
  // Keep the live address bar on the ASCII path so WeChat copies stay openable.
  const pretty = prettyPostPath(resolvePostSlugBase(post) || post.slug)
  const next = `${pretty}${window.location.search}${window.location.hash}`
  const current = `${currentPath}${window.location.search}${window.location.hash}`
  if (current !== next) {
    window.history.replaceState(window.history.state, '', next)
  }
}

export function findPostByRequestedSlug(pages, fullSlug) {
  if (!Array.isArray(pages)) return { post: null, match: null }
  let fallback = null
  for (const post of pages) {
    const match = matchRequestedPostSlug(post, fullSlug)
    if (match === 'exact') return { post, match }
    if (match && !fallback) fallback = { post, match }
  }
  return fallback || { post: null, match: null }
}

export function redirectIfCanonical(props) {
  if (props?.canonicalRedirect) {
    return {
      redirect: {
        destination: props.canonicalRedirect,
        permanent: true
      }
    }
  }
  return null
}
