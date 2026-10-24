import {
  appendPostTitleToSlug,
  encodePostPath,
  findPostByRequestedSlug,
  matchRequestedPostSlug,
  redirectIfCanonical,
  sanitizePostTitleSegment
} from '@/lib/utils/postTitleUrl'

const title = '影片启蒙 || 不得人爱，便无法爱人（大都市爱情法·八集混剪）'

describe('postTitleUrl', () => {
  it('keeps readable titles, including ||, as one path segment', () => {
    expect(sanitizePostTitleSegment(title)).toBe(title)
    expect(
      appendPostTitleToSlug('philosophy/2026/10/23/18', title)
    ).toBe(`philosophy/2026/10/23/18/${title}`)
  })

  it('strips path-breaking characters from titles', () => {
    expect(sanitizePostTitleSegment('a/b?c#d')).toBe('a b c d')
  })

  it('encodes the title segment for redirects', () => {
    expect(encodePostPath(`philosophy/2026/10/23/18/${title}`)).toBe(
      `/philosophy/2026/10/23/18/${encodeURIComponent(title)}`
    )
  })

  it('matches exact, legacy, and mistyped title aliases', () => {
    const post = {
      type: 'Post',
      slug: `philosophy/2026/10/23/18/${title}`,
      slugBase: 'philosophy/2026/10/23/18',
      id: 'post-id'
    }
    expect(matchRequestedPostSlug(post, post.slug)).toBe('exact')
    expect(matchRequestedPostSlug(post, 'philosophy/2026/10/23/18')).toBe(
      'legacy'
    )
    expect(
      matchRequestedPostSlug(post, 'philosophy/2026/10/23/18/wrong-title')
    ).toBe('alias')
    expect(matchRequestedPostSlug(post, 'philosophy/2026/10/23')).toBeNull()
  })

  it('prefers exact slug matches over legacy aliases', () => {
    const pages = [
      {
        type: 'Post',
        slug: `philosophy/2026/10/23/18/${title}`,
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
      `philosophy/2026/10/23/18/${title}`
    )
    expect(found.match).toBe('exact')
    expect(found.post.slug).toContain(title)
  })

  it('returns a permanent redirect payload', () => {
    expect(
      redirectIfCanonical({
        canonicalRedirect: encodePostPath(`philosophy/2026/10/23/18/${title}`)
      })
    ).toEqual({
      redirect: {
        destination: `/philosophy/2026/10/23/18/${encodeURIComponent(title)}`,
        permanent: true
      }
    })
    expect(redirectIfCanonical({ post: {} })).toBeNull()
  })
})
