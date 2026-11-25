/** @jest-environment node */
import { searchPlaces } from '@/lib/activities/places'
import {
  normalizePlace,
  photonPlace,
  mapLinks,
  wechatPoint
} from '@/apps/wuzai/miniprogram/common/places'

const feature = {
  geometry: { type: 'Point', coordinates: [120.8355975, 31.1317907] },
  properties: {
    name: '周庄镇',
    city: '苏州市',
    state: '江苏省',
    country: '中国',
    countrycode: 'CN',
    osm_type: 'N',
    osm_id: 123,
    osm_value: 'town'
  }
}
const cache = () => {
  const values = new Map()
  return {
    get: jest.fn((key) => Promise.resolve(values.get(key))),
    set: jest.fn((key, value, _expiry, _ttl, nx) => {
      if (nx && values.has(key)) return Promise.resolve(null)
      values.set(key, value)
      return Promise.resolve('OK')
    })
  }
}
const response = (data) => ({
  ok: true,
  text: () => Promise.resolve(JSON.stringify(data))
})

test('world place results preserve hierarchy and WGS84 longitude/latitude order', () => {
  expect(photonPlace(feature)).toMatchObject({
    name: '周庄镇',
    label: '周庄镇 · 苏州市 · 江苏省 · 中国',
    countryCode: 'CN',
    latitude: 31.1317907,
    longitude: 120.8355975,
    coordinateSystem: 'wgs84'
  })
  expect(
    photonPlace({
      ...feature,
      geometry: { type: 'LineString', coordinates: [] }
    })
  ).toBeNull()
})
test.each([
  { latitude: 91, longitude: 0 },
  { latitude: 0, longitude: 181 },
  { latitude: null, longitude: 0 },
  { latitude: '31', longitude: 120 },
  { latitude: NaN, longitude: 0 }
])('invalid map coordinates are rejected: %j', (point) => {
  expect(() => normalizePlace({ name: 'Town', ...point })).toThrow(
    'invalid_place'
  )
})
test('zero coordinates and southern/western destinations remain valid', () => {
  expect(
    normalizePlace({ name: 'Origin', latitude: 0, longitude: 0 }).latitude
  ).toBe(0)
  const place = normalizePlace({
    name: 'Ushuaia',
    latitude: -54.807306,
    longitude: -68.3084133,
    countryCode: 'AR'
  })
  expect(wechatPoint(place)).toEqual(place)
})
test('WeChat map boundaries convert mainland destinations once while stored coordinates stay WGS84', () => {
  const place = normalizePlace({
    name: '北京',
    latitude: 39.908823,
    longitude: 116.39747,
    countryCode: 'CN'
  })
  const result = wechatPoint(place)
  expect(result.latitude).toBeCloseTo(39.910226, 5)
  expect(result.longitude).toBeCloseTo(116.403714, 5)
  expect(place.coordinateSystem).toBe('wgs84')
  expect(place.longitude).toBe(116.39747)
})
test('navigation encodes the destination and does not substitute a country or device location', () => {
  const point = photonPlace(feature),
    links = mapLinks(point)
  expect(new URL(links.google).searchParams.get('destination')).toBe(
    '31.1317907,120.8355975'
  )
  expect(new URL(links.baidu).searchParams.get('coord_type')).toBe('wgs84')
  expect(new URL(links.embed).searchParams.get('marker')).toBe(
    '31.1317907,120.8355975'
  )
  const manual = mapLinks(null, 'Village & <a> / Country')
  expect(new URL(manual.google).searchParams.get('destination')).toBe(
    'Village & <a> / Country'
  )
  expect(manual.embed).toBeUndefined()
})
test('cached searches do not contact the geocoder again', async () => {
  const redis = cache(),
    fetcher = jest.fn().mockResolvedValue(response({ features: [feature] }))
  const result = await searchPlaces(redis, { query: '周庄镇 江苏' }, fetcher)
  expect(result.places).toHaveLength(1)
  expect(
    (await searchPlaces(redis, { query: '周庄镇 江苏' }, fetcher)).places
  ).toEqual(result.places)
  expect(fetcher).toHaveBeenCalledTimes(1)
  expect(redis.set).toHaveBeenCalledWith(
    expect.stringContaining('wuzai:places:v2:'),
    expect.any(String),
    'EX',
    86400
  )
})
test('chinese country aliases also search the latin name for global places', async () => {
  const redis = cache()
  const luxembourg = {
    geometry: { type: 'Point', coordinates: [6.1296, 49.8153] },
    properties: {
      name: 'Luxembourg',
      country: 'Luxembourg',
      countrycode: 'LU',
      osm_type: 'R',
      osm_id: 1,
      osm_value: 'country'
    }
  }
  const embassy = {
    geometry: { type: 'Point', coordinates: [116.45, 39.94] },
    properties: {
      name: '卢森堡大使馆',
      country: '中国',
      countrycode: 'CN',
      osm_type: 'N',
      osm_id: 2,
      osm_value: 'diplomatic'
    }
  }
  const fetcher = jest
    .fn()
    .mockResolvedValueOnce(response({ features: [embassy] }))
    .mockResolvedValueOnce(response({ features: [luxembourg] }))
  const result = await searchPlaces(
    redis,
    { query: '卢森堡', language: 'zh' },
    fetcher
  )
  expect(fetcher).toHaveBeenCalledTimes(2)
  expect(result.places[0]).toMatchObject({
    name: 'Luxembourg',
    countryCode: 'LU',
    kind: 'country'
  })
})
test('global provider budget rejects a burst before issuing a second request', async () => {
  const redis = cache(),
    fetcher = jest.fn().mockResolvedValue(response({ features: [feature] }))
  await searchPlaces(redis, { query: 'Town one' }, fetcher)
  await expect(
    searchPlaces(redis, { query: 'Town two' }, fetcher)
  ).rejects.toMatchObject({ code: 'location_rate_limit', status: 429 })
  expect(fetcher).toHaveBeenCalledTimes(1)
})
test.each([undefined, 'a', 'a'.repeat(161), ['array']])(
  'invalid query never contacts the provider: %j',
  async (query) => {
    const fetcher = jest.fn()
    await expect(
      searchPlaces(cache(), { query }, fetcher)
    ).rejects.toMatchObject({ code: 'invalid_query' })
    expect(fetcher).not.toHaveBeenCalled()
  }
)
test.each([
  new Error('private upstream credentials'),
  { ok: false },
  { ok: true, text: () => Promise.resolve('{invalid') },
  response({ unexpected: [] })
])(
  'provider failures stay recoverable and never leak details',
  async (value) => {
    const fetcher =
      value instanceof Error
        ? jest.fn().mockRejectedValue(value)
        : jest.fn().mockResolvedValue(value)
    await expect(
      searchPlaces(cache(), { query: 'A village' }, fetcher)
    ).rejects.toMatchObject({ code: 'location_unavailable', status: 503 })
  }
)
