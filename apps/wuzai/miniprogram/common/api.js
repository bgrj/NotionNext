const settings = require('../settings')
function request(action, input = {}) {
  if (!wx.cloud) return Promise.reject(new Error('请更新微信后再试。'))
  return Promise.resolve()
    .then(() =>
      wx.cloud.callFunction({
        name: settings.functionName,
        data: {
          action,
          input,
          nickname: wx.getStorageSync('wuzai:nickname') || ''
        }
      })
    )
    .then(response => {
      const result = response.result || {}
      if (result.error)
        throw new Error(result.message || '暂时没能完成，请稍后重试。')
      if (result.version !== 1)
        throw new Error('活动服务暂未就绪，请稍后再来。')
      return result
    })
}
module.exports = { request }
