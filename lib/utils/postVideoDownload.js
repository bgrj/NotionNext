/**
 * Hide the native video "Download" control on Post pages.
 * This is a player-UI guard, not DRM: it does not encrypt media.
 */

const preventMenu = event => {
  event.preventDefault()
}

export function applyPostVideoDownloadGuard(root) {
  if (!root?.querySelectorAll) return 0
  const videos = root.querySelectorAll('video')
  videos.forEach(video => {
    const current = video.getAttribute('controlsList') || ''
    const tokens = new Set(current.split(/\s+/).filter(Boolean))
    tokens.add('nodownload')
    video.setAttribute('controlsList', [...tokens].join(' '))
    if (video.controlsList?.add) {
      try {
        video.controlsList.add('nodownload')
      } catch {
        // jsdom and some browsers expose a read-only token list.
      }
    }
    video.setAttribute('controlslist', video.getAttribute('controlsList'))
    if (video.dataset.downloadGuarded !== '1') {
      video.dataset.downloadGuarded = '1'
      video.addEventListener('contextmenu', preventMenu)
    }
  })
  return videos.length
}

export function watchPostVideoDownloadGuard(root) {
  if (!root) return () => {}
  applyPostVideoDownloadGuard(root)
  if (typeof MutationObserver === 'undefined') return () => {}
  const observer = new MutationObserver(() => applyPostVideoDownloadGuard(root))
  observer.observe(root, { childList: true, subtree: true })
  return () => observer.disconnect()
}
