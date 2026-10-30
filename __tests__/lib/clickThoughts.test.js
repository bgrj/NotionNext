import {
  FALLBACK_CLICK_THOUGHTS,
  MAX_CLICK_THOUGHT_CHARS,
  charLen,
  extractClickWords,
  isCompleteClickWord,
  normalizeTags
} from '@/lib/clickThoughts'

describe('click thought words', () => {
  test('keeps complete words of at most five characters', () => {
    expect(isCompleteClickWord('存在')).toBe(true)
    expect(isCompleteClickWord('什么是人')).toBe(true)
    expect(isCompleteClickWord('我们的存在')).toBe(true)
    expect(isCompleteClickWord('个人理想与现实抉择')).toBe(false)
    expect(isCompleteClickWord('稳定体面与家庭')).toBe(false)
    expect(isCompleteClickWord('周日')).toBe(false)
    expect(isCompleteClickWord('免费领取')).toBe(false)
    expect(isCompleteClickWord('的')).toBe(false)
    expect(isCompleteClickWord('性')).toBe(true)
    expect(charLen('什么是人')).toBeLessThanOrEqual(MAX_CLICK_THOUGHT_CHARS)
  })

  test('reads tags from arrays and JSON strings', () => {
    expect(normalizeTags('["存在","思考"]')).toEqual(['存在', '思考'])
    expect(normalizeTags(['情感', '人生存在'])).toEqual(['情感', '人生存在'])
  })

  test('pulls complete words from all articles, not fragments', () => {
    const words = extractClickWords([
      {
        type: 'Post',
        status: 'Published',
        title: '从红领巾到铁饭碗：什么在收窄县域青年的一生',
        tags: ['中国人', '人生存在', '个人理想与现实抉择'],
        summary: '县域青年被结构压缩，考公成为出路。',
        category: '道'
      },
      {
        type: 'Post',
        status: 'Published',
        title: '2025.6.26 周四',
        tags: '["思考","存在","同化"]',
        summary: '被同化的存在甚至不自知，异化随之而来。',
        category: '我的存在'
      },
      {
        type: 'Post',
        status: 'Published',
        title: '关于性与什么是人',
        tags: ['情感'],
        summary: '什么是人，性不是口号。',
        category: '道'
      }
    ])

    expect(words).toEqual(expect.arrayContaining(['存在', '同化', '异化', '性', '什么是人', '红领巾', '铁饭碗', '中国人', '思考']))
    expect(words).not.toContain('个人理想与现实抉择')
    expect(words).not.toContain('存')
    expect(words.every(word => charLen(word) <= MAX_CLICK_THOUGHT_CHARS)).toBe(
      true
    )
    expect(words.every(word => isCompleteClickWord(word))).toBe(true)
  })

  test('ignores unpublished rows and product tags', () => {
    const words = extractClickWords([
      {
        type: 'Post',
        status: 'Draft',
        title: '草稿里的异化',
        tags: ['异化']
      },
      {
        type: 'Post',
        status: 'Published',
        title: 'DIY1 || Gemini',
        tags: ['免费领取', '存在']
      }
    ])
    expect(words).toContain('存在')
    expect(words).not.toContain('免费领取')
    expect(words).not.toContain('异化')
  })

  test('falls back to the designed thought words when articles are empty', () => {
    expect(extractClickWords([])).toEqual(FALLBACK_CLICK_THOUGHTS)
  })

  test('open-page body can contribute words missing from titles', () => {
    const words = extractClickWords(
      [
        {
          type: 'Post',
          status: 'Published',
          title: '日志',
          tags: ['思考']
        }
      ],
      '正文写到同化、异化与什么是人。'
    )
    expect(words).toEqual(
      expect.arrayContaining(['思考', '同化', '异化', '什么是人'])
    )
  })
})
