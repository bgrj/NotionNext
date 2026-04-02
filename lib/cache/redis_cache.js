import BLOG from '@/blog.config'
import Redis from 'ioredis'

const rawRedisUrl = process.env.REDIS_URL || ''

const normalizeRedisUrl = value => {
  if (!value || typeof value !== 'string') return ''

  // 兼容把 `redis-cli --tls -u redis://...` 误填进 REDIS_URL 的场景
  const decoded = decodeURIComponent(value.trim())
  const matched = decoded.match(/rediss?:\/\/\S+/i)
  return matched?.[0] || ''
}

export const redisUrl = normalizeRedisUrl(rawRedisUrl)
export const hasValidRedisUrl = Boolean(redisUrl)

if (rawRedisUrl && !hasValidRedisUrl) {
  console.warn('[redis] REDIS_URL 无效，已自动禁用 Redis 缓存。')
}

export const redisClient = hasValidRedisUrl
  ? new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      connectTimeout: 5000
    })
  : {}

if (hasValidRedisUrl && typeof redisClient.on === 'function') {
  redisClient.on('error', error => {
    console.warn('[redis] 连接异常:', error?.message || String(error))
  })
}

const cacheTime = Math.trunc(
  (Number(BLOG.NEXT_REVALIDATE_SECOND) || 60) * 1.5
)

export async function getCache(key) {
  try {
    const data = await redisClient.get(key)
    return data ? JSON.parse(data) : null
  } catch (e) {
    console.error(`redisClient读取失败 ${String(e)}`)
  }
}

export async function setCache(key, data, customCacheTime) {
  try {
    await redisClient.set(
      key,
      JSON.stringify(data),
      'EX',
      customCacheTime || cacheTime
    )
  } catch (e) {
    console.error(`redisClient写入失败 ${String(e)}`)
  }
}

export async function delCache(key) {
  try {
    await redisClient.del(key)
  } catch (e) {
    console.error(`redisClient删除失败 ${String(e)}`)
  }
}

export default { getCache, setCache, delCache }
