const { localizePage } = require('../../common/localize-page')
const { CITIES, cityLabel } = require('../../common/global')
const { request } = require('../../common/api')
Page(
  localizePage({
    data: {
      query: '',
      cities: [],
      places: [],
      loading: false,
      error: '',
      searched: false
    },
    onLoad(options) {
      this.mode = options.mode || 'filter'
    },
    onShow() {
      this.filter()
    },
    search(event) {
      this.setData({
        query: event.detail.value,
        places: [],
        searched: false,
        error: ''
      })
      this.filter()
    },
    findPlaces() {
      if (this.data.loading) return Promise.resolve()
      this.setData({ loading: true, error: '', searched: false })
      const query = this.data.query.trim()
      return request('locations', { query, language: this.data.locale })
        .then((data) => {
          if (query === this.data.query.trim())
            this.setData({ places: data.places, searched: true })
        })
        .catch((error) => {
          if (query === this.data.query.trim())
            this.setData({ error: error.message })
        })
        .finally(() => this.setData({ loading: false }))
    },
    filter() {
      const query = this.data.query.trim().toLowerCase()
      this.setData({
        cities: CITIES.filter((city) =>
          `${city.id} ${city.zh} ${city.country}`.toLowerCase().includes(query)
        ).map((city) => ({
          ...city,
          label: cityLabel(city.id, this.data.locale)
        }))
      })
    },
    choose(event) {
      wx.setStorageSync('ourbeing:city', event.currentTarget.dataset.city || '')
      wx.removeStorageSync('ourbeing:place')
      wx.navigateBack()
    },
    choosePlace(event) {
      const place = this.data.places[Number(event.currentTarget.dataset.index)]
      if (!place) return
      wx.setStorageSync('ourbeing:city', place.label.slice(0, 160))
      wx.setStorageSync('ourbeing:place', place)
      wx.navigateBack()
    },
    custom() {
      const city = this.data.query.trim().slice(0, 160)
      if (!city) return
      wx.setStorageSync('ourbeing:city', city)
      wx.removeStorageSync('ourbeing:place')
      wx.navigateBack()
    },
    attribution() {
      wx.setClipboardData({ data: 'https://www.openstreetmap.org/copyright' })
    }
  })
)
