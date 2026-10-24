/**
 * Post permalink helpers: append the article title after the existing slug,
 * match legacy URLs, and encode redirect destinations.
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
  const text = String(title || '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[\\/#?%]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!text) return ''
  return text.length > POST_TITLE_SEGMENT_MAX
    ? text.slice(0, POST_TITLE_SEGMENT_MAX).trim()
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

export function encodePostPath(slug) {
  const path = normalizeSlugPath(slug)
  if (!path) return '/'
  return `/${path.split('/').map(encodeURIComponent).join('/')}`
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
