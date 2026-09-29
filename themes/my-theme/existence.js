export const EXISTENCE_CATEGORY = '我的存在'

export const isExistenceCategory = category =>
  String(category || '') === EXISTENCE_CATEGORY

/** Next ISR only accepts a number. Notion/env values often arrive as strings. */
export const existenceRevalidateSeconds = raw => {
  const n = Number(raw)
  if (!Number.isFinite(n) || n <= 0) return 60
  return Math.min(60, Math.max(30, Math.floor(n)))
}

export const EXISTENCE_DEFAULTS = {
  birth: '2001-10-19',
  years: 80,
  firstWritten: '2025-03-24',
  awakening: '2025-03-28',
  newYears: 50,
  newEnd: '2075-03-27',
  motto:
    '我的思想也许不在于我想了什么，而在于我做了什么。人有很多面，而我才见了几面？',
  stamp: '2026年9月28日22时更新'
}

export const EXISTENCE_MERGED_SPANS = [
  {
    start: '2025-04-24',
    end: '2025-04-27',
    note: '这几天实际是多天融于的一篇',
    fallback: {
      id: 'existence-r32',
      title: '2025.4.24–27 周四至周日',
      href: '/diaries/2025/04/24/r32',
      date: '2025-04-24'
    }
  }
]

export const LIFE_MARKERS = [
  { iso: '2001-10-19', label: '生命的起点' },
  { iso: '2025-03-28', label: '（新）生命的终（起）点' },
  { iso: '2075-03-27', label: '（预计）新生命的终点' }
]

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

export const eachIsoInclusive = (fromIso, toIso) => {
  const out = []
  if (!fromIso) return out
  const stop = toIso && toIso > fromIso ? toIso : fromIso
  let cur = fromIso
  while (cur <= stop) {
    out.push(cur)
    cur = shiftIso(cur, 1)
    if (out.length > 400) break
  }
  return out
}

export const parseDateSpan = value => {
  if (!value) return { start: '', end: '' }
  if (typeof value === 'object') {
    const start = isoDay(
      value.start_date || value.startDate || value.start || value
    )
    const end = isoDay(value.end_date || value.endDate || value.end)
    return { start, end: end && end > start ? end : start }
  }
  const text = String(value)
  const start = isoDay(text)
  const range = text.match(
    /(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})\s*[–—~至到\-]+\s*(?:(\d{4})[-/.])?(\d{1,2})(?:[-/.](\d{1,2}))?/
  )
  if (!range || !start) return { start, end: start }
  const m1 = Number(range[2])
  const y2 = range[4] ? Number(range[4]) : Number(range[1])
  let m2 = Number(range[5])
  let d2 = range[6] ? Number(range[6]) : NaN
  if (!range[6] && !range[4]) {
    d2 = m2
    m2 = m1
  }
  if (!Number.isFinite(m2) || !Number.isFinite(d2)) return { start, end: start }
  const end = `${y2}-${String(m2).padStart(2, '0')}-${String(d2).padStart(2, '0')}`
  if (end < start) return { start, end: start }
  return { start, end }
}

export const hoursUntil = endIso => {
  const t = Date.parse(`${endIso}T00:00:00+08:00`)
  if (Number.isNaN(t)) return 0
  return Math.max(0, Math.ceil((t - Date.now()) / 3600000))
}

/** New-life clock: startIso 00:00 → endIso 23:59:59, Asia/Shanghai. */
export const newLifeStats = (startIso, endIso, now = Date.now()) => {
  const start = Date.parse(`${startIso}T00:00:00+08:00`)
  const end = Date.parse(`${endIso}T23:59:59+08:00`)
  const remainMs = Number.isNaN(end) ? 0 : Math.max(0, end - now)
  const elapsedMs = Number.isNaN(start)
    ? 0
    : Math.max(0, Math.min(now, Number.isNaN(end) ? now : end) - start)
  const totalMs =
    Number.isNaN(start) || Number.isNaN(end) ? 0 : Math.max(0, end - start)
  const totalSec = Math.floor(remainMs / 1000)
  let todayIso = ''
  try {
    todayIso = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(now))
  } catch (e) {
    todayIso = new Date(now).toISOString().slice(0, 10)
  }
  const { y, m, d } = parseIso(todayIso)
  return {
    todayIso,
    todayZh: `${y}年${m}月${d}日`,
    elapsedDays:
      now < start
        ? 0
        : Math.min(
            Math.max(1, Math.round(totalMs / 86400000)),
            Math.floor(elapsedMs / 86400000) + 1
          ),
    totalDays: Math.max(1, Math.round(totalMs / 86400000)),
    remainHours: Math.floor(remainMs / 3600000),
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60
  }
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

export const formatZhDate = iso => {
  const { y, m, d } = parseIso(iso)
  return `${y}年${m}月${d}日`
}

const spanNoteOf = (start, end) => {
  if (!start || !end || end <= start) return ''
  const known = EXISTENCE_MERGED_SPANS.find(
    span => start <= span.end && end >= span.start
  )
  return known?.note || '这几天实际是多天融于的一篇'
}

export const slimExistencePosts = posts => {
  const slim = (posts || [])
    .map(post => {
      const fromDate = parseDateSpan(post.date || post.publishDay)
      const fromTitle = parseDateSpan(post.title)
      const start = fromDate.start || fromTitle.start || isoDay(post.date)
      const known = EXISTENCE_MERGED_SPANS.find(
        span => start && start >= span.start && start <= span.end
      )
      const end =
        known?.end ||
        (fromDate.end && fromDate.end > start ? fromDate.end : '') ||
        (fromTitle.end && fromTitle.end > start ? fromTitle.end : '') ||
        start
      return {
        id: post.id,
        title: post.title,
        href: post.href,
        date: start,
        spanStart: known?.start || start,
        spanEnd: end && end > start ? end : '',
        note: spanNoteOf(start, end)
      }
    })
    .filter(post => post.href && post.date)

  EXISTENCE_MERGED_SPANS.forEach(span => {
    const covered = slim.some(
      post => post.date >= span.start && post.date <= span.end
    )
    if (covered || !span.fallback?.href) return
    slim.push({
      ...span.fallback,
      spanStart: span.start,
      spanEnd: span.end,
      note: span.note
    })
  })
  return slim
}

export const postMapFrom = posts => {
  const map = Object.create(null)
  const put = (post, iso, extra = {}) => {
    map[iso] = { ...post, date: iso, ...extra }
  }
  slimExistencePosts(posts).forEach(post => {
    const last = post.spanEnd || post.date
    eachIsoInclusive(post.date, last).forEach(iso => put(post, iso))
  })
  EXISTENCE_MERGED_SPANS.forEach(span => {
    const source = map[span.start]
    if (!source) return
    eachIsoInclusive(span.start, span.end).forEach(iso =>
      put(source, iso, {
        spanStart: span.start,
        spanEnd: span.end,
        note: span.note
      })
    )
  })
  return map
}

export const parseSearchQuery = q => {
  const text = String(q || '').trim()
  if (!text) return { date: '', text: '' }
  const m = text.match(/(\d{4})[-/.年\s]+(\d{1,2})[-/.月\s]+(\d{1,2})/)
  if (m) {
    return {
      date: `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`,
      text
    }
  }
  return { date: '', text }
}

export const weekdaySun0 = iso => {
  const { y, m, d } = parseIso(iso)
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay()
}

export const dimOfMonth = (year, month) => {
  const dim = [31, isLeap(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  return dim[month - 1]
}
