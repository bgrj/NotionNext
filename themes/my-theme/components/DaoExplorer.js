import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useEffect, useMemo, useState } from 'react'
import CONFIG from '../config'
import { articleBackground } from '../readingSettings'

const PERIOD = 7000
const text = value => (typeof value === 'string' ? value : '')
const searchable = post =>
  [
    post.title,
    post.summary,
    post.publishDay,
    post.lastEditedDay,
    ...(Array.isArray(post.tags) ? post.tags : []),
    ...(Array.isArray(post.tagItems) ? post.tagItems.map(tag => tag.name) : [])
  ]
    .map(text)
    .join(' ')
    .toLocaleLowerCase()

export default function DaoExplorer({ daoPosts = [], NOTION_CONFIG }) {
  const [active, setActive] = useState(0)
  const [interaction, setInteraction] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [query, setQuery] = useState('')
  const [showList, setShowList] = useState(false)
  const [limit, setLimit] = useState(12)
  const posts = useMemo(
    () => (Array.isArray(daoPosts) ? daoPosts.filter(post => post?.href) : []),
    [daoPosts]
  )
  const current = posts[active % (posts.length || 1)]
  const found = useMemo(() => {
    const q = query.trim().toLocaleLowerCase()
    return q ? posts.filter(post => searchable(post).includes(q)) : posts
  }, [posts, query])
  const background = articleBackground(
    siteConfig(
      'OURBEINGS_ARTICLE_BACKGROUND',
      CONFIG.OURBEINGS_ARTICLE_BACKGROUND,
      NOTION_CONFIG
    )
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (interaction || reduced || showList || query.trim() || posts.length < 2)
      return undefined
    const timer = window.setInterval(
      () => setActive(index => (index + 1) % posts.length),
      PERIOD
    )
    return () => window.clearInterval(timer)
  }, [interaction, reduced, showList, query, posts.length])
  const move = delta =>
    setActive(index => (index + delta + posts.length) % posts.length)
  const slots =
    posts.length === 1 ? [0] : posts.length === 2 ? [-1, 0] : [-1, 0, 1]
  const listOpen = showList || Boolean(query.trim())
  const cardAt = offset => {
    const post = posts[(active + offset + posts.length) % posts.length]
    const selected = offset === 0
    const slot = offset < 0 ? 'left' : offset > 0 ? 'right' : 'center'
    const body = <CardContent post={post} />
    return (
      <div className={`dao-card dao-slot-${slot}`} key={post.id || post.href}>
        {selected ? (
          <SmartLink
            href={post.href}
            className='dao-card-inner'
            aria-label={`阅读：${post.title}`}
          >
            {body}
          </SmartLink>
        ) : (
          <button
            type='button'
            className='dao-card-inner'
            onClick={() => move(offset)}
            aria-label={`切换到：${post.title}`}
          >
            {body}
          </button>
        )}
      </div>
    )
  }
  const placed = Object.fromEntries(
    slots.map(offset => [
      offset < 0 ? 'left' : offset > 0 ? 'right' : 'center',
      offset
    ])
  )

  return (
    <section
      className='dao-explorer'
      style={{
        backgroundImage: `linear-gradient(rgba(247,242,233,.18), rgba(247,242,233,.34)), url(${JSON.stringify(background)})`
      }}
    >
      <div className='dao-shell'>
        <h1 className='dao-title'>道</h1>
        <div className='dao-toolbar'>
          <button
            type='button'
            className='dao-control'
            aria-expanded={listOpen}
            onClick={() => {
              setShowList(value => !value)
              setQuery('')
              setLimit(12)
            }}
          >
            {listOpen ? '返回卡片' : '文章列表'}
          </button>
          <label className='dao-search'>
            <span className='dao-sr'>搜索「道」的文章</span>
            <span className='dao-search-label' aria-hidden='true'>
              搜索
            </span>
            <input
              type='search'
              value={query}
              onChange={event => {
                setQuery(event.target.value)
                setLimit(12)
              }}
              placeholder='文章、摘要或标签'
            />
          </label>
        </div>
        {!listOpen ? (
          <div
            className='dao-stage'
            onMouseEnter={() => setInteraction(true)}
            onMouseLeave={() => setInteraction(false)}
            onFocusCapture={() => setInteraction(true)}
            onBlurCapture={event => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setInteraction(false)
            }}
          >
            {current ? (
              <>
                <div className='dao-orbit' aria-label='文章卡片轮播'>
                  <button
                    type='button'
                    className='dao-arrow dao-arrow-prev'
                    onClick={() => move(-1)}
                    disabled={posts.length < 2}
                    aria-label='上一篇'
                  >
                    <span aria-hidden='true'>‹</span>
                  </button>
                  {placed.left === undefined ? (
                    <div className='dao-card dao-slot-left' />
                  ) : (
                    cardAt(placed.left)
                  )}
                  {cardAt(placed.center)}
                  {placed.right === undefined ? (
                    <div className='dao-card dao-slot-right' />
                  ) : (
                    cardAt(placed.right)
                  )}
                  <button
                    type='button'
                    className='dao-arrow dao-arrow-next'
                    onClick={() => move(1)}
                    disabled={posts.length < 2}
                    aria-label='下一篇'
                  >
                    <span aria-hidden='true'>›</span>
                  </button>
                </div>
              </>
            ) : (
              <p className='dao-empty'>这里暂时还没有已发布的文章。</p>
            )}
          </div>
        ) : (
          <div className='dao-list-panel'>
            <div className='dao-list-head'>
              <h2>{query.trim() ? '搜索结果' : '全部文章'}</h2>
              <span>{found.length} 篇</span>
            </div>
            {found.length ? (
              <>
                <ul className='dao-list'>
                  {found.slice(0, limit).map(post => (
                    <li key={post.id || post.href}>
                      <SmartLink href={post.href}>
                        <div>
                          <h3>{post.title}</h3>
                          {post.summary && <p>{post.summary}</p>}
                        </div>
                        <span>
                          {post.publishDay || post.lastEditedDay || ''}　↗
                        </span>
                      </SmartLink>
                    </li>
                  ))}
                </ul>
                {limit < found.length && (
                  <button
                    className='dao-more'
                    type='button'
                    onClick={() => setLimit(value => value + 12)}
                  >
                    加载更多
                  </button>
                )}
              </>
            ) : (
              <p className='dao-empty'>
                没有找到匹配的文章，请试试其他关键词。
              </p>
            )}
          </div>
        )}
      </div>
      <style jsx global>{`
        #theme-my-theme.ob-dao-layout,
        .dark #theme-my-theme.ob-dao-layout {
          background: transparent;
        }
        #theme-my-theme.ob-dao-layout #wrapper,
        #theme-my-theme.ob-dao-layout #wrapper.ob-below-nav {
          background: transparent !important;
          padding-top: 0 !important;
          padding-bottom: 0;
        }
        #theme-my-theme.ob-dao-layout .ob-sticky-nav,
        .dark #theme-my-theme.ob-dao-layout .ob-sticky-nav {
          color: #2c241c;
          background: transparent;
          border-bottom-color: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }
        .dark #theme-my-theme.ob-dao-layout .ob-nav-motto-title {
          color: #65451f;
        }
        .dark #theme-my-theme.ob-dao-layout .ob-nav-motto-line {
          color: #594c3b;
        }
        .dao-explorer {
          box-sizing: border-box;
          height: 100vh;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background-size: cover;
          background-position: center top;
          background-attachment: fixed;
          color: #342b23;
          padding: calc(var(--ob-below-nav, 5.25rem) + 4px) 28px 18px;
        }
        .dao-shell {
          width: min(100%, 1180px);
          margin: 0 auto;
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }
        .dao-title {
          margin: 0;
          flex: none;
          text-align: center;
          font-family: Georgia, 'Noto Serif SC', serif;
          font-size: clamp(52px, 8vh, 84px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: 0.16em;
          color: #2f2418;
        }
        .dao-toolbar {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: none;
          gap: 14px;
          width: min(100%, 560px);
          margin: 12px auto 0;
        }
        .dao-control,
        .dao-search,
        .dao-more,
        .dao-arrow,
        button.dao-card-inner {
          font: inherit;
        }
        .dao-control,
        .dao-arrow,
        .dao-more,
        button.dao-card-inner {
          cursor: pointer;
        }
        button.dao-card-inner {
          padding: 0;
        }
        .dao-control,
        .dao-search,
        .dao-more {
          border: 1px solid rgba(82, 66, 49, 0.22);
          background: rgba(255, 252, 246, 0.88);
          color: #342b23;
          border-radius: 999px;
          min-height: 48px;
        }
        .dao-control {
          padding: 0 22px;
          white-space: nowrap;
        }
        .dao-search {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 0;
          padding: 0 18px;
        }
        .dao-search-label {
          font-size: 14px;
          white-space: nowrap;
          color: #574637;
        }
        .dao-search input {
          width: 100%;
          min-width: 0;
          border: 0;
          padding: 0;
          background: transparent;
          outline: none;
          box-shadow: none;
          font-size: 15px;
          color: #342b23;
        }
        .dao-search input::placeholder {
          color: #71675e;
        }
        .dao-stage {
          flex: 1;
          min-height: 0;
          display: flex;
          margin-top: 14px;
        }
        .dao-orbit {
          display: grid;
          grid-template-columns: 64px minmax(0, 0.86fr) minmax(0, 1.05fr) minmax(0, 0.86fr) 64px;
          align-items: end;
          gap: 8px 18px;
          width: min(100%, 1180px);
          height: 100%;
          margin: 0 auto;
        }
        .dao-card {
          height: 100%;
          min-height: 0;
        }
        .dao-arrow {
          width: 56px;
          height: 56px;
          justify-self: center;
          align-self: center;
          border: 0;
          border-radius: 50%;
          background: #3f3126;
          color: #fffaf3;
          font-size: 42px;
          line-height: 0.8;
          box-shadow: 0 12px 28px rgba(48, 32, 18, 0.28);
          cursor: pointer;
        }
        .dao-arrow span {
          display: block;
          transform: translateY(-2px);
        }
        .dao-arrow:hover {
          background: #2a211a;
        }
        .dao-arrow:disabled {
          opacity: 0.35;
          cursor: default;
        }
        .dao-card {
          min-height: 0;
          max-height: 100%;
        }
        .dao-slot-left,
        .dao-slot-right {
          height: 86%;
        }
        .dao-slot-center {
          z-index: 2;
          height: 100%;
        }
        .dao-card-inner {
          display: flex;
          width: 100%;
          height: 100%;
          min-height: 0;
          flex-direction: column;
          text-align: left;
          background: rgba(255, 252, 246, 0.96);
          border: 1px solid rgba(108, 83, 56, 0.22);
          border-radius: 18px;
          overflow: hidden;
          color: #312820;
          box-shadow: 0 16px 36px rgba(61, 42, 25, 0.14);
        }
        .dao-card-inner:hover {
          border-color: #8d6944;
        }
        .dao-cover {
          width: 100%;
          flex: 1 1 auto;
          min-height: 0;
          object-fit: cover;
          background: #e9ddcb;
        }
        .dao-cover-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a08363;
          font-family: serif;
          font-size: 64px;
        }
        .dao-card-copy {
          padding: 14px 16px 12px;
          display: flex;
          flex: none;
          min-height: 0;
          flex-direction: column;
        }
        .dao-card-copy strong {
          font-family: Georgia, 'Noto Serif SC', serif;
          font-size: 18px;
          line-height: 1.4;
          font-weight: 500;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .dao-slot-center .dao-card-copy strong {
          font-size: 22px;
        }
        .dao-card-copy time {
          margin-top: 8px;
          color: #74675a;
          font-size: 13px;
        }
        .dao-list-panel {
          max-width: 920px;
          width: 100%;
          flex: 1;
          min-height: 0;
          margin: 16px auto 0;
          overflow: auto;
          padding: 28px 36px;
          background: rgba(255, 252, 247, 0.94);
          border: 1px solid rgba(94, 75, 53, 0.2);
          border-radius: 16px;
        }
        .dao-list-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #dfd6ca;
          padding-bottom: 15px;
        }
        .dao-list-head h2 {
          font-size: 22px;
        }
        .dao-list-head span {
          color: #6b5f52;
          font-size: 14px;
        }
        .dao-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .dao-list li + li {
          border-top: 1px solid #e8dfd4;
        }
        .dao-list a {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 18px 0;
          color: #342b23;
        }
        .dao-list h3 {
          font-size: 18px;
          font-weight: 600;
        }
        .dao-list p {
          font-size: 14px;
          color: #64594d;
          margin-top: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .dao-list a > span {
          color: #706252;
          white-space: nowrap;
          font-size: 13px;
        }
        .dao-more {
          display: block;
          margin: 20px auto 0;
          padding: 0 25px;
        }
        .dao-empty {
          text-align: center;
          padding: 64px 10px;
          color: #5b4d40;
        }
        .dao-sr {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
        }
        .dao-control:focus-visible,
        .dao-card-inner:focus-visible,
        .dao-arrow:focus-visible,
        .dao-search:focus-within,
        .dao-list a:focus-visible,
        .dao-more:focus-visible {
          outline: 3px solid #88643e;
          outline-offset: 3px;
        }
        @media (max-width: 1100px) {
          .dao-orbit {
            gap: 8px 12px;
            grid-template-columns: 52px minmax(0, 0.9fr) minmax(0, 1.08fr) minmax(0, 0.9fr) 52px;
          }
          .dao-arrow {
            width: 48px;
            height: 48px;
            font-size: 36px;
          }
          .dao-card-copy strong,
          .dao-slot-center .dao-card-copy strong {
            font-size: 17px;
          }
        }
        @media (max-width: 760px) {
          .dao-explorer {
            padding:
              calc(var(--ob-below-nav, 6.5rem) + 2px)
              max(12px, env(safe-area-inset-right))
              max(10px, env(safe-area-inset-bottom))
              max(12px, env(safe-area-inset-left));
            background-attachment: scroll;
            overflow: hidden;
          }
          .dao-title {
            font-size: clamp(40px, 7vh, 60px);
            letter-spacing: 0.12em;
          }
          .dao-toolbar {
            width: 100%;
            margin-top: 8px;
          }
          .dao-search-label {
            display: none;
          }
          .dao-search input {
            font-size: 16px;
          }
          .dao-stage {
            margin-top: 8px;
          }
          .dao-orbit {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          .dao-arrow {
            position: absolute;
            top: 24%;
            z-index: 4;
            width: 44px;
            height: 44px;
            font-size: 34px;
          }
          .dao-arrow-prev {
            left: 0;
          }
          .dao-arrow-next {
            right: 0;
          }
          .dao-card {
            position: absolute;
            top: 0;
            left: 50%;
            width: min(168px, 44vw);
            height: 58%;
          }
          .dao-slot-left,
          .dao-slot-right {
            height: 58%;
          }
          .dao-slot-left {
            transform: translateX(calc(-50% - 34vw)) scale(0.92);
            z-index: 1;
          }
          .dao-slot-right {
            transform: translateX(calc(-50% + 34vw)) scale(0.92);
            z-index: 1;
          }
          .dao-slot-left .dao-card-copy,
          .dao-slot-right .dao-card-copy {
            display: none;
          }
          .dao-slot-center {
            top: 0;
            width: min(280px, calc(100% - 88px));
            height: 100%;
            transform: translateX(-50%);
            z-index: 3;
          }
          .dao-card-inner,
          .dao-slot-center .dao-card-inner {
            min-height: 0;
            height: 100%;
          }
          .dao-card-copy {
            padding: 12px 14px 12px;
          }
          .dao-card-copy strong,
          .dao-slot-center .dao-card-copy strong {
            font-size: 17px;
            line-height: 1.45;
            -webkit-line-clamp: 3;
          }
          .dao-card-copy time {
            font-size: 13px;
          }
          .dao-list-panel {
            margin-top: 10px;
            padding: 16px 14px;
          }
          .dao-list a {
            align-items: flex-start;
            padding: 16px 0;
          }
          .dao-list h3 {
            font-size: 17px;
            line-height: 1.45;
          }
          .dao-list p {
            font-size: 15px;
            line-height: 1.55;
          }
        }
        @media (max-width: 760px) and (max-height: 700px) {
          .dao-title {
            font-size: 36px;
          }
          .dao-toolbar,
          .dao-stage {
            margin-top: 6px;
          }
          .dao-card-copy {
            padding: 10px 12px 8px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .dao-card {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}

function CardContent({ post }) {
  const cover = post.pageCoverThumbnail || post.pageCover
  return (
    <>
      {cover ? (
        <img className='dao-cover' src={cover} alt='' loading='lazy' />
      ) : (
        <div className='dao-cover dao-cover-empty' aria-hidden='true'>
          道
        </div>
      )}
      <div className='dao-card-copy'>
        <strong>{post.title}</strong>
        <time>{post.publishDay || post.lastEditedDay || ''}</time>
      </div>
    </>
  )
}
