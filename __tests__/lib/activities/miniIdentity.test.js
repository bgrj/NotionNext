/** @jest-environment node */
import { createHash } from 'node:crypto'
import {
  loginMini,
  resolveMiniActor,
  publicMiniUser,
  updateMiniProfile,
  accountKey
} from '@/lib/activities/miniIdentity'
const originalFetch = global.fetch

describe('direct WeChat login without CloudBase', () => {
  let redis
  const user = { number: 1, name: '存在者1号', bio: '', avatar: '初' }
  beforeEach(() => {
    process.env.WUZAI_MINI_APP_ID = 'wx-real-app'
    process.env.WUZAI_MINI_APP_SECRET = 'server-only-secret'
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        openid: 'trusted-wechat-user',
        session_key: 'must-never-leave-server'
      })
    })
    redis = {
      eval: jest.fn().mockResolvedValue(JSON.stringify(user)),
      set: jest.fn().mockResolvedValue('OK'),
      get: jest.fn()
    }
  })
  afterEach(() => {
    delete process.env.WUZAI_MINI_APP_ID
    delete process.env.WUZAI_MINI_APP_SECRET
    global.fetch = originalFetch
  })
  test('exchanges a one-time WeChat code and returns only an opaque, expiring session', async () => {
    const result = await loginMini(redis, 'real-one-time-code', 1000)
    expect(new URL(fetch.mock.calls[0][0]).hostname).toBe('api.weixin.qq.com')
    expect(new URL(fetch.mock.calls[0][0]).searchParams.get('grant_type')).toBe(
      'authorization_code'
    )
    expect(result.token).toMatch(/^[A-Za-z0-9_-]{43}$/)
    expect(result.user).toEqual({
      authenticated: true,
      platform: 'wechat',
      signatureUnified: false,
      ...user
    })
    expect(JSON.stringify(result)).not.toMatch(
      /trusted-wechat-user|must-never-leave-server|server-only-secret/
    )
    const storedKey = redis.set.mock.calls[0][0]
    expect(storedKey).not.toContain(result.token)
    expect(storedKey).toContain(
      createHash('sha256').update(result.token).digest('hex')
    )
    expect(redis.eval.mock.calls[0][2]).toBe(
      accountKey('wx:wx-real-app:trusted-wechat-user')
    )
  })
  test('invalid WeChat responses never allocate names or issue sessions', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ errcode: 40029, openid: 'forged' })
    })
    await expect(loginMini(redis, 'expired-code-value')).rejects.toMatchObject({
      status: 401
    })
    expect(redis.eval).not.toHaveBeenCalled()
    expect(redis.set).not.toHaveBeenCalled()
  })
  test('missing server credentials fails before contacting WeChat or registering an account', async () => {
    delete process.env.WUZAI_MINI_APP_SECRET
    await expect(loginMini(redis, 'real-one-time-code')).rejects.toMatchObject({
      code: 'wechat_not_configured'
    })
    expect(fetch).not.toHaveBeenCalled()
  })
  test('client-supplied identity and altered or expired tokens cannot replace a server session', async () => {
    await expect(
      resolveMiniActor(redis, 'Bearer forged-openid')
    ).rejects.toMatchObject({ status: 401 })
    redis.get.mockResolvedValue(null)
    await expect(
      resolveMiniActor(redis, 'Bearer ' + 'a'.repeat(43))
    ).rejects.toMatchObject({ status: 401 })
    redis.get.mockResolvedValue(
      JSON.stringify({
        id: 'wx:wx-real-app:trusted-wechat-user',
        expiresAt: 100
      })
    )
    await expect(
      resolveMiniActor(redis, 'Bearer ' + 'a'.repeat(43), 101)
    ).rejects.toMatchObject({ status: 401 })
  })
  test('profile edits cannot change the assigned name or number', async () => {
    const result = await updateMiniProfile(
      redis,
      { id: 'wx:wx-real-app:trusted-wechat-user', user },
      { name: '存在者999号', number: 999, bio: 'hello', avatar: '海' }
    )
    expect(result.number).toBe(1)
    expect(result.name).toBe('存在者1号')
    expect(result.bio).toBe('hello')
    expect(result.avatar).toBe('海')
    const photo = '/api/our-beings/covers/' + 'ab'.repeat(32)
    const kept = await updateMiniProfile(
      redis,
      { id: 'wx:wx-real-app:trusted-wechat-user', user },
      { bio: 'hello', avatar: 'https://example.com/a.jpg' }
    )
    expect(kept.avatar).toBe('初')
    const withPhoto = await updateMiniProfile(
      redis,
      { id: 'wx:wx-real-app:trusted-wechat-user', user: { ...user, avatar: photo } },
      { bio: 'hello', avatar: photo }
    )
    expect(withPhoto.avatar).toBe(photo)
    expect(publicMiniUser({ ...user, openid: 'private' })).not.toHaveProperty(
      'openid'
    )
  })
  test('one signature stores merged legacy content without truncation and can be explicitly cleared', async () => {
    const actor = { id: 'wx:wx-real-app:trusted-wechat-user', user }
    const signature = '箴言'.repeat(70) + '\n\n' + '介绍'.repeat(50)
    const result = await updateMiniProfile(redis, actor, { signature, name: '伪造昵称', number: 999 })
    expect(result).toMatchObject({ bio: signature, signatureUnified: true, number: 1, name: '存在者1号' })
    const cleared = await updateMiniProfile(redis, { ...actor, user: { ...user, bio: signature, signatureUnified: true } }, { signature: '' })
    expect(cleared).toMatchObject({ bio: '', signatureUnified: true })
  })
  test('avatar-only updates keep the accepted signature and its migration marker', async () => {
    const bio = '已保存的签名'.repeat(30)
    const result = await updateMiniProfile(redis,
      { id: 'wx:wx-real-app:trusted-wechat-user', user: { ...user, bio, signatureUnified: true } }, { avatar: '海' })
    expect(result).toMatchObject({ bio, signatureUnified: true, avatar: '海' })
  })
  test('invalid signatures are rejected without storing a partial profile', async () => {
    const actor = { id: 'wx:wx-real-app:trusted-wechat-user', user }
    for (const signature of [null, {}, '字'.repeat(281)]) {
      await expect(updateMiniProfile(redis, actor, { signature })).rejects.toMatchObject({ code: 'invalid_profile' })
    }
    expect(redis.set).not.toHaveBeenCalled()
  })
})
