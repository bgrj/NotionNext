import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { TextEncoder, TextDecoder } from 'util'
import { useRouter } from 'next/router'
import CommunityApp from '@/themes/my-theme/components/community/CommunityApp'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
let mockRoute
const mockPush = jest.fn()
const mockLegacyRender = jest.fn()
let counter = 0
Object.defineProperty(global.crypto, 'randomUUID', {
  configurable: true,
  value: () => `uuid_${++counter}`
})
jest.mock('next/router', () => ({ useRouter: jest.fn() }))
jest.mock('@clerk/nextjs', () => ({ useUser: jest.fn(), useClerk: jest.fn() }))
jest.mock('@/lib/config', () => ({
  siteConfig: () => 'https://ourbeings.example.invalid'
}))
jest.mock('@/themes/my-theme/components/BeingDesk', () => ({
  __esModule: true,
  default: () => {
    mockLegacyRender()
    return <p>live legacy</p>
  }
}))
jest.mock('@/themes/my-theme/beings', () => ({
  ...jest.requireActual('@/themes/my-theme/beings'),
  isClerkEnabled: () => false
}))
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}))
jest.mock('styled-jsx/style', () => {
  const Style = () => null
  Style.dynamic = () => ''
  return { __esModule: true, default: Style }
})

const route = (screenPath, demo = true) => {
  mockRoute = {
    isReady: true,
    pathname: '/our-beings/app/[[...screen]]',
    asPath: `/our-beings/app/${screenPath.join('/')}${demo ? '?demo=1' : ''}`,
    query: { screen: screenPath, ...(demo ? { demo: '1' } : {}) },
    push: mockPush
  }
  useRouter.mockReturnValue(mockRoute)
}
beforeEach(() => {
  counter = 0
  window.localStorage.clear()
  route(['demo'])
})

test('demo never mounts live legacy or requests real private data', async () => {
  route(['legacy'])
  render(<CommunityApp />)
  expect(
    await screen.findByRole('heading', { name: '原档案连接真实账号' })
  ).toBeInTheDocument()
  expect(mockLegacyRender).not.toHaveBeenCalled()
  expect(fetch).not.toHaveBeenCalled()
})

test('demo writer sees all four actual collections; switching role clears private notes immediately', async () => {
  render(<CommunityApp />)
  await screen.findByRole('heading', { name: /把生活，放回自己手里/ })
  for (const name of ['生命日志', '个人图书馆', '影像馆', '音频馆'])
    expect(
      await screen.findByRole('heading', { name: new RegExp(name) })
    ).toBeInTheDocument()
  expect(await screen.findByText('把今天，认真地收好')).toBeInTheDocument()
  fireEvent.change(screen.getByLabelText('体验角色'), {
    target: { value: '1' }
  })
  await waitFor(() =>
    expect(screen.queryByText('把今天，认真地收好')).not.toBeInTheDocument()
  )
  expect(screen.getByText(/不是实际账号或活动/)).toBeInTheDocument()
})

test('reader can confirm one synthetic event registration, receive restricted info and cancel', async () => {
  route(['events'])
  const view = render(<CommunityApp />)
  const title = await screen.findByRole('heading', { name: /示例共读/ })
  const url = new URL(title.closest('a').href)
  const id = url.pathname.split('/').at(-1)
  fireEvent.change(screen.getByLabelText('体验角色'), {
    target: { value: '1' }
  })
  route(['events', id])
  view.rerender(<CommunityApp />)
  await screen.findByRole('heading', { name: /示例共读/ })
  expect(screen.queryByText(/示例会议信息/)).not.toBeInTheDocument()
  fireEvent.change(screen.getByLabelText('必要联系信息'), {
    target: { value: '虚构导览联系人' }
  })
  fireEvent.click(screen.getByLabelText('我已阅读安排与参与说明。'))
  fireEvent.click(screen.getByRole('button', { name: '确认免费报名' }))
  expect(await screen.findByText(/示例会议信息/)).toBeInTheDocument()
  jest.spyOn(window, 'confirm').mockReturnValue(true)
  fireEvent.click(screen.getByRole('button', { name: '取消我的报名' }))
  await waitFor(() =>
    expect(screen.queryByText(/示例会议信息/)).not.toBeInTheDocument()
  )
})

test('private editor requires save, explicit preview consent and trusted review before public reading', async () => {
  const view = render(<CommunityApp />)
  const privateTitle = await screen.findByText('把今天，认真地收好')
  const id = new URL(privateTitle.closest('a').href).pathname.split('/').at(-1)
  route(['edit', id])
  view.rerender(<CommunityApp />)
  await screen.findByLabelText('标题')
  fireEvent.change(screen.getByLabelText('正文'), {
    target: { value: '这是明确选择分享的导览文字。' }
  })
  fireEvent.click(screen.getByRole('button', { name: '预览分享范围' }))
  fireEvent.click(
    screen.getByLabelText('我愿意公开最近保存的版本，并确认有权分享这些内容。')
  )
  expect(screen.getByRole('button', { name: '提交公开审核' })).toBeDisabled()
  fireEvent.click(screen.getByRole('button', { name: '保存私密记录' }))
  await screen.findByText(/导览数据：已保存为自己的记录/)
  expect(screen.getByRole('button', { name: '提交公开审核' })).toBeEnabled()
  fireEvent.click(screen.getByRole('button', { name: '提交公开审核' }))
  await screen.findByText(/导览数据：已提交公开审核/)
  fireEvent.change(screen.getByLabelText('体验角色'), {
    target: { value: '2' }
  })
  route(['review'])
  view.rerender(<CommunityApp />)
  await screen.findByRole('button', { name: '通过本次公开版本' })
  fireEvent.click(screen.getByRole('button', { name: '通过本次公开版本' }))
  await screen.findByText(/导览数据：审核结果已保存/)
  fireEvent.change(screen.getByLabelText('体验角色'), {
    target: { value: '1' }
  })
  route(['reading', id])
  view.rerender(<CommunityApp />)
  expect(
    await screen.findByText('这是明确选择分享的导览文字。')
  ).toBeInTheDocument()
})
