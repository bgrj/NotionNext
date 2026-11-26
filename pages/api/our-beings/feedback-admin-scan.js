import { activityRedis } from '@/lib/activities/redisStore'
import { resolveActivityActor } from '@/lib/activities/identity'
import {
  adminKeyMatches,
  adminSessionValid,
  beginAdminScan,
  confirmAdminScan,
  readAdminScan,
  renderAdminScanCode
} from '@/lib/activities/adminScan'

function bearer(req) {
  const header = req.headers.authorization || ''
  return header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : ''
}

function configured() {
  const token = process.env.WUZAI_FEEDBACK_ADMIN_TOKEN
  return typeof token === 'string' && token.length >= 16
}

async function authorized(req, redis) {
  const token = bearer(req)
  if (adminKeyMatches(token)) return true
  if (token.startsWith('scan_')) return adminSessionValid(redis, token)
  return false
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')
  try {
    if (!configured())
      return res.status(503).json({
        error: 'admin_unconfigured',
        message: '尚未配置管理密钥。'
      })
    const redis = activityRedis()
    if (req.method === 'GET')
      return res.status(200).json(await readAdminScan(redis, req.query?.ticket))
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST')
      return res.status(405).json({
        error: 'method_not_allowed',
        message: '不支持的请求方式。'
      })
    }
    const action = req.body?.action
    if (action === 'confirm') {
      const actor = await resolveActivityActor(req, redis)
      const marker = `wx:${process.env.WUZAI_MINI_APP_ID}:`
      if (!actor?.id?.startsWith(marker))
        return res.status(401).json({
          error: 'invalid_bridge',
          message: '请用微信确认。'
        })
      const result = await confirmAdminScan(redis, {
        ticket: req.body?.ticket,
        openId: actor.id.slice(marker.length)
      })
      return res.status(200).json({ version: 1, ...result })
    }
    if (action !== 'start' && action !== 'bind')
      return res.status(400).json({
        error: 'invalid_action',
        message: '不支持的操作。'
      })
    if (action === 'bind' && !(await authorized(req, redis)))
      return res.status(401).json({
        error: 'unauthorized',
        message: '管理密钥不正确。'
      })
    return res.status(200).json(
      await beginAdminScan(redis, {
        purpose: action === 'bind' ? 'bind' : 'enter',
        renderCode: ticket => renderAdminScanCode(redis, ticket)
      })
    )
  } catch (error) {
    const status = Number(error?.status) || 500
    return res.status(status).json({
      error: error?.code || 'unavailable',
      message: error?.message || '服务暂不可用。'
    })
  }
}
