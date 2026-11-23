const { translate } = require('./i18n')
const settings = require('../settings')
function call(action, input = {}) {
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
      if (result.error) {
        const error = new Error(result.message || '暂时没能完成，请稍后重试。')
        error.code = result.error
        throw error
      }
      if (result.version !== 1)
        throw new Error('活动服务暂未就绪，请稍后再来。')
      return result
    })
}
function request(action, input = {}) {
  const auth = require('./auth')
  const ready = ['list', 'get', 'login', 'presenceStats'].includes(action)
    ? Promise.resolve()
    : auth.login()
  return ready.then(() => call(action, input)).catch(error => {
    if (['wechat_login_required', 'invalid_bridge'].includes(error.code))
      auth.clearSession()
    const locale = wx.getStorageSync('ourbeing:language') || 'zh'
    error.message = translate(error.message || '暂时没能完成，请稍后重试。', locale)
    throw error
  })
}
module.exports = { request }
