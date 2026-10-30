/**
 * 首次访问弹窗文案。
 * 定位、箴言、关于页链接写在这里。
 * 「最近」一篇由 NoticeModal 按站点已发布 Post 自动取最新，不需每次发文再改仓库。
 */
export const NOTICE_VERSION = '2026-09-27-18'

export const NOTICE = {
  title: '公告',
  mottoLines: ['我们的所选、所信、所践，', '塑造了我们之所是'],
  updatedAt: '实验站说明｜2026年10月31日',
  lead:
    '与自己周旋，与他人相处，在世界里慢慢安放自己。',
  body: [
    '我们的存在，让阅读活动与公开分享相遇。我的存在，是每个人自己的生命日志、图书馆、影像馆与音频馆。道，留下长期的追问；术，整理当下有用的方法。',
    '新记录默认私密，主动提交并通过审核后才进入公开阅读。实验版的云端保存状态会在页面提示；功能导览使用虚构账号与示例，只保存在当前浏览器。'
  ],
  recentLabel: '最近',
  recent: {
    date: '2026年10月31日',
    title: '从这里开始：自己的空间，与我们的相遇',
    href: '/our-beings/app/about'
  },
  album: {
    title: '微信公众号合集',
    href: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzk0MDQ5NTg3Nw==&action=getalbum&album_id=3925629808377479169#wechat_redirect'
  },
  aboutLabel: '把这个站的中心看清楚',
  about: {
    title: '关于 Our Being',
    href: '/our-beings/app/about'
  }
}

export const NOTICE_RECENT_EXCLUDE_SLUGS = ['about']
