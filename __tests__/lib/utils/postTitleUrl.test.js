import {
  appendPostTitleToSlug,
  encodePostPath,
  findPostByRequestedSlug,
  matchRequestedPostSlug,
  prettyPostPath,
  prettyPostUrl,
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

  it('keeps the title readable in paths and displayed links', () => {
    const slug = `philosophy/2026/10/23/18/${title}`
    expect(encodePostPath(slug)).toBe(`/${slug}`)
    expect(prettyPostPath(slug)).toBe(`/${slug}`)
    expect(
      prettyPostUrl('https://ourbeings.com', `/${slug}`)
    ).toBe(`https://ourbeings.com/${slug}`)
  })

  it('decodes percent-encoded titles back to readable Chinese', () => {
    const encoded =
      '/philosophy/2026/10/23/18/%E5%BD%B1%E7%89%87%E5%90%AF%E8%92%99%20%7C%7C%20%E4%B8%8D%E5%BE%97%E4%BA%BA%E7%88%B1'
    expect(prettyPostPath(encoded)).toBe(
      '/philosophy/2026/10/23/18/影片启蒙 || 不得人爱'
    )
    expect(
      prettyPostUrl(
        'https://ourbeings.com',
        'https://ourbeings.com' + encoded
      )
    ).toBe('https://ourbeings.com/philosophy/2026/10/23/18/影片启蒙 || 不得人爱')
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
        destination: `/philosophy/2026/10/23/18/${title}`,
        permanent: true
      }
    })
    expect(redirectIfCanonical({ post: {} })).toBeNull()
  })
})
