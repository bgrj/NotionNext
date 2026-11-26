import { createHash } from 'node:crypto'
import { fail, requireActor } from '@/apps/wuzai/miniprogram/common/activities'
import { MINI_PREFIX, accountKey } from './miniIdentity'
import { rewardOwner, verifiedBugKey, seedVerifiedBugs } from './membershipRewards'

export const annualMembershipKey = actor =>
  MINI_PREFIX + 'membership:' + createHash('sha256').update(actor.id).digest('hex')

export const MEMBERSHIP_OFFERS = Object.freeze({ founding: { maxNumber: 100 }, beta: { requiredCount: 50 } })

function membershipView(record, now) {
  const expires = Date.parse(record?.expiresAt || '')
  const active = record?.status === 'active' && record?.plan === 'annual' && expires > now
  return {
    plan: 'annual', priceFen: 8400, currency: 'CNY', active,
    expiresAt: Number.isFinite(expires) ? new Date(expires).toISOString() : null,
    status: active ? 'active' : Number.isFinite(expires) && expires <= now ? 'expired' : 'inactive',
    paymentReady: false
  }
}

function offersView(record, number, count) {
  return [
    { id: 'founding', eligible: Number.isSafeInteger(number) && number >= 1 && number <= MEMBERSHIP_OFFERS.founding.maxNumber, claimed: !!record?.claims?.founding, maxNumber: MEMBERSHIP_OFFERS.founding.maxNumber },
    { id: 'beta', eligible: count >= MEMBERSHIP_OFFERS.beta.requiredCount, claimed: !!record?.claims?.beta, count, requiredCount: MEMBERSHIP_OFFERS.beta.requiredCount }
  ]
}

export async function readAnnualMembership(redis, actor, now = Date.now()) {
  requireActor(actor)
  const raw = await redis.get(annualMembershipKey(actor))
  const record = raw ? JSON.parse(raw) : null
  await seedVerifiedBugs(redis, actor)
  const count = Number(await redis.scard(verifiedBugKey(rewardOwner(actor))))
  return {
    ...membershipView(record, now),
    offers: offersView(record, actor.user?.number, count)
  }
}

export function addMembershipYear(from) {
  const offset = 8 * 60 * 60 * 1000
  const date = new Date(Date.parse(from) + offset)
  const month = date.getUTCMonth()
  date.setUTCFullYear(date.getUTCFullYear() + 1)
  if (date.getUTCMonth() !== month) date.setUTCDate(0)
  return new Date(date.getTime() - offset).toISOString()
}

const CLAIM = `-- membership-offer-claim-v1
if (redis.call('GET', KEYS[1]) or '') ~= ARGV[1] then return 'conflict' end
if redis.call('GET', KEYS[2]) ~= ARGV[2] then return 'conflict' end
local account = cjson.decode(ARGV[2])
if ARGV[4] == 'founding' then
  if type(account.number) ~= 'number' or account.number < 1 or account.number > tonumber(ARGV[5]) or account.number % 1 ~= 0 then return 'ineligible' end
elseif ARGV[4] == 'beta' then
  if redis.call('SCARD', KEYS[3]) < tonumber(ARGV[5]) then return 'ineligible' end
else return 'ineligible' end
redis.call('SET', KEYS[1], ARGV[3])
return 'claimed'`

export async function claimAnnualMembership(redis, actor, input = {}, now = Date.now()) {
  requireActor(actor)
  const offerId = input.offerId
  if (!Object.hasOwn(MEMBERSHIP_OFFERS, offerId)) fail('invalid_offer', '没有找到这项会员礼遇。')
  await seedVerifiedBugs(redis, actor)
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const raw = await redis.get(annualMembershipKey(actor))
    const record = raw ? JSON.parse(raw) : null
    if (record?.claims?.[offerId]) return { alreadyClaimed: true, membership: await readAnnualMembership(redis, actor, now) }
    const accountRaw = await redis.get(accountKey(actor.id))
    if (!accountRaw) fail('wechat_login_required', '请重新登录。', 401)
    const account = JSON.parse(accountRaw)
    const count = Number(await redis.scard(verifiedBugKey(rewardOwner(actor))))
    const offer = offersView(record, account.number, count).find(row => row.id === offerId)
    if (!offer.eligible) fail('offer_ineligible', '尚未达到这项会员礼遇的领取条件。', 403)
    const previousExpiry = Date.parse(record?.expiresAt || '')
    const startsAt = new Date(Math.max(now, record?.status === 'active' && Number.isFinite(previousExpiry) ? previousExpiry : 0)).toISOString()
    const expiresAt = addMembershipYear(startsAt)
    const next = { ...record, plan: 'annual', status: 'active', expiresAt,
      claims: { ...record?.claims, [offerId]: { claimedAt: new Date(now).toISOString(), startsAt, expiresAt } } }
    const threshold = offerId === 'founding' ? MEMBERSHIP_OFFERS.founding.maxNumber : MEMBERSHIP_OFFERS.beta.requiredCount
    const result = await redis.eval(CLAIM, 3, annualMembershipKey(actor), accountKey(actor.id), verifiedBugKey(rewardOwner(actor)), raw || '', accountRaw, JSON.stringify(next), offerId, threshold)
    if (result === 'claimed') return { alreadyClaimed: false, membership: await readAnnualMembership(redis, actor, now) }
    if (result === 'ineligible') fail('offer_ineligible', '尚未达到这项会员礼遇的领取条件。', 403)
  }
  fail('membership_conflict', '会员记录刚刚发生变化，请刷新后重试。', 409)
}

export async function assertAnnualMember(redis, actor) {
  requireActor(actor)
  const raw = await redis.get(annualMembershipKey(actor))
  const membership = membershipView(raw ? JSON.parse(raw) : null, Date.now())
  if (!membership.active) fail('membership_required', '开通年会员后，可以发布和参与活动。', 402)
  return membership
}
