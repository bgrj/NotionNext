import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import SmartLink from '@/components/SmartLink'
import TagItemMini from './TagItemMini'

/**
 * 文章详情页的Hero块
 */
export default function PostHero({ post, siteInfo }) {
  const { locale, fullWidth } = useGlobal()

  if (!post) {
    return <></>
  }

  // 文章全屏隐藏标头
  if (fullWidth) {
    return <div className='my-8' />
  }

  const headerImage = post?.pageCover ? post.pageCover : siteInfo?.pageCover

  return (
    <div id='header' className='w-full h-96 relative md:flex-shrink-0 z-10 overflow-hidden'>
      <LazyImage
        priority={true}
        src={headerImage}
        className='w-full h-full object-cover object-center absolute top-0'
      />

      <header
        id='article-header-cover'
        className='bg-black bg-opacity-70 absolute top-0 w-full h-96 py-10 flex justify-center items-center '>
        <div className='mt-10 w-full max-w-4xl px-4 sm:px-6'>
          <div className='mb-3 flex justify-center'>
            {post.category && (
              <>
                <SmartLink
                  href={`/category/${post.category}`}
                  passHref
                  legacyBehavior>
                  <div className='cursor-pointer px-2 py-1 mb-2 border rounded-sm dark:border-white text-sm font-medium hover:underline duration-200 shadow-text-md text-white'>
                    {post.category}
                  </div>
                </SmartLink>
              </>
            )}
          </div>

          {/* 文章Title */}
          <div className='w-full text-[2.1rem] sm:text-4xl md:text-5xl leading-[1.25] md:leading-snug font-bold shadow-text-md text-center text-white whitespace-normal break-words'>
            {siteConfig('POST_TITLE_ICON') && (
              <NotionIcon
                icon={post.pageIcon}
                className='inline-block text-3xl sm:text-4xl mr-1 align-text-bottom'
              />
            )}
            <span>{post.title}</span>
          </div>

          <section className='flex-wrap shadow-text-md flex text-sm justify-center mt-4 text-white dark:text-gray-400 font-light leading-8'>
            <div className='flex justify-center dark:text-gray-200 text-opacity-70'>
              {post?.type !== 'Page' && (
                <>
                  <SmartLink
                    href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                    passHref
                    className='pl-1 mr-2 cursor-pointer hover:underline'>
                    {locale.COMMON.POST_TIME}: {post?.publishDay}
                  </SmartLink>
                </>
              )}
              <div className='pl-1 mr-2'>
                {locale.COMMON.LAST_EDITED_TIME}: {post.lastEditedDay}
              </div>
            </div>

            {JSON.parse(siteConfig('ANALYTICS_BUSUANZI_ENABLE')) && (
              <div className='busuanzi_container_page_pv font-light mr-2'>
                <span className='mr-2 busuanzi_value_page_pv' />
                {locale.COMMON.VIEWS}
              </div>
            )}
          </section>

          <div className='mt-4 mb-1 w-full'>
            {post.tagItems && (
              <div className='flex justify-start sm:justify-center flex-nowrap overflow-x-auto'>
                {post.tagItems.map(tag => (
                  <TagItemMini key={tag.name} tag={tag} />
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  )
}
