import { fail, requireActor, validId } from '@/apps/wuzai/miniprogram/common/activities'
import { eventKey, userKey } from './redisStore'

const INDEX = 'wuzai:{activities:v1}:index'
const REMOVE = `
if redis.call('GET', KEYS[1]) ~= ARGV[1] then return 0 end
redis.call('DEL', KEYS[1])
redis.call('ZREM', KEYS[2], ARGV[2])
redis.call('ZREM', KEYS[3], ARGV[2])
return 1`

// Compare the entire record so a concurrent publication can never be deleted.
export async function deleteMiniDraft(redis, actor, input = {}) {
  requireActor(actor)
  if (!validId(input.id)) fail('not_found', '没有找到这份草稿。', 404)
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const raw = await redis.get(eventKey(input.id))
    if (!raw) return { id: input.id }
    const event = JSON.parse(raw)
    if (event.hostId !== actor.id) fail('forbidden', '只能删除自己发起的草稿。', 403)
    if (event.state !== 'draft' || event.publishedAt || Object.keys(event.reservations || {}).length)
      fail('draft_only', '这份内容已不是未发布草稿，请刷新后查看。', 409)
    const removed = await redis.eval(REMOVE, 3, eventKey(input.id), INDEX, userKey(actor.id), raw, input.id)
    if (removed === 1) return { id: input.id }
  }
  fail('conflict', '草稿刚刚发生变化，请刷新后重试。', 409)
}
