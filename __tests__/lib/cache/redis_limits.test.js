/**
 * @jest-environment node
 */

import { gzipSync, gunzipSync } from 'zlib'
import {
  createRedisLimiter,
  decodeRedisValue,
  encodeRedisValue,
  isRedisPlanLimitError
} from '@/lib/cache/redis_limits'

describe('redis plan-limit helpers', () => {
  it('detects Upstash fixed-plan errors', () => {
    expect(
      isRedisPlanLimitError(
        new Error(
          'ERR This database has reached current Fixed plan limits. Please upgrade manually or enable auto-upgrade.'
        )
      )
    ).toBe(true)
    expect(isRedisPlanLimitError(new Error('ECONNRESET'))).toBe(false)
  })

  it('opens the circuit once and stays open for the window', () => {
    let now = 1_000
    const messages = []
    const limiter = createRedisLimiter({
      openMs: 1_000,
      logEveryMs: 1,
      now: () => now,
      warn: msg => messages.push(msg)
    })

    expect(limiter.isOpen()).toBe(false)
    limiter.open('plan limits')
    expect(limiter.isOpen()).toBe(true)
    expect(messages).toHaveLength(1)

    now = 1_500
    expect(limiter.isOpen()).toBe(true)

    now = 2_001
    expect(limiter.isOpen()).toBe(false)
  })

  it('gzip-encodes large values and round-trips', () => {
    const data = { text: '存在'.repeat(800) }
    const encoded = encodeRedisValue(data, { gzipSync })
    expect(encoded.startsWith('gz1:')).toBe(true)
    expect(decodeRedisValue(encoded, { gunzipSync })).toEqual(data)
  })

  it('skips values that would exceed the Redis payload cap', () => {
    const encoded = encodeRedisValue(
      { text: 'x'.repeat(200) },
      { maxValueBytes: 16, gzipSync }
    )
    expect(encoded).toBeNull()
  })
})
