import { sha256 } from 'js-sha256'
import { siteConfig } from '@/lib/config'
import { getDataFromCache, setDataToCache } from '@/lib/cache/cache_manager'
import { isProtectedPost } from '@/lib/security/articleAccess'
import { isExistencePublication } from '@/lib/security/existenceCrawl'

const pending = new Map()
const REQUEST_TIMEOUT = 20000

/** This module is loaded only during server-side article generation. */
export async function getAiSummary(api, key, content) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)
  try {
    const response = await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: key, content }),
      signal: controller.signal
    })
    if (!response.ok) return null
    const data = await response.json()
    return typeof data?.summary === 'string' && data.summary.trim()
      ? data.summary.trim()
      : null
  } catch {
    // Never log credentials, submitted article text, or provider responses.
    console.warn(
      '[AI summary] Service unavailable; keeping the original article.'
    )
    return null
  } finally {
    clearTimeout(timeout)
  }
}

/** Keep the configured character budget, sampling across long articles. */
export function buildSummaryInput(post, text, limit) {
  const title = String(post.title || '').slice(0, Math.floor(limit / 5))
  const headings = (post.toc || [])
    .map(item => item.text)
    .filter(Boolean)
    .join(' / ')
  const introduction = [title, headings.slice(0, Math.floor(limit / 5))]
    .filter(Boolean)
    .join('\n')
  const budget = Math.max(0, limit - introduction.length - 2)
  const body = String(text || '').trim()
  if (body.length <= budget) return `${introduction}\n\n${body}`.trim()

  const separator = '\n[…]\n'
  const chunkSize = Math.max(1, Math.floor((budget - separator.length * 4) / 5))
  const excerpts = Array.from({ length: 5 }, (_, index) => {
    const offset = Math.floor(((body.length - chunkSize) * index) / 4)
    return body.slice(offset, offset + chunkSize)
  })
  return `${introduction}\n\n${excerpts.join(separator)}`.slice(0, limit)
}

export async function getPageAISummary(
  post,
  pageContentText,
  notionConfig = {}
) {
  if (
    post?.type !== 'Post' ||
    post.status !== 'Published' ||
    isProtectedPost(post) ||
    isExistencePublication(post)
  )
    return
  delete post.aiSummary
  const api = siteConfig('AI_SUMMARY_API', '', notionConfig)
  // Credentials stay in server environment variables, never public Notion props.
  const key = process.env.AI_SUMMARY_KEY
  if (!api || !key || !String(pageContentText || '').trim()) return
  const configuredLimit = Number(
    siteConfig('AI_SUMMARY_WORD_LIMIT', 1000, notionConfig)
  )
  const limit =
    Number.isFinite(configuredLimit) && configuredLimit >= 100
      ? Math.floor(configuredLimit)
      : 1000
  const configuredTTL = Number(
    siteConfig('AI_SUMMARY_CACHE_TIME', 1800, notionConfig)
  )
  const ttl =
    Number.isFinite(configuredTTL) && configuredTTL > 0 ? configuredTTL : 1800
  const content = buildSummaryInput(post, pageContentText, limit)
  // Edits beyond the excerpts must invalidate the cache too.
  const digest = sha256(
    JSON.stringify([api, limit, post.title, post.toc, pageContentText])
  )
  const cacheKey = `ai_summary_v2_${post.id}_${digest}`

  const generate = async () => {
    try {
      const cached = await getDataFromCache(cacheKey)
      if (typeof cached === 'string' && cached.trim()) return cached
    } catch {
      /* Cache failures must not prevent article generation. */
    }
    const summary = await getAiSummary(api, key, content)
    if (summary) {
      try {
        await setDataToCache(cacheKey, summary, ttl)
      } catch {
        /* Keep the summary. */
      }
    }
    return summary
  }

  let task = pending.get(cacheKey)
  if (!task) {
    task = generate().finally(() => pending.delete(cacheKey))
    pending.set(cacheKey, task)
  }
  const summary = await task
  if (summary) post.aiSummary = summary
}
