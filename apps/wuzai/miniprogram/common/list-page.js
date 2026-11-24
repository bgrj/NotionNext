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
      place: null,
      cityName: '',
      conversationLanguage: 'all',
      showPresenceHelp: false,
      kind: 'all',
      mineSection: 'activities',
      relation: 'all',
      writings: [],
      writingsLoading: false
    },
    onShow() {
      const city = wx.getStorageSync('ourbeing:city') || ''
      this.setData({
        city,
        place: wx.getStorageSync('ourbeing:place') || null,
        cityName: cityLabel(city, this.data.locale)
      })
      this.setData({ nickname: wx.getStorageSync('wuzai:nickname') || '' })
      this.load()
      if (mine && auth.getSession()) this.loadWritings()
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
          writings: [],
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
        .then((data) => {
          const events = (more ? this.data.events : []).concat(
            data.events.map((item) => ({
              ...item,
              timeLabel: localTime(item.startsAt)
            }))
          )
          this.setData({ events, nextOffset: data.nextOffset })
          this.filter()
        })
        .catch((error) =>
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
    settings() {
      wx.navigateTo({ url: '/pages/settings/settings' })
    },
    sectionTap(e) {
      this.setData({ mineSection: e.currentTarget.dataset.section })
      if (this.data.mineSection === 'writings') this.loadWritings()
    },
    relationTap(e) {
      this.setData({ relation: e.currentTarget.dataset.relation })
      this.filter()
    },
    kindTap(e) {
      this.setData({ kind: e.currentTarget.dataset.kind })
      this.filter()
    },
    quickCreate(e) {
      wx.navigateTo({
        url: '/pages/publish/publish?kind=' + e.currentTarget.dataset.kind
      })
    },
    compose(e) {
      wx.navigateTo({
        url:
          '/pages/compose/compose?room=' +
          (e.currentTarget.dataset.room || 'existence')
      })
    },
    publicWritings() {
      wx.navigateTo({ url: '/pages/writings/writings' })
    },
    loadWritings() {
      if (!auth.getSession()) return Promise.resolve()
      this.setData({ writingsLoading: true, error: '' })
      return request('writings')
        .then((data) =>
          this.setData({
            writings: data.writings.map((item) => ({
              ...item,
              timeLabel: localTime(item.createdAt)
            }))
          })
        )
        .catch((error) => this.setData({ error: error.message }))
        .finally(() => this.setData({ writingsLoading: false }))
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
          place: mine ? null : this.data.place,
          language: this.data.conversationLanguage
        }).filter(
          (item) =>
            (this.data.kind === 'all' || item.kind === this.data.kind) &&
            (!mine ||
              this.data.relation === 'all' ||
              (this.data.relation === 'host'
                ? item.isHost
                : this.data.relation === 'draft'
                  ? item.state === 'draft'
                  : item.reservation === 'confirmed'))
        )
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
        .then(() => Promise.all([this.load(), this.loadWritings()]))
        .catch((error) =>
          this.setData({ error: error.message, loggedIn: false })
        )
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
