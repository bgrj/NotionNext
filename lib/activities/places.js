import { createHash } from 'node:crypto'
import { fail } from '@/apps/wuzai/miniprogram/common/activities'
import { photonPlace } from '@/apps/wuzai/miniprogram/common/places'

export async function searchPlaces(redis, input = {}, fetcher = fetch) {
  const query =
    typeof input.query === 'string'
      ? input.query.trim().replace(/\s+/g, ' ')
      : ''
  if (query.length < 2 || query.length > 160)
    fail('invalid_query', '请输入 2–160 字的国家、乡镇或场所名称。')
  // Keep canonical local place names stable across interface languages so a
  // township selected in English still matches activities created in Chinese.
  const language = 'local'
  const key =
    'wuzai:places:v1:' +
    createHash('sha256')
      .update(language + '\n' + query.toLowerCase())
      .digest('hex')
  const cached = await redis.get(key)
  if (cached) {
    try {
      return {
        places: JSON.parse(cached),
        attribution: '© OpenStreetMap contributors · Photon'
      }
    } catch {
      /* refresh invalid cache */
    }
  }
  // A global budget protects the public provider across server instances.
  if (!(await redis.set('wuzai:places:provider-budget', '1', 'EX', 1, 'NX')))
    fail('location_rate_limit', '地点检索繁忙，请稍后再试。', 429)
  const endpoint = new URL(
    process.env.WUZAI_GEOCODER_URL || 'https://photon.komoot.io/api/'
  )
  if (endpoint.protocol !== 'https:')
    fail('location_unavailable', '地点检索暂不可用，请手动填写后重试。', 503)
  endpoint.searchParams.set('q', query)
  endpoint.searchParams.set('limit', '12')
  let response, payload
  try {
    response = await fetcher(endpoint, {
      signal: AbortSignal.timeout(8000),
      headers: {
        'User-Agent': 'OurBeing/1.0 (+https://ourbeings.com)',
        Accept: 'application/json'
      }
    })
    if (!response.ok) throw new Error('provider_error')
    const body = await response.text()
    if (body.length > 1000000) throw new Error('provider_response_too_large')
    payload = JSON.parse(body)
    if (!Array.isArray(payload.features)) throw new Error('provider_shape')
  } catch {
    fail('location_unavailable', '地点检索暂不可用，请手动填写后重试。', 503)
  }
  const places = payload.features.slice(0, 12).map(photonPlace).filter(Boolean)
  await redis.set(
    key,
    JSON.stringify(places),
    'EX',
    places.length ? 86400 : 300
  )
  return { places, attribution: '© OpenStreetMap contributors · Photon' }
}
