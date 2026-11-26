/** @jest-environment node */
import handler from '@/pages/api/our-beings/mini'
import { activityRedis } from '@/lib/activities/redisStore'
import { resolveMiniActor } from '@/lib/activities/miniIdentity'
import { createActivityService } from '@/lib/activities/service'
import { moderateMini } from '@/lib/activities/miniModeration'
import { assertCredit } from '@/lib/activities/credit'
import { assertAnnualMember } from '@/lib/activities/annualMembership'
jest.mock('@/lib/activities/annualMembership', () => ({ readAnnualMembership: jest.fn(), assertAnnualMember: jest.fn(), claimAnnualMembership: jest.fn() }))
jest.mock('@/lib/activities/credit',()=>({assertCredit:jest.fn(),readCredit:jest.fn(),recordBreach:jest.fn()}))
jest.mock('@/lib/activities/redisStore', () => ({ activityRedis: jest.fn() }))
jest.mock('@/lib/activities/identity', () => ({
  limitActivityRequest: jest.fn()
}))
jest.mock('@/lib/activities/miniIdentity', () => ({
  resolveMiniActor: jest.fn(),
  publicMiniUser: jest.fn(),
  loginMini: jest.fn()
}))
jest.mock('@/lib/activities/miniModeration', () => ({
  moderateMini: jest.fn()
}))
jest.mock('@/lib/activities/service', () => ({
  createActivityService: jest.fn()
}))
jest.mock('@/lib/activities/miniStore', () => ({
  miniActivityStore: jest.fn(),
  decorateMiniResult: jest.fn(async (_redis, data) => data),
  uploadKey: jest.fn(),
  claimUpload: jest.fn(),
  releaseUpload: jest.fn()
}))
const response = () => {
  const res = { setHeader: jest.fn() }
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}
describe('native HTTPS API boundary', () => {
  let run
  beforeEach(() => {
    run = jest.fn().mockResolvedValue({ events: [] })
    activityRedis.mockReturnValue({})
    resolveMiniActor.mockResolvedValue(null)
    createActivityService.mockReturnValue(run)
    assertAnnualMember.mockReset()
  })
  test('capabilities explains the HTTPS transport without exposing credentials or using CloudBase', async () => {
    process.env.WUZAI_MINI_APP_SECRET = 'private-value'
    process.env.WUZAI_MINI_APP_ID = 'app'
    const res = response()
    await handler(
      { method: 'GET', query: { action: 'capabilities' }, headers: {} },
      res
    )
    expect(res.json).toHaveBeenCalledWith({
      version: 1,
      transport: 'https',
      cloudbaseRequired: false,
      wechatConfigured: true
    })
    expect(activityRedis).not.toHaveBeenCalled()
    expect(JSON.stringify(res.json.mock.calls)).not.toContain('private-value')
    delete process.env.WUZAI_MINI_APP_SECRET
    delete process.env.WUZAI_MINI_APP_ID
  })
  test('public lists contain actual service events without inserting demonstration bookings', async () => {
    const res = response()
    await handler(
      { method: 'POST', body: { action: 'list' }, headers: {} },
      res
    )
    expect(run).toHaveBeenCalledWith('list', {}, null)
    expect(res.json).toHaveBeenCalledWith({ version: 1, events: [] })
  })
  test('an authenticated non-member cannot reserve even if the client bypasses the membership page', async () => {
    resolveMiniActor.mockResolvedValue({ id: 'owner' })
    assertAnnualMember.mockRejectedValue(Object.assign(new Error('会员未开通'), { code: 'membership_required', status: 402 }))
    const res = response()
    await handler({ method: 'POST', headers: {}, body: { action: 'reserve', input: { id: 'any', active: true, priceFen: 1 } } }, res)
    expect(res.status).toHaveBeenCalledWith(402)
    expect(run).not.toHaveBeenCalled()
  })
  test.each([
    'reserve', 'get', 'membership', 'claimMembership',
    'mine',
    'profile',
    'publish',
    'saveWriting',
    'uploadCover', 'submitFeedback', 'mediaReadiness', 'deleteDraft'
    , 'beginCompliance', 'acceptCompliance', 'reviewDescription'
  ])('anonymous %s cannot reach private service operations', async action => {
    const res = response()
    await handler(
      {
        method: 'POST',
        body: {
          action,
          input: { openid: 'forged', identity: { openId: 'forged' } }
        },
        headers: {}
      },
      res
    )
    expect(res.status).toHaveBeenCalledWith(401)
    expect(run).not.toHaveBeenCalled()
  })
  test('a caller-supplied actor cannot replace the session identity', async () => {
    const actor = {
      id: 'wx:app:trusted',
      name: '存在者1号',
      platform: 'wechat'
    }
    resolveMiniActor.mockResolvedValue(actor)
    const res = response()
    await handler(
      {
        method: 'POST',
        body: {
          action: 'reserve',
          input: { id: 'event', identity: { id: 'forged' } }
        },
        headers: {}
      },
      res
    )
    expect(run.mock.calls[0][2]).toBe(actor)
    expect(assertCredit).toHaveBeenCalledWith(expect.anything(),actor,'participate')
  })
  test('credit restrictions stop a reservation before the activity mutation',async()=>{
    resolveMiniActor.mockResolvedValue({id:'wx:trusted'})
    assertCredit.mockRejectedValueOnce(Object.assign(new Error('信用限制'),{code:'credit_restricted',status:403}))
    const res=response()
    await handler({method:'POST',body:{action:'reserve',input:{id:'event'}},headers:{}},res)
    expect(res.status).toHaveBeenCalledWith(403)
    expect(run).not.toHaveBeenCalled()
  })
  test('a confirmed checkbox without a server reading receipt cannot create an activity',async()=>{
    resolveMiniActor.mockResolvedValue({id:'wx:test:member',name:'存在者1号'})
    const res=response()
    await handler({method:'POST',body:{action:'create',input:{confirmed:true}},headers:{}},res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({error:'compliance_required'}))
    expect(run).not.toHaveBeenCalled()
  })
  test('content rejection prevents writing', async () => {
    resolveMiniActor.mockResolvedValue({ id: 'wx:trusted' })
    moderateMini.mockRejectedValueOnce(
      Object.assign(new Error('rejected'), {
        code: 'content_review',
        status: 400
      })
    )
    const res = response()
    await handler(
      {
        method: 'POST',
        body: { action: 'edit', input: { id: 'event', title: 'text' } },
        headers: {}
      },
      res
    )
    expect(res.status).toHaveBeenCalledWith(400)
    expect(run).not.toHaveBeenCalled()
  })
  test('cross-origin browser writes are rejected before storage access', async () => {
    const res = response()
    await handler(
      {
        method: 'POST',
        body: { action: 'reserve' },
        headers: { origin: 'https://wrong.example', host: 'ourbeings.com' }
      },
      res
    )
    expect(res.status).toHaveBeenCalledWith(403)
    expect(activityRedis).not.toHaveBeenCalled()
  })
})
