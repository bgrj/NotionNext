/* Shared by native WeChat pages and the website. No DOM, React, wx or secrets. */
const VERSION = 1
const { canonicalCity } = require('./global')
const { normalizePlace, samePlace } = require('./places')
const STATUS_LABELS = {
  draft: '草稿',
  open: '可预约',
  full: '名额已满',
  closed: '预约已截止',
  ongoing: '进行中',
  ended: '已结束',
  cancelled: '已取消'
}
const text = (value, max) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''
function fail(code, message, status = 400) {
  const error = new Error(message)
  error.code = code
  error.status = status
  throw error
}
function requireActor(actor) {
  if (!actor || !actor.id)
    fail('unauthorized', '请先登录，再参与这次相遇。', 401)
}
function validId(id) {
  return (
    typeof id === 'string' &&
    /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(id)
  )
}
function iso(value) {
  const parts =
    typeof value === 'string' &&
    value.match(
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d{1,3})?)?(Z|[+-]\d{2}:\d{2})$/
    )
  if (
    !parts ||
    Number(parts[4]) > 23 ||
    Number(parts[5]) > 59 ||
    Number(parts[6] || 0) > 59
  )
    return ''
  const calendar = new Date(`${parts[1]}-${parts[2]}-${parts[3]}T00:00:00Z`)
  if (
    calendar.getUTCFullYear() !== Number(parts[1]) ||
    calendar.getUTCMonth() + 1 !== Number(parts[2]) ||
    calendar.getUTCDate() !== Number(parts[3])
  )
    return ''
  if (parts[7] !== 'Z') {
    const offset = parts[7].slice(1).split(':').map(Number)
    if (offset[0] > 14 || offset[1] > 59 || (offset[0] === 14 && offset[1]))
      return ''
  }
  if (
    typeof value !== 'string' ||
    !/(Z|[+-]\d{2}:\d{2})$/.test(value) ||
    !Number.isFinite(Date.parse(value))
  )
    return ''
  return new Date(value).toISOString()
}
function normalizeInput(input = {}) {
  let place
  try {
    place = normalizePlace(input.place)
  } catch {
    fail('invalid_place', '请重新选择有效的地图位置。')
  }
  const startsAt = iso(input.startsAt)
  const endsAt = iso(input.endsAt)
  const deadline = iso(input.deadline || input.startsAt)
  const title = text(input.title, 81)
  const description = text(input.description, 4001)
  const capacity = Number(input.capacity)
  if (title.length < 2 || title.length > 80)
    fail('invalid_title', '请填写 2–80 字的活动名称。')
  if (!description || description.length > 4000)
    fail('invalid_description', '请填写活动介绍，最多 4000 字。')
  if (
    !startsAt ||
    !endsAt ||
    !deadline ||
    endsAt <= startsAt ||
    deadline > startsAt
  )
    fail('invalid_time', '请检查开始、结束和预约截止时间。')
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 500)
    fail('invalid_capacity', '名额需为 1–500 人。')
  if (!['online', 'offline'].includes(input.format))
    fail('invalid_format', '请选择线上或线下。')
  if (!['site', 'wechat', 'external'].includes(input.discussion))
    fail('invalid_discussion', '请选择交流方式。')
  const location = text(input.location, 160)
  const city = canonicalCity(text(input.city, 160))
  if (input.format === 'offline' && !city)
    fail('invalid_city', '请填写城市、乡镇及所属国家或地区。')
  const joinInstructions = text(input.joinInstructions, 1000)
  if (!location) fail('invalid_location', '请填写城市、场地或线上参与方式。')
  if (input.discussion !== 'site' && !joinInstructions)
    fail('missing_group', '请填写预约后的交流群加入说明。')
  const timezone = text(input.timezone, 80) || 'Asia/Shanghai'
  if (/^UTC[+-]14:(?!00)/.test(timezone))
    fail('invalid_timezone', '请填写有效时区。')
  if (!/^UTC[+-](0\d|1[0-4]):[0-5]\d$/.test(timezone)) {
    try {
      if (typeof Intl !== 'undefined')
        new Intl.DateTimeFormat('en', { timeZone: timezone })
      else if (!/^[A-Za-z_]+\/[A-Za-z_\/-]+$/.test(timezone))
        throw new Error('timezone')
    } catch {
      fail('invalid_timezone', '请填写有效时区。')
    }
  }
  return {
    title,
    description,
    startsAt,
    endsAt,
    deadline,
    capacity,
    format: input.format,
    discussion: input.discussion,
    channel:
      input.discussion === 'site'
        ? 'site'
        : input.discussion === 'wechat'
          ? 'wechat'
          : ['wechat', 'qq', 'telegram', 'whatsapp', 'line', 'other'].includes(
                input.channel
              )
            ? input.channel
            : 'other',
    location,
    place: input.format === 'offline' ? place : null,
    joinInstructions,
    book: text(input.book, 120),
    kind: input.kind === 'conversation' ? 'conversation' : 'reading',
    timezone,
    city,
    language: ['zh', 'en', 'bilingual'].includes(input.language)
      ? input.language
      : 'zh'
  }
}
const bookedCount = (event) =>
  Object.values(event.reservations || {}).filter(
    (value) => value.status === 'confirmed'
  ).length
const isHost = (event, actor) => Boolean(actor && event.hostId === actor.id)
const isMember = (event, actor) =>
  Boolean(
    isHost(event, actor) ||
    (actor && event.reservations?.[actor.id]?.status === 'confirmed')
  )
function eventStatus(event, now = Date.now()) {
  if (event.state !== 'published') return event.state
  if (Date.parse(event.endsAt) <= now) return 'ended'
  if (Date.parse(event.startsAt) <= now) return 'ongoing'
  if (Date.parse(event.deadline) <= now) return 'closed'
  return bookedCount(event) >= event.capacity ? 'full' : 'open'
}
function publicEvent(event, actor, now = Date.now()) {
  if (!event.publishedAt && !isHost(event, actor))
    fail('not_found', '这场活动暂未公开。', 404)
  const status = eventStatus(event, now)
  const member = isMember(event, actor)
  const owner = isHost(event, actor)
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    book: event.book,
    kind: event.kind,
    format: event.format,
    location: event.location,
    place: event.place || null,
    discussion: event.discussion,
    channel:
      event.channel || (event.discussion === 'wechat' ? 'wechat' : 'site'),
    startsAt: event.startsAt,
    endsAt: event.endsAt,
    deadline: event.deadline,
    timezone: event.timezone,
    city: event.city || '',
    language: event.language || 'zh',
    capacity: event.capacity,
    booked: bookedCount(event),
    remaining: Math.max(0, event.capacity - bookedCount(event)),
    hostName: event.hostName,
    state: event.state,
    status,
    statusLabel: STATUS_LABELS[status],
    isHost: owner,
    reservation: actor ? event.reservations?.[actor.id]?.status || null : null,
    canReserve: status === 'open' && !owner && !member,
    canChat: member && event.discussion === 'site',
    canPost:
      member &&
      event.discussion === 'site' &&
      !['ended', 'cancelled', 'draft'].includes(status),
    joinInstructions: member ? event.joinInstructions : '',
    announcements: event.announcements || [],
    createdAt: event.createdAt,
    updatedAt: event.updatedAt
  }
}
function changeEvent(event, action, input, actor, now = Date.now()) {
  requireActor(actor)
  const at = new Date(now).toISOString()
  const owner = isHost(event, actor)
  if (['edit', 'publish', 'cancelEvent', 'announce'].includes(action) && !owner)
    fail('forbidden', '只有发起人可以管理这场活动。', 403)
  if (action === 'edit') {
    if (['cancelled', 'ended', 'ongoing'].includes(eventStatus(event, now)))
      fail('closed', '活动开始或取消后，不能再更改安排。', 409)
    const fields = normalizeInput(input)
    if (
      Date.parse(fields.startsAt) <= now ||
      fields.capacity < bookedCount(event)
    )
      fail('invalid_update', '开始时间需在未来，名额不能少于已预约人数。')
    if (
      bookedCount(event) &&
      (fields.discussion !== event.discussion ||
        fields.channel !== (event.channel || event.discussion))
    )
      fail('group_locked', '已有预约后，请保留原交流方式。', 409)
    Object.assign(event, fields)
    if (event.state === 'published')
      event.announcements = [
        ...event.announcements,
        {
          id: event.nextSequence++,
          body: '活动安排已更新，请重新查看时间、地点与参与说明。',
          at
        }
      ].slice(-30)
  } else if (action === 'publish') {
    if (event.state === 'published') return event
    if (event.state !== 'draft' || Date.parse(event.deadline) <= now)
      fail('closed', '请先调整活动时间，再发布。', 409)
    event.state = 'published'
    event.publishedAt = at
  } else if (action === 'reserve') {
    if (owner) fail('host_reservation', '你是活动发起人，无需预约。', 409)
    if (event.reservations[actor.id]?.status === 'confirmed') return event
    if (eventStatus(event, now) !== 'open')
      fail('not_open', '本场活动已满额、截止或结束，请查看其他活动。', 409)
    event.reservations[actor.id] = { status: 'confirmed', at }
  } else if (action === 'cancelReservation') {
    if (event.reservations[actor.id]?.status === 'confirmed')
      event.reservations[actor.id] = { status: 'cancelled', at }
  } else if (action === 'cancelEvent') {
    if (event.state !== 'cancelled')
      event.announcements = [
        ...event.announcements,
        {
          id: event.nextSequence++,
          body: '发起人已取消本场活动。感谢你为相遇留出的时间。',
          at
        }
      ].slice(-30)
    event.state = 'cancelled'
  } else if (action === 'announce' || action === 'message') {
    const max = action === 'announce' ? 1000 : 500
    const body = text(input.body, max + 1)
    if (!body || body.length > max)
      fail('invalid_message', `请填写 1–${max} 字的内容。`)
    if (action === 'message') {
      if (!isMember(event, actor) || event.discussion !== 'site')
        fail('forbidden', '预约成功后才能进入本站活动交流群。', 403)
      if (['ended', 'cancelled', 'draft'].includes(eventStatus(event, now)))
        fail('closed', '这场活动的交流已归档。', 409)
      const last = [...event.messages]
        .reverse()
        .find((item) => item.actorId === actor.id)
      if (last && now - Date.parse(last.at) < 3000)
        fail('too_fast', '稍等片刻，再发送下一条。', 429)
      event.messages = [
        ...event.messages,
        {
          id: event.nextSequence++,
          actorId: actor.id,
          name: actor.name,
          body,
          at
        }
      ].slice(-100)
    } else {
      if (event.state !== 'published')
        fail('not_published', '发布活动后才能发送通知。', 409)
      event.announcements = [
        ...event.announcements,
        { id: event.nextSequence++, body, at }
      ].slice(-30)
    }
  } else fail('unknown_action', '暂不支持这个操作。')
  event.updatedAt = at
  return event
}
function formatTime(value) {
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return ''
  const china = new Date(date.getTime() + 8 * 60 * 60 * 1000)
  const pad = (number) => String(number).padStart(2, '0')
  return `${china.getUTCFullYear()}.${pad(china.getUTCMonth() + 1)}.${pad(china.getUTCDate())} ${pad(china.getUTCHours())}:${pad(china.getUTCMinutes())}`
}
function filterEvents(
  events,
  {
    scope = 'upcoming',
    format = 'all',
    city = '',
    place = null,
    language = 'all'
  } = {}
) {
  const items = events.filter(
    (item) =>
      (format === 'all' || item.format === format) &&
      (!city ||
        item.format === 'online' ||
        canonicalCity(item.city) === canonicalCity(city) ||
        samePlace(item.place, place) ||
        (!item.city &&
          item.location?.toLowerCase().includes(city.toLowerCase()))) &&
      (language === 'all' ||
        (item.language || 'zh') === language ||
        item.language === 'bilingual') &&
      (scope === 'mine' ||
        (scope === 'past'
          ? ['ended', 'cancelled'].includes(item.status)
          : !['ended', 'cancelled', 'draft'].includes(item.status)))
  )
  return items.sort((a, b) =>
    scope === 'mine'
      ? b.updatedAt.localeCompare(a.updatedAt)
      : scope === 'past'
        ? b.startsAt.localeCompare(a.startsAt)
        : a.startsAt.localeCompare(b.startsAt)
  )
}
module.exports = {
  VERSION,
  STATUS_LABELS,
  text,
  fail,
  requireActor,
  validId,
  normalizeInput,
  bookedCount,
  isHost,
  isMember,
  eventStatus,
  publicEvent,
  changeEvent,
  formatTime,
  filterEvents
}
