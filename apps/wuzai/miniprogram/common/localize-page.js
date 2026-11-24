const { words, language } = require('./i18n')
const { timezone } = require('./global')
const presence = require('./presence')
function getLanguage() {
  const saved = wx.getStorageSync('ourbeing:language')
  if (saved === 'zh' || saved === 'en') return saved
  try {
    return language(wx.getAppBaseInfo().language)
  } catch {
    return 'zh'
  }
}
function syncLanguage(page) {
  const locale = getLanguage()
  page.setData({ locale, t: words(locale), timezone: timezone() })
  if (wx.setNavigationBarTitle) {
    const titles = { mine: 'My Being', settings: '设置', compose: '写下一段', writings: '公开创作', publish: '发起活动', detail: '活动详情', cities: '选择城市', privacy: '隐私与使用说明' }
    const key = (page.route || '').split('/')[1]
    wx.setNavigationBarTitle({ title: words(locale)[titles[key]] || titles[key] || 'Our Being' })
  }
  const bar = typeof page.getTabBar === 'function' && page.getTabBar()
  if (bar) bar.setData({ locale, t: words(locale), current: page.route })
}
function localizePage(page) {
  const show = page.onShow
  const hide = page.onHide
  const unload = page.onUnload
  return {
    ...page,
    data: { ...page.data, locale: 'zh', t: words('zh'), timezone: '' },
    onShow(...args) {
      syncLanguage(this)
      presence.start(this)
      return show?.apply(this, args)
    },
    changeLanguage(event) {
      wx.setStorageSync(
        'ourbeing:language',
        event.currentTarget.dataset.language
      )
      syncLanguage(this)
    },
    chooseCity() {
      wx.navigateTo({ url: '/pages/cities/cities' })
    },
    onHide(...args) {
      presence.stop(this)
      return hide?.apply(this, args)
    },
    onUnload(...args) {
      presence.stop(this)
      return unload?.apply(this, args)
    }
  }
}
module.exports = { localizePage, getLanguage }
