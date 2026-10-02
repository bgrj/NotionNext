const {
  resolvePageUrl,
  fetchRemoteCounts,
  hasUvCookie,
  uvCookieHeader
} = require('@/lib/analytics/pageviews')

function json(res, status, body) {
  res.setHeader('Cache-Control', 'no-store')
  res.status(status).json(body)
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    json(res, 405, { error: 'method_not_allowed' })
    return
  }

  const requestHost = req.headers['x-forwarded-host'] || req.headers.host
  const rawUrl =
    (req.body && typeof req.body === 'object' && req.body.url) ||
    req.headers.referer
  const pageUrl = resolvePageUrl(rawUrl, requestHost)
  if (!pageUrl) {
    json(res, 400, { error: 'invalid_url' })
    return
  }

  const isNewUv = !hasUvCookie(req.headers.cookie)
  if (isNewUv) {
    res.setHeader('Set-Cookie', uvCookieHeader())
  }

  const counts = await fetchRemoteCounts({ pageUrl, isNewUv })
  if (!counts) {
    json(res, 502, { error: 'counter_unavailable' })
    return
  }
  json(res, 200, counts)
}
