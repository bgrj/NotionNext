import BLOG from '@/blog.config'
import { convertFileCdnUrl } from '@/lib/db/notion/convertFileCdnUrl'
import { siteConfig } from '../../config'

function httpUrl(value) {
  if (typeof value !== 'string' || !value) return null
  try {
    const url = new URL(value)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    return url
  } catch {
    return null
  }
}

function hostIs(url, hostname) {
  return (
    !!url &&
    (url.hostname === hostname || url.hostname.endsWith('.' + hostname))
  )
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return ''
  }
}

function nestedHttpUrl(urlObj) {
  const decoded = safeDecode(urlObj.pathname + urlObj.search)
  const marker = decoded.indexOf('://')
  if (marker < 4) return null
  const start = decoded.slice(marker - 5, marker) === 'https'
    ? marker - 5
    : decoded.slice(marker - 4, marker) === 'http'
      ? marker - 4
      : -1
  if (start < 0) return null
  const rest = decoded.slice(start)
  const stop = rest.search(/[\s<>"']/)
  return httpUrl(stop === -1 ? rest : rest.slice(0, stop))
}

function startsWithUrlPrefix(value, prefix) {
  return typeof value === 'string' && typeof prefix === 'string' && !!prefix && value.startsWith(prefix)
}

function proxyPrefixes() {
  return [BLOG.NOTION_HOST + '/image/', 'https://www.notion.so/image/']
}

function matchingProxyPrefix(image) {
  return proxyPrefixes().find(prefix => startsWithUrlPrefix(image, prefix)) || null
}

function decodeProxySource(image, urlObj) {
  const prefix = matchingProxyPrefix(image)
  if (!prefix) return null
  try {
    const proxyPath = new URL(prefix).pathname
    return decodeURIComponent(urlObj.pathname.slice(proxyPath.length))
  } catch {
    return null
  }
}

const mapImgUrl = (img, block, type = 'block', needCompress = true) => {
  if (!img) return null
  let ret = img.startsWith('/') ? BLOG.NOTION_HOST + img : img
  const sourceUrl = ret
  const attachmentUrl = convertFileCdnUrl(ret)
  if (attachmentUrl) ret = attachmentUrl

  const parsed = httpUrl(ret)
  const hasConverted =
    startsWithUrlPrefix(ret, BLOG.NOTION_HOST + '/image/') ||
    (parsed && parsed.hostname === 'www.notion.so' && parsed.pathname.startsWith('/image')) ||
    (hostIs(parsed, 'notion.site') && parsed.pathname.includes('/images/page-cover/'))

  const isExternalHttpImage = !!parsed
  const needConvert =
    !hasConverted &&
    (block.type === 'bookmark' ||
      isExternalHttpImage ||
      hostIs(parsed, 'secure.notion-static.com') ||
      (parsed && parsed.hostname.startsWith('prod-files-secure.')) ||
      (typeof ret === 'string' && ret.startsWith('attachment')))

  if (isExternalHttpImage && needCompress) {
    ret = compressImage(ret, block?.format?.block_width)
  }

  if (needConvert) {
    ret = BLOG.NOTION_HOST + '/image/' + encodeURIComponent(ret) + '?table=' + type + '&id=' + block.id
  }

  const current = httpUrl(ret)
  const pageCover =
    current &&
    (hostIs(current, 'notion.so') || hostIs(current, 'notion.site')) &&
    current.pathname.includes('/images/page-cover')

  if (!isEmoji(ret) && !pageCover) {
    if (BLOG.RANDOM_IMAGE_URL) {
      const texts = BLOG.RANDOM_IMAGE_REPLACE_TEXT
      let isReplace = false
      if (texts) {
        texts.split(',').forEach(text => {
          if (sourceUrl.includes(text) || ret.includes(text)) isReplace = true
        })
      } else {
        isReplace = true
      }
      if (isReplace) ret = BLOG.RANDOM_IMAGE_URL
    }
    if (
      ret &&
      ret.length > 4 &&
      !(current && current.hostname === 'www.notion.so' && current.pathname.startsWith('/images/'))
    ) {
      const separator = ret.includes('?') ? '&' : '?'
      ret = ret.trim() + separator + 't=' + block.id
    }
  }

  if (needCompress) ret = compressImage(ret, block?.format?.block_width)
  return ret
}

function isEmoji(str) {
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{238C}\u{2B06}\u{2B07}\u{2B05}\u{27A1}\u{2194}-\u{2199}\u{21A9}\u{21AA}\u{2934}\u{2935}\u{25AA}\u{25AB}\u{25FE}\u{25FD}\u{25FB}\u{25FC}\u{25B6}\u{25C0}\u{1F200}-\u{1F251}]/u
  return emojiRegex.test(str)
}

const compressImage = (image, width, quality = 50, fmt = 'webp') => {
  const urlObj = httpUrl(image) || httpUrl(safeDecode(image))
  if (!urlObj) return image
  if (urlObj.pathname.toLowerCase().endsWith('.svg')) return image
  if (!width || width === 0) width = siteConfig('IMAGE_COMPRESS_WIDTH')

  const prefix = matchingProxyPrefix(image)
  if (prefix) {
    const sourceUrl = decodeProxySource(image, urlObj)
    if (!sourceUrl) return image
    const source = httpUrl(sourceUrl)
    if (source && source.hostname === 'images.unsplash.com') {
      const compressed = compressImage(sourceUrl, width, quality, fmt)
      const next = new URL(image)
      next.pathname = new URL(prefix).pathname + encodeURIComponent(compressed)
      return next.toString()
    }
    const inner = nestedHttpUrl(urlObj)
    if (hostIs(inner, 'amazonaws.com')) {
      const params = new URLSearchParams(urlObj.search)
      params.set('width', String(width))
      params.set('cache', 'v2')
      urlObj.search = params.toString()
      return urlObj.toString()
    }
    return image
  }

  if (urlObj.hostname === 'images.unsplash.com') {
    const params = new URLSearchParams(urlObj.search)
    params.set('q', String(quality))
    params.set('width', String(width))
    params.set('fmt', fmt)
    params.set('fm', fmt)
    urlObj.search = params.toString()
    return urlObj.toString()
  }

  if (urlObj.hostname === 'your_picture_bed') return 'do_somethin_here'
  return image
}

export { compressImage, mapImgUrl }
