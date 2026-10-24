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
  resolvePostSlugBase,
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

  it('treats the short path as canonical and title leftovers as aliases', () => {
    const post = {
      type: 'Post',
      slug: `philosophy/2026/10/23/18/${safeTitle}`,
      slugBase: 'philosophy/2026/10/23/18',
      id: 'post-id'
    }
    expect(matchRequestedPostSlug(post, 'philosophy/2026/10/23/18')).toBe(
      'exact'
    )
    expect(matchRequestedPostSlug(post, post.slug)).toBe('alias')
    expect(
      matchRequestedPostSlug(post, 'philosophy/2026/10/23/18/影片启蒙')
    ).toBe('alias')
    expect(
      matchRequestedPostSlug(
        post,
        'philosophy/2026/10/23/18/影片启蒙/不得人爱'
      )
    ).toBe('alias')
  })

  it('still matches truncated titles when slugBase was stripped from summaries', () => {
    const post = {
      type: 'Post',
      slug: `philosophy/2026/10/23/18/${safeTitle}`
    }
    expect(resolvePostSlugBase(post)).toBe('philosophy/2026/10/23/18')
    expect(
      matchRequestedPostSlug(post, 'philosophy/2026/10/23/18/影片启蒙')
    ).toBe('alias')
    const found = findPostByRequestedSlug(
      [post],
      'philosophy/2026/10/23/18/%E5%BD%B1%E7%89%87%E5%90%AF%E8%92%99'
    )
    expect(found.match).toBe('alias')
    expect(found.post).toBe(post)
  })

  it('prefers the short canonical path over a title alias', () => {
    const pages = [
      {
        type: 'Post',
        slug: `philosophy/2026/10/23/18/${safeTitle}`,
        slugBase: 'philosophy/2026/10/23/18'
      }
    ]
    const found = findPostByRequestedSlug(pages, 'philosophy/2026/10/23/18')
    expect(found.match).toBe('exact')
    expect(found.post.slugBase).toBe('philosophy/2026/10/23/18')
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
