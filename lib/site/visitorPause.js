/** Flip this to reopen the rest of the site. Dao and friend links stay available. */
export const VISITOR_PAUSE = true

const DAO = '道'

function cleanPath(value) {
  const path = String(value || '/').split('#')[0].split('?')[0]
  let decoded = path
  try {
    decoded = decodeURIComponent(path)
  } catch {
    decoded = path
  }
  if (decoded.length > 1) decoded = decoded.replace(/\/+$/, '')
  return decoded || '/'
}

function includesDao(value) {
  if (value === DAO) return true
  return Array.isArray(value) && value.includes(DAO)
}

function slugOf(value) {
  return String(value || '')
    .replace(/^\/+/, '')
    .split('/')[0]
    .toLowerCase()
}

/**
 * During the visitor pause, only Dao reading, the friend-link page, and the
 * owner's mini-program admin door remain reachable.
 */
export function visitorMayRead(
  { pathname, post, category, slug, friendLinks } = {},
  paused = VISITOR_PAUSE
) {
  if (!paused) return true
  const path = pathname == null ? '' : cleanPath(pathname)
  if (path === '/') return true
  if (path === '/category/道' || path.startsWith('/category/道/')) return true
  if (path === '/links' || path === '/link') return true
  if (path === '/our-beings/feedback-admin') return true
  if (path === '/our-beings/feedback-scan') return true
  if (path === '/ielts' || path.startsWith('/ielts/')) return true
  if (friendLinks) return true
  const pageSlug = slugOf(slug || post?.slug)
  if (pageSlug === 'links' || pageSlug === 'link') return true
  if (includesDao(category) || includesDao(post?.category)) return true
  return false
}

function blockedDestination(path) {
  return (
    path.startsWith('/sign-in') ||
    path.startsWith('/sign-up') ||
    path.startsWith('/auth') ||
    path.startsWith('/dashboard') ||
    (path.startsWith('/our-beings') && path !== '/our-beings/feedback-scan') ||
    (path.startsWith('/category/') &&
      path !== '/category/道' &&
      !path.startsWith('/category/道/')) ||
    path.startsWith('/tag') ||
    path.startsWith('/archive') ||
    path.startsWith('/search') ||
    path.startsWith('/feedback') ||
    path.startsWith('/page/')
  )
}

/** Whether a click may leave the current page. */
export function visitorMayFollowPath(pathname, { dao = false } = {}) {
  if (!VISITOR_PAUSE) return true
  const path = cleanPath(pathname)
  if (path === '/') return true
  if (visitorMayRead({ pathname: path })) return true
  if (dao && !blockedDestination(path)) return true
  return false
}
