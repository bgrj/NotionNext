import { render, screen } from '@testing-library/react'
import SmartLink from '@/components/SmartLink'
import { isAuthFlowPath } from '@/lib/beings/authNavigation'

jest.mock('@/lib/config', () => ({ siteConfig: () => 'https://ourbeings.com' }))
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }) => {
    const url =
      typeof href === 'string'
        ? href
        : `${href.pathname}?${new URLSearchParams(href.query)}`
    return (
      <a href={url} {...props}>
        {children}
      </a>
    )
  }
}))

afterEach(() => window.history.replaceState(null, '', '/'))

test.each([
  '/sign-in',
  '/sign-in/factor-one',
  '/sign-up/verify-email-address',
  '/auth/callback',
  '/sso-callback'
])('recognizes authentication path %s', path => {
  expect(isAuthFlowPath(path)).toBe(true)
})
test.each(['/our-beings', '/category/道', '/authorship', undefined])(
  'does not confuse ordinary path %s with authentication',
  path => {
    expect(isAuthFlowPath(path)).toBe(false)
  }
)
test.each(['/sign-in', '/sign-up/verify-email-address'])(
  'leaving %s does not copy tickets or redirect queries to public links',
  path => {
    window.history.replaceState(
      null,
      '',
      `${path}?__clerk_ticket=synthetic-ticket&returnTo=%2Fdashboard&redirect_url=%2Fdashboard`
    )
    render(<SmartLink href='/our-beings'>公开阅读</SmartLink>)
    expect(
      screen.getByRole('link', { name: '公开阅读' }).getAttribute('href')
    ).toBe('/our-beings')
  }
)
test('normal reading query behavior is preserved outside the authentication flow', () => {
  window.history.replaceState(null, '', '/category/道?topic=freedom')
  render(<SmartLink href='/our-beings'>公开阅读</SmartLink>)
  const url = new URL(screen.getByRole('link', { name: '公开阅读' }).href)
  expect(url.searchParams.get('topic')).toBe('freedom')
})
