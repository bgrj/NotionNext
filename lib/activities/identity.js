import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { getAuth } from '@clerk/nextjs/server'
import { getClerkClient } from '@/lib/beings/clerkClient'
import { fail, text } from '@/apps/wuzai/miniprogram/common/activities'

export const bridgeSignature = (secret, timestamp, nonce, body) =>
  createHmac('sha256', secret)
    .update(`${timestamp}\n${nonce}\n${JSON.stringify(body)}`)
    .digest('hex')
export async function resolveActivityActor(req, redis, now = Date.now()) {
  const signature = req.headers['x-wuzai-signature']
  if (signature) {
    const secret = process.env.WUZAI_MINI_BRIDGE_SECRET
    const appId = process.env.WUZAI_MINI_APP_ID
    const timestamp = String(req.headers['x-wuzai-timestamp'] || '')
    const nonce = String(req.headers['x-wuzai-nonce'] || '')
    const identity = req.body?.identity
    if (
      !secret ||
      !appId ||
      !/^\d{13}$/.test(timestamp) ||
      Math.abs(now - Number(timestamp)) > 60000 ||
      !/^[a-f0-9]{32}$/.test(nonce) ||
      !identity ||
      identity.appId !== appId ||
      !/^[A-Za-z0-9_-]{10,100}$/.test(identity.openId || '')
    )
      fail('invalid_bridge', '微信身份验证失败，请重新打开小程序。', 401)
    const expected = bridgeSignature(secret, timestamp, nonce, req.body)
    if (
      typeof signature !== 'string' ||
      !/^[a-f0-9]{64}$/.test(signature) ||
      !timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
    )
      fail('invalid_bridge', '微信身份验证失败。', 401)
    if (
      (await redis.set(`wuzai:bridge:nonce:${nonce}`, '1', 'EX', 120, 'NX')) !==
      'OK'
    )
      fail('replayed', '这次请求已经处理，请重新操作。', 401)
    return {
      id: `wx:${appId}:${identity.openId}`,
      name: text(identity.name, 30) || '一位共读者',
      platform: 'wechat'
    }
  }
  let userId = null
  try {
    userId = getAuth(req).userId
  } catch {
    /* Public reads work without Clerk configuration. */
  }
  if (!userId) return null
  if (!['create', 'message'].includes(req.body?.action))
    return { id: `clerk:${userId}`, name: '一位共读者', platform: 'web' }
  const client = await getClerkClient()
  const user = await client.users.getUser(userId)
  return {
    id: `clerk:${userId}`,
    name:
      text(user.publicMetadata?.name || user.firstName || user.username, 30) ||
      '一位共读者',
    platform: 'web'
  }
}
export async function limitActivityRequest(redis, actor, req) {
  const address = String(
    req.headers['x-forwarded-for'] || req.socket?.remoteAddress || ''
  )
    .split(',')[0]
    .trim()
  const digest = createHash('sha256')
    .update(actor?.id || address)
    .digest('hex')
  const key = `wuzai:rate:v1:${digest}:${Math.floor(Date.now() / 60000)}`
  const hits = Number(
    await redis.eval(
      "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],120) end; return n",
      1,
      key
    )
  )
  if (hits > (req.method === 'GET' ? 120 : 60))
    fail('rate_limit', '操作有点频繁，请稍后再试。', 429)
}
