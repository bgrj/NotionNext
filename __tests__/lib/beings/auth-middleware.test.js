/** @jest-environment node */
const mockProtect = jest.fn()
jest.mock('@clerk/nextjs/server', () => ({
  clerkMiddleware: fn => fn,
  createRouteMatcher: patterns => req =>
    patterns.some(pattern => {
      const prefix = pattern.replace('(.*)', '')
      return req.nextUrl.pathname.startsWith(prefix)
    })
}))
jest.mock('@/blog.config', () => ({
  __esModule: true,
  default: { UUID_REDIRECT: false, LINK: 'https://ourbeings.com' }
}))
jest.mock('next/server', () => {
  function NextResponse(body, init = {}) {
    return {
      body,
      status: init.status || 200,
      headers: { set: jest.fn() },
      kind: 'raw'
    }
  }
  NextResponse.next = jest.fn(() => ({
    kind: 'next',
    headers: { set: jest.fn() }
  }))
  NextResponse.redirect = jest.fn(url => ({
    kind: 'redirect',
    url: String(url),
    headers: { set: jest.fn() }
  }))
  return { NextResponse }
})
const previousKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
let handleClerkAuth
let middleware
beforeAll(() => {
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_placeholder'
  const loaded = require('@/middleware')
  handleClerkAuth = loaded.handleClerkAuth
  middleware = loaded.default
})
afterAll(() => {
  if (previousKey === undefined)
    delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  else process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = previousKey
})
const request = (path, userAgent = 'Mozilla/5.0') => ({
  nextUrl: new URL(`https://ourbeings.com${path}`),
  url: `https://ourbeings.com${path}`,
  headers: new Headers({ 'user-agent': userAgent })
})
const wechat =
  'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Mobile MicroMessenger/8.0.54 WeChat/arm64'
test('protected guest navigation produces the same relative target consumed by the form', () => {
  const auth = () => ({ userId: null, protect: mockProtect })
  const result = handleClerkAuth(auth, request('/dashboard/settings?tab=profile'))
  const url = new URL(result.url)
  expect(url.pathname).toBe('/sign-in')
  expect(url.searchParams.get('returnTo')).toBe(
    '/dashboard/settings?tab=profile'
  )
  expect(url.searchParams.has('redirectTo')).toBe(false)
})
test('signed-in navigation still reaches the existing protected page', () => {
  const auth = () => ({ userId: 'fictional-test-user', protect: mockProtect })
  expect(handleClerkAuth(auth, request('/dashboard')).kind).toBe('next')
})
test.each(['/sign-in', '/sign-up/verify-email-address', '/our-beings'])(
  'public account and content path %s does not gain an auth loop',
  path => {
    const auth = () => ({ userId: null, protect: mockProtect })
    expect(handleClerkAuth(auth, request(path)).kind).toBe('next')
  }
)
test('wechat opens the page instead of the clerk development handshake', async () => {
  const result = await middleware(request('/', wechat))
  expect(result.kind).toBe('next')
  expect(String(result.url || '')).not.toContain('accounts.dev')
})
test('scripted clients do not receive public html', async () => {
  const result = await middleware(request('/philosophy/about', 'python-requests/2.32.3'))
  expect(result.status).toBe(403)
  expect(result.body).toBe('此页面不向自动抓取工具提供。')
})
test('wechat is not classified as a scraper', async () => {
  const result = await middleware(request('/philosophy/about', wechat))
  expect(result.status).not.toBe(403)
  expect(result.kind).toBe('next')
})
test('mini-program API skips Clerk even without a MicroMessenger user-agent', async () => {
  const result = await middleware(
    request('/api/our-beings/mini', 'wechatdevtools')
  )
  expect(result.kind).toBe('next')
  expect(String(result.url || '')).not.toContain('accounts.dev')
})
