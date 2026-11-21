export const DAO_VOICES = [
  {
    id: 'xiaoxiao',
    name: '晓晓 · 温和叙事（普通话）',
    english: 'Xiaoxiao · Warm Mandarin',
    gender: 'female'
  },
  {
    id: 'xiaoyi',
    name: '晓伊 · 清亮随笔（普通话）',
    english: 'Xiaoyi · Lively Mandarin',
    gender: 'female'
  },
  {
    id: 'hsiaochen',
    name: '晓臻 · 亲切叙述（台式国语）',
    english: 'HsiaoChen · Friendly Taiwan Mandarin',
    gender: 'female'
  },
  {
    id: 'hsiaoyu',
    name: '晓雨 · 平和叙述（台式国语）',
    english: 'HsiaoYu · Taiwan Mandarin',
    gender: 'female'
  },
  {
    id: 'xiaobei',
    name: '晓北 · 生活口语（东北口音）',
    english: 'Xiaobei · Northeastern Mandarin',
    gender: 'female'
  },
  {
    id: 'yunyang',
    name: '云扬 · 理性分析（普通话）',
    english: 'Yunyang · Professional Mandarin',
    gender: 'male'
  },
  {
    id: 'yunxi',
    name: '云希 · 清朗叙事（普通话）',
    english: 'Yunxi · Clear Mandarin',
    gender: 'male'
  },
  {
    id: 'yunjian',
    name: '云健 · 有力叙事（普通话）',
    english: 'Yunjian · Expressive Mandarin',
    gender: 'male'
  },
  {
    id: 'yunxia',
    name: '云夏 · 轻快口语（普通话）',
    english: 'Yunxia · Youthful Mandarin',
    gender: 'male'
  },
  {
    id: 'yunjhe',
    name: '云哲 · 亲切叙述（台式国语）',
    english: 'YunJhe · Friendly Taiwan Mandarin',
    gender: 'male'
  }
]

/** Split at sentence/clause boundaries, keeping each live request short. */
export function splitSpeechText(input, limit = 280) {
  let remaining = String(input || '')
    .replace(/\s+/g, ' ')
    .trim()
  const result = []
  while (remaining.length > limit) {
    const window = remaining.slice(0, limit)
    const ends = [...window.matchAll(/[。！？!?；;][」』”’]?/g)]
    const clauses = [...window.matchAll(/[，,：:]|\s/g)]
    const last = ends[ends.length - 1] || clauses[clauses.length - 1]
    let cut =
      last && last.index > limit / 3 ? last.index + last[0].length : limit
    if (/[\uD800-\uDBFF]/.test(remaining[cut - 1])) cut--
    result.push(remaining.slice(0, cut).trim())
    remaining = remaining.slice(cut).trimStart()
  }
  if (remaining) result.push(remaining)
  return result
}

export function collectDaoSpeech(root, title = '') {
  if (!root) return []
  const selector =
    '.notion-text, .notion-h, .notion-list li, .notion-quote, .notion-callout'
  const nodes = [...root.querySelectorAll(selector)]
  const selected = new Set(nodes)
  const paragraphs = nodes.filter(node => {
    if (node.closest('pre, code, .notion-table-of-contents')) return false
    for (
      let parent = node.parentElement;
      parent && parent !== root;
      parent = parent.parentElement
    ) {
      if (selected.has(parent)) return false
    }
    return true
  })
  const chunks = paragraphs.flatMap(node =>
    splitSpeechText(node.textContent).map(text => ({ text, node }))
  )
  const passages =
    chunks.length && title
      ? [
          ...splitSpeechText(
            title + (/[。！？!?]$/.test(title) ? '' : '。')
          ).map(text => ({ text, node: null })),
          ...chunks
        ]
      : chunks
  // Keep the original paragraph boundaries as prosody cues, but avoid a network
  // round trip for every short sentence/paragraph in an essay.
  const combined = []
  for (const passage of passages) {
    const previous = combined[combined.length - 1]
    if (previous && previous.text.length + passage.text.length + 2 <= 280) {
      previous.text += '\n\n' + passage.text
      previous.node ||= passage.node
    } else combined.push({ ...passage })
  }
  return combined
}

export function daoSpeechUrl(text, voice) {
  return '/api/dao-speech?' + new URLSearchParams({ text, voice }).toString()
}
