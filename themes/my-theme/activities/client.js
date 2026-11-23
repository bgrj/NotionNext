const READS = new Set(['list', 'get', 'mine', 'messages'])
export async function activityRequest(action, input = {}) {
  const read = READS.has(action)
  const query = new URLSearchParams({ action, ...input })
  const response = await fetch(
    `/api/our-beings/v1${read ? `?${query.toString()}` : ''}`,
    read
      ? { cache: 'no-store' }
      : {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, ...input })
        }
  )
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(data.message || '暂时没能完成，请稍后再试。')
    error.code = data.error
    throw error
  }
  return data
}
