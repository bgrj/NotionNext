import React from 'react'
import {
  fireEvent,
  render,
  screen,
  act,
  createEvent
} from '@testing-library/react'
import HeroPuzzle from '@/themes/my-theme/components/HeroPuzzle'

const mockPush = jest.fn()
jest.mock('next/router', () => ({ useRouter: () => ({ push: mockPush }) }))
jest.mock('@/lib/config', () => ({ siteConfig: (_key, fallback) => fallback }))
jest.mock('styled-jsx/style', () => ({ __esModule: true, default: () => null }))

beforeEach(() => {
  mockPush.mockClear()
  jest.useFakeTimers()
})
afterEach(() => {
  jest.useRealTimers()
})
const touch = element => {
  const event = createEvent.pointerDown(element)
  Object.defineProperty(event, 'pointerType', { value: 'touch' })
  fireEvent(element, event)
  fireEvent.click(element, { detail: 1 })
}

test('desktop shows a transient preview on hover and removes it on leave', () => {
  render(<HeroPuzzle />)
  const dao = screen.getByRole('link', { name: '道' })
  expect(screen.queryByRole('status')).toBeNull()
  fireEvent.pointerEnter(dao)
  expect(screen.getByRole('status')).toHaveTextContent('阅读「道」系列')
  fireEvent.pointerLeave(dao)
  act(() => jest.advanceTimersByTime(200))
  expect(screen.queryByRole('status')).toBeNull()
  fireEvent.click(dao)
  expect(mockPush).toHaveBeenCalledWith('/category/道')
})

test('first touch previews Dao; the explicit read button navigates', () => {
  render(<HeroPuzzle />)
  touch(screen.getByRole('link', { name: '道' }))
  expect(mockPush).not.toHaveBeenCalled()
  expect(screen.getByRole('status')).toHaveTextContent('道')
  expect(screen.getByRole('status')).not.toHaveTextContent('阅读「道」系列')
  expect(screen.getAllByText('阅读「道」系列')).toHaveLength(1)
  fireEvent.click(screen.getByRole('link', { name: '阅读「道」系列' }))
  expect(mockPush).toHaveBeenCalledWith('/category/道')
})

test('a second touch on Dao can also enter the series', () => {
  render(<HeroPuzzle />)
  const dao = screen.getByRole('link', { name: '道' })
  touch(dao)
  touch(dao)
  expect(mockPush).toHaveBeenCalledTimes(1)
})

test('术 temporarily opens the IELTS practice', () => {
  render(<HeroPuzzle />)
  const shu = screen.getByRole('link', { name: '术' })
  expect(shu).toHaveAttribute('href', 'https://ourbeings.com/ielts/')
  fireEvent.pointerEnter(shu)
  expect(screen.getByRole('status')).toHaveTextContent('进入雅思练习')
  const event = createEvent.click(shu)
  fireEvent(shu, event)
  expect(event.defaultPrevented).toBe(false)
  expect(mockPush).not.toHaveBeenCalled()
})

test('first touch previews 术; the practice link opens IELTS', () => {
  render(<HeroPuzzle />)
  const shu = screen.getByRole('link', { name: '术' })
  touch(shu)
  expect(mockPush).not.toHaveBeenCalled()
  expect(screen.getByRole('status')).toHaveTextContent('术')
  expect(screen.getByRole('status')).toHaveTextContent('雅思练习')
  const action = screen.getByRole('link', { name: '进入雅思练习' })
  expect(action).toHaveAttribute('href', 'https://ourbeings.com/ielts/')
  const event = createEvent.click(action)
  fireEvent(action, event)
  expect(event.defaultPrevented).toBe(false)
  expect(mockPush).not.toHaveBeenCalled()
})

test('a second touch on 术 opens the IELTS practice', () => {
  render(<HeroPuzzle />)
  const shu = screen.getByRole('link', { name: '术' })
  touch(shu)
  const event = createEvent.click(shu)
  Object.defineProperty(event, 'detail', { value: 1 })
  fireEvent(shu, event)
  expect(event.defaultPrevented).toBe(false)
  expect(mockPush).not.toHaveBeenCalled()
})

test('our beings opens the Wuzai web hub on desktop and on a second touch', () => {
  render(<HeroPuzzle />)
  const hub = screen.getByRole('link', { name: '我们的存在' })
  expect(hub).toHaveAttribute('href', '/our-beings')
  fireEvent.pointerEnter(hub)
  expect(screen.getByRole('status')).toHaveTextContent('进入吾在')
  fireEvent.click(hub)
  expect(mockPush).toHaveBeenLastCalledWith('/our-beings')
  mockPush.mockClear()
  touch(hub)
  expect(mockPush).not.toHaveBeenCalled()
  expect(screen.getByRole('status')).toHaveTextContent('阅读与交流')
  expect(screen.getByRole('status')).not.toHaveTextContent('开发中')
  const action = screen.getByRole('link', { name: '进入吾在' })
  expect(action).toHaveAttribute('href', '/our-beings')
  fireEvent.click(action)
  expect(mockPush).toHaveBeenLastCalledWith('/our-beings')
  mockPush.mockClear()
  touch(hub)
  expect(mockPush).toHaveBeenCalledWith('/our-beings')
})

test.each(['我的存在'])(
  '%s never navigates and supports keyboard previews',
  name => {
    render(<HeroPuzzle />)
    const section = screen.getByRole('button', { name })
    touch(section)
    expect(screen.getByRole('status')).toHaveTextContent('开发中……')
    expect(mockPush).not.toHaveBeenCalled()
    fireEvent.keyDown(section, { key: 'Escape' })
    expect(screen.queryByRole('status')).toBeNull()
    fireEvent.keyDown(section, { key: 'Enter' })
    expect(screen.getByRole('status')).toHaveTextContent('开发中……')
    expect(mockPush).not.toHaveBeenCalled()
  }
)
