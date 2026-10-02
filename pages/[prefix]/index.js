import BLOG from '@/blog.config'
import useNotification from '@/components/Notification'
import TechGrow from '@/components/TechGrow'
import { siteConfig } from '@/lib/config'
import { resolvePostProps } from '@/lib/db/SiteDataApi'
import { useGlobal } from '@/lib/global'
import { getPageTableOfContents } from '@/lib/db/notion/getPageTableOfContents'
import { isProtectedPost } from '@/lib/security/articleAccess'
import { checkSlugHasNoSlash } from '@/lib/utils/post'
import { DynamicLayout } from '@/themes/theme'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getStaticPathsBase } from '@/lib/build/staticPaths'

const isStaticExport = process.env.EXPORT === 'true'

/**
 * 根据notion的slug访问页面
 * 只解析一级目录例如 /about
 * @param {*} props
 * @returns
 */
const Slug = props => {
  const { post } = props
  const router = useRouter()
  const { locale } = useGlobal()

  // 文章锁🔐
  const [lock, setLock] = useState(isProtectedPost(post))
  const [unlockedPost, setUnlockedPost] = useState(null)
  const { showNotification, Notification } = useNotification()
  const viewPost = unlockedPost || post

  /**
   * 验证文章密码：只向服务器提交，不在浏览器比较摘要、不写入 localStorage。
   * @param {*} passInput
   */
  const validPassword = async passInput => {
    if (!post?.slug || typeof passInput !== 'string' || !passInput) {
      return false
    }
    try {
      const unlock = await fetch('/api/protected/unlock', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: post.slug, password: passInput })
      })
      if (!unlock.ok) return false
      const content = await fetch(
        `/api/protected/content?slug=${encodeURIComponent(post.slug)}`,
        { credentials: 'same-origin' }
      )
      if (!content.ok) return false
      const data = await content.json()
      if (!data?.post) return false
      setUnlockedPost(data.post)
      setLock(false)
      showNotification(locale.COMMON.ARTICLE_UNLOCK_TIPS)
      return true
    } catch {
      return false
    }
  }

  useEffect(() => {
    setUnlockedPost(null)
    setLock(isProtectedPost(post))
  }, [post, router.asPath])

  // 文章加载
  useEffect(() => {
    if (lock) {
      return
    }
    // 文章解锁后生成目录与内容
    if (viewPost?.blockMap?.block) {
      viewPost.content = Object.keys(viewPost.blockMap.block).filter(
        key => viewPost.blockMap.block[key]?.value?.parent_id === viewPost.id
      )
      viewPost.toc = getPageTableOfContents(viewPost, viewPost.blockMap)
    }
  }, [router, lock, viewPost])

  props = { ...props, post: viewPost, lock, validPassword }
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return (
    <>
      {/* 文章布局 */}
      <DynamicLayout theme={theme} layoutName='LayoutSlug' {...props} />
      {/* 解锁密码提示框 */}
      {isProtectedPost(post) && !lock && <Notification />}
      {/* 导流工具 */}
      <TechGrow lock={lock} />
    </>
  )
}

Slug.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    password: PropTypes.string,
    protected: PropTypes.bool,
    content: PropTypes.array,
    toc: PropTypes.array,
    blockMap: PropTypes.shape({
      block: PropTypes.object
    })
  }),
  NOTION_CONFIG: PropTypes.object
}

export async function getStaticPaths() {
  return getStaticPathsBase({
    from: 'slug-paths',
    filterFn: row => checkSlugHasNoSlash(row),
    mapPageToParams: row => ({ params: { prefix: row.slug } })
  })
}

export async function getStaticProps({ params: { prefix }, locale }) {
  const props = await resolvePostProps({
    prefix,
    locale
  })

  return {
    props,
    revalidate: isStaticExport
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        ),
    notFound: !props.post
  }
}

export default Slug
