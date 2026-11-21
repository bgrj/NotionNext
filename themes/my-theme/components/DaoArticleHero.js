import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'

const isoDay = value => {
  const parts = String(value || '').match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
  return parts
    ? `${parts[1]}-${parts[2].padStart(2, '0')}-${parts[3].padStart(2, '0')}`
    : undefined
}

/** Quiet article masthead; the title remains readable above a subdued cover. */
export default function DaoArticleHero({ post, onOpenContents }) {
  if (!post) return null
  return (
    <header id='header' className='ob-reading-hero'>
      {post.pageCover && (
        <div className='ob-reading-cover' aria-hidden='true'>
          <LazyImage
            src={post.pageCover}
            alt=''
            priority
            width={1200}
            className='w-full h-full object-cover'
          />
        </div>
      )}
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
      </div>
    </header>
  )
}
