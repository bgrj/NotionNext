/** @jest-environment node */
import { ReadableStream } from 'stream/web'
import { get, put, BlobPreconditionFailedError } from '@vercel/blob'
import {
  communityBlobStore,
  communityStorageEnabled
} from '@/lib/beings/community/blobStore'
import { emptyCommunity, MAX_STATE_BYTES } from '@/lib/beings/community/model'

jest.mock('@vercel/blob', () => ({
  get: jest.fn(),
  put: jest.fn(),
  BlobNotFoundError: class BlobNotFoundError extends Error {},
  BlobPreconditionFailedError: class BlobPreconditionFailedError extends Error {}
}))
const keys = [
  'OURBEINGS_STORAGE_ENABLED',
  'OURBEINGS_BLOB_STORE_ID',
  'OURBEINGS_BLOB_READ_WRITE_TOKEN',
  'VERCEL_OIDC_TOKEN'
]
let saved
beforeEach(() => {
  saved = Object.fromEntries(keys.map(k => [k, process.env[k]]))
  for (const key of keys) delete process.env[key]
  get.mockReset()
  put.mockReset()
})
afterEach(() => {
  for (const key of keys)
    saved[key] === undefined
      ? delete process.env[key]
      : (process.env[key] = saved[key])
})
const enable = () => {
  process.env.OURBEINGS_STORAGE_ENABLED = 'true'
  process.env.OURBEINGS_BLOB_STORE_ID = 'store_isolated_test'
  process.env.VERCEL_OIDC_TOKEN = 'synthetic-oidc-test'
}
test('unconfigured store fails closed, never using ambient production or memory fallback', () => {
  expect(communityStorageEnabled()).toBe(false)
  expect(() => communityBlobStore()).toThrow(/尚未接通/)
  expect(get).not.toHaveBeenCalled()
  expect(put).not.toHaveBeenCalled()
})
test('a store id without a scoped token or OIDC identity is not enough', () => {
  process.env.OURBEINGS_STORAGE_ENABLED = 'true'
  process.env.OURBEINGS_BLOB_STORE_ID = 'store_isolated_test'
  expect(communityStorageEnabled()).toBe(false)
})
test('private reads always bypass shared CDN cache and preserve the current ETag', async () => {
  enable()
  const data = new TextEncoder().encode(JSON.stringify(emptyCommunity()))
  get.mockResolvedValue({
    statusCode: 200,
    blob: { size: data.length, etag: 'current-etag' },
    stream: new ReadableStream({
      start(c) {
        c.enqueue(data)
        c.close()
      }
    })
  })
  const snapshot = await communityBlobStore().read()
  expect(snapshot.token).toBe('current-etag')
  expect(get).toHaveBeenCalledWith(
    'ourbeings-v1/community.json',
    expect.objectContaining({
      access: 'private',
      useCache: false,
      storeId: 'store_isolated_test',
      oidcToken: 'synthetic-oidc-test'
    })
  )
})
test('updating existing state uses its exact ETag; mismatch retries instead of overwriting', async () => {
  enable()
  put.mockRejectedValueOnce(new BlobPreconditionFailedError())
  expect(
    await communityBlobStore().compareSwap('old-etag', emptyCommunity())
  ).toBe(false)
  expect(put).toHaveBeenCalledWith(
    'ourbeings-v1/community.json',
    expect.any(String),
    expect.objectContaining({
      access: 'private',
      ifMatch: 'old-etag',
      allowOverwrite: true,
      addRandomSuffix: false
    })
  )
})
test('initial creation prohibits overwriting a concurrent first write', async () => {
  enable()
  put.mockRejectedValueOnce(new Error('This blob already exists'))
  expect(await communityBlobStore().compareSwap(null, emptyCommunity())).toBe(
    false
  )
  expect(put.mock.calls[0][2].allowOverwrite).toBe(false)
  expect(put.mock.calls[0][2]).not.toHaveProperty('ifMatch')
})
test('oversized reads are rejected before buffering private content', async () => {
  enable()
  get.mockResolvedValue({
    statusCode: 200,
    blob: { size: MAX_STATE_BYTES + 1 },
    stream: {}
  })
  await expect(communityBlobStore().read()).rejects.toMatchObject({
    code: 'invalid_store'
  })
})
