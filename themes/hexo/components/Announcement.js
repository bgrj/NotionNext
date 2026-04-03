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
    <div className={`announcement-float-banner fixed z-40
      top-20 left-1/2 -translate-x-1/2
      w-[88%] max-w-sm
      md:top-20 md:w-auto md:min-w-[320px] md:max-w-md
      ${className || ''}`}>
      <section
        id='announcement-wrapper'
        className='relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80
          border border-white/50 dark:border-gray-600/40
          rounded-2xl shadow-lg
          px-5 pt-4 pb-3'>
        {/* 关闭按钮 */}
        <button
          onClick={() => setVisible(false)}
          className='absolute top-2.5 right-3 text-gray-400 hover:text-gray-600
            dark:hover:text-gray-200 transition-colors duration-200 p-1'
          aria-label='关闭公告'>
          <i className='fas fa-times text-xs' />
        </button>
        {/* 标题行 */}
        <div className='flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 mb-0.5'>
          <i className='mr-2 fas fa-bullhorn text-gray-400 dark:text-gray-500' />
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
