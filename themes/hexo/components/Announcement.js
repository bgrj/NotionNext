import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

const Announcement = ({ post, className }) => {
  const { locale } = useGlobal()
  if (post?.blockMap) {
    return <div className={className}>
        <section id='announcement-wrapper' className="dark:text-gray-300 border dark:border-black rounded-xl lg:p-6 p-4 bg-white dark:bg-hexo-black-gray">
            {/* 修改：直接写死中文 '公告' */}
            <div><i className='mr-2 fas fa-bullhorn' />公告</div>
            {post && (<div id="announcement-content">
            <NotionPage post={post} className='text-center' />
        </div>)}
        </section>
    </div>
  } else {
    return <></>
  }
}
export default Announcement
