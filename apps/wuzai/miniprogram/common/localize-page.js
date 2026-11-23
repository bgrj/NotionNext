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
function localizePage(page) {
  const show = page.onShow
  const hide = page.onHide
  const unload = page.onUnload
  return {
    ...page,
    data: { ...page.data, locale: 'zh', t: words('zh'), timezone: '' },
    onShow(...args) {
      const locale = getLanguage()
      this.setData({ locale, t: words(locale), timezone: timezone() })
      if (wx.setNavigationBarTitle)
        wx.setNavigationBarTitle({ title: 'Our Being' })
      const bar = typeof this.getTabBar === 'function' && this.getTabBar()
      if (bar) bar.setData({ locale, t: words(locale), current: this.route })
      presence.start(this)
      return show?.apply(this, args)
    },
    changeLanguage(event) {
      wx.setStorageSync(
        'ourbeing:language',
        event.currentTarget.dataset.language
      )
      this.onShow()
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
