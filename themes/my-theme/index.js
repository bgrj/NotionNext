import Comment from '@/components/Comment'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import { siteConfig } from '@/lib/config'
import { syncPrettyPostUrl } from '@/lib/utils/postTitleUrl'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef } from 'react'
import ArticleAdjacent from '@/themes/hexo/components/ArticleAdjacent'
import ArticleCopyright from '@/themes/hexo/components/ArticleCopyright'
import { ArticleLock } from '@/themes/hexo/components/ArticleLock'
import ArticleRecommend from '@/themes/hexo/components/ArticleRecommend'
import BlogPostArchive from '@/themes/hexo/components/BlogPostArchive'
import BlogPostListPage from '@/themes/hexo/components/BlogPostListPage'
import BlogPostListScroll from '@/themes/hexo/components/BlogPostListScroll'
import ButtonJumpToComment from '@/themes/hexo/components/ButtonJumpToComment'
import ButtonRandomPostMini from '@/themes/hexo/components/ButtonRandomPostMini'
import Card from '@/themes/hexo/components/Card'
import Footer from './components/Footer'
import Header from './components/Header'
import FriendLinks from './components/FriendLinks'
import OurBeingsIndex from './components/OurBeingsIndex'
import BeingLife from './components/BeingLife'
const CommunityApp = dynamic(() => import('./components/community/CommunityApp'))
import { LayoutSignIn, LayoutSignUp } from './components/OurBeingsAuth'
import NoticeModal from './components/NoticeModal'
import { EXISTENCE_CATEGORY, isExistenceCategory } from './existence'
import {
  isOurBeingsAuthPath,
  isOurBeingsCategory,
  isOurBeingsPath
} from './beings'
import Hero from './components/Hero'
import PostHero from '@/themes/hexo/components/PostHero'
import RightFloatArea from '@/themes/hexo/components/RightFloatArea'
import SearchNav from '@/themes/hexo/components/SearchNav'
import SlotBar from '@/themes/hexo/components/SlotBar'
import TagItemMini from '@/themes/hexo/components/TagItemMini'
import TocDrawer from '@/themes/hexo/components/TocDrawer'
import TocDrawerButton from '@/themes/hexo/components/TocDrawerButton'
import ArticleSwitchPlaceholder from '@/themes/hexo/components/ArticleSwitchPlaceholder'
import CONFIG from './config'
import { Style } from './style'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

// 主题全局状态
const ThemeGlobalHexo = createContext()
export const useHexoGlobal = () => useContext(ThemeGlobalHexo)

const normalizeSitePath = asPath =>
  String(asPath || '')
    .split('#')[0]
    .split('?')[0]
    .replace(/\/+$/, '')

const isFriendLinksPath = asPath => {
  const path = normalizeSitePath(asPath)
  return path === '/links' || path === '/link'
}

const isFriendLinksSlug = slug => {
  const s = String(slug || '')
    .replace(/^\/+/, '')
    .split('/')[0]
    .toLowerCase()
  return s === 'links' || s === 'link'
}

const slugFromRouter = router => {
  const raw = router?.query?.slug
  if (Array.isArray(raw)) return raw[0]
  return raw
}

const isFriendLinksView = ({ asPath, slug } = {}) =>
  isFriendLinksPath(asPath) || isFriendLinksSlug(slug)

const decodePath = asPath => {
  const path = normalizeSitePath(asPath)
  try {
    return decodeURIComponent(path)
  } catch (e) {
    return path
  }
}

const isExistencePath = asPath => {
  const path = decodePath(asPath)
  return (
    path === `/category/${EXISTENCE_CATEGORY}` ||
    path.startsWith(`/category/${EXISTENCE_CATEGORY}/`)
  )
}

/**
 * 基础布局 采用左右两侧布局，移动端使用顶部导航栏
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { post, children, slotTop, className } = props
  const { onLoading, fullWidth } = useGlobal()
  const router = useRouter()
  const showRandomButton = siteConfig('HEXO_MENU_RANDOM', false, CONFIG)
  const isArticleSlugPage = router.pathname === '/[prefix]/[slug]'
  const friendLinks = isFriendLinksView({
    asPath: router.asPath,
    slug: post?.slug || slugFromRouter(router)
  })
  const existence = isExistencePath(router.asPath)
  const ourBeings = isOurBeingsPath(router.asPath)
  const auth = isOurBeingsAuthPath(router.asPath)
  const editorial = /^\/category\/(?:道|术)(?:\/|$)/.test(decodePath(router.asPath))
  const chromeLite = friendLinks || existence || ourBeings || auth || editorial
  const hexoArticleRouteLoading = siteConfig(
    'HEXO_ARTICLE_ROUTE_LOADING',
    true,
    CONFIG
  )
  const showArticleSwitchPlaceholder =
    hexoArticleRouteLoading && isArticleSlugPage && onLoading && !chromeLite
  // 所有文章共用全宽布局，不依赖分类、slug 或 Notion 的 fullWidth 开关。
  const articleLayout = Boolean(post) && !chromeLite
  const wideMain = fullWidth || chromeLite || articleLayout
  const listWithoutSidebar = !post && !chromeLite && !fullWidth

  const headerSlot = chromeLite ? null : post ? (
    <PostHero {...props} />
  ) : router.route === '/' &&
    siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG) ? (
    <Hero {...props} />
  ) : null

  // 只在「这一页真的渲染了头图」时用 pt-0；分类/标签/搜索等无头图页
  // 若仍看 HEXO_HOME_BANNER_ENABLE，会被固定顶栏挡住列表和分类标题。
  const hasHero = Boolean(headerSlot)
  // The landing page ends at the hero; category/search/article layouts stay intact.
  const heroOnlyHome = !post && router.route === '/' && hasHero
  const wrapperTop = hasHero ? 'pt-0' : 'ob-below-nav'

  const drawerRight = useRef(null)
  const tocRef = isBrowser ? document.getElementById('article-wrapper') : null

  // 悬浮按钮内容
  const floatSlot = (
    <>
      {post?.toc?.length > 1 && !chromeLite && (
        <div className='block'>
          <TocDrawerButton
            onClick={() => {
              drawerRight?.current?.handleSwitchVisible()
            }}
          />
        </div>
      )}
      {post && !chromeLite && <ButtonJumpToComment />}
      {showRandomButton && <ButtonRandomPostMini {...props} />}
    </>
  )

  // Algolia搜索框
  const searchModal = useRef(null)

  return (
    <ThemeGlobalHexo.Provider value={{ searchModal }}>
      <div
        id='theme-my-theme'
        className={`${siteConfig('FONT_STYLE')} dark:bg-black scroll-smooth${friendLinks ? ' ob-fl-layout' : ''}${existence || ourBeings || auth || editorial ? ' ob-ex-layout' : ''}${listWithoutSidebar && !heroOnlyHome ? ' ob-list-layout' : ''}${heroOnlyHome ? ' ob-home-only' : ''}${articleLayout ? ' ob-article-layout' : ''}`}
      >
        <Style />

        {/* 顶部导航 */}
        <Header {...props} />

        {/* 顶部嵌入 */}
        {heroOnlyHome ? (
          <main id='ob-home-main'>{headerSlot}</main>
        ) : (
          <Transition
            show={!onLoading}
            appear={true}
            enter='transition ease-in-out duration-700 transform order-first'
            enterFrom='opacity-0 -translate-y-16'
            enterTo='opacity-100'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='opacity-100'
            leaveTo='opacity-0 translate-y-16'
            unmount={false}
          >
            {headerSlot}
          </Transition>
        )}

        {/* Keep Next's page/SEO lifecycle mounted, without a list container. */}
        {heroOnlyHome && children}

        {/* 主区块 */}
        {!heroOnlyHome && (
          <main
            id='wrapper'
            className={`${wrapperTop} bg-hexo-background-gray dark:bg-black w-full ${articleLayout ? 'px-0' : `px-4 md:px-8 ${chromeLite ? 'lg:px-8' : 'lg:px-24'}`} pb-14 md:pb-16 min-h-screen relative`}
          >
            <div
              id='container-inner'
              className='w-full mx-auto lg:flex lg:gap-10 justify-center relative z-10'
            >
              <div
                className={`${className || ''} w-full min-w-0 ${wideMain ? '' : listWithoutSidebar ? 'max-w-5xl' : 'max-w-4xl'} h-full ${chromeLite ? '' : 'overflow-x-hidden'}`}
              >
                {showArticleSwitchPlaceholder ? (
                  <ArticleSwitchPlaceholder />
                ) : (
                  <Transition
                    show={articleLayout || isArticleSlugPage ? true : !onLoading}
                    appear={!articleLayout}
                    enter='transition ease-in-out duration-700 transform order-first'
                    enterFrom='opacity-0 translate-y-16'
                    enterTo='opacity-100'
                    leave='transition ease-in-out duration-300 transform'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 -translate-y-16'
                    unmount={false}
                  >
                    {/* 主区上部嵌入 */}
                    {slotTop}

                    {children}
                  </Transition>
                )}
              </div>
            </div>
          </main>
        )}

        {!chromeLite && (
          <div className='ob-article-toc block'>
            <TocDrawer post={post} cRef={drawerRight} targetRef={tocRef} />
          </div>
        )}

        {/* 悬浮菜单 */}
        <RightFloatArea floatSlot={floatSlot} />

        {/* 全文搜索 */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />

        {/* 页脚 */}
        <Footer title={siteConfig('TITLE')} />

        {/* 首次访问公告弹窗：定位文案在 noticeContent.js；最近一篇跟站点 latestPosts 走 */}
        {router.route === '/' && <NoticeModal latestPosts={props.latestPosts} />}
      </div>
    </ThemeGlobalHexo.Provider>
  )
}

/**
 * 首页
 * 启用头图时只保留主视觉和页脚；未启用时保留文章列表。
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  if (siteConfig('HEXO_HOME_BANNER_ENABLE', null, CONFIG)) return null
  return <LayoutPostList {...props} className='pt-8' />
}

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  const router = useRouter()
  if (isExistenceCategory(props.category) || isExistencePath(router.asPath)) {
    return <CommunityApp defaultView='workspace' {...props} />
  }
  if (isOurBeingsCategory(props.category) || isOurBeingsPath(router.asPath)) {
    return <OurBeingsIndex {...props} />
  }
  if (['道', '术'].includes(props.category)) {
    return <CommunityApp defaultView={props.category === '道' ? 'dao' : 'shu'} {...props} />
  }
  return (
    <div className={props.className || 'pt-2'}>
      <SlotBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 搜索
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (currentSearch) {
      replaceSearchResult({
        doms: document.getElementsByClassName('replace'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  })

  return (
    <div className='pt-2'>
      {!currentSearch ? (
        <SearchNav {...props} />
      ) : (
        <div id='posts-wrapper'>
          {' '}
          {siteConfig('POST_LIST_STYLE') === 'page' ? (
            <BlogPostListPage {...props} />
          ) : (
            <BlogPostListScroll {...props} />
          )}{' '}
        </div>
      )}
    </div>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <div className='pt-2'>
      <Card className='w-full'>
        <div className='mb-10 pb-20 bg-white md:p-12 p-3 min-h-full dark:bg-hexo-black-gray'>
          {Object.keys(archivePosts).map(archiveTitle => (
            <BlogPostArchive
              key={archiveTitle}
              posts={archivePosts[archiveTitle]}
              archiveTitle={archiveTitle}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const friendLinks = isFriendLinksView({
    asPath: router.asPath,
    slug: post?.slug || slugFromRouter(router)
  })
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    syncPrettyPostUrl(post)
  }, [post?.slug])
  useEffect(() => {
    // 404
    if (!post && !friendLinks) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector(
            '#article-wrapper #notion-article'
          )
          if (!article) {
            router.push('/404').then(() => {
              console.warn('找不到页面', router.asPath)
            })
          }
        }
      }, waiting404)
    }
  }, [post, friendLinks])

  if (friendLinks) {
    return (
      <>
        {lock && <ArticleLock validPassword={validPassword} />}
        {!lock && <FriendLinks />}
      </>
    )
  }

  return (
    <>
      <div className='ob-article-card w-full min-w-0 bg-white dark:bg-hexo-black-gray article'>
        {lock && <ArticleLock validPassword={validPassword} />}

        {!lock && post && (
          <div className='ob-article-content w-full min-w-0 flex-grow mx-auto'>
            <article
              id='article-wrapper'
              className='subpixel-antialiased overflow-y-hidden'
            >
              {/* Notion文章主体 */}
              <section className='ob-article-body w-full min-w-0 mx-auto'>
                {post && <NotionPage post={post} />}
              </section>

              {/* 分享 */}
              <ShareBar post={post} />
              {post?.type === 'Post' && (
                <>
                  <ArticleCopyright {...props} />
                  <ArticleRecommend {...props} />
                  <ArticleAdjacent {...props} />
                </>
              )}
            </article>

            <div className='pt-4 border-dashed'></div>

            {/* 评论互动 */}
            <div className='ob-article-comments duration-200 overflow-x-auto px-3'>
              <Comment frontMatter={post} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const router = useRouter()
  const { locale } = useGlobal()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      if (isBrowser) {
        const article = document.querySelector(
          '#article-wrapper #notion-article'
        )
        if (!article) {
          router.push('/').then(() => {
            // console.log('找不到页面', router.asPath)
          })
        }
      }
    }, 3000)
  })
  return (
    <>
      <div className='text-black w-full h-screen text-center justify-center content-center items-center flex flex-col'>
        <div className='dark:text-gray-200'>
          <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'>
            404
          </h2>
          <div className='inline-block text-left h-32 leading-10 items-center'>
            <h2 className='m-0 p-0'>{locale.COMMON.NOT_FOUND}</h2>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <div>
      <Card className='w-full min-h-screen'>
        <div className='dark:text-gray-200 mb-5 mx-3'>
          <i className='mr-4 fas fa-th' /> {locale.COMMON.CATEGORY}:
        </div>
        <div id='category-list' className='duration-200 flex flex-wrap mx-8'>
          {categoryOptions?.map(category => {
            return (
              <SmartLink
                key={category.name}
                href={`/category/${category.name}`}
                passHref
                legacyBehavior
              >
                <div
                  className={
                    ' duration-300 dark:hover:text-white px-5 cursor-pointer py-2 hover:text-indigo-400'
                  }
                >
                  <i className='mr-4 fas fa-folder' /> {category.name}(
                  {category.count})
                </div>
              </SmartLink>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <div>
      <Card className='w-full'>
        <div className='dark:text-gray-200 mb-5 ml-4'>
          <i className='mr-4 fas fa-tag' /> {locale.COMMON.TAGS}:
        </div>
        <div id='tags-list' className='duration-200 flex flex-wrap ml-8'>
          {tagOptions.map(tag => (
            <div key={tag.name} className='p-2'>
              <TagItemMini key={tag.name} tag={tag} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

const LayoutBeingProfile = props => (
  <BeingLife
    being={props.being}
    handle={props.handle}
    writings={props.writings}
  />
)

const LayoutBeingDesk = () => <CommunityApp defaultView='workspace' />
const LayoutOurBeingsApp = props => <CommunityApp {...props} />

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutBeingDesk,
  LayoutOurBeingsApp,
  LayoutBeingProfile,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSignIn,
  LayoutSignUp,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
