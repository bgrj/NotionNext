/** A calm paper surface and a bounded text column for Dao long reads. */
export default function DaoReadingStyle() {
  return (
    <style jsx global>{`
      #theme-my-theme.ob-dao-reading.ob-article-layout {
        --ob-paper: #faf7f0;
        --ob-ink: #332e27;
        --ob-muted: #716557;
        --ob-rule: #ded5c6;
        --ob-link: #79521f;
        --ob-inset: #f1ebdf;
        background: #eee8dd;
        color: var(--ob-ink);
      }
      .dark #theme-my-theme.ob-dao-reading.ob-article-layout {
        --ob-paper: #222421;
        --ob-ink: #e2dfd6;
        --ob-muted: #b8b2a7;
        --ob-rule: #46483f;
        --ob-link: #dec089;
        --ob-inset: #2c2f29;
        background: #191c18;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout::before {
        opacity: 0.12;
      }
      .dark #theme-my-theme.ob-dao-reading.ob-article-layout::before {
        opacity: 0.06;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-sticky-nav {
        background: var(--ob-paper) !important;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        border-bottom: 1px solid var(--ob-rule);
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-hero {
        position: relative;
        isolation: isolate;
        padding: calc(var(--ob-home-nav-height, 64px) + 1.5rem) 1.5rem 2.75rem;
        overflow: hidden;
        background: var(--ob-paper);
        border-bottom: 1px solid var(--ob-rule);
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-cover {
        width: 100%;
        height: clamp(240px, 30vw, 420px);
        margin: 1.25rem auto 0;
        overflow: hidden;
        border-radius: 10px;
        background: var(--ob-inset);
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-cover > div {
        height: 100%;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-cover img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-heading {
        max-width: 64rem;
        margin: auto;
        text-align: center;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-nav {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-contents {
        min-height: 44px;
        padding: 0.4rem 0.8rem;
        border: 1px solid var(--ob-rule);
        border-radius: 6px;
        font-size: 14px;
        font-weight: 400;
        color: var(--ob-link);
        background: var(--ob-paper);
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-back {
        display: inline-flex;
        align-items: center;
        min-height: 44px;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.08em;
        color: var(--ob-link);
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-heading h1 {
        max-width: 50rem;
        margin: 1.75rem auto 1.25rem;
        font-size: clamp(1.75rem, 3.3vw, 2.6rem);
        font-weight: 600;
        line-height: 1.5;
        letter-spacing: 0.015em;
        color: var(--ob-ink);
        overflow-wrap: anywhere;
        text-wrap: pretty;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-meta {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.35rem 1.25rem;
        font-size: 14px;
        line-height: 1.8;
        font-weight: 400;
        color: var(--ob-muted);
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-stats {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.4rem 1.5rem;
        margin-top: 0.65rem;
        font-size: 14px;
        line-height: 1.8;
        font-weight: 400;
        color: var(--ob-muted);
        font-variant-numeric: tabular-nums;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-reading-stats
        span
        span {
        margin-left: 0.25rem;
        color: var(--ob-ink);
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-article-card {
        max-width: 52rem;
        margin-inline: auto;
        padding: 2.5rem 3.5rem 2rem;
        border-inline: 1px solid var(--ob-rule);
        background: var(--ob-paper);
        color: var(--ob-ink);
      }
      .dark #theme-my-theme.ob-dao-reading.ob-article-layout .ob-article-card {
        background: var(--ob-paper);
        color: var(--ob-ink);
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-article-content {
        overflow: visible;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-article-body,
      .dark #theme-my-theme.ob-dao-reading.ob-article-layout .ob-article-body {
        --fg-color: var(--ob-ink) !important;
        --fg-color-2: var(--ob-muted) !important;
        --fg-color-3: var(--ob-muted) !important;
        --notion-gray: var(--ob-muted) !important;
        color: var(--ob-ink);
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion {
        font-family:
          -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
          'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif !important;
        font-size: 19px;
        font-weight: 400;
        line-height: 1.95;
        letter-spacing: 0.025em;
        -webkit-font-smoothing: antialiased;
        overflow-wrap: anywhere;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-page {
        padding: 0;
        line-height: 1.95;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-text {
        padding: 0 !important;
        margin: 0 0 1.15em !important;
        line-height: inherit;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-h {
        margin: 2.25em 0 0.85em;
        padding: 0;
        line-height: 1.55;
        font-weight: 600;
        color: var(--ob-ink);
        scroll-margin-top: calc(var(--ob-home-nav-height, 64px) + 1.5rem);
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-h1 {
        font-size: 1.6em;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-h2 {
        font-size: 1.35em;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-h3 {
        font-size: 1.15em;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-list {
        margin: 0 0 1.15em;
        padding-inline-start: 1.5em;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-list
        li {
        margin: 0.4em 0;
        padding-inline-start: 0.2em;
        line-height: 1.9;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-list
        .notion-list {
        margin: 0.4em 0;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-quote {
        margin: 1.6em 0;
        padding: 0.3em 0 0.3em 1.1em;
        border-left: 3px solid var(--ob-rule);
        font-size: 1em;
        line-height: 1.95;
        color: var(--ob-muted);
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-callout {
        margin: 1.5em 0;
        padding: 1em 1.1em;
        border: 1px solid var(--ob-rule);
        border-radius: 6px;
        background: var(--ob-inset) !important;
        line-height: 1.9;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-callout-text
        .notion-text {
        margin: 0 !important;
        line-height: 1.9 !important;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-callout-text {
        min-width: 0;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-link {
        color: var(--ob-link);
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 0.2em;
        border-bottom: 0;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        :is(pre, .notion-table, .notion-simple-table) {
        max-width: 100%;
        overflow-x: auto;
        overflow-wrap: normal;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-article-body pre {
        font-size: 0.82em;
        line-height: 1.75;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-asset-wrapper {
        max-width: 100% !important;
        margin: 1.75em auto;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        :is(img, video, iframe) {
        max-width: 100%;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-article-body
        .notion-asset-caption {
        font-size: 0.8em;
        line-height: 1.75;
        color: var(--ob-muted);
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-article-body strong {
        font-weight: 600;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-article-comments {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--ob-rule);
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-footer-nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 1rem;
        padding-top: 1.5rem;
        margin-top: 2rem;
        border-top: 1px solid var(--ob-rule);
        font-size: 15px;
        color: var(--ob-link);
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        .ob-reading-footer-nav
        a {
        display: inline-flex;
        min-height: 44px;
        align-items: center;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout .ob-nav-wave-char {
        animation: none !important;
      }
      #theme-my-theme.ob-dao-reading.ob-article-layout
        :is(a, button):focus-visible {
        outline: 2px solid var(--ob-link);
        outline-offset: 4px;
      }
      @media (max-width: 767px) {
        #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-tools {
          display: none;
        }
        #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-cover {
          height: clamp(180px, 52vw, 300px);
          margin-top: 1rem;
        }
        #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-stats {
          font-size: 13px;
          gap: 0.35rem 1rem;
        }
        #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-hero {
          padding: calc(var(--ob-home-nav-height, 92px) + 1.5rem) 1.25rem 2rem;
        }
        #theme-my-theme.ob-dao-reading.ob-article-layout
          .ob-reading-heading
          h1 {
          margin-top: 0.75rem;
          font-size: 28px;
          line-height: 1.5;
        }
        #theme-my-theme.ob-dao-reading.ob-article-layout .ob-article-card {
          padding: 1.75rem 1.25rem 1.5rem;
          border-inline: 0;
        }
        #theme-my-theme.ob-dao-reading.ob-article-layout
          .ob-article-body
          .notion,
        #theme-my-theme.ob-dao-reading.ob-article-layout
          .ob-article-body
          .notion-page {
          font-size: 18px;
          line-height: 1.9;
          letter-spacing: 0.015em;
        }
        #theme-my-theme.ob-dao-reading.ob-article-layout
          .ob-article-body
          .notion-text {
          margin-bottom: 1.05em !important;
        }
        #theme-my-theme.ob-dao-reading.ob-article-layout
          .ob-article-body
          .notion-h {
          margin-top: 1.8em;
        }
        #theme-my-theme.ob-dao-reading.ob-article-layout .ob-reading-meta {
          font-size: 13px;
        }
      }
    `}</style>
  )
}
