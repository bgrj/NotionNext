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
jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(() => ({ kind: 'next', headers: { set: jest.fn() } })),
    redirect: jest.fn(url => ({
      kind: 'redirect',
      url: String(url),
      headers: { set: jest.fn() }
    }))
  }
}))
const previousKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
let middleware
beforeAll(() => {
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_placeholder'
  middleware = require('@/middleware').default
})
afterAll(() => {
  if (previousKey === undefined)
    delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  else process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = previousKey
})
const request = path => ({
  nextUrl: new URL(`https://ourbeings.com${path}`),
  url: `https://ourbeings.com${path}`,
  headers: new Headers({ 'user-agent': 'Mozilla/5.0' })
})
test('protected guest navigation produces the same relative target consumed by the form', () => {
  const auth = () => ({ userId: null, protect: mockProtect })
  const result = middleware(auth, request('/dashboard/settings?tab=profile'))
  const url = new URL(result.url)
  expect(url.pathname).toBe('/sign-in')
  expect(url.searchParams.get('returnTo')).toBe(
    '/dashboard/settings?tab=profile'
  )
  expect(url.searchParams.has('redirectTo')).toBe(false)
})
test('signed-in navigation still reaches the existing protected page', () => {
  const auth = () => ({ userId: 'fictional-test-user', protect: mockProtect })
  expect(middleware(auth, request('/dashboard')).kind).toBe('next')
})
test.each(['/sign-in', '/sign-up/verify-email-address', '/our-beings'])(
  'public account and content path %s does not gain an auth loop',
  path => {
    const auth = () => ({ userId: null, protect: mockProtect })
    expect(middleware(auth, request(path)).kind).toBe('next')
  }
)
