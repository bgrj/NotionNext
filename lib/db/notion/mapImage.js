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
    (url.hostname === hostname || url.hostname.endsWith(`.${hostname}`))
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
  const decoded = safeDecode(`${urlObj.pathname}${urlObj.search}`)
  const marker = decoded.indexOf('://')
  if (marker < 4) return null
  const start = decoded.slice(marker - 5, marker) === 'https' ? marker - 5 : decoded.slice(marker - 4, marker) === 'http' ? marker - 4 : -1
  if (start < 0) return null
  const rest = decoded.slice(start)
  const stop = rest.search(/[\s<>"']/)
  return httpUrl(stop === -1 ? rest : rest.slice(0, stop))
}

/**
 * 图片映射
 *
 * @param {*} img 图片地址，可能是相对路径，可能是外链
 * @param {*} block 数据块，可能是单个内容块，可能是Page
 * @param {*} type block 单个内容块 ； collection 集合列表
 * @param {*} from 来自
 * @returns
 */
const mapImgUrl = (img, block, type = 'block', needCompress = true) => {
  if (!img) {
    return null
  }

  let ret = null
  // 相对目录，则视为notion的自带图片
  if (img.startsWith('/')) {
    ret = BLOG.NOTION_HOST + img
  } else {
    ret = img
  }

  // 新CDN签名直链还原为 attachment: 标识，复用旧图床的转换逻辑（不受签名过期影响）
  const attachmentUrl = convertFileCdnUrl(ret)
  if (attachmentUrl) {
    ret = attachmentUrl
  }

  const parsed = httpUrl(ret)
  const hasConverted =
    (parsed &&
      parsed.hostname === 'www.notion.so' &&
      parsed.pathname.startsWith('/image')) ||
    (typeof ret === 'string' && ret.startsWith(`${BLOG.NOTION_HOST}/image/`)) ||
    (hostIs(parsed, 'notion.site') &&
      parsed.pathname.includes('/images/page-cover/'))

  // 需要转化的URL ; 识别aws图床地址，或者bookmark类型的外链图片
  // Notion新图床资源 格式为 attachment:${id}:${name}
  const needConvert =
    !hasConverted &&
    (block.type === 'bookmark' ||
      hostIs(parsed, 'secure.notion-static.com') ||
      (parsed && parsed.hostname.startsWith('prod-files-secure.')) ||
      (typeof ret === 'string' && ret.startsWith('attachment')))


  // Notion旧图床
  if (needConvert) {
    ret =
      BLOG.NOTION_HOST +
      '/image/' +
      encodeURIComponent(ret) +
      '?table=' +
      type +
      '&id=' +
      block.id
  }

  const current = httpUrl(ret)
  const pageCover =
    current &&
    hostIs(current, 'notion.so') &&
    current.pathname.includes('/images/page-cover')
  if (!isEmoji(ret) && !pageCover) {
    if (BLOG.RANDOM_IMAGE_URL) {
      // 只有配置了随机图片接口，才会替换图片
      const texts = BLOG.RANDOM_IMAGE_REPLACE_TEXT
      let isReplace = false
      if (texts) {
        const textArr = texts.split(',')
        // 判断是否包含替换的文本
        textArr.forEach(text => {
          if (ret.indexOf(text) > -1) {
            isReplace = true
          }
        })
      } else {
        isReplace = true
      }
      if (isReplace) {
        ret = BLOG.RANDOM_IMAGE_URL
      }
    }

    // 图片url优化，确保每一篇文章的图片url唯一
    if (
      ret &&
      ret.length > 4 &&
      !(
        current &&
        current.hostname === 'www.notion.so' &&
        current.pathname.startsWith('/images/')
      )
    ) {
      // 图片接口拼接唯一识别参数，防止请求的图片被缓，而导致随机结果相同
      const separator = ret.includes('?') ? '&' : '?'
      ret = `${ret.trim()}${separator}t=${block.id}`
    }
  }

  // 统一压缩图片
  if (needCompress) {
    const width = block?.format?.block_width
    ret = compressImage(ret, width)
  }

  return ret
}

/**
 * 是否是emoji图标
 * @param {*} str
 * @returns
 */
function isEmoji(str) {
  const emojiRegex =
    /[\u{1F300}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{238C}\u{2B06}\u{2B07}\u{2B05}\u{27A1}\u{2194}-\u{2199}\u{2194}\u{21A9}\u{21AA}\u{2934}\u{2935}\u{25AA}\u{25AB}\u{25FE}\u{25FD}\u{25FB}\u{25FC}\u{25B6}\u{25C0}\u{1F200}-\u{1F251}]/u
  return emojiRegex.test(str)
}

/**
 * 压缩图片
 * 1. Notion图床可以通过指定url-query参数来压缩裁剪图片 例如 ?xx=xx&width=400
 * 2. UnPlash 图片可以通过api q=50 控制压缩质量 width=400 控制图片尺寸
 * @param {*} image
 */
const compressImage = (image, width, quality = 50, fmt = 'webp') => {
  const urlObj = httpUrl(image) || httpUrl(safeDecode(image))
  if (!urlObj) {
    return image
  }

  if (urlObj.pathname.toLowerCase().endsWith('.svg')) return image

  if (!width || width === 0) {
    width = siteConfig('IMAGE_COMPRESS_WIDTH')
  }

  const params = new URLSearchParams(urlObj.search)
  let notionHost = ''
  try {
    notionHost = new URL(BLOG.NOTION_HOST).hostname
  } catch {
    notionHost = ''
  }
  const inner = nestedHttpUrl(urlObj)

  // Notion 代理的 AWS 图床
  if (notionHost && urlObj.hostname === notionHost && hostIs(inner, 'amazonaws.com')) {
    params.set('width', width)
    params.set('cache', 'v2')
    urlObj.search = params.toString()
    return urlObj.toString()
  }

  if (urlObj.hostname === 'images.unsplash.com') {
    params.set('q', quality)
    params.set('width', width)
    params.set('fmt', fmt)
    params.set('fm', fmt)
    urlObj.search = params.toString()
    return urlObj.toString()
  }

  if (urlObj.hostname === 'your_picture_bed') {
    // 此处还可以添加您的自定义图传的封面图压缩参数。
    return 'do_somethin_here'
  }

  return image
}

export { compressImage, mapImgUrl }
