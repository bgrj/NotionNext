import {
  buildRobotsTxt,
  isAutomatedClient,
  isExistenceContentPath,
  isExistencePublication,
  selectPublicFeedPosts,
  shouldRefuseExistenceCrawl,
  tokensMatch
} from '@/lib/security/existenceCrawl'

const browser =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

describe('existence crawl guard', () => {
  test('recognizes diary pages and the existence category', () => {
    expect(isExistenceContentPath('/diaries/2025/06/10/r76')).toBe(true)
    expect(isExistenceContentPath('/category/我的存在/page/2')).toBe(true)
    expect(
      isExistenceContentPath('/category/%E6%88%91%E7%9A%84%E5%AD%98%E5%9C%A8')
    ).toBe(true)
    expect(isExistenceContentPath('/philosophy/2026/09/27/diy2')).toBe(false)
    expect(isExistenceContentPath('/')).toBe(false)
  })

  test('recognizes existence records by category or slug', () => {
    expect(isExistencePublication({ category: '我的存在', slug: 'note' })).toBe(
      true
    )
    expect(
      isExistencePublication({ category: ['我的存在'], slug: 'note' })
    ).toBe(true)
    expect(isExistencePublication({ slug: 'diaries/2025/06/10/r76' })).toBe(
      true
    )
    expect(isExistencePublication({ slug: 'philosophy/2026/09/27/diy2' })).toBe(
      false
    )
  })

  test('allows browsers and refuses fetch tools on existence pages only', () => {
    expect(isAutomatedClient(browser)).toBe(false)
    expect(isAutomatedClient('curl/8.4.0')).toBe(true)
    expect(isAutomatedClient('Mozilla/5.0 (compatible; GPTBot/1.0)')).toBe(true)
    expect(isAutomatedClient('')).toBe(true)

    expect(
      shouldRefuseExistenceCrawl({
        pathname: '/diaries/2025/06/10/r76',
        userAgent: browser
      })
    ).toBe(false)
    expect(
      shouldRefuseExistenceCrawl({
        pathname: '/diaries/2025/06/10/r76',
        userAgent: 'python-requests/2.32.0'
      })
    ).toBe(true)
    expect(
      shouldRefuseExistenceCrawl({
        pathname: '/tools/2026/09/27/diy2',
        userAgent: 'curl/8.4.0'
      })
    ).toBe(false)
  })

  test('owner credential lets the owner tools through without opening the page to every tool', () => {
    expect(tokensMatch('secret-token', 'secret-token')).toBe(true)
    expect(tokensMatch('secret-token', 'secret-tokex')).toBe(false)
    expect(tokensMatch('', 'secret-token')).toBe(false)
    expect(
      shouldRefuseExistenceCrawl({
        pathname: '/category/我的存在',
        userAgent: 'curl/8.4.0',
        ownerCredential: 'secret-token',
        expectedToken: 'secret-token'
      })
    ).toBe(false)
    expect(
      shouldRefuseExistenceCrawl({
        pathname: '/category/我的存在',
        userAgent: browser,
        ownerCredential: '',
        expectedToken: 'secret-token'
      })
    ).toBe(false)
  })

  test('public feeds and robots.txt keep the rest of the site available', () => {
    const posts = selectPublicFeedPosts([
      {
        type: 'Post',
        status: 'Published',
        slug: 'diaries/2025/06/10/r76',
        publishDay: '2026-06-10'
      },
      {
        type: 'Post',
        status: 'Published',
        slug: 'philosophy/about',
        publishDay: '2026-04-01'
      }
    ])
    expect(posts.map(post => post.slug)).toEqual(['philosophy/about'])

    const robots = buildRobotsTxt('https://ourbeings.com')
    expect(robots).toContain('Allow: /')
    expect(robots).toContain('Disallow: /diaries')
    expect(robots).toContain('Disallow: /category/我的存在')
    expect(robots).toContain('User-agent: GPTBot')
    expect(robots.split('\n')).not.toContain('Disallow: /')
  })
})
