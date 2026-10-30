/** @jest-environment node */
import axios from 'axios'
import {
  startNotionOAuth,
  completeNotionOAuth
} from '@/lib/security/notionOAuth'
import callback from '@/pages/api/auth/callback/notion'
import { getServerSideProps } from '@/pages/auth'

jest.mock('axios', () => ({ post: jest.fn() }))
const originalEnv = { ...process.env }
const response = () => {
  const res = {
    setHeader: jest.fn(),
    status: jest.fn(),
    json: jest.fn(),
    redirect: jest.fn()
  }
  res.status.mockReturnValue(res)
  return res
}
const request = () => ({
  method: 'GET',
  headers: {},
  query: { code: 'test-only-code', state: 'test-only-state' },
  cookies: { notion_oauth_state: 'test-only-state' }
})
beforeEach(() => {
  process.env.ENABLE_NOTION_OAUTH = 'true'
  process.env.OAUTH_CLIENT_ID = 'test-only-client-id'
  process.env.OAUTH_CLIENT_SECRET = 'test-only-client-secret'
  process.env.OAUTH_REDIRECT_URI =
    'https://test.example/api/auth/callback/notion'
  axios.post.mockResolvedValue({
    status: 200,
    data: {
      access_token: 'test-only-access-token',
      workspace_name: 'Private test workspace'
    }
  })
})
afterEach(() => {
  process.env = { ...originalEnv }
})
test('demo OAuth is disabled unless explicitly enabled', async () => {
  delete process.env.ENABLE_NOTION_OAUTH
  const res = response()
  expect((await completeNotionOAuth(request(), res)).status).toBe(503)
  expect(axios.post).not.toHaveBeenCalled()
})
test.each([undefined, '', 'different-state', ['test-only-state']])(
  'rejects invalid state %s before exchanging a code',
  async state => {
    const req = request()
    req.query.state = state
    expect((await completeNotionOAuth(req, response())).status).toBe(400)
    expect(axios.post).not.toHaveBeenCalled()
  }
)
test('rejects a missing browser state cookie', async () => {
  const req = request()
  req.cookies = {}
  expect((await completeNotionOAuth(req, response())).status).toBe(400)
  expect(axios.post).not.toHaveBeenCalled()
})
test('starts with a random HttpOnly, Secure, Lax and short-lived state cookie', () => {
  process.env.NODE_ENV = 'production'
  const res = response()
  startNotionOAuth({ method: 'GET' }, res)
  const cookie = res.setHeader.mock.calls.find(
    ([key]) => key === 'Set-Cookie'
  )[1]
  expect(cookie).toContain('HttpOnly')
  expect(cookie).toContain('Secure')
  expect(cookie).toContain('SameSite=Lax')
  expect(cookie).toContain('Max-Age=600')
  const url = new URL(res.redirect.mock.calls[0][1])
  expect(url.hostname).toBe('api.notion.com')
  expect(url.searchParams.get('state')).toHaveLength(43)
  expect(cookie).toContain(url.searchParams.get('state'))
})
test('successful exchange returns status only and consumes browser state', async () => {
  const res = response()
  const result = await completeNotionOAuth(request(), res)
  expect(result).toEqual({ ok: true, status: 200, message: '授权完成' })
  expect(JSON.stringify(result)).not.toMatch(
    /access_token|workspace|test-only-access-token/
  )
  expect(
    res.setHeader.mock.calls.find(([key]) => key === 'Set-Cookie')[1]
  ).toContain('Max-Age=0')
  expect(axios.post.mock.calls[0][2]).toMatchObject({
    timeout: 15000,
    maxRedirects: 0
  })
  expect(res.setHeader).toHaveBeenCalledWith('Referrer-Policy', 'no-referrer')
})
test('Axios errors are neither returned nor logged', async () => {
  axios.post.mockRejectedValue({
    config: { headers: { Authorization: 'test-only-private-header' } },
    response: { data: { access_token: 'test-only-access-token' } }
  })
  const log = jest.spyOn(console, 'log')
  const error = jest.spyOn(console, 'error')
  const result = await completeNotionOAuth(request(), response())
  expect(result).toEqual({
    ok: false,
    status: 502,
    message: 'OAuth exchange failed'
  })
  expect(log).not.toHaveBeenCalled()
  expect(error).not.toHaveBeenCalled()
})
test('API and legacy callbacks do not expose credentials in URLs or props', async () => {
  const res = response()
  await callback(request(), res)
  const target = res.redirect.mock.calls[0][1]
  expect(target).not.toMatch(/test-only|access_token|workspace/)
  const req = request()
  const output = await getServerSideProps({
    req,
    res: response(),
    query: req.query
  })
  expect(output).not.toHaveProperty('props')
  expect(output.redirect.destination).not.toMatch(
    /test-only|access_token|workspace/
  )
})
test('production rejects insecure callback configuration', async () => {
  process.env.NODE_ENV = 'production'
  process.env.OAUTH_REDIRECT_URI = 'http://test.example/auth'
  expect((await completeNotionOAuth(request(), response())).status).toBe(503)
  expect(axios.post).not.toHaveBeenCalled()
})
