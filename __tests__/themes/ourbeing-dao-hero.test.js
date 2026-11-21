import React from 'react'
import { render, screen } from '@testing-library/react'
import DaoArticleHero from '@/themes/my-theme/components/DaoArticleHero'

jest.mock('@/lib/config', () => ({ siteConfig: (_key, fallback) => fallback }))
jest.mock('@/components/SmartLink', () => ({ children, ...props }) => (
  <a {...props}>{children}</a>
))
jest.mock('@/components/LazyImage', () => ({ src, alt, className }) => (
  <div>
    <img src={src} alt={alt} className={className} />
  </div>
))

test('article cover and existing pageview counter targets remain available together', () => {
  const { container } = render(
    <DaoArticleHero
      post={{
        title: '长文标题',
        pageCover: '/cover.jpg',
        publishDay: '2026-4-24'
      }}
    />
  )
  expect(screen.getByRole('img', { name: '长文标题的封面' })).toHaveAttribute(
    'src',
    '/cover.jpg'
  )
  expect(
    screen.getByRole('heading', { level: 1, name: '长文标题' })
  ).toBeTruthy()
  expect(screen.getByLabelText('文章访问统计')).toHaveTextContent('访问次数')
  expect(container.querySelector('.busuanzi_value_page_pv')).not.toBeNull()
  expect(container.querySelector('.busuanzi_value_page_uv')).not.toBeNull()
})

test('an article without its own cover uses the site cover', () => {
  render(
    <DaoArticleHero
      post={{ title: '新文章' }}
      siteInfo={{ pageCover: '/site-cover.jpg' }}
    />
  )
  expect(screen.getByRole('img', { name: '新文章的封面' })).toHaveAttribute(
    'src',
    '/site-cover.jpg'
  )
})
