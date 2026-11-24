/** @jest-environment node */
import {
  CITIES,
  canonicalCity,
  cityLabel,
  toInstant
} from '@/apps/wuzai/miniprogram/common/global'
import {
  normalizeInput,
  publicEvent,
  eventStatus,
  filterEvents
} from '@/apps/wuzai/miniprogram/common/activities'
import { demoEvents } from '@/apps/wuzai/miniprogram/common/demo-events'

const now = Date.parse('2026-11-24T13:00:00Z')
const base = {
  title: '人与人的一次相遇',
  description: '带一个实际经历或阅读问题，也可以倾听。',
  startsAt: '2027-01-02T12:00:00Z',
  endsAt: '2027-01-02T14:00:00Z',
  deadline: '2027-01-02T11:00:00Z',
  capacity: 12,
  format: 'online',
  kind: 'reading',
  discussion: 'site',
  channel: 'site',
  language: 'zh',
  timezone: 'Etc/UTC',
  city: '周庄镇 · 江苏省 · 中国',
  location: '演示地点，不接受到访',
  joinInstructions: '私密参与说明'
}
const options = []
for (const format of ['online', 'offline'])
  for (const kind of ['reading', 'conversation'])
    for (const language of ['zh', 'en', 'bilingual'])
      for (const channel of [
        'site',
        'wechat',
        'qq',
        'telegram',
        'whatsapp',
        'line',
        'other'
      ])
        options.push([format, kind, language, channel])

test.each(options)(
  'form options and role privacy: %s / %s / %s / %s',
  (format, kind, language, channel) => {
    const fields = normalizeInput({
      ...base,
      format,
      kind,
      language,
      channel,
      discussion:
        channel === 'site'
          ? 'site'
          : channel === 'wechat'
            ? 'wechat'
            : 'external'
    })
    expect(fields).toMatchObject({ format, kind, language, channel })
    const event = {
      ...fields,
      state: 'published',
      publishedAt: '2026-11-24T00:00:00Z',
      hostId: 'host',
      reservations: { member: { status: 'confirmed' } },
      announcements: [],
      createdAt: '2026',
      updatedAt: '2026'
    }
    const visitor = publicEvent(event, null, now),
      host = publicEvent(event, { id: 'host' }, now),
      member = publicEvent(event, { id: 'member' }, now)
    expect(visitor.joinInstructions).toBe('')
    expect(visitor.canChat).toBe(false)
    expect(host.isHost).toBe(true)
    expect(member.canChat).toBe(channel === 'site')
    expect(member.joinInstructions).toBe(base.joinInstructions)
  }
)
test.each(CITIES.map((city) => [city.id, city.zh, city.country]))(
  'preset and typed locations round-trip: %s / %s (%s)',
  (name, zh, country) => {
    expect(canonicalCity(name.toLowerCase())).toBe(name)
    expect(canonicalCity(zh)).toBe(name)
    expect(cityLabel(name, 'zh')).toBe(zh + ' · ' + country)
    expect(cityLabel(name, 'en')).toBe(name + ' · ' + country)
    expect(normalizeInput({ ...base, city: zh, format: 'offline' }).city).toBe(
      name
    )
  }
)
test.each([1, 2, 12, 499, 500])(
  'capacity boundary remains representable: %s',
  (capacity) => {
    expect(normalizeInput({ ...base, capacity }).capacity).toBe(capacity)
  }
)
test.each([0, -1, 501, 1.5, NaN, Infinity])(
  'invalid capacity is rejected: %s',
  (capacity) => {
    expect(() => normalizeInput({ ...base, capacity })).toThrow('名额')
  }
)
test('all public lifecycle states, seven channels and time cases are represented in readonly demos', () => {
  const events = demoEvents(now)
  expect(events).toHaveLength(48)
  for (const status of [
    'open',
    'full',
    'closed',
    'ongoing',
    'ended',
    'cancelled'
  ])
    expect(events.some((event) => event.status === status)).toBe(true)
  expect(new Set(events.map((event) => event.channel)).size).toBe(7)
  expect(new Set(events.map((event) => event.language)).size).toBe(3)
  expect(new Set(events.map((event) => event.timezone)).size).toBe(12)
  expect(new Set(events.map((event) => event.case)).size).toBe(12)
  for (const event of events) {
    expect(event.canReserve || event.canPost || event.canChat).toBe(false)
    expect(Date.parse(event.endsAt)).toBeGreaterThan(Date.parse(event.startsAt))
    expect(Date.parse(event.deadline)).toBeLessThanOrEqual(
      Date.parse(event.startsAt)
    )
    if (event.format === 'offline')
      expect(event.place).toMatchObject({
        coordinateSystem: 'wgs84',
        latitude: expect.any(Number),
        longitude: expect.any(Number)
      })
    // Public examples intentionally omit private group instructions.
    normalizeInput({ ...event, joinInstructions: '仅用于隔离校验的参与说明' })
  }
})
test.each([
  'Etc/UTC',
  'Asia/Shanghai',
  'Asia/Kathmandu',
  'Asia/Kolkata',
  'Pacific/Kiritimati',
  'Pacific/Honolulu',
  'America/New_York',
  'America/Argentina/Ushuaia',
  'Europe/London',
  'Australia/Sydney',
  'Pacific/Auckland',
  'UTC+05:45'
])('configured timezones preserve actual instants: %s', (timezone) => {
  const input = {
    ...base,
    timezone,
    startsAt: '2027-01-02T23:30:00+05:45',
    endsAt: '2027-01-03T01:00:00+05:45',
    deadline: '2027-01-02T23:30:00+05:45'
  }
  expect(normalizeInput(input).startsAt).toBe('2027-01-02T17:45:00.000Z')
  expect(normalizeInput(input).timezone).toBe(timezone)
})
test('invalid local calendar dates cannot silently become another day', () => {
  expect(toInstant('2027-02-30T12:00:00')).toBe('')
  expect(toInstant('2028-02-29T12:00:00')).toBeTruthy()
})
test.each([
  '2027-02-30T12:00:00Z',
  '2027-04-31T12:00:00Z',
  '2027-01-02T24:00:00Z',
  '2027-01-02T12:00:00+14:30'
])('invalid API calendar or offset is rejected: %s', (startsAt) => {
  expect(() => normalizeInput({ ...base, startsAt })).toThrow('时间')
})
test('offline requires an unambiguous named area while online can remain worldwide', () => {
  expect(() =>
    normalizeInput({ ...base, format: 'offline', city: '' })
  ).toThrow('乡镇')
  expect(normalizeInput({ ...base, format: 'online', city: '' }).city).toBe('')
})
test('map identities survive translated labels and keep same-name towns separate', () => {
  const point = {
    id: 'N:1',
    name: 'Town',
    locality: 'Town',
    state: 'Region',
    countryCode: 'GB',
    kind: 'town',
    latitude: 52,
    longitude: -1
  }
  const items = [
    {
      ...base,
      id: 'correct',
      status: 'open',
      updatedAt: '2026',
      format: 'offline',
      city: 'Town · UK',
      place: point
    },
    {
      ...base,
      id: 'other',
      status: 'open',
      updatedAt: '2026',
      format: 'offline',
      city: 'Town · US',
      place: { ...point, id: 'N:2', countryCode: 'US' }
    }
  ]
  expect(
    filterEvents(items, {
      city: '译名 · 英国',
      place: { ...point, label: '译名 · 英国' }
    }).map((item) => item.id)
  ).toEqual(['correct'])
})
test('lifecycle precedence applies at exact deadline, start and end boundaries', () => {
  const event = { ...base, state: 'published', reservations: {}, capacity: 1 }
  expect(eventStatus(event, Date.parse(base.deadline) - 1)).toBe('open')
  expect(eventStatus(event, Date.parse(base.deadline))).toBe('closed')
  expect(eventStatus(event, Date.parse(base.startsAt))).toBe('ongoing')
  expect(eventStatus(event, Date.parse(base.endsAt))).toBe('ended')
  expect(eventStatus({ ...event, state: 'draft' }, now)).toBe('draft')
  expect(eventStatus({ ...event, state: 'cancelled' }, now)).toBe('cancelled')
})
