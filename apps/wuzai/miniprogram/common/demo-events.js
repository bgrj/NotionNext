// Read-only examples anchored to explicit dates; attendance is always simulated.
const { STATUS_LABELS } = require('./activities')
const anchor = Date.parse('2026-11-24T11:00:00Z')
const day = 86400000
const examples = [
  {
    title: '共读《鼠疫》：普通人怎样回应共同的处境',
    book: '鼠疫',
    bookAuthor: '阿尔贝·加缪',
    cover: 'plague.jpg',
    description:
      '选自雅典学园的加缪作品合刊《鼠疫·局外人》，本场读《鼠疫》。从一个人物的具体行动出发，讨论责任、有限的能力与人与人的联系；带一个真实的日常观察，也可以只听。',
    kind: 'reading',
    topic: '共读',
    format: 'online',
    city: '',
    place: null,
    channel: 'wechat',
    language: 'bilingual',
    timezone: 'Asia/Shanghai',
    days: 2,
    capacity: 1,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '工作之外，我还剩下谁？',
    book: '职业身份、工作边界与生活',
    description:
      '带一段工作中难以归类为成败的经历，交流收入、责任、个人边界和自我评价如何相互牵动。可以讨论具体沟通方法，也给尚无答案的处境留出位置。',
    kind: 'conversation',
    topic: '职场交流',
    cover: 'career.png',
    bookAuthor: '',
    format: 'offline',
    city: 'Chipping Campden · Cotswold · Gloucestershire · England · United Kingdom',
    place: {
      name: 'Chipping Campden',
      label:
        'Chipping Campden · Cotswold · Gloucestershire · England · United Kingdom',
      latitude: 52.0496652,
      longitude: -1.7813927,
      id: 'R:6083984',
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Gloucestershire',
      locality: 'Cotswold',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'qq',
    language: 'en',
    timezone: 'Europe/London',
    days: 3,
    capacity: 2,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: 'Studying abroad: what do we hope to become?',
    book: '留学选择、学习与自我理解',
    description:
      'Bring a concrete experience of choosing where to study, joining a classroom or changing your mind. Exchange public resources and practical preparations while asking whose expectations shape the decision. Listening is welcome.',
    kind: 'conversation',
    topic: '留学交流',
    cover: 'study.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'telegram',
    language: 'bilingual',
    timezone: 'Asia/Kathmandu',
    days: 4,
    capacity: 6,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '把工具交给 AI，判断还属于谁？',
    book: '技术实践、判断与责任',
    description:
      '各带一个实际使用 AI 的小案例：它帮了什么、哪里让你不放心、哪些判断仍由你承担。分享可复现的过程与失败经验；材料隐去密钥、客户资料和他人隐私。',
    kind: 'conversation',
    topic: '技术分享',
    cover: 'technology.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'whatsapp',
    language: 'zh',
    timezone: 'Asia/Kolkata',
    days: 5,
    capacity: 12,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '共读《地下室手记》：我们如何向自己解释自己',
    book: '地下室手记',
    bookAuthor: '陀思妥耶夫斯基',
    cover: 'underground.jpg',
    description:
      '选读雅典学园中的《地下室手记》，从人物的一次辩解或犹疑开始，讨论自尊、自欺及与他人的关系。分享围绕文本展开，不给参与者贴标签，也不要求自我暴露。',
    kind: 'reading',
    topic: '共读',
    format: 'offline',
    city: 'Arrowtown · Queenstown-Lakes District · Otago · New Zealand / Aotearoa',
    place: {
      name: 'Arrowtown',
      label:
        'Arrowtown · Queenstown-Lakes District · Otago · New Zealand / Aotearoa',
      latitude: -44.9405627,
      longitude: 168.8350761,
      id: 'N:666995206',
      country: 'New Zealand / Aotearoa',
      countryCode: 'NZ',
      state: 'Otago',
      county: 'Queenstown-Lakes District',
      locality: 'Arrowtown',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'line',
    language: 'en',
    timezone: 'Asia/Singapore',
    days: 6,
    capacity: 20,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '离开与留下：迁居之后如何安放生活',
    book: '移民信息、归属与日常实践',
    description:
      '把官方信息核对与个人经历分开交流：语言、租住、工作、家人和归属感。带一个查证过的信息来源及一个还没解决的生活问题；不把任何人的迁居选择当作标准答案。',
    kind: 'conversation',
    topic: '移民交流',
    cover: 'migration.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'other',
    language: 'bilingual',
    timezone: 'America/New_York',
    days: 7,
    capacity: 50,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '选读《存在与虚无》：自由是否意味着随心所欲',
    book: '存在与虚无',
    bookAuthor: '让-保罗·萨特',
    cover: 'nothingness.jpg',
    description:
      '材料来自雅典学园中的萨特《存在与虚无》，聚焦“自欺”与他人关系的片段。先共同澄清词义，再联系一个日常选择；不要求读完全书，也不把术语当作结论。',
    kind: 'reading',
    topic: '共读',
    format: 'offline',
    city: 'Chipping Campden · Cotswold · Gloucestershire · England · United Kingdom',
    place: {
      name: 'Chipping Campden',
      label:
        'Chipping Campden · Cotswold · Gloucestershire · England · United Kingdom',
      latitude: 52.0496652,
      longitude: -1.7813927,
      id: 'R:6083984',
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Gloucestershire',
      locality: 'Cotswold',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'site',
    language: 'zh',
    timezone: 'Australia/Sydney',
    days: 8,
    capacity: 100,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: 'Open source: making something with other people',
    book: '开源协作、贡献与共同创造',
    description:
      'Show one small contribution or unresolved disagreement from a shared project. Discuss how decisions, credit and maintenance are shared, then exchange a practical way to make participation easier for someone new.',
    kind: 'conversation',
    topic: '技术分享',
    cover: 'technology.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'wechat',
    language: 'en',
    timezone: 'Pacific/Auckland',
    days: 9,
    capacity: 500,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '共读《互助论》：竞争之外，我们怎样共同生活',
    book: '互助论',
    bookAuthor: '彼得·克鲁泡特金',
    cover: 'mutual-aid.jpg',
    description:
      '从雅典学园的《互助论》选段出发，带一个亲历的合作、互助或协作失败的例子。讨论关系怎样建立、付出怎样持续、边界怎样说清；把感受与事实分开。',
    kind: 'reading',
    topic: '共读',
    format: 'offline',
    city: 'Ushuaia · Departamento Ushuaia · Argentina',
    place: {
      name: 'Ushuaia',
      label: 'Ushuaia · Departamento Ushuaia · Argentina',
      latitude: -54.807306,
      longitude: -68.3084133,
      id: 'R:11347693',
      country: 'Argentina',
      countryCode: 'AR',
      state: '',
      county: 'Departamento Ushuaia',
      locality: 'Ushuaia',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'qq',
    language: 'bilingual',
    timezone: 'America/Argentina/Ushuaia',
    days: 10,
    capacity: 1,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: 'Meeting a city, meeting its people',
    book: '独处、邻里与共同生活',
    description:
      'Bring an ordinary encounter from a street, a neighbourhood or a quiet day alone. Exchange ways of building a life with others without turning every relationship into a task or a network.',
    kind: 'conversation',
    topic: '生活交流',
    cover: 'life.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'telegram',
    language: 'zh',
    timezone: 'Pacific/Honolulu',
    days: 11,
    capacity: 2,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '共读《单向度的人》：我们为什么只剩一种尺度',
    book: '单向度的人',
    bookAuthor: '赫伯特·马尔库塞',
    cover: 'one-dimensional.jpg',
    description:
      '选自雅典学园中的《单向度的人》。围绕工作、消费或日常语言中的一个具体片段，讨论效率和绩效之外还有哪些理解人的方式；允许不同阅读意见并列。',
    kind: 'reading',
    topic: '共读',
    format: 'online',
    city: '',
    place: null,
    channel: 'whatsapp',
    language: 'en',
    timezone: 'Pacific/Kiritimati',
    days: 12,
    capacity: 6,
    booked: 6,
    case: 'full'
  },
  {
    title: '异乡的第一学期：学会发言，也学会倾听',
    book: '课堂参与、文化处境与学习经验',
    description:
      '围绕一次课堂发言、一次误解或一次求助，交流实际做法和背后的处境。分享准备清单与公开资料，也讨论如何保留自己的声音；这条安排展示预约截止状态。',
    kind: 'conversation',
    topic: '留学交流',
    cover: 'study.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'line',
    language: 'bilingual',
    timezone: 'Etc/UTC',
    days: 13,
    capacity: 12,
    booked: 0,
    case: 'closed'
  },
  {
    title: '重读尼采：哪些价值是我自己选择的',
    book: '查拉图斯特拉如是说',
    bookAuthor: '弗里德里希·尼采',
    cover: 'zarathustra.jpg',
    description:
      '材料为雅典学园的《查拉图斯特拉如是说》。从读不懂或不同意的片段开始，讨论我们继承的判断与自己的选择；保留问题，不把引文变成给他人的训诫。',
    kind: 'reading',
    topic: '共读',
    format: 'online',
    city: '',
    place: null,
    channel: 'other',
    language: 'zh',
    timezone: 'Asia/Shanghai',
    days: -2,
    capacity: 20,
    booked: 0,
    case: 'ended'
  },
  {
    title: '共读《看见》：从评判一个人，到看见他的处境',
    book: '看见',
    bookAuthor: '柴静',
    cover: 'seeing.jpg',
    description:
      '选自雅典学园的柴静《看见》。讨论一次报道中的观察怎样改变判断，再交换一个日常倾听的经验；尊重当事人，不披露可识别的私人故事。',
    kind: 'reading',
    topic: '共读',
    format: 'online',
    city: '',
    place: null,
    channel: 'site',
    language: 'en',
    timezone: 'Europe/London',
    days: -4,
    capacity: 50,
    booked: 0,
    case: 'ended'
  },
  {
    title: '不把自己只写成一份简历',
    book: '职业经历、个人选择与处境',
    description:
      '原计划交流一段简历上难以表达的经历：照护、停顿、失败、转向或坚持。讨论现实限制与仍能作出的选择。这条演示安排已取消，地图位置不接受到访。',
    kind: 'conversation',
    topic: '职场交流',
    cover: 'career.png',
    bookAuthor: '',
    format: 'offline',
    city: 'Arrowtown · Queenstown-Lakes District · Otago · New Zealand / Aotearoa',
    place: {
      name: 'Arrowtown',
      label:
        'Arrowtown · Queenstown-Lakes District · Otago · New Zealand / Aotearoa',
      latitude: -44.9405627,
      longitude: 168.8350761,
      id: 'N:666995206',
      country: 'New Zealand / Aotearoa',
      countryCode: 'NZ',
      state: 'Otago',
      county: 'Queenstown-Lakes District',
      locality: 'Arrowtown',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'wechat',
    language: 'bilingual',
    timezone: 'Asia/Kathmandu',
    days: 16,
    capacity: 100,
    booked: 0,
    case: 'cancelled'
  },
  {
    title: '跨日开放讨论：人与人的共同处境',
    book: '鼠疫',
    bookAuthor: '阿尔贝·加缪',
    cover: 'plague.jpg',
    description:
      '选自雅典学园的加缪作品合刊《鼠疫·局外人》，本场读《鼠疫》。从一个人物的具体行动出发，讨论责任、有限的能力与人与人的联系；带一个真实的日常观察，也可以只听。',
    kind: 'reading',
    topic: '共读',
    format: 'online',
    city: '',
    place: null,
    channel: 'qq',
    language: 'zh',
    timezone: 'Asia/Kolkata',
    days: 17,
    capacity: 500,
    booked: 0,
    case: 'ongoing'
  },
  {
    title: '还留一个位置：工作之外，我还剩下谁？ · 小范围共话',
    book: '职业身份、工作边界与生活',
    description:
      '带一段工作中难以归类为成败的经历，交流收入、责任、个人边界和自我评价如何相互牵动。可以讨论具体沟通方法，也给尚无答案的处境留出位置。',
    kind: 'conversation',
    topic: '职场交流',
    cover: 'career.png',
    bookAuthor: '',
    format: 'offline',
    city: 'Chipping Campden · Cotswold · Gloucestershire · England · United Kingdom',
    place: {
      name: 'Chipping Campden',
      label:
        'Chipping Campden · Cotswold · Gloucestershire · England · United Kingdom',
      latitude: 52.0496652,
      longitude: -1.7813927,
      id: 'R:6083984',
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Gloucestershire',
      locality: 'Cotswold',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'telegram',
    language: 'en',
    timezone: 'Asia/Singapore',
    days: 18,
    capacity: 500,
    booked: 499,
    case: 'scheduled'
  },
  {
    title:
      '一对一的小型共话：Studying abroad: what do we hope to become? · 小范围共话',
    book: '留学选择、学习与自我理解',
    description:
      'Bring a concrete experience of choosing where to study, joining a classroom or changing your mind. Exchange public resources and practical preparations while asking whose expectations shape the decision. Listening is welcome.',
    kind: 'conversation',
    topic: '留学交流',
    cover: 'study.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'whatsapp',
    language: 'bilingual',
    timezone: 'America/New_York',
    days: 19,
    capacity: 1,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '跨夜相遇：把工具交给 AI，判断还属于谁？ · 小范围共话',
    book: '技术实践、判断与责任',
    description:
      '各带一个实际使用 AI 的小案例：它帮了什么、哪里让你不放心、哪些判断仍由你承担。分享可复现的过程与失败经验；材料隐去密钥、客户资料和他人隐私。',
    kind: 'conversation',
    topic: '技术分享',
    cover: 'technology.png',
    bookAuthor: '',
    format: 'offline',
    city: 'Ushuaia · Departamento Ushuaia · Argentina',
    place: {
      name: 'Ushuaia',
      label: 'Ushuaia · Departamento Ushuaia · Argentina',
      latitude: -54.807306,
      longitude: -68.3084133,
      id: 'R:11347693',
      country: 'Argentina',
      countryCode: 'AR',
      state: '',
      county: 'Departamento Ushuaia',
      locality: 'Ushuaia',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'line',
    language: 'zh',
    timezone: 'Australia/Sydney',
    days: 20,
    capacity: 6,
    booked: 0,
    case: 'overnight'
  },
  {
    title: '跨年共话：共读《地下室手记》：我们如何向自己解释自己 · 小范围共话',
    book: '地下室手记',
    bookAuthor: '陀思妥耶夫斯基',
    cover: 'underground.jpg',
    description:
      '选读雅典学园中的《地下室手记》，从人物的一次辩解或犹疑开始，讨论自尊、自欺及与他人的关系。分享围绕文本展开，不给参与者贴标签，也不要求自我暴露。',
    kind: 'reading',
    topic: '共读',
    format: 'online',
    city: '',
    place: null,
    channel: 'other',
    language: 'en',
    timezone: 'Pacific/Kiritimati',
    days: 21,
    capacity: 12,
    booked: 0,
    case: 'newyear'
  },
  {
    title: '春天的一次相遇：离开与留下：迁居之后如何安放生活 · 小范围共话',
    book: '移民信息、归属与日常实践',
    description:
      '把官方信息核对与个人经历分开交流：语言、租住、工作、家人和归属感。带一个查证过的信息来源及一个还没解决的生活问题；不把任何人的迁居选择当作标准答案。',
    kind: 'conversation',
    topic: '移民交流',
    cover: 'migration.png',
    bookAuthor: '',
    format: 'offline',
    city: '周庄镇 · 苏州市 · 江苏省 · 中国',
    place: {
      name: '周庄镇',
      label: '周庄镇 · 苏州市 · 江苏省 · 中国',
      latitude: 31.1317907,
      longitude: 120.8355975,
      id: 'R:7783377',
      country: '中国',
      countryCode: 'CN',
      state: '江苏省',
      county: '',
      locality: '苏州市',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'site',
    language: 'bilingual',
    timezone: 'America/New_York',
    days: 22,
    capacity: 20,
    booked: 0,
    case: 'dst-spring'
  },
  {
    title: '秋日夜谈：选读《存在与虚无》：自由是否意味着随心所欲 · 小范围共话',
    book: '存在与虚无',
    bookAuthor: '让-保罗·萨特',
    cover: 'nothingness.jpg',
    description:
      '材料来自雅典学园中的萨特《存在与虚无》，聚焦“自欺”与他人关系的片段。先共同澄清词义，再联系一个日常选择；不要求读完全书，也不把术语当作结论。',
    kind: 'reading',
    topic: '共读',
    format: 'online',
    city: '',
    place: null,
    channel: 'wechat',
    language: 'zh',
    timezone: 'America/New_York',
    days: 23,
    capacity: 50,
    booked: 0,
    case: 'dst-fall'
  },
  {
    title:
      '多出的一天：Open source: making something with other people · 小范围共话',
    book: '开源协作、贡献与共同创造',
    description:
      'Show one small contribution or unresolved disagreement from a shared project. Discuss how decisions, credit and maintenance are shared, then exchange a practical way to make participation easier for someone new.',
    kind: 'conversation',
    topic: '技术分享',
    cover: 'technology.png',
    bookAuthor: '',
    format: 'offline',
    city: 'Ubud · Gianyar · Bali · Indonesia',
    place: {
      name: 'Ubud',
      label: 'Ubud · Gianyar · Bali · Indonesia',
      latitude: -8.5170195,
      longitude: 115.2550507,
      id: 'R:17824715',
      country: 'Indonesia',
      countryCode: 'ID',
      state: 'Bali',
      county: 'Gianyar',
      locality: 'Ubud',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'qq',
    language: 'en',
    timezone: 'Etc/UTC',
    days: 24,
    capacity: 100,
    booked: 0,
    case: 'leap-day'
  },
  {
    title:
      '开始前仍可加入：共读《互助论》：竞争之外，我们怎样共同生活 · 小范围共话',
    book: '互助论',
    bookAuthor: '彼得·克鲁泡特金',
    cover: 'mutual-aid.jpg',
    description:
      '从雅典学园的《互助论》选段出发，带一个亲历的合作、互助或协作失败的例子。讨论关系怎样建立、付出怎样持续、边界怎样说清；把感受与事实分开。',
    kind: 'reading',
    topic: '共读',
    format: 'online',
    city: '',
    place: null,
    channel: 'telegram',
    language: 'bilingual',
    timezone: 'Etc/UTC',
    days: 25,
    capacity: 500,
    booked: 0,
    case: 'deadline-at-start'
  },
  {
    title: 'Meeting a city, meeting its people · 小范围共话',
    book: '独处、邻里与共同生活',
    description:
      'Bring an ordinary encounter from a street, a neighbourhood or a quiet day alone. Exchange ways of building a life with others without turning every relationship into a task or a network.',
    kind: 'conversation',
    topic: '生活交流',
    cover: 'life.png',
    bookAuthor: '',
    format: 'offline',
    city: 'Arrowtown · Queenstown-Lakes District · Otago · New Zealand / Aotearoa',
    place: {
      name: 'Arrowtown',
      label:
        'Arrowtown · Queenstown-Lakes District · Otago · New Zealand / Aotearoa',
      latitude: -44.9405627,
      longitude: 168.8350761,
      id: 'N:666995206',
      country: 'New Zealand / Aotearoa',
      countryCode: 'NZ',
      state: 'Otago',
      county: 'Queenstown-Lakes District',
      locality: 'Arrowtown',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'whatsapp',
    language: 'zh',
    timezone: 'Asia/Shanghai',
    days: 26,
    capacity: 1,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '共读《单向度的人》：我们为什么只剩一种尺度 · 小范围共话',
    book: '单向度的人',
    bookAuthor: '赫伯特·马尔库塞',
    cover: 'one-dimensional.jpg',
    description:
      '选自雅典学园中的《单向度的人》。围绕工作、消费或日常语言中的一个具体片段，讨论效率和绩效之外还有哪些理解人的方式；允许不同阅读意见并列。',
    kind: 'reading',
    topic: '共读',
    format: 'online',
    city: '',
    place: null,
    channel: 'line',
    language: 'en',
    timezone: 'Europe/London',
    days: 27,
    capacity: 2,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '异乡的第一学期：学会发言，也学会倾听 · 小范围共话',
    book: '课堂参与、文化处境与学习经验',
    description:
      '围绕一次课堂发言、一次误解或一次求助，交流实际做法和背后的处境。分享准备清单与公开资料，也讨论如何保留自己的声音；这条安排展示预约截止状态。',
    kind: 'conversation',
    topic: '留学交流',
    cover: 'study.png',
    bookAuthor: '',
    format: 'offline',
    city: 'Chipping Campden · Cotswold · Gloucestershire · England · United Kingdom',
    place: {
      name: 'Chipping Campden',
      label:
        'Chipping Campden · Cotswold · Gloucestershire · England · United Kingdom',
      latitude: 52.0496652,
      longitude: -1.7813927,
      id: 'R:6083984',
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Gloucestershire',
      locality: 'Cotswold',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'other',
    language: 'bilingual',
    timezone: 'Asia/Kathmandu',
    days: 28,
    capacity: 6,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '重读尼采：哪些价值是我自己选择的 · 小范围共话',
    book: '查拉图斯特拉如是说',
    bookAuthor: '弗里德里希·尼采',
    cover: 'zarathustra.jpg',
    description:
      '材料为雅典学园的《查拉图斯特拉如是说》。从读不懂或不同意的片段开始，讨论我们继承的判断与自己的选择；保留问题，不把引文变成给他人的训诫。',
    kind: 'reading',
    topic: '共读',
    format: 'online',
    city: '',
    place: null,
    channel: 'site',
    language: 'zh',
    timezone: 'Asia/Kolkata',
    days: 29,
    capacity: 12,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '共读《看见》：从评判一个人，到看见他的处境 · 小范围共话',
    book: '看见',
    bookAuthor: '柴静',
    cover: 'seeing.jpg',
    description:
      '选自雅典学园的柴静《看见》。讨论一次报道中的观察怎样改变判断，再交换一个日常倾听的经验；尊重当事人，不披露可识别的私人故事。',
    kind: 'reading',
    topic: '共读',
    format: 'offline',
    city: 'Ushuaia · Departamento Ushuaia · Argentina',
    place: {
      name: 'Ushuaia',
      label: 'Ushuaia · Departamento Ushuaia · Argentina',
      latitude: -54.807306,
      longitude: -68.3084133,
      id: 'R:11347693',
      country: 'Argentina',
      countryCode: 'AR',
      state: '',
      county: 'Departamento Ushuaia',
      locality: 'Ushuaia',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'wechat',
    language: 'en',
    timezone: 'Asia/Singapore',
    days: 30,
    capacity: 20,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '不把自己只写成一份简历 · 小范围共话',
    book: '职业经历、个人选择与处境',
    description:
      '原计划交流一段简历上难以表达的经历：照护、停顿、失败、转向或坚持。讨论现实限制与仍能作出的选择。这条演示安排已取消，地图位置不接受到访。',
    kind: 'conversation',
    topic: '职场交流',
    cover: 'career.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'qq',
    language: 'bilingual',
    timezone: 'America/New_York',
    days: 31,
    capacity: 50,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '共读《鼠疫》：普通人怎样回应共同的处境 · 另一次相遇',
    book: '鼠疫',
    bookAuthor: '阿尔贝·加缪',
    cover: 'plague.jpg',
    description:
      '选自雅典学园的加缪作品合刊《鼠疫·局外人》，本场读《鼠疫》。从一个人物的具体行动出发，讨论责任、有限的能力与人与人的联系；带一个真实的日常观察，也可以只听。',
    kind: 'reading',
    topic: '共读',
    format: 'offline',
    city: '周庄镇 · 苏州市 · 江苏省 · 中国',
    place: {
      name: '周庄镇',
      label: '周庄镇 · 苏州市 · 江苏省 · 中国',
      latitude: 31.1317907,
      longitude: 120.8355975,
      id: 'R:7783377',
      country: '中国',
      countryCode: 'CN',
      state: '江苏省',
      county: '',
      locality: '苏州市',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'telegram',
    language: 'zh',
    timezone: 'Australia/Sydney',
    days: 32,
    capacity: 100,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '工作之外，我还剩下谁？ · 另一次相遇',
    book: '职业身份、工作边界与生活',
    description:
      '带一段工作中难以归类为成败的经历，交流收入、责任、个人边界和自我评价如何相互牵动。可以讨论具体沟通方法，也给尚无答案的处境留出位置。',
    kind: 'conversation',
    topic: '职场交流',
    cover: 'career.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'whatsapp',
    language: 'en',
    timezone: 'Pacific/Auckland',
    days: 33,
    capacity: 500,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: 'Studying abroad: what do we hope to become? · 另一次相遇',
    book: '留学选择、学习与自我理解',
    description:
      'Bring a concrete experience of choosing where to study, joining a classroom or changing your mind. Exchange public resources and practical preparations while asking whose expectations shape the decision. Listening is welcome.',
    kind: 'conversation',
    topic: '留学交流',
    cover: 'study.png',
    bookAuthor: '',
    format: 'offline',
    city: 'Ubud · Gianyar · Bali · Indonesia',
    place: {
      name: 'Ubud',
      label: 'Ubud · Gianyar · Bali · Indonesia',
      latitude: -8.5170195,
      longitude: 115.2550507,
      id: 'R:17824715',
      country: 'Indonesia',
      countryCode: 'ID',
      state: 'Bali',
      county: 'Gianyar',
      locality: 'Ubud',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'line',
    language: 'bilingual',
    timezone: 'America/Argentina/Ushuaia',
    days: 34,
    capacity: 1,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '把工具交给 AI，判断还属于谁？ · 另一次相遇',
    book: '技术实践、判断与责任',
    description:
      '各带一个实际使用 AI 的小案例：它帮了什么、哪里让你不放心、哪些判断仍由你承担。分享可复现的过程与失败经验；材料隐去密钥、客户资料和他人隐私。',
    kind: 'conversation',
    topic: '技术分享',
    cover: 'technology.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'other',
    language: 'zh',
    timezone: 'Pacific/Honolulu',
    days: 35,
    capacity: 2,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '共读《地下室手记》：我们如何向自己解释自己 · 另一次相遇',
    book: '地下室手记',
    bookAuthor: '陀思妥耶夫斯基',
    cover: 'underground.jpg',
    description:
      '选读雅典学园中的《地下室手记》，从人物的一次辩解或犹疑开始，讨论自尊、自欺及与他人的关系。分享围绕文本展开，不给参与者贴标签，也不要求自我暴露。',
    kind: 'reading',
    topic: '共读',
    format: 'offline',
    city: 'Arrowtown · Queenstown-Lakes District · Otago · New Zealand / Aotearoa',
    place: {
      name: 'Arrowtown',
      label:
        'Arrowtown · Queenstown-Lakes District · Otago · New Zealand / Aotearoa',
      latitude: -44.9405627,
      longitude: 168.8350761,
      id: 'N:666995206',
      country: 'New Zealand / Aotearoa',
      countryCode: 'NZ',
      state: 'Otago',
      county: 'Queenstown-Lakes District',
      locality: 'Arrowtown',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'site',
    language: 'en',
    timezone: 'Pacific/Kiritimati',
    days: 36,
    capacity: 6,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '离开与留下：迁居之后如何安放生活 · 另一次相遇',
    book: '移民信息、归属与日常实践',
    description:
      '把官方信息核对与个人经历分开交流：语言、租住、工作、家人和归属感。带一个查证过的信息来源及一个还没解决的生活问题；不把任何人的迁居选择当作标准答案。',
    kind: 'conversation',
    topic: '移民交流',
    cover: 'migration.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'wechat',
    language: 'bilingual',
    timezone: 'Etc/UTC',
    days: 37,
    capacity: 12,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '选读《存在与虚无》：自由是否意味着随心所欲 · 另一次相遇',
    book: '存在与虚无',
    bookAuthor: '让-保罗·萨特',
    cover: 'nothingness.jpg',
    description:
      '材料来自雅典学园中的萨特《存在与虚无》，聚焦“自欺”与他人关系的片段。先共同澄清词义，再联系一个日常选择；不要求读完全书，也不把术语当作结论。',
    kind: 'reading',
    topic: '共读',
    format: 'offline',
    city: 'Chipping Campden · Cotswold · Gloucestershire · England · United Kingdom',
    place: {
      name: 'Chipping Campden',
      label:
        'Chipping Campden · Cotswold · Gloucestershire · England · United Kingdom',
      latitude: 52.0496652,
      longitude: -1.7813927,
      id: 'R:6083984',
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Gloucestershire',
      locality: 'Cotswold',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'qq',
    language: 'zh',
    timezone: 'Asia/Shanghai',
    days: 38,
    capacity: 20,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: 'Open source: making something with other people · 另一次相遇',
    book: '开源协作、贡献与共同创造',
    description:
      'Show one small contribution or unresolved disagreement from a shared project. Discuss how decisions, credit and maintenance are shared, then exchange a practical way to make participation easier for someone new.',
    kind: 'conversation',
    topic: '技术分享',
    cover: 'technology.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'telegram',
    language: 'en',
    timezone: 'Europe/London',
    days: 39,
    capacity: 50,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '共读《互助论》：竞争之外，我们怎样共同生活 · 另一次相遇',
    book: '互助论',
    bookAuthor: '彼得·克鲁泡特金',
    cover: 'mutual-aid.jpg',
    description:
      '从雅典学园的《互助论》选段出发，带一个亲历的合作、互助或协作失败的例子。讨论关系怎样建立、付出怎样持续、边界怎样说清；把感受与事实分开。',
    kind: 'reading',
    topic: '共读',
    format: 'offline',
    city: 'Ushuaia · Departamento Ushuaia · Argentina',
    place: {
      name: 'Ushuaia',
      label: 'Ushuaia · Departamento Ushuaia · Argentina',
      latitude: -54.807306,
      longitude: -68.3084133,
      id: 'R:11347693',
      country: 'Argentina',
      countryCode: 'AR',
      state: '',
      county: 'Departamento Ushuaia',
      locality: 'Ushuaia',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'whatsapp',
    language: 'bilingual',
    timezone: 'Asia/Kathmandu',
    days: 40,
    capacity: 100,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: 'Meeting a city, meeting its people · 另一次相遇',
    book: '独处、邻里与共同生活',
    description:
      'Bring an ordinary encounter from a street, a neighbourhood or a quiet day alone. Exchange ways of building a life with others without turning every relationship into a task or a network.',
    kind: 'conversation',
    topic: '生活交流',
    cover: 'life.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'line',
    language: 'zh',
    timezone: 'Asia/Kolkata',
    days: 41,
    capacity: 500,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '共读《单向度的人》：我们为什么只剩一种尺度 · 另一次相遇',
    book: '单向度的人',
    bookAuthor: '赫伯特·马尔库塞',
    cover: 'one-dimensional.jpg',
    description:
      '选自雅典学园中的《单向度的人》。围绕工作、消费或日常语言中的一个具体片段，讨论效率和绩效之外还有哪些理解人的方式；允许不同阅读意见并列。',
    kind: 'reading',
    topic: '共读',
    format: 'offline',
    city: '周庄镇 · 苏州市 · 江苏省 · 中国',
    place: {
      name: '周庄镇',
      label: '周庄镇 · 苏州市 · 江苏省 · 中国',
      latitude: 31.1317907,
      longitude: 120.8355975,
      id: 'R:7783377',
      country: '中国',
      countryCode: 'CN',
      state: '江苏省',
      county: '',
      locality: '苏州市',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'other',
    language: 'en',
    timezone: 'Asia/Singapore',
    days: 42,
    capacity: 1,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '异乡的第一学期：学会发言，也学会倾听 · 另一次相遇',
    book: '课堂参与、文化处境与学习经验',
    description:
      '围绕一次课堂发言、一次误解或一次求助，交流实际做法和背后的处境。分享准备清单与公开资料，也讨论如何保留自己的声音；这条安排展示预约截止状态。',
    kind: 'conversation',
    topic: '留学交流',
    cover: 'study.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'site',
    language: 'bilingual',
    timezone: 'America/New_York',
    days: 43,
    capacity: 2,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '重读尼采：哪些价值是我自己选择的 · 另一次相遇',
    book: '查拉图斯特拉如是说',
    bookAuthor: '弗里德里希·尼采',
    cover: 'zarathustra.jpg',
    description:
      '材料为雅典学园的《查拉图斯特拉如是说》。从读不懂或不同意的片段开始，讨论我们继承的判断与自己的选择；保留问题，不把引文变成给他人的训诫。',
    kind: 'reading',
    topic: '共读',
    format: 'offline',
    city: 'Ubud · Gianyar · Bali · Indonesia',
    place: {
      name: 'Ubud',
      label: 'Ubud · Gianyar · Bali · Indonesia',
      latitude: -8.5170195,
      longitude: 115.2550507,
      id: 'R:17824715',
      country: 'Indonesia',
      countryCode: 'ID',
      state: 'Bali',
      county: 'Gianyar',
      locality: 'Ubud',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'wechat',
    language: 'zh',
    timezone: 'Australia/Sydney',
    days: 44,
    capacity: 6,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '共读《看见》：从评判一个人，到看见他的处境 · 另一次相遇',
    book: '看见',
    bookAuthor: '柴静',
    cover: 'seeing.jpg',
    description:
      '选自雅典学园的柴静《看见》。讨论一次报道中的观察怎样改变判断，再交换一个日常倾听的经验；尊重当事人，不披露可识别的私人故事。',
    kind: 'reading',
    topic: '共读',
    format: 'online',
    city: '',
    place: null,
    channel: 'qq',
    language: 'en',
    timezone: 'Pacific/Auckland',
    days: 45,
    capacity: 12,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '不把自己只写成一份简历 · 另一次相遇',
    book: '职业经历、个人选择与处境',
    description:
      '原计划交流一段简历上难以表达的经历：照护、停顿、失败、转向或坚持。讨论现实限制与仍能作出的选择。这条演示安排已取消，地图位置不接受到访。',
    kind: 'conversation',
    topic: '职场交流',
    cover: 'career.png',
    bookAuthor: '',
    format: 'offline',
    city: 'Arrowtown · Queenstown-Lakes District · Otago · New Zealand / Aotearoa',
    place: {
      name: 'Arrowtown',
      label:
        'Arrowtown · Queenstown-Lakes District · Otago · New Zealand / Aotearoa',
      latitude: -44.9405627,
      longitude: 168.8350761,
      id: 'N:666995206',
      country: 'New Zealand / Aotearoa',
      countryCode: 'NZ',
      state: 'Otago',
      county: 'Queenstown-Lakes District',
      locality: 'Arrowtown',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'telegram',
    language: 'bilingual',
    timezone: 'America/Argentina/Ushuaia',
    days: 46,
    capacity: 20,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '共读《鼠疫》：普通人怎样回应共同的处境 · 开放讨论',
    book: '鼠疫',
    bookAuthor: '阿尔贝·加缪',
    cover: 'plague.jpg',
    description:
      '选自雅典学园的加缪作品合刊《鼠疫·局外人》，本场读《鼠疫》。从一个人物的具体行动出发，讨论责任、有限的能力与人与人的联系；带一个真实的日常观察，也可以只听。',
    kind: 'reading',
    topic: '共读',
    format: 'online',
    city: '',
    place: null,
    channel: 'whatsapp',
    language: 'zh',
    timezone: 'Pacific/Honolulu',
    days: 47,
    capacity: 50,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: '工作之外，我还剩下谁？ · 开放讨论',
    book: '职业身份、工作边界与生活',
    description:
      '带一段工作中难以归类为成败的经历，交流收入、责任、个人边界和自我评价如何相互牵动。可以讨论具体沟通方法，也给尚无答案的处境留出位置。',
    kind: 'conversation',
    topic: '职场交流',
    cover: 'career.png',
    bookAuthor: '',
    format: 'offline',
    city: 'Chipping Campden · Cotswold · Gloucestershire · England · United Kingdom',
    place: {
      name: 'Chipping Campden',
      label:
        'Chipping Campden · Cotswold · Gloucestershire · England · United Kingdom',
      latitude: 52.0496652,
      longitude: -1.7813927,
      id: 'R:6083984',
      country: 'United Kingdom',
      countryCode: 'GB',
      state: 'England',
      county: 'Gloucestershire',
      locality: 'Cotswold',
      kind: 'town',
      coordinateSystem: 'wgs84'
    },
    channel: 'line',
    language: 'en',
    timezone: 'Pacific/Kiritimati',
    days: 48,
    capacity: 100,
    booked: 0,
    case: 'scheduled'
  },
  {
    title: 'Studying abroad: what do we hope to become? · 开放讨论',
    book: '留学选择、学习与自我理解',
    description:
      'Bring a concrete experience of choosing where to study, joining a classroom or changing your mind. Exchange public resources and practical preparations while asking whose expectations shape the decision. Listening is welcome.',
    kind: 'conversation',
    topic: '留学交流',
    cover: 'study.png',
    bookAuthor: '',
    format: 'online',
    city: '',
    place: null,
    channel: 'other',
    language: 'bilingual',
    timezone: 'Etc/UTC',
    days: 49,
    capacity: 500,
    booked: 0,
    case: 'scheduled'
  }
]
function demoEvents(now = Date.now()) {
  return examples.map((row, index) => {
    let start = anchor + row.days * day,
      end = start + 90 * 60000,
      deadline = start - 3600000
    if (row.case === 'closed') deadline = anchor - day
    if (row.case === 'ongoing') {
      start = anchor - day
      end = anchor + day
      deadline = start - 3600000
    }
    if (row.case === 'overnight') {
      start = Date.parse('2026-12-12T23:30:00+08:00')
      end = Date.parse('2026-12-13T01:00:00+08:00')
      deadline = start - 3600000
    }
    if (row.case === 'newyear') {
      start = Date.parse('2026-12-31T23:30:00+14:00')
      end = Date.parse('2027-01-01T00:30:00+14:00')
      deadline = start - 3600000
    }
    if (row.case === 'dst-spring') {
      start = Date.parse('2027-03-14T01:30:00-05:00')
      end = Date.parse('2027-03-14T03:30:00-04:00')
      deadline = start - 3600000
    }
    if (row.case === 'dst-fall') {
      start = Date.parse('2027-11-07T01:15:00-04:00')
      end = Date.parse('2027-11-07T01:45:00-05:00')
      deadline = start - 3600000
    }
    if (row.case === 'leap-day') {
      start = Date.parse('2028-02-29T12:00:00Z')
      end = start + 3600000
      deadline = start - 3600000
    }
    if (row.case === 'deadline-at-start') deadline = start
    const state = row.case === 'cancelled' ? 'cancelled' : 'published'
    const status =
      state === 'cancelled'
        ? 'cancelled'
        : end <= now
          ? 'ended'
          : start <= now
            ? 'ongoing'
            : deadline <= now
              ? 'closed'
              : row.booked >= row.capacity
                ? 'full'
                : 'open'
    const at = new Date(anchor).toISOString()
    return {
      ...row,
      id: 'de000000-2026-4000-8000-' + String(index + 1).padStart(12, '0'),
      demo: true,
      location:
        row.format === 'online'
          ? 'Online · ' + row.channel
          : '演示地点：' + row.place.name + '（乡镇中心，不接受到访）',
      startsAt: new Date(start).toISOString(),
      endsAt: new Date(end).toISOString(),
      deadline: new Date(deadline).toISOString(),
      remaining: row.capacity - row.booked,
      hostName: '吾在 · Demo',
      discussion:
        row.channel === 'site'
          ? 'site'
          : row.channel === 'wechat'
            ? 'wechat'
            : 'external',
      state,
      status,
      statusLabel: STATUS_LABELS[status],
      isHost: false,
      reservation: null,
      canReserve: false,
      canChat: false,
      canPost: false,
      joinInstructions: '',
      announcements:
        state === 'cancelled'
          ? [{ id: 1, body: '演示活动已取消 / Demo cancelled.', at }]
          : [],
      createdAt: at,
      updatedAt: at
    }
  })
}
const getDemoEvent = (id, now) => demoEvents(now).find((item) => item.id === id)
module.exports = { demoEvents, getDemoEvent }
