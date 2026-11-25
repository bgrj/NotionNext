import { createActivityService } from '@/lib/activities/service'
import {
  eventStatus,
  formatTime,
  normalizeInput
} from '@/apps/wuzai/miniprogram/common/activities'

const NOW = Date.parse('2030-01-01T00:00:00Z')
const host = { id: 'clerk:host', name: '发起人', platform: 'web' }
const reader = { id: 'wx:test:reader', name: '读者', platform: 'wechat' }
const fields = {
  title: '一起读我与你',
  description: '带着一个问题来，读一段书。',
  startsAt: '2030-01-02T19:30:00+08:00',
  endsAt: '2030-01-02T21:00:00+08:00',
  deadline: '2030-01-02T19:00:00+08:00',
  capacity: 2,
  format: 'online',
  discussion: 'site',
  location: '线上共读',
  joinInstructions: '私密会议口令 123',
  book: '我与你'
}
function memoryStore() {
  const values = new Map()
  const userIds = new Map()
  const remember = (user, id) => {
    if (!userIds.has(user)) userIds.set(user, new Set())
    userIds.get(user).add(id)
  }
  return {
    get: id => Promise.resolve(values.get(id) || null),
    getMany: ids => Promise.resolve(ids.map(id => values.get(id) || null)),
    ids: (user, offset, size) =>
      Promise.resolve(
        [...(user ? userIds.get(user) || [] : values.keys())].slice(
          offset,
          offset + size
        )
      ),
    create: event => {
      if (values.has(event.id)) return Promise.resolve(false)
      values.set(event.id, JSON.stringify(event))
      remember(event.hostId, event.id)
      return Promise.resolve(true)
    },
    compareAndSet: (event, raw, user) => {
      if (values.get(event.id) !== raw) return Promise.resolve(false)
      values.set(event.id, JSON.stringify(event))
      remember(user, event.id)
      return Promise.resolve(true)
    }
  }
}
test('concurrent bookings never exceed six people including the organizer', async () => {
  const execute = createActivityService(memoryStore(), () => NOW)
  const data = { ...fields, gatheringVersion: 2, participantLimit: 6, language: 'zh', discussion: 'wechat', channel: 'wechat' }
  const { event } = await execute('create', data, host)
  await execute('publish', { id: event.id }, host)
  const results = await Promise.allSettled(Array.from({length:12}, (_, index) => execute('reserve', { id: event.id }, { id:'wx:member-'+index, name:'存在者'+(index+2)+'号' })))
  expect(results.filter(result => result.status === 'fulfilled')).toHaveLength(5)
  const current = (await execute('get', { id: event.id }, host)).event
  expect(current.participantCount).toBe(6)
  expect(current.remaining).toBe(0)
  expect(current.hostCandidates).toHaveLength(6)
})
describe('shared web and native WeChat activity service', () => {
  let execute, id, now
  beforeEach(async () => {
    now = NOW
    execute = createActivityService(memoryStore(), () => now)
    id = (await execute('create', fields, host)).event.id
  })
  const publish = async () => execute('publish', { id }, host)
  test('drafts are private in both list and detail', async () => {
    expect((await execute('list')).events).toEqual([])
    await expect(execute('get', { id }, reader)).rejects.toMatchObject({
      status: 404
    })
    expect((await execute('mine', {}, host)).events[0].state).toBe('draft')
  })
  test('cancelling an unpublished draft never exposes it', async () => {
    await execute('cancelEvent', { id }, host)
    expect((await execute('list')).events).toEqual([])
    await expect(execute('get', { id })).rejects.toMatchObject({ status: 404 })
  })
  test('public fields exclude participant identities, raw host IDs and meeting instructions', async () => {
    await publish()
    const { event } = await execute('get', { id })
    expect(event.joinInstructions).toBe('')
    for (const field of ['hostId', 'reservations', 'messages', 'source'])
      expect(event).not.toHaveProperty(field)
  })
  test('anonymous users can read but cannot reserve or inspect a private group', async () => {
    await publish()
    await expect(execute('reserve', { id })).rejects.toMatchObject({
      status: 401
    })
    await expect(execute('messages', { id })).rejects.toMatchObject({
      status: 403
    })
  })
  test('non-owners cannot edit, publish, cancel or announce', async () => {
    await publish()
    for (const action of ['edit', 'publish', 'cancelEvent', 'announce'])
      await expect(
        execute(action, { ...fields, id, body: '测试' }, reader)
      ).rejects.toMatchObject({ status: 403 })
  })
  test('20 simultaneous requests cannot overbook the final two seats', async () => {
    await publish()
    const requests = Array.from({ length: 20 }, (_, i) =>
      execute('reserve', { id }, { ...reader, id: `reader-${i}` })
    )
    const results = await Promise.allSettled(requests)
    expect(results.filter(item => item.status === 'fulfilled')).toHaveLength(2)
    expect((await execute('get', { id })).event).toMatchObject({
      booked: 2,
      remaining: 0,
      status: 'full'
    })
  })
  test('repeated and concurrent reservations by one person are idempotent', async () => {
    await publish()
    await Promise.all(
      Array.from({ length: 8 }, () => execute('reserve', { id }, reader))
    )
    expect((await execute('get', { id }, reader)).event).toMatchObject({
      booked: 1,
      reservation: 'confirmed',
      joinInstructions: fields.joinInstructions
    })
  })
  test('cancelling releases the seat and immediately revokes group access', async () => {
    await publish()
    await execute('reserve', { id }, reader)
    await execute('cancelReservation', { id }, reader)
    expect((await execute('get', { id }, reader)).event).toMatchObject({
      booked: 0,
      canChat: false,
      joinInstructions: ''
    })
    await expect(execute('messages', { id }, reader)).rejects.toMatchObject({
      status: 403
    })
    await expect(
      execute('message', { id, body: '越权消息' }, reader)
    ).rejects.toMatchObject({ status: 403 })
  })
  test('rebooking does not create a duplicate or erase prior cancellation history in the user index', async () => {
    await publish()
    await execute('reserve', { id }, reader)
    await execute('cancelReservation', { id }, reader)
    await execute('reserve', { id }, reader)
    expect((await execute('mine', {}, reader)).events).toHaveLength(1)
    expect((await execute('get', { id })).event.booked).toBe(1)
  })
  test('the same nickname never merges distinct web and WeChat accounts', async () => {
    await publish()
    await execute('reserve', { id }, reader)
    expect(
      (await execute('get', { id }, { ...reader, id: 'clerk:reader' })).event
        .reservation
    ).toBeNull()
  })
  test('messages remain private and exclude raw actor IDs', async () => {
    await publish()
    await execute('reserve', { id }, reader)
    await execute('message', { id, body: '先从第一章读起？' }, reader)
    const { messages } = await execute('messages', { id }, host)
    expect(messages[0]).toMatchObject({
      body: '先从第一章读起？',
      name: '读者'
    })
    expect(messages[0]).not.toHaveProperty('actorId')
  })
  test('WeChat group activities do not create a website room', async () => {
    await execute('edit', { ...fields, discussion: 'wechat', id }, host)
    await publish()
    await execute('reserve', { id }, reader)
    expect((await execute('get', { id }, reader)).event.canChat).toBe(false)
    await expect(execute('messages', { id }, host)).rejects.toMatchObject({
      status: 403
    })
  })
  test('capacity and group type cannot invalidate existing reservations', async () => {
    await publish()
    await execute('reserve', { id }, reader)
    await execute('reserve', { id }, { ...reader, id: 'third' })
    await expect(
      execute('edit', { ...fields, id, capacity: 1 }, host)
    ).rejects.toMatchObject({ code: 'invalid_update' })
    await expect(
      execute('edit', { ...fields, id, discussion: 'wechat' }, host)
    ).rejects.toMatchObject({ code: 'group_locked' })
  })
  test('changed public arrangements produce an activity notice', async () => {
    await publish()
    const result = await execute(
      'edit',
      { ...fields, id, location: '新地点' },
      host
    )
    expect(result.event.announcements[0].body).toContain('活动安排已更新')
  })
  test('cancellation prevents further bookings and chat sends', async () => {
    await publish()
    await execute('reserve', { id }, reader)
    await expect(execute('cancelEvent',{id},host)).rejects.toMatchObject({code:'revoke_blocked'})
    await execute('cancelReservation',{id},reader)
    await execute('cancelEvent', { id }, host)
    await expect(
      execute('reserve', { id }, { ...reader, id: 'new-reader' })
    ).rejects.toMatchObject({ code: 'not_open' })
    await expect(
      execute('message', { id, body: '还有人吗' }, reader)
    ).rejects.toMatchObject({ code: 'forbidden' })
    expect(
      (await execute('get', { id })).event.announcements[0].body
    ).toContain('取消')
  })
  test('deadline, start and end are enforced server-side', async () => {
    await publish()
    now = Date.parse(fields.deadline)
    await expect(execute('reserve', { id }, reader)).rejects.toMatchObject({
      code: 'not_open'
    })
    expect((await execute('get', { id })).event.status).toBe('closed')
    now = Date.parse(fields.startsAt)
    expect((await execute('get', { id })).event.status).toBe('ongoing')
    now = Date.parse(fields.endsAt)
    expect((await execute('get', { id })).event.status).toBe('ended')
  })
  test('validates time zones, impossible schedules and full WeChat group instructions', () => {
    for (const override of [
      { startsAt: '2030-01-02T19:30' },
      { capacity: 0 },
      { endsAt: fields.startsAt },
      { discussion: 'wechat', joinInstructions: '' },
      { deadline: fields.endsAt }
    ])
      expect(() => normalizeInput({ ...fields, ...override })).toThrow()
    expect(formatTime('2030-01-02T11:30:00Z')).toBe('2030.01.02 19:30')
  })
  test('derived status is stable at capacity and UTC boundaries', () => {
    expect(
      eventStatus(
        { ...fields, state: 'published', reservations: {} },
        Date.parse(fields.endsAt)
      )
    ).toBe('ended')
  })
})
