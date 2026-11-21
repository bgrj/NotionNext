/**
 * Distinguish in-app browsers that must be able to read the site
 * from scripted clients that copy pages.
 * WeChat, QQ and similar webviews are visitors. Search engines stay allowed.
 */

export const EMBEDDED_WEBVIEW =
  /MicroMessenger|Weixin|wxwork|(?:^|[^A-Za-z])QQ\/\d|DingTalk|AliApp|AlipayClient|Weibo|aweme|NewsArticle|BytedanceWebview|baiduboxapp|FBAN|FBAV|Instagram|Line\/|ZhihuHybrid|BiliApp|XiaoHongShu|Snapchat|Pinterest|LinkedInApp|TikTok/i

const CONTENT_SCRAPER =
  /GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|Claude-User|anthropic-ai|Google-Extended|GoogleOther|Applebot-Extended|CCBot|Bytespider|Amazonbot|meta-externalagent|PerplexityBot|YouBot|cohere-ai|Diffbot|ImagesiftBot|PetalBot|scrapy|python-requests|python-urllib|aiohttp|httpx\/|Go-http-client|curl\/|wget\/|libwww-perl|HeadlessChrome|PhantomJS|Puppeteer|Playwright|Selenium|SemrushBot|AhrefsBot|MJ12bot|DotBot|BLEXBot|DataForSeoBot|HTTrack|nikto|sqlmap|node-fetch|axios\/|libcurl|fasthttp|mechanize/i

export function isEmbeddedWebview(userAgent) {
  return EMBEDDED_WEBVIEW.test(String(userAgent || ''))
}

/**
 * @param {string | null | undefined} userAgent null means the caller has no header object
 */
export function isContentScraper(userAgent) {
  if (userAgent == null) return false
  const ua = String(userAgent).trim()
  if (!ua) return true
  if (isEmbeddedWebview(ua)) return false
  return CONTENT_SCRAPER.test(ua)
}

export function readUserAgent(req) {
  const headers = req?.headers
  const get = headers?.get
  if (typeof get !== 'function') return null
  return get.call(headers, 'user-agent') || ''
}
