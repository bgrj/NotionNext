/** @jest-environment node */
import middleware from '@/middleware'
import { NextResponse } from 'next/server'
jest.mock('@clerk/nextjs/server', () => ({
  createRouteMatcher: () => () => false,
  clerkMiddleware: fn => fn
}))
jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(() => ({ kind: 'next' })),
    redirect: jest.fn((url, status) => ({ url: String(url), status }))
  }
}))
jest.mock('@/blog.config', () => ({
  __esModule: true,
  default: { UUID_REDIRECT: true, LINK: 'https://ourbeings.com' }
}))
const originalFetch = global.fetch
beforeEach(() => {
  global.fetch = jest.fn()
})
afterEach(() => {
  global.fetch = originalFetch
})
test.each(['/', '/archive', '/philosophy/2026/09/27/diy2', '/api/user'])(
  'ordinary request %s never fetches redirect.json',
  async path => {
    await middleware({ nextUrl: new URL('https://ourbeings.com' + path) }, {})
    expect(global.fetch).not.toHaveBeenCalled()
    expect(NextResponse.next).toHaveBeenCalled()
  }
)
test('old ID lookup uses trusted configured origin, not attacker-controlled request origin', async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => ({
      '609ca340-a289-839e-a91b-01294f29c02b': 'philosophy/2026/09/27/diy2'
    })
  })
  const result = await middleware(
    {
      nextUrl: Object.assign(
        new URL('https://untrusted.example/609ca340a289839ea91b01294f29c02b'),
        {
          clone() {
            return new URL(this)
          }
        }
      )
    },
    {}
  )
  expect(String(global.fetch.mock.calls[0][0])).toBe(
    'https://ourbeings.com/redirect.json'
  )
  expect(global.fetch.mock.calls[0][1]).toMatchObject({ redirect: 'error' })
  expect(result.status).toBe(308)
})
