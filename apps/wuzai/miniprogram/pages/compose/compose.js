const { localizePage } = require('../../common/localize-page')
const { request } = require('../../common/api')
Page(localizePage({
  data: { room: 'existence', title: '', body: '', public: false, busy: false, error: '', saved: false },
  onLoad(options = {}) {
    const room = ['dao', 'shu', 'existence'].includes(options.room) ? options.room : 'existence'
    this.setData({ room })
    const draft = wx.getStorageSync('ourbeing:draft:' + room)
    if (draft) this.setData({ title: draft.title || '', body: draft.body || '' })
  },
  input(e) {
    this.setData({ [e.currentTarget.dataset.field]: e.detail.value, saved: false })
    wx.setStorageSync('ourbeing:draft:' + this.data.room, { title: this.data.title, body: this.data.body })
  },
  visibility(e) { this.setData({ public: e.detail.value }) },
  save() {
    if (this.data.busy) return
    if (!this.data.title.trim() || !this.data.body.trim()) { this.setData({ error: this.data.t['请填写题目和正文。'] }); return }
    this.setData({ busy: true, error: '' })
    return request('saveWriting', { room: this.data.room, title: this.data.title, body: this.data.body, public: this.data.public })
      .then(() => { wx.removeStorageSync('ourbeing:draft:' + this.data.room); this.setData({ saved: true, title: '', body: '' }) })
      .catch(error => this.setData({ error: error.message }))
      .finally(() => this.setData({ busy: false }))
  },
  back() { wx.switchTab({ url: '/pages/mine/mine' }) }
}))
