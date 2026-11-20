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
  const [paused, setPaused] = useState(false)
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
    if (
      paused ||
      interaction ||
      reduced ||
      showList ||
      query.trim() ||
      posts.length < 2
    )
      return undefined
    const timer = window.setInterval(
      () => setActive(index => (index + 1) % posts.length),
      PERIOD
    )
    return () => window.clearInterval(timer)
  }, [paused, interaction, reduced, showList, query, posts.length])
  const move = delta =>
    setActive(index => (index + delta + posts.length) % posts.length)
  const slots =
    posts.length === 1 ? [0] : posts.length === 2 ? [0, 1] : [-1, 0, 1]
  const listOpen = showList || Boolean(query.trim())

  return (
    <section
      className='dao-explorer'
      style={{
        backgroundImage: `linear-gradient(rgba(247,242,233,.23), rgba(247,242,233,.42)), url(${JSON.stringify(background)})`
      }}
    >
      <div className='dao-shell'>
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
        <header className='dao-heading'>
          <p>OUR BEINGS · 道</p>
          <h1>道</h1>
          <span>已经写出的思想</span>
        </header>
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
                  {slots.map(offset => {
                    const index =
                      (active + offset + posts.length) % posts.length
                    const post = posts[index]
                    const selected = offset === 0
                    return (
                      <div
                        className={`dao-card dao-slot-${offset === -1 ? 'left' : offset === 1 ? 'right' : 'center'}`}
                        key={post.id || post.href}
                      >
                        {selected ? (
                          <SmartLink
                            href={post.href}
                            className='dao-card-inner'
                            aria-label={`阅读：${post.title}`}
                          >
                            <CardContent post={post} />
                          </SmartLink>
                        ) : (
                          <button
                            type='button'
                            className='dao-card-inner'
                            onClick={() => move(offset)}
                            aria-label={`切换到：${post.title}`}
                          >
                            <CardContent post={post} />
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className='dao-caption'>
                  <p>
                    {String(active + 1).padStart(2, '0')} <span>/</span>{' '}
                    {String(posts.length).padStart(2, '0')}
                  </p>
                  <h2>{current.title}</h2>
                </div>
                <div className='dao-actions'>
                  <button
                    type='button'
                    onClick={() => move(-1)}
                    disabled={posts.length < 2}
                    aria-label='上一篇'
                  >
                    ←
                  </button>
                  <button
                    type='button'
                    onClick={() => setPaused(value => !value)}
                    disabled={reduced || posts.length < 2}
                  >
                    {reduced
                      ? '已减少动态效果'
                      : paused
                        ? '继续轮播'
                        : '暂停轮播'}
                  </button>
                  <button
                    type='button'
                    onClick={() => move(1)}
                    disabled={posts.length < 2}
                    aria-label='下一篇'
                  >
                    →
                  </button>
                </div>
                <p className='dao-hint'>
                  点击中央卡片阅读全文 · 悬停或聚焦时暂停
                </p>
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
        #theme-my-theme.ob-dao-layout #wrapper {
          background: transparent !important;
          padding-bottom: 0;
        }
        .dao-explorer {
          min-height: calc(100vh - 5.25rem);
          background-size: cover;
          background-position: center center;
          background-attachment: fixed;
          color: #342b23;
          padding: 24px 24px 56px;
        }
        .dao-shell {
          width: min(100%, 1100px);
          margin: auto;
        }
        .dao-toolbar {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .dao-control,
        .dao-search,
        .dao-actions button,
        .dao-more {
          border: 1px solid rgba(82, 66, 49, 0.25);
          background: rgba(255, 252, 246, 0.9);
          color: #342b23;
          border-radius: 8px;
          min-height: 44px;
        }
        .dao-control {
          padding: 0 17px;
          white-space: nowrap;
        }
        .dao-search {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 12px;
          width: min(320px, 100%);
          font-size: 24px;
        }
        .dao-search-label {
          font-size: 14px;
          white-space: nowrap;
          color: #574637;
        }
        .dao-search input {
          width: 100%;
          min-width: 0;
          background: transparent;
          outline: none;
          font-size: 15px;
          color: #342b23;
        }
        .dao-search input::placeholder {
          color: #71675e;
        }
        .dao-heading {
          text-align: center;
          margin: 8px auto 0;
        }
        .dao-heading p {
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #695541;
        }
        .dao-heading h1 {
          font-family: Georgia, 'Noto Serif SC', serif;
          font-size: 56px;
          line-height: 1.15;
          margin: 3px 0;
          color: #38291d;
        }
        .dao-heading span {
          font-size: 15px;
          letter-spacing: 0.16em;
          color: #574637;
        }
        .dao-stage {
          padding-top: 20px;
        }
        .dao-orbit {
          height: 455px;
          position: relative;
          max-width: 880px;
          margin: 0 auto;
          perspective: 1000px;
        }
        .dao-card {
          position: absolute;
          top: 12px;
          left: 50%;
          width: 250px;
          height: 310px;
          transition:
            transform 1.1s ease,
            opacity 1.1s ease;
          filter: drop-shadow(0 8px 12px rgba(61, 42, 25, 0.16));
        }
        .dao-slot-center {
          z-index: 3;
          transform: translateX(-50%) translateY(105px);
        }
        .dao-slot-left {
          z-index: 2;
          transform: translateX(calc(-50% - 270px)) translateY(5px) scale(0.84);
          opacity: 0.89;
        }
        .dao-slot-right {
          z-index: 2;
          transform: translateX(calc(-50% + 270px)) translateY(5px) scale(0.84);
          opacity: 0.89;
        }
        .dao-card-inner {
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: column;
          text-align: left;
          background: #fffcf6;
          border: 1px solid rgba(108, 83, 56, 0.3);
          border-radius: 9px;
          overflow: hidden;
          color: #312820;
        }
        .dao-card-inner:hover {
          border-color: #8d6944;
        }
        .dao-cover {
          width: 100%;
          height: 145px;
          object-fit: cover;
          background: #e9ddcb;
        }
        .dao-cover-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a08363;
          font-family: serif;
          font-size: 48px;
        }
        .dao-card-copy {
          padding: 17px 19px;
          display: flex;
          flex: 1;
          min-height: 0;
          flex-direction: column;
        }
        .dao-card-copy small {
          color: #78644e;
          letter-spacing: 0.1em;
          font-size: 12px;
        }
        .dao-card-copy strong {
          font-family: Georgia, 'Noto Serif SC', serif;
          font-size: 18px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-top: 12px;
        }
        .dao-card-copy time {
          margin-top: auto;
          color: #74675a;
          font-size: 13px;
        }
        .dao-caption {
          text-align: center;
          min-height: 70px;
          width: fit-content;
          max-width: 95%;
          margin: 0 auto;
          padding: 6px 18px;
          border-radius: 8px;
          background: rgba(255, 252, 246, 0.91);
        }
        .dao-caption p {
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #514335;
        }
        .dao-caption p span {
          color: #947d62;
        }
        .dao-caption h2 {
          font-size: 17px;
          line-height: 1.45;
          font-weight: 500;
          margin: 7px auto 0;
          max-width: 700px;
        }
        .dao-actions {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 16px;
        }
        .dao-actions button {
          padding: 0 16px;
        }
        .dao-actions button:disabled {
          opacity: 0.6;
          cursor: default;
        }
        .dao-hint {
          text-align: center;
          font-size: 13px;
          color: #574a3d;
          margin-top: 12px;
        }
        .dao-list-panel {
          max-width: 850px;
          margin: 30px auto 0;
          padding: 24px 32px;
          background: rgba(255, 252, 247, 0.94);
          border: 1px solid rgba(94, 75, 53, 0.2);
          border-radius: 12px;
        }
        .dao-list-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #dfd6ca;
          padding-bottom: 15px;
        }
        .dao-list-head h2 {
          font-size: 21px;
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
          font-size: 17px;
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
        .dao-actions button:focus-visible,
        .dao-search:focus-within,
        .dao-list a:focus-visible,
        .dao-more:focus-visible {
          outline: 3px solid #88643e;
          outline-offset: 3px;
        }
        @media (max-width: 600px) {
          .dao-explorer {
            padding: 18px 16px 40px;
            background-attachment: scroll;
          }
          .dao-toolbar {
            gap: 8px;
          }
          .dao-control {
            padding: 0 12px;
          }
          .dao-search {
            flex: 1;
          }
          .dao-heading {
            margin-top: 24px;
          }
          .dao-heading h1 {
            font-size: 46px;
          }
          .dao-orbit {
            height: 320px;
            overflow: hidden;
          }
          .dao-card {
            width: 206px;
            height: 278px;
            top: 10px;
          }
          .dao-slot-center {
            transform: translateX(-50%);
          }
          .dao-slot-left {
            transform: translateX(calc(-50% - 145px)) translateY(25px)
              scale(0.76);
          }
          .dao-slot-right {
            transform: translateX(calc(-50% + 145px)) translateY(25px)
              scale(0.76);
          }
          .dao-cover {
            height: 122px;
          }
          .dao-card-copy {
            padding: 14px;
          }
          .dao-card-copy strong {
            font-size: 16px;
          }
          .dao-list-panel {
            padding: 20px 18px;
          }
          .dao-list a {
            align-items: flex-start;
          }
          .dao-list a > span {
            font-size: 12px;
          }
          .dao-hint {
            font-size: 12px;
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
        <small>OUR BEINGS · 道</small>
        <strong>{post.title}</strong>
        <time>{post.publishDay || post.lastEditedDay || ''}</time>
      </div>
    </>
  )
}
