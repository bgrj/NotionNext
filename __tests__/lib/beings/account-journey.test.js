import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import BeingDesk from '@/themes/my-theme/components/BeingDesk'
import OurBeingsHeaderAuth from '@/themes/my-theme/components/OurBeingsHeaderAuth'
import OurBeingsSignOut from '@/themes/my-theme/components/OurBeingsSignOut'
import {
  LayoutSignIn,
  LayoutSignUp
} from '@/themes/my-theme/components/OurBeingsAuth'

let mockSession
let mockEnabled
const mockSignOut = jest.fn()
const mockSignIn = jest.fn(() => <div aria-label='Clerk 登录步骤' />)
const mockSignUp = jest.fn(() => <div aria-label='Clerk 注册步骤' />)
const mockUseUser = jest.fn(() => mockSession)

jest.mock('@clerk/nextjs', () => ({
  useUser: () => mockUseUser(),
  useClerk: () => ({ signOut: mockSignOut }),
  SignedIn: ({ children }) => (mockSession.isSignedIn ? children : null),
  SignedOut: ({ children }) => (!mockSession.isSignedIn ? children : null),
  SignIn: props => mockSignIn(props),
  SignUp: props => mockSignUp(props)
}))
jest.mock('next/router', () => ({ useRouter: jest.fn() }))
// Style layout is checked by the Next build/browser step. The shared setup
// clears document.head before RTL unmounts, which conflicts with this registry.
jest.mock('styled-jsx/style', () => {
  const Style = () => null
  Style.dynamic = () => ''
  return { __esModule: true, default: Style }
})
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}))
jest.mock('@/components/SmartLink', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}))
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: loader => {
    const React = require('react')
    const Lazy = React.lazy(() =>
      loader().then(component => ({ default: component }))
    )
    return function NativeStep(props) {
      return (
        <React.Suspense fallback={<p>准备步骤</p>}>
          <Lazy {...props} />
        </React.Suspense>
      )
    }
  }
}))
jest.mock('@/themes/my-theme/beings', () => ({
  ...jest.requireActual('@/themes/my-theme/beings'),
  isClerkEnabled: () => mockEnabled
}))

const account = id => ({
  id,
  emailAddresses: [{ id: 'email', emailAddress: `${id}@example.invalid` }],
  primaryEmailAddressId: 'email',
  publicMetadata: { handle: id, name: id, seat: 2 }
})
const payload = (id, title = `${id}-private-note`) => ({
  being: { id, handle: id, name: id, seat: 2, public: false },
  writings: [{ id: `${id}-note`, room: 'existence', title, public: false }]
})
const ok = data => ({ ok: true, json: async () => data })
const deferred = () => {
  let resolve
  let reject
  const promise = new Promise((yes, no) => {
    resolve = yes
    reject = no
  })
  return { promise, resolve, reject }
}
const signedIn = id => {
  mockSession = { isLoaded: true, isSignedIn: true, user: account(id) }
}

beforeEach(() => {
  mockEnabled = true
  mockSession = { isLoaded: true, isSignedIn: false, user: null }
  mockSignOut.mockReset()
  mockSignIn.mockClear()
  mockSignUp.mockClear()
  mockUseUser.mockClear()
  useRouter.mockReturnValue({
    isReady: true,
    query: {},
    asPath: '/our-beings/me'
  })
  fetch.mockReset()
})

test('disabled authentication does not invoke Clerk hooks or private API', () => {
  mockEnabled = false
  render(<BeingDesk />)
  expect(
    screen.getByRole('heading', { name: '登录服务暂未开放' })
  ).toBeInTheDocument()
  expect(mockUseUser).not.toHaveBeenCalled()
  expect(fetch).not.toHaveBeenCalled()
})

test('guest has separate sign-in and sign-up destinations', () => {
  render(<BeingDesk />)
  expect(screen.getByRole('link', { name: '登录' })).toHaveAttribute(
    'href',
    '/sign-in?returnTo=%2Four-beings%2Fme'
  )
  expect(screen.getByRole('link', { name: '创建账户' })).toHaveAttribute(
    'href',
    '/sign-up?returnTo=%2Four-beings%2Fme'
  )
  expect(fetch).not.toHaveBeenCalled()
})

test('unconfirmed account does not display a previous desk or fetch private data', () => {
  mockSession = { isLoaded: false, isSignedIn: undefined, user: null }
  render(<BeingDesk />)
  expect(screen.getByRole('status')).toHaveTextContent('正在准备登录')
  expect(fetch).not.toHaveBeenCalled()
})

test('switching accounts clears fetched notes and unsaved private input before the next response', async () => {
  signedIn('account-a')
  const second = deferred()
  fetch
    .mockResolvedValueOnce(ok(payload('account-a')))
    .mockReturnValueOnce(second.promise)
  const view = render(<BeingDesk />)
  await screen.findByText('account-a-private-note · 私密')
  fireEvent.change(screen.getByLabelText('正文'), {
    target: { value: 'A-unsaved-private-canary' }
  })
  signedIn('account-b')
  view.rerender(<BeingDesk />)
  expect(screen.queryByText(/account-a-private-note/)).not.toBeInTheDocument()
  expect(screen.getByLabelText('正文')).toHaveValue('')
  expect(fetch).toHaveBeenCalledTimes(2)
  await act(async () => second.resolve(ok(payload('account-b'))))
  expect(
    await screen.findByText('account-b-private-note · 私密')
  ).toBeInTheDocument()
})

test('late account A response cannot overwrite account B desk', async () => {
  signedIn('account-a')
  const first = deferred()
  fetch
    .mockReturnValueOnce(first.promise)
    .mockResolvedValueOnce(ok(payload('account-b')))
  const view = render(<BeingDesk />)
  signedIn('account-b')
  view.rerender(<BeingDesk />)
  await screen.findByText('account-b-private-note · 私密')
  await act(async () => first.resolve(ok(payload('account-a'))))
  expect(screen.queryByText(/account-a-private-note/)).not.toBeInTheDocument()
  expect(screen.getByText('account-b-private-note · 私密')).toBeInTheDocument()
})

test('signing out removes private content without waiting for a navigation', async () => {
  signedIn('account-a')
  fetch.mockResolvedValueOnce(ok(payload('account-a')))
  const view = render(<BeingDesk />)
  await screen.findByText('account-a-private-note · 私密')
  mockSession = { isLoaded: true, isSignedIn: false, user: null }
  view.rerender(<BeingDesk />)
  expect(screen.queryByText(/account-a-private-note/)).not.toBeInTheDocument()
  expect(screen.getByRole('link', { name: '登录' })).toBeInTheDocument()
})

test('network failure preserves the current draft and allows a retry', async () => {
  signedIn('account-a')
  fetch
    .mockResolvedValueOnce(ok(payload('account-a')))
    .mockRejectedValueOnce(new Error('synthetic offline'))
  render(<BeingDesk />)
  await screen.findByText('account-a-private-note · 私密')
  fireEvent.change(screen.getByLabelText('正文'), {
    target: { value: 'draft retained' }
  })
  fireEvent.click(screen.getByRole('button', { name: '放下', exact: true }))
  await screen.findAllByText('连接暂时中断。输入仍保留在这里，请稍后再试。')
  expect(screen.getByLabelText('正文')).toHaveValue('draft retained')
  expect(
    screen.getByRole('button', { name: '放下', exact: true })
  ).toBeEnabled()
  const sent = JSON.parse(fetch.mock.calls[1][1].body)
  expect(sent.writing.public).toBe(false)
})

test('logout prevents duplicate submission and displays a recoverable failure', async () => {
  const leaving = deferred()
  mockSignOut
    .mockReturnValueOnce(leaving.promise)
    .mockResolvedValueOnce(undefined)
  render(<OurBeingsSignOut />)
  fireEvent.click(screen.getByRole('button', { name: '退出登录' }))
  expect(screen.getByRole('button', { name: '正在退出…' })).toBeDisabled()
  fireEvent.click(screen.getByRole('button', { name: '正在退出…' }))
  expect(mockSignOut).toHaveBeenCalledTimes(1)
  await act(async () => leaving.reject(new Error('synthetic sign out failure')))
  expect(screen.getByRole('alert')).toHaveTextContent('未能退出')
  fireEvent.click(screen.getByRole('button', { name: '退出登录' }))
  await waitFor(() =>
    expect(screen.getByRole('button', { name: '退出登录' })).toBeEnabled()
  )
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  expect(mockSignOut).toHaveBeenLastCalledWith({
    redirectUrl: '/sign-in?returnTo=%2Four-beings%2Fme&signed_out=1'
  })
})

test('header entry keeps a validated reading destination and exposes logout when signed in', () => {
  useRouter.mockReturnValue({
    isReady: true,
    query: {},
    asPath: '/category/%E9%81%93?topic=freedom'
  })
  const view = render(<OurBeingsHeaderAuth />)
  const login = new URL(screen.getByRole('link', { name: '登录' }).href)
  expect(login.searchParams.get('returnTo')).toBe(
    '/category/%E9%81%93?topic=freedom'
  )
  signedIn('account-a')
  view.rerender(<OurBeingsHeaderAuth />)
  expect(screen.getByRole('link', { name: '我的空间' })).toHaveAttribute(
    'href',
    '/our-beings/me'
  )
  expect(screen.getByRole('button', { name: '退出登录' })).toBeInTheDocument()
})

test.each([
  ['login', LayoutSignIn, mockSignIn, '/sign-in', 'signUpUrl', '/sign-up'],
  ['signup', LayoutSignUp, mockSignUp, '/sign-up', 'signInUrl', '/sign-in']
])(
  '%s keeps native nested security steps and validated return targets',
  async (mode, Page, widget, path, crossKey, crossPath) => {
    useRouter.mockReturnValue({
      isReady: true,
      query: { returnTo: '/dashboard?tab=profile' },
      asPath: path
    })
    render(<Page />)
    await waitFor(() => expect(widget).toHaveBeenCalled())
    const props = widget.mock.calls.at(-1)[0]
    expect(props.routing).toBe('path')
    expect(props.path).toBe(path)
    expect(props.forceRedirectUrl).toBe('/dashboard?tab=profile')
    expect(props[crossKey]).toBe(
      `${crossPath}?returnTo=%2Fdashboard%3Ftab%3Dprofile`
    )
  }
)

test('already signed-in account sees a continue action without another credential form', () => {
  signedIn('account-a')
  useRouter.mockReturnValue({
    isReady: true,
    query: { returnTo: '/category/%E9%81%93' },
    asPath: '/sign-in'
  })
  render(<LayoutSignIn />)
  expect(screen.getByRole('link', { name: '继续访问' })).toHaveAttribute(
    'href',
    '/category/%E9%81%93'
  )
  expect(mockSignIn).not.toHaveBeenCalled()
})

test('slow loading gives retry feedback without pretending to be signed in', () => {
  jest.useFakeTimers()
  mockSession = { isLoaded: false, isSignedIn: undefined, user: null }
  render(<BeingDesk />)
  act(() => jest.advanceTimersByTime(12000))
  expect(screen.getByRole('status')).toHaveTextContent('登录服务加载较慢')
  expect(screen.getByRole('button', { name: '刷新重试' })).toBeInTheDocument()
  expect(fetch).not.toHaveBeenCalled()
  jest.useRealTimers()
})

test('signed-out feedback appears only after Clerk confirms the guest session', async () => {
  useRouter.mockReturnValue({
    isReady: true,
    query: { signed_out: '1' },
    asPath: '/sign-in?signed_out=1'
  })
  render(<LayoutSignIn />)
  expect(screen.getByRole('status')).toHaveTextContent('已退出登录')
  await waitFor(() => expect(mockSignIn).toHaveBeenCalled())
})
