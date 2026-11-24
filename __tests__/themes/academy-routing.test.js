/** @jest-environment node */
import { getStaticPaths } from '@/pages/category/[category]'
import {
  getStaticPaths as articlePaths,
  getStaticProps as articleProps
} from '@/pages/our-beings/[handle]/[...suffix]'
import { getStaticProps as genericArticleProps } from '@/pages/[prefix]/[slug]/[...suffix]'

jest.mock('@/lib/db/SiteDataApi', () => ({
  fetchGlobalAllData: jest.fn(() => Promise.resolve({
    categoryOptions: [{ name: '我的存在' }]
  }))
}))
jest.mock('@/themes/theme', () => ({ DynamicLayout: () => null }))
jest.mock('@/pages/[prefix]/[slug]/[...suffix]', () => ({
  __esModule: true,
  default: () => null,
  getStaticProps: jest.fn(context => Promise.resolve({ props: context.params }))
}))

test('cold categories wait for serialized data before rendering', async () => {
  expect(await getStaticPaths()).toEqual({
    paths: [{ params: { category: '我的存在' } }],
    fallback: 'blocking'
  })
})

test('dated our-beings articles retain their generic article resolution', async () => {
  expect(articlePaths()).toEqual({ paths: [], fallback: 'blocking' })
  const context = {
    params: { handle: '2026', suffix: ['09', '27', 'o0'] },
    locale: 'zh-CN',
    revalidateReason: 'stale'
  }
  await articleProps(context)
  expect(genericArticleProps).toHaveBeenCalledWith({
    ...context,
    params: { prefix: 'our-beings', slug: '2026', suffix: ['09', '27', 'o0'] }
  })
})
