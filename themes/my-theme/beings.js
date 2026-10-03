import { EXISTENCE_DEFAULTS, addYearsIso, shiftIso } from './existence'

export const OUR_BEINGS_CATEGORY = '我们的存在'

export const OUR_BEINGS_SEATS = 100

export const OUR_BEINGS_JOIN_PRICE_YUAN = 5

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

export const AUTHOR_BEING = {
  id: 'ourbeing',
  seat: 1,
  handle: 'ourbeing',
  name: 'ourbeing',
  motto: EXISTENCE_DEFAULTS.motto,
  href: `/category/我的存在`,
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

export const createBeingProfile = ({
  birth,
  years,
  newYears,
  firstWritten,
  awakening,
  motto
} = {}) => {
  const lifeYears = Number(years) > 0 ? Number(years) : EXISTENCE_DEFAULTS.years
  const targetYears =
    Number(newYears) > 0 ? Number(newYears) : EXISTENCE_DEFAULTS.newYears
  const born = birth || EXISTENCE_DEFAULTS.birth
  const woke = awakening || EXISTENCE_DEFAULTS.awakening
  return {
    birth: born,
    years: lifeYears,
    newYears: targetYears,
    firstWritten: firstWritten || EXISTENCE_DEFAULTS.firstWritten,
    awakening: woke,
    newEnd: shiftIso(addYearsIso(woke, targetYears), -1),
    motto: String(motto || '').trim() || EXISTENCE_DEFAULTS.motto
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
  if (isAuthorLoginEmail(email) || meta.handle === AUTHOR_BEING.handle) {
    return { ...AUTHOR_BEING, clerkUserId: user.id }
  }
  const handle =
    normalizeHandle(meta.handle) || handleFromEmail(email) || 'being'
  const name = String(meta.name || user.firstName || handle).trim() || handle
  return {
    id: user.id,
    seat: Number(meta.seat) > 1 ? Number(meta.seat) : null,
    handle,
    name,
    motto: String(meta.motto || '').trim(),
    href: beingProfileHref(handle),
    public: meta.public === true || meta.public === '__YES__',
    isAuthor: false,
    clerkUserId: user.id,
    profile: createBeingProfile({
      birth: meta.birth,
      years: meta.years,
      newYears: meta.newYears,
      firstWritten: meta.firstWritten,
      awakening: meta.awakening,
      motto: meta.motto
    })
  }
}
