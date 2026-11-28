import { createHash } from 'node:crypto'
import { fail, eventStatus, isHost } from '@/apps/wuzai/miniprogram/common/activities'
import { compareActivityCards } from '@/apps/wuzai/miniprogram/common/activity-order'
import { isArea } from '@/apps/wuzai/miniprogram/common/places'
import { redisActivityStore, userKey } from './redisStore'
import { MINI_PREFIX } from './miniIdentity'
import { decoratePeople } from './miniPublicProfiles'

const PREFIX = 'wuzai:{activities:v1}:'
const eventKey = id => PREFIX + 'event:' + id
const covers = [
  'reading.png',
  'life.png',
  'technology.png',
  'career.png',
  'study.png',
  'migration.png'
]
export function miniDetails(input = {}) {
  const result = {
    cover: /^\/api\/our-beings\/covers\/[a-f0-9]{64}$/.test(input.cover || '')
      ? input.cover
      : covers.includes(input.cover)
        ? input.cover
        : 'reading.png',
    confirmed: input.confirmed === true,
    complianceVersion:
      typeof input.complianceVersion === 'string'
        ? input.complianceVersion.slice(0, 40)
        : '',
    complianceAcceptedAt:
      typeof input.complianceAcceptedAt === 'string'
        ? input.complianceAcceptedAt.slice(0, 40)
        : ''
  }
  for (const field of [
    'hostIntro',
    'cost',
    'preparation',
    'accessibility',
    'cancellationPolicy'
  ])
    result[field] =
      typeof input[field] === 'string' ? input[field].trim().slice(0, 500) : ''
  return result
}
export function arrangementHash(event) {
  const data = {}
  for (const key of [
    'title',
    'description',
    'book',
    'startsAt',
    'endsAt',
    'deadline',
    'capacity',
    'format',
    'discussion',
    'channel',
    'language',
    'city',
    'location',
    'place',
    'joinInstructions',
    'gatheringVersion',
    'participantLimit',
    'languageDetail',
    'facilitatorId',
    'channelDetail'
  ])
    data[key] = event[key] === undefined ? null : event[key]
  return createHash('sha256').update(JSON.stringify(data)).digest('hex')
}
export function checkPublication(event) {
  if ((event.joinInstructions || '').startsWith('筹备草稿：'))
    fail('joining_required', '请将筹备说明替换为真实参与方式，再公开发布。')
  const details = event.miniDetails
  if (event.gatheringVersion === 2) {
    if (!details?.confirmed || details.basis !== arrangementHash(event))
      fail('arrangements_unconfirmed', '请先勾选「我已确认」。')
    if (!/^\/api\/our-beings\/covers\/[a-f0-9]{64}$/.test(details.cover || ''))
      fail('cover_required', '请上传活动封面。')
    if (!event.description?.trim())
      fail('invalid_description', '请填写活动简介。')
    if (
      event.format === 'offline' &&
      (event.place
        ? isArea(event.place)
        : !event.city?.trim() || !event.location?.trim())
    )
      fail('meeting_point_required', '请选择具体城市与活动地点。')
    if (event.format === 'online' && !event.joinInstructions?.trim())
      fail('joining_required', '请填写会议号或群组入口。')
    return
  }
  if (
    !details?.confirmed ||
    details.basis !== arrangementHash(event) ||
    [
      'hostIntro',
      'cost',
      'preparation',
      'accessibility',
      'cancellationPolicy'
    ].some(field => !details[field])
  )
    fail(
      'arrangements_unconfirmed',
      '请先编辑活动，确认主持、场地或会议入口等安排后再发布。'
    )
  if (
    event.format === 'offline' &&
    (event.place
      ? isArea(event.place)
      : !event.city?.trim() || !event.location?.trim())
  )
    fail(
      'meeting_point_required',
      '请搜索并选择具体场地或集合点，不能使用城市中心代替。'
    )
  if (event.discussion !== 'site' && !event.joinInstructions?.trim())
    fail('joining_required', '请填写真实会议入口或入群说明后再发布。')
}
export function uploadKey(actor, requestId) {
  if (!/^[a-zA-Z0-9-]{8,60}$/.test(requestId || ''))
    fail('invalid_request_id', '没有找到这份上传记录。')
  return (
    MINI_PREFIX +
    'upload:' +
    createHash('sha256').update(actor.id).digest('hex') +
    ':' +
    requestId
  )
}
const CREATE = `
if redis.call('GET',KEYS[4]) ~= ARGV[4] or redis.call('EXISTS',KEYS[1]) == 1 then return 0 end
redis.call('SET',KEYS[1],ARGV[1]); redis.call('ZADD',KEYS[2],ARGV[2],ARGV[3]); redis.call('ZADD',KEYS[3],ARGV[2],ARGV[3])
redis.call('SET',KEYS[4],cjson.encode({state='complete',eventId=ARGV[3]}))
return 1`
export async function claimUpload(redis, key) {
  const pending = JSON.stringify({
    state: 'pending',
    at: new Date().toISOString()
  })
  if ((await redis.set(key, pending, 'EX', 120, 'NX')) === 'OK')
    return { fresh: true, pending }
  return { fresh: false, ...JSON.parse((await redis.get(key)) || '{}') }
}
export async function releaseUpload(redis, key, pending) {
  await redis.eval(
    "if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end; return 0",
    1,
    key,
    pending
  )
}
export function miniActivityStore(redis, action, input, actor, ticket) {
  const base = redisActivityStore(redis)
  return {
    ...base,
    async orderedPage(listAction, offset, limit, now) {
      const records = new Map()
      for (let cursor = 0; ; cursor += 200) {
        const ids = await base.ids(listAction === 'mine' ? actor.id : null, cursor, 200)
        const rows = await base.getMany(ids)
        for (const raw of rows.filter(Boolean)) {
          const event = JSON.parse(raw)
          const visible = listAction === 'mine'
            ? isHost(event, actor) || Boolean(event.reservations?.[actor.id])
            : Boolean(event.publishedAt)
          if (visible) records.set(event.id, { ...event, status: eventStatus(event, now) })
        }
        if (ids.length < 200) break
      }
      const events = [...records.values()].sort((a, b) => {
        const draftA = !a.publishedAt, draftB = !b.publishedAt
        if (draftA !== draftB) return draftA ? -1 : 1
        if (draftA) return String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')) || String(a.id).localeCompare(String(b.id))
        return compareActivityCards(a, b)
      })
      return { events: events.slice(offset, offset + limit), nextOffset: offset + limit < events.length ? offset + limit : null }
    },
    async create(event) {
      event.origin = {
        platform: 'wechat',
        environment: ['develop', 'trial', 'release'].includes(
          input.clientEnvironment
        )
          ? input.clientEnvironment
          : 'historical'
      }
      event.miniDetails = {
        ...miniDetails(input),
        basis: arrangementHash(event)
      }
      return (
        (await redis.eval(
          CREATE,
          4,
          eventKey(event.id),
          PREFIX + 'index',
          userKey(actor.id),
          ticket.key,
          JSON.stringify(event),
          Date.parse(event.createdAt),
          event.id,
          ticket.pending
        )) === 1
      )
    },
    compareAndSet(event, raw, actorId) {
      if (action === 'edit' && event.hostId === actor.id)
        event.miniDetails = {
          ...miniDetails(input),
          basis: arrangementHash(event)
        }
      if (
        action === 'publish' ||
        (action === 'edit' && event.state === 'published')
      )
        checkPublication(event)
      return base.compareAndSet(event, raw, actorId)
    }
  }
}
export async function decorateMiniResult(redis, result) {
  const rows = result.event ? [result.event] : result.events || []
  if (!rows.length) return result
  const raw = await redis.mget(rows.map(row => eventKey(row.id)))
  const events = raw.map(value => value ? JSON.parse(value) : null)
  const people = await decoratePeople(redis, events, !!result.event)
  const decorated = rows.map((row, index) => {
    const event = raw[index] ? JSON.parse(raw[index]) : null
    const { hostCandidates, ...profiles } = people[index]
    const { confirmed, ...visible } = event?.miniDetails ? miniDetails(event.miniDetails) : {}
    return { ...row, ...visible, ...profiles, ...(row.isHost ? { ...(confirmed !== undefined ? { confirmed } : {}), hostCandidates } : {}) }
  })
  return result.event
    ? { ...result, event: decorated[0] }
    : { ...result, events: decorated }
}
const UPLOADED_COVER = /^\/api\/our-beings\/covers\/[a-f0-9]{64}$/
export function listCarouselCovers() {
  return Promise.resolve({ reading: [], conversation: [] })
}
