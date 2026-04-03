import { useGlobal } from '@/lib/global'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

const Announcement = ({ post, className }) => {
  const { locale } = useGlobal()
  const [visible, setVisible] = useState(true)

  if (!visible || !post?.blockMap) {
    return <></>
  }

  return (
    <div className={`announcement-banner mb-6 ${className || ''}`}>
      <section
        id='announcement-wrapper'
        className='relative inline-flex flex-col items-center
          backdrop-blur-md bg-white/15 dark:bg-black/25
          border border-white/30 dark:border-white/15
          rounded-xl shadow-sm
          px-6 py-2.5 pr-9
          max-w-xs md:max-w-sm'>
        {/* 关闭按钮 */}
        <button
          onClick={() => setVisible(false)}
          className='absolute top-2 right-2.5 text-white/50 hover:text-white/90
            transition-colors duration-200 p-0.5'
          aria-label='关闭公告'>
          <i className='fas fa-times text-xs' />
        </button>
        {/* 标题行 */}
        <div className='flex items-center text-xs font-medium text-white/70 tracking-wide mb-0.5'>
          <i className='mr-1.5 fas fa-bullhorn text-[0.65rem]' />
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
