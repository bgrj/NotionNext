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

  test('rejects missing configuration and wrong tokens', async () => {
    delete process.env.WUZAI_FEEDBACK_ADMIN_TOKEN
    const unconfigured = response()
    await handler({ method: 'GET', headers: {}, query: {} }, unconfigured)
    expect(unconfigured.statusCode).toBe(503)

    process.env.WUZAI_FEEDBACK_ADMIN_TOKEN = 'regression-admin-token'
    const denied = response()
    await handler({ method: 'GET', headers: { authorization: 'Bearer wrong-token-value!' }, query: {} }, denied)
    expect(denied.statusCode).toBe(401)
  })

  test('lists and updates feedback with a valid bearer token', async () => {
    const list = response()
    await handler({
      method: 'GET',
      headers: { authorization: 'Bearer regression-admin-token' },
      query: { status: 'pending' }
    }, list)
    expect(list.statusCode).toBe(200)
    expect(listMiniFeedback).toHaveBeenCalled()

    const patch = response()
    await handler({
      method: 'PATCH',
      headers: { authorization: 'Bearer regression-admin-token' },
      body: { id: 'a'.repeat(32), status: 'paid', note: 'done' },
      query: {}
    }, patch)
    expect(patch.statusCode).toBe(200)
    expect(updateMiniFeedbackStatus).toHaveBeenCalledWith({}, 'a'.repeat(32), {
      status: 'paid',
      note: 'done'
    })
    expect(getMiniFeedback).not.toHaveBeenCalled()
  })
})
