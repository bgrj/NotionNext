import {
  getNotionRedirectId,
  safeRedirectPath
} from '@/lib/utils/notionRedirect'

const uuid = '609ca340-a289-839e-a91b-01294f29c02b'
const compact = uuid.replace(/-/g, '')
test.each([
  '/',
  '/archive',
  '/philosophy/2026/09/27/diy2',
  '/api/' + compact,
  '/_next/' + compact,
  '/' + 'z'.repeat(32)
])('ordinary route %s does not need a redirect table', path => {
  expect(getNotionRedirectId(path)).toBeNull()
})
test.each([
  '/article/' + compact,
  '/' + uuid,
  '/' + compact.toUpperCase() + '/',
  '/en/' + uuid
])('old Notion ID route %s retains redirect support', path => {
  expect(getNotionRedirectId(path)).toBe(uuid)
})
test.each([false, 'false', '0', 'off', 'no'])(
  'disabled UUID redirects %s never fetch',
  enabled => {
    expect(getNotionRedirectId('/' + compact, enabled)).toBeNull()
  }
)
test.each([
  '//evil.example',
  'https://evil.example',
  '\\evil.example',
  '/post?token=test',
  '/post#fragment',
  '/post\r\nLocation:bad',
  ''
])('rejects unsafe redirect path %s', path => {
  expect(safeRedirectPath(path)).toBeNull()
})
test('keeps valid same-origin slugs', () => {
  expect(safeRedirectPath('philosophy/2026/09/27/diy2')).toBe(
    '/philosophy/2026/09/27/diy2'
  )
  expect(safeRedirectPath('/article/中文')).toBe('/article/中文')
})
