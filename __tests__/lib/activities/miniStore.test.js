/** @jest-environment node */
import { miniActivityStore, checkPublication } from '@/lib/activities/miniStore'
import { normalizeInput } from '@/apps/wuzai/miniprogram/common/activities'

const actor = { id: 'wx:test:host' }
const input = {
  title: '一起读一本书',
  description: '带着问题来交流',
  startsAt: '2030-01-02T12:00:00Z',
  endsAt: '2030-01-02T13:00:00Z',
  deadline: '2030-01-02T11:00:00Z',
  capacity: 12,
  format: 'online',
  discussion: 'wechat',
  location: '线上共读',
  joinInstructions: '预约后向主持人获取会议口令',
  confirmed: true,
  hostIntro: '由发起人主持',
  cost: '免费',
  preparation: '准备书籍',
  accessibility: '可文字参与',
  cancellationPolicy: '提前通知'
}
async function setup() {
  const redis = { eval: jest.fn().mockResolvedValue(1) }
  const event = {
    ...normalizeInput(input),
    id: 'test',
    hostId: actor.id,
    state: 'draft',
    createdAt: '2030-01-01T00:00:00Z'
  }
  await miniActivityStore(redis, 'create', input, actor, {
    key: 'ticket',
    pending: 'value'
  }).create(event)
  redis.eval.mockClear()
  return { redis, event }
}
test('publication confirmation is tied to the actual arrangements', async () => {
  const { event } = await setup()
  expect(() => checkPublication(event)).not.toThrow()
  event.location = '另一个会议室'
  expect(() => checkPublication(event)).toThrow('确认')
})
test('editing a published event cannot bypass publication checks', async () => {
  const { redis, event } = await setup()
  event.state = 'published'
  const store = miniActivityStore(
    redis,
    'edit',
    { ...input, confirmed: false },
    actor
  )
  expect(() => store.compareAndSet(event, 'previous', actor.id)).toThrow('确认')
  expect(redis.eval).not.toHaveBeenCalled()
})
test('drafts remain editable while arrangements are incomplete', async () => {
  const { redis, event } = await setup()
  const store = miniActivityStore(
    redis,
    'edit',
    { ...input, confirmed: false },
    actor
  )
  expect(await store.compareAndSet(event, 'previous', actor.id)).toBe(true)
  expect(redis.eval).toHaveBeenCalledTimes(1)
})
test('confirmed published edits save and retain the confirmation basis', async () => {
  const { redis, event } = await setup()
  event.state = 'published'
  event.location = '新会议室'
  expect(
    await miniActivityStore(redis, 'edit', input, actor).compareAndSet(
      event,
      'previous',
      actor.id
    )
  ).toBe(true)
  expect(() => checkPublication(event)).not.toThrow()
})
test('the new form publishes with one combined introduction and an uploaded cover', async () => {
  const next = {
    ...input,
    gatheringVersion: 2,
    channel: 'wechat',
    participantLimit: 6,
    capacity: 5,
    book: '时间简史',
    language: 'de',
    facilitatorId: 'organizer',
    deadline: '2030-01-02T11:30:00Z',
    cover: '/api/our-beings/covers/' + 'a'.repeat(64),
    hostIntro: '',
    cost: '',
    preparation: '',
    accessibility: '',
    cancellationPolicy: ''
  }
  const event = {
    ...normalizeInput(next),
    id: 'new',
    hostId: actor.id,
    state: 'draft',
    createdAt: '2030-01-01T00:00:00Z'
  }
  const redis = { eval: jest.fn().mockResolvedValue(1) }
  await miniActivityStore(redis, 'create', next, actor, {
    key: 'ticket',
    pending: 'value'
  }).create(event)
  expect(() => checkPublication(event)).not.toThrow()
  event.languageDetail = 'changed'
  expect(() => checkPublication(event)).toThrow('确认')
})
