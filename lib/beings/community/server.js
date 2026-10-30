import { getAuth } from '@clerk/nextjs/server'
import { getClerkClient } from '@/lib/beings/clerkClient'
import { AUTHOR_LOGIN_EMAILS } from '@/themes/my-theme/beings'

export async function requestCommunityActor(req) {
  if (
    !process.env.CLERK_SECRET_KEY ||
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  )
    return null
  const { userId } = getAuth(req)
  if (!userId) return null
  const client = await getClerkClient()
  const user = await client.users.getUser(userId)
  const configured = String(process.env.OURBEINGS_MODERATOR_USER_IDS || '')
    .split(',')
    .map(x => x.trim())
    .filter(Boolean)
  const verifiedOwner = (user.emailAddresses || []).some(
    email =>
      email.verification?.status === 'verified' &&
      AUTHOR_LOGIN_EMAILS.includes(
        String(email.emailAddress).trim().toLowerCase()
      )
  )
  return {
    id: userId,
    moderator:
      configured.includes(userId) ||
      user.publicMetadata?.ourbeingsModerator === true ||
      verifiedOwner
  }
}

export function sameOriginMutation(req) {
  const fetchSite = req.headers?.['sec-fetch-site']
  if (fetchSite === 'cross-site') return false
  const origin = req.headers?.origin
  if (!origin) return true // Native clients use a verified bearer identity.
  try {
    return new URL(origin).host === req.headers.host
  } catch {
    return false
  }
}
