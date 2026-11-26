/** Only public navigation records reach this component from the Notion menu. */
export function settingsMenu(menu, openSections) {
  const seen = new Set()
  const result = []
  const visit = items => {
    for (const item of Array.isArray(items) ? items : []) {
      const href = String(item?.href || item?.slug || '').trim()
      if (item?.status && item.status !== 'Published') continue
      if (item?.show === false) continue
      if (
        /^(https?:\/\/|\/(?!\/))/.test(href) &&
        href !== '/#' &&
        !/[\\\u0000-\u001f]/.test(href)
      ) {
        let url
        try {
          url = new URL(href, 'https://ourbeings.com')
        } catch {
          continue
        }
        if (url.username || url.password) continue
        const path = url.pathname
        const aggregate = /^\/(archive|category|tag|search)(\/|$)/.test(path)
        if (!seen.has(href) && (!aggregate || openSections.length === 4)) {
          result.push({
            href,
            title: String(item.title || item.name || '').trim()
          })
          seen.add(href)
        }
      }
      visit(item?.subMenus)
    }
  }
  visit(menu)
  const adminHref = '/our-beings/feedback-admin'
  if (!seen.has(adminHref)) {
    result.push({
      href: adminHref,
      title: 'ourbeing小程序后台管理'
    })
  }
  return result.filter(item => item.title)
}
