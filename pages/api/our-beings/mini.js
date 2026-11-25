import { activityRedis } from '@/lib/activities/redisStore'
import { createActivityService } from '@/lib/activities/service'
import { limitActivityRequest } from '@/lib/activities/identity'
import { activityPresence } from '@/lib/activities/presence'
import { activityWritings } from '@/lib/activities/writings'
import { searchPlaces } from '@/lib/activities/places'
import {
  loginMini,
  resolveMiniActor,
  updateMiniProfile,
  publicMiniUser
} from '@/lib/activities/miniIdentity'
import {
  moderateMini,
  reviewDescription
} from '@/lib/activities/miniModeration'
import {
  beginCompliance,
  acceptCompliance,
  requireCompliance
} from '@/lib/activities/miniCompliance'
import {
  miniActivityStore,
  claimUpload,
  releaseUpload,
  uploadKey,
  decorateMiniResult
} from '@/lib/activities/miniStore'
import { fail, requireActor } from '@/apps/wuzai/miniprogram/common/activities'
import { saveMiniCover, requireMiniCover } from '@/lib/activities/miniCovers'

export const config = { api: { bodyParser: { sizeLimit: '4500kb' } } }
const PUBLIC = ['list', 'get', 'locations', 'presenceStats', 'publicWritings']
const ACTIONS = [
  ...PUBLIC,
  'login',
  'profile',
  'updateProfile',
  'mine',
  'create',
  'edit',
  'publish',
  'reserve',
  'cancelReservation',
  'cancelEvent',
  'announce',
  'presence',
  'writings',
  'saveWriting',
  'checkUpload',
  'uploadCover',
  'reviewDescription',
  'beginCompliance',
  'acceptCompliance'
]
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  let ticket, redis
  try {
    if (!['POST', 'GET'].includes(req.method)) {
      res.setHeader('Allow', 'GET, POST')
      fail('method_not_allowed', '不支持的请求方式。', 405)
    }
    const action = req.method === 'GET' ? req.query?.action : req.body?.action
    if (action === 'capabilities' && req.method === 'GET')
      return res.status(200).json({
        version: 1,
        transport: 'https',
        cloudbaseRequired: false,
        wechatConfigured: !!(
          process.env.WUZAI_MINI_APP_ID && process.env.WUZAI_MINI_APP_SECRET
        )
      })
    if (
      !ACTIONS.includes(action) ||
      (req.method === 'GET' && !PUBLIC.includes(action))
    )
      fail('invalid_action', '不支持的操作。')
    if (req.headers.origin) {
      let host
      try {
        host = new URL(req.headers.origin).host
      } catch {
        fail('invalid_origin', '请求来源不正确。', 403)
      }
      if (host !== req.headers.host)
        fail('invalid_origin', '请求来源不正确。', 403)
    }
    const input =
      req.method === 'GET'
        ? { ...req.query }
        : req.body?.input &&
            typeof req.body.input === 'object' &&
            !Array.isArray(req.body.input)
          ? { ...req.body.input }
          : {}
    delete input.action
    redis = activityRedis()
    const actor = await resolveMiniActor(redis, req.headers.authorization)
    await limitActivityRequest(redis, actor, req)
    if (action === 'login')
      return res
        .status(200)
        .json({ version: 1, ...(await loginMini(redis, input.code)) })
    if (!PUBLIC.includes(action)) requireActor(actor)
    if (action === 'beginCompliance')
      return res
        .status(200)
        .json({ version: 1, compliance: await beginCompliance(redis, actor) })
    if (action === 'acceptCompliance')
      return res
        .status(200)
        .json({
          version: 1,
          compliance: await acceptCompliance(redis, actor, input.token)
        })
    if (action === 'reviewDescription')
      return res
        .status(200)
        .json({
          version: 1,
          review: await reviewDescription(redis, actor, input.description)
        })
    if (['create', 'edit', 'publish'].includes(action)) {
      const consent = await requireCompliance(
        redis,
        actor,
        input.complianceToken
      )
      input.complianceVersion = consent.version
      input.complianceAcceptedAt = new Date(consent.acceptedAt).toISOString()
    }
    if (action === 'uploadCover')
      return res.status(200).json({
        version: 1,
        cover: await saveMiniCover(redis, actor, input.image)
      })
    if (['create', 'edit'].includes(action)) {
      input.gatheringVersion = 2
      await requireMiniCover(redis, input.cover)
    }
    if (action === 'profile')
      return res
        .status(200)
        .json({ version: 1, user: publicMiniUser(actor.user) })
    if (
      ['create', 'edit', 'announce', 'saveWriting', 'updateProfile'].includes(
        action
      )
    )
      await moderateMini(redis, actor, input)
    if (action === 'updateProfile')
      return res.status(200).json({
        version: 1,
        user: await updateMiniProfile(redis, actor, input)
      })
    if (action === 'checkUpload') {
      const data = JSON.parse(
        (await redis.get(uploadKey(actor, input.clientRequestId))) || 'null'
      )
      return res.status(200).json({
        version: 1,
        upload: data
          ? { state: data.state, eventId: data.eventId || '' }
          : { state: 'not_found' }
      })
    }
    if (action === 'create') {
      const key = uploadKey(actor, input.clientRequestId),
        claimed = await claimUpload(redis, key)
      if (!claimed.fresh) {
        if (claimed.state !== 'complete')
          fail(
            'upload_uncertain',
            '上次上传结果待核对，请先查看「我发起的」。',
            409
          )
        input.id = claimed.eventId
        const service = createActivityService(
          miniActivityStore(redis, 'get', {}, actor)
        )
        return res.status(200).json({
          version: 1,
          ...(await decorateMiniResult(
            redis,
            await service('get', input, actor)
          ))
        })
      }
      ticket = { key, pending: claimed.pending }
    }
    const service = createActivityService(
      miniActivityStore(redis, action, input, actor, ticket)
    )
    let result
    if (action === 'locations') result = await searchPlaces(redis, input)
    else if (['writings', 'publicWritings', 'saveWriting'].includes(action))
      result = await activityWritings(redis, action, input, actor)
    else if (['presence', 'presenceStats'].includes(action))
      result = await activityPresence(redis, action, input, actor, service)
    else result = await service(action, input, actor)
    // A successful mutation must retain its event ID even if decoration fails.
    try {
      result = await decorateMiniResult(redis, result)
    } catch {
      result.detailsUnavailable = true
    }
    return res.status(200).json({ version: 1, ...result })
  } catch (error) {
    if (ticket && redis) {
      try {
        await releaseUpload(redis, ticket.key, ticket.pending)
      } catch {
        console.error('[mini] upload recovery unavailable')
      }
    }
    const status = Number(error.status) || 503
    if (status >= 500) console.error('[wuzai/mini]', error.code || error.name)
    return res.status(status).json({
      error: error.code || 'unavailable',
      message: error.status
        ? error.message
        : '活动服务暂时不可用，请稍后重试。',
      ...(error.code === 'content_review' && Array.isArray(error.issues)
        ? { issues: error.issues }
        : {})
    })
  }
}
