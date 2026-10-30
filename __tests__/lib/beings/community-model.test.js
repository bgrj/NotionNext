/** @jest-environment node */
import {
  createMemoryCommunityStore,
  emptyCommunity,
  executeCommunity,
  queryCommunity,
  safeSourceUrl
} from '@/lib/beings/community/model'
import { seedDemo } from '@/lib/beings/community/demo'

const A = { id: 'user_A' },
  B = { id: 'user_B' },
  C = { id: 'user_C' },
  MOD = { id: 'user_moderator', moderator: true }
const NOW = Date.parse('2026-10-31T04:00:00Z')
let store, counter
const command = (actor, type, input = {}, now = NOW) =>
  executeCommunity(
    store,
    actor,
    { type, input },
    { now, id: () => `record_${++counter}` }
  )
const query = async (actor, type, params = {}, now = NOW) =>
  queryCommunity((await store.read()).state, actor, { type, ...params }, now)
const makeContent = (actor = A, extra = {}) =>
  command(actor, 'content.create', {
    kind: 'journal',
    domain: 'existence',
    title: 'private-title-canary',
    body: 'private-body-canary',
    ...extra
  })
const approve = async (actor, item, kind = 'contents') => {
  const pending = await command(
    actor,
    kind === 'events' ? 'event.submit' : 'content.submit',
    { id: item.id, revision: item.revision }
  )
  await command(MOD, 'review.decide', {
    id: item.id,
    revision: pending.revision,
    kind,
    approve: true
  })
  return (await store.read()).state[kind][item.id]
}
const makeEvent = (extra = {}) =>
  command(A, 'event.create', {
    title: 'A reading event',
    format: 'online',
    description: 'A public description',
    participation: 'Bring a paragraph',
    materials: 'Book chapter',
    startAt: '2026-11-07T04:00:00Z',
    endAt: '2026-11-07T06:00:00Z',
    deadlineAt: '2026-11-06T04:00:00Z',
    timezone: 'Asia/Shanghai',
    capacity: 1,
    meetingInfo: 'confirmed-only-meeting-canary',
    ...extra
  })
beforeEach(() => {
  store = createMemoryCommunityStore()
  counter = 0
})

test.each([undefined, null, false, true, 'true', 1, {}, []])(
  'new content cannot grant public access through legacy public value %#',
  async value => {
    const item = await makeContent(A, {
      public: value,
      visibility: 'public',
      ownerId: B.id,
      publicVersion: { body: 'forged' },
      status: 'published'
    })
    expect(item.ownerId).toBe(A.id)
    expect(item.visibility).toBe('private')
    expect((await query(null, 'feed')).items).toEqual([])
    await expect(query(B, 'content', { id: item.id })).rejects.toMatchObject({
      status: 404
    })
  }
)
test('anonymous commands and queries to private workspaces are rejected', async () => {
  await expect(makeContent(null)).rejects.toMatchObject({ status: 401 })
  await expect(query(null, 'workspace')).rejects.toMatchObject({ status: 401 })
})
test('a user cannot edit, delete, submit or restore another user record', async () => {
  const item = await makeContent()
  for (const type of [
    'content.save',
    'content.delete',
    'content.submit',
    'content.restore'
  ])
    await expect(
      command(B, type, {
        id: item.id,
        revision: item.revision,
        title: 'stolen'
      })
    ).rejects.toMatchObject({ status: 404 })
  expect((await query(A, 'content', { id: item.id })).draft.body).toBe(
    'private-body-canary'
  )
})
test('private search and counts reveal only the caller records', async () => {
  await makeContent(A)
  await makeContent(B, { title: 'B secret', kind: 'audio' })
  const result = await query(B, 'workspace', { q: 'private-title-canary' })
  expect(result.items).toEqual([])
  expect(result.counts.journal).toBe(0)
  expect(result.counts.audio).toBe(1)
})
test('submission does not publish without a trusted review', async () => {
  const item = await makeContent()
  const pending = await command(A, 'content.submit', {
    id: item.id,
    revision: item.revision
  })
  expect(pending.status).toBe('pending')
  expect((await query(null, 'feed')).items).toEqual([])
  await expect(
    command(B, 'review.decide', {
      kind: 'contents',
      id: item.id,
      revision: pending.revision,
      approve: true
    })
  ).rejects.toMatchObject({ status: 403 })
})
test('published version is separate from a new private draft and pending revision', async () => {
  let item = await approve(
    A,
    await makeContent(A, { title: 'public v1', body: 'public body' })
  )
  item = await command(A, 'content.save', {
    id: item.id,
    revision: item.revision,
    title: 'private revision canary',
    body: 'unsubmitted body canary',
    public: false
  })
  let detail = await query(null, 'reading', { id: item.id })
  expect(detail.title).toBe('public v1')
  expect(detail.body).toBe('public body')
  const pending = await command(A, 'content.submit', {
    id: item.id,
    revision: item.revision
  })
  expect((await query(null, 'reading', { id: item.id })).title).toBe(
    'public v1'
  )
  await command(MOD, 'review.decide', {
    kind: 'contents',
    id: item.id,
    revision: pending.revision,
    approve: true
  })
  detail = await query(null, 'reading', { id: item.id })
  expect(detail.title).toBe('private revision canary')
  expect(detail.number).toBe(2)
})
test('public DTO contains no owner identity, private fields, submission or unapproved links', async () => {
  await command(A, 'profile.save', {
    supportUrl: 'https://example.invalid/support',
    public: false
  })
  const item = await approve(A, await makeContent(A, { title: 'public title' }))
  const detail = await query(null, 'reading', { id: item.id })
  const text = JSON.stringify(detail)
  expect(text).not.toContain(A.id)
  expect(detail).not.toHaveProperty('draft')
  expect(detail).not.toHaveProperty('submission')
  expect(detail.support).toBeNull()
})
test('ordinary save preserves published access until an explicit withdrawal', async () => {
  let item = await approve(A, await makeContent())
  item = await command(A, 'content.save', {
    id: item.id,
    revision: item.revision,
    title: 'new draft'
  })
  expect((await query(null, 'feed')).items).toHaveLength(1)
  await command(A, 'content.withdraw', { id: item.id, revision: item.revision })
  expect((await query(null, 'feed')).items).toHaveLength(0)
  await expect(query(null, 'reading', { id: item.id })).rejects.toMatchObject({
    status: 404
  })
})
test('a stale edit cannot overwrite a more recent draft', async () => {
  const item = await makeContent()
  await command(A, 'content.save', {
    id: item.id,
    revision: item.revision,
    title: 'newer'
  })
  await expect(
    command(A, 'content.save', {
      id: item.id,
      revision: item.revision,
      title: 'stale'
    })
  ).rejects.toMatchObject({ status: 409 })
  expect((await query(A, 'content', { id: item.id })).draft.title).toBe('newer')
})
test.each(['journal', 'book', 'image', 'audio'])(
  '%s supports create edit private lookup archive and export',
  async kind => {
    let item = await makeContent(A, { kind, title: `${kind} entry` })
    item = await command(A, 'content.save', {
      id: item.id,
      revision: item.revision,
      body: 'my note remains after source failure'
    })
    expect((await query(A, 'workspace', { kind })).items).toHaveLength(1)
    item = await command(A, 'content.archive', {
      id: item.id,
      revision: item.revision
    })
    expect((await query(A, 'workspace', { kind })).items).toHaveLength(0)
    expect(
      (await query(A, 'workspace', { kind, archived: '1' })).items
    ).toHaveLength(1)
    expect((await query(A, 'export')).contents[0]).toMatchObject({
      id: item.id,
      kind,
      createdAt: expect.any(String)
    })
  }
)
test('delete and restore never restore a formerly public version automatically', async () => {
  let item = await approve(A, await makeContent())
  item = await command(A, 'content.delete', {
    id: item.id,
    revision: item.revision
  })
  expect((await query(A, 'trash')).items).toHaveLength(1)
  item = await command(A, 'content.restore', {
    id: item.id,
    revision: item.revision
  })
  expect(item.visibility).toBe('private')
  expect(item.publicVersion).toBeNull()
  expect((await query(null, 'feed')).items).toEqual([])
})
test('related notes require ownership and do not expose private linked notes', async () => {
  const secret = await makeContent()
  await expect(makeContent(B, { noteIds: [secret.id] })).rejects.toMatchObject({
    code: 'invalid_reference'
  })
  const item = await approve(A, await makeContent(A, { noteIds: [secret.id] }))
  expect((await query(null, 'reading', { id: item.id })).related).toEqual([])
})
test('review queue has only submitted public snapshots, no unrelated private draft', async () => {
  await makeContent(A, { title: 'never-submitted-canary' })
  const item = await makeContent(B, { title: 'intended public' })
  await command(B, 'content.submit', { id: item.id, revision: item.revision })
  const queue = await query(MOD, 'review')
  expect(queue.items).toHaveLength(1)
  expect(JSON.stringify(queue)).not.toContain('never-submitted-canary')
})
test('last seat under concurrent requests is assigned at most once', async () => {
  const event = await approve(A, await makeEvent(), 'events')
  const results = await Promise.allSettled(
    Array.from({ length: 12 }, (_, i) =>
      command({ id: `participant_${i}` }, 'registration.join', {
        id: event.id,
        contact: 'synthetic contact'
      })
    )
  )
  expect(results.filter(x => x.status === 'fulfilled')).toHaveLength(1)
  expect(
    (await query(A, 'registrations', { id: event.id })).items.filter(
      x => x.status === 'confirmed'
    )
  ).toHaveLength(1)
})
test('duplicate join is idempotent and cancellation permits rejoining before deadline', async () => {
  const event = await approve(A, await makeEvent(), 'events')
  await command(B, 'registration.join', {
    id: event.id,
    contact: 'first-contact'
  })
  await command(B, 'registration.join', {
    id: event.id,
    contact: 'duplicate-contact'
  })
  expect(
    (await query(A, 'registrations', { id: event.id })).items
  ).toHaveLength(1)
  await command(B, 'registration.cancel', { id: event.id })
  expect(
    (await query(A, 'registrations', { id: event.id })).items[0].contact
  ).toBe('')
  await command(C, 'registration.join', { id: event.id, contact: 'C' })
  await command(C, 'registration.cancel', { id: event.id })
  await command(B, 'registration.join', {
    id: event.id,
    contact: 'new-contact'
  })
  expect(
    (await query(B, 'event', { id: event.id })).myRegistration.status
  ).toBe('confirmed')
})
test('server timestamp enforces exact deadline independent of display timezone', async () => {
  const event = await approve(
    A,
    await makeEvent({ timezone: 'America/New_York' }),
    'events'
  )
  await expect(
    command(
      B,
      'registration.join',
      { id: event.id, contact: 'synthetic' },
      Date.parse(event.publicVersion.deadlineAt)
    )
  ).rejects.toMatchObject({ code: 'closed' })
})
test('meeting details and contact information are restricted to confirmed user and actual organizer', async () => {
  const event = await approve(A, await makeEvent({ capacity: 2 }), 'events')
  await command(B, 'registration.join', {
    id: event.id,
    contact: 'private-contact-canary'
  })
  const anon = await query(null, 'event', { id: event.id })
  expect(JSON.stringify(anon)).not.toContain('confirmed-only-meeting-canary')
  expect(JSON.stringify(anon)).not.toContain('private-contact-canary')
  expect((await query(B, 'event', { id: event.id })).meetingInfo).toBe(
    'confirmed-only-meeting-canary'
  )
  for (const actor of [B, C, MOD])
    await expect(
      query(actor, 'registrations', { id: event.id })
    ).rejects.toMatchObject({ status: 404 })
  expect(
    (await query(A, 'registrations', { id: event.id })).items[0].contact
  ).toBe('private-contact-canary')
})
test('unapproved schedule draft does not change participant logistics; approval produces notification', async () => {
  let event = await approve(A, await makeEvent(), 'events')
  await command(B, 'registration.join', { id: event.id, contact: 'contact' })
  event = await query(A, 'event-draft', { id: event.id })
  event = await command(A, 'event.save', {
    id: event.id,
    revision: event.revision,
    meetingInfo: 'new-logistics-canary',
    startAt: '2026-11-08T04:00:00Z',
    endAt: '2026-11-08T06:00:00Z'
  })
  expect((await query(B, 'event', { id: event.id })).meetingInfo).toBe(
    'confirmed-only-meeting-canary'
  )
  event = await command(A, 'event.submit', {
    id: event.id,
    revision: event.revision
  })
  await command(MOD, 'review.decide', {
    id: event.id,
    revision: event.revision,
    kind: 'events',
    approve: true
  })
  expect((await query(B, 'event', { id: event.id })).meetingInfo).toBe(
    'new-logistics-canary'
  )
  expect(
    (await query(B, 'notifications')).items.some(n =>
      n.message.includes('已更新')
    )
  ).toBe(true)
})
test('activity cancellation notifies existing registrations and prevents further joins', async () => {
  let event = await approve(A, await makeEvent({ capacity: 2 }), 'events')
  await command(B, 'registration.join', { id: event.id, contact: 'contact' })
  event = await query(A, 'event-draft', { id: event.id })
  await command(A, 'event.cancel', {
    id: event.id,
    revision: event.revision,
    reason: 'changed plans'
  })
  await expect(
    command(C, 'registration.join', { id: event.id, contact: 'contact' })
  ).rejects.toMatchObject({ code: 'cancelled' })
  expect(
    (await query(B, 'notifications')).items.some(n =>
      n.message.includes('已取消')
    )
  ).toBe(true)
})
test('withdrawing an event still permits a registrant to cancel and clear their contact', async () => {
  let event = await approve(A, await makeEvent(), 'events')
  await command(B, 'registration.join', { id: event.id, contact: 'contact' })
  event = await query(A, 'event-draft', { id: event.id })
  await command(A, 'event.withdraw', { id: event.id, revision: event.revision })
  await command(B, 'registration.cancel', { id: event.id })
  expect(
    (await query(A, 'registrations', { id: event.id })).items[0].contact
  ).toBe('')
})
test('bookmarks retain only an unavailable reference after withdrawal', async () => {
  let item = await approve(A, await makeContent())
  await command(B, 'bookmark.toggle', { id: item.id })
  await command(A, 'content.withdraw', { id: item.id, revision: item.revision })
  const saved = await query(B, 'bookmarks')
  expect(saved.items[0].unavailable).toBe(true)
  expect(JSON.stringify(saved)).not.toContain('private-title-canary')
})
test('public support link requires review and a link change revokes the approval', async () => {
  await command(A, 'profile.save', {
    supportUrl: 'https://example.invalid/support'
  })
  await command(MOD, 'review.decide', {
    kind: 'support',
    id: A.id,
    approve: true
  })
  const item = await approve(A, await makeContent())
  expect(
    (await query(null, 'reading', { id: item.id })).support.verifiedBySite
  ).toBe(false)
  await command(A, 'profile.save', {
    supportUrl: 'https://example.invalid/changed'
  })
  expect((await query(null, 'reading', { id: item.id })).support).toBeNull()
})
test('exchange contacts wait for both acceptance, completion requires both parties, and terms stay frozen', async () => {
  const item = await command(A, 'exchange.create', {
    title: 'books',
    offered: 'book A',
    wanted: 'book B',
    condition: 'used',
    city: 'city',
    delivery: 'post',
    shipping: 'each pays own'
  })
  await command(MOD, 'review.decide', {
    kind: 'exchanges',
    id: item.id,
    revision: item.revision,
    approve: true
  })
  await command(B, 'exchange.propose', {
    id: item.id,
    offered: 'book B',
    contact: 'private-B-contact'
  })
  expect(
    JSON.stringify(await query(null, 'exchange', { id: item.id }))
  ).not.toContain('private-B-contact')
  expect(
    JSON.stringify(await query(A, 'exchange', { id: item.id }))
  ).not.toContain('private-B-contact')
  await expect(
    command(C, 'exchange.accept', { id: item.id })
  ).rejects.toMatchObject({ status: 403 })
  await command(A, 'exchange.accept', {
    id: item.id,
    contact: 'private-A-contact',
    offered: 'forged new terms'
  })
  expect(
    (await query(B, 'exchange', { id: item.id })).deal.snapshot.offered
  ).toBe('book A')
  expect(
    (await query(B, 'exchange', { id: item.id })).deal.contacts[A.id]
  ).toBe('private-A-contact')
  await command(A, 'exchange.complete', { id: item.id })
  expect((await query(null, 'exchange', { id: item.id })).status).toBe(
    'accepted'
  )
  await command(B, 'exchange.complete', { id: item.id })
  expect((await query(null, 'exchange', { id: item.id })).status).toBe(
    'completed'
  )
})
test('export includes caller stable IDs and own registration but no other participant contacts', async () => {
  const event = await approve(A, await makeEvent({ capacity: 2 }), 'events')
  await command(B, 'registration.join', {
    id: event.id,
    contact: 'B-contact-secret'
  })
  await command(C, 'registration.join', {
    id: event.id,
    contact: 'C-contact-secret'
  })
  const exportA = await query(A, 'export'),
    exportB = await query(B, 'export')
  expect(JSON.stringify(exportA)).not.toContain('B-contact-secret')
  expect(JSON.stringify(exportB)).not.toContain('C-contact-secret')
  expect(exportB.registrations[0].eventId).toBe(event.id)
})
test.each([
  'javascript:alert(1)',
  '//example.invalid',
  'http://example.invalid',
  'https://user:pass@example.invalid',
  'https://example.invalid/\nsecret'
])('source links reject unsafe URL %s', value =>
  expect(() => safeSourceUrl(value)).toThrow()
)
test('outdated know-how remains readable with status but moves behind available content', async () => {
  await approve(
    A,
    await makeContent(A, {
      domain: 'shu',
      title: 'usable',
      toolState: 'working'
    })
  )
  await approve(
    A,
    await makeContent(A, {
      domain: 'shu',
      title: 'outdated',
      toolState: 'outdated'
    })
  )
  expect(
    (await query(null, 'feed', { domain: 'shu' })).items.map(x => x.title)
  ).toEqual(['usable', 'outdated'])
})
test('seeded demo is clearly synthetic, complete enough to exercise all four collections and public events', () => {
  const state = seedDemo(NOW)
  expect(Object.keys(state.profiles)).toHaveLength(3)
  expect(
    queryCommunity(state, { id: 'demo_writer' }, { type: 'workspace' }, NOW)
      .counts
  ).toMatchObject({ journal: 1, book: 1, image: 1, audio: 1 })
  expect(
    queryCommunity(state, null, { type: 'events' }, NOW).items
  ).toHaveLength(1)
})
