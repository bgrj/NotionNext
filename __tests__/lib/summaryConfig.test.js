/** @jest-environment node */
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { getOrSetDataWithCache } from '@/lib/cache/cache_manager'

jest.mock('@/blog.config', () => ({ NOTION_PAGE_ID: 'test-root' }))
jest.mock('@/lib/config', () => ({ siteConfig: (key, fallback) => fallback }))
jest.mock('@/lib/cache/cache_manager', () => ({
  getOrSetDataWithCache: jest.fn()
}))
jest.mock('@/lib/db/notion/getNotionAPI', () => ({
  __esModule: true,
  default: {}
}))
jest.mock('@/lib/db/notion/getNotionPost', () => ({
  fetchPageFromNotion: jest.fn()
}))
jest.mock('p-limit', () => () => fn => fn())
jest.mock('notion-utils', () => ({
  idToUuid: value => value,
  getTextContent: value => (value || []).map(item => item[0]).join('')
}))

test('strips the summary credential from cached global props without mutating the server cache', async () => {
  const cached = {
    NOTION_CONFIG: {
      AI_SUMMARY_KEY: 'SUMMARY_CREDENTIAL_CANARY',
      AI_SUMMARY_API: 'https://summary.example.test'
    },
    latestPosts: []
  }
  getOrSetDataWithCache.mockResolvedValue(cached)
  const data = await fetchGlobalAllData({})
  expect(JSON.stringify(data)).not.toContain('SUMMARY_CREDENTIAL_CANARY')
  expect(data.NOTION_CONFIG.AI_SUMMARY_API).toBe('https://summary.example.test')
  expect(cached.NOTION_CONFIG.AI_SUMMARY_KEY).toBe('SUMMARY_CREDENTIAL_CANARY')
})
