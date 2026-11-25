import { createHash } from 'node:crypto'
import { fail } from '@/apps/wuzai/miniprogram/common/activities'

export const DAY = 24 * 60 * 60 * 1000
export const MONTH = 30 * DAY
export const PENALTY = 5
export const RECOVERY = 5
const START = 100

const keyFor = (actorId) =>
  `wuzai:{activities:v1}:credit:${createHash('sha256').update(String(actorId)).digest('hex')}`

export function blank(now = Date.now()) {
  return {
    score: START,
    updatedAt: now,
    violations: [],
    publishFrozenUntil: 0,
    participateFrozenUntil: 0
  }
}

export function materialize(record, now = Date.now()) {
  const base = record && Number.isFinite(record.score) ? record : blank(now)
  const updatedAt = Number(base.updatedAt) || now
  const steps = Math.max(0, Math.floor((now - updatedAt) / DAY))
  return {
    score: Math.min(START, Math.max(0, Number(base.score) + steps * RECOVERY)),
    updatedAt: updatedAt + steps * DAY,
    violations: (Array.isArray(base.violations) ? base.violations : [])
      .map(Number)
      .filter((time) => now - time < MONTH),
    publishFrozenUntil: Number(base.publishFrozenUntil) || 0,
    participateFrozenUntil: Number(base.participateFrozenUntil) || 0
  }
}

export function applyBreach(record, now = Date.now()) {
  const current = materialize(record, now)
  const score = Math.max(0, current.score - PENALTY)
  const violations = [...current.violations, now]
  let publishFrozenUntil = current.publishFrozenUntil
  let participateFrozenUntil = current.participateFrozenUntil
  if (violations.length >= 3) {
    publishFrozenUntil = Math.max(publishFrozenUntil, now + MONTH)
    participateFrozenUntil = Math.max(participateFrozenUntil, now + MONTH)
  } else if (score < 60) {
    publishFrozenUntil = Math.max(publishFrozenUntil, now + 3 * DAY)
  }
  return {
    score,
    updatedAt: now,
    violations,
    publishFrozenUntil,
    participateFrozenUntil
  }
}

export function creditView(record, now = Date.now()) {
  const credit = materialize(record, now)
  return {
    score: credit.score,
    canPublish:
      credit.score >= 60 &&
      now >= credit.publishFrozenUntil &&
      now >= credit.participateFrozenUntil,
    canParticipate: now >= credit.participateFrozenUntil,
    publishFrozenUntil: credit.publishFrozenUntil,
    participateFrozenUntil: credit.participateFrozenUntil,
    recentBreaches: credit.violations.length
  }
}

function gateMessage(view, kind) {
  if (!view.canParticipate && (kind === 'participate' || kind === 'publish')) {
    return '一个月内违约已达 3 次，30 天内不能发布或参与活动。'
  }
  if (kind === 'publish' && view.score < 60) {
    return `信用分为 ${view.score}。低于 60 分不能发布，每 24 小时恢复 5 分，回到 60 分后方可再发布。`
  }
  if (kind === 'publish') {
    return '信用分曾低于 60，3 天内不能发布。每 24 小时恢复 5 分，上限 100 分。'
  }
  return '当前不能完成这个操作。'
}

export async function readCredit(redis, actorId, now = Date.now()) {
  const raw = await redis.get(keyFor(actorId))
  const stored = raw ? JSON.parse(raw) : null
  return creditView(stored, now)
}

export async function assertCredit(redis, actor, kind, now = Date.now()) {
  const view = await readCredit(redis, actor.id, now)
  const allowed = kind === 'participate' ? view.canParticipate : view.canPublish
  if (!allowed) fail('credit_restricted', gateMessage(view, kind), 403)
  return view
}

export async function recordBreach(redis, actor, now = Date.now()) {
  const key = keyFor(actor.id)
  const raw = await redis.get(key)
  const next = applyBreach(raw ? JSON.parse(raw) : null, now)
  await redis.set(key, JSON.stringify(next))
  return creditView(next, now)
}
