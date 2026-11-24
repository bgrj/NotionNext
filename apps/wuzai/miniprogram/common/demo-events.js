// Explicit, read-only product examples. Dates never shift silently between visits.
const { STATUS_LABELS } = require('./activities')
const anchor = Date.parse('2026-11-24T11:00:00Z')
const day = 86400000
const examples = [
  ['一起读《我与你》', '我与你', '从“我与它”到“我与你”：各带一个生活中的相遇，轮流读一段，再用自己的经历回应。无需读完整本书。', 'reading', 2, 'online', '', 'bilingual', 'wechat', 0, 12],
  ['北京：在《论语》中谈日常', '论语 · 学而', '选读三则原文，讨论学习和相处如何落在日常生活。请带一本自用版本；场地为演示地点，勿前往。', 'reading', 3, 'offline', 'beijing', 'zh', 'wechat', 3, 8],
  ['London · A Room of One’s Own', 'A Room of One’s Own', 'Read a short passage together, then discuss time, space and the conditions for making work. English conversation; no prior reading required.', 'reading', 4, 'offline', 'london', 'en', 'whatsapp', 2, 10],
  ['把问题留给彼此：什么是自由？', '自由与责任', '每个人带来一个真实困惑。先听对方说完，再追问理由，不以辩倒彼此为目的。', 'conversation', 5, 'online', '', 'bilingual', 'telegram', 0, 8],
  ['上海：用一首诗交换一天', '自选诗歌', '带来一首自己写的诗，或一首愿意介绍的诗。先朗读，再谈它与今天的关系。模拟场地，不接受到访。', 'conversation', 6, 'offline', 'shanghai', 'zh', 'qq', 4, 6],
  ['Tokyo · Slow reading, small steps', 'The Little Prince', 'A bilingual reading with pauses for questions. Bring a passage in either Chinese or English and help each other find its meaning.', 'reading', 7, 'online', 'tokyo', 'bilingual', 'line', 1, 12],
  ['Singapore · Notes on belonging', 'Belonging', 'A small conversation about moving cities and making a home. Share only what feels comfortable. Chinese and English are both welcome.', 'conversation', 8, 'offline', 'singapore', 'bilingual', 'whatsapp', 0, 8],
  ['New York · Letters across time zones', 'Letters to a Young Poet', 'Read one letter, write a short response, then listen to another reader. Please check the local time shown on your device.', 'reading', 9, 'online', 'new-york', 'en', 'telegram', 5, 16],
  ['成都：一杯茶的时间，谈谈创造', '日常中的创造', '从做饭、写作或一次工作实践开始，谈谈你如何把一个想法做出来。每人分享五分钟。地点为演示。', 'conversation', 10, 'offline', 'chengdu', 'zh', 'wechat', 2, 6],
  ['Paris · Learning to pay attention', 'Ways of Seeing', 'Bring one image from daily life and describe what you notice before explaining what it means. A conversation in English.', 'conversation', 11, 'online', 'paris', 'en', 'other', 3, 10],
  ['满额示例：重读《局外人》', '局外人', '此条演示名额已满的界面。讨论人物与社会之间的距离；模拟人数不代表真实报名。', 'reading', 3, 'online', '', 'zh', 'wechat', 6, 6],
  ['截止示例：一段安静的共读', '自选散文', '此条演示活动尚未开始但预约已经截止。先安静阅读二十分钟，再各分享一段。', 'reading', 1, 'online', '', 'bilingual', 'line', 2, 8],
  ['往期：读完之后，我们写下什么', '阅读后的写作', '此条演示已结束的活动。共读之后，每个人留下一个仍愿意继续思考的问题。', 'conversation', -2, 'online', '', 'zh', 'qq', 4, 8],
  ['往期 · A conversation on friendship', 'Friendship', 'An archived example: a small group explored how friendship changes with distance and time. All attendance figures are simulated.', 'conversation', -4, 'online', '', 'en', 'telegram', 3, 8],
  ['取消示例：杭州周末读书散步', '散步与阅读', '此条演示取消通知与活动归档。模拟安排已取消，不应前往或联系任何场地。', 'reading', 4, 'offline', 'hangzhou', 'zh', 'wechat', 0, 10]
]
function demoEvents(now = Date.now()) {
  return examples.map((row, index) => {
    const [title, book, description, kind, days, format, city, language, channel, booked, capacity] = row
    const startsAt = new Date(anchor + days * day).toISOString()
    const endsAt = new Date(anchor + days * day + 90 * 60000).toISOString()
    const deadline = new Date(index === 11 ? anchor - day : anchor + days * day - 3600000).toISOString()
    const status = index === 14 ? 'cancelled' : Date.parse(endsAt) <= now ? 'ended' : Date.parse(startsAt) <= now ? 'ongoing' : Date.parse(deadline) <= now ? 'closed' : booked === capacity ? 'full' : 'open'
    return {
      id: 'de000000-2026-4000-8000-' + String(index + 1).padStart(12, '0'),
      demo: true, title, book, description, kind, format, city, language, channel,
      location: format === 'online' ? 'Online · ' + channel : city + ' · 演示场地 / demo venue',
      startsAt, endsAt, deadline, timezone: 'Asia/Shanghai', booked, capacity,
      remaining: capacity - booked, hostName: '吾在 · Demo',
      discussion: channel === 'wechat' ? 'wechat' : 'external',
      state: index === 14 ? 'cancelled' : 'published', status, statusLabel: STATUS_LABELS[status],
      isHost: false, reservation: null, canReserve: false, canChat: false, canPost: false,
      joinInstructions: '', announcements: index === 14 ? [{ id: 1, body: '演示活动已取消 / Demo cancelled.', at: new Date(anchor).toISOString() }] : [],
      createdAt: new Date(anchor).toISOString(), updatedAt: new Date(anchor).toISOString()
    }
  })
}
const getDemoEvent = (id, now) => demoEvents(now).find(item => item.id === id)
module.exports = { demoEvents, getDemoEvent }
