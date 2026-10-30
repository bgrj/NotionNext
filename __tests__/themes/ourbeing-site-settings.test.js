import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import SiteSettings from '@/themes/my-theme/components/SiteSettings'
import Header from '@/themes/my-theme/components/Header'
import {
  articleOpacity,
  articleBackground,
  ARTICLE_BACKGROUND,
  uiLanguageOptions
} from '@/themes/my-theme/readingSettings'

const mockGlobal = {
  lang: 'zh-CN',
  isDarkMode: false,
  changeLang: jest.fn(),
  toggleDarkMode: jest.fn()
}
let mockSignedIn = false
let mockClerkEnabled = false
const mockHandlers = {}
const mockRouter = {
  events: {
    on: jest.fn((name, fn) => {
      mockHandlers[name] = fn
    }),
    off: jest.fn()
  }
}
// The production throttle alias does not expose Lodash's cancel method.
jest.mock('lodash.throttle', () => ({ __esModule: true, default: fn => fn }), {
  virtual: true
})
jest.mock('@/lib/global', () => ({ useGlobal: () => mockGlobal }))
jest.mock('next/router', () => ({ useRouter: () => mockRouter }))
jest.mock('@/lib/config', () => ({ siteConfig: (_key, fallback) => fallback }))
jest.mock('styled-jsx/style', () => ({
  __esModule: true,
  default: ({ children }) => <style>{children}</style>
}))
jest.mock(
  'next/dynamic',
  () => () =>
    function AccountFixture(props) {
      const Account =
        require('@/themes/my-theme/components/OurBeingsHeaderAuth').default
      return <Account {...props} />
    }
)
jest.mock('@/components/SmartLink', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <a {...props}>{children}</a>
}))
jest.mock('@/themes/my-theme/beings', () => ({
  DESK_HREF: '/our-beings/me',
  isClerkEnabled: () => mockClerkEnabled
}))
jest.mock('@clerk/nextjs', () => ({
  SignedIn: ({ children }) => (mockSignedIn ? children : null),
  SignedOut: ({ children }) => (mockSignedIn ? null : children)
}))

beforeEach(() => {
  mockGlobal.lang = 'zh-CN'
  mockGlobal.isDarkMode = false
  mockSignedIn = false
  mockClerkEnabled = false
})
const open = () =>
  fireEvent.click(screen.getByRole('button', { name: '网站设置' }))

test('hamburger opens an accessible dialog; Escape closes and restores focus', () => {
  render(<SiteSettings />)
  const trigger = screen.getByRole('button', { name: '网站设置' })
  expect(trigger.querySelector('svg')).not.toBeNull()
  expect(screen.queryByRole('dialog')).toBeNull()
  open()
  expect(trigger).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByRole('button', { name: '浅色' })).toHaveFocus()
  fireEvent.keyDown(document, { key: 'Escape' })
  expect(screen.queryByRole('dialog')).toBeNull()
  expect(trigger).toHaveFocus()
})

test('explicit appearance buttons do not toggle an already selected mode', () => {
  const { rerender } = render(<SiteSettings />)
  open()
  fireEvent.click(screen.getByRole('button', { name: '浅色' }))
  expect(mockGlobal.toggleDarkMode).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: '深色' }))
  expect(mockGlobal.toggleDarkMode).toHaveBeenCalledTimes(1)
  mockGlobal.isDarkMode = true
  rerender(<SiteSettings />)
  expect(screen.getByRole('button', { name: '深色' })).toHaveAttribute(
    'aria-pressed',
    'true'
  )
  fireEvent.click(screen.getByRole('button', { name: '深色' }))
  expect(mockGlobal.toggleDarkMode).toHaveBeenCalledTimes(1)
})

test('language selection requests persistence and localizes the settings UI', () => {
  const { rerender } = render(<SiteSettings />)
  open()
  fireEvent.change(screen.getByLabelText('界面语言'), {
    target: { value: 'en-US' }
  })
  expect(mockGlobal.changeLang).toHaveBeenCalledWith('en-US', true)
  mockGlobal.lang = 'en-US'
  rerender(<SiteSettings />)
  expect(screen.getByRole('dialog', { name: 'Site settings' })).toBeTruthy()
  expect(
    screen.getByText(/articles stay in their original language/)
  ).toBeTruthy()
})

test('outside pointer and focus close the panel', () => {
  render(
    <>
      <SiteSettings />
      <button>outside</button>
    </>
  )
  open()
  fireEvent.pointerDown(screen.getByRole('button', { name: 'outside' }))
  expect(screen.queryByRole('dialog')).toBeNull()
  open()
  fireEvent.focusIn(screen.getByRole('button', { name: 'outside' }))
  expect(screen.queryByRole('dialog')).toBeNull()
})

test('navigation closes the panel', () => {
  render(<SiteSettings />)
  open()
  fireEvent.click(screen.getByRole('link', { name: '登录' }))
  expect(screen.queryByRole('dialog')).toBeNull()
})

test.each([false, true])(
  'guests keep separate login and signup links (Clerk enabled: %s)',
  enabled => {
    mockClerkEnabled = enabled
    render(<SiteSettings />)
    open()
    expect(screen.getByRole('link', { name: '登录' })).toHaveAttribute(
      'href',
      '/sign-in'
    )
    expect(screen.getByRole('link', { name: '注册' })).toHaveAttribute(
      'href',
      '/sign-up'
    )
  }
)

test('authenticated visitors retain the profile entry', () => {
  mockClerkEnabled = true
  mockSignedIn = true
  render(<SiteSettings />)
  open()
  expect(screen.getByRole('link', { name: '我的档案' })).toHaveAttribute(
    'href',
    '/our-beings/me'
  )
  expect(screen.queryByRole('link', { name: '登录' })).toBeNull()
})

test.each([
  ['0.8', 0.8],
  [5, 1],
  [-1, 0],
  ['bad', 0.82],
  ['', 0.82],
  [null, 0.82],
  [false, 0.82]
])('opacity %s has a bounded fallback', (value, expected) => {
  expect(articleOpacity(value, 0.82)).toBe(expected)
})

test('background paths cannot break CSS and invalid UI languages fall back safely', () => {
  expect(articleBackground('/assets/hand.webp')).toBe('/assets/hand.webp')
  expect(articleBackground('https://example.com/hand.webp')).toContain(
    'https://'
  )
  for (const input of [
    'javascript:alert(1)',
    '//evil.example/image',
    '/a";color:red',
    null
  ]) {
    expect(articleBackground(input)).toBe(ARTICLE_BACKGROUND)
  }
  expect(uiLanguageOptions(['invalid'], 'zh-CN')).toEqual(['zh-CN', 'en-US'])
  expect(uiLanguageOptions(['en-US', 'en-US'], 'zh-TW')).toEqual([
    'en-US',
    'zh-TW'
  ])
})

test('the real header keeps settings mounted and supports throttle implementations without cancel', () => {
  const { container, unmount } = render(
    <div id='theme-my-theme'>
      <Header />
    </div>
  )
  fireEvent.click(container.querySelector('.ob-settings-trigger'))
  expect(container.querySelector('[role="dialog"]')).not.toBeNull()
  expect(container.querySelector('#sticky-nav')).toHaveClass(
    'ob-nav-settings-open'
  )
  fireEvent.keyDown(document, { key: 'Escape' })
  expect(container.querySelector('#sticky-nav')).not.toHaveClass(
    'ob-nav-settings-open'
  )
  expect(() => unmount()).not.toThrow()
})
