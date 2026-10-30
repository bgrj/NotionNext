const REDIS_PLAN_LIMIT_RE =
  /reached current .* plan limits|max requests limit exceeded|DB capacity quota exceeded|max daily request limit/i

const GZ_PREFIX = 'gz1:'
const DEFAULT_OPEN_MS = 5 * 60 * 1000
const DEFAULT_MAX_VALUE_BYTES = 512 * 1024
const GZIP_AFTER_BYTES = 2048

export { GZ_PREFIX, DEFAULT_OPEN_MS, DEFAULT_MAX_VALUE_BYTES }

export function isRedisPlanLimitError(err) {
  return REDIS_PLAN_LIMIT_RE.test(String(err?.message || err || ''))
}

export function createRedisLimiter({
  openMs = DEFAULT_OPEN_MS,
  logEveryMs = 60 * 1000,
  now = () => Date.now(),
  warn = msg => console.warn(msg)
} = {}) {
  let openUntil = 0
  let lastLog = 0

  return {
    isOpen() {
      return now() < openUntil
    },
    open(reason) {
      openUntil = now() + openMs
      if (now() - lastLog < logEveryMs) return
      lastLog = now()
      warn(
        `[Cache][REDIS] paused ${Math.round(openMs / 1000)}s after plan/limit error: ${reason}`
      )
    },
    reset() {
      openUntil = 0
    }
  }
}

export function encodeRedisValue(
  data,
  { maxValueBytes = DEFAULT_MAX_VALUE_BYTES, gzipSync } = {}
) {
  const json = JSON.stringify(data)
  const jsonBytes = Buffer.byteLength(json)
  if (jsonBytes <= GZIP_AFTER_BYTES) {
    return jsonBytes > maxValueBytes ? null : json
  }
  if (typeof gzipSync !== 'function') {
    return jsonBytes > maxValueBytes ? null : json
  }
  const compressed = gzipSync(Buffer.from(json, 'utf8'))
  if (compressed.length > maxValueBytes) return null
  return GZ_PREFIX + compressed.toString('base64')
}

export function decodeRedisValue(raw, { gunzipSync } = {}) {
  if (raw == null) return null
  const text = String(raw)
  if (text.startsWith(GZ_PREFIX)) {
    if (typeof gunzipSync !== 'function') {
      throw new Error('gzip decoder missing')
    }
    const buf = gunzipSync(Buffer.from(text.slice(GZ_PREFIX.length), 'base64'))
    return JSON.parse(buf.toString('utf8'))
  }
  return JSON.parse(text)
}
