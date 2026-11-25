/** @jest-environment node */
import { applyBreach, materialize, creditView, DAY, MONTH } from '@/lib/activities/credit'

describe('activity credit', () => {
  const start = Date.UTC(2026, 0, 1)

  test('starts at 100 and recovers 5 points each day up to 100', () => {
    const breached = applyBreach(null, start)
    expect(breached.score).toBe(95)
    const later = materialize(breached, start + 2 * DAY)
    expect(later.score).toBe(100)
  })

  test('dropping below 60 blocks publishing for 3 days and until the score returns', () => {
    const low = applyBreach(
      {
        score: 62,
        updatedAt: start,
        violations: [],
        publishFrozenUntil: 0,
        participateFrozenUntil: 0
      },
      start
    )
    expect(low.score).toBe(57)
    expect(low.publishFrozenUntil).toBe(start + 3 * DAY)
    expect(creditView(low, start + DAY).canPublish).toBe(false)
    const restored = creditView(low, start + 3 * DAY)
    expect(restored.score).toBeGreaterThanOrEqual(60)
    expect(restored.canPublish).toBe(true)
  })

  test('three breaches in a month block publishing and joining for 30 days', () => {
    let record = null
    record = applyBreach(record, start)
    record = applyBreach(record, start + DAY)
    record = applyBreach(record, start + 2 * DAY)
    const view = creditView(record, start + 2 * DAY)
    expect(view.canPublish).toBe(false)
    expect(view.canParticipate).toBe(false)
    const afterMonth = creditView(record, start + 2 * DAY + MONTH)
    expect(afterMonth.canParticipate).toBe(true)
  })
})
