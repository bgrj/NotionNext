/** @jest-environment node */
import { mediaReadiness } from '@/lib/activities/miniPrivacy'
import { accessToken } from '@/lib/activities/miniModeration'
import { wechatJson } from '@/lib/activities/miniIdentity'
jest.mock('@/lib/activities/miniModeration', () => ({ accessToken: jest.fn() }))
jest.mock('@/lib/activities/miniIdentity', () => ({ MINI_PREFIX: 'test:', wechatJson: jest.fn() }))
const database = () => ({ get: jest.fn().mockResolvedValue(null), set: jest.fn() })
test('develop and release declarations are compared without returning owner data or credentials', async () => {
  const redis = database()
  process.env.WUZAI_MINI_APP_ID = 'wx5e2090025edf9077'
  accessToken.mockResolvedValue('private-token')
  wechatJson.mockResolvedValueOnce({ code_exist: 1, privacy_list: ['UserInfo'], setting_list: [{ privacy_key: 'UserInfo', privacy_label: '头像', privacy_text: '展示头像' }], owner_setting: { contact_email: 'private@example.com' } })
    .mockResolvedValueOnce({ code_exist: 1, privacy_list: ['UserInfo', 'Album'], setting_list: [{ privacy_key: 'UserInfo', privacy_text: '' }] })
  const result = await mediaReadiness(redis)
  expect(result.versions[0].declared).toEqual([{ key: 'UserInfo', label: '头像' }])
  expect(result.versions[1].missingDescriptions).toEqual(['UserInfo', 'Album'])
  expect(wechatJson.mock.calls.map(row => JSON.parse(row[1].body).privacy_ver)).toEqual([1, 2])
  expect(JSON.stringify(result)).not.toMatch(/private-token|private@example|展示头像|owner_setting/)
  expect(redis.set.mock.calls[0].slice(-2)).toEqual(['EX', 60])
})
test('cached checks make no WeChat request and unavailable versions are never cached as ready', async () => {
  const redis = database()
  redis.get.mockResolvedValue(JSON.stringify({ versions: [] }))
  expect(await mediaReadiness(redis)).toEqual({ versions: [] })
  expect(wechatJson).not.toHaveBeenCalled()
  redis.get.mockResolvedValue(null)
  accessToken.mockResolvedValue('token')
  wechatJson.mockResolvedValue({ errcode: 48001, errmsg: 'not authorized' })
  const result = await mediaReadiness(redis)
  expect(result.versions.every(row => !row.available)).toBe(true)
  expect(redis.set).not.toHaveBeenCalled()
})
test('an unknown response shape cannot be mistaken for an empty valid declaration', async () => {
  const redis = database()
  accessToken.mockResolvedValue('token')
  wechatJson.mockResolvedValue({ errcode: 0, privacy_info: { private_contact: 'never-return' } })
  const result = await mediaReadiness(redis)
  expect(result.versions[0]).toEqual({ version: 1, available: false, reason: 'unexpected_response', responseFields: ['errcode', 'privacy_info'] })
  expect(JSON.stringify(result)).not.toContain('never-return')
  expect(redis.set).not.toHaveBeenCalled()
})
