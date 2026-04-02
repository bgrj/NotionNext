import { siteConfig } from '@/lib/config'
import { useEffect, useState } from 'react'

const STATS_CACHE = new Map()
const VIEW_DEDUPLICATION_WINDOW = 30 * 60 * 1000

/**
 * 服务端是否明确禁用了文章统计（API 返回 enabled:false）。
 * 仅当服务端 *主动* 告知关闭时才置 true，网络/超时等瞬态错误不影响。
 */
let isServerDisabled = false

const getViewCacheKey = postId => `post-stats:viewed:${postId}`

export default function PostStats({
  postId,
  trackView = false,
  className = '',
  itemClassName = '',
  fallback = null,
  viewsLabel = '访问量',
  visitorsLabel = '访客数'
}) {
  const [stats, setStats] = useState(() => STATS_CACHE.get(postId) || null)
  const [showFallback, setShowFallback] = useState(false)
  const postStatsEnabled = siteConfig('POST_STATS_ENABLE')

  useEffect(() => {
    if (!postStatsEnabled || !postId) {
      return
    }

    // 服务端已明确禁用，直接走 fallback
    if (isServerDisabled) {
      setShowFallback(true)
      return
    }

    if (!trackView && STATS_CACHE.has(postId)) {
      setStats(STATS_CACHE.get(postId))
      return
    }

    let cancelled = false
    let shouldIncrement = trackView

    if (trackView && typeof window !== 'undefined') {
      const viewedAt = Number(window.sessionStorage.getItem(getViewCacheKey(postId)) || 0)
      shouldIncrement = !viewedAt || Date.now() - viewedAt > VIEW_DEDUPLICATION_WINDOW
    }

    const searchParams = new URLSearchParams({ postId })
    if (shouldIncrement) {
      searchParams.set('increment', '1')
    }

    fetch(`/api/post-stats?${searchParams.toString()}`)
      .then(async response => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        if (cancelled) {
          return
        }

        // 服务端明确禁用（Redis 未配置等）
        if (data?.status === 'disabled') {
          isServerDisabled = true
          setShowFallback(true)
          return
        }

        const nextStats = {
          views: Number(data.views || 0),
          visitors: Number(data.visitors || 0)
        }

        STATS_CACHE.set(postId, nextStats)
        setStats(nextStats)

        if (trackView && shouldIncrement && typeof window !== 'undefined') {
          window.sessionStorage.setItem(getViewCacheKey(postId), String(Date.now()))
        }
      })
      .catch(error => {
        // 网络或服务端瞬态错误——不全局禁用，只让本实例展示 fallback
        console.error('load post stats failed', error)
        if (!cancelled) {
          setShowFallback(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [postId, postStatsEnabled, trackView])

  if (!postStatsEnabled || !postId) {
    return null
  }

  if (showFallback && !stats) {
    return typeof fallback === 'function' ? fallback() : fallback
  }

  return (
    <div className={className}>
      <span className={itemClassName}>
        <i className='fas fa-eye' />
        <span>{viewsLabel}</span>
        <span>{stats?.views ?? '—'}</span>
      </span>
      <span className={itemClassName}>
        <i className='fas fa-users' />
        <span>{visitorsLabel}</span>
        <span>{stats?.visitors ?? '—'}</span>
      </span>
    </div>
  )
}