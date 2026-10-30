import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import {
  EXISTENCE_ROBOTS_TAG,
  isExistenceContentPath,
  readOwnerCredential,
  shouldRefuseExistenceCrawl
} from '@/lib/security/existenceCrawl'
import {
  getNotionRedirectId,
  safeRedirectPath
} from '@/lib/utils/notionRedirect'
import BLOG from './blog.config'

/**
 * Clerk 身份验证中间件
 */
export const config = {
  // 这里设置白名单，防止静态资源被拦截
  matcher: ['/((?!.*\\..*|_next|/sign-in|/auth).*)', '/', '/(api|trpc)(.*)']
}

// 限制登录访问的路由
const isTenantRoute = createRouteMatcher([
  '/user/organization-selector(.*)',
  '/user/orgid/(.*)',
  '/dashboard',
  '/dashboard/(.*)'
])

// 限制权限访问的路由
const isTenantAdminRoute = createRouteMatcher([
  '/admin/(.*)/memberships',
  '/admin/(.*)/domain'
])

/**
 * 没有配置权限相关功能的返回
 * @param req
 * @param ev
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const refuseAutomatedExistence = (req: NextRequest) => {
  const pathname = req.nextUrl?.pathname || ''
  if (
    !shouldRefuseExistenceCrawl({
      pathname,
      userAgent: req.headers?.get?.('user-agent') || '',
      ownerCredential: readOwnerCredential(req.headers),
      expectedToken: process.env.EXISTENCE_OWNER_TOKEN || ''
    })
  ) {
    return null
  }
  return new NextResponse('此页面不向自动抓取工具提供。', {
    status: 403,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': EXISTENCE_ROBOTS_TAG
    }
  })
}

const markExistenceRobots = (response: NextResponse, pathname: string) => {
  if (isExistenceContentPath(pathname)) {
    response.headers?.set?.('X-Robots-Tag', EXISTENCE_ROBOTS_TAG)
  }
  return response
}

const noAuthMiddleware = async (req: NextRequest, ev: any) => {
  const refused = refuseAutomatedExistence(req)
  if (refused) return refused
  // 如果没有配置 Clerk 相关环境变量，返回一个默认响应或者继续处理请求
  const redirectId = getNotionRedirectId(
    req.nextUrl.pathname,
    BLOG.UUID_REDIRECT
  )
  if (redirectId) {
    let redirectJson: Record<string, string> = {}
    try {
      // The canonical origin is trusted configuration, not an incoming Host
      // header. Ordinary pages and APIs never make this request.
      const redirectTableUrl = new URL('/redirect.json', BLOG.LINK)
      const response = await fetch(redirectTableUrl, {
        signal: AbortSignal.timeout(1500),
        redirect: 'error'
      })
      if (response.ok) {
        redirectJson = (await response.json()) as Record<string, string>
      }
    } catch (err) {
      console.error('Error fetching static file:', err)
    }
    const redirectPath = safeRedirectPath(redirectJson[redirectId])
    if (redirectPath && redirectPath !== req.nextUrl.pathname) {
      const redirectToUrl = req.nextUrl.clone()
      redirectToUrl.pathname = redirectPath
      console.log(
        `redirect from ${req.nextUrl.pathname} to ${redirectToUrl.pathname}`
      )
      return markExistenceRobots(
        NextResponse.redirect(redirectToUrl, 308),
        req.nextUrl.pathname
      )
    }
  }
  return markExistenceRobots(NextResponse.next(), req.nextUrl.pathname)
}
/**
 * 鉴权中间件
 */
const authMiddleware = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ? clerkMiddleware((auth, req) => {
      const refused = refuseAutomatedExistence(req)
      if (refused) return refused
      const { userId } = auth()
      // 处理 /dashboard 路由的登录保护
      if (isTenantRoute(req)) {
        if (!userId) {
          // 用户未登录，重定向到 /sign-in
          const url = new URL('/sign-in', req.url)
          url.searchParams.set('redirectTo', req.url) // 保存重定向目标
          return NextResponse.redirect(url)
        }
      }

      // 处理管理员相关权限保护
      if (isTenantAdminRoute(req)) {
        auth().protect(has => {
          return (
            has({ permission: 'org:sys_memberships:manage' }) ||
            has({ permission: 'org:sys_domains_manage' })
          )
        })
      }

      // 默认继续处理请求
      return markExistenceRobots(NextResponse.next(), req.nextUrl.pathname)
    })
  : noAuthMiddleware

export default authMiddleware
