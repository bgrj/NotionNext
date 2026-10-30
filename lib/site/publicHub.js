import { isProtectedPost } from '@/lib/security/articleAccess'
import { encodePostPath, resolvePostSlugBase } from '@/lib/utils/postTitleUrl'

export const PUBLIC_HUB_LIMIT = 24

const domains = [
  { category: '道', id: 'dao', label: '道' },
  { category: '术', id: 'shu', label: '术' },
  { category: '我的存在', id: 'existence', label: '生命记录' },
  { category: '我们的存在', id: 'existence', label: '生命记录' }
]

const text = (value, length) =>
  typeof value === 'string' ? value.trim().slice(0, length) : ''

const publishedAt = page => {
  const value = Number(page.publishDate)
  return Number.isFinite(value) ? value : 0
}

// Reuse the public catalogue, then return only fields this view can display.
// Clerk private metadata, Notion blocks and registration details are not inputs.
export function buildPublicHub(allPages) {
  const seen = new Set()
  const posts = []
  const events = []
  const pages = Array.isArray(allPages) ? allPages : []
  const withheld = new Set(
    pages
      .filter(
        page => page && (page.status !== 'Published' || isProtectedPost(page))
      )
      .map(page => text(page.id, 100))
  )

  for (const page of [...pages].sort(
    (a, b) => publishedAt(b || {}) - publishedAt(a || {})
  )) {
    const id = text(page?.id, 100)
    if (!id || seen.has(id) || withheld.has(id)) continue
    seen.add(id)
    if (!page || page.status !== 'Published' || isProtectedPost(page)) continue
    if (page.type !== 'Post' && page.type !== 'Event') continue
    const rawSlug = page.slugBase || page.slug || page.href
    if (
      typeof rawSlug !== 'string' ||
      /^[a-z][a-z\d+.-]*:|^\/\//i.test(rawSlug.trim())
    )
      continue
    const slug = resolvePostSlugBase(page)
    if (!slug) continue

    const categories = Array.isArray(page.category)
      ? page.category
      : [page.category]
    const domain = domains.find(item => categories.includes(item.category))
    if (page.type === 'Post' && !domain) continue

    const item = {
      id,
      title: text(page.title, 160) || '未题',
      href: encodePostPath(slug),
      summary: text(page.summary, 180),
      date:
        typeof page.publishDay === 'string' &&
        /^\d{4}-\d{2}-\d{2}$/.test(page.publishDay)
          ? page.publishDay
          : '',
      domain: page.type === 'Event' ? 'event' : domain.id,
      label: page.type === 'Event' ? '活动介绍' : domain.label
    }
    if (page.type === 'Event') events.push(item)
    else posts.push(item)
  }

  return {
    posts: posts.slice(0, PUBLIC_HUB_LIMIT),
    events: events.slice(0, PUBLIC_HUB_LIMIT),
    postsTotal: posts.length,
    eventsTotal: events.length
  }
}
