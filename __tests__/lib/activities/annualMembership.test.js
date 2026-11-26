/** @jest-environment node */
import { annualMembershipKey, readAnnualMembership, assertAnnualMember, claimAnnualMembership, addMembershipYear } from '@/lib/activities/annualMembership'
import { accountKey } from '@/lib/activities/miniIdentity'
import { verifiedBugKey, rewardOwner } from '@/lib/activities/membershipRewards'
import { rewardRedis } from '@/test-support/activities/rewardRedis'
const actor = { id: 'wx:app:owner', user: { number: 7 } }
const redis = record => {
  const db = rewardRedis()
  db.rows.set(accountKey(actor.id), JSON.stringify(actor.user))
  if (record) db.rows.set(annualMembershipKey(actor), JSON.stringify(record))
  return db
}
test('membership is account-specific and prices cannot be supplied by the client', async () => {
  expect(annualMembershipKey(actor)).not.toContain(actor.id)
  expect(annualMembershipKey(actor)).not.toBe(annualMembershipKey({ id: 'other' }))
  await expect(readAnnualMembership(redis(), null)).rejects.toMatchObject({ status: 401 })
  expect(await readAnnualMembership(redis(), actor)).toMatchObject({ active: false, priceFen: 8400, plan: 'annual', paymentReady: false })
})

test.each([1, 100])('verified numbered account %s can claim the founding year once', async number => {
  const db = redis()
  const owner = { ...actor, user: { number } }
  db.rows.set(accountKey(actor.id), JSON.stringify(owner.user))
  const now = Date.parse('2026-11-26T17:00:00Z')
  const first = await claimAnnualMembership(db, owner, { offerId: 'founding', years: 100 }, now)
  expect(first.membership.expiresAt).toBe('2027-11-26T17:00:00.000Z')
  expect(first.membership.active).toBe(true)
  const again = await claimAnnualMembership(db, owner, { offerId: 'founding' }, now + 3600000)
  expect(again.alreadyClaimed).toBe(true)
  expect(again.membership.expiresAt).toBe(first.membership.expiresAt)
})

test('forged account numbers and unrelated offers cannot create membership', async () => {
  const db = redis()
  db.rows.set(accountKey(actor.id), JSON.stringify({ number: 101 }))
  await expect(claimAnnualMembership(db, actor, { offerId: 'founding', number: 1 })).rejects.toMatchObject({ code: 'offer_ineligible' })
  await expect(claimAnnualMembership(db, null, { offerId: 'founding' })).rejects.toMatchObject({ status: 401 })
  await expect(claimAnnualMembership(db, actor, { offerId: '__proto__' })).rejects.toMatchObject({ code: 'invalid_offer' })
  expect(db.rows.has(annualMembershipKey(actor))).toBe(false)
})

test('49 distinct accepted bugs are insufficient; 50 qualify, without trusting submitted counts', async () => {
  const db = redis()
  const progress = new Set(Array.from({ length: 49 }, (_, index) => 'bug-' + index))
  db.sets.set(verifiedBugKey(rewardOwner(actor)), progress)
  await expect(claimAnnualMembership(db, actor, { offerId: 'beta', count: 500 })).rejects.toMatchObject({ code: 'offer_ineligible' })
  progress.add('bug-50')
  const result = await claimAnnualMembership(db, actor, { offerId: 'beta' })
  expect(result.membership.offers.find(offer => offer.id === 'beta')).toMatchObject({ claimed: true, count: 50 })
})

test('concurrent claims for the same offer grant one year, and different offers can stack', async () => {
  const db = redis()
  db.sets.set(verifiedBugKey(rewardOwner(actor)), new Set(Array.from({ length: 50 }, (_, i) => 'bug-' + i)))
  const now = Date.parse('2026-11-26T17:00:00Z')
  const repeated = await Promise.all(Array.from({ length: 6 }, () => claimAnnualMembership(db, actor, { offerId: 'founding' }, now)))
  expect(repeated.filter(result => !result.alreadyClaimed)).toHaveLength(1)
  const beta = await claimAnnualMembership(db, actor, { offerId: 'beta' }, now)
  expect(beta.membership.expiresAt).toBe('2028-11-26T17:00:00.000Z')
  expect(beta.membership.offers.every(offer => offer.claimed)).toBe(true)
})

test('calendar grants respect the Beijing anniversary, including leap day', () => {
  expect(addMembershipYear('2024-02-28T16:00:00Z')).toBe('2025-02-27T16:00:00.000Z')
  expect(addMembershipYear('2026-11-26T17:00:00Z')).toBe('2027-11-26T17:00:00.000Z')
})

test('different offers claimed concurrently preserve both receipts and both years', async () => {
  const db = redis()
  db.sets.set(verifiedBugKey(rewardOwner(actor)), new Set(Array.from({ length: 50 }, (_, i) => 'bug-' + i)))
  const now = Date.parse('2026-11-26T17:00:00Z')
  await Promise.all(['founding', 'beta'].map(offerId => claimAnnualMembership(db, actor, { offerId }, now)))
  const final = await readAnnualMembership(db, actor, now)
  expect(final.expiresAt).toBe('2028-11-26T17:00:00.000Z')
  expect(final.offers.every(offer => offer.claimed)).toBe(true)
})
test('only active, unexpired annual records grant publishing and joining', async () => {
  const future = new Date(Date.now() + 86400000).toISOString()
  await expect(assertAnnualMember(redis({ plan: 'annual', status: 'active', expiresAt: future }), actor)).resolves.toMatchObject({ active: true })
  for (const record of [null, { plan: 'monthly', status: 'active', expiresAt: future }, { plan: 'annual', status: 'revoked', expiresAt: future }, { plan: 'annual', status: 'active', expiresAt: 'invalid' }, { plan: 'annual', status: 'active', expiresAt: '2020-01-01' }])
    await expect(assertAnnualMember(redis(record), actor)).rejects.toMatchObject({ status: 402, code: 'membership_required' })
})
