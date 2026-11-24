import { activityWritings } from '@/lib/activities/writings'
import { demoEvents } from '@/apps/wuzai/miniprogram/common/demo-events'

const actor = {
  id: 'wx:app:person-one',
  name: '同一个称呼',
  platform: 'wechat'
}
const another = { ...actor, id: 'wx:app:person-two' }
const now = Date.parse('2026-11-24T10:00:00Z')
function memoryRedis() {
  const values = new Map(),
    indexes = new Map()
  return {
    eval: jest.fn(
      async (
        _script,
        _count,
        key,
        mine,
        published,
        body,
        score,
        id,
        isPublic
      ) => {
        const ids = indexes.get(mine) || []
        if (ids.length >= 100) return 0
        values.set(key, body)
        indexes.set(mine, [id, ...ids])
        if (isPublic === '1')
          indexes.set(published, [id, ...(indexes.get(published) || [])])
        return 1
      }
    ),
    zrevrange: async (key, start, end) =>
      (indexes.get(key) || []).slice(start, end + 1),
    mget: async keys => keys.map(key => values.get(key))
  }
}
test('writing defaults private; verified identity and server time override client fields', async () => {
  const redis = memoryRedis()
  const { writing } = await activityWritings(
    redis,
    'saveWriting',
    {
      room: 'dao',
      title: ' 一个问题 ',
      body: ' 一段理解 ',
      owner: another.id,
      createdAt: '1900-01-01',
      author: '伪造'
    },
    actor,
    now
  )
  expect(writing).toMatchObject({
    public: false,
    title: '一个问题',
    body: '一段理解',
    author: actor.name,
    createdAt: new Date(now).toISOString()
  })
  expect(writing).not.toHaveProperty('owner')
  expect(await activityWritings(redis, 'writings', {}, actor)).toEqual({
    writings: [writing]
  })
  expect(await activityWritings(redis, 'writings', {}, another)).toEqual({
    writings: []
  })
  expect(await activityWritings(redis, 'publicWritings', {}, null)).toEqual({
    writings: []
  })
})
test('explicit publication is readable without login and omits account identifiers', async () => {
  const redis = memoryRedis()
  const { writing } = await activityWritings(
    redis,
    'saveWriting',
    { room: 'shu', title: '方法', body: '内容', public: true },
    actor,
    now
  )
  expect(await activityWritings(redis, 'publicWritings', {}, null)).toEqual({
    writings: [writing]
  })
  expect(JSON.stringify(writing)).not.toContain(actor.id)
})
test.each([
  [{ room: 'other', title: '标题', body: '内容' }, 'invalid_room'],
  [{ room: 'dao', title: ' ', body: '内容' }, 'invalid_title'],
  [{ room: 'dao', title: '标题', body: 'a'.repeat(4001) }, 'invalid_body']
])('invalid writing never reaches storage', async (input, code) => {
  const redis = memoryRedis()
  await expect(
    activityWritings(redis, 'saveWriting', input, actor)
  ).rejects.toMatchObject({ code })
  expect(redis.eval).not.toHaveBeenCalled()
})
test('anonymous and website accounts cannot access WeChat private writing', async () => {
  const redis = memoryRedis()
  await expect(
    activityWritings(redis, 'writings', {}, null)
  ).rejects.toMatchObject({ code: 'unauthorized' })
  await expect(
    activityWritings(redis, 'writings', {}, { ...actor, platform: 'web' })
  ).rejects.toMatchObject({ code: 'wechat_login_required' })
})
test('demo catalogue covers distinct cities, languages, channels and lifecycle states', () => {
  const events = demoEvents(now)
  expect(events).toHaveLength(15)
  expect(new Set(events.map(item => item.id)).size).toBe(15)
  for (const state of ['open', 'full', 'closed', 'ended', 'cancelled'])
    expect(events.some(item => item.status === state)).toBe(true)
  expect(new Set(events.map(item => item.channel)).size).toBe(6)
  expect(
    events.every(
      item => item.demo && !item.canReserve && !item.canPost && !item.canChat
    )
  ).toBe(true)
})
