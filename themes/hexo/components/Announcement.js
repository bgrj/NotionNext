import { useGlobal } from '@/lib/global'
import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

/**
 * 公告组件 - 滚动触发的居中弹窗
 * 当用户向下滚动超过 Hero 区域时自动弹出，由大变小动画，
 * 10秒后自动消失或用户点击关闭按钮消除。
 */
const Announcement = ({ post, className }) => {
  const { locale } = useGlobal()
  const [dismissed, setDismissed] = useState(false)
  const [triggered, setTriggered] = useState(false)
  const [animateOut, setAnimateOut] = useState(false)
  const timerRef = useRef(null)

  const handleDismiss = useCallback(() => {
    setAnimateOut(true)
    // 等淡出动画结束再彻底移除
    setTimeout(() => setDismissed(true), 400)
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  // 监听滚动，当页面滚动超过视口高度的 80% 时触发公告
  useEffect(() => {
    if (dismissed || triggered || !post?.blockMap) return

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const threshold = window.innerHeight * 0.8
      if (scrollY >= threshold) {
        setTriggered(true)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed, triggered, post])

  // 触发后 10 秒自动消失
  useEffect(() => {
    if (triggered && !dismissed) {
      timerRef.current = setTimeout(() => {
        handleDismiss()
      }, 10000)
      return () => clearTimeout(timerRef.current)
    }
  }, [triggered, dismissed, handleDismiss])

  if (dismissed || !post?.blockMap) {
    return <></>
  }

  if (!triggered) {
    return <></>
  }

  return (
    <div
      className={`announcement-overlay ${animateOut ? 'announcement-fade-out' : 'announcement-scale-in'}`}
      onClick={e => {
        // 点击遮罩层也可关闭
        if (e.target === e.currentTarget) handleDismiss()
      }}>
      <section
        id='announcement-wrapper'
        className='relative flex flex-col items-center
          backdrop-blur-md bg-white/90 dark:bg-gray-800/95
          border border-gray-200 dark:border-gray-600
          rounded-2xl shadow-2xl
          px-8 py-5 pr-10
          max-w-sm md:max-w-md'>
        {/* 关闭按钮 */}
        <button
          onClick={handleDismiss}
          className='absolute top-3 right-3 text-gray-400 hover:text-gray-700
            dark:text-gray-400 dark:hover:text-gray-100
            transition-colors duration-200 p-1'
          aria-label='关闭公告'>
          <i className='fas fa-times text-sm' />
        </button>
        {/* 标题行 */}
        <div className='flex items-center text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wide mb-1'>
          <i className='mr-2 fas fa-bullhorn text-xs' />
          {locale.COMMON.ANNOUNCEMENT}
        </div>
        {/* 公告内容 */}
        {post && (
          <div id='announcement-content'>
            <NotionPage post={post} className='text-center' />
          </div>
        )}
      </section>
    </div>
  )
}
export default Announcement
