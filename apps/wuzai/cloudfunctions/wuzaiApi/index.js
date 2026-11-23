const cloud = require('wx-server-sdk')
const { createHmac, randomBytes } = require('crypto')
const https = require('https')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

function forward(url, payload, secret) {
  const body = JSON.stringify(payload)
  const timestamp = String(Date.now())
  const nonce = randomBytes(16).toString('hex')
  const signature = createHmac('sha256', secret)
    .update(`${timestamp}\n${nonce}\n${body}`)
    .digest('hex')
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: 'POST',
        timeout: 12000,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          'X-Wuzai-Timestamp': timestamp,
          'X-Wuzai-Nonce': nonce,
          'X-Wuzai-Signature': signature
        }
      },
      res => {
        let data = ''
        res.setEncoding('utf8')
        res.on('data', part => {
          data += part
          if (data.length > 2000000)
            res.destroy(new Error('response_too_large'))
        })
        res.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch {
            reject(new Error('invalid_response'))
          }
        })
        res.on('error', reject)
      }
    )
    req.on('timeout', () => req.destroy(new Error('timeout')))
    req.on('error', reject)
    req.end(body)
  })
}
exports.main = async event => {
  try {
    const identity = cloud.getWXContext()
    const secret = process.env.WUZAI_MINI_BRIDGE_SECRET
    const origin = process.env.WUZAI_API_ORIGIN || 'https://ourbeings.com'
    if (!identity.OPENID || !identity.APPID || !secret)
      return {
        error: 'not_configured',
        message: '活动服务暂未就绪，请稍后再来。'
      }
    if (!/^https:\/\//.test(origin)) throw new Error('invalid_origin')
    const allowed = [
      'list',
      'get',
      'mine',
      'create',
      'edit',
      'publish',
      'reserve',
      'cancelReservation',
      'cancelEvent',
      'announce'
    ]
    if (!allowed.includes(event.action))
      return { error: 'invalid_action', message: '暂不支持这个操作。' }
    const input =
      event.input &&
      typeof event.input === 'object' &&
      !Array.isArray(event.input)
        ? { ...event.input }
        : {}
    if (['create', 'edit', 'announce'].includes(event.action)) {
      const content = [
        input.title,
        input.description,
        input.book,
        input.location,
        input.joinInstructions,
        input.body,
        event.nickname
      ]
        .filter(item => typeof item === 'string')
        .join('\n')
      const review = await cloud.openapi.security.msgSecCheck({
        openid: identity.OPENID,
        scene: 2,
        version: 2,
        content
      })
      if (review.errCode || review.result?.suggest !== 'pass')
        return {
          error: 'content_review',
          message: '请检查内容后再提交，或稍后重试。'
        }
    }
    const payload = {
      ...input,
      action: event.action,
      identity: {
        appId: identity.APPID,
        openId: identity.OPENID,
        name:
          typeof event.nickname === 'string'
            ? event.nickname.trim().slice(0, 30)
            : ''
      }
    }
    return await forward(new URL('/api/our-beings/v1', origin), payload, secret)
  } catch (error) {
    console.error('[wuzaiApi]', error.code || error.name)
    return {
      error: 'unavailable',
      message: '暂时没能连接到活动服务，请稍后重试。'
    }
  }
}
