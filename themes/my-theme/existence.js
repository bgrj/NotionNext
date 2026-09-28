export const EXISTENCE_CATEGORY = '我的存在'

export const isExistenceCategory = category =>
  String(category || '') === EXISTENCE_CATEGORY

export const EXISTENCE_DEFAULTS = {
  birth: '2001-10-19',
  years: 80,
  awakening: '2025-03-24',
  motto:
    '我的思想也许不在于我想了什么，而在于我做了什么。人有很多面，而我才见了几面？',
  stamp: '2026年9月28日22时更新'
}

export const isoDay = value => {
  if (!value) return ''
  if (typeof value === 'string') {
    const m = value.match(/(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/)
    if (!m) return value.slice(0, 10)
    return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`
  }
  if (typeof value === 'object') {
    return isoDay(value.start_date || value.startDate || value.start)
  }
  return ''
}

export const shanghaiToday = () => {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date())
  } catch (e) {
    return new Date().toISOString().slice(0, 10)
  }
}

export const addYearsIso = (iso, years) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${y + years}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

export const isLeap = year =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

export const ordinalInYear = (year, month, day) => {
  const cum = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  let n = cum[month - 1] + day
  if (month > 2 && isLeap(year)) n += 1
  return n
}

export const parseIso = iso => {
  const [y, m, d] = iso.split('-').map(Number)
  return { y, m, d }
}

export const shiftIso = (iso, days) => {
  const t = Date.parse(`${iso}T12:00:00Z`) + days * 86400000
  return new Date(t).toISOString().slice(0, 10)
}

export const daysBetween = (fromIso, toIsoInclusive) => {
  const a = Date.parse(`${fromIso}T12:00:00Z`)
  const b = Date.parse(`${toIsoInclusive}T12:00:00Z`)
  if (Number.isNaN(a) || Number.isNaN(b) || b < a) return 0
  return Math.round((b - a) / 86400000) + 1
}

export const formatDotDate = iso => {
  const { y, m, d } = parseIso(iso)
  return `${y}.${m}.${d}`
}

export const slimExistencePosts = posts =>
  (posts || [])
    .map(post => ({
      id: post.id,
      title: post.title,
      href: post.href,
      date: isoDay(post.date) || isoDay(post.publishDay)
    }))
    .filter(post => post.href && post.date)

export const postMapFrom = posts => {
  const map = Object.create(null)
  slimExistencePosts(posts).forEach(post => {
    if (!map[post.date]) map[post.date] = post
  })
  return map
}

export const mottoLines = motto => {
  const text = String(motto || '').trim()
  if (!text) return []
  const parts = text.split(/(?<=。|？|！)/).map(s => s.trim()).filter(Boolean)
  return parts.length ? parts : [text]
}
