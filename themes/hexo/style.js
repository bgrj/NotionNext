/* eslint-disable react/no-unknown-property */
import { siteConfig } from '@/lib/config'
import CONFIG from './config'

/**
 * 这里的css样式只对当前主题生效
 * 主题客制化css
 * @returns
 */
const Style = () => {
  // --- 主题色定义 ---
  const themeColor = siteConfig('HEXO_THEME_COLOR', '#C8A97E', CONFIG) // 暖米色

  return (
    <style jsx global>{`
      :root {
        --theme-color: ${themeColor};
      }

      // 底色
      #theme-hexo body {
        background-color: #f5f5f5;
      }
      .dark #theme-hexo body {
        background-color: #1a1a1a; // 使用深灰色替代纯黑，更柔和
      }

      /* --- 全局覆盖 Tailwind 颜色类 --- */

      /* 覆盖主要的 indigo 文本颜色 */
      #theme-hexo .text-indigo-400,
      #theme-hexo .text-indigo-500,
      #theme-hexo .text-indigo-600,
      #theme-hexo .text-indigo-800 {
        color: var(--theme-color) !important;
      }
      .dark #theme-hexo .dark\:text-indigo-400 {
         color: var(--theme-color) !important;
      }

       /* 覆盖主要的 indigo 背景颜色 */
      #theme-hexo .bg-indigo-400,
      #theme-hexo .bg-indigo-500, /* <<<<< 修复右下角按钮 */
      #theme-hexo .bg-indigo-600 {
        background-color: var(--theme-color) !important;
      }
       .dark #theme-hexo .dark\:bg-indigo-500 { /* <<<<< 修复右下角按钮 (暗色) */
         background-color: var(--theme-color) !important;
      }

      /* 覆盖主要的 indigo 边框颜色 */
      #theme-hexo .border-indigo-400,
      #theme-hexo .border-indigo-500,
      #theme-hexo .border-indigo-800 {
        border-color: var(--theme-color) !important;
      }
       .dark #theme-hexo .dark\:border-indigo-400,
       .dark #theme-hexo .dark\:border-indigo-300 { /* 确保覆盖所有可能的边框 */
         border-color: var(--theme-color) !important;
       }

      /* --- 悬停效果 (保持不变，因为已被覆盖) --- */
      #theme-hexo .menu-link:hover,
      #theme-hexo h2:hover .menu-link,
      .dark #theme-hexo h2:hover .menu-link,
      #theme-hexo li[class*='hover:bg-indigo-500']:hover,
      #theme-hexo a[class*='hover:bg-indigo-400']:hover,
      #theme-hexo i[class*='hover:text-indigo-600']:hover,
      .dark #theme-hexo i[class*='dark:hover:text-indigo-400']:hover,
      #theme-hexo #nav div[class*='hover:text-indigo-600']:hover,
      .dark #theme-hexo #nav div[class*='dark:hover:text-indigo-400']:hover,
      #theme-hexo div[class*='hover:text-indigo-600']:hover,
      #theme-hexo div[class*='hover:text-indigo-400']:hover,
      #theme-hexo a[class*='hover:bg-indigo-600']:hover,
      #theme-hexo div[class*='hover:bg-indigo-500']:hover, // 移动端菜单悬停
      #theme-hexo a[class*='hover:text-indigo-800']:hover,
      .dark #theme-hexo .catalog-item:hover,
      #theme-hexo li[class*='hover:border-indigo-500']:hover,
      #theme-hexo .hover\:bg-blue-600:hover, // 右键菜单
      .dark #theme-hexo li[class*='dark:hover:border-indigo-300']:hover,
      .dark #theme-hexo a[class*='dark:hover:text-indigo-300']:hover {
        color: var(--theme-color) !important; // 文本悬停统一用主题色
        background-color: var(--theme-color) !important; // 背景悬停统一用主题色
        border-color: var(--theme-color) !important; // 边框悬停统一用主题色
        // 对于背景悬停，确保文字颜色对比度足够
        color: white !important;
      }
      // 单独处理菜单下划线
       #theme-hexo .menu-link {
        text-decoration: none;
        background-image: linear-gradient( var(--theme-color), var(--theme-color) );
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 2px;
        transition: background-size 100ms ease-in-out;
      }
       #theme-hexo .menu-link:hover {
         background-size: 100% 2px;
         color: var(--theme-color); // 菜单悬停只改下划线和颜色
         background-color: transparent !important; // 防止背景也被覆盖
         color: var(--theme-color) !important;
       }


      /* --- 特定组件微调 --- */

      /* 暗色模式目录 */
      .dark #theme-hexo .catalog-item {
        color: #a0aec0 !important; /* gray-400 */
        border-color: #a0aec0 !important;
      }
      .dark #theme-hexo .catalog-item.font-bold { /* 当前高亮项 */
        border-color: var(--theme-color) !important;
        color: var(--theme-color) !important;
      }

      /* 暗色模式归档页 */
      .dark #theme-hexo li[class*='dark:border-indigo-400'] {
         border-color: #718096 !important; /* gray-500 */
       }


      /* --- 顶部图片遮罩 (保持减弱状态) --- */
      #theme-hexo .header-cover::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient( to bottom, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.20) 100% );
        pointer-events: none;
      }

      /* Custem */
      .tk-footer { opacity: 0; }

      // 选中字体颜色
      ::selection {
        background: color-mix(in srgb, var(--theme-color) 40%, transparent);
      }

      // 自定义滚动条 (使用新主题色)
      ::-webkit-scrollbar { width: 5px; height: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background-color: var(--theme-color); border-radius: 5px; }
      * { scrollbar-width: thin; scrollbar-color: var(--theme-color) transparent; }

    `}</style>
  )
}

export { Style }

