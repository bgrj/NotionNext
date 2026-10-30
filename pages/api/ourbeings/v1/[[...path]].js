import { randomUUID } from 'crypto'
import {
  communityBlobStore,
  communityStorageEnabled
} from '@/lib/beings/community/blobStore'
import {
  CommunityError,
  executeCommunity,
  queryCommunity
} from '@/lib/beings/community/model'
import {
  requestCommunityActor,
  sameOriginMutation
} from '@/lib/beings/community/server'

export const config = { api: { bodyParser: { sizeLimit: '512kb' } } }
const publicQueries = new Set([
  'feed',
  'reading',
  'events',
  'event',
  'exchanges',
  'exchange',
  'profile'
])

export function createCommunityHandler({
  storeFactory = communityBlobStore,
  enabled = communityStorageEnabled,
  actorOf = requestCommunityActor,
  now = () => Date.now(),
  id = randomUUID
} = {}) {
  return async function handler(req, res) {
    const requestId = id()
    res.setHeader('Cache-Control', 'private, no-store, max-age=0')
    res.setHeader('Vary', 'Cookie, Authorization')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-Robots-Tag', 'noindex, nofollow')
    const path = Array.isArray(req.query?.path) ? req.query.path : []
    if (!['GET', 'POST'].includes(req.method)) {
      res.setHeader('Allow', 'GET, POST')
      return res.status(405).json({
        error: {
          code: 'method_not_allowed',
          message: '不支持这个请求方式。'
        },
        requestId
      })
    }
    try {
      if (req.method === 'GET' && path[0] === 'status') {
        const actor = await actorOf(req)
        return res.status(200).json({
          schema: 'ourbeings.api.v1',
          storage: enabled(),
          authentication: Boolean(
            process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
          ),
          moderator: actor?.moderator === true,
          mediaUploads: false,
          payments: false,
          requestId
        })
      }
      if (req.method === 'POST' && !sameOriginMutation(req))
        throw new CommunityError('cross_origin', '请从本站页面提交。', 403)
      if (req.method === 'POST') {
        const actor = await actorOf(req)
        if (!actor) throw new CommunityError('unauthorized', '请先登录。', 401)
        if (path.length !== 1 || path[0] !== 'commands')
          throw new CommunityError('not_found', '没有这个操作入口。', 404)
        if (
          !req.body ||
          typeof req.body !== 'object' ||
          Array.isArray(req.body) ||
          typeof req.body.type !== 'string' ||
          !req.body.input ||
          typeof req.body.input !== 'object' ||
          Array.isArray(req.body.input)
        )
          throw new CommunityError('invalid_input', '请检查提交的内容。')
        const result = await executeCommunity(
          storeFactory(),
          actor,
          { type: req.body.type, input: req.body.input },
          { now: now(), id }
        )
        return res.status(200).json({ data: result, requestId })
      }
      if (!path[0] || path.length > 2)
        throw new CommunityError('not_found', '没有这个查询入口。', 404)
      const query = {
        ...req.query,
        type: path[0],
        ...(path[1] ? { id: path[1] } : {})
      }
      const actor = await actorOf(req)
      if (!publicQueries.has(query.type) && !actor)
        throw new CommunityError('unauthorized', '请先登录。', 401)
      if (!enabled() && ['feed', 'events', 'exchanges'].includes(query.type))
        return res.status(200).json({
          data: { items: [], total: 0, nextOffset: null, unavailable: true },
          requestId
        })
      const snapshot = await storeFactory().read()
      const data = queryCommunity(snapshot.state, actor, query, now())
      if (query.type === 'export')
        res.setHeader(
          'Content-Disposition',
          'attachment; filename="ourbeings-export.json"'
        )
      return res.status(200).json({ data, requestId })
    } catch (error) {
      const known = error instanceof CommunityError
      // Do not log SDK payloads or bodies: they can contain private writing.
      return res.status(known ? error.status : 503).json({
        error: {
          code: known ? error.code : 'service_unavailable',
          message: known
            ? error.message
            : '服务暂时无法完成请求。你的输入仍保留，请稍后再试。'
        },
        requestId
      })
    }
  }
}

export default createCommunityHandler()
