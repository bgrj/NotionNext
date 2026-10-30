/** @jest-environment node */
import middleware from '@/middleware'
import { NextResponse } from 'next/server'
jest.mock('@clerk/nextjs/server', () => ({
  createRouteMatcher: () => () => false,
  clerkMiddleware: fn => fn
}))
jest.mock('next/server', () => {
  function NextResponse(body, init = {}) {
    return {
      body,
      status: init.status,
      headers: { set: jest.fn() }
    }
  }
  NextResponse.next = jest.fn(() => ({
    kind: 'next',
    headers: { set: jest.fn() }
  }))
  NextResponse.redirect = jest.fn((url, status) => ({
    url: String(url),
    status,
    headers: { set: jest.fn() }
  }))
  return { NextResponse }
})
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

const browser =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

test('ordinary browsers can open existence pages', async () => {
  const result = await middleware(
    {
      nextUrl: new URL(
        'https://ourbeings.com/category/%E6%88%91%E7%9A%84%E5%AD%98%E5%9C%A8'
      ),
      headers: new Headers({ 'user-agent': browser })
    },
    {}
  )
  expect(result.kind).toBe('next')
  expect(result.status).toBeUndefined()
})

test('known fetch tools are refused on diary pages', async () => {
  const result = await middleware(
    {
      nextUrl: new URL('https://ourbeings.com/diaries/2025/06/10/r76'),
      headers: new Headers({ 'user-agent': 'curl/8.4.0' })
    },
    {}
  )
  expect(global.fetch).not.toHaveBeenCalled()
  expect(result.status).toBe(403)
  expect(result.body).toBe('此页面不向自动抓取工具提供。')
})
