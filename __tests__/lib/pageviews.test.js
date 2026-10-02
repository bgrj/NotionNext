/** @jest-environment node */
const {
  resolvePageUrl,
  parseCounts,
  parseIbruceJsonp,
  fetchRemoteCounts,
  hasUvCookie
} = require('@/lib/analytics/pageviews')

describe('pageviews helpers', () => {
  test('accepts same host and www alias', () => {
    expect(
      resolvePageUrl('https://ourbeings.com/philosophy/a', 'ourbeings.com')
    ).toBe('https://ourbeings.com/philosophy/a')
    expect(
      resolvePageUrl('https://www.ourbeings.com/', 'ourbeings.com')
    ).toBe('https://www.ourbeings.com/')
  })

  test('rejects other hosts, protocols and garbage', () => {
    expect(resolvePageUrl('https://evil.example/x', 'ourbeings.com')).toBeNull()
    expect(resolvePageUrl('javascript:alert(1)', 'ourbeings.com')).toBeNull()
    expect(resolvePageUrl('/local', 'ourbeings.com')).toBeNull()
    expect(resolvePageUrl('https://ourbeings.com/a#hash', 'ourbeings.com')).toBe(
      'https://ourbeings.com/a'
    )
  })

  test('parses v2 envelopes and jsonp', () => {
    expect(
      parseCounts({
        status: 'success',
        data: { site_uv: 2, site_pv: 9, page_pv: 3 }
      })
    ).toEqual({ site_uv: 2, site_pv: 9, page_pv: 3 })
    expect(
      parseIbruceJsonp('BusuanziCallback({"site_pv":10,"page_pv":2,"site_uv":4});')
    ).toEqual({ site_pv: 10, page_pv: 2, site_uv: 4 })
    expect(hasUvCookie('ob_site_uv=1; other=2')).toBe(true)
    expect(hasUvCookie('theme=dark')).toBe(false)
  })

  test('uses Vercount v2 then falls back', async () => {
    const fetchMock = jest.fn()
      .mockRejectedValueOnce(new Error('v2 down'))
      .mockResolvedValueOnce({
        ok: true,
        text: async () => '{"site_pv":5,"site_uv":2,"page_pv":1}'
      })
    global.fetch = fetchMock
    const counts = await fetchRemoteCounts({
      pageUrl: 'https://ourbeings.com/',
      isNewUv: true
    })
    expect(counts).toEqual({ site_pv: 5, site_uv: 2, page_pv: 1 })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
