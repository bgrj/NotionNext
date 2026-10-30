const buckets = new Map()

export function hitRateLimit(
  key,
  { limit = 10, windowMs = 15 * 60 * 1000 } = {}
) {
  if (!key) return true
  const now = Date.now()
  const current = buckets.get(key)
  if (!current || now >= current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }
  current.count += 1
  return current.count > limit
}

export function resetRateLimitForTests() {
  buckets.clear()
}
