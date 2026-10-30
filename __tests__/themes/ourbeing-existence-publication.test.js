/** @jest-environment node */
import {
  LIFE_MARKERS,
  postMapFrom,
  slimExistencePosts
} from '@/themes/my-theme/existence'

const mergedPost = {
  id: 'published-r32',
  title: '2025.4.24–27 周四至周日',
  href: '/diaries/2025/04/24/r32',
  date: '2025-04-24'
}

test('an empty published list never creates a fallback diary or gold dots', () => {
  expect(slimExistencePosts([])).toEqual([])
  expect(slimExistencePosts(undefined)).toEqual([])
  expect(Object.keys(postMapFrom([]))).toEqual([])
})

test('unrelated published posts never resurrect the withdrawn merged diary', () => {
  const posts = [{ id: 'other', title: '2025.5.1', href: '/other', date: '2025-05-01' }]
  expect(slimExistencePosts(posts)).toHaveLength(1)
  expect(postMapFrom(posts)['2025-04-24']).toBeUndefined()
  expect(postMapFrom(posts)['2025-04-27']).toBeUndefined()
})

test('a supplied published merged diary still covers all four days', () => {
  const posts = slimExistencePosts([mergedPost])
  expect(slimExistencePosts(posts)).toEqual(posts)
  const map = postMapFrom(posts)
  expect(Object.keys(map)).toEqual([
    '2025-04-24', '2025-04-25', '2025-04-26', '2025-04-27'
  ])
  Object.values(map).forEach(post => expect(post.href).toBe(mergedPost.href))
})

test('life milestones remain independent of diary publication', () => {
  expect(LIFE_MARKERS.some(marker => marker.iso === '2025-03-28')).toBe(true)
})
