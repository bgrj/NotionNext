const { request } = require('../../common/api')
const { normalizeInput, formatTime } = require('../../common/activities')
Page({
  data: {
    busy: false,
    loading: false,
    error: '',
    date: '',
    time: '19:30',
    endDate: '',
    endTime: '21:00',
    deadlineDate: '',
    deadlineTime: '19:30',
    format: 'online',
    kind: 'reading',
    title: '',
    book: '',
    description: '',
    capacity: '12',
    location: '',
    joinInstructions: ''
  },
  onLoad(options) {
    this.id = options.id || ''
    this.setData({ id: this.id })
    if (!this.id) return
    this.setData({ loading: true })
    request('get', { id: this.id })
      .then(data => {
        if (!data.event.isHost) throw new Error('只有发起人可以编辑这场活动。')
        if (data.event.discussion !== 'wechat')
          throw new Error('请在网站编辑这场站内交流活动。')
        const item = data.event
        const time = value => formatTime(value).replace(/\./g, '-').split(' ')
        this.setData({
          ...item,
          date: time(item.startsAt)[0],
          time: time(item.startsAt)[1],
          endDate: time(item.endsAt)[0],
          endTime: time(item.endsAt)[1],
          deadlineDate: time(item.deadline)[0],
          deadlineTime: time(item.deadline)[1]
        })
      })
      .catch(error => this.setData({ error: error.message, cannotEdit: true }))
      .finally(() => this.setData({ loading: false }))
  },
  input(e) {
    this.setData({ [e.currentTarget.dataset.field]: e.detail.value })
  },
  chooseFormat(e) {
    this.setData({ format: Number(e.detail.value) ? 'offline' : 'online' })
  },
  chooseKind(e) {
    this.setData({ kind: Number(e.detail.value) ? 'conversation' : 'reading' })
  },
  save() {
    if (this.data.busy) return
    let input
    try {
      const data = this.data
      input = normalizeInput({
        ...data,
        discussion: 'wechat',
        startsAt: `${data.date}T${data.time}:00+08:00`,
        endsAt: `${data.endDate || data.date}T${data.endTime}:00+08:00`,
        deadline: `${data.deadlineDate || data.date}T${data.deadlineDate ? data.deadlineTime : data.time}:00+08:00`,
        capacity: Number(data.capacity)
      })
    } catch (error) {
      this.setData({ error: error.message })
      return
    }
    this.setData({ busy: true, error: '' })
    request(this.id ? 'edit' : 'create', {
      ...input,
      ...(this.id ? { id: this.id } : {})
    })
      .then(data =>
        wx.redirectTo({ url: `/pages/detail/detail?id=${data.event.id}` })
      )
      .catch(error => this.setData({ error: error.message }))
      .finally(() => this.setData({ busy: false }))
  }
})
