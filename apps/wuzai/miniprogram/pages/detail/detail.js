const { localizePage } = require('../../common/localize-page')
const { request } = require('../../common/api')
const { localTime: formatTime } = require('../../common/global')
const settings = require('../../settings')
const { wechatPoint, isArea } = require('../../common/places')
Page(
  localizePage({
    data: {
      event: null,
      error: '',
      loading: true,
      busy: false,
      notice: '',
      member: false,
      mapPoint: null,
      mapMarkers: [],
      mapError: '',
      mapLoading: false,
      navigationResults: []
    },
    onLoad(options) {
      this.id = options.id
      if (!this.id)
        this.setData({ error: '没有找到这场活动。', loading: false })
    },
    onShow() {
      if (this.id) this.load()
    },
    load() {
      this.setData({ loading: true, error: '' })
      return request('get', { id: this.id })
        .then((data) => {
          const event = {
            ...data.event,
            timeLabel: formatTime(data.event.startsAt),
            endLabel: formatTime(data.event.endsAt),
            deadlineLabel: formatTime(data.event.deadline),
            announcements: data.event.announcements
              .slice()
              .reverse()
              .map((item) => ({ ...item, timeLabel: formatTime(item.at) }))
          }
          this.setData({
            event,
            mapPoint:
              event.format === 'offline' && event.place
                ? wechatPoint(event.place)
                : null,
            mapMarkers:
              event.format === 'offline' && event.place
                ? [
                    {
                      id: 1,
                      latitude: wechatPoint(event.place).latitude,
                      longitude: wechatPoint(event.place).longitude,
                      title: event.place.name
                    }
                  ]
                : [],
            areaPoint: isArea(event.place),
            member: event.isHost || event.reservation === 'confirmed'
          })
          this.refreshPresence?.()
        })
        .catch((error) => this.setData({ event: null, error: error.message }))
        .finally(() => this.setData({ loading: false }))
    },
    act(action, input = {}) {
      if (this.data.busy) return Promise.resolve(false)
      this.setData({ busy: true, error: '' })
      return request(action, { ...input, id: this.id })
        .then(() => this.load())
        .then(() => true)
        .catch((error) => {
          this.setData({ error: error.message })
          return false
        })
        .finally(() => this.setData({ busy: false }))
    },
    reserve() {
      return this.act('reserve')
    },
    navigate() {
      if (this.data.mapPoint) return this.openPoint(this.data.mapPoint)
      if (this.data.mapLoading) return Promise.resolve()
      this.setData({ mapLoading: true, mapError: '', navigationResults: [] })
      const event = this.data.event
      return request('locations', {
        query: `${event.city || ''} ${event.location || ''}`
          .trim()
          .slice(0, 160),
        language: this.data.locale
      })
        .then((data) =>
          this.setData({
            navigationResults: data.places,
            mapError: data.places.length
              ? ''
              : '未找到地点，可补充国家或地区后重试，也可手动填写。'
          })
        )
        .catch((error) => this.setData({ mapError: error.message }))
        .finally(() => this.setData({ mapLoading: false }))
    },
    chooseNavigation(event) {
      const place =
        this.data.navigationResults[Number(event.currentTarget.dataset.index)]
      if (place) this.openPoint(wechatPoint(place))
    },
    openPoint(point) {
      wx.openLocation({
        latitude: point.latitude,
        longitude: point.longitude,
        name: (this.data.event.demo ? '演示位置 · ' : '') + point.name,
        address: point.label,
        scale: isArea(point) ? 12 : 16,
        fail: () =>
          this.setData({ mapError: '暂时无法打开地图，请重试或复制活动地址。' })
      })
    },
    copyAddress() {
      wx.setClipboardData({
        data: `${this.data.event.city || ''} ${this.data.event.location}`.trim()
      })
    },
    attribution() {
      wx.setClipboardData({ data: 'https://www.openstreetmap.org/copyright' })
    },
    cancelReservation() {
      wx.showModal({
        title: '取消这次预约？',
        content: '取消后会释放名额，你将无法继续查看预约后的参与说明。',
        success: (result) => {
          if (result.confirm) this.act('cancelReservation')
        }
      })
    },
    cancelEvent() {
      wx.showModal({
        title: '取消这场活动？',
        content: '取消后会停止预约，并发布一条取消通知。',
        success: (result) => {
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
      this.act('announce', { body: this.data.notice }).then((saved) => {
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
)
