const { request } = require('./api')
const { filterEvents } = require('./activities')
const auth = require('./auth')
const { localizePage } = require('./localize-page')
const { localTime, cityLabel } = require('./global')
module.exports = function listPage(mine) {
  return localizePage({
    data: {
      events: [],
      visible: [],
      scope: 'upcoming',
      format: 'all',
      loading: true,
      error: '',
      nextOffset: null,
      nickname: '',
      busy: false,
      loggedIn: false,
      loggingIn: false,
      city: '',
      cityName: '',
      conversationLanguage: 'all',
      showPresenceHelp: false
    },
    onShow() {
      const city = wx.getStorageSync('ourbeing:city') || ''
      this.setData({ city, cityName: cityLabel(city, this.data.locale) })
      this.setData({ nickname: wx.getStorageSync('wuzai:nickname') || '' })
      this.load()
    },
    onPullDownRefresh() {
      this.load().finally(() => wx.stopPullDownRefresh())
    },
    load(more = false) {
      if (mine && !auth.getSession()) {
        this.setData({
          loggedIn: false,
          loading: false,
          events: [],
          visible: [],
          nextOffset: null,
          error: ''
        })
        return Promise.resolve()
      }
      this.setData({ loggedIn: !!auth.getSession() })
      more = more === true
      this.setData({ loading: true, error: '' })
      return request(
        mine ? 'mine' : 'list',
        more ? { offset: this.data.nextOffset } : {}
      )
        .then(data => {
          const events = (more ? this.data.events : []).concat(
            data.events.map(item => ({
              ...item,
              timeLabel: localTime(item.startsAt)
            }))
          )
          this.setData({ events, nextOffset: data.nextOffset })
          this.filter()
        })
        .catch(error =>
          this.setData({ error: error.message, loggedIn: !!auth.getSession() })
        )
        .finally(() => this.setData({ loading: false }))
    },
    more() {
      if (!this.data.loading && this.data.nextOffset !== null) this.load(true)
    },
    scopeTap(e) {
      this.setData({ scope: e.currentTarget.dataset.scope })
      this.filter()
    },
    togglePresenceHelp() {
      this.setData({ showPresenceHelp: !this.data.showPresenceHelp })
    },
    formatTap(e) {
      this.setData({
        format: ['all', 'online', 'offline'][Number(e.detail.value)]
      })
      this.filter()
    },
    languageTap(e) {
      this.setData({
        conversationLanguage: ['all', 'zh', 'en', 'bilingual'][
          Number(e.detail.value)
        ]
      })
      this.filter()
    },
    filter() {
      this.setData({
        visible: filterEvents(this.data.events, {
          scope: mine ? 'mine' : this.data.scope,
          format: this.data.format,
          city: mine ? '' : this.data.city,
          language: this.data.conversationLanguage
        })
      })
    },
    open(e) {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`
      })
    },
    create() {
      wx.navigateTo({ url: '/pages/publish/publish' })
    },
    login() {
      if (this.data.loggingIn) return Promise.resolve()
      this.setData({ loggingIn: true, error: '' })
      return auth
        .login()
        .then(() => this.load())
        .catch(error => this.setData({ error: error.message, loggedIn: false }))
        .finally(() => this.setData({ loggingIn: false }))
    },
    nicknameInput(e) {
      this.setData({ nickname: e.detail.value })
    },
    saveNickname() {
      wx.setStorageSync(
        'wuzai:nickname',
        this.data.nickname.trim().slice(0, 30)
      )
      wx.showToast({ title: '称呼已保存', icon: 'none' })
    },
    privacy() {
      wx.navigateTo({ url: '/pages/privacy/privacy' })
    }
  })
}
