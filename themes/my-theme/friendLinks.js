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

const L = (name, url, desc, domain, color, weight = 2, axes = []) => ({
  name,
  url,
  desc,
  domain,
  color,
  weight,
  axes
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
          L('维基百科', 'https://zh.wikipedia.org/', '人人可编辑的自由百科', 'zh.wikipedia.org', C.ink, 5, ['info', 'language']),
          L('Wikipedia', 'https://en.wikipedia.org/wiki/Main_Page', '自由的百科全书', 'en.wikipedia.org', C.ink, 5, ['info', 'language']),
          L('斯坦福哲学百科', 'https://plato.stanford.edu/', '当代哲学的开放辞书', 'plato.stanford.edu', C.plum, 5, ['info']),
          L('爱思想', 'https://www.aisixiang.com/', '思想与学术的公共仓库', 'aisixiang.com', C.tea, 5, ['info']),
          L('TED', 'https://www.ted.com/', 'Ideas worth spreading', 'ted.com', C.rust, 4, ['info', 'language']),
          L('中国大百科全书', 'https://www.zgbk.com/', '国家级百科全书', 'zgbk.com', C.olive, 4, ['info']),
          L('MBA智库', 'https://www.mbalib.com/', '管理与社会的词条', 'mbalib.com', C.clay, 2, ['info']),
          L('PhilPapers', 'https://philpapers.org/', '哲学论文的总目录', 'philpapers.org', C.plum, 5, ['info']),
          L('AskPhilosophers', 'https://www.askphilosophers.org/', '哲学家当场回答', 'askphilosophers.org', C.tea, 4, ['info']),
          L('哲学中国网', 'http://www.philosophy.org.cn/', '哲学研究的公共入口', 'philosophy.org.cn', C.ink, 4, ['info'])
        ]
      },
      {
        id: 'dao-letters',
        title: '文史与知识',
        items: [
          L('中国哲学书电子化计划', 'https://ctext.org/zh', '先秦以降的典籍与字词', 'ctext.org', C.tea, 5, ['time', 'language']),
          L('汉典', 'https://www.zdic.net/', '汉字字义与古汉语', 'zdic.net', C.clay, 4, ['language', 'time']),
          L('古文岛', 'https://www.gushiwen.cn/', '诗词与古文', 'gushiwen.cn', C.olive, 3, ['time', 'language']),
          L('维基文库', 'https://zh.wikisource.org/', '自由的在线图书馆', 'zh.wikisource.org', C.moss, 4, ['time', 'info']),
          L('国学大师', 'https://www.guoxuedashi.com/', '经典、小学与古籍', 'guoxuedashi.com', C.tea, 3, ['time']),
          L('书格', 'https://new.shuge.org/', '公共版权领域的古籍善本', 'new.shuge.org', C.olive, 5, ['time']),
          L('Internet Archive', 'https://archive.org/', '书籍、影像与网页的公共记忆', 'archive.org', C.slate, 5, ['time', 'info']),
          L('Project Gutenberg', 'https://www.gutenberg.org/', '过了版权保护期的自由书籍', 'gutenberg.org', C.ink, 5, ['time', 'language']),
          L('世界数字图书馆', 'https://www.loc.gov/collections/world-digital-library/', '多语种原始文献', 'loc.gov', C.plum, 5, ['space', 'time']),
          L('中国国家图书馆', 'https://www.nlc.cn/', '国家总书库', 'nlc.cn', C.plum, 5, ['time', 'info']),
          L('文津搜索', 'https://find.nlc.cn/', '国图与地方馆的检索', 'find.nlc.cn', C.slate, 3, ['info']),
          L('国家哲学社会科学文献中心', 'https://www.ncpssd.org/', '哲学社会科学文献', 'ncpssd.org', C.ink, 4, ['info']),
          L('OpenStax', 'https://openstax.org/', '开放教材', 'openstax.org', C.moss, 3, ['info']),
          L('全历史', 'https://www.allhistory.com/', '把时间摊开成一张图', 'allhistory.com', C.tea, 5, ['time']),
          L('二十四史', 'http://www.24-shi.com/', '原文与检索', '24-shi.com', C.olive, 4, ['time']),
          L('搜韵', 'https://sou-yun.cn/', '诗词的门', 'sou-yun.cn', C.clay, 4, ['language', 'time']),
          L('漢籍電子文獻資料庫', 'https://hanchi.ihp.sinica.edu.tw/ihp/hanji.htm', '中研院汉籍', 'hanchi.ihp.sinica.edu.tw', C.ink, 4, ['time']),
          L('寒泉', 'http://skqs.lib.ntnu.edu.tw/dragon/', '古典文献全文检索', 'skqs.lib.ntnu.edu.tw', C.plum, 3, ['time']),
          L('中华珍宝馆', 'http://www.ltfc.net/', '书画被扫描之后', 'ltfc.net', C.moss, 4, ['time', 'space']),
          L('诗词名句网', 'https://www.shicimingju.com/', '古诗与名句', 'shicimingju.com', C.olive, 3, ['language', 'time'])
        ]
      },
      {
        id: 'dao-language',
        title: '语言',
        items: [
          L('维基词典', 'https://zh.wiktionary.org/', '多语言的开放词典', 'zh.wiktionary.org', C.olive, 5, ['language']),
          L('Etymonline', 'https://www.etymonline.com/', '英语词源', 'etymonline.com', C.tea, 5, ['language', 'time']),
          L('田间小站', 'https://www.tjxz.cc/', '高级英语学习', 'tjxz.cc', C.moss, 3, ['language']),
          L('欧路词典', 'https://dict.eudic.net/', '词典、听力与翻译', 'dict.eudic.net', C.clay, 3, ['language']),
          L('金山词霸', 'https://www.iciba.com/', '多语种词典', 'iciba.com', C.plum, 2, ['language']),
          L('可可英语', 'https://www.kekenet.com/', '听力与阅读', 'kekenet.com', C.olive, 2, ['language']),
          L('LingoHut', 'https://www.lingohut.com/', '四十多种语言入门', 'lingohut.com', C.tea, 3, ['language']),
          L('中国日报', 'https://www.chinadaily.com.cn/', '英文报道', 'chinadaily.com.cn', C.ink, 2, ['language', 'info']),
          L('漢語多功能字庫', 'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/', '字形、字音与字义', 'humanum.arts.cuhk.edu.hk', C.tea, 5, ['language', 'time']),
          L('小學堂', 'https://xiaoxue.iis.sinica.edu.tw/', '形音义的文字学库', 'xiaoxue.iis.sinica.edu.tw', C.olive, 4, ['language', 'time']),
          L('韻典網', 'https://ytenx.org/', '综合韵书查询', 'ytenx.org', C.plum, 4, ['language', 'time']),
          L('语保工程', 'https://zhongguoyuyan.cn/index', '中国语言资源保护', 'zhongguoyuyan.cn', C.moss, 5, ['language', 'space']),
          L('乡音苑', 'https://phonemica.net/', '方言故事', 'phonemica.net', C.clay, 5, ['language', 'space']),
          L('Language Player', 'https://languageplayer.io/', '用可理解输入学语言', 'languageplayer.io', C.ink, 4, ['language']),
          L('Crash Course', 'https://crashcourse.club/', '中文字幕的速成课', 'crashcourse.club', C.olive, 3, ['language', 'info']),
          L('YouZack', 'https://www.youzack.com/', '精听与单词', 'youzack.com', C.tea, 3, ['language']),
          L('Engsence', 'https://engsence.now-then.dev/', '把英语练到能用', 'engsence.now-then.dev', C.moss, 4, ['language']),
          L('Engsence 周报', 'https://engsence.now-then.dev/?category=life&week=032', '真实语境英语阅读与积累', 'engsence.now-then.dev', C.moss, 4, ['language']),
          L('日语语法指南', 'http://res.wokanxing.info/jpgramma/index.html', '从日语本身讲语法', 'res.wokanxing.info', C.plum, 3, ['language']),
          L('澳洲 WHV 462 签证官网', 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-holiday-462/first-work-holiday-462', '澳大利亚打工度假签证（462类别）官方申请入口', 'homeaffairs.gov.au', C.moss, 5, ['life', 'travel', 'official']),
          L('Te Ara 新西兰百科全书', 'https://teara.govt.nz/en/search/teara?keys=social+security', '新西兰官方国家百科 - 社会保障与政策专区', 'teara.govt.nz', C.moss, 4, ['academic', 'life', 'official']),
        ]
      },
      {
        id: 'dao-sound',
        title: '声音',
        items: [
          L('维生素E', 'https://open.spotify.com/show/4PxvxUAD17xz3CwMhAvvPE', '经济学与哲学的基础知识', 'open.spotify.com', C.olive, 4, ['info']),
          L('翻转电台', 'https://open.spotify.com/show/6O2YwvuGpP2y17SpC8MM5s', '哲学资源接到当下的问题', 'open.spotify.com', C.plum, 4, ['info']),
          L('吾在播客', 'https://open.spotify.com/show/0ndf49vruU6UwoykFXUCHl', '每一种存在都值得被看见', 'open.spotify.com', C.clay, 5, ['info', 'language']),
          L('西方思想史 · 刘擎', 'https://open.spotify.com/show/65eQne9QyPxFwKEan7HwvT', '五十讲音频', 'open.spotify.com', C.tea, 4, ['time', 'info']),
          L('不明白播客', 'https://open.spotify.com/show/5CV2Xo4kHE6Lf1iZBzsrP2', '把私下的深谈公开来听', 'open.spotify.com', C.slate, 3, ['info']),
          L('每日一文', 'https://meiriyiwen.com/', '每天一篇随机美文', 'meiriyiwen.com', C.tea, 3, ['time', 'language'])
        ]
      },
      {
        id: 'dao-image',
        title: '影像',
        items: [
          L('动漫巴士', 'https://dmbus.cc', '动漫资源与在线播放', 'dmbus.cc', C.slate, 3, ['info']),
          L('小鸭看看', 'https://xiaoyakankan.com/', '影视视频在线播放', 'xiaoyakankan.com', C.olive, 3, ['info']),
          L('努努影院', 'https://www.nunuyy5.com', '免费高清影视在线观看', 'nunuyy5.com', C.tea, 3, ['info']),
          L('爱一帆视频', 'https://www.yfsp.tv/', '海外高清影视在线观影', 'yfsp.tv', C.plum, 3, ['info']),
          L('柴静', 'https://www.youtube.com/@chaijing2023', '记录与看见', 'youtube.com', C.ink, 4, ['info', 'space']),
          L('FearNation 世界苦茶', 'https://www.youtube.com/@flipradio_fearnation', '贴近恐惧的肌理', 'youtube.com', C.plum, 4, ['info']),
          L('零下56', 'https://www.youtube.com/@56BelowTV', '华人移民，百味人生', 'youtube.com', C.slate, 3, ['space']),
          L('老梁', 'https://www.youtube.com/@LiangTalks', '时评与世情', 'youtube.com', C.clay, 2, ['info']),
          L('十三邀', 'https://www.youtube.com/@THIRTEENTALKS', '许知远与对话者', 'youtube.com', C.tea, 3, ['info']),
          L('Existential Zone', 'https://www.youtube.com/@ExistentialZone', '把日子过得更有勇气', 'youtube.com', C.moss, 4, ['info']),
          L('英语兔', 'https://www.youtube.com/@yingyutu', '把英语讲清楚', 'youtube.com', C.olive, 3, ['language']),
          L('李子柒', 'https://www.youtube.com/@cnliziqi', '田园生活的记录', 'youtube.com', C.moss, 3, ['space', 'time']),
          L('蕾儿乔什看世界', 'https://www.youtube.com/@leiandjosh1646', '八年，一百个国家', 'youtube.com', C.rust, 4, ['space']),
          L('千亿像素看中国', 'http://www.bigpixel.cn/', '把一座城摊开', 'bigpixel.cn', C.slate, 5, ['space']),
          L('极像素', 'https://www.sigoo.com/', '超高像素看世界', 'sigoo.com', C.ink, 4, ['space'])
        ]
      },
      {
        id: 'dao-frontier',
        title: '前沿与交叉',
        items: [
          L('Sci-Hub 讨论社区', 'https://discuss.sci-hub.org.cn/', '学术文献检索与交流讨论', 'discuss.sci-hub.org.cn', C.ink, 4, ['info', 'tech']),
          L('Quanta Magazine', 'https://www.quantamagazine.org/', '物理、数学与计算的交界', 'quantamagazine.org', C.ink, 5, ['info', 'tech']),
          L('MIT Technology Review', 'https://www.technologyreview.com/', '技术如何改写生活边界', 'technologyreview.com', C.plum, 4, ['tech', 'info']),
          L('Scientific American Mind', 'https://www.scientificamerican.com/mind-and-brain/', '心智与脑的研究', 'scientificamerican.com', C.tea, 4, ['info']),
          L('Space.com', 'https://www.space.com/', '宇宙探索的报道', 'space.com', C.slate, 5, ['space']),
          L('Phys.org', 'https://phys.org/', '物理学与材料的进展', 'phys.org', C.olive, 3, ['info']),
          L('New Scientist', 'https://www.newscientist.com/', '自然科学的新发现', 'newscientist.com', C.moss, 3, ['info']),
          L('ScienceDaily', 'https://www.sciencedaily.com/', '各学科最新研究', 'sciencedaily.com', C.clay, 3, ['info']),
          L('IEEE Spectrum', 'https://spectrum.ieee.org/', '工程与计算的前沿', 'spectrum.ieee.org', C.ink, 3, ['tech']),
          L('量子位', 'https://www.qbitai.com/', '人工智能的行业观察', 'qbitai.com', C.plum, 3, ['tech', 'info']),
          L('黄大年茶思屋', 'https://www.chaspark.com/#/home', '学术前沿信息', 'chaspark.com', C.tea, 3, ['info'])
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
          L('DeepSeek', 'https://chat.deepseek.com/', '深度求索', 'chat.deepseek.com', C.ink, 3, ['tech']),
          L('豆包', 'https://www.doubao.com/', '字节跳动', 'doubao.com', C.clay, 2, []),
          L('Kimi', 'https://kimi.moonshot.cn/', '月之暗面', 'kimi.moonshot.cn', C.plum, 2, []),
          L('通义千问', 'https://tongyi.aliyun.com/', '阿里巴巴', 'tongyi.aliyun.com', C.olive, 2, []),
          L('智谱清言', 'https://chatglm.cn/', 'ChatGLM', 'chatglm.cn', C.moss, 2, []),
          L('文心一言', 'https://yiyan.baidu.com/', '百度', 'yiyan.baidu.com', C.slate, 2, []),
          L('讯飞星火', 'https://xinghuo.xfyun.cn/', '科大讯飞', 'xinghuo.xfyun.cn', C.tea, 2, []),
          L('腾讯元宝', 'https://yuanbao.tencent.com/', '腾讯', 'yuanbao.tencent.com', C.olive, 2, []),
          L('纳米AI', 'https://www.n.cn/', '360', 'n.cn', C.clay, 2, []),
          L('知乎直答', 'https://zhida.zhihu.com/', '知乎', 'zhida.zhihu.com', C.ink, 2, []),
          L('天工', 'https://www.tiangong.cn/', '昆仑万维', 'tiangong.cn', C.moss, 2, []),
          L('问小白', 'https://www.wenxiaobai.com/', '元石科技', 'wenxiaobai.com', C.plum, 2, []),
          L('ChatGPT', 'https://chatgpt.com/', 'OpenAI', 'chatgpt.com', C.ink, 3, ['tech', 'language']),
          L('Claude', 'https://claude.ai/', 'Anthropic', 'claude.ai', C.tea, 3, ['tech', 'language']),
          L('Gemini', 'https://gemini.google.com/', 'Google', 'gemini.google.com', C.olive, 3, ['tech']),
          L('Copilot', 'https://copilot.microsoft.com/', 'Microsoft', 'copilot.microsoft.com', C.slate, 2, []),
          L('Grok', 'https://grok.com/', 'xAI', 'grok.com', C.ink, 2, []),
          L('Cursor', 'https://cursor.com/', 'AI 代码编辑器', 'cursor.com', C.plum, 3, ['tech']),
          L('TRAE', 'https://www.trae.ai/', '字节跳动', 'trae.ai', C.clay, 2, []),
          L('通义灵码', 'https://lingma.aliyun.com/', '智能编码助手', 'lingma.aliyun.com', C.olive, 2, []),
          L('CodeGeeX', 'https://codegeex.cn/', '智谱', 'codegeex.cn', C.moss, 2, []),
          L('即梦', 'https://jimeng.jianying.com/', '字节跳动 · 剪映', 'jimeng.jianying.com', C.rust, 2, []),
          L('可灵', 'https://klingai.com/', '快手', 'klingai.com', C.tea, 2, []),
          L('海螺', 'https://hailuoai.com/', 'MiniMax', 'hailuoai.com', C.plum, 2, []),
          L('Runway', 'https://runwayml.com/', 'AI 视频', 'runwayml.com', C.clay, 2, []),
          L('Pika', 'https://pika.art/', 'AI 视频', 'pika.art', C.olive, 2, []),
          L('秘塔AI', 'https://metaso.cn/', 'AI 搜索', 'metaso.cn', C.tea, 2, ['tech', 'info'])
        ]
      },
      {
        id: 'shu-search',
        title: '检索与文献',
        items: [
          L('Google Scholar', 'https://scholar.google.com/', '论文与引文', 'scholar.google.com', C.slate, 4, ['info']),
          L('Semantic Scholar', 'https://www.semanticscholar.org/', '文献关系', 'semanticscholar.org', C.olive, 4, ['info']),
          L('arXiv', 'https://arxiv.org/', '预印本', 'arxiv.org', C.ink, 4, ['info']),
          L('PubMed', 'https://pubmed.ncbi.nlm.nih.gov/', '生物医学文献', 'pubmed.ncbi.nlm.nih.gov', C.moss, 3, ['info']),
          L('中国知网', 'https://www.cnki.net/', '中文学术文献', 'cnki.net', C.clay, 3, ['info']),
          L('万方数据', 'https://www.wanfangdata.com.cn/', '期刊、学位与会议', 'wanfangdata.com.cn', C.tea, 2, []),
          L('百度学术', 'https://xueshu.baidu.com/', '中文学术入口', 'xueshu.baidu.com', C.olive, 2, []),
          L('ScienceDirect', 'https://www.sciencedirect.com/', 'Elsevier 全文', 'sciencedirect.com', C.plum, 2, []),
          L('Web of Science', 'https://www.webofscience.com/', '引文索引', 'webofscience.com', C.ink, 2, []),
          L('DOAJ', 'https://doaj.org/', '开放获取期刊目录', 'doaj.org', C.moss, 2, []),
          L('Unpaywall', 'https://unpaywall.org/', '开放全文', 'unpaywall.org', C.slate, 2, []),
          L('Papers with Code', 'https://paperswithcode.com/', '论文与代码', 'paperswithcode.com', C.ink, 2, []),
          L('X-MOL', 'https://www.x-mol.com/', '科学知识平台', 'x-mol.com', C.olive, 2, []),
          L('爱科学', 'https://www.iikx.com/', '科研导航', 'iikx.com', C.clay, 2, []),
          L('国家自然科学基金', 'https://www.nsfc.gov.cn/', '资助与成果', 'nsfc.gov.cn', C.plum, 2, []),
          L('中国工程科技知识中心', 'https://www.ckcest.cn/', '工程科技文献', 'ckcest.cn', C.tea, 2, []),
          L('Academia.edu', 'https://www.academia.edu/', '论文分享', 'academia.edu', C.moss, 2, []),
          L('Zotero', 'https://www.zotero.org/', '收集、引用、保存文献', 'zotero.org', C.clay, 4, ['info', 'tech']),
          L('Z-Library', 'https://zh.zlib.li/', '电子书与文献入口', 'zh.zlib.li', C.slate, 2, []),
          L('Google Patents', 'https://patents.google.com/', '全球专利全文', 'patents.google.com', C.olive, 2, []),
          L('WIPO', 'https://www.wipo.int/', '世界知识产权组织', 'wipo.int', C.plum, 2, []),
          L('中国专利公布公告', 'https://epub.cnipa.gov.cn/', '国家知识产权局', 'epub.cnipa.gov.cn', C.ink, 2, []),
          L('Connected Papers', 'https://www.connectedpapers.com/', '把论文关系画出来', 'connectedpapers.com', C.olive, 4, ['info']),
          L('Research Rabbit', 'https://www.researchrabbitapp.com/', '顺着文献往外走', 'researchrabbitapp.com', C.plum, 4, ['info']),
          L('SciSpace', 'https://typeset.io/', '读论文的助手', 'typeset.io', C.tea, 3, ['info', 'tech']),
          L('Mendeley', 'https://www.mendeley.com/', '参考文献管理', 'mendeley.com', C.moss, 3, ['info']),
          L('JabRef', 'https://www.jabref.org/', '开源文献管理', 'jabref.org', C.ink, 3, ['info', 'tech']),
          L('安娜的档案', 'https://annas-archive.gl/', '全球最大的开放电子书与学术文献搜索引擎', 'annas-archive.gl', C.plum, 5, ['book', 'academic', 'search']),
          L('LibGen', 'https://libgen.la/', '海量学术论文与各类书籍检索与免费下载平台', 'libgen.la', C.rust, 5, ['book', 'academic']),
          L('PDF Drive', 'https://www.pdfdrive.com/', '免费 PDF 电子书搜索引擎与下载平台', 'pdfdrive.com', C.olive, 5, ['book', 'search']),
          L('马克思主义文库', 'https://www.marxists.org/', '多语言马克思主义与经典哲学社科文献库', 'marxists.org', C.rust, 5, ['thought', 'academic']),
          L('无产者图书馆', 'https://library.proletarian.me/ebook_map.php', '电子书地图与数字人文社科文献汇总', 'proletarian.me', C.rust, 4, ['book', 'thought']),
          L('苦瓜书房', 'https://kgbook.com/', '适合电子阅读器的 EPUB/MOBI 格式电子书下载', 'kgbook.com', C.moss, 4, ['book', 'reading']),
          L('板书匠', 'http://banshujiang.cn/', '专注于计算机与 IT 技术类电子书分享', 'banshujiang.cn', C.ink, 4, ['tech', 'book']),
          L('经管之家资料下载', 'https://down.pinggu.org/', '原人大经济论坛，经济/管理/金融类学术资料库', 'pinggu.org', C.olive, 4, ['academic', 'finance']),
          L('Sci-Hub 中文讨论社区', 'https://discuss.sci-hub.org.cn/d/2579', '学术文献获取与 Sci-Hub 镜像交流论坛', 'sci-hub.org.cn', C.moss, 4, ['academic', 'community']),
          L('1762 网社科图书馆', 'http://www.1762.net/lit/tsg/', '汉译世界学术名著与人文社科电子书库', '1762.net', C.slate, 3, ['book', 'classic']),
          L('墨比图书', 'https://www.mobitushu.cn/', 'Kindle 与电子书资源免费下载分享', 'mobitushu.cn', C.slate, 3, ['book', 'reading']),
        ]
      },
      {
        id: 'shu-engine',
        title: '搜索',
        items: [
          L('Google', 'https://www.google.com/', '检索', 'google.com', C.ink, 4, ['info']),
          L('Bing', 'https://www.bing.com/', '必应', 'bing.com', C.slate, 2, []),
          L('DuckDuckGo', 'https://duckduckgo.com/', '不追踪的搜索', 'duckduckgo.com', C.olive, 3, ['info']),
          L('百度', 'https://www.baidu.com/', '中文搜索', 'baidu.com', C.clay, 2, []),
          L('搜狗', 'https://www.sogou.com/', '中文搜索', 'sogou.com', C.tea, 2, []),
          L('360搜索', 'https://www.so.com/', '中文搜索', 'so.com', C.olive, 2, []),
          L('中国搜索', 'https://www.chinaso.com/', '国家搜索', 'chinaso.com', C.ink, 2, []),
          L('Ecosia', 'https://www.ecosia.org/', '种树的搜索引擎', 'ecosia.org', C.moss, 2, []),
          L('Yandex', 'https://yandex.com/', '俄语检索', 'yandex.com', C.plum, 2, []),
          L('GitHub', 'https://github.com/', '代码与项目检索', 'github.com', C.ink, 4, ['tech', 'info']),
          L('CSDN', 'https://www.csdn.net/', '开发者社区', 'csdn.net', C.slate, 2, [])
        ]
      },
      {
        id: 'shu-learn',
        title: '学习课程',
        items: [
          L('中国大学MOOC', 'https://www.icourse163.org/', '国家精品课程', 'icourse163.org', C.moss, 3, ['info']),
          L('学堂在线', 'https://www.xuetangx.com/', '国内高校在线课程', 'xuetangx.com', C.tea, 2, []),
          L('爱课程', 'https://www.icourses.cn/', '高等教育在线开放课程', 'icourses.cn', C.olive, 2, []),
          L('Coursera', 'https://www.coursera.org/', '世界大学公开课', 'coursera.org', C.clay, 3, ['info']),
          L('网易公开课', 'https://open.163.com/', '名校公开课', 'open.163.com', C.plum, 2, []),
          L('Open Yale Courses', 'https://oyc.yale.edu/', '耶鲁开放课程', 'oyc.yale.edu', C.ink, 4, ['info', 'time']),
          L('腾讯课堂', 'https://ke.qq.com/', '职业课程', 'ke.qq.com', C.olive, 2, []),
          L('菜鸟教程', 'https://www.runoob.com/', '编程入门', 'runoob.com', C.moss, 2, []),
          L('w3cschool', 'https://www.w3cschool.cn/', '编程狮', 'w3cschool.cn', C.slate, 2, []),
          L('廖雪峰', 'https://www.liaoxuefeng.com/', 'Python / Java / JS', 'liaoxuefeng.com', C.olive, 2, []),
          L('慕课网', 'https://www.imooc.com/', 'IT 职业课程', 'imooc.com', C.slate, 2, []),
          L('默沙东诊疗手册', 'https://www.msdmanuals.com/zh/', '医学通识', 'msdmanuals.com', C.tea, 2, [])
        ]
      },
      {
        id: 'shu-write',
        title: '书写与建站',
        items: [
          L('Notion', 'https://www.' + 'notion.so/', '写作与结构', 'notion.so', C.ink, 4, ['tech', 'info']),
          L('NotionNext', 'https://notionnext.tangly1024.com/', '用 Notion 做网站', 'notionnext.tangly1024.com', C.olive, 2, []),
          L('Obsidian', 'https://obsidian.md/', '本地双向链接笔记', 'obsidian.md', C.plum, 3, ['tech']),
          L('Typora', 'https://typora.io/', 'Markdown 编辑器', 'typora.io', C.clay, 2, []),
          L('语雀', 'https://www.yuque.com/', '云端知识库', 'yuque.com', C.tea, 2, []),
          L('flomo', 'https://flomoapp.com/', '卡片笔记', 'flomoapp.com', C.moss, 2, []),
          L('wolai', 'https://www.wolai.com/', '云端笔记', 'wolai.com', C.olive, 2, []),
          L('Markdown Nice', 'https://editor.mdnice.com/', '公众号排版', 'editor.mdnice.com', C.rust, 2, []),
          L('GitHub', 'https://github.com/', '源码与协作', 'github.com', C.ink, 4, ['tech', 'info']),
          L('Gitee', 'https://gitee.com/', '国内代码托管', 'gitee.com', C.rust, 2, []),
          L('Git', 'https://git-scm.com/', '版本控制', 'git-scm.com', C.slate, 2, []),
          L('Vercel', 'https://vercel.com/', '站点发布', 'vercel.com', C.slate, 2, []),
          L('Hexo', 'https://hexo.io/zh-cn/', '静态博客', 'hexo.io', C.olive, 2, []),
          L('docsify', 'https://docsify.js.org/', '文档站点', 'docsify.js.org', C.plum, 2, []),
          L('MkDocs', 'https://www.mkdocs.org/', 'Markdown 文档站', 'mkdocs.org', C.tea, 2, []),
          L('Regery', 'https://regery.com/en/signup?returnUrl=%2Fcontrol', '域名与证书', 'regery.com', C.moss, 2, []),
          L('Creative Commons', 'https://creativecommons.org/licenses/', '知识共享许可', 'creativecommons.org', C.tea, 4, ['info']),
          L('Logseq', 'https://logseq.com/', '本地优先的知识库', 'logseq.com', C.ink, 3, ['tech', 'info']),
          L('思源笔记', 'https://b3log.org/siyuan/', '块级双向链接', 'b3log.org', C.olive, 3, ['tech']),
          L('Joplin', 'https://joplinapp.org/', '开源笔记', 'joplinapp.org', C.slate, 3, ['tech']),
          L('Cloudflare', 'https://www.cloudflare.com/', 'CDN 与站点防护', 'cloudflare.com', C.clay, 3, ['tech']),
          L('Netlify', 'https://www.netlify.com/', '静态站点发布', 'netlify.com', C.moss, 3, ['tech'])
        ]
      },
      {
        id: 'shu-trans',
        title: '翻译',
        items: [
          L('DeepL', 'https://www.deepl.com/translator', '尽量保住句子的意思', 'deepl.com', C.olive, 5, ['language']),
          L('Google 翻译', 'https://translate.google.com/', '多语种', 'translate.google.com', C.ink, 3, ['language']),
          L('有道翻译', 'https://fanyi.youdao.com/', '多语种在线翻译', 'fanyi.youdao.com', C.clay, 2, []),
          L('彩云小译', 'https://fanyi.caiyunapp.com/', '对照阅读', 'fanyi.caiyunapp.com', C.plum, 2, []),
          L('必应翻译', 'https://www.bing.com/translator', '网页与句子', 'bing.com', C.slate, 2, []),
          L('腾讯翻译', 'https://fanyi.qq.com/', '句子与文档', 'fanyi.qq.com', C.olive, 2, []),
          L('搜狗翻译', 'https://fanyi.sogou.com/', '多语种', 'fanyi.sogou.com', C.tea, 2, []),
          L('火山翻译', 'https://translate.volcengine.cn/translate', '字节跳动', 'translate.volcengine.cn', C.moss, 2, []),
          L('CNKI翻译助手', 'https://dict.cnki.net/', '学术用语', 'dict.cnki.net', C.tea, 2, []),
          L('百度翻译', 'https://fanyi.baidu.com/', '多语种', 'fanyi.baidu.com', C.olive, 2, []),
          L('Immersive Translate', 'https://immersivetranslate.com/', '对照着读外文', 'immersivetranslate.com', C.tea, 4, ['language']),
          L('Glosbe', 'https://glosbe.com/', '多语种例句词典', 'glosbe.com', C.olive, 3, ['language']),
          L('WantWords', 'https://wantwords.net/', '反向词典', 'wantwords.net', C.plum, 3, ['language'])
        ]
      },
      {
        id: 'shu-tools',
        title: '工具',
        items: [
          L('Wayback Machine', 'https://web.archive.org/', '网页被撤下之后', 'web.archive.org', C.slate, 5, ['time', 'info']),
          L('diagrams.net', 'https://app.diagrams.net/', '流程图与结构图', 'app.diagrams.net', C.ink, 2, ['tech']),
          L('123apps', 'https://123apps.com/cn/', '音视频与 PDF', '123apps.com', C.clay, 2, []),
          L('TinyPNG', 'https://tinypng.com/', '压缩图片', 'tinypng.com', C.olive, 2, []),
          L('remove.bg', 'https://www.remove.bg/', '抠图', 'remove.bg', C.plum, 2, []),
          L('草料二维码', 'https://cli.im/', '生成二维码', 'cli.im', C.tea, 2, []),
          L('uTools', 'https://u.tools/', '本地工具箱', 'u.tools', C.moss, 2, []),
          L('中国色', 'http://zhongguose.com/', '传统色', 'zhongguose.com', C.rust, 2, ['tech']),
          L('Font Awesome', 'https://fontawesome.com/icons', '图标', 'fontawesome.com', C.ink, 2, []),
          L('jsDelivr', 'https://www.jsdelivr.com/', '开源 CDN', 'jsdelivr.com', C.slate, 2, []),
          L('正则', 'https://regex101.com/', '正则表达式', 'regex101.com', C.olive, 2, []),
          L('法律咨询', 'https://ai.12348.gov.cn/pc/', '中国法律服务网', 'ai.12348.gov.cn', C.plum, 2, []),
          L('清华镜像', 'https://mirrors.tuna.tsinghua.edu.cn/', '开源软件镜像', 'mirrors.tuna.tsinghua.edu.cn', C.ink, 3, ['tech']),
          L('中科大镜像', 'https://mirrors.ustc.edu.cn/', '开源软件镜像', 'mirrors.ustc.edu.cn', C.olive, 3, ['tech']),
          L('CERNET 镜像', 'https://mirrors.cernet.edu.cn/list', '校园网联合镜像', 'mirrors.cernet.edu.cn', C.slate, 3, ['tech'])
        ]
      },
      {
        id: 'shu-design',
        title: '设计',
        items: [
          L('iconfont', 'https://www.iconfont.cn/', '矢量图标', 'iconfont.cn', C.clay, 2, []),
          L('Unsplash', 'https://unsplash.com/', '免费摄影', 'unsplash.com', C.ink, 2, ['space']),
          L('Pexels', 'https://www.pexels.com/zh-cn/', '免费图库', 'pexels.com', C.olive, 2, []),
          L('Pixabay', 'https://pixabay.com/zh/', '图片与视频', 'pixabay.com', C.tea, 2, []),
          L('Canva', 'https://www.canva.cn/', '在线设计', 'canva.cn', C.plum, 2, []),
          L('undraw', 'https://undraw.co/illustrations', '插画', 'undraw.co', C.tea, 2, []),
          L('Coolors', 'https://coolors.co/', '配色', 'coolors.co', C.moss, 2, []),
          L('Mixkit', 'https://mixkit.co/', '免费视频素材', 'mixkit.co', C.slate, 2, []),
          L('FreeImages', 'https://www.freeimages.com/cn', '免版税图片', 'freeimages.com', C.olive, 2, [])
        ]
      },
      {
        id: 'shu-career',
        title: '升学就业',
        items: [
          L('学信网', 'https://www.chsi.com.cn/', '学历与学籍', 'chsi.com.cn', C.ink, 2, ['info']),
          L('研招网', 'https://yz.chsi.com.cn/', '硕士研究生招生', 'yz.chsi.com.cn', C.olive, 2, []),
          L('中国教育考试网', 'https://www.neea.edu.cn/', '教育部考试中心', 'neea.edu.cn', C.tea, 2, []),
          L('学位网', 'https://www.chinadegrees.cn/cn/', '学位认证', 'chinadegrees.cn', C.plum, 2, []),
          L('英语四六级', 'https://cet-bm.neea.edu.cn/', 'CET 报名', 'cet-bm.neea.edu.cn', C.clay, 2, []),
          L('计算机等级考试', 'https://ncre.neea.edu.cn/', 'NCRE', 'ncre.neea.edu.cn', C.moss, 2, []),
          L('中国人事考试网', 'https://www.cpta.com.cn/', '专业资格考试', 'cpta.com.cn', C.slate, 2, []),
          L('国家公派留学', 'https://www.csc.edu.cn/', '国家留学基金委', 'csc.edu.cn', C.plum, 2, []),
          L('中小学教师资格', 'https://ntce.neea.edu.cn/', '教资考试', 'ntce.neea.edu.cn', C.tea, 2, []),
          L('国家公务员局', 'https://www.scs.gov.cn/', '公务员考试', 'scs.gov.cn', C.slate, 2, []),
          L('软科', 'https://www.shanghairanking.cn/', '大学排名', 'shanghairanking.cn', C.olive, 2, []),
          L('考研论坛', 'https://bbs.kaoyan.com/', '考研交流', 'bbs.kaoyan.com', C.ink, 2, []),
          L('应届生求职', 'https://www.yingjiesheng.com/', '校园招聘', 'yingjiesheng.com', C.clay, 2, []),
          L('BOSS直聘', 'https://www.zhipin.com/', '招聘', 'zhipin.com', C.moss, 2, []),
          L('智联招聘', 'https://www.zhaopin.com/', '招聘', 'zhaopin.com', C.olive, 2, [])
        ]
      },
      {
        id: 'shu-net',
        title: '网络入口',
        items: [
          L('Soxo', 'https://w1.soxo.top/auth/register?code=nLf5', '网络访问服务', 'w1.soxo.top', C.plum, 2, []),
          L('iosapp', 'https://free.iosapp.icu/', '共享 Apple ID / 小火箭', 'free.iosapp.icu', C.rust, 2, []),
          L('代理服务面板 A', 'https://xn--9kqz23b19z.com/#/login', '网络代理与订阅管理登录节点', 'xn--9kqz23b19z.com', C.plum, 3, ['network', 'tool']),
          L('代理服务面板 B', 'https://fffa.cc/#/login', '网络代理与订阅管理登录节点', 'fffa.cc', C.plum, 3, ['network', 'tool']),
        ]
      },
      {
        id: 'shu-gate',
        title: '综合入口',
        items: [
          L('DAC导航', 'https://dacdh.top/', '校园导航原站', 'dacdh.top', C.clay, 3, ['info']),
          L('TBox 宝盒', 'https://www.tboxn.com/', '实用宝藏软件与精选优质网站导航平台', 'tboxn.com', C.moss, 4, ['tool', 'navigation']),
          L('百科在线', 'https://h.bkzx.cn/', '电子书资源与综合资讯导航平台', 'bkzx.cn', C.slate, 3, ['tool', 'book']),
          L('Dac AI助手导航', 'https://ai.dacdh.top/', 'DAC 的 AI 入口', 'ai.dacdh.top', C.plum, 2, []),
          L('高校课程资源', 'https://github.com/nwuzmedoutlook/university', '课程资料整理', 'github.com', C.ink, 2, []),
          L('飞跃手册', 'https://github.com/nwuzmedoutlook/career-plan', '留学、保研、考研与就业', 'github.com', C.olive, 2, []),
          L('十年之约', 'https://www.foreverblog.cn/', '独立博客还在写', 'foreverblog.cn', C.tea, 3, ['time', 'info']),
          L('大佬论坛', 'https://www.dalao.net/', '技术交流', 'dalao.net', C.tea, 3, ['tech']),
          L('HelloGitHub', 'https://hellogithub.com/', '发现有趣的开源', 'hellogithub.com', C.ink, 3, ['tech']),
          L('Neal.fun', 'https://neal.fun/', '把技术做成可玩的东西', 'neal.fun', C.plum, 3, ['tech'])
        ]
      }
    ]
  }
]

const countItems = group => (group.items || []).length

export const getFriendLinkToc = (sections = FRIEND_LINK_SECTIONS) =>
  sections.map(section => ({
    id: section.id,
    title: section.tocTitle || section.title,
    count: (section.groups || []).reduce((n, group) => n + countItems(group), 0),
    groups: (section.groups || []).map(group => ({
      id: group.id,
      title: group.tocTitle || group.title,
      count: countItems(group)
    }))
  }))
