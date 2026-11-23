const { request } = require('./api')
let session = null
let pending = null
const MAX_AGE = 5 * 60 * 1000

function getSession() {
  if (session && Date.now() - session.verifiedAt >= MAX_AGE) session = null
  return session
}
function clearSession() {
  session = null
}
function login() {
  if (getSession()) return Promise.resolve(session)
  if (pending) return pending
  pending = request('login')
    .then(result => {
      if (
        result.user?.authenticated !== true ||
        result.user.platform !== 'wechat'
      )
        throw new Error('微信登录未完成，请重试。')
      session = { authenticated: true, verifiedAt: Date.now() }
      return session
    })
    .catch(error => {
      clearSession()
      throw error
    })
    .finally(() => {
      pending = null
    })
  return pending
}
module.exports = { login, getSession, clearSession }
