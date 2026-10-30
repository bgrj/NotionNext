/** Signals for the public "我的存在" section. Humans can still open it. */

export const EXISTENCE_CATEGORY = '我的存在'

export const EXISTENCE_ROBOTS_TAG =
  'noindex, nofollow, noarchive, nosnippet, noimageindex, noai, noimageai'

const AI_CRAWLER_AGENTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'anthropic-ai',
  'Google-Extended',
  'GoogleOther',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'Amazonbot',
  'meta-externalagent',
  'FacebookBot',
  'PerplexityBot',
  'YouBot',
  'cohere-ai',
  'Diffbot',
  'ImagesiftBot',
  'PetalBot'
]

const AUTOMATED_CLIENT =
  /(?:^|[^a-z0-9])bot(?:[^a-z0-9]|$)|spider|crawler|crawl|slurp|archiver|scrapy|python-requests|python-urllib|aiohttp|httpx|okhttp|go-http-client|curl\/|wget|libwww|java\/|headless|phantom|puppeteer|playwright|selenium|chatgpt|oai-searchbot|claude|anthropic|google-extended|googleother|google-inspectiontool|ccbot|bytespider|amazonbot|meta-externalagent|perplexity|cohere|diffbot|imagesift|omgili|semrush|ahrefs|mj12bot|dotbot|blexbot|dataforseo|baiduspider|yandex|sogou|360spider|duckduckbot|twitterbot|slackbot|discordbot|telegrambot|whatsapp|linkedinbot|embedly|quora|redditbot|ia_archiver|httrack|nikto|sqlmap|colly|node-fetch|undici|axios\/|libcurl|httpclient|fasthttp|mechanize|feedfetcher|mediapartners|adsbot|storebot|screaming frog|petalbot|gptbot/i

export function requestPathname(input) {
  const raw = String(input || '').split('?')[0].split('#')[0]
  let path = raw
  try {
    path = decodeURIComponent(raw)
  } catch (error) {
    path = raw
  }
  if (!path.startsWith('/')) path = `/${path}`
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  return path.replace(/\.html$/i, '')
}

export function isExistenceContentPath(input) {
  const path = requestPathname(input)
  const lower = path.toLowerCase()
  if (lower === '/diaries' || lower.startsWith('/diaries/')) return true
  return (
    path === `/category/${EXISTENCE_CATEGORY}` ||
    path.startsWith(`/category/${EXISTENCE_CATEGORY}/`)
  )
}

export function isExistencePublication(post) {
  if (!post || typeof post !== 'object') return false
  const category = post.category
  if (category === EXISTENCE_CATEGORY) return true
  if (Array.isArray(category) && category.includes(EXISTENCE_CATEGORY)) {
    return true
  }
  const slug = String(post.slug || '')
    .trim()
    .replace(/^\/+/, '')
    .replace(/\.html$/i, '')
  if (slug === 'diaries' || slug.toLowerCase().startsWith('diaries/')) {
    return true
  }
  const href = requestPathname(post.href || '')
  return href === '/diaries' || href.toLowerCase().startsWith('/diaries/')
}

export function isAutomatedClient(userAgent) {
  const ua = String(userAgent || '').trim()
  if (!ua) return true
  return AUTOMATED_CLIENT.test(ua)
}

export function tokensMatch(provided, expected) {
  const received = String(provided || '')
  const secret = String(expected || '')
  if (!received || !secret) return false
  const length = Math.max(received.length, secret.length)
  let diff = received.length === secret.length ? 0 : 1
  for (let i = 0; i < length; i++) {
    diff |= (received.charCodeAt(i) || 0) ^ (secret.charCodeAt(i) || 0)
  }
  return diff === 0
}

export function readOwnerCredential(headers) {
  if (!headers) return ''
  const get =
    typeof headers.get === 'function'
      ? name => headers.get(name)
      : name => headers[name]
  const direct = String(get('x-existence-owner') || '').trim()
  if (direct) return direct
  const cookie = String(get('cookie') || '')
  const match = cookie.match(/(?:^|;\s*)existence_owner=([^;]*)/)
  if (!match) return ''
  try {
    return decodeURIComponent(match[1]).trim()
  } catch (error) {
    return match[1].trim()
  }
}

export function shouldRefuseExistenceCrawl({
  pathname,
  userAgent,
  ownerCredential,
  expectedToken
}) {
  if (!isExistenceContentPath(pathname)) return false
  if (tokensMatch(ownerCredential, expectedToken)) return false
  return isAutomatedClient(userAgent)
}

export function selectPublicFeedPosts(posts, limit = 20) {
  return (Array.isArray(posts) ? posts : [])
    .filter(post => {
      if (!post || isExistencePublication(post)) return false
      if (post.type && post.type !== 'Post') return false
      if (post.status && post.status !== 'Published') return false
      return true
    })
    .sort((a, b) => {
      const dateA = new Date(a.lastEditedDate || a.publishDay || a.publishDate || 0)
      const dateB = new Date(b.lastEditedDate || b.publishDay || b.publishDate || 0)
      return dateB - dateA
    })
    .slice(0, limit)
}

export function buildRobotsTxt(link) {
  const origin = String(link || '').replace(/\/$/, '')
  const hidden = ['Disallow: /diaries', `Disallow: /category/${EXISTENCE_CATEGORY}`]
  const aiBlocks = AI_CRAWLER_AGENTS.map(
    agent => `User-agent: ${agent}\n${hidden.join('\n')}`
  ).join('\n\n')
  return `User-agent: *
Allow: /
${hidden.join('\n')}

${aiBlocks}

# Host
Host: ${origin}

# Sitemaps
Sitemap: ${origin}/sitemap.xml
`
}
