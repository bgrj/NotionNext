/**
 * Public article DTO and protection flags.
 * Password hashes and block maps must never rely on a missing `password`
 * field after this DTO has been applied.
 */

export const PUBLIC_POST_SUMMARY_FIELDS = [
  'id',
  'short_id',
  'title',
  'name',
  'slug',
  'href',
  'target',
  'pageIcon',
  'icon',
  'pageCover',
  'pageCoverThumbnail',
  'date',
  'publishDate',
  'publishDay',
  'lastEditedDate',
  'lastEditedDay',
  'category',
  'tags',
  'tagItems',
  'summary',
  'description',
  'type',
  'status',
  'readTime',
  'wordCount',
  'ext',
  'protected'
]

const SECRET_POST_FIELDS = [
  'password',
  'blockMap',
  'content',
  'toc',
  'results',
  'aiSummary'
]

export function isProtectedPost(post) {
  if (!post || typeof post !== 'object') return false
  if (post.protected === true) return true
  return typeof post.password === 'string' && post.password.trim() !== ''
}

function copyPublicFields(post) {
  const result = {}
  PUBLIC_POST_SUMMARY_FIELDS.forEach(field => {
    if (field === 'protected') return
    if (post[field] !== undefined) result[field] = post[field]
  })
  return result
}

export function toPublicPostSummary(post) {
  if (!post || typeof post !== 'object') return post
  const result = copyPublicFields(post)
  result.protected = isProtectedPost(post)
  SECRET_POST_FIELDS.forEach(field => {
    delete result[field]
  })
  return result
}

export function toPublicPostShell(post) {
  return toPublicPostSummary(post)
}

export function stripProtectedSearchHits(post) {
  if (!isProtectedPost(post)) return post
  const next = toPublicPostSummary(post)
  delete next.results
  return next
}

export function publicDtoContainsSecret(dto, canary) {
  if (!canary) return false
  return JSON.stringify(dto).includes(canary)
}
