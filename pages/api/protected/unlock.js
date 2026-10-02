import { isExport } from '@/lib/utils/buildMode'
import { loadArticleAccessRecord } from '@/lib/db/SiteDataApi'
import { isProtectedPost } from '@/lib/security/articleAccess'
import { verifyArticlePassword } from '@/lib/security/articlePassword'
import { hitRateLimit } from '@/lib/security/articleRateLimit'
import {
  clientRequestKey,
  createArticleSessionCookie,
  getArticleAuthSecret,
  isAllowedRequestOrigin
} from '@/lib/security/articleSession'

const MAX_BODY_BYTES = 2048
const MAX_SLUG = 200
const MAX_PASSWORD = 256

function fail(res, status) {
  res.setHeader('Cache-Control', 'private, no-store')
  return res.status(status).json({ ok: false })
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return fail(res, 405)
  }
  if (isExport() || process.env.EXPORT === 'true') return fail(res, 503)
  if (!getArticleAuthSecret()) return fail(res, 503)
  if (Number(req.headers['content-length'] || 0) > MAX_BODY_BYTES) {
    return fail(res, 413)
  }
  const contentType = String(req.headers['content-type'] || '')
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return fail(res, 415)
  }
  if (!isAllowedRequestOrigin(req)) return fail(res, 403)

  const slug = typeof req.body?.slug === 'string' ? req.body.slug.trim() : ''
  const password =
    typeof req.body?.password === 'string' ? req.body.password : ''
  if (!slug || slug.length > MAX_SLUG || password.length > MAX_PASSWORD) {
    return fail(res, 401)
  }

  const rateKey = `${clientRequestKey(req)}:${slug}`
  if (hitRateLimit(rateKey)) return fail(res, 429)

  try {
    const record = await loadArticleAccessRecord(slug)
    if (
      !record ||
      !isProtectedPost(record) ||
      !verifyArticlePassword(record, password)
    ) {
      return fail(res, 401)
    }
    const cookie = createArticleSessionCookie(record)
    if (!cookie) return fail(res, 503)
    res.setHeader('Set-Cookie', cookie)
    return res.status(200).json({ ok: true })
  } catch {
    return fail(res, 503)
  }
}
