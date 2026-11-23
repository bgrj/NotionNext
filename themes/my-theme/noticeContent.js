/**
 * 首次访问弹窗文案。
 * 定位、箴言、关于页链接写在这里。
 * 「最近」一篇由 NoticeModal 按站点已发布 Post 自动取最新，不需每次发文再改仓库。
 */
export const NOTICE_VERSION = '2026-09-27-18'

export const NOTICE = {
  title: '公告',
  mottoLines: ['我们的所选、所信、所践，', '塑造了我们之所是'],
  updatedAt: '思想定位更新｜2026年9月26日20时',
  lead: 'Our Being 不是个人博客，也不是知识付费铺子。它是一处长期公共思想实践。',
  body: [
    '这个站有四类：道、术、我的存在、我们的存在。',
    '「道」收录已经写出的思想；「术」暂时进入雅思练习。「我们的存在」现已开放吾在网页版，可以浏览阅读与交流活动，登录后发起、预约和参与活动交流群。「我的存在」仍在准备中。'
  ],
  recentLabel: '最近',
  recent: {
    date: '2026年9月27日',
    title: '把一本英文小说拆成学习资料以后：怎样读，什么才能卖',
    href: 'https://ourbeings.com/tools/2026/09/27/diy2'
  },
  album: {
    title: '微信公众号合集',
    href: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzk0MDQ5NTg3Nw==&action=getalbum&album_id=3925629808377479169#wechat_redirect'
  },
  aboutLabel: '把这个站的中心看清楚',
  about: {
    title: '关于 Our Being',
    href: 'https://ourbeings.com/philosophy/2026/04/01/about'
  }
}

export const NOTICE_RECENT_EXCLUDE_SLUGS = ['about']
