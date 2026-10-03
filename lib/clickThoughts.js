/**
 * Click-thought words for ourbeings.com.
 * Only complete words, at most five characters, taken from site articles.
 */

export const MAX_CLICK_THOUGHT_CHARS = 5

export function charLen(value) {
  return Array.from(String(value || '')).length
}

export const FALLBACK_CLICK_THOUGHTS = [
  '存在',
  '同化',
  '异化',
  '性',
  '什么是人',
  '思想',
  '自由',
  '选择'
]

const PRODUCT_OR_NOISE = new Set(
  [
    'gemini ai pro',
    '免费领取',
    '美区苹果id',
    '一次性id',
    'apple store',
    'ourbeings',
    'diy',
    'diy1',
    'diy2',
    '推荐',
    '新闻',
    '工具',
    '开发',
    '建站',
    '开店',
    '爱折腾'
  ].map(item => item.toLowerCase())
)

const WEEKDAYS = new Set([
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
  '周日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日'
])

const SINGLE_CHAR_ALLOW = new Set([
  '性',
  '道',
  '术',
  '爱',
  '我',
  '你',
  '人',
  '死',
  '生',
  '真',
  '假',
  '善',
  '恶',
  '畏',
  '烦'
])

/**
 * Thought-colored complete words. Kept only when they actually appear
 * in article titles, tags, summaries, categories, or the open page.
 * Longer entries are matched first.
 */
export const THOUGHT_LEXICON = [
  '什么是人',
  '人生存在',
  '既定选择',
  '我们的存在',
  '我的存在',
  '自然与社会',
  '文明与野蛮',
  '舆论控制',
  '不得人爱',
  '无法爱人',
  '影片启蒙',
  '思想者',
  '存在者',
  '红领巾',
  '铁饭碗',
  '中国人',
  '主体性',
  '对象化',
  '存在',
  '同化',
  '异化',
  '自由',
  '选择',
  '自我',
  '他者',
  '主体',
  '客体',
  '意识',
  '规训',
  '权力',
  '启蒙',
  '思想',
  '人性',
  '文明',
  '野蛮',
  '家庭',
  '理想',
  '现实',
  '抉择',
  '体面',
  '稳定',
  '女性',
  '孩子',
  '未来',
  '语言',
  '游戏',
  '房子',
  '土地',
  '太监',
  '县域',
  '青年',
  '物化',
  '标签',
  '共识',
  '共鸣',
  '独立',
  '批判',
  '灵魂',
  '世界',
  '真空',
  '此在',
  '本真',
  '沉沦',
  '真理',
  '正义',
  '尊严',
  '羞耻',
  '孤独',
  '亲密',
  '爱情',
  '欲望',
  '身体',
  '死亡',
  '虚无',
  '意义',
  '价值',
  '责任',
  '义务',
  '权利',
  '制度',
  '结构',
  '依附',
  '服从',
  '觉醒',
  '证伪',
  '偏见',
  '叙事',
  '话语',
  '舆论',
  '治理',
  '自然',
  '社会',
  '金钱',
  '健康',
  '情感',
  '思考',
  '文字',
  '写作',
  '记录',
  '读者',
  '作者',
  '看见',
  '改变',
  '问题',
  '能力',
  '位置',
  '代价',
  '生育',
  '照护',
  '高考',
  '警车',
  '鲜花',
  '县城',
  '考公',
  '教育',
  '校长',
  '渔夫',
  '强者',
  '弱者',
  '外交',
  '口音',
  '认同',
  '标准',
  '版权',
  '学习',
  '资料',
  '日常',
  '意见',
  '反馈',
  '自洽',
  '物我',
  '自欺',
  '解离',
  '拧巴',
  '麻木',
  '敏感',
  '无根',
  '共在',
  '常人',
  '他心',
  '操心',
  '向死',
  '关系',
  '交友',
  '爱',
  '性',
  '道',
  '术',
  '人',
  '我',
  '你',
  '死',
  '生',
  '真',
  '假',
  '善',
  '恶',
  '畏',
  '烦'
].sort((a, b) => charLen(b) - charLen(a) || a.localeCompare(b, 'zh-CN'))

const TITLE_SPLIT =
  /[，。！？、；：|·\s\-—～~「」『』《》【】（）()[\]“”‘’'"`,.!?;:/\\]+/u

export function normalizeTags(tags) {
  if (!tags) return []
  if (Array.isArray(tags)) {
    return tags.flatMap(item => normalizeTags(item))
  }
  const raw = String(tags).trim()
  if (!raw) return []
  if (raw.startsWith('[')) {
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        return parsed.map(item => String(item).trim()).filter(Boolean)
      }
    } catch (error) {
      // fall through to delimiter split
    }
  }
  return raw
    .split(/[,，、|]/)
    .map(item => item.trim())
    .filter(Boolean)
}

function isMostlyCjk(word) {
  const chars = Array.from(word)
  if (!chars.length) return false
  return chars.every(char => /[\u3400-\u9fff]/.test(char))
}

function isDateTitle(title) {
  return /^\d{4}[./-]\d{1,2}([./-]\d{1,2})?/.test(String(title || '').trim())
}

export function isCompleteClickWord(word) {
  const text = String(word || '').trim()
  if (!text) return false
  const length = charLen(text)
  if (length < 1 || length > MAX_CLICK_THOUGHT_CHARS) return false
  if (!isMostlyCjk(text)) return false
  if (/^\d+$/.test(text)) return false
  if (WEEKDAYS.has(text)) return false
  if (PRODUCT_OR_NOISE.has(text.toLowerCase())) return false
  if (length === 1 && !SINGLE_CHAR_ALLOW.has(text)) return false
  return true
}

function pageText(page) {
  const tags = normalizeTags(page?.tags)
  return [page?.title, page?.summary, page?.category, page?.contentText, ...tags]
    .filter(Boolean)
    .join(' ')
}

function collectFromLexicon(text, bucket) {
  if (!text) return
  for (const word of THOUGHT_LEXICON) {
    if (text.includes(word) && isCompleteClickWord(word)) {
      bucket.add(word)
    }
  }
}

function isPublishedPost(page) {
  const type = String(page?.type || 'Post')
  const status = String(page?.status || 'Published')
  const typeOk = !type || type === 'Post'
  const statusOk = !status || status === 'Published'
  return typeOk && statusOk
}

/**
 * Build the click-word pool from site articles.
 * @param {Array} pages allNavPages / posts
 * @param {string} [extraText] currently open article body
 * @returns {string[]}
 */
export function extractClickWords(pages = [], extraText = '') {
  const found = new Set()
  const list = Array.isArray(pages) ? pages.filter(Boolean) : []
  const posts = list.filter(isPublishedPost)
  const source = posts.length ? posts : list

  for (const page of source) {
    for (const tag of normalizeTags(page.tags)) {
      if (isCompleteClickWord(tag)) found.add(tag)
    }
    const category = String(page.category || '').trim()
    if (isCompleteClickWord(category)) found.add(category)

    collectFromLexicon(pageText(page), found)

    const title = String(page.title || '').trim()
    if (title && !isDateTitle(title)) {
      for (const token of title.split(TITLE_SPLIT)) {
        if (isCompleteClickWord(token)) found.add(token)
      }
    }
  }

  collectFromLexicon(String(extraText || ''), found)

  const words = Array.from(found)
  return words.length ? words : [...FALLBACK_CLICK_THOUGHTS]
}
