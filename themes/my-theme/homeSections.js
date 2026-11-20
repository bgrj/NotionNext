export const DEFAULT_HOME_SECTIONS = ['our', 'self', 'dao', 'shu']
export const DEFAULT_OPEN_SECTIONS = ['dao']

export const HOME_SECTIONS = [
  {
    key: 'our',
    name: '我们的存在',
    english: 'Our beings',
    href: '/category/我们的存在'
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
