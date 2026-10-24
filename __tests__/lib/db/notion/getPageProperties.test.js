/**
 * @jest-environment node
 */

import { adjustPageProperties } from '@/lib/db/notion/getPageProperties'

jest.mock('notion-utils', () => ({
  getDateValue: jest.fn(),
  getTextContent: jest.fn()
}))

jest.mock('@/lib/db/notion/getNotionAPI', () => ({
  __esModule: true,
  default: {
    getUsers: jest.fn()
  }
}))

jest.mock('@/lib/config', () => ({
  siteConfig: (key, fallback, extend = {}) => {
    if (extend && Object.hasOwn(extend, key) && extend[key] != null) {
      return extend[key]
    }
    return fallback
  }
}))

describe('adjustPageProperties', () => {
  it('uses category mapping for pages only when the page category is mapped', () => {
    const NOTION_CONFIG = {
      POST_URL_PREFIX: '%category%/%year%/%month%/%day%',
      POST_URL_PREFIX_MAPPING_CATEGORY: {
        Guide: 'manual'
      },
      PSEUDO_STATIC: false
    }

    const mappedPage = {
      id: 'page-id',
      type: 'Page',
      slug: 'a-manual',
      category: 'Guide'
    }
    const plainPage = {
      id: 'plain-id',
      type: 'Page',
      slug: 'a-book',
      category: 'Book'
    }

    adjustPageProperties(mappedPage, NOTION_CONFIG)
    adjustPageProperties(plainPage, NOTION_CONFIG)

    expect(mappedPage.slug).toBe('manual/a-manual')
    expect(mappedPage.href).toBe('/manual/a-manual')
    expect(plainPage.slug).toBe('a-book')
    expect(plainPage.href).toBe('/a-book')
  })

  it('appends the post title after the existing date slug', () => {
    const NOTION_CONFIG = {
      POST_URL_PREFIX: '%category%/%year%/%month%/%day%',
      POST_URL_PREFIX_MAPPING_CATEGORY: {
        道: 'philosophy'
      },
      POST_URL_APPEND_TITLE: true,
      PSEUDO_STATIC: false
    }
    const title = '影片启蒙 || 不得人爱，便无法爱人（大都市爱情法·八集混剪）'
    const post = {
      id: 'post-id',
      type: 'Post',
      slug: '18',
      title,
      category: '道',
      publishDay: '2026-10-23'
    }

    adjustPageProperties(post, NOTION_CONFIG)

    expect(post.slugBase).toBe('philosophy/2026/10/23/18')
    expect(post.slug).toBe(`philosophy/2026/10/23/18/影片启蒙｜不得人爱，便无法爱人（大都市爱情法·八集混剪）`)
    expect(post.href).toBe(`/philosophy/2026/10/23/18/影片启蒙｜不得人爱，便无法爱人（大都市爱情法·八集混剪）`)
  })

  it('can keep the original post slug when title appending is disabled', () => {
    const post = {
      id: 'post-id',
      type: 'Post',
      slug: '18',
      title: '影片启蒙',
      category: '道',
      publishDay: '2026-10-23'
    }
    adjustPageProperties(post, {
      POST_URL_PREFIX: '%category%/%year%/%month%/%day%',
      POST_URL_PREFIX_MAPPING_CATEGORY: { 道: 'philosophy' },
      POST_URL_APPEND_TITLE: false,
      PSEUDO_STATIC: false
    })
    expect(post.slug).toBe('philosophy/2026/10/23/18')
    expect(post.href).toBe('/philosophy/2026/10/23/18')
  })
})
