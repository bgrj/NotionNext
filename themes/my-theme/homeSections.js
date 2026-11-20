export const DEFAULT_HOME_SECTIONS = ['dao']

const SECTION_KEYS = ['our', 'self', 'dao', 'shu']

export function homeSections(value) {
  let sections = value
  if (typeof sections === 'string') {
    try {
      sections = JSON.parse(sections)
    } catch {
      sections = sections.split(/[,，\s]+/)
    }
  }
  if (!Array.isArray(sections)) return DEFAULT_HOME_SECTIONS
  const valid = [...new Set(sections.filter(key => SECTION_KEYS.includes(key)))]
  return valid.length ? valid : DEFAULT_HOME_SECTIONS
}
