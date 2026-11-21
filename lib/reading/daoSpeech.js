export const DAO_VOICES = [
  {
    id: 'xiaoxiao',
    name: '晓晓 · 温和女声',
    english: 'Xiaoxiao · Warm female'
  },
  { id: 'yunxi', name: '云希 · 清朗男声', english: 'Yunxi · Clear male' },
  { id: 'xiaoyi', name: '晓伊 · 轻柔女声', english: 'Xiaoyi · Soft female' }
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
    const last = ends.at(-1) || clauses.at(-1)
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
  return chunks.length && title
    ? [
        ...splitSpeechText(title + (/[。！？!?]$/.test(title) ? '' : '。')).map(
          text => ({ text, node: null })
        ),
        ...chunks
      ]
    : chunks
}

export function daoSpeechUrl(text, voice) {
  return '/api/dao-speech?' + new URLSearchParams({ text, voice }).toString()
}
