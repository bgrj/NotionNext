import {
  authHref,
  authReturnFromQuery,
  safeAuthReturnPath,
  AUTH_DEFAULT_RETURN
} from '@/lib/beings/authNavigation'
import { DESK_HREF } from '@/themes/my-theme/beings'

test('account default remains the existing private desk', () => {
  expect(AUTH_DEFAULT_RETURN).toBe(DESK_HREF)
})
test.each([
  '/',
  '/our-beings/me',
  '/dashboard/settings?tab=profile#name',
  '/category/%E9%81%93',
  '/user/organization-selector',
  '/admin/a/memberships'
])('preserves local destination %s', value => {
  expect(safeAuthReturnPath(value)).toBe(value)
})
test.each([
  undefined,
  null,
  true,
  [],
  ['/dashboard'],
  {},
  '',
  ' dashboard',
  'https://evil.example',
  'https://ourbeings.com/dashboard',
  '//evil.example',
  '/\\evil.example',
  '/%5cevil.example',
  '/%2fevil.example',
  '/%252fevil.example',
  '/%25252fevil.example',
  '/%2525252fevil.example',
  '/%0d%0aLocation:evil',
  '/\nevil',
  '/broken%zz',
  '/sign-in',
  '/sign-in/factor-one?returnTo=/dashboard',
  '/sign-up/verify-email-address',
  '/auth/result',
  '/api/beings/me',
  '/_next/data/x',
  '/%61pi/beings/me',
  '/folder/../sign-in',
  '/%2e%2e/api/user',
  'javascript:alert(1)',
  '/' + 'x'.repeat(2049)
])('rejects unsafe, internal or looping return destination %#', value => {
  expect(safeAuthReturnPath(value)).toBe(DESK_HREF)
})
test('new and legacy relative query names resolve to the same destination', () => {
  for (const key of ['returnTo', 'redirectTo', 'redirect_url']) {
    expect(authReturnFromQuery({ [key]: '/dashboard?tab=profile' })).toBe(
      '/dashboard?tab=profile'
    )
  }
})
test('does not fall through to another query after an invalid primary target', () => {
  expect(
    authReturnFromQuery({
      returnTo: '//evil.example',
      redirect_url: '/dashboard'
    })
  ).toBe(DESK_HREF)
})
test('mode links preserve only a validated returnTo, not arbitrary incoming query data', () => {
  const url = new URL(
    authHref('up', '/dashboard?tab=profile#name'),
    'https://ourbeings.com'
  )
  expect(url.pathname).toBe('/sign-up')
  expect([...url.searchParams.keys()]).toEqual(['returnTo'])
  expect(url.searchParams.get('returnTo')).toBe('/dashboard?tab=profile#name')
  expect(authHref('in', '//evil.example')).toBe(
    `/sign-in?returnTo=${encodeURIComponent(DESK_HREF)}`
  )
})
