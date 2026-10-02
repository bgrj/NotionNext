import { isExport } from '@/lib/utils/buildMode'
import {
  getPostBlocks,
  hydrateAuthorizedPost,
  loadArticleAccessRecord
} from '@/lib/db/SiteDataApi'
import { isProtectedPost } from '@/lib/security/articleAccess'
import {
  getArticleAuthSecret,
  sessionAllowsArticle
} from '@/lib/security/articleSession'

function fail(res, status) {
  res.setHeader('Cache-Control', 'private, no-store')
  return res.status(status).json({ ok: false })
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return fail(res, 405)
  }
  if (isExport() || process.env.EXPORT === 'true') return fail(res, 503)
  if (!getArticleAuthSecret()) return fail(res, 503)

  const slug = typeof req.query?.slug === 'string' ? req.query.slug.trim() : ''
  if (!slug || slug.length > 200) return fail(res, 401)

  try {
    const record = await loadArticleAccessRecord(slug)
    if (!record || !isProtectedPost(record)) return fail(res, 401)
    if (!sessionAllowsArticle(req, record)) return fail(res, 401)
    const rawBlockMap = await getPostBlocks(record.id, 'protected-content', {
      cacheVersion: record.lastEditedDate
    })
    if (!rawBlockMap) return fail(res, 503)
    const post = hydrateAuthorizedPost(record, rawBlockMap)
    return res.status(200).json({ ok: true, post })
  } catch {
    return fail(res, 503)
  }
}
