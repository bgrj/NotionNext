/** @jest-environment node */
import {
  isProtectedPost,
  publicDtoContainsSecret,
  toPublicPostShell,
  toPublicPostSummary
} from '@/lib/security/articleAccess'
import { isProtectedPost as algoliaUsesSameFlag } from '@/lib/security/articleAccess'

const CANARY = 'SECRET_CANARY_BODY_DO_NOT_LEAK'
const HASH = 'a'.repeat(64)

const protectedPost = {
  id: 'page-a',
  slug: 'secret-note',
  title: '公开标题',
  summary: '公开摘要',
  type: 'Post',
  status: 'Published',
  password: HASH,
  blockMap: { block: { x: { value: { properties: { title: CANARY } } } } },
  content: [CANARY],
  toc: [{ text: CANARY }],
  results: [CANARY]
}

describe('public article DTO', () => {
  test('marks protection even after the password field is removed', () => {
    const dto = toPublicPostSummary(protectedPost)
    expect(dto.protected).toBe(true)
    expect(dto.password).toBeUndefined()
    expect(dto.blockMap).toBeUndefined()
    expect(dto.content).toBeUndefined()
    expect(dto.results).toBeUndefined()
    expect(publicDtoContainsSecret(dto, CANARY)).toBe(false)
    expect(publicDtoContainsSecret(dto, HASH)).toBe(false)
    expect(isProtectedPost(dto)).toBe(true)
    expect(algoliaUsesSameFlag(dto)).toBe(true)
  })

  test('anonymous shells never include block maps', () => {
    const shell = toPublicPostShell(protectedPost)
    expect(shell.blockMap).toBeUndefined()
    expect(shell.title).toBe('公开标题')
  })

  test('public posts stay unprotected', () => {
    const dto = toPublicPostSummary({
      id: 'page-b',
      slug: 'hello',
      title: 'Hello',
      password: '',
      type: 'Post'
    })
    expect(dto.protected).toBe(false)
    expect(isProtectedPost(dto)).toBe(false)
  })
})
