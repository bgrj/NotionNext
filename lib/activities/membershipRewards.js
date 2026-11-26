import { createHash } from 'node:crypto'
import { MINI_PREFIX } from './miniIdentity'

export const rewardOwner = actor => createHash('sha256').update(actor.id).digest('hex')
export const verifiedBugKey = owner => MINI_PREFIX + 'verified-bugs:' + owner
export const countsAsVerifiedBug = row =>
  ['reviewed', 'paid'].includes(row.status) && ['minor', 'major', 'blocking'].includes(row.severity)

const SEED = `-- membership-bug-seed-v1
if redis.call('GET', KEYS[1]) ~= ARGV[1] then return 0 end
return redis.call('SADD', KEYS[2], ARGV[2])`

// Legacy reports are reconciled once; subsequent review changes update the set
// atomically. Report images may expire without erasing earned contribution IDs.
export async function seedVerifiedBugs(redis, actor) {
  const owner = rewardOwner(actor)
  const marker = MINI_PREFIX + 'verified-bugs-seeded:' + owner
  if (await redis.get(marker)) return
  const ids = await redis.zrange(MINI_PREFIX + 'feedback-index', 0, -1)
  for (let offset = 0; offset < ids.length; offset += 20) {
    const batch = ids.slice(offset, offset + 20)
    const rows = await redis.mget(batch.map(id => MINI_PREFIX + 'feedback:' + id))
    for (let index = 0; index < rows.length; index += 1) {
      if (!rows[index]) continue
      let row
      try { row = JSON.parse(rows[index]) } catch { continue }
      if (row.owner !== owner || !countsAsVerifiedBug(row)) continue
      await redis.eval(SEED, 2, MINI_PREFIX + 'feedback:' + batch[index], verifiedBugKey(owner), rows[index], batch[index])
    }
  }
  await redis.set(marker, '1')
}
