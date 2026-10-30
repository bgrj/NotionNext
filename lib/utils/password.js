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
 * 只取 pathname，不含 ?query / #hash。
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
 * 获取默认密码
 * 用户可以通过url中拼接参数，输入密码
 * 输入过一次的密码会被存储在浏览器中，便于下一次免密访问
 * 返回的是一组历史密码，便于客户端多次尝试
 */
export const getPasswordQuery = path => {
  if (!path) return []
  try {
    const url = new URL(
      path,
      isBrowser ? window.location.origin : 'http://localhost'
    )
    const password = url.searchParams.get('password')
    return password ? [password] : []
  } catch {
    return []
  }
}
