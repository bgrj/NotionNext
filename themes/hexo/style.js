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
        background-color: #1a1a1a; // 深灰
      }

      /* --- 全局强制覆盖 Tailwind Indigo 颜色类 --- */

      /* 覆盖所有 indigo 文本颜色 */
      #theme-hexo .text-indigo-300,
      #theme-hexo .text-indigo-400,
      #theme-hexo .text-indigo-500,
      #theme-hexo .text-indigo-600,
      #theme-hexo .text-indigo-800 {
        color: var(--theme-color) !important;
      }
      /* 暗色模式下的 indigo 文本颜色 */
      .dark #theme-hexo .dark\:text-indigo-300,
      .dark #theme-hexo .dark\:text-indigo-400 {
         color: var(--theme-color) !important;
      }

       /* 覆盖所有 indigo 背景颜色 */
      #theme-hexo .bg-indigo-300,
      #theme-hexo .bg-indigo-400,
      #theme-hexo .bg-indigo-500, /* <<<<< 强制覆盖按钮 */
      #theme-hexo .bg-indigo-600 {
        background-color: var(--theme-color) !important;
      }
       /* 暗色模式下的 indigo 背景颜色 */
       .dark #theme-hexo .dark\:bg-indigo-500 { /* <<<<< 强制覆盖按钮 (暗色) */
         background-color: var(--theme-color) !important;
      }

      /* 覆盖所有 indigo 边框颜色 */
      #theme-hexo .border-indigo-300,
      #theme-hexo .border-indigo-400,
      #theme-hexo .border-indigo-500,
      #theme-hexo .border-indigo-800 {
        border-color: var(--theme-color) !important;
      }
       /* 暗色模式下的 indigo 边框颜色 */
       .dark #theme-hexo .dark\:border-indigo-300,
       .dark #theme-hexo .dark\:border-indigo-400,
       .dark #theme-hexo .dark\:border-white { /* 同时覆盖可能的白色边框 */
         border-color: var(--theme-color) !important;
       }

      /* --- 悬停效果 (确保也被覆盖) --- */
      #theme-hexo .hover\:bg-indigo-400:hover,
      #theme-hexo .hover\:bg-indigo-500:hover,
      #theme-hexo .hover\:bg-indigo-600:hover,
      #theme-hexo .hover\:bg-blue-600:hover { /* 覆盖可能的 blue 类 */
        background-color: var(--theme-color) !important;
        color: white !important; /* 背景悬停时文字变白 */
      }

      #theme-hexo .hover\:text-indigo-300:hover,
      #theme-hexo .hover\:text-indigo-400:hover,
      #theme-hexo .hover\:text-indigo-600:hover,
      #theme-hexo .hover\:text-indigo-800:hover {
        color: var(--theme-color) !important;
      }

      .dark #theme-hexo .dark\:hover\:text-indigo-300:hover,
      .dark #theme-hexo .dark\:hover\:text-indigo-400:hover {
         color: var(--theme-color) !important;
      }

      #theme-hexo .hover\:border-indigo-300:hover,
      #theme-hexo .hover\:border-indigo-500:hover {
         border-color: var(--theme-color) !important;
      }

      .dark #theme-hexo .dark\:hover\:border-indigo-300:hover {
         border-color: var(--theme-color) !important;
       }

      /* --- 单独处理菜单下划线 --- */
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
         color: var(--theme-color); // 只改颜色和下划线
         background-color: transparent !important; // 防止应用背景色
       }
       /* 文章列表标题悬停 */
       #theme-hexo h2:hover .menu-link {
         color: var(--theme-color) !important;
         background-color: transparent !important;
       }

      /* --- 特定组件微调 --- */
      /* 暗色模式目录 */
      .dark #theme-hexo .catalog-item { color: #a0aec0 !important; border-color: #a0aec0 !important; }
      .dark #theme-hexo .catalog-item.font-bold { border-color: var(--theme-color) !important; color: var(--theme-color) !important; }
      .dark #theme-hexo .catalog-item:hover { color: var(--theme-color) !important; } // 确保悬停颜色正确

      /* 暗色模式归档页 */
      .dark #theme-hexo li[class*='dark:border-indigo-400'] { border-color: #718096 !important; }


      /* --- 顶部图片遮罩 (保持减弱状态) --- */
      #theme-hexo .header-cover::before {
        content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: linear-gradient( to bottom, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.20) 100% );
        pointer-events: none;
      }

      /* Custem */
      .tk-footer { opacity: 0; }

      // 选中字体颜色
      ::selection { background: color-mix(in srgb, var(--theme-color) 40%, transparent); }

      // --- 自定义滚动条 (再次确认强制覆盖) ---
      ::-webkit-scrollbar { width: 5px !important; height: 5px !important; }
      ::-webkit-scrollbar-track { background: transparent !important; }
      ::-webkit-scrollbar-thumb { background-color: var(--theme-color) !important; border-radius: 5px !important; }
      * { scrollbar-width: thin !important; scrollbar-color: var(--theme-color) transparent !important; }

    `}</style>
  )
}

export { Style }

