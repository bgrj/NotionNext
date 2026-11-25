import { randomBytes } from 'node:crypto'
import { fail, requireActor } from '@/apps/wuzai/miniprogram/common/activities'
import { MINI_PREFIX } from './miniIdentity'
import {
  VERSION,
  SECONDS
} from '@/apps/wuzai/miniprogram/common/activity-compliance'
const key = token => MINI_PREFIX + 'compliance:' + token
export async function beginCompliance(redis, actor, now = Date.now()) {
  requireActor(actor)
  const token = randomBytes(24).toString('hex')
  await redis.set(
    key(token),
    JSON.stringify({ actorId: actor.id, version: VERSION, issuedAt: now }),
    'EX',
    1200
  )
  return { token, version: VERSION, seconds: SECONDS }
}
export async function requireCompliance(
  redis,
  actor,
  token,
  accepted = true,
  now = Date.now()
) {
  requireActor(actor)
  const row = /^[a-f0-9]{48}$/.test(token || '')
    ? JSON.parse((await redis.get(key(token))) || 'null')
    : null
  if (
    !row ||
    row.actorId !== actor.id ||
    row.version !== VERSION ||
    now - row.issuedAt >= 1200000
  )
    fail('compliance_required', '请重新阅读并同意活动安全与合规提示。')
  if (now - row.issuedAt < SECONDS * 1000)
    fail('compliance_wait', '请完整阅读 20 秒后再确认。')
  if (accepted && !row.acceptedAt)
    fail('compliance_required', '请先同意活动安全与合规提示。')
  return row
}
export async function acceptCompliance(redis, actor, token, now = Date.now()) {
  const row = await requireCompliance(redis, actor, token, false, now)
  row.acceptedAt = now
  await redis.set(
    key(token),
    JSON.stringify(row),
    'EX',
    Math.max(1, Math.floor((row.issuedAt + 1200000 - now) / 1000))
  )
  return { version: VERSION, acceptedAt: row.acceptedAt }
}
