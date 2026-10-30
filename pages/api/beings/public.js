import { AUTHOR_BEING, OUR_BEINGS_SEATS, normalizeHandle } from '@/themes/my-theme/beings'
import {
  findPublicBeingRecord,
  getClerkClient,
  listClerkUsers,
  toListedBeing
} from '@/lib/beings/clerkClient'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const client = await getClerkClient()
    const handle = normalizeHandle(req.query?.handle)
    if (handle) {
      const record = await findPublicBeingRecord(client, handle)
      if (!record) return res.status(404).json({ error: 'not_found' })
      return res.status(200).json(record)
    }

    const users = await listClerkUsers(client, 100)
    const beings = users.map(toListedBeing).filter(Boolean)
    const taken = users.reduce((count, user) => {
      const seat = Number(user.publicMetadata?.seat)
      return Number.isFinite(seat) && seat > 1 ? count + 1 : count
    }, 1)

    return res.status(200).json({
      taken: Math.min(OUR_BEINGS_SEATS, Math.max(1, taken)),
      remaining: Math.max(0, OUR_BEINGS_SEATS - taken),
      beings
    })
  } catch (error) {
    console.error('[beings/public]', error)
    if (normalizeHandle(req.query?.handle) === AUTHOR_BEING.handle) {
      return res.status(200).json({ being: AUTHOR_BEING, writings: [] })
    }
    return res.status(200).json({ taken: 1, remaining: OUR_BEINGS_SEATS - 1, beings: [] })
  }
}
