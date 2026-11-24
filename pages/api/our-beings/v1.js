import { createActivityService } from '@/lib/activities/service'
import { activityRedis, redisActivityStore } from '@/lib/activities/redisStore'
import {
  limitActivityRequest,
  resolveActivityActor
} from '@/lib/activities/identity'
import { fail } from '@/apps/wuzai/miniprogram/common/activities'
import { activityPresence } from '@/lib/activities/presence'
import { activityWritings } from '@/lib/activities/writings'
import {
  demoEvents,
  getDemoEvent
} from '@/apps/wuzai/miniprogram/common/demo-events'

export const config = { api: { bodyParser: { sizeLimit: '16kb' } } }
const READS = [
  'list',
  'get',
  'mine',
  'messages',
  'presenceStats',
  'writings',
  'publicWritings'
]
const WRITES = [
  'create',
  'edit',
  'publish',
  'reserve',
  'cancelReservation',
  'cancelEvent',
  'announce',
  'message',
  'presence',
  'saveWriting'
]
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST')
    return res
      .status(405)
      .json({ error: 'method_not_allowed', message: '不支持的请求方式。' })
  }
  try {
    const data = req.method === 'GET' ? req.query : req.body
    const { action, ...input } = data || {}
    if (
      ![...READS, ...WRITES].includes(action) ||
      (req.method === 'GET' && !READS.includes(action))
    )
      fail('invalid_action', '不支持的操作。')
    if (req.method === 'POST' && req.headers.origin) {
      let origin
      try {
        origin = new URL(req.headers.origin)
      } catch {
        fail('invalid_origin', '请求来源不正确。', 403)
      }
      if (origin.host !== req.headers.host)
        fail('invalid_origin', '请从本站提交操作。', 403)
    }
    const redis = activityRedis()
    const actor = await resolveActivityActor(req, redis)
    await limitActivityRequest(redis, actor, req)
    const service = createActivityService(redisActivityStore(redis))
    const demo = getDemoEvent(input.id)
    if (demo && action !== 'get')
      fail('demo_readonly', '演示活动不接受真实预约。', 409)
    let result
    if (demo) result = { event: demo }
    else if (['writings', 'publicWritings', 'saveWriting'].includes(action))
      result = await activityWritings(redis, action, input, actor)
    else if (['presence', 'presenceStats'].includes(action))
      result = await activityPresence(redis, action, input, actor, service)
    else result = await service(action, input, actor)
    if (action === 'list' && !Number(input.offset))
      result.events = [...result.events, ...demoEvents()]
    return res.status(200).json({ version: 1, ...result })
  } catch (error) {
    const status = Number(error.status) || 503
    if (!error.code || status >= 500)
      console.error('[wuzai/activities]', error.code || error.name)
    return res.status(status).json({
      error: error.code || 'unavailable',
      message: error.status ? error.message : '活动服务暂时不可用，请稍后重试。'
    })
  }
}
