const { request } = require('./api')
const { filterEvents, formatTime } = require('./activities')
module.exports = function listPage(mine) {
  return {
    data: {
      events: [],
      visible: [],
      scope: 'upcoming',
      format: 'all',
      loading: true,
      error: '',
      nextOffset: null,
      nickname: '',
      busy: false
    },
    onShow() {
      this.setData({ nickname: wx.getStorageSync('wuzai:nickname') || '' })
      this.load()
    },
    onPullDownRefresh() {
      this.load().finally(() => wx.stopPullDownRefresh())
    },
    load(more = false) {
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
              timeLabel: formatTime(item.startsAt)
            }))
          )
          this.setData({ events, nextOffset: data.nextOffset })
          this.filter()
        })
        .catch(error => this.setData({ error: error.message }))
        .finally(() => this.setData({ loading: false }))
    },
    more() {
      if (!this.data.loading && this.data.nextOffset !== null) this.load(true)
    },
    scopeTap(e) {
      this.setData({ scope: e.currentTarget.dataset.scope })
      this.filter()
    },
    formatTap(e) {
      this.setData({
        format: ['all', 'online', 'offline'][Number(e.detail.value)]
      })
      this.filter()
    },
    filter() {
      this.setData({
        visible: filterEvents(this.data.events, {
          scope: mine ? 'mine' : this.data.scope,
          format: this.data.format
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
  }
}
