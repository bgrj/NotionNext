import { activityRedis } from '@/lib/activities/redisStore'
import { coverKey } from '@/lib/activities/miniCovers'

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD')
    return res.status(405).end()
  }
  const id = req.query?.id
  if (typeof id !== 'string' || !/^[a-f0-9]{64}$/.test(id))
    return res.status(404).end()
  try {
    const image = await activityRedis().get(coverKey(id))
    if (!image) return res.status(404).end()
    const bytes = Buffer.from(image, 'base64')
    res.setHeader('Content-Type', 'image/jpeg')
    res.setHeader('Content-Length', bytes.length)
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    return req.method === 'HEAD'
      ? res.status(200).end()
      : res.status(200).send(bytes)
  } catch {
    return res.status(503).end()
  }
}
