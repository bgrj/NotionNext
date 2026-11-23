import { randomUUID } from 'node:crypto'
import {
  changeEvent,
  fail,
  isHost,
  isMember,
  normalizeInput,
  publicEvent,
  requireActor,
  validId
} from '@/apps/wuzai/miniprogram/common/activities'

// A repository adapter provides atomic compare-and-set. The same service handles
// web sessions and identities authenticated by the native WeChat cloud gateway.
export function createActivityService(store, clock = Date.now) {
  const load = async id => {
    if (!validId(id)) fail('not_found', '没有找到这场活动。', 404)
    const raw = await store.get(id)
    if (!raw) fail('not_found', '没有找到这场活动。', 404)
    return { raw, event: JSON.parse(raw) }
  }
  return async function execute(action, input = {}, actor = null) {
    if (action === 'list' || action === 'mine') {
      if (action === 'mine') requireActor(actor)
      const offset = Math.floor(
        Math.max(0, Math.min(10000, Number(input.offset) || 0))
      )
      const ids = await store.ids(
        action === 'mine' ? actor.id : null,
        offset,
        40
      )
      const rows = await store.getMany(ids)
      const events = rows
        .filter(Boolean)
        .map(raw => JSON.parse(raw))
        .filter(event =>
          action === 'mine'
            ? isHost(event, actor) || Boolean(event.reservations?.[actor.id])
            : Boolean(event.publishedAt)
        )
      return {
        events: events.map(event => publicEvent(event, actor, clock())),
        nextOffset: ids.length === 40 ? offset + 40 : null
      }
    }
    if (action === 'create') {
      requireActor(actor)
      const now = clock()
      const fields = normalizeInput(input)
      if (Date.parse(fields.deadline) <= now)
        fail('invalid_time', '预约截止时间需在未来。')
      const event = {
        ...fields,
        id: randomUUID(),
        state: 'draft',
        hostId: actor.id,
        hostName: actor.name,
        source: actor.platform,
        reservations: {},
        messages: [],
        announcements: [],
        nextSequence: 1,
        createdAt: new Date(now).toISOString(),
        updatedAt: new Date(now).toISOString()
      }
      if (!(await store.create(event)))
        fail('conflict', '保存发生冲突，请重试。', 409)
      return { event: publicEvent(event, actor, now) }
    }
    if (action === 'get' || action === 'messages') {
      const { event } = await load(input.id)
      const view = publicEvent(event, actor, clock())
      if (action === 'messages') {
        if (!isMember(event, actor) || event.discussion !== 'site')
          fail('forbidden', '本群仅向发起人和已预约的参与者开放。', 403)
        return {
          messages: event.messages.map(({ id, name, body, at }) => ({
            id,
            name,
            body,
            at
          })),
          canPost: view.canPost
        }
      }
      return { event: view }
    }
    requireActor(actor)
    for (let attempt = 0; attempt < 24; attempt += 1) {
      const { event, raw } = await load(input.id)
      // Draft visibility and membership checks happen before every retry.
      publicEvent(event, actor, clock())
      const next = changeEvent(event, action, input, actor, clock())
      if (await store.compareAndSet(next, raw, actor.id))
        return { event: publicEvent(next, actor, clock()) }
    }
    fail('busy', '现在预约的人有点多，请稍后再试。', 409)
  }
}
