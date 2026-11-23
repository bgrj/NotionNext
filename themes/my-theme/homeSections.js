export const DEFAULT_HOME_SECTIONS = ['our', 'self', 'dao', 'shu']
export const DEFAULT_OPEN_SECTIONS = ['our', 'dao']

export const HOME_SECTIONS = [
  {
    key: 'our',
    name: '我们的存在',
    english: 'Our beings',
    href: '/our-beings'
  },
  {
    key: 'self',
    name: '我的存在',
    english: 'My being',
    href: '/category/我的存在'
  },
  { key: 'dao', name: '道', english: 'Dao', href: '/category/道' },
  { key: 'shu', name: '术', english: 'Practice', href: '/category/术' }
]

// 术的分类页还没作为板块开放。主页和设置里的「术」暂时去雅思练习。
// 删掉这一项后，术会回到「开发中……」。
export const TEMPORARY_SECTION_LINKS = {
  shu: {
    href: 'https://ourbeings.com/ielts/',
    label: '进入雅思练习',
    shortLabel: '雅思练习',
    labelEn: 'Open IELTS practice',
    shortLabelEn: 'IELTS practice'
  }
}

export function temporarySectionLink(key) {
  return TEMPORARY_SECTION_LINKS[key] || null
}

export function isExternalSectionHref(href) {
  return /^https?:\/\//i.test(href)
}

const SECTION_KEYS = ['our', 'self', 'dao', 'shu']

export function homeSections(value, fallback = DEFAULT_HOME_SECTIONS) {
  let sections = value
  if (typeof sections === 'string') {
    try {
      sections = JSON.parse(sections)
    } catch {
      sections = sections.split(/[,，\s]+/)
    }
  }
  if (!Array.isArray(sections)) return fallback
  const valid = [...new Set(sections.filter(key => SECTION_KEYS.includes(key)))]
  return valid.length ? valid : fallback
}

export const openHomeSections = value =>
  homeSections(value, DEFAULT_OPEN_SECTIONS)
