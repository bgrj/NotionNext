import { siteConfig } from '@/lib/config'
import { useEffect, useId, useRef, useState } from 'react'
import CONFIG from '../config'
import { NOTICE, NOTICE_VERSION } from '../noticeContent'

const STORAGE_KEY = `ourbeings.notice.dismissed.${NOTICE_VERSION}`

/**
 * 首次访问全站弹窗。文案以仓库 noticeContent.js 为准，避免 Notion 缓存把旧稿弹出来。
 */
const NoticeModal = () => {
  const titleId = useId()
  const closeRef = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let dismissed = ''
    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY) || ''
    } catch (error) {
      dismissed = ''
    }
    if (dismissed === NOTICE_VERSION) return undefined

    const timer = window.setTimeout(() => setOpen(true), 280)
    return () => window.clearTimeout(timer)
  }, [])

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, NOTICE_VERSION)
    } catch (error) {
      // 无痕模式写不进 storage 时，仍关闭本次
    }
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus?.()

    const onKey = event => {
      if (event.key === 'Escape') dismiss()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!open) return null

  const primary = siteConfig('HEXO_COLOR_PRIMARY', '#C9A66B', CONFIG)

  return (
    <div
      className='ob-notice-modal'
      role='dialog'
      aria-modal='true'
      aria-labelledby={titleId}>
      <button
        type='button'
        className='ob-notice-backdrop'
        aria-label='关闭公告'
        onClick={dismiss}
      />
      <div className='ob-notice-panel' style={{ ['--ob-notice-accent']: primary }}>
        <div className='ob-notice-head'>
          <div id={titleId} className='ob-notice-kicker'>
            <i className='fas fa-bullhorn' aria-hidden='true' />
            <span>{NOTICE.title}</span>
          </div>
          <button
            ref={closeRef}
            type='button'
            className='ob-notice-x'
            onClick={dismiss}
            aria-label='关闭公告'>
            <i className='fas fa-times' aria-hidden='true' />
          </button>
        </div>

        <div className='ob-notice-body'>
          <p className='ob-notice-motto'>
            🫰🏻{NOTICE.motto}🫰🏻
          </p>
          <p className='ob-notice-stamp'>{NOTICE.updatedAt}</p>
          <p className='ob-notice-lead'>{NOTICE.lead}</p>
          {NOTICE.body.map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            <span className='ob-notice-label'>{NOTICE.recentLabel}</span>
            {NOTICE.recent.date}，发布《
            <a href={NOTICE.recent.href}>{NOTICE.recent.title}</a>
            》
          </p>
          <p>
            <span className='ob-notice-label'>{NOTICE.aboutLabel}</span>
            <a href={NOTICE.about.href}>{NOTICE.about.title}</a>
          </p>
        </div>

        <div className='ob-notice-foot'>
          <button type='button' className='ob-notice-enter' onClick={dismiss}>
            进入网站
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoticeModal
