/** @jest-environment node */
const {
  isContentScraper,
  isEmbeddedWebview
} = require('@/lib/security/visitorAccess')

const wechat =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.0.0 Mobile Safari/537.36 MicroMessenger/8.0.54.2760(0x28003653) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64'
const chrome =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
const qqApp =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.0.0 Mobile Safari/537.36 V1_AND_SQ_9.0.0_0 QQ/9.0.0.0000 NetType/WIFI'

test.each([
  wechat,
  'Mozilla/5.0 MicroMessenger/8.0.49',
  'Mozilla/5.0 MiniProgramEnv/Windows WindowsWechat/WMPF wechatdevtools',
  qqApp,
  'DingTalk/7.0',
  'Weibo/14',
  'aweme_123 NewsArticle'
])('in-app browser stays a visitor: %s', ua => {
  expect(isEmbeddedWebview(ua)).toBe(true)
  expect(isContentScraper(ua)).toBe(false)
})

test.each([
  chrome,
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)',
  'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  'MQQBrowser/14.0',
  'Twitterbot/1.0',
  'facebookexternalhit/1.1',
  'TelegramBot (like TwitterBot)'
])('ordinary browsers and link or search clients are not blocked: %s', ua => {
  expect(isContentScraper(ua)).toBe(false)
})

test.each([
  '',
  '   ',
  'python-requests/2.32.3',
  'curl/8.4.0',
  'GPTBot/1.2',
  'ClaudeBot',
  'Bytespider',
  'Mozilla/5.0 HeadlessChrome/131.0.0.0',
  'Scrapy/2.11.0'
])('scripted clients are scrapers: %j', ua => {
  expect(isContentScraper(ua)).toBe(true)
})

test('a missing header object is not treated as a scraper', () => {
  expect(isContentScraper(null)).toBe(false)
  expect(isContentScraper(undefined)).toBe(false)
})
