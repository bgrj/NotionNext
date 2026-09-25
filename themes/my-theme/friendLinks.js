export const FRIEND_LINKS_MOTTO =
  '有一种孤独,叫做时间、空间、信息、人的语言与技术'

export const FOOTER_FRIEND_LINKS = [
  { name: 'DAC导航', url: 'https://dacdh.top/' },
  {
    name: '维生素E',
    url: 'https://open.spotify.com/show/4PxvxUAD17xz3CwMhAvvPE'
  },
  {
    name: '翻转电台',
    url: 'https://open.spotify.com/show/6O2YwvuGpP2y17SpC8MM5s'
  }
]

const C = {
  clay: '#8c6b4a',
  moss: '#5d6b57',
  plum: '#6a5a78',
  rust: '#7a4e4e',
  slate: '#4f6478',
  olive: '#7a6a3e',
  ink: '#5a534c',
  tea: '#6e5a3c'
}

const L = (name, url, desc, domain, color) => ({
  name,
  url,
  desc,
  domain,
  color
})

export const FRIEND_LINK_SECTIONS = [
  {
    id: 'dao',
    title: '道',
    lead: '追问处境与结构。不是把理解世界打包成商品，也不追求更全，而在于更真。',
    groups: [
      {
        id: 'dao-thought',
        title: '思想与公共',
        lead: '一个人如何被命名、被组织，又如何在公共空间里继续想。',
        items: [
          L('维基百科', 'https://zh.wikipedia.org/', '人人可编辑的自由百科', 'zh.wikipedia.org', C.ink),
          L('Wikipedia', 'https://en.wikipedia.org/wiki/Main_Page', '自由的百科全书', 'en.wikipedia.org', C.ink),
          L('斯坦福哲学百科', 'https://plato.stanford.edu/', '当代哲学的开放辞书', 'plato.stanford.edu', C.plum),
          L('爱思想', 'https://www.aisixiang.com/', '思想与学术的公共仓库', 'aisixiang.com', C.tea),
          L('TED', 'https://www.ted.com/', 'Ideas worth spreading', 'ted.com', C.rust)
        ]
      },
      {
        id: 'dao-letters',
        title: '文史与知识',
        lead: '把书、字、档案从墙上拿下来，放回可以翻开的地方。',
        items: [
          L('中国哲学书电子化计划', 'https://ctext.org/zh', '先秦以降的典籍与字词', 'ctext.org', C.tea),
          L('汉典', 'https://www.zdic.net/', '汉字字义与古汉语', 'zdic.net', C.clay),
          L('古文岛', 'https://www.gushiwen.cn/', '原古诗文网，诗词与古文', 'gushiwen.cn', C.olive),
          L('维基文库', 'https://zh.wikisource.org/', '自由的在线图书馆', 'zh.wikisource.org', C.moss),
          L('Internet Archive', 'https://archive.org/', '书籍、影像与网页的公共记忆', 'archive.org', C.slate),
          L('Project Gutenberg', 'https://www.gutenberg.org/', '过了版权保护期的自由书籍', 'gutenberg.org', C.ink),
          L('中国国家图书馆', 'https://www.nlc.cn/', '国家总书库的入口', 'nlc.cn', C.plum)
        ]
      },
      {
        id: 'dao-language',
        title: '语言',
        lead: '标准不是天命。一个词如何把处境写成身份，需要被拆开看。',
        items: [
          L('维基词典', 'https://zh.wiktionary.org/', '多语言的开放词典', 'zh.wiktionary.org', C.olive),
          L('Etymonline', 'https://www.etymonline.com/', '英语词源，一个词从哪来', 'etymonline.com', C.tea),
          L('田间小站', 'https://www.tjxz.cc/', '高级英语学习', 'tjxz.cc', C.moss)
        ]
      }
    ]
  },
  {
    id: 'being',
    title: '存在',
    lead: '一个具体的人如何过日子：声音、影像，以及还在现场的人。',
    groups: [
      {
        id: 'podcasts',
        title: '声音',
        tocTitle: '声音',
        lead: '声音都在 Spotify，可以慢慢听。',
        items: [
          L('维生素E', 'https://open.spotify.com/show/4PxvxUAD17xz3CwMhAvvPE', '经济学与哲学的基础知识', 'open.spotify.com', C.olive),
          L('翻转电台', 'https://open.spotify.com/show/6O2YwvuGpP2y17SpC8MM5s', '哲学资源接到当下的问题', 'open.spotify.com', C.plum),
          L('吾在播客', 'https://open.spotify.com/show/0ndf49vruU6UwoykFXUCHl', '每一种存在都值得被看见', 'open.spotify.com', C.clay),
          L('西方思想史 · 刘擎', 'https://open.spotify.com/show/65eQne9QyPxFwKEan7HwvT', '五十讲音频，思想史的入门路径', 'open.spotify.com', C.tea),
          L('不明白播客', 'https://open.spotify.com/show/5CV2Xo4kHE6Lf1iZBzsrP2', '把私下的深谈公开来听', 'open.spotify.com', C.slate)
        ]
      },
      {
        id: 'youtube',
        title: 'YouTube',
        lead: '长期在看的人。',
        items: [
          L('柴静', 'https://www.youtube.com/@chaijing2023', '记录与看见', 'youtube.com', C.ink),
          L('FearNation 世界苦茶', 'https://www.youtube.com/@flipradio_fearnation', '贴近恐惧的肌理', 'youtube.com', C.plum),
          L('零下56', 'https://www.youtube.com/@56BelowTV', '华人移民，百味人生', 'youtube.com', C.slate),
          L('老梁', 'https://www.youtube.com/@LiangTalks', '时评与世情', 'youtube.com', C.clay),
          L('十三邀', 'https://www.youtube.com/@THIRTEENTALKS', '许知远与十三位对话者', 'youtube.com', C.tea),
          L('Existential Zone', 'https://www.youtube.com/@ExistentialZone', '把日子过得更有勇气', 'youtube.com', C.moss),
          L('英语兔', 'https://www.youtube.com/@yingyutu', '把英语讲清楚', 'youtube.com', C.olive),
          L('李子柒', 'https://www.youtube.com/@cnliziqi', '田园生活的记录', 'youtube.com', C.moss),
          L('蕾儿乔什看世界', 'https://www.youtube.com/@leiandjosh1646', '八年，一百个国家', 'youtube.com', C.rust)
        ]
      },
      {
        id: 'bilibili',
        title: 'B站',
        lead: '同一平台里，再按主题分开。',
        groups: [
          {
            id: 'bili-creators',
            title: '创作者',
            items: [
              L('蕾儿乔什看世界 · B站', 'https://space.bilibili.com/324086342', '旅行纪录的 B 站空间', 'bilibili.com', C.rust),
              L('Yooupi食途', 'https://space.bilibili.com/452412746', '山海之间的食途', 'bilibili.com', C.clay)
            ]
          },
          {
            id: 'life',
            title: '生活百态，万般滋味儿',
            lead: '寻找在路上。',
            items: [
              L('人生一串', 'https://b23.tv/ep234533', '烟火气里的烧烤江湖', 'b23.tv', C.clay),
              L('人生第一次', 'https://b23.tv/ep320332', '那些不得不经历的第一次', 'b23.tv', C.olive),
              L('人生第二次', 'https://b23.tv/ep511533', '重来一次会怎样', 'b23.tv', C.moss),
              L('人生七年', 'https://b23.tv/ep378729', '七年一次，看见时间', 'b23.tv', C.tea),
              L('如是生活', 'https://b23.tv/ep406511', '如是，便是生活', 'b23.tv', C.ink),
              L('去你家吃饭好吗', 'https://b23.tv/ep384836', '到别人家里，看见日子', 'b23.tv', C.rust),
              L('你好生活', 'https://b23.tv/ep303388', '向生活打一声招呼', 'b23.tv', C.plum),
              L('我住在这里的理由', 'https://b23.tv/ep292589', '第一季：为何停在此地', 'b23.tv', C.clay),
              L('北漂清洁工王柳云', 'https://b23.tv/CJ1gcOz', '扫厕所养活自己，画画养活灵魂', 'b23.tv', C.tea),
              L('离家的女孩与卖诗的少女', 'https://b23.tv/pkQ482X', '他们说我是小姐，他们说我在要饭', 'b23.tv', C.plum),
              L('希腊海岸', 'https://b23.tv/AXv9dOg', '海边餐厅和慵懒的比雷埃夫斯', 'b23.tv', C.slate),
              L('中华土地上的茶', 'https://b23.tv/9qas6pY', '深深扎根，历久弥新', 'b23.tv', C.moss),
              L('狸解小王子', 'https://b23.tv/XZl4TVx', '把小王子再读一遍', 'b23.tv', C.olive)
            ]
          },
          {
            id: 'existence',
            title: '观众生之相，寻生活之义',
            items: [
              L('香巴拉深处', 'https://b23.tv/ep192435', '往深处走', 'b23.tv', C.tea),
              L('众神之地', 'https://b23.tv/ep516011', '神在人间留下的痕迹', 'b23.tv', C.plum)
            ]
          },
          {
            id: 'nature',
            title: '人与自然',
            items: [
              L('虫师', 'https://b23.tv/KLKVKXe', '虫师与 OST', 'b23.tv', C.moss)
            ]
          },
          {
            id: 'law',
            title: '敬畏与秩序',
            lead: '理性思考，控制情绪，不触公序良俗的底线。',
            items: [
              L('守护解放西', 'https://b23.tv/ep780461', '街头执法里的日常秩序', 'b23.tv', C.slate)
            ]
          },
          {
            id: 'love',
            title: '爱与教育',
            items: [
              L('李玫瑾谈送礼乱象', 'https://b23.tv/rgn2V5v', '拍老师马屁与送礼的根子', 'b23.tv', C.rust),
              L('同妻的困局', 'https://b23.tv/8hJaECP', '如何破解骗婚', 'b23.tv', C.plum),
              L('年轻人的爱情观', 'https://b23.tv/AaJLjFF', '2023，爱正在怎样改变', 'b23.tv', C.clay),
              L('性别印象是天然的吗', 'https://b23.tv/Npq9imi', '我们以为天生的那些印象', 'b23.tv', C.olive)
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'shu',
    title: '术',
    lead: '看清之后，继续生活、学习、写作、保存自己。假物为用，而不是更高效地适应系统。',
    groups: [
      {
        id: 'shu-search',
        title: '检索与文献',
        items: [
          L('Google Scholar', 'https://scholar.google.com/', '论文与引文的入口', 'scholar.google.com', C.slate),
          L('Semantic Scholar', 'https://www.semanticscholar.org/', '把文献关系读出来', 'semanticscholar.org', C.olive),
          L('arXiv', 'https://arxiv.org/', '预印本论文库', 'arxiv.org', C.ink),
          L('Zotero', 'https://www.zotero.org/', '收集、引用、保存文献', 'zotero.org', C.clay),
          L('Z-Library', 'https://zh.zlib.li/', '电子书与文献入口', 'zh.zlib.li', C.slate)
        ]
      },
      {
        id: 'shu-write',
        title: '书写与建站',
        items: [
          L('Notion', 'https://www.' + 'notion.so/', '写作与结构仍放在这里', 'notion.so', C.ink),
          L('NotionNext', 'https://notionnext.tangly1024.com/', '用 Notion 做网站的开源方案', 'notionnext.tangly1024.com', C.olive),
          L('GitHub', 'https://github.com/', '源码、协作与长期可控', 'github.com', C.ink),
          L('Vercel', 'https://vercel.com/', '把站点发布出去', 'vercel.com', C.slate),
          L('Obsidian', 'https://obsidian.md/', '本地的双向链接笔记', 'obsidian.md', C.plum),
          L('Regery', 'https://regery.com/en/signup?returnUrl=%2Fcontrol', '域名与证书注册', 'regery.com', C.moss)
        ]
      },
      {
        id: 'shu-net',
        title: '网络入口',
        lead: '只留自己还在用的门口，不把科学上网做成导航农场。',
        items: [
          L('Soxo', 'https://w1.soxo.top/auth/register?code=nLf5', '网络访问服务', 'w1.soxo.top', C.plum),
          L('iosapp', 'https://free.iosapp.icu/', '共享 Apple ID / 小火箭', 'free.iosapp.icu', C.rust)
        ]
      },
      {
        id: 'shu-tools',
        title: '假物为用',
        lead: '君子生非异也，善假于物也。课程与翻译够用即可，不堆技巧。',
        items: [
          L('DeepL', 'https://www.deepl.com/translator', '翻译，尽量保住句子的意思', 'deepl.com', C.olive),
          L('Wayback Machine', 'https://web.archive.org/', '网页被撤下之后，仍可回头看', 'web.archive.org', C.slate),
          L('中国大学MOOC', 'https://www.icourse163.org/', '国家精品课程在线学习', 'icourse163.org', C.moss),
          L('Coursera', 'https://www.coursera.org/', '世界大学的公开课程', 'coursera.org', C.clay),
          L('学堂在线', 'https://www.xuetangx.com/', '国内高校的在线课程', 'xuetangx.com', C.tea),
          L('网易公开课', 'https://open.163.com/', '名校公开课的中文入口', 'open.163.com', C.plum),
          L('Open Yale Courses', 'https://oyc.yale.edu/', '耶鲁大学开放课程', 'oyc.yale.edu', C.ink)
        ]
      }
    ]
  },
  {
    id: 'neighbors',
    title: '友邻',
    lead: '门口的门口。只放还打得开的邻站，不是第二座导航农场。',
    items: [
      L('DAC导航', 'https://dacdh.top/', '给校园生活收口的导航', 'dacdh.top', C.clay)
    ]
  }
]

export const getFriendLinkToc = (sections = FRIEND_LINK_SECTIONS) => {
  const toc = []
  sections.forEach(section => {
    toc.push({
      id: section.id,
      title: section.tocTitle || section.title,
      level: 1
    })
    ;(section.groups || []).forEach(group => {
      toc.push({
        id: group.id,
        title: group.tocTitle || group.title,
        level: 2
      })
    })
  })
  return toc
}
