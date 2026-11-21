import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'

const isoDay = value => {
  const parts = String(value || '').match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
  return parts
    ? `${parts[1]}-${parts[2].padStart(2, '0')}-${parts[3].padStart(2, '0')}`
    : undefined
}

/** Full cover, centered article information and the existing visit counters. */
export default function DaoArticleHero({ post, siteInfo, onOpenContents }) {
  if (!post) return null
  const cover = post.pageCover || siteInfo?.pageCover
  const showVisits = siteConfig('ANALYTICS_BUSUANZI_ENABLE', true)
  return (
    <header id='header' className='ob-reading-hero'>
      <div className='ob-reading-heading'>
        <nav className='ob-reading-nav' aria-label='文章导航'>
          <SmartLink href='/category/道' className='ob-reading-back'>
            <span aria-hidden='true'>← </span>道 · 系列文章
          </SmartLink>
          {onOpenContents && (
            <button
              type='button'
              className='ob-reading-contents'
              onClick={onOpenContents}
            >
              文章目录
            </button>
          )}
        </nav>
        {cover && (
          <figure className='ob-reading-cover'>
            <LazyImage
              src={cover}
              alt={`${post.title}的封面`}
              priority
              width={1600}
              className='w-full h-full object-contain'
            />
          </figure>
        )}
        <h1>{post.title}</h1>
        <div className='ob-reading-meta'>
          {post.publishDay && (
            <span>
              发布于{' '}
              <time dateTime={isoDay(post.publishDay)}>{post.publishDay}</time>
            </span>
          )}
          {post.lastEditedDay && post.lastEditedDay !== post.publishDay && (
            <span>
              更新于{' '}
              <time dateTime={isoDay(post.lastEditedDay)}>
                {post.lastEditedDay}
              </time>
            </span>
          )}
        </div>
        {showVisits && (
          <div
            className='ob-reading-stats'
            aria-label='文章访问统计'
            aria-live='polite'
          >
            <span className='busuanzi_container_page_pv'>
              访问次数 <span className='busuanzi_value_page_pv'>–</span>
            </span>
            <span className='busuanzi_container_page_uv'>
              访问人数 <span className='busuanzi_value_page_uv'>–</span>
            </span>
          </div>
        )}
      </div>
    </header>
  )
}
