/** @jest-environment node */
import Redis from 'ioredis'
import { activityRedis } from '@/lib/activities/redisStore'
jest.mock('ioredis', () => jest.fn())

test('a terminated Redis client is recreated on the next request and errors are handled', () => {
  const original = process.env.REDIS_URL
  process.env.REDIS_URL = 'redis://localhost:6379'
  const first = { status: 'ready', on: jest.fn() }
  const recovered = { status: 'connecting', on: jest.fn() }
  Redis.mockReturnValueOnce(first).mockReturnValueOnce(recovered)
  try {
    expect(activityRedis()).toBe(first)
    expect(activityRedis()).toBe(first)
    first.status = 'end'
    expect(activityRedis()).toBe(recovered)
    expect(activityRedis()).toBe(recovered)
    expect(Redis).toHaveBeenCalledTimes(2)
    expect(recovered.on).toHaveBeenCalledWith('error', expect.any(Function))
  } finally {
    if (original === undefined) delete process.env.REDIS_URL
    else process.env.REDIS_URL = original
  }
})
