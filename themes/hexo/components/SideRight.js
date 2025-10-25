import Live2D from '@/components/Live2D'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'
import CONFIG from '../config'
import { AnalyticsCard } from './AnalyticsCard'
import Announcement from './Announcement'
import Card from './Card'
import Catalog from './Catalog'
import CategoryGroup from './CategoryGroup'
import { InfoCard } from './InfoCard'
import LatestPostsGroup from './LatestPostsGroup'
import TagGroups from './TagGroups'

const HexoRecentComments = dynamic(() => import('./HexoRecentComments'))
const FaceBookPage = dynamic(
  () => {
    let facebook = <></>
    try {
      facebook = import('@/components/FacebookPage')
    } catch (err) {
      console.error(err)
    }
    return facebook
  },
  { ssr: false }
)

/**
 * Hexo主题右侧栏
 * @param {*} props
 * @returns
 */
export default function SideRight(props) {
  const {
    post,
    currentCategory,
    categories,
    latestPosts,
    tags,
    currentTag,
    showCategory,
    showTag,
    rightAreaSlot,
    notice,
    className
  } = props

  const { locale } = useGlobal()

  // 文章全屏处理
  if (post && post?.fullWidth) {
    return null
  }

  return (
    <div
      id='sideRight'
      className={` lg:w-80 lg:pt-8 ${post ? 'lg:pt-0' : 'lg:pt-4'}`}>
      
      {/* --- 将响应式类名应用到这个父容器 --- */}
      <div className='sticky top-8 space-y-4 sidebar-widget-responsive-shift-left'> {/* <<<<< 在这里添加类名 */}
        
        {/* Catalog (如果存在) */}
        {post && post.toc && post.toc.length > 1 && (
          <Card>
            <Catalog toc={post.toc} />
          </Card>
        )}

        {/* InfoCard (移除之前的包裹 div) */}
        <InfoCard {...props} /> 

        {/* AnalyticsCard (如果启用) */}
        {siteConfig('HEXO_WIDGET_ANALYTICS', null, CONFIG) && (
          <AnalyticsCard {...props} />
        )}

        {/* CategoryGroup (如果启用) */}
        {showCategory && (
          <Card>
            {/* ... category content ... */}
            <CategoryGroup currentCategory={currentCategory} categories={categories} />
          </Card>
        )}
        
        {/* TagGroups (如果启用) */}
        {showTag && (
          <Card>
            <TagGroups tags={tags} currentTag={currentTag} />
          </Card>
        )}

        {/* LatestPostsGroup (如果启用) */}
        {siteConfig('HEXO_WIDGET_LATEST_POSTS', null, CONFIG) && latestPosts && latestPosts.length > 0 && (
          <Card>
            <LatestPostsGroup {...props} />
          </Card>
        )}

        {/* Announcement */}
        <Announcement post={notice} />

        {/* HexoRecentComments (移除之前的包裹 div) */}
        {siteConfig('COMMENT_WALINE_SERVER_URL') && siteConfig('COMMENT_WALINE_RECENT') && (
          // 确保 Card 存在 (如果需要样式)
          <Card className='mt-4'> 
            <HexoRecentComments />
          </Card>
        )}

        {/* 其他组件 */}
        {rightAreaSlot}
        <FaceBookPage />
        <Live2D />
      </div> {/* --- End of shifted container --- */}
    </div>
  )
}
