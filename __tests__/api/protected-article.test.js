/** @jest-environment node */
import BLOG from '@/blog.config'
import unlock from '@/pages/api/protected/unlock'
import content from '@/pages/api/protected/content'
import { sha256Digest } from '@/lib/utils/password'
import { resetRateLimitForTests } from '@/lib/security/articleRateLimit'

const siteOrigin = new URL(BLOG.LINK).origin

jest.mock('@/lib/db/SiteDataApi', () => ({
  loadArticleAccessRecord: jest.fn(),
  getPostBlocks: jest.fn(),
  hydrateAuthorizedPost: jest.fn()
}))

const {
  loadArticleAccessRecord,
  getPostBlocks,
  hydrateAuthorizedPost
} = require('@/lib/db/SiteDataApi')

const secret = 'test-article-auth-secret-32chars!'
const password = 'reader-pass'
const post = {
  id: 'page-a',
  slug: 'secret-note',
  title: '公开标题',
  lastEditedDate: '2026-01-01',
  password: sha256Digest(password)
}

function response() {
  const res = {
    setHeader: jest.fn(),
    status: jest.fn(),
    json: jest.fn()
  }
  res.status.mockReturnValue(res)
  return res
}

const originalSecret = process.env.ARTICLE_AUTH_SECRET

describe('protected article APIs', () => {
  beforeEach(() => {
    process.env.ARTICLE_AUTH_SECRET = secret
    resetRateLimitForTests()
    loadArticleAccessRecord.mockReset()
    getPostBlocks.mockReset()
    hydrateAuthorizedPost.mockReset()
  })
  afterEach(() => {
    if (originalSecret === undefined) delete process.env.ARTICLE_AUTH_SECRET
    else process.env.ARTICLE_AUTH_SECRET = originalSecret
  })

  test('missing secret fails closed', async () => {
    delete process.env.ARTICLE_AUTH_SECRET
    const res = response()
    await unlock(
      {
        method: 'POST',
        headers: {
          origin: siteOrigin,
          'content-type': 'application/json'
        },
        body: { slug: 'secret-note', password }
      },
      res
    )
    expect(res.status).toHaveBeenCalledWith(503)
  })

  test('rejects cross-origin unlock', async () => {
    const res = response()
    await unlock(
      {
        method: 'POST',
        headers: {
          origin: 'https://evil.example',
          'content-type': 'application/json'
        },
        body: { slug: 'secret-note', password }
      },
      res
    )
    expect(res.status).toHaveBeenCalledWith(403)
    expect(loadArticleAccessRecord).not.toHaveBeenCalled()
  })

  test('wrong password does not set a session', async () => {
    loadArticleAccessRecord.mockResolvedValue(post)
    const res = response()
    await unlock(
      {
        method: 'POST',
        headers: {
          origin: siteOrigin,
          'content-type': 'application/json'
        },
        body: { slug: 'secret-note', password: 'nope' }
      },
      res
    )
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.setHeader).not.toHaveBeenCalledWith(
      'Set-Cookie',
      expect.anything()
    )
  })

  test('correct password then content; other article is denied', async () => {
    loadArticleAccessRecord.mockImplementation(slug => {
      if (slug === 'secret-note') return Promise.resolve(post)
      return Promise.resolve({ ...post, id: 'page-b', slug: 'other-note' })
    })
    getPostBlocks.mockResolvedValue({ block: { a: {} } })
    hydrateAuthorizedPost.mockReturnValue({
      id: 'page-a',
      slug: 'secret-note',
      blockMap: { block: { a: {} } },
      protected: true
    })
    const unlockRes = response()
    await unlock(
      {
        method: 'POST',
        headers: {
          origin: siteOrigin,
          'content-type': 'application/json'
        },
        body: { slug: 'secret-note', password }
      },
      unlockRes
    )
    expect(unlockRes.status).toHaveBeenCalledWith(200)
    const cookieHeader = unlockRes.setHeader.mock.calls.find(
      call => call[0] === 'Set-Cookie'
    )[1]
    const contentRes = response()
    await content(
      {
        method: 'GET',
        headers: { cookie: cookieHeader.split(';')[0] },
        query: { slug: 'secret-note' }
      },
      contentRes
    )
    expect(contentRes.status).toHaveBeenCalledWith(200)
    expect(contentRes.json.mock.calls[0][0].post.password).toBeUndefined()

    const otherRes = response()
    await content(
      {
        method: 'GET',
        headers: { cookie: cookieHeader.split(';')[0] },
        query: { slug: 'other-note' }
      },
      otherRes
    )
    expect(otherRes.status).toHaveBeenCalledWith(401)
  })

  test('content without cookie is denied', async () => {
    loadArticleAccessRecord.mockResolvedValue(post)
    const res = response()
    await content(
      { method: 'GET', headers: {}, query: { slug: 'secret-note' } },
      res
    )
    expect(res.status).toHaveBeenCalledWith(401)
    expect(getPostBlocks).not.toHaveBeenCalled()
  })
})
