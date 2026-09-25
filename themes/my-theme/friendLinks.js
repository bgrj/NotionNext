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
    groups: [
      {
        id: 'dao-thought',
        title: '思想与公共',
        items: [
          L('维基百科', 'https://zh.wikipedia.org/', '人人可编辑的自由百科', 'zh.wikipedia.org', C.ink),
          L('Wikipedia', 'https://en.wikipedia.org/wiki/Main_Page', '自由的百科全书', 'en.wikipedia.org', C.ink),
          L('斯坦福哲学百科', 'https://plato.stanford.edu/', '当代哲学的开放辞书', 'plato.stanford.edu', C.plum),
          L('爱思想', 'https://www.aisixiang.com/', '思想与学术的公共仓库', 'aisixiang.com', C.tea),
          L('TED', 'https://www.ted.com/', 'Ideas worth spreading', 'ted.com', C.rust),
          L('中国大百科全书', 'https://www.zgbk.com/', '国家级百科全书', 'zgbk.com', C.olive)
        ]
      },
      {
        id: 'dao-letters',
        title: '文史与知识',
        items: [
          L('中国哲学书电子化计划', 'https://ctext.org/zh', '先秦以降的典籍与字词', 'ctext.org', C.tea),
          L('汉典', 'https://www.zdic.net/', '汉字字义与古汉语', 'zdic.net', C.clay),
          L('古文岛', 'https://www.gushiwen.cn/', '诗词与古文', 'gushiwen.cn', C.olive),
          L('维基文库', 'https://zh.wikisource.org/', '自由的在线图书馆', 'zh.wikisource.org', C.moss),
          L('国学大师', 'https://www.guoxuedashi.com/', '经典、小学与古籍', 'guoxuedashi.com', C.tea),
          L('Internet Archive', 'https://archive.org/', '书籍、影像与网页的公共记忆', 'archive.org', C.slate),
          L('Project Gutenberg', 'https://www.gutenberg.org/', '过了版权保护期的自由书籍', 'gutenberg.org', C.ink),
          L('世界数字图书馆', 'https://www.loc.gov/collections/world-digital-library/', '多语种原始文献', 'loc.gov', C.plum),
          L('中国国家图书馆', 'https://www.nlc.cn/', '国家总书库', 'nlc.cn', C.plum),
          L('文津搜索', 'https://find.nlc.cn/', '国图与地方馆的检索', 'find.nlc.cn', C.slate),
          L('国家哲学社会科学文献中心', 'https://www.ncpssd.org/', '哲学社会科学文献', 'ncpssd.org', C.ink)
        ]
      },
      {
        id: 'dao-language',
        title: '语言',
        items: [
          L('维基词典', 'https://zh.wiktionary.org/', '多语言的开放词典', 'zh.wiktionary.org', C.olive),
          L('Etymonline', 'https://www.etymonline.com/', '英语词源', 'etymonline.com', C.tea),
          L('田间小站', 'https://www.tjxz.cc/', '高级英语学习', 'tjxz.cc', C.moss),
          L('欧路词典', 'https://dict.eudic.net/', '词典、听力与翻译', 'dict.eudic.net', C.clay),
          L('金山词霸', 'https://www.iciba.com/', '多语种词典', 'iciba.com', C.plum),
          L('可可英语', 'https://www.kekenet.com/', '听力与阅读', 'kekenet.com', C.olive)
        ]
      },
      {
        id: 'dao-sound',
        title: '声音',
        items: [
          L('维生素E', 'https://open.spotify.com/show/4PxvxUAD17xz3CwMhAvvPE', '经济学与哲学的基础知识', 'open.spotify.com', C.olive),
          L('翻转电台', 'https://open.spotify.com/show/6O2YwvuGpP2y17SpC8MM5s', '哲学资源接到当下的问题', 'open.spotify.com', C.plum),
          L('吾在播客', 'https://open.spotify.com/show/0ndf49vruU6UwoykFXUCHl', '每一种存在都值得被看见', 'open.spotify.com', C.clay),
          L('西方思想史 · 刘擎', 'https://open.spotify.com/show/65eQne9QyPxFwKEan7HwvT', '五十讲音频', 'open.spotify.com', C.tea),
          L('不明白播客', 'https://open.spotify.com/show/5CV2Xo4kHE6Lf1iZBzsrP2', '把私下的深谈公开来听', 'open.spotify.com', C.slate)
        ]
      },
      {
        id: 'dao-image',
        title: '影像',
        items: [
          L('柴静', 'https://www.youtube.com/@chaijing2023', '记录与看见', 'youtube.com', C.ink),
          L('FearNation 世界苦茶', 'https://www.youtube.com/@flipradio_fearnation', '贴近恐惧的肌理', 'youtube.com', C.plum),
          L('零下56', 'https://www.youtube.com/@56BelowTV', '华人移民，百味人生', 'youtube.com', C.slate),
          L('老梁', 'https://www.youtube.com/@LiangTalks', '时评与世情', 'youtube.com', C.clay),
          L('十三邀', 'https://www.youtube.com/@THIRTEENTALKS', '许知远与对话者', 'youtube.com', C.tea),
          L('Existential Zone', 'https://www.youtube.com/@ExistentialZone', '把日子过得更有勇气', 'youtube.com', C.moss),
          L('英语兔', 'https://www.youtube.com/@yingyutu', '把英语讲清楚', 'youtube.com', C.olive),
          L('李子柚', 'https://www.youtube.com/@cnliziqi', '田园生活的记录', 'youtube.com', C.moss),
          L('蕾儿乔什看世界', 'https://www.youtube.com/@leiandjosh1646', '八年，一百个国家', 'youtube.com', C.rust)
        ]
      }
    ]
  },
  {
    id: 'shu',
    title: '术',
    groups: [
      {
        id: 'shu-ai',
        title: '人工智能',
        items: [
          L('DeepSeek', 'https://chat.deepseek.com/', '深度求索', 'chat.deepseek.com', C.ink),
          L('豆包', 'https://www.doubao.com/', '字节跳动', 'doubao.com', C.clay),
          L('Kimi', 'https://kimi.moonshot.cn/', '月之暗面', 'kimi.moonshot.cn', C.plum),
          L('通义千问', 'https://tongyi.aliyun.com/', '阿里巴巴', 'tongyi.aliyun.com', C.olive),
          L('智谱清言', 'https://chatglm.cn/', 'ChatGLM', 'chatglm.cn', C.moss),
          L('文心一言', 'https://yiyan.baidu.com/', '百度', 'yiyan.baidu.com', C.slate),
          L('ChatGPT', 'https://chatgpt.com/', 'OpenAI', 'chatgpt.com', C.ink),
          L('Claude', 'https://claude.ai/', 'Anthropic', 'claude.ai', C.tea),
          L('Gemini', 'https://gemini.google.com/', 'Google', 'gemini.google.com', C.olive),
          L('Copilot', 'https://copilot.microsoft.com/', 'Microsoft', 'copilot.microsoft.com', C.slate),
          L('Grok', 'https://grok.com/', 'xAI', 'grok.com', C.ink),
          L('Cursor', 'https://cursor.com/', 'AI 代码编辑器', 'cursor.com', C.plum),
          L('通义灵码', 'https://lingma.aliyun.com/', '智能编码助手', 'lingma.aliyun.com', C.olive),
          L('即梦', 'https://jimeng.jianying.com/', '字节跳动 · 剪映', 'jimeng.jianying.com', C.rust),
          L('Runway', 'https://runwayml.com/', 'AI 视频', 'runwayml.com', C.clay),
          L('秘塔AI', 'https://metaso.cn/', 'AI 搜索', 'metaso.cn', C.tea)
        ]
      },
      {
        id: 'shu-search',
        title: '检索与文献',
        items: [
          L('Google Scholar', 'https://scholar.google.com/', '论文与引文', 'scholar.google.com', C.slate),
          L('Semantic Scholar', 'https://www.semanticscholar.org/', '文献关系', 'semanticscholar.org', C.olive),
          L('arXiv', 'https://arxiv.org/', '预印本', 'arxiv.org', C.ink),
          L('PubMed', 'https://pubmed.ncbi.nlm.nih.gov/', '生物医学文献', 'pubmed.ncbi.nlm.nih.gov', C.moss),
          L('中国知网', 'https://www.cnki.net/', '中文学术文献', 'cnki.net', C.clay),
          L('万方数据', 'https://www.wanfangdata.com.cn/', '期刊、学位与会议', 'wanfangdata.com.cn', C.tea),
          L('百度学术', 'https://xueshu.baidu.com/', '中文学术入口', 'xueshu.baidu.com', C.olive),
          L('ScienceDirect', 'https://www.sciencedirect.com/', 'Elsevier 全文', 'sciencedirect.com', C.plum),
          L('DOAJ', 'https://doaj.org/', '开放获取期刊目录', 'doaj.org', C.moss),
          L('Unpaywall', 'https://unpaywall.org/', '开放全文', 'unpaywall.org', C.slate),
          L('Papers with Code', 'https://paperswithcode.com/', '论文与代码', 'paperswithcode.com', C.ink),
          L('Zotero', 'https://www.zotero.org/', '收集、引用、保存文献', 'zotero.org', C.clay),
          L('Z-Library', 'https://zh.zlib.li/', '电子书与文献入口', 'zh.zlib.li', C.slate),
          L('Google Patents', 'https://patents.google.com/', '全球专利全文', 'patents.google.com', C.olive),
          L('WIPO', 'https://www.wipo.int/', '世界知识产权组织', 'wipo.int', C.plum)
        ]
      },
      {
        id: 'shu-engine',
        title: '搜索',
        items: [
          L('Google', 'https://www.google.com/', '检索', 'google.com', C.ink),
          L('Bing', 'https://www.bing.com/', '必应', 'bing.com', C.slate),
          L('DuckDuckGo', 'https://duckduckgo.com/', '不追踪的搜索', 'duckduckgo.com', C.olive),
          L('百度', 'https://www.baidu.com/', '中文搜索', 'baidu.com', C.clay),
          L('搜狗', 'https://www.sogou.com/', '中文搜索', 'sogou.com', C.tea),
          L('Ecosia', 'https://www.ecosia.org/', '种树的搜索引擎', 'ecosia.org', C.moss),
          L('Yandex', 'https://yandex.com/', '俄语检索', 'yandex.com', C.plum),
          L('GitHub', 'https://github.com/', '代码与项目检索', 'github.com', C.ink)
        ]
      },
      {
        id: 'shu-learn',
        title: '学习课程',
        items: [
          L('中国大学MOOC', 'https://www.icourse163.org/', '国家精品课程', 'icourse163.org', C.moss),
          L('学堂在线', 'https://www.xuetangx.com/', '国内高校在线课程', 'xuetangx.com', C.tea),
          L('爱课程', 'https://www.icourses.cn/', '高等教育在线开放课程', 'icourses.cn', C.olive),
          L('Coursera', 'https://www.coursera.org/', '世界大学公开课', 'coursera.org', C.clay),
          L('网易公开课', 'https://open.163.com/', '名校公开课', 'open.163.com', C.plum),
          L('Open Yale Courses', 'https://oyc.yale.edu/', '耶鲁开放课程', 'oyc.yale.edu', C.ink),
          L('菜鸟教程', 'https://www.runoob.com/', '编程入门', 'runoob.com', C.moss),
          L('廖雪峰', 'https://www.liaoxuefeng.com/', 'Python / Java / JS', 'liaoxuefeng.com', C.olive),
          L('慕课网', 'https://www.imooc.com/', 'IT 职业课程', 'imooc.com', C.slate),
          L('默沙东诊疗手册', 'https://www.msdmanuals.com/zh/', '医学通识', 'msdmanuals.com', C.tea)
        ]
      },
      {
        id: 'shu-write',
        title: '书写与建站',
        items: [
          L('Notion', 'https://www.' + 'notion.so/', '写作与结构', 'notion.so', C.ink),
          L('NotionNext', 'https://notionnext.tangly1024.com/', '用 Notion 做网站', 'notionnext.tangly1024.com', C.olive),
          L('Obsidian', 'https://obsidian.md/', '本地双向链接笔记', 'obsidian.md', C.plum),
          L('Typora', 'https://typora.io/', 'Markdown 编辑器', 'typora.io', C.clay),
          L('语雀', 'https://www.yuque.com/', '云端知识库', 'yuque.com', C.tea),
          L('flomo', 'https://flomoapp.com/', '卡片笔记', 'flomoapp.com', C.moss),
          L('GitHub', 'https://github.com/', '源码与协作', 'github.com', C.ink),
          L('Gitee', 'https://gitee.com/', '国内代码托管', 'gitee.com', C.rust),
          L('Git', 'https://git-scm.com/', '版本控制', 'git-scm.com', C.slate),
          L('Vercel', 'https://vercel.com/', '站点发布', 'vercel.com', C.slate),
          L('Hexo', 'https://hexo.io/zh-cn/', '静态博客', 'hexo.io', C.olive),
          L('docsify', 'https://docsify.js.org/', '文档站点', 'docsify.js.org', C.plum),
          L('Regery', 'https://regery.com/en/signup?returnUrl=%2Fcontrol', '域名与证书', 'regery.com', C.moss),
          L('Creative Commons', 'https://creativecommons.org/licenses/', '知识共享许可', 'creativecommons.org', C.tea)
        ]
      },
      {
        id: 'shu-trans',
        title: '翻译',
        items: [
          L('DeepL', 'https://www.deepl.com/translator', '尽量保住句子的意思', 'deepl.com', C.olive),
          L('有道翻译', 'https://fanyi.youdao.com/', '多语种在线翻译', 'fanyi.youdao.com', C.clay),
          L('彩云小译', 'https://fanyi.caiyunapp.com/', '对照阅读', 'fanyi.caiyunapp.com', C.plum),
          L('必应翻译', 'https://www.bing.com/translator', '网页与句子', 'bing.com', C.slate),
          L('CNKI翻译助手', 'https://dict.cnki.net/', '学术用语', 'dict.cnki.net', C.tea),
          L('百度翻译', 'https://fanyi.baidu.com/', '多语种', 'fanyi.baidu.com', C.olive)
        ]
      },
      {
        id: 'shu-tools',
        title: '工具',
        items: [
          L('Wayback Machine', 'https://web.archive.org/', '网页被撤下之后', 'web.archive.org', C.slate),
          L('diagrams.net', 'https://app.diagrams.net/', '流程图与结构图', 'app.diagrams.net', C.ink),
          L('123apps', 'https://123apps.com/cn/', '音视频与 PDF', '123apps.com', C.clay),
          L('TinyPNG', 'https://tinypng.com/', '压缩图片', 'tinypng.com', C.olive),
          L('remove.bg', 'https://www.remove.bg/', '掠图', 'remove.bg', C.plum),
          L('草料二维码', 'https://cli.im/', '生成二维码', 'cli.im', C.tea),
          L('uTools', 'https://u.tools/', '本地工具箱', 'u.tools', C.moss),
          L('中国色', 'http://zhongguose.com/', '传统色', 'zhongguose.com', C.rust),
          L('Font Awesome', 'https://fontawesome.com/icons', '图标', 'fontawesome.com', C.ink),
          L('jsDelivr', 'https://www.jsdelivr.com/', '开源 CDN', 'jsdelivr.com', C.slate),
          L('正则', 'https://regex101.com/', '正则表达式', 'regex101.com', C.olive),
          L('法律咨询', 'https://ai.12348.gov.cn/pc/', '中国法律服务网', 'ai.12348.gov.cn', C.plum)
        ]
      },
      {
        id: 'shu-design',
        title: '设计',
        items: [
          L('iconfont', 'https://www.iconfont.cn/', '矢量图标', 'iconfont.cn', C.clay),
          L('Unsplash', 'https://unsplash.com/', '免费摄影', 'unsplash.com', C.ink),
          L('Pexels', 'https://www.pexels.com/zh-cn/', '免费图库', 'pexels.com', C.olive),
          L('Canva', 'https://www.canva.cn/', '在线设计', 'canva.cn', C.plum),
          L('undraw', 'https://undraw.co/illustrations', '插画', 'undraw.co', C.tea),
          L('Coolors', 'https://coolors.co/', '配色', 'coolors.co', C.moss)
        ]
      },
      {
        id: 'shu-career',
        title: '升学就业',
        items: [
          L('学信网', 'https://www.chsi.com.cn/', '学历与学籍', 'chsi.com.cn', C.ink),
          L('研招网', 'https://yz.chsi.com.cn/', '硕士研究生招生', 'yz.chsi.com.cn', C.olive),
          L('国家公派留学', 'https://www.csc.edu.cn/', '国家留学基金委', 'csc.edu.cn', C.plum),
          L('中小学教师资格', 'https://ntce.neea.edu.cn/', '教资考试', 'ntce.neea.edu.cn', C.tea),
          L('国家公务员局', 'https://www.scs.gov.cn/', '公务员考试', 'scs.gov.cn', C.slate),
          L('应届生求职', 'https://www.yingjiesheng.com/', '校园招聘', 'yingjiesheng.com', C.clay),
          L('BOSS直聘', 'https://www.zhipin.com/', '招聘', 'zhipin.com', C.moss),
          L('智联招聘', 'https://www.zhaopin.com/', '招聘', 'zhaopin.com', C.olive)
        ]
      },
      {
        id: 'shu-net',
        title: '网络入口',
        items: [
          L('Soxo', 'https://w1.soxo.top/auth/register?code=nLf5', '网络访问服务', 'w1.soxo.top', C.plum),
          L('iosapp', 'https://free.iosapp.icu/', '共享 Apple ID / 小火箭', 'free.iosapp.icu', C.rust)
        ]
      },
      {
        id: 'shu-gate',
        title: '综合入口',
        items: [
          L('DAC导航', 'https://dacdh.top/', '校园导航原站', 'dacdh.top', C.clay),
          L('Dac AI助手导航', 'https://ai.dacdh.top/', 'DAC 的 AI 入口', 'ai.dacdh.top', C.plum),
          L('高校课程资源', 'https://github.com/nwuzmedoutlook/university', '课程资料整理', 'github.com', C.ink)
        ]
      }
    ]
  }
]

export const getFriendLinkToc = (sections = FRIEND_LINK_SECTIONS) =>
  sections.map(section => ({
    id: section.id,
    title: section.tocTitle || section.title,
    groups: (section.groups || []).map(group => ({
      id: group.id,
      title: group.tocTitle || group.title
    }))
  }))
