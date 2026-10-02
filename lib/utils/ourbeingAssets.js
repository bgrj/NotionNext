import assets from '@/lib/ourbeing-assets.json'

/**
 * Only the three existing, owner-controlled site assets are localized.
 * Other authors, repositories, versions and article images remain untouched.
 */
export function localizeOurbeingAssetUrl(value) {
  if (typeof value !== 'string' || !/^https:\/\//i.test(value)) return value
  if (process.env.NEXT_PUBLIC_LOCAL_SITE_ASSETS === 'false') return value
  let url
  try {
    url = new URL(value)
  } catch {
    return value
  }
  if (url.username || url.password) return value
  for (const asset of assets) {
    const source = new URL(asset.source)
    const filename = source.pathname.split('/').pop()
    const isCdn =
      url.origin === source.origin && url.pathname === source.pathname
    const isRaw =
      url.origin === 'https://raw.githubusercontent.com' &&
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
  return value.replace(/https:\/\/[^\s"'<>\\)]+/g, localizeOurbeingAssetUrl)
}
