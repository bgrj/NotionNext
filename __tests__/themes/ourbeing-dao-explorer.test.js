/** @jest-environment jsdom */
import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import DaoExplorer from '@/themes/my-theme/components/DaoExplorer'

jest.mock('styled-jsx/style', () => () => null)

jest.mock('@/components/SmartLink', () => ({ href, children, ...props }) => (
  <a href={href} {...props}>
    {children}
  </a>
))
jest.mock('@/lib/config', () => ({ siteConfig: (key, fallback) => fallback }))

const posts = [
  {
    id: '1',
    title: '第一篇',
    href: '/first',
    summary: '思想与日常',
    publishDay: '2026-01-01'
  },
  {
    id: '2',
    title: '第二篇',
    href: '/second',
    summary: '另一种思考',
    tagItems: [{ name: '教育' }]
  },
  { id: '3', title: '第三篇', href: '/third' }
]
beforeAll(() => {
  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  }))
})

test('searches the full provided category and opens only matching article links', () => {
  render(<DaoExplorer daoPosts={posts} />)
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: '教育' } })
  expect(screen.getByText('1 篇')).toBeTruthy()
  expect(
    screen.getByRole('link', { name: /第二篇/ }).getAttribute('href')
  ).toBe('/second')
  expect(screen.queryByText('第一篇')).toBeNull()
  fireEvent.change(screen.getByRole('searchbox'), {
    target: { value: '不存在的词' }
  })
  expect(screen.getByText(/没有找到匹配/)).toBeTruthy()
})

test('manual navigation, list and empty state work', () => {
  const { unmount } = render(<DaoExplorer daoPosts={posts} />)
  expect(screen.queryByRole('button', { name: '暂停轮播' })).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: '下一篇' }))
  expect(screen.getByRole('link', { name: '阅读：第二篇' })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: '文章列表' }))
  expect(screen.getByText('3 篇')).toBeTruthy()
  unmount()
  render(<DaoExplorer daoPosts={[]} />)
  expect(screen.getByText('这里暂时还没有已发布的文章。')).toBeTruthy()
})

test('cycles on a timer and honours reduced motion', () => {
  jest.useFakeTimers()
  const { unmount } = render(<DaoExplorer daoPosts={posts} />)
  act(() => jest.advanceTimersByTime(7000))
  expect(screen.getByRole('link', { name: '阅读：第二篇' })).toBeTruthy()
  unmount()
  window.matchMedia.mockImplementation(() => ({
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  }))
  render(<DaoExplorer daoPosts={posts} />)
  act(() => jest.advanceTimersByTime(14000))
  expect(screen.getByRole('link', { name: '阅读：第一篇' })).toBeTruthy()
  jest.useRealTimers()
})
