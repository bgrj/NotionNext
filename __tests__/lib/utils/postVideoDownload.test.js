/**
 * @jest-environment jsdom
 */

import { applyPostVideoDownloadGuard } from '@/lib/utils/postVideoDownload'

describe('postVideoDownload', () => {
  it('marks article videos as not downloadable and blocks the context menu', () => {
    document.body.innerHTML =
      '<div id="notion-article"><video controls></video></div>'
    const root = document.getElementById('notion-article')
    const video = root.querySelector('video')
    const event = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true
    })

    expect(applyPostVideoDownloadGuard(root)).toBe(1)
    expect(video.getAttribute('controlsList')).toContain('nodownload')
    expect(video.dispatchEvent(event)).toBe(false)
  })
})
