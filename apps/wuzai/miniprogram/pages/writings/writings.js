const { localizePage } = require('../../common/localize-page')
const { request } = require('../../common/api')
const { localTime } = require('../../common/global')
Page(localizePage({
  data: { writings: [], visible: [], room: 'all', error: '', loading: true },
  onShow() { this.load() },
  load() { this.setData({ loading: true, error: '' }); return request('publicWritings').then(data => { this.setData({ writings: data.writings.map(item => ({ ...item, timeLabel: localTime(item.createdAt) })) }); this.filter() }).catch(error => this.setData({ error: error.message })).finally(() => this.setData({ loading: false })) },
  choose(e) { this.setData({ room: e.currentTarget.dataset.room }); this.filter() },
  filter() { this.setData({ visible: this.data.writings.filter(item => this.data.room === 'all' || item.room === this.data.room) }) }
}))
