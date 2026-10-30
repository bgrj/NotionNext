import {
  changeCommunity,
  createMemoryCommunityStore,
  emptyCommunity,
  executeCommunity,
  queryCommunity
} from './model'

export const DEMO_ACTORS = [
  { id: 'demo_writer', name: '示例·记录者', moderator: false },
  { id: 'demo_reader', name: '示例·共读者', moderator: false },
  { id: 'demo_reviewer', name: '示例·审核者', moderator: true }
]
const STORAGE_KEY = 'ourbeings-explicit-demo-v1'
const future = (now, days) => new Date(now + days * 86400000).toISOString()

export function seedDemo(now = Date.now()) {
  const state = emptyCommunity()
  let counter = 0
  const ctx = {
    now,
    at: new Date(now).toISOString(),
    id: () => `demo_${++counter}`
  }
  const author = DEMO_ACTORS[0]
  const reviewer = DEMO_ACTORS[2]
  const run = (actor, type, input) =>
    changeCommunity(state, actor, { type, input }, ctx)
  for (const actor of DEMO_ACTORS)
    run(actor, 'profile.save', { name: actor.name })
  const items = [
    {
      kind: 'journal',
      domain: 'existence',
      title: '把今天，认真地收好',
      body: '示例记录：今天没有解决所有问题，但读完了一章书。\n\n这条记录默认私密。你可以编辑、归档、导出，也可以预览并提交公开审核。',
      tags: ['日常'],
      private: true
    },
    {
      kind: 'book',
      domain: 'dao',
      title: '活出生命的意义',
      creator: '维克多·弗兰克尔',
      coreQuestion: '意义，会不会从一个具体行动开始？',
      summary: '示例书目与个人问题；不附电子书文件。',
      body: '这是一条用于体验的馆藏记录。书目信息、个人笔记和原始文件分别管理。',
      readingStatus: 'reading',
      tags: ['意义', '阅读']
    },
    {
      kind: 'essay',
      domain: 'dao',
      title: '在没有标准答案的地方相遇',
      summary: '示例导读。容许问题暂时没有答案，也愿意认真听完另一种解释。',
      coreQuestion: '一个人，如何成为自己？',
      body: '## 先从一个问题开始\n我们不急于把彼此说服。先说明自己的经验，再让经验接受追问。\n\n> 思考的空间，也可以是一处相遇的地方。\n\n## 留下可以回来的线索\n一篇笔记可以属于图书馆，也可以出现在「道」；它始终保留同一个 ID。',
      citations: '此为功能导览的示例文案，并非任何书籍的原文。',
      allowComments: true,
      tags: ['存在', '自由']
    },
    {
      kind: 'resource',
      domain: 'shu',
      title: '给一次性的经验，留一份使用说明',
      summary: '示例方法记录：说明适用条件、步骤、验证日期和失效状态。',
      body: '这是一条演示性的 know-how 记录。请用真实的使用条件与验证结果替换它。',
      applicability: '整理自己的公开方法笔记。',
      steps:
        '1. 写明要完成的任务\n2. 补上适用环境\n3. 验证后记录日期\n4. 失效时说明替代方案',
      toolState: 'unverified',
      tags: ['方法']
    },
    {
      kind: 'image',
      domain: 'existence',
      title: '一段值得回看的影像',
      creator: '示例条目',
      summary: '影像馆记录自有或收藏作品的来源、观看时间和个人说明。',
      body: '示例影像条目，没有附加影视原文件。',
      ownership: 'collected',
      private: true
    },
    {
      kind: 'audio',
      domain: 'existence',
      title: '把思想，慢慢说给你听',
      creator: '示例条目',
      duration: '12:30',
      summary: '音频馆的示例笔记，不伪装成已经上线的节目。',
      body: '示例聆听笔记。当前没有音源，因此不会显示虚假的播放按钮。',
      private: true
    }
  ]
  for (const entry of items) {
    let item = run(author, 'content.create', entry)
    if (!entry.private) {
      item = run(author, 'content.submit', {
        id: item.id,
        revision: item.revision
      })
      run(reviewer, 'review.decide', {
        kind: 'contents',
        id: item.id,
        revision: item.revision,
        approve: true
      })
    }
  }
  let event = run(author, 'event.create', {
    title: '示例共读：意义从哪里开始',
    format: 'online',
    description:
      '这是一场用于体验报名与组织者管理的虚构活动，不是真实活动邀请。',
    materials: '任选一段关于意义的阅读材料。',
    participation: '功能导览，请勿填写真实联系方式。',
    startAt: future(now, 7),
    endAt: future(now, 7.08),
    deadlineAt: future(now, 6),
    timezone: 'Asia/Shanghai',
    capacity: 8,
    meetingInfo: '示例会议信息：仅确认报名后可见，不含真实会议链接。'
  })
  event = run(author, 'event.submit', {
    id: event.id,
    revision: event.revision
  })
  run(reviewer, 'review.decide', {
    kind: 'events',
    id: event.id,
    revision: event.revision,
    approve: true
  })
  const exchange = run(author, 'exchange.create', {
    title: '示例·让一本书继续旅行',
    offered: '一本保存完好的旧书（示例）',
    wanted: '另一本你愿意推荐的书（示例）',
    condition: '少量折角，无缺页',
    city: '示例城市',
    delivery: '双方约定后再交付',
    shipping: '各自承担寄出运费'
  })
  run(reviewer, 'review.decide', {
    kind: 'exchanges',
    id: exchange.id,
    revision: exchange.revision,
    approve: true
  })
  return state
}

export function demoCommunityClient({
  storage = typeof window === 'undefined' ? null : window.localStorage
} = {}) {
  let initial
  try {
    const raw = storage?.getItem(STORAGE_KEY)
    const saved = raw ? JSON.parse(raw) : null
    initial =
      saved?.schema === 1 && saved?.profiles?.demo_writer ? saved : seedDemo()
  } catch {
    initial = seedDemo()
  }
  const store = createMemoryCommunityStore(initial)
  return {
    async query(actor, type, params = {}) {
      return queryCommunity((await store.read()).state, actor, {
        type,
        ...params
      })
    },
    async command(actor, type, input) {
      const result = await executeCommunity(store, actor, { type, input })
      try {
        storage?.setItem(
          STORAGE_KEY,
          JSON.stringify((await store.read()).state)
        )
      } catch {
        /* A blocked/full browser store must not prevent exporting this session. */
      }
      return result
    },
    async reset() {
      storage?.removeItem(STORAGE_KEY)
    }
  }
}

export const liveCommunityClient = {
  async query(actor, type, params = {}) {
    const { id, ...rest } = params
    const response = await fetch(
      `/api/ourbeings/v1/${type}${id ? `/${encodeURIComponent(id)}` : ''}?${new URLSearchParams(Object.entries(rest).filter(([, value]) => value !== undefined))}`,
      { cache: 'no-store', credentials: 'same-origin' }
    )
    const payload = await response.json()
    if (!response.ok || payload.error) {
      const error = new Error(
        payload.error?.message || '暂时无法读取，请稍后重试。'
      )
      error.code = payload.error?.code
      throw error
    }
    return payload.data ?? payload
  },
  async command(actor, type, input) {
    const response = await fetch('/api/ourbeings/v1/commands', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, input })
    })
    const payload = await response.json()
    if (!response.ok || payload.error) {
      const error = new Error(
        payload.error?.message || '这次没有保存，请稍后重试。'
      )
      error.code = payload.error?.code
      throw error
    }
    return payload.data
  }
}
