import { EXISTENCE_DEFAULTS, addYearsIso, shiftIso } from './existence'

export const OUR_BEINGS_CATEGORY = '我们的存在'

export const OUR_BEINGS_SEATS = 100

export const OUR_BEINGS_JOIN_PRICE_YUAN = 5

export const DESK_HREF = '/our-beings/me'

export const BEING_ROOMS = [
  { id: 'existence', name: '存在', authorHref: '/category/我的存在' },
  { id: 'dao', name: '道', authorHref: '/category/道' },
  { id: 'shu', name: '术', authorHref: '/category/术' }
]

export const OUR_BEINGS_LOGIN = {
  primary: 'email',
  optional: ['google', 'github', 'apple'],
  notRequired: ['wechat', 'phone']
}

export const AUTHOR_LOGIN_EMAILS = ['hsz@ourbeings.com']

export const isOurBeingsCategory = category =>
  String(category || '') === OUR_BEINGS_CATEGORY

export const decodeSitePath = asPath => {
  const path = String(asPath || '')
    .split('#')[0]
    .split('?')[0]
    .replace(/\/+$/, '')
  try {
    return decodeURIComponent(path)
  } catch (error) {
    return path
  }
}

export const isOurBeingsPath = asPath => {
  const path = decodeSitePath(asPath)
  return (
    path === `/category/${OUR_BEINGS_CATEGORY}` ||
    path.startsWith(`/category/${OUR_BEINGS_CATEGORY}/`) ||
    path === '/our-beings' ||
    path.startsWith('/our-beings/')
  )
}

export const isOurBeingsAuthPath = asPath => {
  const path = decodeSitePath(asPath)
  return (
    path === '/sign-in' ||
    path.startsWith('/sign-in/') ||
    path === '/sign-up' ||
    path.startsWith('/sign-up/')
  )
}

export const beingProfileHref = handle => `/our-beings/${normalizeHandle(handle)}`

export const normalizeHandle = value => {
  const s = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
  try {
    return s.replace(/[^\p{L}\p{N}-]/gu, '').slice(0, 48)
  } catch (error) {
    return s.replace(/[^a-z0-9\u00c0-\u024f-]/gi, '').toLowerCase().slice(0, 48)
  }
}

export const isWorldwideEmail = value => {
  const s = String(value || '').trim()
  if (!s || s.length > 254) return false
  if (/\s/.test(s)) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)
}

export const clerkPublishableKey = () =>
  String(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '').trim()

export const isClerkEnabled = () => Boolean(clerkPublishableKey())

export const inviteCodeFrom = (seat, userId) => {
  const n = Math.max(1, Math.trunc(Number(seat) || 1))
  const raw = String(userId || 'being')
  let h = 2166136261
  for (let i = 0; i < raw.length; i++) {
    h ^= raw.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  const tail = (h >>> 0)
    .toString(36)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, 'A')
    .slice(0, 4)
    .padEnd(4, 'A')
  return `OB${String(n).padStart(3, '0')}-${tail}`
}

export const AUTHOR_BEING = {
  id: 'ourbeing',
  seat: 1,
  handle: 'ourbeing',
  name: 'ourbeing',
  motto: EXISTENCE_DEFAULTS.motto,
  href: `/category/我的存在`,
  deskHref: DESK_HREF,
  public: true,
  isAuthor: true,
  profile: {
    birth: EXISTENCE_DEFAULTS.birth,
    years: EXISTENCE_DEFAULTS.years,
    newYears: EXISTENCE_DEFAULTS.newYears,
    firstWritten: EXISTENCE_DEFAULTS.firstWritten,
    awakening: EXISTENCE_DEFAULTS.awakening,
    newEnd: EXISTENCE_DEFAULTS.newEnd
  }
}

export const createBeingProfile = (
  { birth, years, newYears, firstWritten, awakening, motto } = {},
  { defaults = true } = {}
) => {
  const fallback = defaults ? EXISTENCE_DEFAULTS : {}
  const lifeYears = Number(years) > 0 ? Number(years) : fallback.years || ''
  const targetYears =
    Number(newYears) > 0 ? Number(newYears) : fallback.newYears || ''
  const born = birth || fallback.birth || ''
  const woke = awakening || fallback.awakening || ''
  const written = firstWritten || fallback.firstWritten || ''
  const line = String(motto || '').trim() || (defaults ? fallback.motto : '')
  return {
    birth: born,
    years: lifeYears,
    newYears: targetYears,
    firstWritten: written,
    awakening: woke,
    newEnd:
      woke && Number(targetYears) > 0
        ? shiftIso(addYearsIso(woke, Number(targetYears)), -1)
        : '',
    motto: line || ''
  }
}

export const remainingOurBeingSeats = (taken = 1) =>
  Math.max(0, OUR_BEINGS_SEATS - taken)

export const joinRequiresInviteOrPayment = taken =>
  Number(taken) >= OUR_BEINGS_SEATS

export const listPublicBeings = (extra = []) => {
  const others = (Array.isArray(extra) ? extra : []).filter(
    being => being?.public && being?.id && being.id !== AUTHOR_BEING.id
  )
  return [AUTHOR_BEING, ...others]
}

export const findPublicBeing = (handle, extra = []) => {
  const h = normalizeHandle(handle)
  if (!h) return null
  return (
    listPublicBeings(extra).find(
      being => normalizeHandle(being.handle || being.id) === h
    ) || null
  )
}

export const clerkEmailOf = user => {
  if (!user) return ''
  if (user.primaryEmailAddress?.emailAddress) {
    return String(user.primaryEmailAddress.emailAddress).trim().toLowerCase()
  }
  const list = user.emailAddresses || []
  const primary = list.find(item => item.id === user.primaryEmailAddressId)
  return String((primary || list[0])?.emailAddress || '')
    .trim()
    .toLowerCase()
}

export const isAuthorLoginEmail = email =>
  AUTHOR_LOGIN_EMAILS.includes(String(email || '').trim().toLowerCase())

export const handleFromEmail = email => {
  const local = String(email || '').split('@')[0]
  return normalizeHandle(local) || 'being'
}

export const beingFromClerkUser = user => {
  if (!user) return null
  const email = clerkEmailOf(user)
  const meta = user.publicMetadata || {}
  const inviteCode = String(meta.inviteCode || '').trim()
  if (isAuthorLoginEmail(email) || meta.handle === AUTHOR_BEING.handle) {
    return {
      ...AUTHOR_BEING,
      clerkUserId: user.id,
      inviteCode
    }
  }
  const handle =
    normalizeHandle(meta.handle) || handleFromEmail(email) || 'being'
  const name = String(meta.name || handle).trim() || handle
  const seat = Number(meta.seat)
  return {
    id: user.id,
    seat: Number.isFinite(seat) && seat > 1 ? Math.trunc(seat) : null,
    handle,
    name,
    motto: String(meta.motto || '').trim(),
    href: beingProfileHref(handle),
    deskHref: DESK_HREF,
    inviteCode,
    public: meta.public === true || meta.public === '__YES__',
    isAuthor: false,
    clerkUserId: user.id,
    profile: createBeingProfile(
      {
        birth: meta.birth,
        years: meta.years,
        newYears: meta.newYears,
        firstWritten: meta.firstWritten,
        awakening: meta.awakening,
        motto: meta.motto
      },
      { defaults: false }
    )
  }
}

export const sanitizeWriting = input => {
  const room = String(input?.room || '')
  if (!BEING_ROOMS.some(item => item.id === room)) return null
  const title = String(input?.title || '').trim().slice(0, 80)
  const body = String(input?.body || '').trim().slice(0, 800)
  if (!title && !body) return null
  return {
    id: `w_${Date.now().toString(36)}`,
    room,
    title: title || '未题',
    body,
    public: input?.public === true,
    created: new Date().toISOString()
  }
}

export const formatSeat = seat => {
  const n = Number(seat)
  if (!Number.isFinite(n) || n < 1) return '—'
  return String(Math.trunc(n)).padStart(3, '0')
}

export const isIsoDay = value => /^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))

export const sanitizeProfileInput = (input = {}) => {
  const out = {}
  if (typeof input.name === 'string') {
    const name = input.name.trim().slice(0, 40)
    if (name) out.name = name
  }
  if (typeof input.motto === 'string') {
    out.motto = input.motto.trim().slice(0, 140)
  }
  ;['birth', 'awakening', 'firstWritten'].forEach(key => {
    const day = String(input[key] || '').trim().slice(0, 10)
    if (isIsoDay(day)) out[key] = day
  })
  const years = Number(input.years)
  if (Number.isFinite(years) && years >= 1 && years <= 120) {
    out.years = Math.trunc(years)
  }
  const newYears = Number(input.newYears)
  if (Number.isFinite(newYears) && newYears >= 1 && newYears <= 120) {
    out.newYears = Math.trunc(newYears)
  }
  return out
}

export const writingsOfUser = user => {
  const list = user?.privateMetadata?.writings
  return Array.isArray(list) ? list : []
}

export const roomCategory = room => {
  if (room === 'dao') return '道'
  if (room === 'shu') return '术'
  return OUR_BEINGS_CATEGORY
}

export const signedPostTitle = (title, name) => {
  const t = String(title || '未题').trim() || '未题'
  const n = String(name || '').trim()
  if (!n || t.endsWith(` · ${n}`)) return t
  return `${t} · ${n}`
}

export const writingSlug = (handle, id) => {
  const h = normalizeHandle(handle) || 'being'
  const w = String(id || 'w')
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '')
    .slice(0, 24)
  return `b-${h}-${w}`.slice(0, 80)
}

export const publicBeingView = being => {
  if (!being) return null
  return {
    id: being.handle || being.id,
    seat: being.seat,
    handle: being.handle,
    name: being.name,
    motto: being.motto || '',
    href: being.href,
    public: Boolean(being.public),
    isAuthor: Boolean(being.isAuthor),
    profile: being.profile
  }
}
