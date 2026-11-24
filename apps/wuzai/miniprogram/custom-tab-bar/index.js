const { words } = require('../common/i18n')
const { getLanguage } = require('../common/localize-page')
Component({
  data: { current: '', open: false, locale: 'zh', t: words('zh') },
  pageLifetimes: {
    show() {
      const locale = getLanguage()
      this.setData({
        locale,
        t: words(locale),
        current: getCurrentPages().slice(-1)[0]?.route || ''
      })
    }
  },
  methods: {
    tab(event) {
      this.setData({ open: false })
      wx.switchTab({ url: '/pages/' + event.currentTarget.dataset.page })
    },
    toggle() {
      this.setData({ open: !this.data.open })
    },
    close() {
      this.setData({ open: false })
    },
    noop() {},
    choose(event) {
      this.close()
      const action = event.currentTarget.dataset.action
      if (['dao', 'shu', 'existence'].includes(action)) {
        wx.navigateTo({ url: '/pages/compose/compose?room=' + action })
      } else if (action === 'privacy' || action === 'cities')
        wx.navigateTo({ url: `/pages/${action}/${action}` })
      else if (action === 'name') {
        const page = getCurrentPages().slice(-1)[0]
        if (!page.data.loggedIn) page.login()
        else wx.pageScrollTo({ selector: '.nickname' })
      } else wx.navigateTo({ url: '/pages/publish/publish?kind=' + action })
    }
  }
})
