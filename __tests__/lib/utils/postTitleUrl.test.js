import {
  appendPostTitleToSlug,
  canonicalOrigin,
  displayPostUrl,
  encodePostPath,
  findPostByRequestedSlug,
  matchRequestedPostSlug,
  prettyPostPath,
  publicPostUrl,
  redirectIfCanonical,
  sanitizePostTitleSegment
} from '@/lib/utils/postTitleUrl'

const title = '影片启蒙 || 不得人爱，便无法爱人（大都市爱情法·八集混剪）'
const safeTitle = '影片启蒙｜不得人爱，便无法爱人（大都市爱情法·八集混剪）'

describe('postTitleUrl', () => {
  it('turns || and spaces into Unicode so the address bar stays readable', () => {
    expect(sanitizePostTitleSegment(title)).toBe(safeTitle)
    expect(sanitizePostTitleSegment(title)).not.toMatch(/[ |]/)
    expect(appendPostTitleToSlug('philosophy/2026/10/23/18', title)).toBe(
      `philosophy/2026/10/23/18/${safeTitle}`
    )
  })

  it('strips path-breaking characters from titles', () => {
    expect(sanitizePostTitleSegment('a/b?c#d')).toBe('abcd')
  })

  it('keeps the title readable in displayed links', () => {
    expect(prettyPostPath(`philosophy/2026/10/23/18/${safeTitle}`)).toBe(
      `/philosophy/2026/10/23/18/${safeTitle}`
    )
  })

  it('matches exact, legacy, and title aliases', () => {
    const post = {
      type: 'Post',
      slug: `philosophy/2026/10/23/18/${safeTitle}`,
      slugBase: 'philosophy/2026/10/23/18',
      id: 'post-id'
    }
    expect(matchRequestedPostSlug(post, post.slug)).toBe('exact')
    expect(matchRequestedPostSlug(post, 'philosophy/2026/10/23/18')).toBe(
      'legacy'
    )
    expect(
      matchRequestedPostSlug(post, 'philosophy/2026/10/23/18/影片启蒙')
    ).toBe('alias')
  })

  it('prefers exact slug matches over legacy aliases', () => {
    const pages = [
      {
        type: 'Post',
        slug: `philosophy/2026/10/23/18/${safeTitle}`,
        slugBase: 'philosophy/2026/10/23/18'
      },
      {
        type: 'Post',
        slug: 'philosophy/2026/10/23/18',
        slugBase: 'philosophy/2026/10/23/18'
      }
    ]
    const found = findPostByRequestedSlug(
      pages,
      `philosophy/2026/10/23/18/${safeTitle}`
    )
    expect(found.match).toBe('exact')
    expect(found.post.slug).toContain(safeTitle)
  })

  it('returns a permanent redirect payload', () => {
    expect(
      redirectIfCanonical({
        canonicalRedirect: encodePostPath('philosophy/2026/10/23/18')
      })
    ).toEqual({
      redirect: {
        destination: '/philosophy/2026/10/23/18',
        permanent: true
      }
    })
  })

  it('normalizes ourbeings links to https://www', () => {
    expect(canonicalOrigin('http://www.ourbeings.com')).toBe(
      'https://www.ourbeings.com'
    )
    expect(canonicalOrigin('https://ourbeings.com')).toBe(
      'https://www.ourbeings.com'
    )
    expect(
      displayPostUrl('http://www.ourbeings.com', {
        type: 'Post',
        title,
        slug: 'philosophy/2026/10/23/18',
        slugBase: 'philosophy/2026/10/23/18'
      })
    ).toBe(
      `https://www.ourbeings.com/philosophy/2026/10/23/18/${safeTitle}`
    )
    expect(
      publicPostUrl('http://www.ourbeings.com', {
        type: 'Post',
        title,
        slug: `philosophy/2026/10/23/18/${safeTitle}`,
        slugBase: 'philosophy/2026/10/23/18'
      })
    ).toBe('https://www.ourbeings.com/philosophy/2026/10/23/18')
  })
})
