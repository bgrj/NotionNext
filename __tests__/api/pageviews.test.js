/** @jest-environment node */
import handler from '@/pages/api/analytics/pageviews'
import { fetchRemoteCounts } from '@/lib/analytics/pageviews'

jest.mock('@/lib/analytics/pageviews', () => {
  const actual = jest.requireActual('@/lib/analytics/pageviews')
  return {
    ...actual,
    fetchRemoteCounts: jest.fn()
  }
})

const response = () => {
  const res = { setHeader: jest.fn(), status: jest.fn(), json: jest.fn(), end: jest.fn() }
  res.status.mockReturnValue(res)
  return res
}

test('POST records same-origin pageviews and sets a first-party visitor cookie', async () => {
  fetchRemoteCounts.mockResolvedValue({
    site_pv: 8,
    site_uv: 3,
    page_pv: 2,
    page_uv: 2
  })
  const res = response()
  await handler(
    {
      method: 'POST',
      headers: { host: 'ourbeings.com' },
      body: { url: 'https://ourbeings.com/philosophy/a' }
    },
    res
  )
  expect(fetchRemoteCounts).toHaveBeenCalledWith({
    pageUrl: 'https://ourbeings.com/philosophy/a',
    isNewUv: true
  })
  expect(res.setHeader).toHaveBeenCalledWith(
    'Set-Cookie',
    expect.arrayContaining([expect.stringContaining('ob_vid=')])
  )
  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.json).toHaveBeenCalledWith({
    site_pv: 8,
    site_uv: 3,
    page_pv: 2,
    page_uv: 2
  })
})

test('foreign URLs and GET do not count', async () => {
  const res = response()
  await handler(
    {
      method: 'POST',
      headers: { host: 'ourbeings.com' },
      body: { url: 'https://evil.example/' }
    },
    res
  )
  expect(fetchRemoteCounts).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(400)

  const getRes = response()
  await handler({ method: 'GET', headers: { host: 'ourbeings.com' } }, getRes)
  expect(getRes.status).toHaveBeenCalledWith(405)
  expect(fetchRemoteCounts).not.toHaveBeenCalled()
})

test('existing visitor cookie is not treated as a new visitor', async () => {
  fetchRemoteCounts.mockResolvedValue({
    site_pv: 1,
    site_uv: 1,
    page_pv: 1,
    page_uv: 1
  })
  const res = response()
  await handler(
    {
      method: 'POST',
      headers: {
        host: 'ourbeings.com',
        cookie: 'ob_vid=keep-me'
      },
      body: { url: 'https://ourbeings.com/' }
    },
    res
  )
  expect(fetchRemoteCounts).toHaveBeenCalledWith({
    pageUrl: 'https://ourbeings.com/',
    isNewUv: false
  })
  expect(res.setHeader).toHaveBeenCalledWith(
    'Set-Cookie',
    expect.arrayContaining([expect.stringContaining('ob_vid=keep-me')])
  )
})

test('same page in the same session does not hit the remote counter', async () => {
  const res = response()
  await handler(
    {
      method: 'POST',
      headers: {
        host: 'ourbeings.com',
        cookie:
          'ob_vid=keep-me; ob_sid=sess; ob_hit=sess:/philosophy/a; ob_stat=/philosophy/a|8|3|2|2'
      },
      body: { url: 'https://ourbeings.com/philosophy/a' }
    },
    res
  )
  expect(fetchRemoteCounts).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.json).toHaveBeenCalledWith({
    site_pv: 8,
    site_uv: 3,
    page_pv: 2,
    page_uv: 2
  })
})
