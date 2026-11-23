const { request } = require('../../common/api')
const { formatTime } = require('../../common/activities')
const settings = require('../../settings')
Page({
  data: {
    event: null,
    error: '',
    loading: true,
    busy: false,
    notice: '',
    member: false
  },
  onLoad(options) {
    this.id = options.id
    if (!this.id) this.setData({ error: '没有找到这场活动。', loading: false })
  },
  onShow() {
    if (this.id) this.load()
  },
  load() {
    this.setData({ loading: true, error: '' })
    return request('get', { id: this.id })
      .then(data => {
        const event = {
          ...data.event,
          timeLabel: formatTime(data.event.startsAt),
          endLabel: formatTime(data.event.endsAt),
          deadlineLabel: formatTime(data.event.deadline),
          announcements: data.event.announcements
            .slice()
            .reverse()
            .map(item => ({ ...item, timeLabel: formatTime(item.at) }))
        }
        this.setData({
          event,
          member: event.isHost || event.reservation === 'confirmed'
        })
      })
      .catch(error => this.setData({ event: null, error: error.message }))
      .finally(() => this.setData({ loading: false }))
  },
  act(action, input = {}) {
    if (this.data.busy) return Promise.resolve(false)
    this.setData({ busy: true, error: '' })
    return request(action, { ...input, id: this.id })
      .then(() => this.load())
      .then(() => true)
      .catch(error => {
        this.setData({ error: error.message })
        return false
      })
      .finally(() => this.setData({ busy: false }))
  },
  reserve() {
    return this.act('reserve')
  },
  cancelReservation() {
    wx.showModal({
      title: '取消这次预约？',
      content: '取消后会释放名额，你将无法继续查看预约后的参与说明。',
      success: result => {
        if (result.confirm) this.act('cancelReservation')
      }
    })
  },
  cancelEvent() {
    wx.showModal({
      title: '取消这场活动？',
      content: '取消后会停止预约，并发布一条取消通知。',
      success: result => {
        if (result.confirm) this.act('cancelEvent')
      }
    })
  },
  publish() {
    return this.act('publish')
  },
  edit() {
    wx.navigateTo({ url: `/pages/publish/publish?id=${this.id}` })
  },
  noticeInput(e) {
    this.setData({ notice: e.detail.value })
  },
  announce() {
    this.act('announce', { body: this.data.notice }).then(saved => {
      if (saved) this.setData({ notice: '' })
    })
  },
  copyInstructions() {
    wx.setClipboardData({ data: this.data.event.joinInstructions })
  },
  openSite() {
    wx.setClipboardData({
      data: `${settings.website}/our-beings?activity=${this.id}`
    })
  },
  onShareAppMessage() {
    return {
      title: this.data.event?.title || '吾在 · 阅读与交流',
      path: `/pages/detail/detail?id=${this.id}`
    }
  }
})
