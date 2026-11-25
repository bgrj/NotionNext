/** @jest-environment node */
import sharp from 'sharp'
import {
  saveMiniCover,
  saveMiniAvatar,
  acceptedAvatar,
  requireMiniCover
} from '@/lib/activities/miniCovers'
import { accessToken } from '@/lib/activities/miniModeration'
import { wechatJson } from '@/lib/activities/miniIdentity'
jest.mock('@/lib/activities/miniModeration', () => ({ accessToken: jest.fn() }))
jest.mock('@/lib/activities/miniIdentity', () => ({
  MINI_PREFIX: 'test:',
  wechatJson: jest.fn()
}))
const redis = () => ({
  exists: jest.fn().mockResolvedValue(0),
  incr: jest.fn().mockResolvedValue(1),
  expire: jest.fn(),
  set: jest.fn()
})
const actor = { id: 'authenticated-member' }
test('uploaded artwork is decoded, reduced, reviewed and stored before returning a stable URL', async () => {
  const store = redis()
  accessToken.mockResolvedValue('private-token')
  wechatJson.mockResolvedValue({ errcode: 0 })
  const input = await sharp({
    create: { width: 1600, height: 1200, channels: 3, background: '#926631' }
  })
    .png()
    .toBuffer()
  const url = await saveMiniCover(store, actor, input.toString('base64'))
  expect(url).toMatch(/^\/api\/our-beings\/covers\/[a-f0-9]{64}$/)
  const stored = Buffer.from(store.set.mock.calls[0][1], 'base64')
  expect((await sharp(stored).metadata()).width).toBe(1200)
  expect(wechatJson).toHaveBeenCalledTimes(1)
  expect(store.set.mock.calls[0][2]).toBe('NX')
})
test('failed image review prevents persistence', async () => {
  const store = redis()
  accessToken.mockResolvedValue('token')
  wechatJson.mockResolvedValue({ errcode: 87014 })
  const input = await sharp({
    create: { width: 8, height: 8, channels: 3, background: '#fff' }
  })
    .png()
    .toBuffer()
  await expect(
    saveMiniCover(store, actor, input.toString('base64'))
  ).rejects.toMatchObject({ code: 'content_review' })
  expect(store.set).not.toHaveBeenCalled()
})
test('invalid bytes, oversized payloads and quota exhaustion never persist images', async () => {
  const store = redis()
  await expect(saveMiniCover(store, actor, '!')).rejects.toMatchObject({
    code: 'invalid_cover'
  })
  await expect(
    saveMiniCover(store, actor, 'a'.repeat(4200001))
  ).rejects.toMatchObject({ code: 'invalid_cover' })
  await expect(
    saveMiniCover(store, actor, Buffer.from('not an image').toString('base64'))
  ).rejects.toMatchObject({ code: 'invalid_cover' })
  expect(store.set).not.toHaveBeenCalled()
})
test('avatars are cropped square, reviewed and rejected unless already stored', async () => {
  const store = redis()
  accessToken.mockResolvedValue('private-token')
  wechatJson.mockResolvedValue({ errcode: 0 })
  const input = await sharp({
    create: { width: 900, height: 400, channels: 3, background: '#926631' }
  })
    .jpeg()
    .toBuffer()
  const url = await saveMiniAvatar(store, actor, input.toString('base64'))
  expect(url).toMatch(/^\/api\/our-beings\/covers\/[a-f0-9]{64}$/)
  const stored = Buffer.from(store.set.mock.calls[0][1], 'base64')
  const meta = await sharp(stored).metadata()
  expect(meta.width).toBe(512)
  expect(meta.height).toBe(512)
  store.exists.mockResolvedValue(0)
  await expect(acceptedAvatar(store, '初', url)).rejects.toMatchObject({
    code: 'invalid_avatar'
  })
  store.exists.mockResolvedValue(1)
  await expect(acceptedAvatar(store, '初', url)).resolves.toBe(url)
  await expect(acceptedAvatar(store, url, 'not-a-mark')).resolves.toBe(url)
  await expect(
    acceptedAvatar(store, '初', 'https://example.com/a.jpg')
  ).resolves.toBe('初')
})
test('publication accepts only stored artwork references', async () => {
  const store = redis(),
    cover = '/api/our-beings/covers/' + 'a'.repeat(64)
  await expect(
    requireMiniCover(store, 'https://example.com/remote.jpg')
  ).rejects.toMatchObject({ code: 'cover_required' })
  await expect(requireMiniCover(store, cover)).rejects.toMatchObject({
    code: 'cover_required'
  })
  store.exists.mockResolvedValue(1)
  await expect(requireMiniCover(store, cover)).resolves.toBeUndefined()
})
