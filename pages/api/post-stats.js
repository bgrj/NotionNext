import crypto from 'crypto'
import { getPostStats, isPostStatsEnabled, trackPostView } from '@/lib/db/post-stats'

const getHeaderValue = (headerValue = '') => {
  if (Array.isArray(headerValue)) {
    return headerValue[0] || ''
  }

  return headerValue || ''
}

const getVisitorId = req => {
  const forwardedFor = getHeaderValue(req.headers['x-forwarded-for'])
  const realIp = getHeaderValue(req.headers['x-real-ip'])
  const ip = forwardedFor.split(',')[0]?.trim() || realIp || req.socket?.remoteAddress || 'unknown'
  const userAgent = getHeaderValue(req.headers['user-agent'])
  const acceptLanguage = getHeaderValue(req.headers['accept-language'])

  return crypto
    .createHash('sha256')
    .update(`${ip}|${userAgent}|${acceptLanguage}`)
    .digest('hex')
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' })
  }

  if (!isPostStatsEnabled) {
    return res.status(200).json({
      status: 'disabled',
      enabled: false,
      views: 0,
      visitors: 0
    })
  }

  const postId = typeof req.query.postId === 'string' ? req.query.postId : ''
  if (!postId) {
    return res.status(400).json({ status: 'error', message: 'postId is required' })
  }

  const shouldIncrement = req.query.increment === '1' || req.query.increment === 'true'

  try {
    const stats = shouldIncrement
      ? await trackPostView(postId, getVisitorId(req))
      : await getPostStats(postId)

    return res.status(200).json({
      status: 'success',
      enabled: true,
      ...stats
    })
  } catch (error) {
    console.error('post stats failed', error)
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch post stats',
      enabled: false,
      views: 0,
      visitors: 0
    })
  }
}