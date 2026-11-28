import { MINI_PREFIX, accountKey, publicProfileId, DEFAULT_NICKNAME } from './miniIdentity'
import { fail } from '@/apps/wuzai/miniprogram/common/activities'

const timeKey = id => MINI_PREFIX + 'public-time:' + id
const validProfileId = id => typeof id === 'string' && /^[a-f0-9]{64}$/.test(id)
const validUser = user => Number.isSafeInteger(user?.number) && user.number > 0
export function personView(user, id) {
  return { profileId: publicProfileId(id), nickname: user.nickname || DEFAULT_NICKNAME, avatar: user.avatar || '初' }
}
export async function publicProfile(redis, input, now = Date.now()) {
  if (!validProfileId(input.profileId)) fail('not_found', '该用户资料暂不可用。', 404)
  const raw = await redis.get(MINI_PREFIX + 'account:' + input.profileId)
  const user = raw ? JSON.parse(raw) : null
  if (!validUser(user)) fail('not_found', '该用户资料暂不可用。', 404)
  const saved = await redis.get(timeKey(input.profileId))
  return { profile: { profileId: input.profileId, nickname: user.nickname || DEFAULT_NICKNAME, avatar: user.avatar || '初', signature: user.bio || '', time: saved ? timeSnapshot(JSON.parse(saved), now) : null } }
}
function normalizeTime(input) {
  const { awakening, newYears, sleepHours } = input || {}
  const date = new Date(`${awakening}T12:00:00Z`)
  if (typeof awakening !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(awakening) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== awakening || awakening < '1900-01-01' || awakening > '2100-12-31' || !Number.isInteger(newYears) || newYears < 1 || newYears > 120 || typeof sleepHours !== 'number' || !Number.isFinite(sleepHours) || sleepHours < 0 || sleepHours > 24)
    fail('invalid_profile', '时间设置无效，请检查日期、年数和每日睡眠。')
  const year = date.getUTCFullYear() + newYears
  const month = date.getUTCMonth()
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
  const anniversary = Date.UTC(year, month, Math.min(date.getUTCDate(), lastDay))
  // Same inclusive last day and Shanghai midnight as the My Being clock.
  return { startsAt: Date.parse(`${awakening}T00:00:00+08:00`), endsAt: anniversary - 8 * 3600000 - 1000, sleepHours }
}
export function timeSnapshot(time, now) {
  const totalMs = Math.max(0, time.endsAt - time.startsAt)
  return { asOf: now, totalMs, remainingMs: Math.max(0, Math.min(totalMs, time.endsAt - now)), awakeRate: (24 - time.sleepHours) / 24, running: now >= time.startsAt && now < time.endsAt, startsInMs: Math.max(0, time.startsAt - now) }
}
export async function updatePublicTime(redis, actor, input) {
  const time = normalizeTime(input.time)
  const profileId = publicProfileId(actor.id)
  const result = await redis.set(timeKey(profileId), JSON.stringify(time), ...(input.ifMissing === true ? ['NX'] : []))
  return { synced: true, created: result === 'OK' }
}
export async function decoratePeople(redis, rawEvents, detail) {
  const ids = [...new Set(rawEvents.flatMap(event => event ? [event.hostId, ...Object.keys(event.reservations || {})] : []).filter(id => id?.startsWith('wx:')))]
  const values = ids.length ? await redis.mget(ids.map(accountKey)) : []
  const users = new Map(ids.map((id, i) => { const user = values[i] ? JSON.parse(values[i]) : null; return [id, validUser(user) ? user : null] }))
  const person = (id, name) => users.get(id) ? personView(users.get(id), id) : { profileId: '', nickname: id?.startsWith('wx:') ? DEFAULT_NICKNAME : name || DEFAULT_NICKNAME, avatar: '初' }
  return rawEvents.map(event => {
    if (!event) return {}
    const confirmed = Object.entries(event.reservations || {}).filter(([, row]) => row.status === 'confirmed')
    const facilitator = confirmed.find(([, row]) => 'member:' + row.memberId === event.facilitatorId)
    const hostProfile = person(event.hostId, event.hostName)
    const facilitatorProfile = facilitator ? person(facilitator[0], facilitator[1].name) : hostProfile
    const hostCandidates = [{ id: 'organizer', name: hostProfile.nickname }, ...confirmed.filter(([, row]) => row.memberId).map(([id, row]) => ({ id: 'member:' + row.memberId, name: person(id, row.name).nickname }))]
    const members = new Map([[event.hostId, { ...hostProfile, isHost: true, isFacilitator: !facilitator }]])
    for (const [id, row] of confirmed) if (!members.has(id)) members.set(id, { ...person(id, row.name), isHost: false, isFacilitator: facilitator?.[0] === id })
    return { hostProfile, facilitatorProfile, ...(detail ? { participants: [...members.values()] } : {}), hostCandidates }
  })
}
