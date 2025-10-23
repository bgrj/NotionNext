/**
 * 社交按钮相关的配置同意放这
 */
module.exports = {
  // 社交链接，不需要可留空白，例如 CONTACT_WEIBO:''
  CONTACT_EMAIL:
    (process.env.NEXT_PUBLIC_CONTACT_EMAIL &&
      btoa(
        unescape(encodeURIComponent(process.env.NEXT_PUBLIC_CONTACT_EMAIL))
      )) ||
    'Ymdyai5leGlzdGVudGlhbC50aGlua2luZ0BnbWFpbC5jb20=', // 邮箱地址 例如mail@tangly1024.com
  CONTACT_TELEGRAM: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || 'https://t.me/+G_DTb1YKTYs3MDE1', // 电报群
  CONTACT_THREADS: process.env.NEXT_PUBLIC_CONTACT_THREADS || 'https://www.threads.com/@bu.guo.ren.jian', // 脆主页
  CONTACT_WHATSAPP: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || 'https://chat.whatsapp.com/BsQWGqCYYaTCw7khlsq4gx?mode=wwc', // Whatsapp群
  CONTACT_WEHCHAT_PUBLIC: process.env.NEXT_PUBLIC_CONTACT_WEHCHAT_PUBLIC || 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzk0MDQ5NTg3Nw==#wechat_redirect' // 微信公众号 格式：https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=【xxxxxx】==#wechat_redirect
}
