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
  expect(screen.getByRole('status')).toHaveTextContent('阅读「道」系列')
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

test.each(['我们的存在', '我的存在', '术'])(
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
