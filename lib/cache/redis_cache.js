import { gzipSync, gunzipSync } from 'zlib'
import Redis from 'ioredis'
import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import {
  createRedisLimiter,
  decodeRedisValue,
  encodeRedisValue,
  isRedisPlanLimitError
} from './redis_limits'

const cacheTime = Math.trunc(
  siteConfig('NEXT_REVALIDATE_SECOND', BLOG.NEXT_REVALIDATE_SECOND) * 1.5
)

const limiter = createRedisLimiter()

function redisOptions() {
  return {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    connectTimeout: 2000,
    commandTimeout: 2000,
    retryStrategy(times) {
      if (limiter.isOpen()) return null
      if (times > 1) return null
      return 300
    }
  }
}

function noteLimit(err) {
  if (isRedisPlanLimitError(err)) {
    limiter.open(String(err?.message || err))
    return true
  }
  return false
}

export const redisClient = BLOG.REDIS_URL
  ? new Redis(BLOG.REDIS_URL, redisOptions())
  : null

if (redisClient) {
  redisClient.on('error', err => {
    noteLimit(err)
  })
}

async function ensureClient() {
  if (!redisClient || limiter.isOpen()) return false
  const status = redisClient.status
  if (status === 'ready') return true
  if (status === 'wait' || status === 'close' || status === 'end') {
    try {
      await redisClient.connect()
      return redisClient.status === 'ready'
    } catch (err) {
      noteLimit(err)
      return false
    }
  }
  return false
}

export async function getCache(key) {
  if (!(await ensureClient())) return null
  try {
    const data = await redisClient.get(key)
    return data ? decodeRedisValue(data, { gunzipSync }) : null
  } catch (e) {
    if (!noteLimit(e)) {
      console.error(`redisClient读取失败 ${String(e)}`)
    }
    return null
  }
}

export async function setCache(key, data, customCacheTime) {
  const encoded = encodeRedisValue(data, { gzipSync })
  if (encoded == null) return false
  if (!(await ensureClient())) return false
  try {
    await redisClient.set(
      key,
      encoded,
      'EX',
      customCacheTime || cacheTime
    )
    return true
  } catch (e) {
    if (!noteLimit(e)) {
      console.error(`redisClient写入失败 ${String(e)}`)
    }
    return false
  }
}

export async function delCache(key) {
  if (!(await ensureClient())) return false
  try {
    await redisClient.del(key)
    return true
  } catch (e) {
    if (!noteLimit(e)) {
      console.error(`redisClient删除失败 ${String(e)}`)
    }
    return false
  }
}

export default { getCache, setCache, delCache }
