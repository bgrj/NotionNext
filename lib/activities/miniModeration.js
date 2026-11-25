import { fail } from '@/apps/wuzai/miniprogram/common/activities'
import { MINI_PREFIX, wechatJson } from './miniIdentity'

async function accessToken(redis, refresh = false) {
  const appId = process.env.WUZAI_MINI_APP_ID,
    secret = process.env.WUZAI_MINI_APP_SECRET
  if (!appId || !secret)
    fail('wechat_not_configured', '微信服务尚未配置完成，请稍后重试。', 503)
  const key = MINI_PREFIX + 'access-token:' + appId
  if (!refresh) {
    const cached = await redis.get(key)
    if (cached) return cached
  }
  const data = await wechatJson(
    'https://api.weixin.qq.com/cgi-bin/stable_token',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credential',
        appid: appId,
        secret,
        force_refresh: refresh
      })
    }
  )
  if (!data.access_token || data.errcode)
    fail('content_service_unavailable', '内容检查暂不可用，请稍后重试。', 503)
  await redis.set(
    key,
    data.access_token,
    'EX',
    Math.max(60, Math.min(7000, Number(data.expires_in) - 120 || 6000))
  )
  return data.access_token
}
export async function moderateMini(redis, actor, input) {
  const fields = [
    'title',
    'description',
    'book',
    'location',
    'city',
    'joinInstructions',
    'body',
    'bio',
    'hostIntro',
    'preparation',
    'accessibility',
    'cancellationPolicy',
    'cost'
  ]
  const content = fields
    .map(field => input[field])
    .concat(
      Object.values(
        input.place && typeof input.place === 'object' ? input.place : {}
      )
    )
    .filter(value => typeof value === 'string')
    .join('\n')
  if (content.length > 10000) fail('content_too_long', '内容过长，请分次提交。')
  if (!content) return
  let token = await accessToken(redis)
  const openid = actor.id.slice(`wx:${process.env.WUZAI_MINI_APP_ID}:`.length)
  const characters = Array.from(content)
  for (let offset = 0; offset < characters.length; offset += 2200) {
    const body = JSON.stringify({
      openid,
      scene: 2,
      version: 2,
      content: characters.slice(offset, offset + 2400).join('')
    })
    const check = access =>
      wechatJson(
        'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' +
          encodeURIComponent(access),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body
        }
      )
    let review = await check(token)
    if ([40001, 42001].includes(review.errcode)) {
      token = await accessToken(redis, true)
      review = await check(token)
    }
    if (review.errcode || review.result?.suggest !== 'pass')
      fail('content_review', '请检查内容后再提交，或稍后重试。')
    if (offset + 2400 >= characters.length) break
  }
}
