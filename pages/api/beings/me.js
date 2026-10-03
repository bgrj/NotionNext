import { clerkClient, getAuth } from '@clerk/nextjs/server'
import {
  AUTHOR_BEING,
  OUR_BEINGS_SEATS,
  beingFromClerkUser,
  clerkEmailOf,
  handleFromEmail,
  inviteCodeFrom,
  isAuthorLoginEmail,
  normalizeHandle,
  sanitizeWriting
} from '@/themes/my-theme/beings'

const MAX_WRITINGS = 40

const takenHandles = users => {
  const used = new Set([AUTHOR_BEING.handle])
  users.forEach(user => {
    const handle = normalizeHandle(user.publicMetadata?.handle)
    if (handle) used.add(handle)
  })
  return used
}

const nextSeat = users => {
  let maxSeat = 1
  users.forEach(user => {
    const seat = Number(user.publicMetadata?.seat)
    if (Number.isFinite(seat) && seat > maxSeat) maxSeat = seat
  })
  return maxSeat + 1
}

const uniqueHandle = (base, used) => {
  let handle = base || 'being'
  if (!used.has(handle)) return handle
  let i = 2
  while (used.has(`${handle}${i}`) && i < 1000) i += 1
  return `${handle}${i}`
}

const writingsOf = user => {
  const list = user?.privateMetadata?.writings
  return Array.isArray(list) ? list : []
}

const withInvite = (meta, userId, seat) => {
  if (String(meta.inviteCode || '').trim()) return meta
  return { ...meta, inviteCode: inviteCodeFrom(seat, userId) }
}

async function persistMeta(userId, publicMetadata, extra = {}) {
  return clerkClient.users.updateUser(userId, {
    publicMetadata,
    ...extra
  })
}

async function ensureBeing(userId) {
  const user = await clerkClient.users.getUser(userId)
  const email = clerkEmailOf(user)
  const meta = user.publicMetadata || {}

  if (isAuthorLoginEmail(email)) {
    const nextMeta = withInvite(
      {
        ...meta,
        handle: AUTHOR_BEING.handle,
        seat: 1,
        public: true,
        name: AUTHOR_BEING.name
      },
      userId,
      1
    )
    const needsWrite =
      meta.handle !== AUTHOR_BEING.handle ||
      Number(meta.seat) !== 1 ||
      meta.public !== true ||
      !meta.inviteCode
    const saved = needsWrite ? await persistMeta(userId, nextMeta) : user
    return {
      being: beingFromClerkUser(saved),
      writings: writingsOf(saved)
    }
  }

  if (meta.handle && Number(meta.seat) > 1) {
    const nextMeta = withInvite(meta, userId, meta.seat)
    const saved = meta.inviteCode
      ? user
      : await persistMeta(userId, nextMeta)
    return {
      being: beingFromClerkUser(saved),
      writings: writingsOf(saved)
    }
  }

  const list = await clerkClient.users.getUserList({ limit: 200 })
  const users = list.data || list || []
  const seat = nextSeat(users)
  if (seat > OUR_BEINGS_SEATS) {
    const error = new Error('seats_full')
    error.status = 403
    throw error
  }
  const handle = uniqueHandle(handleFromEmail(email), takenHandles(users))
  const saved = await persistMeta(userId, {
    ...meta,
    handle,
    seat,
    public: false,
    name: handle,
    inviteCode: inviteCodeFrom(seat, userId)
  })
  return {
    being: beingFromClerkUser(saved),
    writings: writingsOf(saved)
  }
}

export default async function handler(req, res) {
  if (!['GET', 'POST', 'PATCH'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST, PATCH')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId } = getAuth(req)
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    if (req.method === 'GET' || req.method === 'POST') {
      const data = await ensureBeing(userId)
      return res.status(200).json(data)
    }

    const current = await clerkClient.users.getUser(userId)
    const email = clerkEmailOf(current)
    const author = isAuthorLoginEmail(email)
    const meta = { ...(current.publicMetadata || {}) }
    const privateMetadata = { ...(current.privateMetadata || {}) }
    const body = req.body && typeof req.body === 'object' ? req.body : {}
    let writings = writingsOf(current)

    if (body.writing) {
      const writing = sanitizeWriting(body.writing)
      if (!writing) {
        return res.status(400).json({ error: 'invalid_writing' })
      }
      if (writings.length >= MAX_WRITINGS) {
        return res.status(400).json({ error: 'writings_full' })
      }
      writings = [...writings, writing]
      privateMetadata.writings = writings
    }

    if (!author && typeof body.public === 'boolean') {
      meta.public = body.public
    }
    if (typeof body.motto === 'string' && !author) {
      meta.motto = body.motto.trim().slice(0, 140)
    }
    const seat = author ? 1 : Number(meta.seat) || 1
    const nextMeta = withInvite(meta, userId, seat)

    const saved = await persistMeta(userId, nextMeta, { privateMetadata })
    return res.status(200).json({
      being: beingFromClerkUser(saved),
      writings
    })
  } catch (error) {
    if (error.status === 403) {
      return res.status(403).json({ error: 'seats_full' })
    }
    console.error('[beings/me]', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
