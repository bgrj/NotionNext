const { request } = require('../../common/api')

Page({
  data: {
    status: 'ready',
    message: '确认后，将登录展示这个二维码的设备。'
  },
  onLoad(query) {
    const scene = query && query.scene ? decodeURIComponent(query.scene) : ''
    this.ticket = scene
    if (!/^[a-f0-9]{32}$/.test(scene)) {
      this.setData({
        status: 'bad',
        message: '这个二维码已经失效，请在电脑上重新生成。'
      })
    }
  },
  confirm() {
    if (this.data.status === 'working' || this.data.status === 'bad') return
    this.setData({ status: 'working', message: '正在确认…' })
    request('confirmAdminScan', { ticket: this.ticket })
      .then(() => {
        this.setData({ status: 'done', message: '已确认。请回到电脑上的后台。' })
      })
      .catch(error => {
        this.setData({
          status: 'ready',
          message: error.message || '没有确认成功，请重试。'
        })
      })
  }
})
