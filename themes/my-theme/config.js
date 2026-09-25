const CONFIG = {
  HEXO_HOME_BANNER_ENABLE: true,
  // 3.14.1以后的版本中，欢迎语在blog.config.js中配置，用英文逗号','隔开多个。
  HEXO_HOME_BANNER_GREETINGS: [
    'Hi，我是一个程序员',
    'Hi，我是一个打工人',
    'Hi，我是一个干饭人',
    '欢迎来到我的博客🎉'
  ], // 首页大图标语文字

  HEXO_HOME_NAV_BUTTONS: true, // 首页是否显示分类大图标按钮
  // 已知未修复bug, 在移动端开启true后会加载不出图片； 暂时建议设置为false。
  HEXO_HOME_NAV_BACKGROUND_IMG_FIXED: false, // 首页背景图滚动时是否固定，true 则滚动时图片不懂动； false则随鼠标滚动 ;
  // 是否显示开始阅读按钮
  HEXO_SHOW_START_READING: true,

  // 菜单配置
  HEXO_MENU_INDEX: true, // 显示首页
  HEXO_MENU_CATEGORY: true, // 显示分类
  HEXO_MENU_TAG: true, // 显示标签
  HEXO_MENU_ARCHIVE: true, // 显示归档
  HEXO_MENU_SEARCH: true, // 显示搜索
  HEXO_MENU_RANDOM: true, // 显示随机跳转按钮

  HEXO_POST_LIST_COVER: true, // 列表显示文章封面
  HEXO_POST_LIST_COVER_HOVER_ENLARGE: false, // 列表鼠标悬停放大

  HEXO_POST_LIST_COVER_DEFAULT: true, // 封面为空时用站点背景做默认封面
  HEXO_POST_LIST_SUMMARY: true, // 文章摘要
  HEXO_POST_LIST_PREVIEW: false, // 读取文章预览
  HEXO_POST_LIST_IMG_CROSSOVER: true, // 博客列表图片左右交错

  HEXO_ARTICLE_ADJACENT: true, // 显示上一篇下一篇文章推荐
  HEXO_ARTICLE_COPYRIGHT: true, // 文章版权声明：true 全部显示；false 全部关闭；custom 仅填写 copyright 时显示
  HEXO_ARTICLE_NOT_BY_AI: false, // 显示非AI写作
  HEXO_ARTICLE_RECOMMEND: true, // 文章关联推荐

  HEXO_WIDGET_LATEST_POSTS: true, // 显示最新文章卡
  HEXO_WIDGET_ANALYTICS: false, // 显示统计卡
  HEXO_WIDGET_TO_TOP: true,
  HEXO_WIDGET_TO_COMMENT: true, // 跳到评论区
  HEXO_WIDGET_DARK_MODE: true, // 夜间模式
  HEXO_WIDGET_TOC: true, // 移动端悬浮目录

  HEXO_COLOR_PRIMARY: '#C9A66B',
  HEXO_THEME_COLOR: '#C9A66B', // 主题色配置（默认为 #C9A66B）

  /** 文章详情页客户端切换时，主栏显示卡片+转圈占位（无全屏遮罩；已有独立 LoadingCover 的主题无需此项） */
  HEXO_ARTICLE_ROUTE_LOADING: true,

  // Footer（仅 my-theme；可在 Notion 配置中心用同名键覆盖）
  FOOTER_BRAND_NAME: 'Our Beings（吾在）',
  FOOTER_WAVE_TITLE: 'OurBeing',
  FOOTER_BRAND_SUBTITLE: '吾在',
  FOOTER_TAGLINE: 'A being in the society',
  FOOTER_SLOGAN: '让我们的思想为时代所传唱',
  FOOTER_SLOGAN_2: '让我们的灵魂永世不朽',
  FOOTER_SLOGAN_3: '让我们的存在与世界同在',
  FOOTER_MOTTO: '做 你 · 认 为 · 正 确 · 的 事',
  FOOTER_FAVICON:
    'https://cdn.jsdelivr.net/gh/bgrj/bgrj-images@main/faction2.ico',
  FOOTER_COPYRIGHT: '© 2026-2028 ourbeings.com',
  FOOTER_ABOUT_URL: 'https://ourbeings.com/philosophy/2026/04/01/about',
  FOOTER_COPYRIGHT_URL: 'https://ourbeings.com/copyright',
  FOOTER_LINKS_URL: '/links',
  FOOTER_EMAIL: 'hsz@ourbeings.com',
  FOOTER_WECHAT_ALBUM:
    'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzk0MDQ5NTg3Nw==&action=getalbum&album_id=3925629808377479169#wechat_redirect',
  FOOTER_AFDIAN_URL: 'https://afdian.com/a/ourbeings',
  FOOTER_ALIPAY_QR: 'https://cdn.jsdelivr.net/gh/bgrj/bgrj-images@main/alipay.png',
  FOOTER_WEPAY_QR: 'https://cdn.jsdelivr.net/gh/bgrj/bgrj-images@main/wepay.png',
  FOOTER_ICP_TEXT: '存在者ICP备 2025032878号-1',
  FOOTER_ICP_URL: 'https://ourbeings.com/'
}
export default CONFIG
