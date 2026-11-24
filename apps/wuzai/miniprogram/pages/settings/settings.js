const { localizePage } = require('../../common/localize-page')
const { translate } = require('../../common/i18n')
const settings = require('../../settings')
Page(localizePage({
  data: { nickname: '', saved: false, website: settings.website },
  onShow() { this.setData({ nickname: wx.getStorageSync('wuzai:nickname') || '' }) },
  input(e) { this.setData({ nickname: e.detail.value, saved: false }) },
  save() {
    wx.setStorageSync('wuzai:nickname', this.data.nickname.trim().slice(0, 30))
    this.setData({ saved: true })
    wx.showToast({ title: translate('称呼已保存', this.data.locale), icon: 'none' })
  },
  privacy() { wx.navigateTo({ url: '/pages/privacy/privacy' }) },
  copySite() { wx.setClipboardData({ data: settings.website }) }
}))
