import { activityPresence, summarizePresence } from '@/lib/activities/presence'
const host = { id: 'clerk:alice' }
const id = '11111111-1111-4111-8111-111111111111'
describe('platform presence privacy and membership', () => {
  test('deduplicates people across tabs and counts distinct gathering rooms', () => {
    expect(
      summarizePresence([
        JSON.stringify({ actor: 'a', room: id }),
        JSON.stringify({ actor: 'a', room: id }),
        JSON.stringify({ actor: 'b', room: '' })
      ])
    ).toEqual({ people: 2, groups: 1 })
  })
  test('visitors can read aggregate statistics without any identities', async () => {
    const redis = {
      eval: jest
        .fn()
        .mockResolvedValue([JSON.stringify({ actor: 'private', room: id })])
    }
    const result = await activityPresence(
      redis,
      'presenceStats',
      {},
      null,
      jest.fn(),
      100000
    )
    expect(result.presence).toMatchObject({
      people: 1,
      groups: 1,
      ttlSeconds: 75
    })
    expect(JSON.stringify(result)).not.toContain('private')
    expect(JSON.stringify(result)).not.toContain(id)
  })
  test('heartbeat requires a verified actor and cannot invent room membership', async () => {
    const redis = { eval: jest.fn() },
      service = jest
        .fn()
        .mockResolvedValue({ event: { state: 'published', status: 'open' } })
    await expect(
      activityPresence(
        redis,
        'presence',
        { session: 'a'.repeat(16) },
        null,
        service
      )
    ).rejects.toMatchObject({ status: 401 })
    await expect(
      activityPresence(
        redis,
        'presence',
        { session: 'a'.repeat(16), id },
        host,
        service
      )
    ).rejects.toMatchObject({ status: 403 })
    expect(redis.eval).not.toHaveBeenCalled()
  })
  test('leave can only remove the signed-in actor’s own lease; no activity data is accessed', async () => {
    const redis = { eval: jest.fn().mockResolvedValue([]) },
      service = jest.fn()
    await activityPresence(
      redis,
      'presence',
      { session: 'a'.repeat(16), leave: true, id },
      host,
      service,
      100000
    )
    expect(service).not.toHaveBeenCalled()
    const args = redis.eval.mock.calls[0]
    expect(args[6]).toBe('leave')
    expect(args[7]).not.toContain('alice')
  })
  test('cancelled or ended gathering pages cannot count as an active group', async () => {
    const redis = { eval: jest.fn().mockResolvedValue([]) },
      service = jest
        .fn()
        .mockResolvedValue({
          event: { id, isHost: true, state: 'cancelled', status: 'cancelled' }
        })
    await activityPresence(
      redis,
      'presence',
      { session: 'a'.repeat(16), id },
      host,
      service
    )
    expect(JSON.parse(redis.eval.mock.calls[0][8]).room).toBe('')
  })
})
