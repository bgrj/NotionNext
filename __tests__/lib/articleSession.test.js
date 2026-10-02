/** @jest-environment node */
import {
  articleCookieName,
  createArticleSessionCookie,
  isAllowedRequestOrigin,
  readArticleSession,
  sessionAllowsArticle,
  signArticleSession
} from '@/lib/security/articleSession'
import BLOG from '@/blog.config'
import {
  hashArticlePasswordScrypt,
  verifyArticlePassword
} from '@/lib/security/articlePassword'
import { getPasswordQuery } from '@/lib/utils/password'
import { sha256Digest } from '@/lib/utils/password'

const secret = 'test-article-auth-secret-32chars!'

describe('article session and password', () => {
  const original = process.env.ARTICLE_AUTH_SECRET
  beforeEach(() => {
    process.env.ARTICLE_AUTH_SECRET = secret
  })
  afterEach(() => {
    if (original === undefined) delete process.env.ARTICLE_AUTH_SECRET
    else process.env.ARTICLE_AUTH_SECRET = original
  })

  test('accepts current SHA-256 and legacy md5 hashes', () => {
    const password = 'reader-pass'
    const shaPost = { slug: 'note', password: sha256Digest(password) }
    expect(verifyArticlePassword(shaPost, password)).toBe(true)
    expect(verifyArticlePassword(shaPost, 'nope')).toBe(false)
    const md5 = require('js-md5')
    const legacy = { slug: 'note', password: md5('note' + password) }
    expect(verifyArticlePassword(legacy, password)).toBe(true)
  })

  test('verifies scrypt hashes', () => {
    const stored = hashArticlePasswordScrypt('reader-pass', {
      n: 1024,
      salt: Buffer.from('testsalt-testsalt')
    })
    expect(verifyArticlePassword({ password: stored }, 'reader-pass')).toBe(
      true
    )
    expect(verifyArticlePassword({ password: stored }, 'nope')).toBe(false)
  })

  test('session is bound to one article and version', () => {
    const post = { id: 'page-a', lastEditedDate: '2026-01-01' }
    const other = { id: 'page-b', lastEditedDate: '2026-01-01' }
    const cookie = createArticleSessionCookie(post)
    expect(cookie).toContain('HttpOnly')
    expect(cookie).toContain('SameSite=Lax')
    const token = cookie.split(';')[0].split('=')[1]
    expect(readArticleSession(token).articleId).toBe('page-a')
    const req = {
      headers: { cookie: `${articleCookieName(post.id)}=${token}` }
    }
    expect(sessionAllowsArticle(req, post)).toBe(true)
    expect(sessionAllowsArticle(req, other)).toBe(false)
    expect(
      sessionAllowsArticle(req, { ...post, lastEditedDate: 'changed' })
    ).toBe(false)
  })

  test('allows configured site origin', () => {
    const origin = new URL(BLOG.LINK).origin
    expect(isAllowedRequestOrigin({ headers: { origin } })).toBe(true)
    expect(
      isAllowedRequestOrigin({ headers: { origin: 'https://evil.example' } })
    ).toBe(false)
  })

  test('rejects expired or forged tokens', () => {
    const token = signArticleSession({
      articleId: 'page-a',
      version: '1',
      expiresAt: Date.now() - 1000
    })
    expect(readArticleSession(token)).toBeNull()
    const fresh = signArticleSession({
      articleId: 'page-a',
      version: '1',
      expiresAt: Date.now() + 60_000
    })
    expect(readArticleSession(fresh + 'x')).toBeNull()
  })

  test('does not persist URL passwords in localStorage', () => {
    const store = {}
    global.localStorage = {
      setItem: (k, v) => {
        store[k] = v
      },
      getItem: k => store[k]
    }
    expect(getPasswordQuery('https://ourbeings.com/p?password=secret')).toEqual(
      ['secret']
    )
    expect(store).toEqual({})
  })
})
