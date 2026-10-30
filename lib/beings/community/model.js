// Shared business rules. No cookies, SDKs, DOM, external fetch or private data
// logging here. A trusted server supplies identity, time and IDs.
export const COLLECTIONS = [
  { id: 'journal', label: '生命日志', eyebrow: '01 / LIFE NOTES' },
  { id: 'book', label: '个人图书馆', eyebrow: '02 / THE COMPANY I KEEP' },
  { id: 'image', label: '影像馆', eyebrow: '03 / WAYS OF SEEING' },
  { id: 'audio', label: '音频馆', eyebrow: '04 / A VOICE IN THE QUIET' }
]
export const DOMAINS = ['existence', 'dao', 'shu']
export const KINDS = [
  'journal',
  'book',
  'image',
  'audio',
  'essay',
  'resource',
  'tool'
]
export const TOOL_STATES = [
  'unverified',
  'working',
  'partial',
  'outdated',
  'archived'
]
export const MAX_STATE_BYTES = 4 * 1024 * 1024

export class CommunityError extends Error {
  constructor(code, message, status = 400) {
    super(message)
    this.code = code
    this.status = status
  }
}
const fail = (code, message, status) => {
  throw new CommunityError(code, message, status)
}
const own = (map, key) =>
  typeof key === 'string' &&
  Object.prototype.hasOwnProperty.call(map || {}, key)
    ? map[key]
    : null
const copy = value => JSON.parse(JSON.stringify(value))
const str = (value, max = 200) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''
const choice = (value, list, fallback) =>
  list.includes(value) ? value : fallback
const iso = value => {
  if (
    typeof value !== 'string' ||
    !value ||
    !Number.isFinite(Date.parse(value))
  )
    return ''
  return new Date(value).toISOString()
}
const required = (value, message) => value || fail('invalid_input', message)
const validId = id =>
  typeof id === 'string' &&
  /^[a-zA-Z0-9_-]{1,100}$/.test(id) &&
  !['__proto__', 'constructor', 'prototype'].includes(id)

export function safeSourceUrl(value) {
  const text = str(value, 1500)
  if (!text) return ''
  if (/[\u0000-\u0020\u007f\\]/.test(text))
    fail('invalid_url', '来源链接中含有空格或不支持的字符。')
  try {
    const url = new URL(text)
    if (url.protocol !== 'https:' || url.username || url.password)
      throw new Error()
    return url.href
  } catch {
    return fail('invalid_url', '请填写完整的 https 来源链接。')
  }
}

export function emptyCommunity() {
  return {
    schema: 1,
    revision: 0,
    profiles: {},
    contents: {},
    events: {},
    exchanges: {},
    bookmarks: {},
    notifications: {},
    reports: {},
    comments: {},
    audit: []
  }
}

function identify(state, actor, ctx) {
  if (!actor?.id || !validId(actor.id)) fail('unauthorized', '请先登录。', 401)
  if (!own(state.profiles, actor.id)) {
    state.profiles[actor.id] = {
      name: '一位存在者',
      handle: `b-${ctx.id().slice(0, 12)}`,
      bio: '',
      public: false,
      supportUrl: '',
      supportStatus: 'none',
      adsOptIn: false
    }
  }
  return state.profiles[actor.id]
}
const needActor = actor => {
  if (!actor?.id || !validId(actor.id)) fail('unauthorized', '请先登录。', 401)
}
const needModerator = actor => {
  needActor(actor)
  if (actor.moderator !== true) fail('forbidden', '没有公开内容审核权限。', 403)
}
function owned(state, kind, id, actor, includeDeleted = false) {
  needActor(actor)
  const item = validId(id) ? own(state[kind], id) : null
  if (!item || item.ownerId !== actor.id || (!includeDeleted && item.deletedAt))
    fail('not_found', '没有找到这条记录。', 404)
  return item
}
function revision(item, input) {
  if (!Number.isInteger(input.revision) || input.revision !== item.revision) {
    fail('conflict', '这条记录已发生变化。请先重新读取，再合并你的修改。', 409)
  }
}
function touch(item, at) {
  item.revision += 1
  item.updatedAt = at
}
function notify(state, subject, { message, href }, ctx) {
  const list = own(state.notifications, subject) || []
  state.notifications[subject] = [
    { id: ctx.id(), at: ctx.at, message, href, read: false },
    ...list
  ].slice(0, 60)
}
function audit(state, actor, itemId, action, ctx) {
  state.audit.unshift({
    id: ctx.id(),
    actorId: actor.id,
    itemId,
    action,
    at: ctx.at
  })
  state.audit = state.audit.slice(0, 400)
}
const tagsOf = value =>
  [
    ...new Set(
      (Array.isArray(value) ? value : str(value, 300).split(/[,，]/))
        .map(x => str(x, 24))
        .filter(Boolean)
    )
  ].slice(0, 8)
function contentFields(input = {}, current = {}) {
  const next = { ...current }
  const limits = {
    title: 160,
    summary: 500,
    body: 48000,
    creator: 120,
    edition: 160,
    isbn: 40,
    coreQuestion: 500,
    citations: 4000,
    applicability: 1500,
    steps: 8000,
    expectedResult: 1500,
    limitations: 2000,
    alternatives: 1500,
    duration: 80,
    topic: 120
  }
  for (const [key, max] of Object.entries(limits))
    if (Object.prototype.hasOwnProperty.call(input, key))
      next[key] = str(input[key], max)
  for (const key of ['sourceUrl', 'coverUrl'])
    if (Object.prototype.hasOwnProperty.call(input, key))
      next[key] = safeSourceUrl(input[key])
  if ('tags' in input) next.tags = tagsOf(input.tags)
  if ('occurredAt' in input) next.occurredAt = iso(input.occurredAt)
  if ('verifiedAt' in input) next.verifiedAt = iso(input.verifiedAt)
  if ('readingStatus' in input)
    next.readingStatus = choice(
      input.readingStatus,
      ['wish', 'reading', 'read', 'paused'],
      'wish'
    )
  if ('toolState' in input)
    next.toolState = choice(input.toolState, TOOL_STATES, 'unverified')
  if ('ownership' in input)
    next.ownership = choice(input.ownership, ['own', 'collected'], 'collected')
  if ('allowComments' in input)
    next.allowComments = input.allowComments === true
  if ('noteIds' in input)
    next.noteIds = (Array.isArray(input.noteIds) ? input.noteIds : [])
      .filter(validId)
      .slice(0, 20)
  required(next.title, '先给这条记录起一个名字。')
  return next
}
function validateReferences(state, item) {
  for (const id of item.draft.noteIds || []) {
    const ref = own(state.contents, id)
    if (!ref || ref.ownerId !== item.ownerId || ref.deletedAt)
      fail('invalid_reference', '关联笔记必须是你自己的现有记录。')
  }
}
const isPublic = item =>
  item &&
  !item.deletedAt &&
  !item.archived &&
  item.visibility === 'public' &&
  item.publicVersion &&
  ['published', 'pending', 'changes_requested'].includes(item.status)
const authorOf = (state, id) => {
  const p = own(state.profiles, id)
  return { name: p?.name || '一位存在者', handle: p?.handle || '' }
}
export function publicContent(state, item, detail = false) {
  if (!isPublic(item)) return null
  const p = item.publicVersion
  const summary = {
    id: item.id,
    kind: item.kind,
    domain: item.domain,
    title: p.title,
    summary: p.summary || '',
    tags: p.tags || [],
    creator: p.creator || '',
    coverUrl: p.coverUrl || '',
    toolState: p.toolState || 'unverified',
    verifiedAt: p.verifiedAt || '',
    author: authorOf(state, item.ownerId),
    publishedAt: item.publishedAt,
    updatedAt: p.revisedAt,
    href: `/our-beings/app/reading/${item.id}`
  }
  if (!detail) return summary
  const data = { ...summary }
  for (const key of [
    'body',
    'sourceUrl',
    'edition',
    'isbn',
    'coreQuestion',
    'citations',
    'applicability',
    'steps',
    'expectedResult',
    'limitations',
    'alternatives',
    'duration',
    'occurredAt',
    'readingStatus',
    'ownership',
    'topic',
    'allowComments',
    'number'
  ])
    if (p[key] !== undefined) data[key] = p[key]
  data.related = (p.noteIds || [])
    .map(id => publicContent(state, own(state.contents, id)))
    .filter(Boolean)
  const profile = own(state.profiles, item.ownerId)
  data.support =
    profile?.supportStatus === 'approved' && profile.supportUrl
      ? { url: profile.supportUrl, name: profile.name, verifiedBySite: false }
      : null
  data.comments = Object.values(state.comments)
    .filter(c => c.contentId === item.id && c.status === 'approved')
    .map(c => ({
      id: c.id,
      body: c.body,
      at: c.at,
      author: authorOf(state, c.ownerId)
    }))
    .slice(-50)
  return data
}

function eventFields(input = {}, current = {}) {
  const next = { ...current }
  for (const [key, max] of Object.entries({
    title: 160,
    description: 10000,
    materials: 3000,
    city: 80,
    location: 500,
    participation: 3000,
    meetingInfo: 1500,
    recapId: 100
  }))
    if (key in input) next[key] = str(input[key], max)
  if ('format' in input)
    next.format = choice(input.format, ['online', 'offline'], 'online')
  for (const key of ['startAt', 'endAt', 'deadlineAt'])
    if (key in input) next[key] = iso(input[key])
  if ('timezone' in input) {
    try {
      new Intl.DateTimeFormat('zh-CN', { timeZone: input.timezone }).format()
      next.timezone = input.timezone
    } catch {
      fail('invalid_timezone', '请使用有效时区，例如 Asia/Shanghai。')
    }
  }
  if ('capacity' in input) {
    if (
      !Number.isInteger(Number(input.capacity)) ||
      Number(input.capacity) < 1 ||
      Number(input.capacity) > 200
    )
      fail('invalid_capacity', '人数上限应为 1～200 的整数。')
    next.capacity = Number(input.capacity)
  }
  required(next.title, '请填写活动标题。')
  return next
}
function validateEvent(next) {
  required(next.description, '请写下活动介绍。')
  required(next.participation, '请填写参与说明。')
  required(
    next.startAt && next.endAt && next.deadlineAt && next.timezone,
    '请补全开始、结束、报名截止时间和时区。'
  )
  if (!(
    Date.parse(next.deadlineAt) <= Date.parse(next.startAt) &&
    Date.parse(next.startAt) < Date.parse(next.endAt)
  ))
    fail('invalid_schedule', '报名截止不能晚于开始，结束时间必须晚于开始。')
  if (!next.capacity) fail('invalid_capacity', '请填写人数上限。')
  if (next.format === 'offline')
    required(next.city && next.location, '线下活动请填写城市和公开地点说明。')
}
const confirmed = event =>
  Object.values(event.registrations || {}).filter(r => r.status === 'confirmed')
export function eventProgress(event, now) {
  const p = event.publicVersion
  if (event.cancelledAt) return 'cancelled'
  if (!p) return 'draft'
  if (now >= Date.parse(p.endAt)) return 'ended'
  if (now >= Date.parse(p.startAt)) return 'ongoing'
  return 'upcoming'
}
export function publicEvent(state, event, now, actor, detail = false) {
  if (!isPublic(event)) return null
  const p = event.publicVersion
  const count = confirmed(event).length
  const result = {
    id: event.id,
    title: p.title,
    description: p.description,
    format: p.format,
    city: p.city || '',
    startAt: p.startAt,
    endAt: p.endAt,
    deadlineAt: p.deadlineAt,
    timezone: p.timezone,
    capacity: p.capacity,
    count,
    author: authorOf(state, event.ownerId),
    progress: eventProgress(event, now),
    cancelledAt: event.cancelledAt || '',
    revision: event.revision,
    href: `/our-beings/app/events/${event.id}`
  }
  result.registrationWindow = event.cancelledAt
    ? 'cancelled'
    : now >= Date.parse(p.deadlineAt)
      ? 'closed'
      : count >= p.capacity
        ? 'full'
        : 'open'
  if (detail) {
    result.materials = p.materials || ''
    result.location = p.location || ''
    result.participation = p.participation || ''
    result.changes = event.changes || []
    const mine = actor?.id ? own(event.registrations, actor.id) : null
    if (mine) result.myRegistration = copy(mine)
    if (mine?.status === 'confirmed' && !event.cancelledAt)
      result.meetingInfo = event.approvedMeetingInfo || ''
    result.isOrganizer = actor?.id === event.ownerId
  }
  return result
}

function publicExchange(state, item) {
  if (!isPublic(item)) return null
  const p = item.publicVersion
  return {
    id: item.id,
    title: p.title,
    offered: p.offered,
    wanted: p.wanted,
    condition: p.condition,
    city: p.city,
    delivery: p.delivery,
    shipping: p.shipping,
    status: item.dealStatus || 'open',
    author: authorOf(state, item.ownerId),
    href: `/our-beings/app/exchanges/${item.id}`
  }
}
function exchangeForParty(item, actor) {
  const result = copy(item)
  if (result.deal && result.deal.acceptedBy.length < 2) {
    result.deal.contacts = { [actor.id]: result.deal.contacts[actor.id] || '' }
  }
  return result
}
const page = (items, params = {}) => {
  const offset = Math.max(
    0,
    Math.min(5000, Math.trunc(Number(params.offset) || 0))
  )
  const limit = Math.max(
    1,
    Math.min(24, Math.trunc(Number(params.limit) || 12))
  )
  return {
    items: items.slice(offset, offset + limit),
    total: items.length,
    nextOffset: offset + limit < items.length ? offset + limit : null
  }
}

export function queryCommunity(state, actor, query = {}, now = Date.now()) {
  const q = str(query.q, 120).toLowerCase()
  const matches = item =>
    !q ||
    [item.title, item.summary, item.body, item.creator, ...(item.tags || [])]
      .join(' ')
      .toLowerCase()
      .includes(q)
  const sorted = list =>
    list.sort((a, b) =>
      String(b.updatedAt || b.publishedAt || b.createdAt).localeCompare(
        String(a.updatedAt || a.publishedAt || a.createdAt)
      )
    )
  switch (query.type) {
    case 'feed': {
      let items = Object.values(state.contents)
        .map(x => publicContent(state, x))
        .filter(Boolean)
        .filter(matches)
      if (DOMAINS.includes(query.domain))
        items = items.filter(x => x.domain === query.domain)
      if (KINDS.includes(query.kind))
        items = items.filter(x => x.kind === query.kind)
      return page(
        sorted(items).sort(
          (a, b) =>
            Number(['outdated', 'archived'].includes(a.toolState)) -
            Number(['outdated', 'archived'].includes(b.toolState))
        ),
        query
      )
    }
    case 'reading': {
      const data = publicContent(state, own(state.contents, query.id), true)
      if (!data) fail('not_found', '这篇内容尚未公开，或已经撤回。', 404)
      return data
    }
    case 'events':
      return page(
        Object.values(state.events)
          .map(x => publicEvent(state, x, now))
          .filter(Boolean)
          .filter(
            x => !q || `${x.title} ${x.description}`.toLowerCase().includes(q)
          )
          .filter(x =>
            query.history === '1'
              ? ['ended', 'cancelled'].includes(x.progress)
              : !['ended', 'cancelled'].includes(x.progress)
          )
          .sort((a, b) => a.startAt.localeCompare(b.startAt)),
        query
      )
    case 'event': {
      const result = publicEvent(
        state,
        own(state.events, query.id),
        now,
        actor,
        true
      )
      if (!result) fail('not_found', '活动尚未公开，或已经撤回。', 404)
      return result
    }
    case 'exchanges':
      return page(
        Object.values(state.exchanges)
          .map(x => publicExchange(state, x))
          .filter(Boolean)
          .filter(
            x =>
              !q ||
              `${x.title} ${x.offered} ${x.wanted}`.toLowerCase().includes(q)
          ),
        query
      )
    case 'exchange': {
      const item = own(state.exchanges, query.id)
      const result = publicExchange(state, item)
      if (!result) fail('not_found', '没有找到公开的交换条目。', 404)
      if (actor?.id && [item.ownerId, item.deal?.peerId].includes(actor.id)) {
        result.deal = exchangeForParty(item, actor).deal || null
        result.isOwner = actor.id === item.ownerId
        result.ownerId = item.ownerId
      }
      return result
    }
    case 'profile': {
      const entry = Object.entries(state.profiles).find(
        ([, p]) => p.handle === query.handle && p.public === true
      )
      if (!entry) fail('not_found', '这个公开主页尚未开放。', 404)
      const [id, p] = entry
      return {
        name: p.name,
        handle: p.handle,
        bio: p.bio,
        items: Object.values(state.contents)
          .filter(x => x.ownerId === id)
          .map(x => publicContent(state, x))
          .filter(Boolean)
      }
    }
    case 'workspace': {
      needActor(actor)
      const all = Object.values(state.contents).filter(
        x => x.ownerId === actor.id && !x.deletedAt
      )
      const items = sorted(
        all
          .filter(x => (query.archived === '1' ? x.archived : !x.archived))
          .filter(x => !query.kind || x.kind === query.kind)
          .filter(x => !query.domain || x.domain === query.domain)
          .filter(x => matches(x.draft))
      )
      return {
        ...page(items.map(copy), query),
        counts: Object.fromEntries(
          KINDS.map(kind => [
            kind,
            all.filter(x => x.kind === kind && !x.archived).length
          ])
        ),
        profile: copy(
          own(state.profiles, actor.id) || {
            name: '一位存在者',
            bio: '',
            public: false,
            adsOptIn: false,
            supportStatus: 'none'
          }
        ),
        moderator: actor.moderator === true
      }
    }
    case 'content':
      return copy(owned(state, 'contents', query.id, actor))
    case 'trash':
      needActor(actor)
      return page(
        sorted(
          Object.values(state.contents).filter(
            x => x.ownerId === actor.id && x.deletedAt
          )
        ).map(copy),
        query
      )
    case 'my-events':
      needActor(actor)
      return {
        items: sorted(
          Object.values(state.events)
            .filter(x => !x.deletedAt && x.ownerId === actor.id)
            .map(copy)
        )
      }
    case 'event-draft':
      return copy(owned(state, 'events', query.id, actor))
    case 'registrations': {
      const e = owned(state, 'events', query.id, actor)
      return {
        items: Object.values(e.registrations || {}).map(copy),
        event: { id: e.id, title: e.publicVersion?.title || e.draft.title }
      }
    }
    case 'my-registrations':
      needActor(actor)
      return {
        items: Object.values(state.events)
          .filter(e => own(e.registrations, actor.id))
          .map(e => ({
            id: e.id,
            title: e.publicVersion?.title || '活动已撤回',
            startAt: e.publicVersion?.startAt || '',
            cancelledAt: e.cancelledAt || '',
            status: own(e.registrations, actor.id).status,
            href: `/our-beings/app/events/${e.id}`
          }))
      }
    case 'notifications':
      needActor(actor)
      return { items: copy(own(state.notifications, actor.id) || []) }
    case 'bookmarks':
      needActor(actor)
      return {
        items: (own(state.bookmarks, actor.id) || []).map(b => ({
          id: b.contentId,
          savedAt: b.at,
          content: publicContent(state, own(state.contents, b.contentId)),
          unavailable: !isPublic(own(state.contents, b.contentId))
        }))
      }
    case 'my-exchanges':
      needActor(actor)
      return {
        items: Object.values(state.exchanges)
          .filter(e => e.ownerId === actor.id || e.deal?.peerId === actor.id)
          .map(e => exchangeForParty(e, actor))
      }
    case 'export':
      needActor(actor)
      return {
        schema: 'ourbeings.export.v1',
        exportedAt: new Date(now).toISOString(),
        profile: copy(own(state.profiles, actor.id)),
        contents: Object.values(state.contents)
          .filter(x => x.ownerId === actor.id)
          .map(copy),
        events: Object.values(state.events)
          .filter(x => x.ownerId === actor.id)
          .map(e => ({ ...copy(e), registrations: undefined })),
        registrations: Object.values(state.events)
          .filter(e => own(e.registrations, actor.id))
          .map(e => ({
            eventId: e.id,
            ...copy(own(e.registrations, actor.id))
          })),
        bookmarks: copy(own(state.bookmarks, actor.id) || [])
      }
    case 'review': {
      needModerator(actor)
      const items = ['contents', 'events', 'exchanges'].flatMap(kind =>
        Object.values(state[kind])
          .filter(x => !x.deletedAt && x.status === 'pending' && x.submission)
          .map(x => ({
            id: x.id,
            kind,
            revision: x.revision,
            submittedAt: x.submittedAt,
            author: authorOf(state, x.ownerId),
            submission: copy(x.submission)
          }))
      )
      const support = Object.entries(state.profiles)
        .filter(([, p]) => p.supportStatus === 'pending')
        .map(([id, p]) => ({
          id,
          kind: 'support',
          submission: { title: p.name, sourceUrl: p.supportUrl }
        }))
      return {
        items: [...items, ...support],
        reports: Object.values(state.reports).map(copy),
        comments: Object.values(state.comments)
          .filter(c => c.status === 'pending')
          .map(copy)
      }
    }
    default:
      return fail('not_found', '没有这个查询入口。', 404)
  }
}

// Mutates only an isolated snapshot. The repository commits this whole snapshot
// with compare-and-swap, so capacity, statuses and notifications change together.
export function changeCommunity(state, actor, command, ctx) {
  const profile = identify(state, actor, ctx)
  const input = command.input || {}
  const { at } = ctx
  const action = command.type
  if (action === 'profile.save') {
    for (const [key, max] of Object.entries({ name: 60, bio: 500 }))
      if (key in input)
        profile[key] =
          str(input[key], max) || (key === 'name' ? '一位存在者' : '')
    if ('public' in input) profile.public = input.public === true
    if ('adsOptIn' in input) profile.adsOptIn = input.adsOptIn === true
    if (
      'supportUrl' in input &&
      safeSourceUrl(input.supportUrl) !== profile.supportUrl
    ) {
      profile.supportUrl = safeSourceUrl(input.supportUrl)
      profile.supportStatus = profile.supportUrl ? 'pending' : 'none'
    }
    return { profile: copy(profile) }
  }
  if (action === 'content.create') {
    if (
      Object.values(state.contents).filter(
        x => x.ownerId === actor.id && !x.deletedAt
      ).length >= 100
    )
      fail('quota', '试用版每人先保存 100 条文字与目录记录，请先导出整理。')
    const id = ctx.id()
    const item = {
      id,
      ownerId: actor.id,
      kind: choice(input.kind, KINDS, 'journal'),
      domain: choice(input.domain, DOMAINS, 'existence'),
      draft: contentFields(input),
      visibility: 'private',
      publicVersion: null,
      status: 'draft',
      archived: false,
      revision: 1,
      createdAt: at,
      updatedAt: at,
      revisions: []
    }
    validateReferences(state, item)
    state.contents[id] = item
    return copy(item)
  }
  if (action.startsWith('content.')) {
    const item = owned(
      state,
      'contents',
      input.id,
      actor,
      action === 'content.restore'
    )
    revision(item, input)
    if (action === 'content.save') {
      item.draft = contentFields(input, item.draft)
      validateReferences(state, item)
      item.submission = null
      item.status = item.publicVersion ? 'published' : 'draft'
    } else if (action === 'content.submit') {
      if (item.archived) fail('archived', '先从归档恢复，再提交公开。')
      item.submission = {
        ...copy(item.draft),
        revisedAt: at,
        number: (item.publicVersion?.number || 0) + 1
      }
      item.submittedAt = at
      item.status = 'pending'
    } else if (action === 'content.withdraw') {
      item.visibility = 'private'
      item.publicVersion = null
      item.submission = null
      item.status = 'withdrawn'
    } else if (action === 'content.archive') {
      item.archived = true
      item.visibility = 'private'
      item.publicVersion = null
      item.submission = null
      item.status = 'draft'
    } else if (action === 'content.restore') {
      item.deletedAt = null
      item.archived = false
      item.visibility = 'private'
      item.status = 'draft'
    } else if (action === 'content.delete') {
      item.deletedAt = at
      item.visibility = 'private'
      item.publicVersion = null
      item.submission = null
      item.status = 'deleted'
    } else fail('invalid_action', '不支持的内容操作。')
    touch(item, at)
    audit(state, actor, item.id, action, ctx)
    return copy(item)
  }
  if (action === 'event.create') {
    if (
      Object.values(state.events).filter(
        x => x.ownerId === actor.id && !x.deletedAt
      ).length >= 20
    )
      fail('quota', '试用版每人先保存 20 场活动。')
    const id = ctx.id()
    const item = {
      id,
      ownerId: actor.id,
      draft: eventFields(input),
      visibility: 'private',
      publicVersion: null,
      approvedMeetingInfo: '',
      status: 'draft',
      revision: 1,
      registrations: {},
      changes: [],
      createdAt: at,
      updatedAt: at
    }
    state.events[id] = item
    return copy(item)
  }
  if (action.startsWith('event.')) {
    const item = owned(state, 'events', input.id, actor)
    revision(item, input)
    if (action === 'event.save') {
      item.draft = eventFields(input, item.draft)
      item.submission = null
      item.status = item.publicVersion ? 'published' : 'draft'
    } else if (action === 'event.submit') {
      validateEvent(item.draft)
      if (Date.parse(item.draft.endAt) <= ctx.now)
        fail('ended', '已结束的活动不能重新开放报名。')
      item.submission = copy(item.draft)
      item.submittedAt = at
      item.status = 'pending'
    } else if (action === 'event.withdraw') {
      item.visibility = 'private'
      item.publicVersion = null
      item.submission = null
      item.status = 'withdrawn'
      for (const r of confirmed(item))
        notify(
          state,
          r.userId,
          {
            message: '你报名的活动已撤回，请留意组织者后续说明。',
            href: '/our-beings/app/registrations'
          },
          ctx
        )
    } else if (action === 'event.cancel') {
      item.cancelledAt = at
      item.changes.unshift({
        at,
        message: str(input.reason, 300) || '组织者取消了活动。'
      })
      for (const r of confirmed(item))
        notify(
          state,
          r.userId,
          {
            message: `活动「${item.publicVersion?.title || item.draft.title}」已取消。`,
            href: `/our-beings/app/events/${item.id}`
          },
          ctx
        )
    } else fail('invalid_action', '不支持的活动操作。')
    touch(item, at)
    audit(state, actor, item.id, action, ctx)
    return copy(item)
  }
  if (action === 'registration.join' || action === 'registration.cancel') {
    const event = own(state.events, input.id)
    const existing = event ? own(event.registrations, actor.id) : null
    if (action === 'registration.cancel') {
      if (!event || (!isPublic(event) && !existing))
        fail('not_found', '没有找到自己的报名。', 404)
      if (!existing || existing.status === 'cancelled')
        return { status: 'cancelled' }
      existing.status = 'cancelled'
      existing.cancelledAt = at
      existing.contact = ''
      touch(event, at)
      notify(
        state,
        actor.id,
        {
          message: `已取消「${event.publicVersion?.title || '活动'}」的报名。`,
          href: '/our-beings/app/registrations'
        },
        ctx
      )
      return { status: 'cancelled' }
    }
    if (!isPublic(event)) fail('not_found', '活动尚未公开或已撤回。', 404)
    if (existing?.status === 'confirmed')
      return { status: 'confirmed', confirmedAt: existing.confirmedAt }
    if (event.cancelledAt) fail('cancelled', '这场活动已取消。', 409)
    if (ctx.now >= Date.parse(event.publicVersion.deadlineAt))
      fail('closed', '报名已截止。', 409)
    if (confirmed(event).length >= event.publicVersion.capacity)
      fail('full', '名额刚刚报满了。', 409)
    const contact = required(
      str(input.contact, 160),
      '请留下必要的联系信息，仅你与活动组织者可见。'
    )
    event.registrations[actor.id] = {
      userId: actor.id,
      name: profile.name,
      contact,
      status: 'confirmed',
      confirmedAt: at
    }
    touch(event, at)
    notify(
      state,
      actor.id,
      {
        message: `已确认报名「${event.publicVersion.title}」。`,
        href: `/our-beings/app/events/${event.id}`
      },
      ctx
    )
    notify(
      state,
      event.ownerId,
      {
        message: `「${event.publicVersion.title}」有新的报名。`,
        href: `/our-beings/app/manage/${event.id}`
      },
      ctx
    )
    return { status: 'confirmed', confirmedAt: at }
  }
  if (action === 'bookmark.toggle') {
    if (!isPublic(own(state.contents, input.id)))
      fail('not_found', '内容已撤回或尚未公开。', 404)
    const list = own(state.bookmarks, actor.id) || []
    const exists = list.some(x => x.contentId === input.id)
    state.bookmarks[actor.id] = exists
      ? list.filter(x => x.contentId !== input.id)
      : [...list, { contentId: input.id, at }].slice(-200)
    return { saved: !exists }
  }
  if (action === 'notifications.read') {
    for (const n of own(state.notifications, actor.id) || []) n.read = true
    return { ok: true }
  }
  if (action === 'report.create') {
    if (
      Object.values(state.reports).filter(
        x => x.reporterId === actor.id && x.status === 'open'
      ).length >= 5
    )
      fail('quota', '你已有五项待处理反馈，请等待处理结果。')
    const target =
      own(state.contents, input.id) ||
      own(state.events, input.id) ||
      own(state.exchanges, input.id)
    if (!isPublic(target)) fail('not_found', '这条公开内容已不可用。', 404)
    const id = ctx.id()
    state.reports[id] = {
      id,
      targetId: input.id,
      reporterId: actor.id,
      reason: required(str(input.reason, 1000), '请简要描述问题。'),
      status: 'open',
      at
    }
    return { id, status: 'open' }
  }
  if (action === 'comment.create') {
    if (
      Object.values(state.comments).filter(
        x =>
          x.ownerId === actor.id &&
          x.contentId === input.id &&
          x.status === 'pending'
      ).length >= 3
    )
      fail('quota', '这篇内容已有你的待审核回应，请等待处理。')
    const content = own(state.contents, input.id)
    if (!isPublic(content) || content.publicVersion.allowComments !== true)
      fail('closed', '这篇内容未开放回应。', 409)
    const id = ctx.id()
    state.comments[id] = {
      id,
      contentId: input.id,
      ownerId: actor.id,
      body: required(str(input.body, 1000), '写下一句具体的回应。'),
      status: 'pending',
      at
    }
    return { id, status: 'pending' }
  }
  if (action === 'exchange.create') {
    if (
      Object.values(state.exchanges).filter(x => x.ownerId === actor.id)
        .length >= 20
    )
      fail('quota', '试用版每人先保留 20 项交换记录。')
    const id = ctx.id()
    const draft = {}
    for (const key of [
      'title',
      'offered',
      'wanted',
      'condition',
      'city',
      'delivery',
      'shipping'
    ])
      draft[key] = required(
        str(input[key], key === 'title' ? 160 : 1000),
        '请补全提供、想换、成色、城市、交付和运费约定。'
      )
    const item = {
      id,
      ownerId: actor.id,
      draft,
      publicVersion: null,
      visibility: 'private',
      status: 'pending',
      submission: copy(draft),
      submittedAt: at,
      dealStatus: 'open',
      deal: null,
      revision: 1,
      createdAt: at,
      updatedAt: at
    }
    state.exchanges[id] = item
    return copy(item)
  }
  if (action.startsWith('exchange.')) {
    const item = own(state.exchanges, input.id)
    if (!isPublic(item)) fail('not_found', '这条交换尚未开放。', 404)
    if (action === 'exchange.propose') {
      if (actor.id === item.ownerId) fail('own_offer', '不能向自己发起交换。')
      if (item.deal) fail('busy', '该条目已有正在处理的提议。', 409)
      item.deal = {
        id: ctx.id(),
        peerId: actor.id,
        offered: required(str(input.offered, 1200), '请写明你提供的物品。'),
        note: str(input.note, 1000),
        snapshot: copy(item.publicVersion),
        acceptedBy: [actor.id],
        completedBy: [],
        contacts: { [actor.id]: str(input.contact, 160) },
        createdAt: at
      }
      item.dealStatus = 'proposed'
      notify(
        state,
        item.ownerId,
        {
          message: '你的交换条目收到一项提议。',
          href: `/our-beings/app/exchanges/${item.id}`
        },
        ctx
      )
    } else {
      if (![item.ownerId, item.deal?.peerId].includes(actor.id))
        fail('forbidden', '只有约定双方可以操作。', 403)
      if (action === 'exchange.accept') {
        if (
          !item.deal ||
          actor.id !== item.ownerId ||
          item.dealStatus !== 'proposed'
        )
          fail('invalid_state', '当前不能接受这项提议。', 409)
        item.deal.acceptedBy = [...new Set([...item.deal.acceptedBy, actor.id])]
        item.deal.contacts[actor.id] = str(input.contact, 160)
        item.dealStatus = 'accepted'
        notify(
          state,
          item.deal.peerId,
          {
            message: '对方接受了交换提议，请按约定联系。',
            href: `/our-beings/app/exchanges/${item.id}`
          },
          ctx
        )
      } else if (action === 'exchange.deliver') {
        if (!['accepted', 'delivering'].includes(item.dealStatus))
          fail('invalid_state', '双方接受约定后才能标记交付。', 409)
        item.dealStatus = 'delivering'
      } else if (action === 'exchange.complete') {
        if (!['accepted', 'delivering'].includes(item.dealStatus))
          fail('invalid_state', '当前不能确认完成。', 409)
        item.deal.completedBy = [
          ...new Set([...item.deal.completedBy, actor.id])
        ]
        if (item.deal.completedBy.length === 2) item.dealStatus = 'completed'
      } else if (action === 'exchange.cancel') {
        if (['completed', 'disputed'].includes(item.dealStatus))
          fail('invalid_state', '当前不能取消。', 409)
        item.dealStatus = 'cancelled'
      } else if (action === 'exchange.dispute') {
        if (!item.deal) fail('invalid_state', '尚未形成交换约定。', 409)
        item.dealStatus = 'disputed'
        item.deal.disputeReason = required(
          str(input.reason, 1000),
          '请填写争议说明。'
        )
      } else if (action === 'exchange.close') {
        if (actor.id !== item.ownerId)
          fail('forbidden', '只有发起人可以关闭。', 403)
        item.visibility = 'private'
        item.publicVersion = null
        item.dealStatus = 'closed'
      } else fail('invalid_action', '不支持的交换操作。')
    }
    touch(item, at)
    audit(state, actor, item.id, action, ctx)
    return { id: item.id, status: item.dealStatus }
  }
  if (action === 'review.decide') {
    needModerator(actor)
    if (input.kind === 'support') {
      const p = own(state.profiles, input.id)
      if (!p || p.supportStatus !== 'pending')
        fail('not_found', '没有待审核的支持链接。', 404)
      p.supportStatus = input.approve === true ? 'approved' : 'rejected'
      return { status: p.supportStatus }
    }
    if (!['contents', 'events', 'exchanges'].includes(input.kind))
      fail('invalid_input', '请选择正确的公开内容类型。')
    const item = own(state[input.kind], input.id)
    if (
      !item ||
      item.deletedAt ||
      item.status !== 'pending' ||
      !item.submission
    )
      fail('not_found', '没有待审核的版本。', 404)
    revision(item, input)
    if (input.approve === true) {
      if (input.kind === 'events') {
        validateEvent(item.submission)
        if (confirmed(item).length > item.submission.capacity)
          fail('capacity_conflict', '人数上限不能小于已有确认报名数。', 409)
        item.approvedMeetingInfo = item.submission.meetingInfo || ''
        if (item.publicVersion) {
          item.changes.unshift({
            at,
            message: '活动安排已更新，请重新核对时间、地点与参与说明。'
          })
          item.changes = item.changes.slice(0, 20)
          for (const r of confirmed(item))
            notify(
              state,
              r.userId,
              {
                message: `「${item.submission.title}」的活动安排已更新。`,
                href: `/our-beings/app/events/${item.id}`
              },
              ctx
            )
        }
      }
      if (input.kind === 'contents' && item.publicVersion)
        item.revisions = [
          {
            number: item.publicVersion.number,
            revisedAt: item.publicVersion.revisedAt,
            title: item.publicVersion.title
          },
          ...item.revisions
        ].slice(0, 20)
      item.publicVersion = copy(item.submission)
      if (input.kind === 'events') delete item.publicVersion.meetingInfo
      item.publishedAt = item.publishedAt || at
      item.visibility = 'public'
      item.status = 'published'
      item.submission = null
      item.reviewNote = ''
    } else {
      item.status = 'changes_requested'
      item.reviewNote = required(
        str(input.reason, 500),
        '请说明需要修改的地方。'
      )
      item.submission = null
    }
    touch(item, at)
    audit(state, actor, item.id, action, ctx)
    notify(
      state,
      item.ownerId,
      {
        message:
          input.approve === true
            ? '你的公开版本已通过审核。'
            : '公开版本需要修改，请查看说明。',
        href:
          input.kind === 'contents'
            ? `/our-beings/app/edit/${item.id}`
            : '/our-beings/app/my-events'
      },
      ctx
    )
    return { id: item.id, status: item.status }
  }
  if (action === 'review.report') {
    needModerator(actor)
    const report = own(state.reports, input.id)
    if (!report) fail('not_found', '没有这份举报。', 404)
    report.status = 'resolved'
    report.resolution = required(str(input.reason, 500), '请填写处理说明。')
    if (input.withdraw === true)
      for (const kind of ['contents', 'events', 'exchanges']) {
        const item = own(state[kind], report.targetId)
        if (item) {
          item.visibility = 'private'
          item.publicVersion = null
          item.status = 'withdrawn'
          item.submission = null
          touch(item, at)
        }
      }
    notify(
      state,
      report.reporterId,
      {
        message: `你的举报已处理：${report.resolution}`,
        href: '/our-beings/app/notifications'
      },
      ctx
    )
    return { status: report.status }
  }
  if (action === 'review.comment') {
    needModerator(actor)
    const c = own(state.comments, input.id)
    if (!c) fail('not_found', '没有这条回应。', 404)
    c.status = input.approve === true ? 'approved' : 'rejected'
    return { status: c.status }
  }
  return fail('invalid_action', '不支持的操作。')
}

export async function executeCommunity(
  store,
  actor,
  command,
  { now = Date.now(), id = () => globalThis.crypto.randomUUID() } = {}
) {
  const ctx = { now, at: new Date(now).toISOString(), id }
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const snapshot = await store.read()
    const next = copy(snapshot.state)
    const result = changeCommunity(next, actor, command, ctx)
    next.revision += 1
    if (new TextEncoder().encode(JSON.stringify(next)).length > MAX_STATE_BYTES)
      fail('storage_quota', '试用存储接近上限，请先导出并联系站主。', 413)
    if (await store.compareSwap(snapshot.token, next)) return result
  }
  return fail('busy', '刚好有人在更新，请稍后再试。你的输入仍可保留。', 409)
}

export function createMemoryCommunityStore(initial = emptyCommunity()) {
  let state = copy(initial)
  let token = 0
  return {
    read: async () => ({ state: copy(state), token }),
    compareSwap: async (expected, next) => {
      if (expected !== token) return false
      state = copy(next)
      token += 1
      return true
    }
  }
}
