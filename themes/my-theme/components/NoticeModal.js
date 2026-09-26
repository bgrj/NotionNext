import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useEffect, useId, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import CONFIG from '../config'

const NotionPage = dynamic(() => import('@/components/NotionPage'), {
  ssr: false
})

const STORAGE_KEY = 'ourbeings.notice.dismissed'

const noticeVersion = notice =>
  String(notice?.lastEditedDate || notice?.lastEditedDay || notice?.title || '1')

/**
 * 首次访问全站弹窗公告。
 * 关闭后写入 localStorage；同一浏览器不再弹出。
 * 公告页在 Notion 更新后（lastEditedDate 变化）会再弹一次。
 */
const NoticeModal = ({ notice }) => {
  const { locale } = useGlobal()
  const titleId = useId()
  const closeRef = useRef(null)
  const [open, setOpen] = useState(false)
  const version = noticeVersion(notice)

  useEffect(() => {
    if (!notice?.blockMap) return undefined

    let dismissed = ''
    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY) || ''
    } catch (error) {
      dismissed = ''
    }
    if (dismissed === version) return undefined

    const timer = window.setTimeout(() => setOpen(true), 280)
    return () => window.clearTimeout(timer)
  }, [notice, version])

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, version)
    } catch (error) {
      // 无痕模式等写不进 storage 时，仍关闭本次弹窗
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
  }, [open, version])

  if (!open || !notice?.blockMap) return null

  const title = notice?.title || locale.COMMON.ANNOUNCEMENT
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
            <span>{title}</span>
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
          <NotionPage post={notice} className='ob-notice-notion' />
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
