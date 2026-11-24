const CITIES = [
  ['Beijing', '北京', 'CN'],
  ['Shanghai', '上海', 'CN'],
  ['Guangzhou', '广州', 'CN'],
  ['Shenzhen', '深圳', 'CN'],
  ['Hangzhou', '杭州', 'CN'],
  ['Chengdu', '成都', 'CN'],
  ['Nanjing', '南京', 'CN'],
  ['Suzhou', '苏州', 'CN'],
  ['Wuhan', '武汉', 'CN'],
  ['Xian', '西安', 'CN'],
  ['Chongqing', '重庆', 'CN'],
  ['Tianjin', '天津', 'CN'],
  ['Qingdao', '青岛', 'CN'],
  ['Xiamen', '厦门', 'CN'],
  ['Kunming', '昆明', 'CN'],
  ['Dali', '大理', 'CN'],
  ['Hong Kong', '香港', 'CN'],
  ['Macao', '澳门', 'CN'],
  ['Taipei', '台北', 'TW'],
  ['Tokyo', '东京', 'JP'],
  ['Osaka', '大阪', 'JP'],
  ['Seoul', '首尔', 'KR'],
  ['Singapore', '新加坡', 'SG'],
  ['Bangkok', '曼谷', 'TH'],
  ['Chiang Mai', '清迈', 'TH'],
  ['Kuala Lumpur', '吉隆坡', 'MY'],
  ['Jakarta', '雅加达', 'ID'],
  ['Hanoi', '河内', 'VN'],
  ['Ho Chi Minh City', '胡志明市', 'VN'],
  ['Manila', '马尼拉', 'PH'],
  ['Mumbai', '孟买', 'IN'],
  ['New Delhi', '新德里', 'IN'],
  ['Bengaluru', '班加罗尔', 'IN'],
  ['Kathmandu', '加德满都', 'NP'],
  ['London', '伦敦', 'GB'],
  ['Edinburgh', '爱丁堡', 'GB'],
  ['Paris', '巴黎', 'FR'],
  ['Berlin', '柏林', 'DE'],
  ['Munich', '慕尼黑', 'DE'],
  ['Amsterdam', '阿姆斯特丹', 'NL'],
  ['Madrid', '马德里', 'ES'],
  ['Barcelona', '巴塞罗那', 'ES'],
  ['Rome', '罗马', 'IT'],
  ['Milan', '米兰', 'IT'],
  ['Lisbon', '里斯本', 'PT'],
  ['Dublin', '都柏林', 'IE'],
  ['Stockholm', '斯德哥尔摩', 'SE'],
  ['Copenhagen', '哥本哈根', 'DK'],
  ['Oslo', '奥斯陆', 'NO'],
  ['Helsinki', '赫尔辛基', 'FI'],
  ['Zurich', '苏黎世', 'CH'],
  ['Vienna', '维也纳', 'AT'],
  ['Prague', '布拉格', 'CZ'],
  ['Warsaw', '华沙', 'PL'],
  ['Athens', '雅典', 'GR'],
  ['Istanbul', '伊斯坦布尔', 'TR'],
  ['Moscow', '莫斯科', 'RU'],
  ['New York', '纽约', 'US'],
  ['San Francisco', '旧金山', 'US'],
  ['Los Angeles', '洛杉矶', 'US'],
  ['Seattle', '西雅图', 'US'],
  ['Boston', '波士顿', 'US'],
  ['Chicago', '芝加哥', 'US'],
  ['Washington DC', '华盛顿', 'US'],
  ['Austin', '奥斯汀', 'US'],
  ['Toronto', '多伦多', 'CA'],
  ['Vancouver', '温哥华', 'CA'],
  ['Montreal', '蒙特利尔', 'CA'],
  ['Mexico City', '墨西哥城', 'MX'],
  ['Sao Paulo', '圣保罗', 'BR'],
  ['Buenos Aires', '布宜诺斯艾利斯', 'AR'],
  ['Santiago', '圣地亚哥', 'CL'],
  ['Lima', '利马', 'PE'],
  ['Bogota', '波哥大', 'CO'],
  ['Dubai', '迪拜', 'AE'],
  ['Abu Dhabi', '阿布扎比', 'AE'],
  ['Doha', '多哈', 'QA'],
  ['Riyadh', '利雅得', 'SA'],
  ['Cairo', '开罗', 'EG'],
  ['Nairobi', '内罗毕', 'KE'],
  ['Lagos', '拉各斯', 'NG'],
  ['Cape Town', '开普敦', 'ZA'],
  ['Johannesburg', '约翰内斯堡', 'ZA'],
  ['Casablanca', '卡萨布兰卡', 'MA'],
  ['Sydney', '悉尼', 'AU'],
  ['Melbourne', '墨尔本', 'AU'],
  ['Brisbane', '布里斯班', 'AU'],
  ['Perth', '珀斯', 'AU'],
  ['Auckland', '奥克兰', 'NZ'],
  ['Wellington', '惠灵顿', 'NZ']
].map(([name, zh, country]) => ({ id: name, name, zh, country }))
function cityLabel(value, locale = 'zh') {
  const city = CITIES.find((item) => item.id === value)
  return city
    ? `${locale === 'en' ? city.name : city.zh} · ${city.country}`
    : value
}
function canonicalCity(value) {
  const query = String(value || '').trim()
  const match = CITIES.find(
    (city) => city.id.toLowerCase() === query.toLowerCase() || city.zh === query
  )
  return match?.id || query
}
function localTime(value, separator = '.') {
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return ''
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}${separator}${pad(date.getMonth() + 1)}${separator}${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}
function timezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || offsetLabel()
  } catch {
    return offsetLabel()
  }
}
function offsetLabel() {
  const offset = -new Date().getTimezoneOffset()
  const pad = (n) => String(n).padStart(2, '0')
  return `UTC${offset >= 0 ? '+' : '-'}${pad(Math.floor(Math.abs(offset) / 60))}:${pad(Math.abs(offset) % 60)}`
}
function toInstant(value) {
  const date = new Date(value)
  const local =
    typeof value === 'string' &&
    value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/)
  if (
    local &&
    [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ].some((part, index) => part !== Number(local[index + 1] || 0))
  )
    return ''
  return Number.isFinite(date.getTime()) ? date.toISOString() : ''
}
module.exports = {
  CITIES,
  cityLabel,
  canonicalCity,
  localTime,
  timezone,
  offsetLabel,
  toInstant
}
