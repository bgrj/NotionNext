import handler, { config } from '@/pages/api/our-beings/v1'
import { activityRedis } from '@/lib/activities/redisStore'
import {
  resolveActivityActor,
  limitActivityRequest
} from '@/lib/activities/identity'
import { createActivityService } from '@/lib/activities/service'
import { demoEvents } from '@/apps/wuzai/miniprogram/common/demo-events'
import { searchPlaces } from '@/lib/activities/places'
jest.mock('@/lib/activities/places', () => ({ searchPlaces: jest.fn() }))
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
  test('maximum valid UTF-8 form fields fit the configured request envelope', () => {
    const data = {
      action: 'create',
      title: '题'.repeat(80),
      book: '书'.repeat(120),
      description: '文'.repeat(4000),
      city: '城'.repeat(160),
      location: '地'.repeat(160),
      joinInstructions: '群'.repeat(1000),
      place: {
        name: '名'.repeat(160),
        label: '名'.repeat(320),
        country: '国'.repeat(100),
        state: '省'.repeat(100),
        county: '县'.repeat(100),
        locality: '镇'.repeat(100),
        latitude: 31,
        longitude: 120,
        coordinateSystem: 'wgs84'
      },
      identity: { appId: 'trusted', openId: 'trusted', name: '人'.repeat(30) }
    }
    const bytes = Buffer.byteLength(JSON.stringify(data), 'utf8')
    expect(bytes).toBeGreaterThan(16 * 1024)
    expect(bytes).toBeLessThanOrEqual(
      Number.parseInt(config.api.bodyParser.sizeLimit, 10) * 1024
    )
  })
  let run
  beforeEach(() => {
    run = jest.fn().mockResolvedValue({ events: [] })
    createActivityService.mockReturnValue(run)
    activityRedis.mockReturnValue({})
    resolveActivityActor.mockResolvedValue(null)
    limitActivityRequest.mockResolvedValue(undefined)
    searchPlaces.mockResolvedValue({ places: [] })
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
    const result = res.json.mock.calls[0][0]
    expect(result.version).toBe(1)
    expect(result.events).toHaveLength(48)
    expect(
      result.events.every(
        (item) => item.demo && !item.canReserve && !item.canChat
      )
    ).toBe(true)
    expect(run).toHaveBeenCalledWith('list', {}, null)
  })
  test.each([
    'reserve',
    'publish',
    'edit',
    'message',
    'announce',
    'cancelEvent'
  ])('demo %s cannot reach the real event service', async (action) => {
    const res = response()
    await handler(
      { method: 'POST', body: { action, id: demoEvents()[0].id }, headers: {} },
      res
    )
    expect(res.status).toHaveBeenCalledWith(409)
    expect(run).not.toHaveBeenCalled()
  })
  test('later catalogue pages never repeat the demo catalogue', async () => {
    const res = response()
    await handler(
      { method: 'GET', query: { action: 'list', offset: '40' }, headers: {} },
      res
    )
    expect(res.json).toHaveBeenCalledWith({ version: 1, events: [] })
  })
  test('world place lookup is a public read and does not invoke event writes', async () => {
    const res = response()
    await handler(
      {
        method: 'GET',
        query: { action: 'locations', query: 'A village' },
        headers: {}
      },
      res
    )
    expect(searchPlaces).toHaveBeenCalledWith({}, { query: 'A village' })
    expect(run).not.toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith({ version: 1, places: [] })
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
