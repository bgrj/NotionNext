import { getAuth } from '@clerk/nextjs/server'
import {
  AUTHOR_BEING,
  OUR_BEINGS_SEATS,
  beingFromClerkUser,
  clerkEmailOf,
  handleFromEmail,
  inviteCodeFrom,
  isAuthorLoginEmail,
  normalizeHandle,
  sanitizeProfileInput,
  sanitizeWriting,
  writingsOfUser
} from '@/themes/my-theme/beings'
import {
  clerkErrorPayload,
  getClerkClient,
  listClerkUsers
} from '@/lib/beings/clerkClient'

const MAX_WRITINGS = 12

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

const withInvite = (meta, userId, seat) => {
  if (String(meta.inviteCode || '').trim()) return meta
  return { ...meta, inviteCode: inviteCodeFrom(seat, userId) }
}

async function persistMeta(client, userId, publicMetadata, extra = {}) {
  return client.users.updateUser(userId, {
    publicMetadata,
    ...extra
  })
}

async function ensureBeing(client, userId) {
  const user = await client.users.getUser(userId)
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
    const saved = needsWrite
      ? await persistMeta(client, userId, nextMeta)
      : user
    return {
      being: beingFromClerkUser(saved),
      writings: writingsOfUser(saved)
    }
  }

  if (meta.handle && Number(meta.seat) > 1) {
    const nextMeta = withInvite(meta, userId, meta.seat)
    const saved = meta.inviteCode
      ? user
      : await persistMeta(client, userId, nextMeta)
    return {
      being: beingFromClerkUser(saved),
      writings: writingsOfUser(saved)
    }
  }

  const users = await listClerkUsers(client, 100)
  const seat = nextSeat(users)
  if (seat > OUR_BEINGS_SEATS) {
    const error = new Error('seats_full')
    error.status = 403
    error.code = 'seats_full'
    throw error
  }
  const handle = uniqueHandle(handleFromEmail(email), takenHandles(users))
  const name = String(meta.name || user.firstName || handle).trim() || handle
  const saved = await persistMeta(client, userId, {
    ...meta,
    handle,
    seat,
    public: false,
    name,
    inviteCode: inviteCodeFrom(seat, userId)
  })
  return {
    being: beingFromClerkUser(saved),
    writings: writingsOfUser(saved)
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
    const client = await getClerkClient()

    if (req.method === 'GET' || req.method === 'POST') {
      const data = await ensureBeing(client, userId)
      return res.status(200).json(data)
    }

    await ensureBeing(client, userId)
    const current = await client.users.getUser(userId)
    const email = clerkEmailOf(current)
    const author = isAuthorLoginEmail(email)
    const meta = { ...(current.publicMetadata || {}) }
    const privateMetadata = { ...(current.privateMetadata || {}) }
    const body = req.body && typeof req.body === 'object' ? req.body : {}
    let writings = writingsOfUser(current)

    if (body.writing) {
      const writing = sanitizeWriting(body.writing)
      if (!writing) {
        return res.status(400).json({
          error: 'invalid_writing',
          message: '题目或正文至少写一句。'
        })
      }
      if (writings.length >= MAX_WRITINGS) {
        return res.status(400).json({
          error: 'writings_full',
          message: '这间档案先放下十二段。再多的以后进自己的存在页。'
        })
      }
      writings = [...writings, writing]
      privateMetadata.writings = writings
    }

    if (!author && typeof body.public === 'boolean') {
      meta.public = body.public
    }

    const profile = sanitizeProfileInput(body.profile || body)
    if (!author) {
      Object.assign(meta, profile)
    }

    const seat = author ? 1 : Number(meta.seat) || 1
    const nextMeta = withInvite(meta, userId, seat)
    const extra = body.writing ? { privateMetadata } : {}
    const saved = await persistMeta(client, userId, nextMeta, extra)
    return res.status(200).json({
      being: beingFromClerkUser(saved),
      writings: writingsOfUser(saved)
    })
  } catch (error) {
    if (error.status === 403 || error.code === 'seats_full') {
      return res.status(403).json({
        error: 'seats_full',
        message: '前一百席位已满。'
      })
    }
    console.error('[beings/me]', error)
    const payload = clerkErrorPayload(error)
    return res.status(error.status || 500).json({
      ...payload,
      message:
        payload.message === 'save_failed' || payload.message === 'clerk_missing'
          ? '档案位还没坐下。稍后再试。'
          : payload.message
    })
  }
}
