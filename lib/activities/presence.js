import { createHash } from 'node:crypto'
import {
  fail,
  requireActor,
  validId
} from '@/apps/wuzai/miniprogram/common/activities'
const TTL = 75000
const KEY = 'wuzai:{presence:v1}:'
// One bounded, atomic lease store. Activity records are never touched.
const SCRIPT = `
local expired=redis.call('ZRANGEBYSCORE',KEYS[1],'-inf',ARGV[1]-ARGV[2])
for _,id in ipairs(expired) do redis.call('ZREM',KEYS[1],id); redis.call('HDEL',KEYS[2],id) end
if ARGV[3]=='leave' then redis.call('ZREM',KEYS[1],ARGV[4]); redis.call('HDEL',KEYS[2],ARGV[4]) end
if ARGV[3]=='beat' then
 if redis.call('ZCARD',KEYS[1])>=10000 and not redis.call('ZSCORE',KEYS[1],ARGV[4]) then return {'capacity'} end
 redis.call('ZADD',KEYS[1],ARGV[1],ARGV[4]); redis.call('HSET',KEYS[2],ARGV[4],ARGV[5])
 redis.call('PEXPIRE',KEYS[1],ARGV[2]*2); redis.call('PEXPIRE',KEYS[2],ARGV[2]*2)
end
return redis.call('HVALS',KEYS[2])`
export function summarizePresence(rows) {
  const people = new Set(),
    groups = new Set()
  for (const row of rows) {
    const { actor, room } = JSON.parse(row)
    people.add(actor)
    if (room) groups.add(room)
  }
  return { people: people.size, groups: groups.size }
}
export async function activityPresence(
  redis,
  action,
  input,
  actor,
  service,
  now = Date.now()
) {
  let mode = 'stats',
    key = '',
    value = ''
  if (action === 'presence') {
    requireActor(actor)
    if (!/^[a-zA-Z0-9_-]{16,80}$/.test(input.session || ''))
      fail('invalid_session', '请刷新页面后重试。')
    const digest = createHash('sha256').update(actor.id).digest('hex')
    key = `${digest}:${input.session}`
    mode = input.leave === true ? 'leave' : 'beat'
    let room = ''
    if (mode === 'beat' && input.id) {
      if (!validId(input.id)) fail('not_found', '没有找到这场活动。', 404)
      const { event } = await service('get', { id: input.id }, actor)
      if (!event.isHost && event.reservation !== 'confirmed')
        fail('forbidden', '预约成功后才能进入本站活动交流群。', 403)
      if (
        event.state === 'published' &&
        !['ended', 'cancelled'].includes(event.status)
      )
        room = event.id
    }
    value = JSON.stringify({ actor: digest, room })
  }
  const rows = await redis.eval(
    SCRIPT,
    2,
    KEY + 'leases',
    KEY + 'sessions',
    now,
    TTL,
    mode,
    key,
    value
  )
  if (rows[0] === 'capacity')
    fail('too_busy', '现在访问的人比较多，请稍后再试。', 429)
  return {
    presence: {
      ...summarizePresence(rows),
      asOf: new Date(now).toISOString(),
      ttlSeconds: TTL / 1000
    }
  }
}
