import { siteConfig } from '@/lib/config'
import { useEffect, useState } from 'react'

const STATS_CACHE = new Map()
const VIEW_DEDUPLICATION_WINDOW = 30 * 60 * 1000

const getViewCacheKey = postId => `post-stats:viewed:${postId}`

export default function PostStats({
  postId,
  trackView = false,
  className = '',
  itemClassName = ''
}) {
  const [stats, setStats] = useState(() => STATS_CACHE.get(postId) || null)
  const postStatsEnabled = siteConfig('POST_STATS_ENABLE')

  useEffect(() => {
    if (!postStatsEnabled || !postId) {
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
        if (cancelled || !data?.enabled) {
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
        console.error('load post stats failed', error)
      })

    return () => {
      cancelled = true
    }
  }, [postId, postStatsEnabled, trackView])

  if (!postStatsEnabled || !postId) {
    return null
  }

  return (
    <div className={className}>
      <span className={itemClassName}>
        <i className='fas fa-eye' />
        <span>访问量</span>
        <span>{stats?.views ?? '—'}</span>
      </span>
      <span className={itemClassName}>
        <i className='fas fa-users' />
        <span>访客数</span>
        <span>{stats?.visitors ?? '—'}</span>
      </span>
    </div>
  )
}