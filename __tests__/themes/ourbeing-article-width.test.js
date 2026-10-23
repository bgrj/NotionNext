import React from 'react'
import { fireEvent, render, screen, cleanup } from '@testing-library/react'

const mockGlobal = {
  onLoading: false,
  fullWidth: false,
  locale: { POST: { TOP: '目录' } }
}
const mockRouter = {
  pathname: '/[prefix]/[slug]/[...suffix]',
  route: '/[prefix]/[slug]/[...suffix]',
  asPath: '/philosophy/2026/10/23/18',
  query: {},
  push: jest.fn()
}

jest.mock('@/lib/global', () => ({ useGlobal: () => mockGlobal }))
jest.mock('next/router', () => ({ useRouter: () => mockRouter }))
jest.mock('@/lib/config', () => ({
  siteConfig: (key, fallback) => {
    if (key === 'HEXO_WIDGET_TOC' || key === 'HEXO_HOME_BANNER_ENABLE')
      return true
    return fallback ?? ''
  }
}))
jest.mock('@/lib/utils', () => ({ isBrowser: true }))
// The shared Jest setup clears document.head before RTL cleanup; render CSS inline.
jest.mock('styled-jsx/style', () => ({
  __esModule: true,
  default: ({ children }) => <style>{children}</style>
}))
jest.mock('next/dynamic', () => () => () => null)
jest.mock('@headlessui/react', () => ({
  Transition: ({ children }) => <>{children}</>
}))
jest.mock('@/components/NotionPage', () => ({
  __esModule: true,
  default: () => (
    <div id='notion-article'>
      <div className='notion'>
        <main className='notion-page'>
          <h2>全宽正文</h2>
          <p>{'这是用于检查文章铺展与自然换行的正文。'.repeat(60)}</p>
          <figure className='notion-asset-wrapper' style={{ width: '100%' }}>
            <video
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                background: '#24313a'
              }}
            />
          </figure>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <pre>{'long_code_'.repeat(250)}</pre>
          </div>
        </main>
      </div>
    </div>
  )
}))

// Keep the real layout, theme CSS and TOC interaction; isolate unrelated widgets.
const emptyModules = [
  '@/components/Mark',
  '@/components/ShareBar',
  '@/components/SmartLink',
  '@/themes/hexo/components/ArticleAdjacent',
  '@/themes/hexo/components/ArticleCopyright',
  '@/themes/hexo/components/ArticleRecommend',
  '@/themes/hexo/components/BlogPostArchive',
  '@/themes/hexo/components/BlogPostListPage',
  '@/themes/hexo/components/BlogPostListScroll',
  '@/themes/hexo/components/ButtonJumpToComment',
  '@/themes/hexo/components/ButtonRandomPostMini',
  '@/themes/hexo/components/Card',
  '@/themes/hexo/components/SearchNav',
  '@/themes/hexo/components/SlotBar',
  '@/themes/hexo/components/TagItemMini',
  '@/themes/hexo/components/ArticleSwitchPlaceholder',
  '@/themes/my-theme/components/Footer',
  '@/themes/my-theme/components/Header',
  '@/themes/my-theme/components/FriendLinks',
  '@/themes/my-theme/components/ExistenceLife',
  '@/themes/my-theme/components/OurBeingsIndex',
  '@/themes/my-theme/components/BeingLife',
  '@/themes/my-theme/components/BeingDesk',
  '@/themes/my-theme/components/NoticeModal'
]
emptyModules.forEach(path =>
  jest.doMock(path, () => ({ __esModule: true, default: () => null }))
)
jest.mock('@/themes/my-theme/components/OurBeingsAuth', () => ({
  LayoutSignIn: () => null,
  LayoutSignUp: () => null
}))
jest.mock('@/themes/hexo/components/PostHero', () => ({
  __esModule: true,
  default: () => <header data-testid='post-hero' />
}))
jest.mock('@/themes/my-theme/components/Hero', () => ({
  __esModule: true,
  default: () => <header data-testid='home-hero' />
}))
jest.mock('@/themes/hexo/components/RightFloatArea', () => ({
  __esModule: true,
  default: ({ floatSlot }) => <aside>{floatSlot}</aside>
}))
jest.mock('@/themes/hexo/components/Catalog', () => ({
  __esModule: true,
  default: () => <nav data-testid='catalog'>文章目录</nav>
}))
jest.mock('@/themes/hexo/components/ArticleLock', () => ({
  ArticleLock: () => <div data-testid='article-lock' />
}))
jest.mock('@/components/Comment', () => ({
  __esModule: true,
  default: () => <div data-testid='comments'>评论区</div>
}))

const { LayoutBase, LayoutSlug } = require('@/themes/my-theme')
const postFor = category => ({
  type: 'Post',
  category,
  slug: mockRouter.asPath.slice(1),
  toc: [{ id: 'a' }, { id: 'b' }]
})
const article = (post, extra = {}) => (
  <LayoutBase post={post}>
    <LayoutSlug post={post} {...extra} />
  </LayoutBase>
)

afterEach(cleanup)
beforeEach(() => {
  mockGlobal.fullWidth = false
  mockRouter.asPath = '/philosophy/2026/10/23/18'
  mockRouter.pathname = '/[prefix]/[slug]/[...suffix]'
  mockRouter.route = mockRouter.pathname
})

test.each(['道', '术', '我的存在', '我们的存在'])(
  '%s articles are full width without Notion fullWidth enabled',
  category => {
    if (category === '术') mockRouter.asPath = '/technology/2026/10/23/test'
    const { container } = render(article(postFor(category)))
    expect(container.querySelector('#theme-my-theme')).toHaveClass(
      'ob-article-layout'
    )
    expect(container.querySelector('#wrapper')).toHaveClass('px-0', 'pt-0')
    expect(
      container.querySelector('#container-inner > div').className
    ).not.toMatch(/max-w-/)
    expect(container.querySelector('#sideRight')).toBeNull()
    expect(container.querySelector('.ob-article-body').className).not.toMatch(
      /max-w-/
    )
    expect(
      screen.getByTestId('comments').closest('.ob-article-card')
    ).not.toBeNull()
  }
)

test('the TOC can open and close without a desktop-hidden ancestor', () => {
  const { container } = render(article(postFor('术')))
  const button = screen.getByTitle('目录')
  expect(button.parentElement).not.toHaveClass('lg:hidden')
  expect(container.querySelector('.ob-article-toc')).not.toHaveClass(
    'lg:hidden'
  )
  fireEvent.click(button)
  expect(container.querySelector('#right-drawer-background')).toHaveClass(
    'block'
  )
  fireEvent.click(container.querySelector('#right-drawer-background'))
  expect(container.querySelector('#right-drawer-background')).toHaveClass(
    'hidden'
  )
})

test('locked articles keep the full-width shell without rendering protected content', () => {
  const { container } = render(article(postFor('术'), { lock: true }))
  expect(container.querySelector('#theme-my-theme')).toHaveClass(
    'ob-article-layout'
  )
  expect(screen.getByTestId('article-lock')).toBeTruthy()
  expect(container.querySelector('#notion-article')).toBeNull()
})

test('category lists retain their constrained layout', () => {
  mockRouter.asPath = '/category/术'
  mockRouter.route = '/category/[category]'
  const { container } = render(
    <LayoutBase>
      <div>list</div>
    </LayoutBase>
  )
  expect(container.querySelector('#theme-my-theme')).not.toHaveClass(
    'ob-article-layout'
  )
  expect(container.querySelector('#container-inner > div')).toHaveClass(
    'max-w-5xl'
  )
})

test('the home page keeps its hero-only layout', () => {
  mockRouter.asPath = '/'
  mockRouter.route = '/'
  const { container } = render(<LayoutBase />)
  expect(container.querySelector('#theme-my-theme')).toHaveClass('ob-home-only')
  expect(container.querySelector('#wrapper')).toBeNull()
})

test.each(['/links', '/our-beings', '/sign-in'])(
  'special page %s does not inherit the article layout',
  asPath => {
    mockRouter.asPath = asPath
    const { container } = render(
      <LayoutBase post={{ slug: asPath.slice(1) }} />
    )
    expect(container.querySelector('#theme-my-theme')).not.toHaveClass(
      'ob-article-layout'
    )
  }
)

// Optional local-only HTML fixture for viewport checks using the actual rendered shell/CSS.
if (process.env.ARTICLE_WIDTH_FIXTURE) {
  test('export viewport fixture', () => {
    render(article(postFor('术')))
    const fs = require('fs')
    fs.writeFileSync(
      process.env.ARTICLE_WIDTH_FIXTURE,
      '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="./tailwind.css">' +
        document.head.innerHTML +
        '</head><body>' +
        document.body.innerHTML +
        '</body></html>'
    )
  })
}
