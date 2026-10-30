import { createHash, timingSafeEqual } from 'node:crypto'

export function validBearerToken(authorization, expectedToken) {
  if (
    typeof expectedToken !== 'string' ||
    !expectedToken.trim() ||
    typeof authorization !== 'string' ||
    !authorization.startsWith('Bearer ')
  ) {
    return false
  }
  const received = authorization.slice(7)
  if (!received) return false
  const digest = value => createHash('sha256').update(value).digest()
  return timingSafeEqual(digest(received), digest(expectedToken))
}
