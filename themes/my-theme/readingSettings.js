export const ARTICLE_BACKGROUND =
  '/assets/ourbeing/web-mainpage-uphand.dc81786dbc79.webp'

export const articleOpacity = (value, fallback) => {
  if (value === '' || value == null || typeof value === 'boolean') return fallback
  const number = Number(value)
  return Number.isFinite(number) ? Math.min(1, Math.max(0, number)) : fallback
}

export const articleBackground = value => {
  const path = String(value || '').trim()
  // Keep configuration out of CSS syntax; only local paths and HTTP(S) images.
  if (/^(https?:\/\/|\/(?!\/))/.test(path) && !/[<>"'\\\n\r]/.test(path)) {
    return path
  }
  return ARTICLE_BACKGROUND
}

export const UI_LANGUAGE_LABELS = {
  'zh-CN': '简体中文',
  'en-US': 'English',
  'zh-TW': '繁體中文（台灣）',
  'zh-HK': '繁體中文（香港）',
  'ja-JP': '日本語',
  'fr-FR': 'Français',
  'tr-TR': 'Türkçe'
}

export const uiLanguageOptions = (configured, current) => {
  const candidates = Array.isArray(configured) ? configured : ['zh-CN', 'en-US']
  const valid = candidates.filter(code => Object.hasOwn(UI_LANGUAGE_LABELS, code))
  if (!valid.length) valid.push('zh-CN', 'en-US')
  if (Object.hasOwn(UI_LANGUAGE_LABELS, current)) valid.push(current)
  return [...new Set(valid)]
}
