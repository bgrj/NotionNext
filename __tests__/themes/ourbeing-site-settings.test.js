import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import SiteSettings from '@/themes/my-theme/components/SiteSettings'
import Header from '@/themes/my-theme/components/Header'
import { settingsMenu } from '@/themes/my-theme/settingsMenu'
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
  default: ({ children, passHref, ...props }) => <a {...props}>{children}</a>
}))
jest.mock('@/themes/my-theme/beings', () => ({
  DESK_HREF: '/our-beings/me',
  isClerkEnabled: () => mockClerkEnabled
}))
jest.mock('@/components/ClerkSession', () => ({
  useClerkSession: () => ({
    active: mockSignedIn,
    isLoaded: true,
    isSignedIn: mockSignedIn,
    user: null,
    signOut: async () => {}
  })
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
  mockGlobal.usesDefaultAppearance = false
  mockGlobal.setDarkMode = undefined
  mockGlobal.resetAppearance = jest.fn()
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

test('settings keep interface controls and leave the home plates on the page', () => {
  render(<SiteSettings />)
  open()
  const dialog = screen.getByRole('dialog', { name: '网站设置' })
  expect(dialog).toHaveTextContent('外观模式')
  expect(dialog).toHaveTextContent('界面语言')
  expect(dialog).toHaveTextContent('账户')
  for (const name of ['道', '术', '我们的存在', '我的存在']) {
    expect(screen.queryByRole('link', { name })).toBeNull()
    expect(screen.queryByRole('button', { name })).toBeNull()
  }
})

test('site default can be restored and an explicit light preference is saved from auto mode', () => {
  mockGlobal.usesDefaultAppearance = true
  mockGlobal.setDarkMode = jest.fn()
  render(<SiteSettings />)
  open()
  expect(screen.getByRole('button', { name: '跟随站点' })).toHaveAttribute(
    'aria-pressed',
    'true'
  )
  fireEvent.click(screen.getByRole('button', { name: '浅色' }))
  expect(mockGlobal.setDarkMode).toHaveBeenCalledWith(false)
  fireEvent.click(screen.getByRole('button', { name: '跟随站点' }))
  expect(mockGlobal.resetAppearance).toHaveBeenCalledTimes(1)
})

test('Notion public menus appear without unpublished or all-category archive links', () => {
  const menu = [
    { title: '首页', href: '/', status: 'Published' },
    { title: '意见反馈', href: '/feedback', status: 'Published' },
    { title: '后台', href: '/private', status: 'Invisible' },
    { title: '草稿', href: '/draft', status: 'Draft' },
    {
      title: '往期整理',
      href: '/#',
      subMenus: [{ title: '历史归档', href: '/archive' }]
    },
    { title: '不合法地址', href: 'javascript:alert(1)' },
    { title: '错误地址', href: 'https://%' }
  ]
  expect(settingsMenu(menu, ['dao']).map(x => x.title)).toEqual([
    '首页',
    '意见反馈'
  ])
  render(<SiteSettings customMenu={menu} />)
  open()
  expect(
    screen.getByRole('navigation', { name: '网站介绍' })
  ).toHaveTextContent('意见反馈')
  expect(screen.queryByRole('link', { name: '后台' })).toBeNull()
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
