/** @jest-environment node */
import handler from '@/pages/api/cache'
import { cleanCache } from '@/lib/cache/local_file_cache'
import { validBearerToken } from '@/lib/security/bearerAuth'

jest.mock('@/lib/cache/local_file_cache', () => ({ cleanCache: jest.fn() }))
const originalToken = process.env.CACHE_REVALIDATION_TOKEN
const response = () => {
  const res = { setHeader: jest.fn(), status: jest.fn(), json: jest.fn() }
  res.status.mockReturnValue(res)
  return res
}
afterEach(() => {
  if (originalToken === undefined) delete process.env.CACHE_REVALIDATION_TOKEN
  else process.env.CACHE_REVALIDATION_TOKEN = originalToken
})
test.each([undefined, '', '  '])(
  'missing token %s fails closed without clearing cache',
  token => {
    if (token === undefined) delete process.env.CACHE_REVALIDATION_TOKEN
    else process.env.CACHE_REVALIDATION_TOKEN = token
    const res = response()
    handler({ method: 'POST', headers: {} }, res)
    expect(res.status).toHaveBeenCalledWith(503)
    expect(cleanCache).not.toHaveBeenCalled()
    expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-store')
  }
)
test.each([undefined, '', 'Bearer wrong', ['Bearer test-only']])(
  'invalid authorization %s does not clear cache',
  authorization => {
    process.env.CACHE_REVALIDATION_TOKEN = 'test-only'
    const res = response()
    handler({ method: 'POST', headers: { authorization } }, res)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(cleanCache).not.toHaveBeenCalled()
  }
)
test('only authorized POST clears cache', () => {
  process.env.CACHE_REVALIDATION_TOKEN = 'test-only'
  const res = response()
  handler(
    { method: 'POST', headers: { authorization: 'Bearer test-only' } },
    res
  )
  expect(cleanCache).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(200)
})
test('GET is non-mutating and advertises POST', () => {
  const res = response()
  handler({ method: 'GET', headers: {} }, res)
  expect(res.status).toHaveBeenCalledWith(405)
  expect(res.setHeader).toHaveBeenCalledWith('Allow', 'POST')
  expect(cleanCache).not.toHaveBeenCalled()
})
test('token matching rejects prefix, suffix, empty token and arrays', () => {
  expect(validBearerToken('Bearer test-only', 'test-only')).toBe(true)
  for (const value of [
    'Bearer test-only-extra',
    'Bearer test',
    'bearer test-only',
    '',
    []
  ])
    expect(validBearerToken(value, 'test-only')).toBe(false)
  expect(validBearerToken('Bearer ', '')).toBe(false)
})
