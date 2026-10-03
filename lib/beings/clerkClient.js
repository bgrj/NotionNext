import {
  AUTHOR_BEING,
  beingFromClerkUser,
  publicBeingView,
  writingsOfUser
} from '@/themes/my-theme/beings'

export async function getClerkClient() {
  const { clerkClient } = await import('@clerk/nextjs/server')
  if (!clerkClient) {
    const error = new Error('clerk_missing')
    error.status = 503
    throw error
  }
  const client =
    typeof clerkClient === 'function' ? await clerkClient() : clerkClient
  if (!client?.users) {
    const error = new Error('clerk_users_missing')
    error.status = 503
    throw error
  }
  return client
}

export const clerkUsersOf = list => {
  if (!list) return []
  if (Array.isArray(list)) return list
  if (Array.isArray(list.data)) return list.data
  return []
}

export const clerkErrorPayload = error => {
  const first = error?.errors?.[0]
  const message =
    first?.longMessage || first?.message || error?.message || 'save_failed'
  return {
    error: String(error?.code || error?.status || 'save_failed'),
    message: String(message)
  }
}

export async function listClerkUsers(client, limit = 100) {
  const list = await client.users.getUserList({ limit })
  return clerkUsersOf(list)
}

export const publicWritingsOf = user =>
  writingsOfUser(user).filter(item => item?.public)

export const toListedBeing = user => {
  const being = beingFromClerkUser(user)
  if (!being || being.isAuthor || !being.public || !being.handle) return null
  return publicBeingView(being)
}

export async function findPublicBeingRecord(client, handle) {
  const h = String(handle || '').trim().toLowerCase()
  if (!h) return null
  if (h === AUTHOR_BEING.handle) {
    return { being: publicBeingView(AUTHOR_BEING), writings: [] }
  }
  const users = await listClerkUsers(client)
  const user = users.find(item => {
    const being = beingFromClerkUser(item)
    return being && !being.isAuthor && being.handle === h
  })
  if (!user) return null
  const being = beingFromClerkUser(user)
  if (!being?.public) return null
  return {
    being: publicBeingView(being),
    writings: publicWritingsOf(user)
  }
}
