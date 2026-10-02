// Edge-safe, deliberately independent of the heavyweight utils barrel.
/**
 * @param {string} pathname
 * @param {boolean|string|number} enabled
 * @returns {string|null}
 */
export function getNotionRedirectId(pathname, enabled = true) {
  if (
    enabled === false ||
    ['false', '0', 'off', 'no'].includes(
      String(enabled).trim().toLowerCase()
    ) ||
    typeof pathname !== 'string' ||
    /^\/(?:api|_next)(?:\/|$)/.test(pathname)
  ) {
    return null
  }
  const lastPart = pathname.replace(/\/+$/, '').split('/').pop() || ''
  const compact = lastPart.replace(/-/g, '')
  if (!/^[a-f0-9]{32}$/i.test(compact)) return null
  if (
    lastPart !== compact &&
    !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(lastPart)
  ) {
    return null
  }
  const id = compact.toLowerCase()
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`
}

export function safeRedirectPath(value) {
  if (
    typeof value !== 'string' ||
    !value.trim() ||
    /[\u0000-\u0020\\?#]/.test(value) ||
    value.startsWith('//') ||
    /^[a-z][a-z0-9+.-]*:/i.test(value)
  ) {
    return null
  }
  return value.startsWith('/') ? value : `/${value}`
}
