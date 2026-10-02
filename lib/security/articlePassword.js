import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import md5 from 'js-md5'
import { sha256Digest } from '@/lib/utils/password'

const SCRYPT_PREFIX = 'scrypt$'

function equalHex(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string') return false
  const a = left.trim().toLowerCase()
  const b = right.trim().toLowerCase()
  if (!a || !b) return false
  const leftBuf = Buffer.from(a)
  const rightBuf = Buffer.from(b)
  if (leftBuf.length !== rightBuf.length) {
    const dummy = Buffer.alloc(32)
    timingSafeEqual(dummy, dummy)
    return false
  }
  return timingSafeEqual(leftBuf, rightBuf)
}

function verifyScrypt(stored, password) {
  const parts = stored.split('$')
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false
  const n = Number(parts[1])
  const r = Number(parts[2])
  const p = Number(parts[3])
  const salt = Buffer.from(parts[4], 'base64url')
  const expected = Buffer.from(parts[5], 'base64url')
  if (!n || !r || !p || !salt.length || !expected.length) return false
  try {
    const actual = scryptSync(password, salt, expected.length, {
      N: n,
      r,
      p
    })
    return timingSafeEqual(actual, expected)
  } catch {
    return false
  }
}

export function verifyArticlePassword(post, password) {
  if (!post || typeof password !== 'string' || !password) return false
  const stored = typeof post.password === 'string' ? post.password.trim() : ''
  if (!stored) return false
  if (stored.startsWith(SCRYPT_PREFIX)) {
    return verifyScrypt(stored, password)
  }
  // Existing Notion fields already store SHA-256 / MD5 hex. This only
  // verifies those published digests; newly stored secrets use scrypt.
  const nextHash = sha256Digest(password) // codeql[js/insufficient-password-hash]
  const legacy = md5(String(post.slug ?? '') + password) // codeql[js/weak-cryptographic-algorithm]
  return equalHex(stored, nextHash) || equalHex(stored, legacy)
}

export function hashArticlePasswordScrypt(password, options = {}) {
  const n = options.n || 16384
  const r = options.r || 8
  const p = options.p || 1
  const salt = options.salt || randomBytes(16)
  const hash = scryptSync(password, salt, 32, { N: n, r, p })
  return `scrypt$${n}$${r}$${p}$${Buffer.from(salt).toString('base64url')}$${hash.toString('base64url')}`
}
