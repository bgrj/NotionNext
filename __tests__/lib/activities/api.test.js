import handler from '@/pages/api/our-beings/v1'
import { activityRedis } from '@/lib/activities/redisStore'
import {
  resolveActivityActor,
  limitActivityRequest
} from '@/lib/activities/identity'
import { createActivityService } from '@/lib/activities/service'
jest.mock('@/lib/activities/redisStore', () => ({
  activityRedis: jest.fn(),
  redisActivityStore: jest.fn()
}))
jest.mock('@/lib/activities/identity', () => ({
  resolveActivityActor: jest.fn(),
  limitActivityRequest: jest.fn()
}))
jest.mock('@/lib/activities/service', () => ({
  createActivityService: jest.fn()
}))
const response = () => {
  const res = { setHeader: jest.fn() }
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}
describe('versioned activity API boundary', () => {
  let run
  beforeEach(() => {
    run = jest.fn().mockResolvedValue({ events: [] })
    createActivityService.mockReturnValue(run)
    activityRedis.mockReturnValue({})
    resolveActivityActor.mockResolvedValue(null)
    limitActivityRequest.mockResolvedValue(undefined)
  })
  test('public catalogue responses are private/no-store and versioned', async () => {
    const res = response()
    await handler(
      { method: 'GET', query: { action: 'list' }, headers: {} },
      res
    )
    expect(res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'private, no-store'
    )
    expect(res.json).toHaveBeenCalledWith({ version: 1, events: [] })
    expect(run).toHaveBeenCalledWith('list', {}, null)
  })
  test('rejects mutating GET before reaching storage', async () => {
    const res = response()
    await handler(
      { method: 'GET', query: { action: 'reserve' }, headers: {} },
      res
    )
    expect(res.status).toHaveBeenCalledWith(400)
    expect(run).not.toHaveBeenCalled()
  })
  test('rejects cross-origin browser writes', async () => {
    const res = response()
    await handler(
      {
        method: 'POST',
        body: { action: 'create' },
        headers: { origin: 'https://attacker.example', host: 'ourbeings.com' }
      },
      res
    )
    expect(res.status).toHaveBeenCalledWith(403)
    expect(run).not.toHaveBeenCalled()
  })
  test('rejects unsupported methods', async () => {
    const res = response()
    await handler({ method: 'DELETE', headers: {} }, res)
    expect(res.status).toHaveBeenCalledWith(405)
  })
  test('never reflects backend credentials or stack traces on service failure', async () => {
    const log = jest.spyOn(console, 'error').mockImplementation(() => {})
    activityRedis.mockImplementation(() => {
      throw new Error('redis://private:password@internal')
    })
    const res = response()
    await handler(
      { method: 'GET', query: { action: 'list' }, headers: {} },
      res
    )
    expect(res.status).toHaveBeenCalledWith(503)
    expect(JSON.stringify(res.json.mock.calls)).not.toContain('password')
    log.mockRestore()
  })
})
