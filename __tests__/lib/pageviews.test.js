/** @jest-environment node */
const {
  resolvePageUrl,
  parseCounts,
  normalizeCounts,
  parseIbruceJsonp,
  fetchRemoteCounts,
  inspectVisit,
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
    ).toEqual({ site_uv: 2, site_pv: 9, page_pv: 3, page_uv: 2 })
    expect(
      parseIbruceJsonp('BusuanziCallback({"site_pv":10,"page_pv":2,"site_uv":4});')
    ).toEqual({ site_pv: 10, page_pv: 2, site_uv: 4, page_uv: 2 })
    expect(hasUvCookie('ob_vid=abc; other=2')).toBe(true)
    expect(hasUvCookie('ob_site_uv=1')).toBe(true)
    expect(hasUvCookie('theme=dark')).toBe(false)
  })

  test('never displays more people than visits in the same scope', () => {
    expect(
      normalizeCounts({ site_pv: 7, site_uv: 14, page_pv: 7 })
    ).toEqual({ site_pv: 7, site_uv: 7, page_pv: 7, page_uv: 7 })
    expect(
      normalizeCounts({ site_pv: 20, site_uv: 14, page_pv: 7 })
    ).toEqual({ site_pv: 20, site_uv: 14, page_pv: 7, page_uv: 7 })
  })

  test('same browser and page in one session is not a new visitor', () => {
    const first = inspectVisit('', 'https://ourbeings.com/philosophy/a')
    expect(first.isNewVisitor).toBe(true)
    expect(first.samePageSession).toBe(false)
    const again = inspectVisit(
      `ob_vid=${first.vid}; ob_sid=${first.sid}; ob_hit=${first.sid}:/philosophy/a; ob_stat=/philosophy/a|8|3|2|2`,
      'https://ourbeings.com/philosophy/a'
    )
    expect(again.isNewVisitor).toBe(false)
    expect(again.samePageSession).toBe(true)
    expect(again.lastStat).toMatchObject({ page_pv: 2, page_uv: 2 })
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
    expect(counts).toEqual({ site_pv: 5, site_uv: 2, page_pv: 1, page_uv: 1 })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
