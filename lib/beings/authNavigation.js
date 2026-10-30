// Only local, non-authentication destinations may survive an account flow.
export const AUTH_DEFAULT_RETURN = '/our-beings/me'
const LOCAL_ORIGIN = 'https://auth-navigation.invalid'
const BLOCKED_PATH =
  /^\/(?:sign-in|sign-up|auth|api|_next|\.well-known)(?:\/|$)/i

export const isAuthFlowPath = value =>
  typeof value === 'string' &&
  /^\/(?:sign-in|sign-up|auth|sso-callback)(?:\/|$)/i.test(
    value.split(/[?#]/)[0]
  )

export function safeAuthReturnPath(value) {
  if (typeof value !== 'string' || !value || value.length > 2048) {
    return AUTH_DEFAULT_RETURN
  }
  let decoded = value
  try {
    // Reject encoded controls, backslashes and protocol-relative destinations too.
    for (let i = 0; i < 4; i += 1) {
      if (
        !decoded.startsWith('/') ||
        decoded.startsWith('//') ||
        /[\\\s\u0000-\u001f\u007f]/.test(decoded)
      ) {
        return AUTH_DEFAULT_RETURN
      }
      const next = decodeURIComponent(decoded)
      if (next === decoded) break
      if (i === 3) return AUTH_DEFAULT_RETURN
      decoded = next
    }
    const normalized = new URL(decoded, LOCAL_ORIGIN)
    const target = new URL(value, LOCAL_ORIGIN)
    if (
      normalized.origin !== LOCAL_ORIGIN ||
      target.origin !== LOCAL_ORIGIN ||
      BLOCKED_PATH.test(normalized.pathname) ||
      BLOCKED_PATH.test(target.pathname)
    ) {
      return AUTH_DEFAULT_RETURN
    }
    return `${target.pathname}${target.search}${target.hash}`
  } catch {
    return AUTH_DEFAULT_RETURN
  }
}

export function authReturnFromQuery(query = {}) {
  return safeAuthReturnPath(
    query.returnTo ?? query.redirectTo ?? query.redirect_url
  )
}

export function authHref(mode = 'in', returnTo = AUTH_DEFAULT_RETURN) {
  const path = mode === 'up' ? '/sign-up' : '/sign-in'
  return `${path}?${new URLSearchParams({ returnTo: safeAuthReturnPath(returnTo) })}`
}
