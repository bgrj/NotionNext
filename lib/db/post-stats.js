import BLOG from '@/blog.config'
import { redisClient } from '@/lib/cache/redis_cache'

const POST_STATS_KEY_PREFIX = 'post:stats'
const POST_STATS_VISITOR_KEY_PREFIX = 'post:stats:visitors'

const hasRedisClient =
  redisClient &&
  typeof redisClient.multi === 'function' &&
  typeof redisClient.hgetall === 'function' &&
  typeof redisClient.hincrby === 'function' &&
  typeof redisClient.sadd === 'function'

export const isPostStatsEnabled =
  (BLOG.POST_STATS_ENABLE === true || BLOG.POST_STATS_ENABLE === 'true') &&
  hasRedisClient

const normalizePostId = postId => {
  if (!postId || typeof postId !== 'string') {
    return ''
  }

  return postId.trim().slice(0, 200)
}

const getStatsKey = postId => `${POST_STATS_KEY_PREFIX}:${postId}`
const getVisitorKey = postId => `${POST_STATS_VISITOR_KEY_PREFIX}:${postId}`

const parseStatValue = value => {
  const count = Number(value || 0)
  return Number.isFinite(count) ? count : 0
}

export async function getPostStats(postId) {
  const normalizedPostId = normalizePostId(postId)
  if (!normalizedPostId || !isPostStatsEnabled) {
    return { views: 0, visitors: 0 }
  }

  const stats = await redisClient.hgetall(getStatsKey(normalizedPostId))

  return {
    views: parseStatValue(stats?.views),
    visitors: parseStatValue(stats?.visitors)
  }
}

export async function trackPostView(postId, visitorId) {
  const normalizedPostId = normalizePostId(postId)
  if (!normalizedPostId || !isPostStatsEnabled) {
    return { views: 0, visitors: 0 }
  }

  const statsKey = getStatsKey(normalizedPostId)
  const visitorKey = getVisitorKey(normalizedPostId)
  const pipeline = redisClient.multi()

  pipeline.hincrby(statsKey, 'views', 1)

  if (visitorId) {
    pipeline.sadd(visitorKey, visitorId)
  }

  const result = await pipeline.exec()
  const visitorAdded = visitorId ? Number(result?.[1]?.[1] || 0) : 0

  if (visitorAdded > 0) {
    await redisClient.hincrby(statsKey, 'visitors', 1)
  }

  return getPostStats(normalizedPostId)
}