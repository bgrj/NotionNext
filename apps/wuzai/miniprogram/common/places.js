/* Shared destination model. Coordinates are stored as WGS84, never device GPS. */
const { CITIES } = require('./global')
const string = (value, max = 160) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''
// Chinese ↔ Latin aliases for countries/cities Photon under-indexes in Chinese.
const EXTRA_ALIASES = [
  ['卢森堡', 'Luxembourg'],
  ['比利时', 'Belgium'],
  ['荷兰', 'Netherlands'],
  ['瑞士', 'Switzerland'],
  ['奥地利', 'Austria'],
  ['葡萄牙', 'Portugal'],
  ['西班牙', 'Spain'],
  ['意大利', 'Italy'],
  ['希腊', 'Greece'],
  ['波兰', 'Poland'],
  ['捷克', 'Czechia'],
  ['匈牙利', 'Hungary'],
  ['瑞典', 'Sweden'],
  ['挪威', 'Norway'],
  ['丹麦', 'Denmark'],
  ['芬兰', 'Finland'],
  ['爱尔兰', 'Ireland'],
  ['冰岛', 'Iceland'],
  ['俄罗斯', 'Russia'],
  ['乌克兰', 'Ukraine'],
  ['土耳其', 'Turkey'],
  ['以色列', 'Israel'],
  ['埃及', 'Egypt'],
  ['南非', 'South Africa'],
  ['巴西', 'Brazil'],
  ['阿根廷', 'Argentina'],
  ['智利', 'Chile'],
  ['墨西哥', 'Mexico'],
  ['加拿大', 'Canada'],
  ['美国', 'United States'],
  ['英国', 'United Kingdom'],
  ['法国', 'France'],
  ['德国', 'Germany'],
  ['日本', 'Japan'],
  ['韩国', 'South Korea'],
  ['朝鲜', 'North Korea'],
  ['印度', 'India'],
  ['巴基斯坦', 'Pakistan'],
  ['孟加拉', 'Bangladesh'],
  ['尼泊尔', 'Nepal'],
  ['斯里兰卡', 'Sri Lanka'],
  ['越南', 'Vietnam'],
  ['泰国', 'Thailand'],
  ['缅甸', 'Myanmar'],
  ['柬埔寨', 'Cambodia'],
  ['老挝', 'Laos'],
  ['马来西亚', 'Malaysia'],
  ['印尼', 'Indonesia'],
  ['印度尼西亚', 'Indonesia'],
  ['菲律宾', 'Philippines'],
  ['澳大利亚', 'Australia'],
  ['新西兰', 'New Zealand'],
  ['阿联酋', 'United Arab Emirates'],
  ['沙特', 'Saudi Arabia'],
  ['卡塔尔', 'Qatar']
]
function placeSearchQueries(query = '') {
  const q = String(query || '').trim().replace(/\s+/g, ' ')
  if (!q) return []
  const variants = [q]
  const lower = q.toLowerCase()
  for (const city of CITIES) {
    if (city.zh === q || city.name.toLowerCase() === lower) {
      variants.push(city.name, city.zh)
    }
  }
  for (const [zh, en] of EXTRA_ALIASES) {
    if (q === zh || lower === en.toLowerCase()) variants.push(zh, en)
  }
  return [...new Set(variants.filter(Boolean))].slice(0, 3)
}
const PLACE_RANK = {
  country: 0,
  state: 1,
  province: 1,
  city: 2,
  town: 2,
  municipality: 2,
  village: 3,
  hamlet: 3,
  suburb: 4,
  district: 4,
  administrative: 5
}
function rankPhotonFeature(feature, query) {
  const p = feature?.properties || {}
  const kind = p.osm_value || p.type || ''
  const name = String(p.name || '').toLowerCase()
  const q = String(query || '').toLowerCase()
  let score = PLACE_RANK[kind] ?? 20
  if (/embassy|diplomatic|consulate|memorial|artwork|bus_stop|station/.test(kind))
    score += 40
  if (name === q) score -= 8
  else if (name.includes(q) || q.includes(name)) score -= 3
  if (p.country && String(p.country).toLowerCase() === q) score -= 6
  return score
}
function sortPhotonFeatures(features, query) {
  return [...(features || [])].sort(
    (a, b) => rankPhotonFeature(a, query) - rankPhotonFeature(b, query)
  )
}
function normalizePlace(value) {
  if (value == null) return null
  if (typeof value !== 'object' || Array.isArray(value))
    throw new Error('invalid_place')
  if (value.coordinateSystem && value.coordinateSystem !== 'wgs84')
    throw new Error('invalid_place')
  const { latitude, longitude } = value
  if (
    typeof latitude !== 'number' ||
    typeof longitude !== 'number' ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    Math.abs(latitude) > 90 ||
    Math.abs(longitude) > 180
  )
    throw new Error('invalid_place')
  const name = string(value.name)
  const label = string(value.label, 320) || name
  if (!name || !label) throw new Error('invalid_place')
  return {
    name,
    label,
    latitude,
    longitude,
    id: string(value.id, 80),
    country: string(value.country, 100),
    countryCode: /^[A-Z]{2}$/.test(value.countryCode) ? value.countryCode : '',
    state: string(value.state, 100),
    county: string(value.county, 100),
    locality: string(value.locality, 100),
    kind: string(value.kind, 40),
    coordinateSystem: 'wgs84'
  }
}
function photonPlace(feature) {
  if (feature?.geometry?.type !== 'Point') return null
  const p = feature.properties || {},
    coordinates = feature.geometry.coordinates || []
  const name =
    [p.name, p.street, p.housenumber].filter(Boolean).join(' ') || p.city
  const label = [
    ...new Set(
      [name, p.district, p.city, p.county, p.state, p.country].filter(Boolean)
    )
  ].join(' · ')
  try {
    return normalizePlace({
      name,
      label,
      latitude: coordinates[1],
      longitude: coordinates[0],
      id: `${p.osm_type || ''}:${p.osm_id || ''}`,
      country: p.country,
      countryCode: String(p.countrycode || '').toUpperCase(),
      state: p.state,
      county: p.county,
      locality: p.city || p.district || name,
      kind: p.osm_value || p.type || 'place'
    })
  } catch {
    return null
  }
}
const isArea = (place) =>
  [
    'city',
    'town',
    'township',
    'village',
    'hamlet',
    'municipality',
    'district',
    'subdistrict',
    'suburb',
    'quarter',
    'locality',
    'administrative',
    'country',
    'state',
    'province',
    'county',
    'region'
  ].includes(place?.kind)
function samePlace(eventPlace, selectedPlace) {
  if (!eventPlace || !selectedPlace) return false
  if (eventPlace.id && selectedPlace.id && eventPlace.id === selectedPlace.id)
    return true
  return (
    isArea(selectedPlace) &&
    !!selectedPlace.countryCode &&
    eventPlace.countryCode === selectedPlace.countryCode &&
    eventPlace.state === selectedPlace.state &&
    [eventPlace.locality, eventPlace.name].includes(selectedPlace.name)
  )
}
function mapLinks(place, fallback = '') {
  const point = place ? normalizePlace(place) : null
  const target = point
    ? `${point.latitude},${point.longitude}`
    : string(fallback, 500)
  const google = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(target)}`
  if (!point) return { google }
  const { latitude: lat, longitude: lon } = point
  const delta = isArea(point) ? 0.04 : 0.004
  const bbox = [
    Math.max(-180, lon - delta),
    Math.max(-90, lat - delta),
    Math.min(180, lon + delta),
    Math.min(90, lat + delta)
  ].join(',')
  return {
    google,
    osm: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${isArea(point) ? 12 : 16}/${lat}/${lon}`,
    embed: `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lon}`,
    baidu: `https://api.map.baidu.com/marker?location=${lat},${lon}&title=${encodeURIComponent(point.name)}&content=${encodeURIComponent(point.label)}&output=html&coord_type=wgs84`
  }
}
// GCJ02 boundary conversion for WeChat's map API. Outside mainland China the
// destination is kept in WGS84. No device coordinates are read or transmitted.
function wechatPoint(value) {
  const place = normalizePlace(value)
  const lat = place.latitude,
    lon = place.longitude
  if (
    place.countryCode !== 'CN' ||
    /香港|澳门|Hong Kong|Macao|Macau/i.test(place.state + ' ' + place.label) ||
    lon < 72.004 ||
    lon > 137.8347 ||
    lat < 0.8293 ||
    lat > 55.8271
  )
    return place
  const pi = Math.PI,
    x = lon - 105,
    y = lat - 35
  let dLat =
    -100 +
    2 * x +
    3 * y +
    0.2 * y * y +
    0.1 * x * y +
    0.2 * Math.sqrt(Math.abs(x))
  dLat += ((20 * Math.sin(6 * x * pi) + 20 * Math.sin(2 * x * pi)) * 2) / 3
  dLat += ((20 * Math.sin(y * pi) + 40 * Math.sin((y * pi) / 3)) * 2) / 3
  dLat +=
    ((160 * Math.sin((y * pi) / 12) + 320 * Math.sin((y * pi) / 30)) * 2) / 3
  let dLon =
    300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
  dLon += ((20 * Math.sin(6 * x * pi) + 20 * Math.sin(2 * x * pi)) * 2) / 3
  dLon += ((20 * Math.sin(x * pi) + 40 * Math.sin((x * pi) / 3)) * 2) / 3
  dLon +=
    ((150 * Math.sin((x * pi) / 12) + 300 * Math.sin((x * pi) / 30)) * 2) / 3
  const rad = (lat / 180) * pi,
    sin = Math.sin(rad),
    magic = 1 - 0.00669342162296594323 * sin * sin,
    root = Math.sqrt(magic)
  dLat =
    (dLat * 180) /
    (((6378245 * (1 - 0.00669342162296594323)) / (magic * root)) * pi)
  dLon = (dLon * 180) / ((6378245 / root) * Math.cos(rad) * pi)
  return {
    ...place,
    latitude: lat + dLat,
    longitude: lon + dLon,
    coordinateSystem: 'gcj02'
  }
}
module.exports = {
  normalizePlace,
  photonPlace,
  placeSearchQueries,
  sortPhotonFeatures,
  isArea,
  samePlace,
  mapLinks,
  wechatPoint
}
