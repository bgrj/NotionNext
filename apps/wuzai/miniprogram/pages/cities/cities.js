const { localizePage } = require('../../common/localize-page')
const { CITIES, cityLabel } = require('../../common/global')
Page(
  localizePage({
    data: { query: '', cities: [] },
    onShow() {
      this.filter()
    },
    search(event) {
      this.setData({ query: event.detail.value })
      this.filter()
    },
    filter() {
      const query = this.data.query.trim().toLowerCase()
      this.setData({
        cities: CITIES.filter(city =>
          `${city.id} ${city.zh} ${city.country}`.toLowerCase().includes(query)
        ).map(city => ({
          ...city,
          label: cityLabel(city.id, this.data.locale)
        }))
      })
    },
    choose(event) {
      wx.setStorageSync('ourbeing:city', event.currentTarget.dataset.city || '')
      wx.navigateBack()
    },
    custom() {
      const city = this.data.query.trim().slice(0, 80)
      if (!city) return
      wx.setStorageSync('ourbeing:city', city)
      wx.navigateBack()
    }
  })
)
