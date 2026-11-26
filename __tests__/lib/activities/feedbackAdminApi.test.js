/** @jest-environment node */
import handler from '@/pages/api/our-beings/feedback-admin'
import { activityRedis } from '@/lib/activities/redisStore'
import {
  getMiniFeedback,
  listMiniFeedback,
  updateMiniFeedbackStatus
} from '@/lib/activities/miniFeedback'

jest.mock('@/lib/activities/redisStore', () => ({ activityRedis: jest.fn() }))
jest.mock('@/lib/activities/miniFeedback', () => ({
  getMiniFeedback: jest.fn(),
  listMiniFeedback: jest.fn(),
  updateMiniFeedbackStatus: jest.fn()
}))

function response() {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(key, value) {
      this.headers[key] = value
    },
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
    end() {
      return this
    }
  }
  return res
}

describe('feedback admin api', () => {
  const original = process.env.WUZAI_FEEDBACK_ADMIN_TOKEN
  beforeEach(() => {
    process.env.WUZAI_FEEDBACK_ADMIN_TOKEN = 'regression-admin-token'
    activityRedis.mockReturnValue({})
    listMiniFeedback.mockResolvedValue({ total: 0, items: [], nextOffset: null })
    getMiniFeedback.mockResolvedValue({ id: 'a'.repeat(32), status: 'pending' })
    updateMiniFeedbackStatus.mockResolvedValue({ id: 'a'.repeat(32), status: 'paid' })
  })
  afterEach(() => {
    if (original === undefined) delete process.env.WUZAI_FEEDBACK_ADMIN_TOKEN
    else process.env.WUZAI_FEEDBACK_ADMIN_TOKEN = original
    jest.clearAllMocks()
  })

  test('rejects a management key even when one is still configured', async () => {
    const denied = response()
    await handler({
      method: 'GET',
      headers: { authorization: 'Bearer regression-admin-token' },
      query: {}
    }, denied)
    expect(denied.statusCode).toBe(401)
    expect(denied.body.message).toBe('请用你的微信扫码进入。')
    expect(listMiniFeedback).not.toHaveBeenCalled()

    delete process.env.WUZAI_FEEDBACK_ADMIN_TOKEN
    const stillDenied = response()
    await handler({ method: 'GET', headers: {}, query: {} }, stillDenied)
    expect(stillDenied.statusCode).toBe(401)
  })

  test('accepts a live wechat scan session', async () => {
    activityRedis.mockReturnValue({
      get: jest.fn(async () => 'owner-openid')
    })
    const list = response()
    await handler(
      {
        method: 'GET',
        headers: { authorization: 'Bearer scan_' + 'a'.repeat(43) },
        query: {}
      },
      list
    )
    expect(list.statusCode).toBe(200)
    expect(listMiniFeedback).toHaveBeenCalled()

    const patch = response()
    await handler({
      method: 'PATCH',
      headers: { authorization: 'Bearer scan_' + 'a'.repeat(43) },
      body: { id: 'a'.repeat(32), status: 'paid', note: 'done' },
      query: {}
    }, patch)
    expect(patch.statusCode).toBe(200)
    expect(updateMiniFeedbackStatus).toHaveBeenCalledWith(
      expect.anything(),
      'a'.repeat(32),
      { status: 'paid', note: 'done' }
    )
  })
})
