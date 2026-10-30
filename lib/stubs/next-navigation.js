import { useRouter as usePagesRouter } from 'next/router'
import { useMemo } from 'react'

export class ReadonlyURLSearchParams extends URLSearchParams {
  append() {
    return undefined
  }

  delete() {
    return undefined
  }

  set() {
    return undefined
  }

  sort() {
    return undefined
  }
}

function queryToSearchParams(query) {
  const params = new ReadonlyURLSearchParams()
  Object.entries(query || {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => {
        if (item != null) params.append(key, String(item))
      })
      return
    }
    if (value != null) params.set(key, String(value))
  })
  return params
}

export function useRouter() {
  const router = usePagesRouter()
  return {
    ...router,
    push: (...args) => router.push(...args),
    replace: (...args) => router.replace(...args),
    prefetch: (...args) => router.prefetch?.(...args),
    back: () => router.back?.(),
    forward: () =>
      typeof window !== 'undefined' ? window.history.forward() : undefined,
    refresh: () =>
      typeof window !== 'undefined' ? window.location.reload() : undefined
  }
}

export function usePathname() {
  const router = usePagesRouter()
  return router.pathname
}

export function useSearchParams() {
  const router = usePagesRouter()
  return useMemo(() => queryToSearchParams(router.query), [router.query])
}

export function useParams() {
  const router = usePagesRouter()
  return router.query || {}
}

export function useSelectedLayoutSegment() {
  return null
}

export function useSelectedLayoutSegments() {
  return []
}

export function redirect(url) {
  if (typeof window !== 'undefined' && url) {
    window.location.assign(url)
  }
}

export function permanentRedirect(url) {
  redirect(url)
}

export function notFound() {
  const error = new Error('NEXT_NOT_FOUND')
  error.digest = 'NEXT_NOT_FOUND'
  throw error
}

export function forbidden() {
  const error = new Error('NEXT_HTTP_ERROR_FALLBACK;403')
  error.digest = 'NEXT_HTTP_ERROR_FALLBACK;403'
  throw error
}

export function unauthorized() {
  const error = new Error('NEXT_HTTP_ERROR_FALLBACK;401')
  error.digest = 'NEXT_HTTP_ERROR_FALLBACK;401'
  throw error
}
