/** @jest-environment node */
const {
  getImageRemotePatterns,
  getSecurityHeaders
} = require('@/lib/security/sitePolicy')

describe('site security policy', () => {
  test('remote optimizer accepts only allowlisted HTTPS domains', () => {
    const patterns = getImageRemotePatterns(
      'images.example.com,images.example.com'
    )
    expect(patterns).toContainEqual({
      protocol: 'https',
      hostname: 'images.example.com'
    })
    expect(
      patterns.filter(p => p.hostname === 'images.example.com')
    ).toHaveLength(1)
    expect(
      patterns.every(p => p.protocol === 'https' && !p.hostname.includes('*'))
    ).toBe(true)
  })
  test.each([
    '*',
    '**',
    '*.example.com',
    'localhost',
    '127.0.0.1',
    '169.254.169.254',
    'images.internal',
    'http://images.example.com',
    '../example.com'
  ])('rejects unsafe configured host %s', host => {
    expect(() => getImageRemotePatterns(host)).toThrow()
  })
  test('baseline protects framing and object embedding without breaking custom JS', () => {
    const headers = Object.fromEntries(
      getSecurityHeaders().map(h => [h.key, h.value])
    )
    expect(headers['X-Content-Type-Options']).toBe('nosniff')
    expect(headers['Content-Security-Policy']).toContain(
      "frame-ancestors 'self'"
    )
    expect(headers['Content-Security-Policy']).toContain("object-src 'none'")
    expect(headers['Content-Security-Policy']).not.toContain('script-src')
    expect(headers).not.toHaveProperty('Access-Control-Allow-Credentials')
    expect(headers).not.toHaveProperty('Access-Control-Allow-Origin')
  })
  test('Next routes apply asset caching in headers, never in redirects', async () => {
    const config = require('@/next.config')
    const redirects = await config.redirects()
    const headers = await config.headers()
    expect(redirects.every(r => typeof r.destination === 'string')).toBe(true)
    expect(
      headers.find(h => h.source === '/assets/ourbeing/:path*').headers
    ).toContainEqual({
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable'
    })
    expect(config.images.dangerouslyAllowSVG).toBe(false)
    expect(config.images.maximumResponseBody).toBe(10 * 1024 * 1024)
  })
})
