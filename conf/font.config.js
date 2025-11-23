/**
 * 网站字体相关配置
 *
 */
module.exports = {
  // START ************网站字体*****************
  
  // 【修复1】移除了 'font-light'。行楷字体在标准粗细下显示效果最好，强制细体可能导致不显示。
  FONT_STYLE: process.env.NEXT_PUBLIC_FONT_STYLE || 'font-sans',

  // 字体CSS 
  FONT_URL: [
    // 【修复2】使用了 "LXGW WenKai Screen" (屏幕优化版) 的较新CDN地址
    'https://npm.elemecdn.com/lxgw-wenkai-screen-webfont/style.css',
    'https://fonts.googleapis.com/css?family=Bitter:300,400,700&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;700&display=swap'
  ],

  // 字体优化配置
  FONT_DISPLAY: process.env.NEXT_PUBLIC_FONT_DISPLAY || 'swap',
  FONT_PRELOAD: process.env.NEXT_PUBLIC_FONT_PRELOAD || true,
  FONT_SUBSET: process.env.NEXT_PUBLIC_FONT_SUBSET || 'chinese-simplified',

  // 无衬线字体
  FONT_SANS: [
    // 【修复3】注意：这里必须用 "LXGW WenKai Screen" 才能匹配上面的CSS
    '"LXGW WenKai Screen"', 
    '"PingFang SC"',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Hiragino Sans GB"',
    '"Microsoft YaHei"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Segoe UI"',
    '"Noto Sans SC"',
    'HarmonyOS_Regular',
    '"Helvetica Neue"',
    'Helvetica',
    '"Source Han Sans SC"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"'
  ],
  
  // 衬线字体
  FONT_SERIF: [
    '"LXGW WenKai Screen"',
    'Bitter',
    '"Noto Serif SC"',
    'SimSun',
    '"Times New Roman"',
    'Times',
    'serif',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Apple Color Emoji"'
  ],
  
  FONT_AWESOME:
    process.env.NEXT_PUBLIC_FONT_AWESOME_PATH ||
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'

  // END ************网站字体*****************
}
