import { clerkClient, getAuth } from '@clerk/nextjs/server'
import {
  AUTHOR_BEING,
  OUR_BEINGS_SEATS,
  beingFromClerkUser,
  clerkEmailOf,
  handleFromEmail,
  isAuthorLoginEmail,
  normalizeHandle
} from '@/themes/my-theme/beings'

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

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId } = getAuth(req)
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })

    const user = await clerkClient.users.getUser(userId)
    const email = clerkEmailOf(user)
    const meta = user.publicMetadata || {}

    if (isAuthorLoginEmail(email)) {
      if (meta.handle !== AUTHOR_BEING.handle || Number(meta.seat) !== 1) {
        await clerkClient.users.updateUser(userId, {
          publicMetadata: {
            ...meta,
            handle: AUTHOR_BEING.handle,
            seat: 1,
            public: true,
            name: AUTHOR_BEING.name
          }
        })
      }
      return res.status(200).json({
        being: { ...AUTHOR_BEING, clerkUserId: userId }
      })
    }

    if (meta.handle && Number(meta.seat) > 1) {
      return res.status(200).json({ being: beingFromClerkUser(user) })
    }

    const list = await clerkClient.users.getUserList({ limit: 200 })
    const users = list.data || list || []
    const seat = nextSeat(users)
    if (seat > OUR_BEINGS_SEATS) {
      return res.status(403).json({ error: 'seats_full' })
    }
    const handle = uniqueHandle(handleFromEmail(email), takenHandles(users))
    const updated = await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        ...meta,
        handle,
        seat,
        public: false,
        name: handle
      }
    })
    return res.status(200).json({ being: beingFromClerkUser(updated) })
  } catch (error) {
    console.error('[beings/me]', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
