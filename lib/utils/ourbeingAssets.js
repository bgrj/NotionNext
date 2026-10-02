import assets from '@/lib/ourbeing-assets.json'

/**
 * Only the three existing, owner-controlled site assets are localized.
 * Other authors, repositories, versions and article images remain untouched.
 */
export function localizeOurbeingAssetUrl(value) {
  if (typeof value !== 'string' || !/^https?:\/\//i.test(value.trim())) {
    return value
  }
  if (process.env.NEXT_PUBLIC_LOCAL_SITE_ASSETS === 'false') return value
  let url
  try {
    url = new URL(value.trim())
  } catch {
    return value
  }
  if (url.username || url.password) return value
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return value
  for (const asset of assets) {
    let source
    try {
      source = new URL(asset.source)
    } catch {
      continue
    }
    const filename = source.pathname.split('/').pop()
    const isCdn =
      url.hostname === source.hostname && url.pathname === source.pathname
    const isRaw =
      url.hostname === 'raw.githubusercontent.com' &&
      [
        `/bgrj/bgrj-images/main/${filename}`,
        `/bgrj/bgrj-images/refs/heads/main/${filename}`
      ].includes(url.pathname)
    if (isCdn || isRaw) return asset.path
  }
  return value
}

export function localizeOurbeingAssetReferences(value) {
  if (typeof value !== 'string') return value
  return value.replace(/https?:\/\/[^\s"'<>\\)]+/gi, localizeOurbeingAssetUrl)
}

export function localizeOurbeingConfig(value) {
  if (typeof value === 'string') return localizeOurbeingAssetReferences(value)
  if (Array.isArray(value)) return value.map(localizeOurbeingConfig)
  if (!value || typeof value !== 'object') return value
  const localized = {}
  for (const [key, item] of Object.entries(value)) {
    localized[key] = localizeOurbeingConfig(item)
  }
  return localized
}
