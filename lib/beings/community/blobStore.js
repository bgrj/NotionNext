import {
  get,
  put,
  BlobNotFoundError,
  BlobPreconditionFailedError
} from '@vercel/blob'
import { CommunityError, emptyCommunity, MAX_STATE_BYTES } from './model'

const PATHNAME = 'ourbeings-v1/community.json'
export const communityStorageEnabled = () =>
  process.env.OURBEINGS_STORAGE_ENABLED === 'true' &&
  Boolean(process.env.OURBEINGS_BLOB_STORE_ID) &&
  Boolean(
    process.env.OURBEINGS_BLOB_READ_WRITE_TOKEN || process.env.VERCEL_OIDC_TOKEN
  )

// An explicit, separately connected private store is mandatory. Do not silently
// fall back to an ambient production token, Clerk metadata, cache or /tmp.
export function communityBlobStore() {
  if (!communityStorageEnabled())
    throw new CommunityError(
      'storage_unavailable',
      '新的云端内容存储尚未接通。本次没有保存；可以使用功能导览或导出自己的输入。',
      503
    )
  const options = {
    access: 'private',
    storeId: process.env.OURBEINGS_BLOB_STORE_ID
  }
  if (process.env.OURBEINGS_BLOB_READ_WRITE_TOKEN)
    options.token = process.env.OURBEINGS_BLOB_READ_WRITE_TOKEN
  else options.oidcToken = process.env.VERCEL_OIDC_TOKEN
  return {
    async read() {
      let result
      try {
        result = await get(PATHNAME, { ...options, useCache: false })
      } catch (error) {
        if (error instanceof BlobNotFoundError)
          return { state: emptyCommunity(), token: null }
        throw error
      }
      if (!result) return { state: emptyCommunity(), token: null }
      if (
        result.statusCode !== 200 ||
        !result.stream ||
        result.blob.size > MAX_STATE_BYTES
      )
        throw new CommunityError(
          'invalid_store',
          '存储暂时无法读取，请稍后再试。',
          503
        )
      const reader = result.stream.getReader()
      const chunks = []
      let length = 0
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        length += value.length
        if (length > MAX_STATE_BYTES) {
          await reader.cancel()
          throw new CommunityError(
            'invalid_store',
            '存储大小超出当前试用范围。',
            503
          )
        }
        chunks.push(Buffer.from(value))
      }
      const state = JSON.parse(Buffer.concat(chunks).toString('utf8'))
      if (
        state.schema !== 1 ||
        !Number.isInteger(state.revision) ||
        !state.contents ||
        !state.events
      )
        throw new CommunityError(
          'invalid_store',
          '数据版本不匹配，请联系站主。',
          503
        )
      return { state, token: result.blob.etag }
    },
    async compareSwap(expected, state) {
      try {
        await put(PATHNAME, JSON.stringify(state), {
          ...options,
          contentType: 'application/json',
          addRandomSuffix: false,
          allowOverwrite: expected !== null,
          ...(expected !== null ? { ifMatch: expected } : {}),
          cacheControlMaxAge: 60
        })
        return true
      } catch (error) {
        if (
          error instanceof BlobPreconditionFailedError ||
          /already exists/i.test(error?.message || '')
        )
          return false
        throw error
      }
    }
  }
}
