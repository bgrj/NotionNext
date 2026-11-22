/** @jest-environment node */
import {
  buildSummaryInput,
  getAiSummary,
  getPageAISummary
} from '@/lib/plugins/aiSummary'
import { getDataFromCache, setDataToCache } from '@/lib/cache/cache_manager'

jest.mock('@/lib/config', () => ({
  siteConfig: (key, fallback, config) => config?.[key] ?? fallback
}))
jest.mock('@/lib/cache/cache_manager', () => ({
  getDataFromCache: jest.fn(),
  setDataToCache: jest.fn()
}))

const config = {
  AI_SUMMARY_API: 'https://summary.example.test',
  AI_SUMMARY_WORD_LIMIT: '1000',
  AI_SUMMARY_CACHE_TIME: '1800',
  AI_SUMMARY_KEY: 'never-use-client-config-secret'
}
const post = () => ({
  id: 'dao-summary-test',
  type: 'Post',
  status: 'Published',
  title: '长文阅读',
  category: '道',
  toc: [{ text: '观点' }]
})
let originalFetch, originalKey
beforeEach(() => {
  originalFetch = global.fetch
  originalKey = process.env.AI_SUMMARY_KEY
  process.env.AI_SUMMARY_KEY = 'server-only-test-token'
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ summary: ' 自动生成的摘要。 ' })
  })
  getDataFromCache.mockResolvedValue(null)
  setDataToCache.mockResolvedValue(true)
})
afterEach(() => {
  global.fetch = originalFetch
  if (originalKey === undefined) delete process.env.AI_SUMMARY_KEY
  else process.env.AI_SUMMARY_KEY = originalKey
  jest.useRealTimers()
})

test('uses Notion endpoint/budget/TTL and only the server credential', async () => {
  const article = post()
  await getPageAISummary(article, '正文'.repeat(2000), config)
  expect(article.aiSummary).toBe('自动生成的摘要。')
  const [url, request] = global.fetch.mock.calls[0]
  expect(url).toBe(config.AI_SUMMARY_API)
  const payload = JSON.parse(request.body)
  expect(payload.token).toBe('server-only-test-token')
  expect(payload.content.length).toBeLessThanOrEqual(1000)
  expect(request.signal).toBeInstanceOf(AbortSignal)
  expect(setDataToCache).toHaveBeenCalledWith(
    expect.any(String),
    article.aiSummary,
    1800
  )
})

test('long articles include beginning, middle and ending without raising the budget', () => {
  const body = '开头'.repeat(600) + '中间'.repeat(600) + '结尾'.repeat(600)
  const input = buildSummaryInput(post(), body, 1000)
  expect(input).toContain('开头')
  expect(input).toContain('中间')
  expect(input).toContain('结尾')
  expect(input.length).toBeLessThanOrEqual(1000)
})

test('cached summaries avoid another model call', async () => {
  getDataFromCache.mockResolvedValue('已经缓存的摘要')
  const article = post()
  await getPageAISummary(article, '正文', config)
  expect(article.aiSummary).toBe('已经缓存的摘要')
  expect(global.fetch).not.toHaveBeenCalled()
})

test('even edits outside sampled excerpts invalidate the summary cache', async () => {
  const body = '长文'.repeat(5000)
  await getPageAISummary(post(), body, config)
  const firstKey = getDataFromCache.mock.calls[0][0]
  await getPageAISummary(
    post(),
    body.slice(0, 850) + '改' + body.slice(851),
    config
  )
  expect(getDataFromCache.mock.calls[1][0]).not.toBe(firstKey)
})

test('concurrent requests for one article share a single model call', async () => {
  const a = post(),
    b = post()
  await Promise.all([
    getPageAISummary(a, '并发正文', config),
    getPageAISummary(b, '并发正文', config)
  ])
  expect(global.fetch).toHaveBeenCalledTimes(1)
  expect(a.aiSummary).toBe(b.aiSummary)
})

test.each([
  { password: 'protected' },
  { category: '我的存在' },
  { type: 'CONFIG' },
  { status: 'Draft' }
])('does not send excluded content (%j)', async fields => {
  await getPageAISummary({ ...post(), ...fields }, 'PRIVATE BODY', config)
  expect(getDataFromCache).not.toHaveBeenCalled()
  expect(global.fetch).not.toHaveBeenCalled()
})

test('does not fall back to a credential stored in public Notion props', async () => {
  delete process.env.AI_SUMMARY_KEY
  await getPageAISummary(post(), '正文', config)
  expect(global.fetch).not.toHaveBeenCalled()
})

test.each([
  { ok: false },
  { ok: true, json: async () => ({ summary: '' }) },
  { ok: true, json: async () => ({ summary: { error: 'invalid' } }) },
  {
    ok: true,
    json: async () => {
      throw Error('invalid JSON')
    }
  }
])(
  'provider failures leave the article usable and do not poison the cache (%j)',
  async response => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    global.fetch.mockResolvedValue(response)
    const article = { ...post(), aiSummary: 'outdated summary' }
    await expect(
      getPageAISummary(article, '正文', config)
    ).resolves.toBeUndefined()
    expect(article.aiSummary).toBeUndefined()
    expect(setDataToCache).not.toHaveBeenCalled()
  }
)

test('cache outages do not hide a successful summary', async () => {
  getDataFromCache.mockRejectedValue(Error('cache unavailable'))
  setDataToCache.mockRejectedValue(Error('cache unavailable'))
  const article = post()
  await getPageAISummary(article, '正文', config)
  expect(article.aiSummary).toBe('自动生成的摘要。')
})

test('aborts a slow service after 20 seconds without throwing', async () => {
  jest.useFakeTimers()
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  global.fetch.mockImplementation(
    (url, { signal }) =>
      new Promise((resolve, reject) => {
        signal.addEventListener('abort', () => reject(Error('aborted')))
      })
  )
  const request = getAiSummary(config.AI_SUMMARY_API, 'test-token', '正文')
  await jest.advanceTimersByTimeAsync(20000)
  expect(await request).toBeNull()
})
