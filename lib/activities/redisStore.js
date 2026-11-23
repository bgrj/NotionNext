import Redis from 'ioredis'
import { createHash } from 'node:crypto'
import { fail } from '@/apps/wuzai/miniprogram/common/activities'

const PREFIX = 'wuzai:{activities:v1}:'
let client
export const userKey = id =>
  `${PREFIX}user:${createHash('sha256').update(id).digest('hex')}`
const eventKey = id => `${PREFIX}event:${id}`
const INDEX = `${PREFIX}index`
export function activityRedis() {
  if (!process.env.REDIS_URL)
    fail('unavailable', '活动服务暂时不可用，请稍后再来。', 503)
  if (!client)
    client = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      connectTimeout: 4000,
      commandTimeout: 5000,
      enableReadyCheck: false,
      retryStrategy: () => null
    })
  return client
}
const CREATE = `if redis.call('EXISTS', KEYS[1]) == 1 then return 0 end
redis.call('SET', KEYS[1], ARGV[1])
redis.call('ZADD', KEYS[2], ARGV[2], ARGV[3])
redis.call('ZADD', KEYS[3], ARGV[2], ARGV[3])
return 1`
const CAS = `if redis.call('GET', KEYS[1]) ~= ARGV[1] then return 0 end
redis.call('SET', KEYS[1], ARGV[2])
redis.call('ZADD', KEYS[2], ARGV[3], ARGV[4])
return 1`
export function redisActivityStore(redis = activityRedis()) {
  return {
    get: id => redis.get(eventKey(id)),
    getMany: ids =>
      ids.length ? redis.mget(ids.map(eventKey)) : Promise.resolve([]),
    ids: (actorId, offset, limit) =>
      redis.zrevrange(
        actorId ? userKey(actorId) : INDEX,
        offset,
        offset + limit - 1
      ),
    create: event =>
      redis
        .eval(
          CREATE,
          3,
          eventKey(event.id),
          INDEX,
          userKey(event.hostId),
          JSON.stringify(event),
          Date.parse(event.createdAt),
          event.id
        )
        .then(result => result === 1),
    compareAndSet: (event, raw, actorId) =>
      redis
        .eval(
          CAS,
          2,
          eventKey(event.id),
          userKey(actorId),
          raw,
          JSON.stringify(event),
          Date.parse(event.updatedAt),
          event.id
        )
        .then(result => result === 1)
  }
}
