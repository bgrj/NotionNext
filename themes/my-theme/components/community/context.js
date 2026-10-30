import { createContext, useContext, useEffect, useState } from 'react'

export const CommunityContext = createContext(null)
export const useCommunity = () => useContext(CommunityContext)

export function useCommunityData(type, params = {}, enabled = true) {
  const { client, actor, tick } = useCommunity()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  const serial = JSON.stringify(params)
  useEffect(() => {
    let cancelled = false
    if (!enabled) {
      setData(null)
      setLoading(false)
      return undefined
    }
    setLoading(true)
    setError('')
    setData(null)
    client
      .query(actor, type, JSON.parse(serial))
      .then(result => {
        if (!cancelled) setData(result)
      })
      .catch(err => {
        if (!cancelled) setError(err.message || '暂时无法读取，请稍后重试。')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [client, actor?.id, actor?.moderator, type, serial, tick, retry, enabled])
  return { data, loading, error, reload: () => setRetry(x => x + 1) }
}
