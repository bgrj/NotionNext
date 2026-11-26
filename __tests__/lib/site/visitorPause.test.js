import { visitorMayRead } from '@/lib/site/visitorPause'

describe('visitor pause', () => {
  test('keeps Dao, friend links, and the owner admin door', () => {
    expect(visitorMayRead({ pathname: '/category/道' }, true)).toBe(true)
    expect(visitorMayRead({ pathname: '/category/%E9%81%93/page/2' }, true)).toBe(true)
    expect(visitorMayRead({ pathname: '/links' }, true)).toBe(true)
    expect(visitorMayRead({ pathname: '/link/' }, true)).toBe(true)
    expect(visitorMayRead({ slug: 'links' }, true)).toBe(true)
    expect(visitorMayRead({ pathname: '/our-beings/feedback-admin' }, true)).toBe(true)
    expect(visitorMayRead({ post: { category: '道', type: 'Post' } }, true)).toBe(true)
    expect(visitorMayRead({ post: { category: ['阅读', '道'] } }, true)).toBe(true)
    expect(visitorMayRead({ category: '道' }, true)).toBe(true)
  })

  test('pauses the rest of the site', () => {
    for (const pathname of ['/', '/sign-in', '/sign-up', '/our-beings', '/category/术', '/search', '/archive', '/ielts']) {
      expect(visitorMayRead({ pathname }, true)).toBe(false)
    }
    expect(visitorMayRead({ post: { category: '术', type: 'Post' } }, true)).toBe(false)
    expect(visitorMayRead({ category: '我的存在' }, true)).toBe(false)
    expect(visitorMayRead({ pathname: '/category/道术' }, true)).toBe(false)
  })

  test('reopens every page when the pause is off', () => {
    expect(visitorMayRead({ pathname: '/sign-in' }, false)).toBe(true)
  })
})
