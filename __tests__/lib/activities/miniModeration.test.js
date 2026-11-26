/** @jest-environment node */
import { reviewDescription, moderateMini } from '@/lib/activities/miniModeration'
import { wechatJson } from '@/lib/activities/miniIdentity'
jest.mock('@/lib/activities/miniIdentity',()=>({MINI_PREFIX:'test:',wechatJson:jest.fn()}))
const redis={get:jest.fn().mockResolvedValue('token')}, actor={id:'wx:test:one'}
beforeEach(()=>{process.env.WUZAI_MINI_APP_ID='test';process.env.WUZAI_MINI_APP_SECRET='secret';wechatJson.mockReset()})
afterEach(()=>{delete process.env.WUZAI_MINI_APP_ID;delete process.env.WUZAI_MINI_APP_SECRET})
test('feedback quotes only a returned keyword present in the actual text and gives a targeted revision',async()=>{
  wechatJson.mockResolvedValue({errcode:0,result:{suggest:'risky',label:20008},detail:[{suggest:'risky',label:20008,keyword:'保证收益'}]})
  const result=await reviewDescription(redis,actor,'第一段正常说明。\n本活动保证收益，不会亏损。')
  expect(result.passed).toBe(false)
  expect(result.issues[0]).toMatchObject({line:2,precise:true,field:'description'})
  expect(result.issues[0].excerpt).toContain('保证收益')
  expect(result.issues[0].suggestion).toContain('费用')
})
test('without an exact keyword the flagged paragraph is identified and the limit is disclosed',async()=>{
  wechatJson.mockResolvedValueOnce({errcode:0,result:{suggest:'risky',label:20003}})
    .mockResolvedValueOnce({errcode:0,result:{suggest:'pass',label:100}})
    .mockResolvedValueOnce({errcode:0,result:{suggest:'risky',label:20003}})
  const result=await reviewDescription(redis,actor,'正常段落。\n需核查的第二段。')
  expect(result.issues[0]).toMatchObject({line:2,precise:false,excerpt:'需核查的第二段。'})
})
test('service failure is recoverable and is never described as illegal content',async()=>{
  wechatJson.mockResolvedValue({errcode:45009})
  await expect(reviewDescription(redis,actor,'讨论一本书')).rejects.toMatchObject({code:'content_service_unavailable',status:503})
})
test('publication moderation also rejects a description even if the client skips the preview check',async()=>{
  wechatJson.mockResolvedValue({errcode:0,result:{suggest:'review',label:20006}})
  await expect(moderateMini(redis,actor,{description:'需要复核的活动说明'})).rejects.toMatchObject({code:'content_review',issues:expect.any(Array)})
})

test('the unified personal signature is checked before account storage', async () => {
  wechatJson.mockResolvedValue({ errcode: 0, result: { suggest: 'risky', label: 20006 } })
  await expect(moderateMini(redis, actor, { signature: '需要检查的个人签名' })).rejects.toMatchObject({ code: 'content_review' })
  expect(wechatJson.mock.calls[0][1].body).toContain('需要检查的个人签名')
})
