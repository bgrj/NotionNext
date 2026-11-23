import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ActivityHub from '@/themes/my-theme/activities/ActivityHub'
import ActivityForm from '@/themes/my-theme/activities/ActivityForm'
import ActivityDetail from '@/themes/my-theme/activities/ActivityDetail'

const mockPush = jest.fn()
let mockSignedIn = false
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    pathname: '/our-beings',
    asPath: '/our-beings',
    push: mockPush
  })
}))
jest.mock('@/components/ClerkSession', () => ({
  useClerkSession: () => ({ isSignedIn: mockSignedIn })
}))
jest.mock('@/components/SmartLink', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <a {...props}>{children}</a>
}))

const event = {
  id: '11111111-1111-4111-8111-111111111111',
  title: '一起读我与你',
  description: '带着一个问题来。',
  startsAt: '2030-01-02T11:30:00Z',
  endsAt: '2030-01-02T13:00:00Z',
  deadline: '2030-01-02T11:00:00Z',
  updatedAt: '2030-01-01T00:00:00Z',
  capacity: 12,
  booked: 0,
  remaining: 12,
  format: 'online',
  discussion: 'site',
  location: '线上',
  kind: 'reading',
  state: 'published',
  status: 'open',
  statusLabel: '可预约',
  announcements: [],
  hostName: '发起人',
  canReserve: true
}
const reply = data =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ version: 1, ...data })
  })
beforeEach(() => {
  mockSignedIn = false
  global.fetch = jest
    .fn()
    .mockImplementation(() => reply({ events: [event], nextOffset: null }))
})
test('visitors can filter activities and receive a real login path before creating', async () => {
  render(<ActivityHub />)
  await screen.findByText(event.title)
  fireEvent.click(screen.getByRole('button', { name: '往期相遇' }))
  expect(screen.queryByText(event.title)).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: '即将相遇' }))
  fireEvent.click(screen.getByRole('button', { name: '发起一次相遇' }))
  expect(screen.getByRole('link', { name: '登录 / 注册' })).toHaveAttribute(
    'href',
    expect.stringContaining('/sign-in')
  )
})
test('signed-in people create a private draft before explicit publication', async () => {
  mockSignedIn = true
  global.fetch.mockImplementation((url, options) =>
    options?.method === 'POST'
      ? reply({ event: { ...event, state: 'draft', isHost: true } })
      : reply({ events: [], nextOffset: null })
  )
  render(<ActivityHub />)
  await screen.findByText('为下一次相遇，留一页空白')
  fireEvent.click(screen.getByRole('button', { name: '发起一次相遇' }))
  fireEvent.change(screen.getByLabelText('活动名称'), {
    target: { value: '一起读我与你' }
  })
  fireEvent.change(screen.getByLabelText('活动介绍'), {
    target: { value: '带着一个问题来。' }
  })
  fireEvent.change(screen.getByLabelText('开始时间'), {
    target: { value: '2030-01-02T19:30' }
  })
  fireEvent.change(screen.getByLabelText('结束时间'), {
    target: { value: '2030-01-02T21:00' }
  })
  fireEvent.change(screen.getByLabelText(/城市、场地或线上方式/), {
    target: { value: '线上' }
  })
  fireEvent.click(screen.getByRole('button', { name: '保存草稿' }))
  await waitFor(() => expect(mockPush).toHaveBeenCalled())
  const writes = global.fetch.mock.calls.filter(
    ([, options]) => options?.method === 'POST'
  )
  expect(writes).toHaveLength(1)
  expect(JSON.parse(writes[0][1].body)).toMatchObject({
    action: 'create',
    startsAt: '2030-01-02T19:30:00+08:00'
  })
})
test('the form changes WeChat participation fields and disables submit while saving', () => {
  render(<ActivityForm busy onSave={jest.fn()} onClose={jest.fn()} />)
  fireEvent.change(screen.getByLabelText('活动交流'), {
    target: { value: 'wechat' }
  })
  expect(screen.getByLabelText(/微信群加入说明/)).toBeRequired()
  expect(screen.getByRole('button', { name: '正在保存…' })).toBeDisabled()
})
test('group instructions are absent for guests and shown only in member responses', () => {
  const props = {
    event,
    onAction: jest.fn(),
    onBack: jest.fn(),
    onEdit: jest.fn(),
    onLogin: jest.fn()
  }
  const { rerender } = render(<ActivityDetail {...props} />)
  expect(screen.queryByText('私密入群口令')).not.toBeInTheDocument()
  rerender(
    <ActivityDetail
      {...props}
      event={{
        ...event,
        discussion: 'wechat',
        reservation: 'confirmed',
        canReserve: false,
        joinInstructions: '私密入群口令'
      }}
    />
  )
  expect(screen.getByText('私密入群口令')).toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: '活动交流群' })
  ).not.toBeInTheDocument()
})
test('only explicit host action cancels an event', () => {
  const action = jest.fn()
  render(
    <ActivityDetail
      event={{ ...event, isHost: true }}
      onAction={action}
      onBack={jest.fn()}
      onEdit={jest.fn()}
      onLogin={jest.fn()}
    />
  )
  fireEvent.click(screen.getByRole('button', { name: '取消这场活动' }))
  expect(action).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: '确认取消活动' }))
  expect(action).toHaveBeenCalledWith('cancelEvent')
})
