const KEYS = ['site_pv', 'page_pv', 'site_uv']
const STORAGE_KEY = 'ob_pageviews_last'

let inflight = null
let lastHref = ''

function each(className, fn) {
  if (typeof document === 'undefined') return
  const nodes = document.getElementsByClassName(className)
  for (const node of nodes) fn(node)
}

function formatCount(value) {
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) return '–'
  return String(Math.trunc(n))
}

function applyCounts(counts) {
  if (!counts) return
  KEYS.forEach(key => {
    const text = formatCount(counts[key])
    each('busuanzi_value_' + key, node => {
      node.textContent = text
    })
    each('busuanzi_container_' + key, node => {
      node.classList.remove('hidden')
      if (node.style.display === 'none') node.style.display = ''
    })
  })
}

function readCache() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeCache(counts) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(counts))
  } catch {}
}

async function requestCounts() {
  const href = window.location.href
  const response = await fetch('/api/analytics/pageviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ url: href })
  })
  if (!response.ok) throw new Error('pageviews ' + response.status)
  return response.json()
}

const fetchCounts = () => {
  if (typeof window === 'undefined') return Promise.resolve(null)
  const href = window.location.href
  if (inflight && lastHref === href) return inflight
  lastHref = href
  const cached = readCache()
  if (cached) applyCounts(cached)
  inflight = requestCounts()
    .then(counts => {
      if (counts && typeof counts === 'object') {
        applyCounts(counts)
        writeCache(counts)
      }
      return counts
    })
    .catch(() => cached || null)
    .finally(() => {
      inflight = null
    })
  return inflight
}

module.exports = {
  fetch: fetchCounts
}
