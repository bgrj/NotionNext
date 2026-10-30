import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import BeingDesk from '@/themes/my-theme/components/BeingDesk'
import {
  LayoutSignIn,
  LayoutSignUp,
  OurBeingsAccountPrompt
} from '@/themes/my-theme/components/OurBeingsAuth'

let mockUser
let mockRouter
let mockProviderProps
let mockThrow = false
const mockSignOut = jest.fn()
jest.mock('@/components/SmartLink', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <a {...props}>{children}</a>
}))
jest.mock('next/router', () => ({ useRouter: () => mockRouter }))
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <a {...props}>{children}</a>
}))
jest.mock('@clerk/nextjs', () => ({
  useUser: () => mockUser,
  useClerk: () => ({ signOut: mockSignOut })
}))
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: loader => {
    const up = loader.toString().includes('m.SignUp')
    return function ProviderMock(props) {
      if (mockThrow) throw new Error('provider unavailable')
      mockProviderProps = props
      return (
        <div data-testid='provider'>
          {up ? 'Native SignUp' : 'Native SignIn'}
        </div>
      )
    }
  }
}))

beforeEach(() => {
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_placeholder'
  mockUser = { isLoaded: true, isSignedIn: false }
  mockRouter = { isReady: true, query: {} }
  mockProviderProps = undefined
  mockThrow = false
  mockSignOut.mockReset()
})
afterEach(() => {
  delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  jest.useRealTimers()
})

test('sign-in keeps the native provider with explicit local routes and safe target', () => {
  mockRouter.query = {
    returnTo: '/dashboard?tab=profile',
    redirect_url: 'https://evil.example'
  }
  render(<LayoutSignIn />)
  expect(
    screen.getByRole('heading', { name: '回到我的存在。' })
  ).toBeInTheDocument()
  expect(screen.getByTestId('provider')).toHaveTextContent('Native SignIn')
  expect(mockProviderProps).toMatchObject({
    path: '/sign-in',
    routing: 'path',
    forceRedirectUrl: '/dashboard?tab=profile',
    fallbackRedirectUrl: '/dashboard?tab=profile',
    signUpForceRedirectUrl: '/dashboard?tab=profile'
  })
  expect(mockProviderProps.signUpUrl).toBe(
    '/sign-up?returnTo=%2Fdashboard%3Ftab%3Dprofile'
  )
  expect(
    screen.getByRole('link', { name: '注册', exact: true })
  ).toHaveAttribute('href', mockProviderProps.signUpUrl)
})
test('signup uses provider verification instead of faking a registration result', () => {
  render(<LayoutSignUp />)
  expect(screen.getByTestId('provider')).toHaveTextContent('Native SignUp')
  expect(mockProviderProps).toMatchObject({
    path: '/sign-up',
    signInForceRedirectUrl: '/our-beings/me'
  })
  expect(
    screen.getByRole('link', { name: '注册', exact: true })
  ).toHaveAttribute('aria-current', 'page')
})
test.each(['//evil.example', '/sign-in', 'https://ourbeings.com/dashboard'])(
  'unsafe callback %s is not passed to Clerk',
  returnTo => {
    mockRouter.query = { returnTo }
    render(<LayoutSignIn />)
    expect(mockProviderProps.forceRedirectUrl).toBe('/our-beings/me')
  }
)
test('router hydration waits rather than mounting the wrong callback', () => {
  mockRouter.isReady = false
  render(<LayoutSignIn />)
  expect(screen.queryByTestId('provider')).not.toBeInTheDocument()
  expect(screen.getByRole('status')).toHaveTextContent('正在准备登录')
})
test('unknown session waits and exposes retry only after a slow load', () => {
  jest.useFakeTimers()
  mockUser.isLoaded = false
  const { unmount } = render(<LayoutSignIn />)
  expect(screen.queryByTestId('provider')).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', { name: '刷新重试' })
  ).not.toBeInTheDocument()
  act(() => jest.advanceTimersByTime(12000))
  expect(screen.getByRole('button', { name: '刷新重试' })).toBeInTheDocument()
  unmount()
  expect(jest.getTimerCount()).toBe(0)
})
test('signed-in people get an explicit continuation, not another sign-in or automatic write', () => {
  mockUser.isSignedIn = true
  mockRouter.query = { returnTo: '/dashboard' }
  render(<LayoutSignIn />)
  expect(screen.queryByTestId('provider')).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: '继续访问' })).toHaveAttribute(
    'href',
    '/dashboard'
  )
  expect(
    screen.getByRole('link', { name: '我的存在', exact: true })
  ).toHaveAttribute('href', '/our-beings/me')
  expect(mockSignOut).not.toHaveBeenCalled()
})
test('account switch uses provider sign-out and a local sign-in link', async () => {
  mockUser.isSignedIn = true
  mockSignOut.mockResolvedValue(undefined)
  render(<LayoutSignIn />)
  fireEvent.click(screen.getByRole('button', { name: '退出并切换账号' }))
  expect(mockSignOut).toHaveBeenCalledWith({
    redirectUrl: '/sign-in?returnTo=%2Four-beings%2Fme'
  })
  expect(screen.getByRole('button', { name: '正在退出…' })).toBeDisabled()
})
test('failed signout preserves the session UI and can be retried', async () => {
  mockUser.isSignedIn = true
  mockSignOut.mockRejectedValue(new Error('offline'))
  render(<LayoutSignIn />)
  fireEvent.click(screen.getByRole('button', { name: '退出并切换账号' }))
  expect(await screen.findByRole('alert')).toHaveTextContent('未能退出')
  expect(screen.getByRole('button', { name: '退出并切换账号' })).toBeEnabled()
})
test.each(['', '   '])(
  'absent public key shows no fake login controls: %j',
  key => {
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = key
    render(<LayoutSignIn />)
    expect(
      screen.getByRole('heading', { name: '登录服务暂未开放' })
    ).toBeInTheDocument()
    expect(screen.queryByTestId('provider')).not.toBeInTheDocument()
  }
)
test('component failure stays inside the account panel', () => {
  const log = jest.spyOn(console, 'error').mockImplementation(() => {})
  mockThrow = true
  render(<LayoutSignIn />)
  expect(screen.getByRole('alert')).toHaveTextContent('暂时无法打开登录服务')
  expect(
    screen.getByRole('link', { name: /先看看我们的存在/ })
  ).toHaveAttribute('href', '/our-beings')
  log.mockRestore()
})
test('private desk prompt offers separate sign-in and registration links', () => {
  render(<OurBeingsAccountPrompt />)
  expect(
    screen.getByRole('link', { name: '登录', exact: true })
  ).toHaveAttribute('href', '/sign-in?returnTo=%2Four-beings%2Fme')
  expect(screen.getByRole('link', { name: '创建账户' })).toHaveAttribute(
    'href',
    '/sign-up?returnTo=%2Four-beings%2Fme'
  )
})
test('disabled private desk does not lead people to an unusable form', () => {
  render(<OurBeingsAccountPrompt available={false} />)
  expect(
    screen.queryByRole('link', { name: '创建账户' })
  ).not.toBeInTheDocument()
  expect(
    screen.getByRole('link', { name: '浏览我们的存在' })
  ).toBeInTheDocument()
})
test('retains native recovery guidance and existing joining rules without an automatic purchase', () => {
  render(<LayoutSignIn />)
  fireEvent.click(screen.getByText('登录与验证帮助'))
  expect(screen.getByText(/如表单要求验证码/)).toBeInTheDocument()
  fireEvent.click(screen.getByText('注册与现有加入说明'))
  expect(screen.getByText(/创建账户不等于支付/)).toHaveTextContent('100')
  expect(screen.queryByRole('button', { name: /支付/ })).not.toBeInTheDocument()
})

test('the actual private desk renders distinct account entries without initializing any archive', () => {
  const originalFetch = global.fetch
  global.fetch = jest.fn()
  render(<BeingDesk />)
  expect(
    screen.getByRole('link', { name: '登录', exact: true })
  ).toHaveAttribute('href', '/sign-in?returnTo=%2Four-beings%2Fme')
  expect(screen.getByRole('link', { name: '创建账户' })).toHaveAttribute(
    'href',
    '/sign-up?returnTo=%2Four-beings%2Fme'
  )
  expect(global.fetch).not.toHaveBeenCalled()
  global.fetch = originalFetch
})
test('the actual private desk reports unavailable configuration without a provider', () => {
  delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  render(<BeingDesk />)
  expect(
    screen.getByRole('heading', { name: '登录服务暂未开放' })
  ).toBeInTheDocument()
})
test('native appearance follows the site dark-mode class without replacing its form', async () => {
  const { unmount } = render(<LayoutSignIn />)
  await act(async () => document.documentElement.classList.add('dark'))
  expect(mockProviderProps.appearance.variables.colorInputText).toBe('#f3eee5')
  unmount()
  document.documentElement.classList.remove('dark')
})
