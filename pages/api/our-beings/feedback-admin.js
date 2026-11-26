import { activityRedis } from '@/lib/activities/redisStore'
import { adminSessionValid } from '@/lib/activities/adminScan'
import {
  getMiniFeedback,
  listMiniFeedback,
  updateMiniFeedbackStatus
} from '@/lib/activities/miniFeedback'

function providedToken(req) {
  const header = req.headers.authorization || ''
  if (header.toLowerCase().startsWith('bearer ')) return header.slice(7).trim()
  const custom = req.headers['x-feedback-admin-token']
  if (typeof custom === 'string') return custom.trim()
  if (typeof req.body?.token === 'string') return req.body.token.trim()
  if (typeof req.query?.token === 'string') return req.query.token.trim()
  return ''
}

async function authorize(req, redis) {
  const actual = providedToken(req)
  if (!actual?.startsWith('scan_')) return false
  return adminSessionValid(redis, actual)
}

function sendError(res, error) {
  const status = Number(error?.status) || 500
  return res.status(status).json({
    error: error?.code || 'unavailable',
    message: error?.message || '服务暂不可用。'
  })
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')
  if (!['GET', 'PATCH', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, PATCH, POST')
    return res.status(405).json({ error: 'method_not_allowed', message: '不支持的请求方式。' })
  }
  const redis = activityRedis()
  if (!(await authorize(req, redis)))
    return res.status(401).json({ error: 'unauthorized', message: '请用你的微信扫码进入。' })
  try {
    if (req.method === 'GET') {
      if (req.query?.id)
        return res.status(200).json({ feedback: await getMiniFeedback(redis, req.query.id) })
      return res.status(200).json(
        await listMiniFeedback(redis, {
          limit: req.query?.limit,
          offset: req.query?.offset,
          status: req.query?.status
        })
      )
    }
    const id = req.body?.id || req.query?.id
    const feedback = await updateMiniFeedbackStatus(redis, id, {
      status: req.body?.status,
      note: req.body?.note
    })
    return res.status(200).json({ feedback })
  } catch (error) {
    return sendError(res, error)
  }
}
