import { createHash } from 'node:crypto'
import { fail } from '@/apps/wuzai/miniprogram/common/activities'
import {
  photonPlace,
  placeSearchQueries,
  sortPhotonFeatures
} from '@/apps/wuzai/miniprogram/common/places'

function photonLang(value) {
  const language = String(value || '')
    .toLowerCase()
    .trim()
  if (language.startsWith('en')) return 'en'
  if (language.startsWith('zh')) return 'zh'
  return 'default'
}

async function fetchPhoton(fetcher, query, language) {
  const endpoint = new URL(
    process.env.WUZAI_GEOCODER_URL || 'https://photon.komoot.io/api/'
  )
  if (endpoint.protocol !== 'https:')
    fail('location_unavailable', '地点检索暂不可用，请手动填写后重试。', 503)
  endpoint.searchParams.set('q', query)
  endpoint.searchParams.set('limit', '12')
  const lang = photonLang(language)
  if (lang !== 'default') endpoint.searchParams.set('lang', lang)
  const response = await fetcher(endpoint, {
    signal: AbortSignal.timeout(8000),
    headers: {
      'User-Agent': 'OurBeing/1.0 (+https://ourbeings.cn)',
      Accept: 'application/json'
    }
  })
  if (!response.ok) throw new Error('provider_error')
  const body = await response.text()
  if (body.length > 1000000) throw new Error('provider_response_too_large')
  const payload = JSON.parse(body)
  if (!Array.isArray(payload.features)) throw new Error('provider_shape')
  return payload.features
}

export async function searchPlaces(redis, input = {}, fetcher = fetch) {
  const query =
    typeof input.query === 'string'
      ? input.query.trim().replace(/\s+/g, ' ')
      : ''
  if (query.length < 2 || query.length > 160)
    fail('invalid_query', '请输入 2–160 字的国家、乡镇或场所名称。')
  const language = photonLang(input.language)
  const variants = placeSearchQueries(query)
  const key =
    'wuzai:places:v2:' +
    createHash('sha256')
      .update(language + '\n' + variants.join('\n').toLowerCase())
      .digest('hex')
  const cached = await redis.get(key)
  if (cached) {
    try {
      return {
        places: JSON.parse(cached),
        attribution: '© OpenStreetMap contributors · Photon',
        provider: 'photon'
      }
    } catch {
      /* refresh invalid cache */
    }
  }
  // One budget token covers every variant for a single user search.
  if (!(await redis.set('wuzai:places:provider-budget', '1', 'EX', 1, 'NX')))
    fail('location_rate_limit', '地点检索繁忙，请稍后再试。', 429)
  const seen = new Set()
  const features = []
  try {
    for (const variant of variants) {
      const rows = await fetchPhoton(fetcher, variant, language)
      for (const feature of rows) {
        const keyId = JSON.stringify([
          feature?.properties?.osm_type,
          feature?.properties?.osm_id,
          feature?.geometry?.coordinates
        ])
        if (seen.has(keyId)) continue
        seen.add(keyId)
        features.push(feature)
      }
    }
  } catch {
    fail('location_unavailable', '地点检索暂不可用，请手动填写后重试。', 503)
  }
  const merged = sortPhotonFeatures(features, query)
    .map(photonPlace)
    .filter(Boolean)
    .slice(0, 12)
  await redis.set(
    key,
    JSON.stringify(merged),
    'EX',
    merged.length ? 86400 : 300
  )
  return {
    places: merged,
    attribution: '© OpenStreetMap contributors · Photon',
    provider: 'photon'
  }
}
