const {
  resolvePageUrl,
  fetchRemoteCounts,
  inspectVisit,
  visitCookieHeaders,
  normalizeCounts
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

  const visit = inspectVisit(req.headers.cookie, pageUrl)
  let counts = null
  if (visit.samePageSession && visit.lastStat) {
    counts = normalizeCounts(visit.lastStat)
  } else {
    counts = await fetchRemoteCounts({
      pageUrl,
      isNewUv: visit.isNewVisitor
    })
    counts = normalizeCounts(counts)
  }

  if (!counts) {
    json(res, 502, { error: 'counter_unavailable' })
    return
  }

  res.setHeader('Set-Cookie', visitCookieHeaders(visit, counts))
  json(res, 200, counts)
}
