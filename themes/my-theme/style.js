/* eslint-disable react/no-unknown-property */
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'
import { siteConfig } from '@/lib/config'
import CONFIG from './config'

/**
 * 这里的css样式只对当前主题生效
 * 主题客制化css
 * @returns
 */
const Style = () => {
  // 从配置中获取主题色，如果没有配置则使用默认值 #C9A66B
  const legacyThemeColor = siteConfig('HEXO_THEME_COLOR', '#C9A66B', CONFIG)
  const primary = siteConfig('HEXO_COLOR_PRIMARY', legacyThemeColor, CONFIG)
  const primaryDark = siteConfig('HEXO_COLOR_PRIMARY_DARK', primary, CONFIG)
  const background = siteConfig('HEXO_COLOR_BG', '#f5f5f5', CONFIG)
  const backgroundDark = siteConfig('HEXO_COLOR_BG_DARK', '#000000', CONFIG)
  const surface = siteConfig('HEXO_COLOR_CARD', '#ffffff', CONFIG)
  const surfaceDark = siteConfig('HEXO_COLOR_CARD_DARK', '#101414', CONFIG)
  const title = siteConfig('HEXO_COLOR_TITLE', '#4b5563', CONFIG)
  const titleDark = siteConfig('HEXO_COLOR_TITLE_DARK', '#f3f4f6', CONFIG)
  const text = siteConfig('HEXO_COLOR_TEXT', '#374151', CONFIG)
  const textDark = siteConfig('HEXO_COLOR_TEXT_DARK', '#d1d5db', CONFIG)
  const textSecondary = siteConfig('HEXO_COLOR_TEXT_SECONDARY', '#9ca3af', CONFIG)
  const textSecondaryDark = siteConfig('HEXO_COLOR_TEXT_SECONDARY_DARK', '#6b7280', CONFIG)
  const border = siteConfig('HEXO_COLOR_BORDER', '#e5e7eb', CONFIG)
  const borderDark = siteConfig('HEXO_COLOR_BORDER_DARK', '#000000', CONFIG)

  return (
    <style jsx global>{`
      #theme-my-theme {
        --hexo-color-primary-light: ${primary};
        --hexo-color-primary-dark: ${primaryDark};
        --hexo-color-bg-light: ${background};
        --hexo-color-bg-dark: ${backgroundDark};
        --hexo-color-card-light: ${surface};
        --hexo-color-card-dark: ${surfaceDark};
        --hexo-color-title-light: ${title};
        --hexo-color-title-dark: ${titleDark};
        --hexo-color-text-light: ${text};
        --hexo-color-text-dark: ${textDark};
        --hexo-color-text-secondary-light: ${textSecondary};
        --hexo-color-text-secondary-dark: ${textSecondaryDark};
        --hexo-color-border-light: ${border};
        --hexo-color-border-dark: ${borderDark};
        --theme-color: var(--hexo-color-primary-light);
        --hexo-color-bg: var(--hexo-color-bg-light);
        --hexo-color-card: var(--hexo-color-card-light);
        --hexo-color-title: var(--hexo-color-title-light);
        --hexo-color-text: var(--hexo-color-text-light);
        --hexo-color-text-secondary: var(--hexo-color-text-secondary-light);
        --hexo-color-border: var(--hexo-color-border-light);
      }

      .dark #theme-my-theme {
        --theme-color: var(--hexo-color-primary-dark);
        --hexo-color-bg: var(--hexo-color-bg-dark);
        --hexo-color-card: var(--hexo-color-card-dark);
        --hexo-color-title: var(--hexo-color-title-dark);
        --hexo-color-text: var(--hexo-color-text-dark);
        --hexo-color-text-secondary: var(--hexo-color-text-secondary-dark);
        --hexo-color-border: var(--hexo-color-border-dark);
      }

      #theme-my-theme,
      #theme-my-theme .bg-hexo-background-gray {
        background-color: var(--hexo-color-bg);
      }

      #theme-my-theme #blog-post-card,
      #theme-my-theme .card,
      #theme-my-theme #announcement-wrapper,
      #theme-my-theme .article {
        background-color: var(--hexo-color-card);
        border-color: var(--hexo-color-border);
      }

      #theme-my-theme #blog-post-card h2 .menu-link {
        color: var(--hexo-color-title);
      }

      #theme-my-theme #blog-post-card main,
      #theme-my-theme #blog-post-card p {
        color: var(--hexo-color-text);
      }

      #theme-my-theme #blog-post-card .text-gray-400 {
        color: var(--hexo-color-text-secondary);
      }

      /*  菜单下划线动画 */
      #theme-my-theme .menu-link {
        text-decoration: none;
        background-image: linear-gradient(
          var(--theme-color),
          var(--theme-color)
        );
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 2px;
        transition: background-size 100ms ease-in-out;
      }

      #theme-my-theme .menu-link:hover {
        background-size: 100% 2px;
        color: var(--theme-color);
      }

      /* 文章列表中标题行悬浮时的文字颜色 */
      #theme-my-theme h2:hover .menu-link {
        color: var(--theme-color) !important;
      }
      .dark #theme-my-theme h2:hover .menu-link {
        color: var(--theme-color) !important;
      }

      /* 下拉菜单悬浮背景色 */
      #theme-my-theme li[class*='hover:bg-indigo-500']:hover {
        background-color: var(--theme-color) !important;
      }

      /* tag标签悬浮背景色 */
      #theme-my-theme a[class*='hover:bg-indigo-400']:hover {
        background-color: var(--theme-color) !important;
      }

      /* 社交按钮悬浮颜色 */
      #theme-my-theme i[class*='hover:text-indigo-600']:hover {
        color: var(--theme-color) !important;
      }
      .dark #theme-my-theme i[class*='dark:hover:text-indigo-400']:hover {
        color: var(--theme-color) !important;
      }

      /* MenuGroup 悬浮颜色 */
      #theme-my-theme #nav div[class*='hover:text-indigo-600']:hover {
        color: var(--theme-color) !important;
      }
      .dark #theme-my-theme #nav div[class*='dark:hover:text-indigo-400']:hover {
        color: var(--theme-color) !important;
      }

      /* 最新发布文章悬浮颜色 */
      #theme-my-theme div[class*='hover:text-indigo-600']:hover,
      #theme-my-theme div[class*='hover:text-indigo-400']:hover {
        color: var(--theme-color) !important;
      }

      /* 分页组件颜色 */
      #theme-my-theme .text-indigo-400 {
        color: var(--theme-color) !important;
      }
      #theme-my-theme .border-indigo-400 {
        border-color: var(--theme-color) !important;
      }
      #theme-my-theme a[class*='hover:bg-indigo-400']:hover {
        background-color: var(--theme-color) !important;
        color: white !important;
      }
      /* 移动设备下，搜索组件中选中分类的高亮背景色 */
      #theme-my-theme div[class*='hover:bg-indigo-400']:hover {
        background-color: var(--theme-color) !important;
      }
      #theme-my-theme .hover\\:bg-indigo-400:hover {
        background-color: var(--theme-color) !important;
      }
      #theme-my-theme .bg-indigo-400 {
        background-color: var(--theme-color) !important;
      }
      #theme-my-theme a[class*='hover:bg-indigo-600']:hover {
        background-color: var(--theme-color) !important;
        color: white !important;
      }

      /* 右下角悬浮按钮背景色 */
      #theme-my-theme .bg-indigo-500 {
        background-color: var(--theme-color) !important;
      }
      .dark #theme-my-theme .dark\\:bg-indigo-500 {
        background-color: var(--theme-color) !important;
      }

      // 移动设备菜单栏选中背景色
      #theme-my-theme div[class*='hover:bg-indigo-500']:hover {
        background-color: var(--theme-color) !important;
      }

      /* 文章浏览进度条颜色 */
      #theme-my-theme .bg-indigo-600 {
        background-color: var(--theme-color) !important;
      }
      /* 当前浏览位置标题高亮颜色 */
      #theme-my-theme .border-indigo-800 {
        border-color: var(--theme-color) !important;
      }
      #theme-my-theme .text-indigo-800 {
        color: var(--theme-color) !important;
      }
      .dark #theme-my-theme .dark\\:text-indigo-400 {
        color: var(--theme-color) !important;
      }
      .dark #theme-my-theme .dark\\:border-indigo-400 {
        border-color: var(--theme-color) !important;
      }
      .dark #theme-my-theme .dark\\:border-white {
        border-color: var(--theme-color) !important;
      }
      /* 目录项悬浮时的字体颜色 */
      #theme-my-theme a[class*='hover:text-indigo-800']:hover {
        color: var(--theme-color) !important;
      }
      /* 深色模式下目录项的默认文字颜色和边框线颜色 */
      .dark #theme-my-theme .catalog-item {
        color: white !important;
        border-color: white !important;
      }
      .dark #theme-my-theme .catalog-item:hover {
        color: var(--theme-color) !important;
      }
      /* 深色模式下当前高亮标题的边框线颜色 */
      .dark #theme-my-theme .catalog-item.font-bold {
        border-color: var(--theme-color) !important;
      }

      /* 文章底部版权声明组件左侧边框线颜色 */
      #theme-my-theme .border-indigo-500 {
        border-color: var(--theme-color) !important;
      }

      /* 归档页面文章列表项悬浮时左侧边框线颜色 */
      #theme-my-theme li[class*='hover:border-indigo-500']:hover {
        border-color: var(--theme-color) !important;
      }

      /* 自定义右键菜单悬浮高亮颜色 */
      #theme-my-theme .hover\\:bg-blue-600:hover {
        background-color: var(--theme-color) !important;
      }
      .dark #theme-my-theme li[class*='dark:hover:border-indigo-300']:hover {
        border-color: var(--theme-color) !important;
      }
      /* 深色模式下，归档页面文章列表项默认状态左侧边框线颜色 */
      .dark #theme-my-theme li[class*='dark:border-indigo-400'] {
        border-color: var(--theme-color) !important;
      }
      /* 深色模式下，归档页面文章标题悬浮时的文字颜色 */
      .dark #theme-my-theme a[class*='dark:hover:text-indigo-300']:hover {
        color: var(--theme-color) !important;
      }

      /* 设置了从上到下的渐变黑色 */
      #theme-my-theme .header-cover::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 0.2) 10%,
          rgba(0, 0, 0, 0) 25%,
          rgba(0, 0, 0, 0.2) 75%,
          rgba(0, 0, 0, 0.5) 100%
        );
      }

      /* Custem */
      .tk-footer {
        opacity: 0;
      }

      // 选中字体颜色
      ::selection {
        background: color-mix(in srgb, var(--theme-color) 30%, transparent);
      }

      // 自定义滚动条
      ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background-color: var(--theme-color);
      }

      * {
        scrollbar-width: thin;
        scrollbar-color: var(--theme-color) transparent;
      }

      ${themeConsoleStyle('hexo', CONFIG)}

      #theme-my-theme #home-nav-button a {
        color: #fff !important;
      }

      #theme-my-theme #home-nav-button a:hover {
        color: #000 !important;
      }

      /* 左右栏拉开，避免 flex-row-reverse + space-x 贴死 */
      #theme-my-theme #container-inner {
        gap: 0;
      }
      @media (min-width: 1024px) {
        #theme-my-theme #container-inner {
          gap: 2.5rem;
          align-items: stretch; /* 侧栏拉满主栏高度，sticky 才站得住 */
        }
      }

      /* 公告 / 侧栏与页脚分离；文章页、上锁页共用 */
      #theme-my-theme #wrapper {
        padding-bottom: 3.5rem;
      }
      @media (min-width: 768px) {
        #theme-my-theme #wrapper {
          padding-bottom: 4.5rem;
        }
      }

      /* 桌面：左侧栏随正文滚动时钉在顶栏下方，不跟着文章滑没 */
      @media (min-width: 1024px) {
        #theme-my-theme #sideRight {
          align-self: stretch;
        }
        #theme-my-theme #sideRight > div {
          position: sticky;
          top: 5rem; /* 避开固定页眉，避免板块贴着顶栏 */
        }
      }

      /* 手机：侧栏改堆在正文下方，不悬浮遮挡阅读 */
      @media (max-width: 1023px) {
        #theme-my-theme #sideRight {
          margin-top: 1.5rem;
          margin-bottom: 0.25rem;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        #theme-my-theme #sideRight > div {
          position: static;
          top: auto;
        }
      }

      /* 友情链接页：去掉默认侧栏，主栏铺满剩余宽度 */
      #theme-my-theme.ob-fl-layout #sideRight {
        display: none !important;
      }
      #theme-my-theme.ob-fl-layout #container-inner {
        max-width: none;
        justify-content: stretch;
      }
      #theme-my-theme.ob-fl-layout #container-inner > div {
        max-width: none;
        overflow: visible;
      }

      /* 公告改为弹窗后，侧栏卡片不再出现 */
      #theme-my-theme #announcement-wrapper {
        display: none !important;
      }

      .ob-notice-modal {
        position: fixed;
        inset: 0;
        z-index: 90;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: max(12px, env(safe-area-inset-top, 0px))
          max(16px, env(safe-area-inset-right, 0px))
          max(16px, env(safe-area-inset-bottom, 0px))
          max(16px, env(safe-area-inset-left, 0px));
      }

      .ob-notice-backdrop {
        position: absolute;
        inset: 0;
        border: 0;
        padding: 0;
        margin: 0;
        cursor: pointer;
        background: rgba(20, 16, 12, 0.48);
        backdrop-filter: blur(4px);
      }

      .ob-notice-panel {
        position: relative;
        z-index: 1;
        width: min(36rem, 100%);
        max-height: min(88dvh, 40rem);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: var(--hexo-color-card, #fff);
        color: var(--hexo-color-text, #374151);
        border: 1px solid var(--hexo-color-border, #e5e7eb);
        border-radius: 1rem;
        box-shadow: 0 24px 64px rgba(28, 22, 16, 0.22);
      }

      .ob-notice-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 14px 16px 10px;
        border-bottom: 1px solid var(--hexo-color-border, #e5e7eb);
      }

      .ob-notice-kicker {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.95rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        color: var(--hexo-color-title, #4b5563);
      }

      .ob-notice-kicker i {
        color: var(--ob-notice-accent, var(--theme-color, #C9A66B));
      }

      .ob-notice-x {
        width: 40px;
        height: 40px;
        flex: none;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--hexo-color-text-secondary, #9ca3af);
        cursor: pointer;
      }

      .ob-notice-x:focus-visible,
      .ob-notice-enter:focus-visible {
        outline: 2px solid var(--ob-notice-accent, #C9A66B);
        outline-offset: 2px;
      }

      .ob-notice-body {
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        padding: 8px 18px 6px;
        font-size: 16px;
        line-height: 1.75;
      }

      .ob-notice-motto {
        margin: 0.4rem 0 0.75rem;
        text-align: center;
        font-size: 1.02rem;
        line-height: 1.7;
        color: var(--hexo-color-title, #4b5563);
      }

      .ob-notice-stamp {
        margin: 0 0 0.9rem;
        font-size: 13px;
        letter-spacing: 0.02em;
        color: var(--hexo-color-text-secondary, #9ca3af);
      }

      .ob-notice-lead {
        font-weight: 600;
      }

      .ob-notice-body p {
        margin: 0 0 0.75rem;
      }

      .ob-notice-label {
        display: block;
        margin-bottom: 0.15rem;
        font-size: 12px;
        letter-spacing: 0.12em;
        color: var(--hexo-color-text-secondary, #9ca3af);
      }

      .ob-notice-body a {
        color: var(--ob-notice-accent, var(--theme-color, #C9A66B));
        text-decoration: underline;
        text-underline-offset: 0.18em;
        word-break: break-word;
      }

      .ob-notice-body #notion-article.ob-notice-notion {
        margin: 0;
        overflow: visible;
      }

      .ob-notice-body .notion-page,
      .ob-notice-body .notion {
        width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      .ob-notice-body h1,
      .ob-notice-body h2,
      .ob-notice-body h3 {
        font-size: 1.05rem !important;
        margin: 1rem 0 0.4rem !important;
      }

      .ob-notice-body p,
      .ob-notice-body li {
        font-size: 15.5px !important;
        line-height: 1.75 !important;
      }

      .ob-notice-foot {
        flex: none;
        padding: 10px 16px 14px;
        border-top: 1px solid var(--hexo-color-border, #e5e7eb);
        background: var(--hexo-color-card, #fff);
      }

      .ob-notice-enter {
        display: block;
        width: 100%;
        min-height: 44px;
        border: 0;
        border-radius: 999px;
        cursor: pointer;
        font-size: 15px;
        letter-spacing: 0.08em;
        color: #fff;
        background: var(--ob-notice-accent, var(--theme-color, #C9A66B));
      }

      @media (max-width: 640px) {
        .ob-notice-panel {
          max-height: min(92dvh, 100%);
          border-radius: 0.9rem;
        }
        .ob-notice-body {
          padding: 4px 14px 4px;
          font-size: 15.5px;
        }
        .ob-notice-x {
          width: 44px;
          height: 44px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .ob-notice-backdrop,
        .ob-notice-panel {
          transition: none !important;
        }
      }
  `}</style>
  )
}

export { Style }
