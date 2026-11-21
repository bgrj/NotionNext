import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import {
  EXISTENCE_ROBOTS_TAG,
  isExistenceContentPath,
  readOwnerCredential,
  shouldRefuseExistenceCrawl
} from '@/lib/security/existenceCrawl'
import {
  isContentScraper,
  isEmbeddedWebview,
  readUserAgent
} from '@/lib/security/visitorAccess'
import {
  getNotionRedirectId,
  safeRedirectPath
} from '@/lib/utils/notionRedirect'
import BLOG from './blog.config'
import { authHref } from '@/lib/beings/authNavigation'

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
const publishableKey = String(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''
).trim()

/**
 * Clerk route protection. Exported so tests can call it without the
 * development-instance handshake that clerkMiddleware performs first.
 */
export const handleClerkAuth = (auth, req) => {
  const refused = refuseAutomatedExistence(req)
  if (refused) return refused
  const { userId } = auth()
  if (isTenantRoute(req)) {
    if (!userId) {
      const url = new URL(
        authHref('in', `${req.nextUrl.pathname}${req.nextUrl.search}`),
        req.url
      )
      return NextResponse.redirect(url)
    }
  }

  if (isTenantAdminRoute(req)) {
    auth().protect(has => {
      return (
        has({ permission: 'org:sys_memberships:manage' }) ||
        has({ permission: 'org:sys_domains_manage' })
      )
    })
  }

  return markExistenceRobots(NextResponse.next(), req.nextUrl.pathname)
}

const clerkProtected = publishableKey
  ? clerkMiddleware(handleClerkAuth)
  : noAuthMiddleware

const refuseContentScraper = (req: NextRequest) => {
  const pathname = req.nextUrl?.pathname || ''
  if (pathname.startsWith('/api') || pathname.startsWith('/_next')) return null
  const userAgent = readUserAgent(req)
  if (!isContentScraper(userAgent)) return null
  return new NextResponse('此页面不向自动抓取工具提供。', {
    status: 403,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet'
    }
  })
}

/**
 * In-app browsers such as WeChat never enter Clerk's dev-browser handshake.
 * That handshake is a cross-site redirect their webview does not finish,
 * so the page otherwise never opens. Scripted clients are refused here.
 */
export default async function middleware(req: NextRequest, ev: any) {
  const scraped = refuseContentScraper(req)
  if (scraped) return scraped
  const userAgent = readUserAgent(req)
  if (!publishableKey || (userAgent && isEmbeddedWebview(userAgent))) {
    return noAuthMiddleware(req, ev)
  }
  return clerkProtected(req, ev)
}
