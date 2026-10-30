import { siteConfig } from '@/lib/config'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import CONFIG from '../config'
import {
  NOTICE,
  NOTICE_RECENT_EXCLUDE_SLUGS,
  NOTICE_VERSION
} from '../noticeContent'

const STORAGE_KEY = `ourbeings.notice.dismissed.${NOTICE_VERSION}`

const readSeen = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === NOTICE_VERSION
  } catch (error) {
    return false
  }
}

const persistSeen = () => {
  try {
    window.localStorage.setItem(STORAGE_KEY, NOTICE_VERSION)
  } catch (error) {
    // 无痕 / 微信写不进 storage 时，仍关闭本次
  }
}

const postTime = post => {
  const value = post?.lastEditedDate || post?.publishDate
  if (value == null || value === '') return 0
  if (typeof value === 'number') return value
  const time = new Date(value).getTime()
  return Number.isNaN(time) ? 0 : time
}

const formatZhDate = post => {
  const stamp =
    (typeof post?.publishDate === 'number' ? post.publishDate : 0) ||
    postTime(post)
  const date = stamp ? new Date(stamp) : null
  if (date && !Number.isNaN(date.getTime())) {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })
        .formatToParts(date)
        .map(part => [part.type, part.value])
    )
    if (parts.year && parts.month && parts.day) {
      return `${parts.year}年${Number(parts.month)}月${Number(parts.day)}日`
    }
  }
  return post?.publishDay || post?.lastEditedDay || NOTICE.recent?.date || ''
}

const slugOf = post =>
  String(post?.slug || '')
    .replace(/^\/+/, '')
    .split('/')[0]
    .toLowerCase()

export const pickLatestPublishedPost = latestPosts => {
  const exclude = new Set(
    (NOTICE_RECENT_EXCLUDE_SLUGS || []).map(item => String(item).toLowerCase())
  )
  const posts = (latestPosts || []).filter(post => {
    if (!post?.title || !post?.href) return false
    if (post.type && post.type !== 'Post') return false
    if (exclude.has(slugOf(post))) return false
    return true
  })
  if (!posts.length) return null
  return [...posts].sort((a, b) => postTime(b) - postTime(a))[0]
}

/**
 * 任意页面首次进入弹出。只在关闭 / 点弹窗内链接后记住，避免微信二次加载把「看过」写进去。
 */
const NoticeModal = ({ latestPosts } = {}) => {
  const titleId = useId()
  const closeRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (readSeen()) return undefined
    setOpen(true)
    return undefined
  }, [])

  const dismiss = () => {
    persistSeen()
    setOpen(false)
  }

  const onNoticeClick = event => {
    const link = event.target.closest?.('a')
    if (!link) return
    persistSeen()
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
    const onLeave = () => persistSeen()
    document.addEventListener('keydown', onKey)
    window.addEventListener('pagehide', onLeave)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('pagehide', onLeave)
    }
  }, [open])

  if (!mounted || !open) return null

  const primary = siteConfig('HEXO_COLOR_PRIMARY', '#C9A66B', CONFIG)
  const mottoLines = NOTICE.mottoLines || [NOTICE.motto]
  const live = pickLatestPublishedPost(latestPosts)
  const recent = live
    ? {
        date: formatZhDate(live),
        title: live.title,
        href: live.href
      }
    : NOTICE.recent

  const node = (
    <div
      id='ob-notice-modal'
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

        <div
          className='ob-notice-body'
          onClick={onNoticeClick}
          onAuxClick={onNoticeClick}>
          <p className='ob-notice-motto'>
            {mottoLines.map(line => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <p className='ob-notice-stamp'>{NOTICE.updatedAt}</p>
          <p className='ob-notice-lead'>{NOTICE.lead}</p>
          {NOTICE.body.map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {recent?.title && recent?.href && (
            <p>
              <span className='ob-notice-label'>{NOTICE.recentLabel}</span>
              {recent.date ? `${recent.date}，` : ''}发布《
              <a href={recent.href}>{recent.title}</a>
              》
            </p>
          )}
          {NOTICE.album && (
            <p>
              <a href={NOTICE.album.href}>{NOTICE.album.title}</a>
            </p>
          )}
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

  if (typeof document === 'undefined' || !document.body) return node
  return createPortal(node, document.body)
}

export default NoticeModal
