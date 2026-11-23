const { request } = require('./api')
const { getSession } = require('./auth')
function start(page) {
  stop(page)
  const session = Date.now().toString(36) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
  page._presenceSession = session
  page.refreshPresence = () => {
    if (page._presenceSession !== session) return
    const event = page.data.event
    const room = event && (event.isHost || event.reservation === 'confirmed') ? event.id : ''
    page._renewPresence = page._renewPresence || !!getSession()
    return request(page._renewPresence ? 'presence' : 'presenceStats', page._renewPresence ? { session, ...(room ? { id: room } : {}) } : {})
      .then(data => { if (page._presenceSession === session) page.setData({ presence: data.presence }) })
      .catch(() => { if (page._presenceSession === session) page.setData({ presence: null }) })
  }
  page.refreshPresence()
  page._presenceTimer = setInterval(page.refreshPresence, 30000)
}
function stop(page) {
  if (page._presenceTimer) clearInterval(page._presenceTimer)
  const session = page._presenceSession
  page._presenceSession = null
  if (session && getSession()) request('presence', { session, leave: true }).catch(() => {})
}
module.exports = { start, stop }
