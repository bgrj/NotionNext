/**
 * Post permalink helpers: append the article title after the existing slug,
 * match legacy URLs, and keep address-bar titles readable.
 */

export const POST_TITLE_SEGMENT_MAX = 120

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
  // Browsers percent-encode ASCII space and | as %20 / %7C in the address bar.
  // Convert those to Unicode so every Post URL stays readable.
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

export function normalizeSlugPath(value) {
  return String(value || '')
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean)
    .map(part => {
      try {
        return decodeURIComponent(part)
      } catch {
        return part
      }
    })
    .join('/')
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
  const base = String(origin || '').replace(/\/+$/, '')
  return `${base}${prettyPostPath(slugOrHref)}`
}

export function matchRequestedPostSlug(post, fullSlug) {
  if (!post || String(post.type || '').includes('Menu')) return null
  const requested = normalizeSlugPath(fullSlug)
  if (!requested) return null
  const slug = normalizeSlugPath(post.slug)
  const slugBase = normalizeSlugPath(post.slugBase)
  if (slug && slug === requested) return 'exact'
  if (post.id && String(post.id) === requested) return 'exact'
  if (slugBase && slugBase === requested) return 'legacy'
  if (slugBase && requested.startsWith(`${slugBase}/`)) {
    const rest = requested.slice(slugBase.length + 1)
    if (rest && !rest.includes('/')) return 'alias'
  }
  return null
}

export function syncPrettyPostUrl(post) {
  if (typeof window === 'undefined' || !post?.slug) return
  const currentPath = window.location.pathname
  if (!matchRequestedPostSlug(post, currentPath)) return
  const pretty = prettyPostPath(post.slug)
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
