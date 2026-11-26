import QRCode from 'qrcode'
import { activityRedis } from '@/lib/activities/redisStore'
import { resolveActivityActor } from '@/lib/activities/identity'
import {
  beginAdminScan,
  confirmAdminScan,
  confirmWebScan,
  readAdminScan
} from '@/lib/activities/adminScan'

function configured() {
  const token = process.env.WUZAI_FEEDBACK_ADMIN_TOKEN
  return typeof token === 'string' && token.length >= 16
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
    if (action === 'confirm-web') {
      const result = await confirmWebScan(redis, req.body?.ticket)
      return res.status(200).json({ version: 1, ...result })
    }
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
    const scan = await beginAdminScan(redis)
    const image = await QRCode.toDataURL(scan.url, {
      margin: 1,
      width: 240,
      errorCorrectionLevel: 'M'
    })
    return res.status(200).json({ ...scan, image })
  } catch (error) {
    const status = Number(error?.status) || 500
    return res.status(status).json({
      error: error?.code || 'unavailable',
      message: error?.message || '服务暂不可用。'
    })
  }
}
