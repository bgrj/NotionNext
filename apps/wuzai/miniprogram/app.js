const settings = require('./settings')
App({
  onLaunch() {
    if (wx.cloud) wx.cloud.init({ env: settings.cloudEnv, traceUser: false })
  }
})
