import { sha256 } from 'js-sha256'
import { isBrowser } from '.'

/** SHA256(hex)，用于文章锁新版存储（明文仅存在于 Notion，同步后为摘要） */
export const sha256Digest = str => sha256(String(str))

/** Notion 密码字段直接填入的预计算 SHA256（64 位 hex） */
export const isSHA256Digest = str =>
  typeof str === 'string' && /^[a-fA-F0-9]{64}$/.test(str.trim())

/** 旧版 md5(slug+明文) 的 32 位 hex，同步回字段时原样保留 */
export const isMd5Digest = str =>
  typeof str === 'string' && /^[a-fA-F0-9]{32}$/.test(str.trim())

/**
 * 与 getPasswordQuery 中 localStorage 键一致：pathname only，不含 ?query / #hash
 * （修复带查询参数或锚点时读写键不一致导致无法自动解锁，见 PR #3389）
 */
export const getPasswordStoragePath = path => {
  if (!path) {
    return '/'
  }
  try {
    const base =
      isBrowser && typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost'
    return new URL(path, base).pathname || '/'
  } catch {
    return String(path).split(/[?#]/)[0] || '/'
  }
}

/**
 * 只返回当前地址里显式带上的 password 参数。
 * 不再把文章密码写入或读出 localStorage。
 */
export const getPasswordQuery = path => {
  const url = new URL(path, isBrowser ? window.location.origin : 'http://localhost')
  const queryParams = Object.fromEntries(url.searchParams.entries())
  try {
    localStorage.removeItem('password_default')
    localStorage.removeItem('password_' + url.pathname)
    localStorage.removeItem('password_' + getPasswordStoragePath(path))
  } catch (e) {
    // 隐私模式可能禁止访问本地存储
  }
  return [queryParams.password].filter(Boolean)
}
