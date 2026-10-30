import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { useEffect, useState } from 'react'
import {
  DESK_HREF,
  OUR_BEINGS_JOIN_PRICE_YUAN,
  OUR_BEINGS_SEATS,
  formatSeat,
  isClerkEnabled,
  joinRequiresInviteOrPayment,
  listPublicBeings,
  remainingOurBeingSeats
} from '../beings'

const OurBeingsJoinStatus = dynamic(() => import('./OurBeingsJoinStatus'), {
  ssr: false
})

const FILTERS = [
  { id: 'all', label: '全部' },
  { id: 'existence', label: '生命记录' },
  { id: 'dao', label: '道' },
  { id: 'shu', label: '术' }
]

const OurBeingsIndex = ({ beings, publicHub } = {}) => {
  const [extra, setExtra] = useState(Array.isArray(beings) ? beings : [])
  const [takenSeats, setTakenSeats] = useState(null)
  const [view, setView] = useState('events')
  const [domain, setDomain] = useState('all')
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    let cancelled = false
    fetch('/api/beings/public')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (cancelled || !data) return
        if (Array.isArray(data.beings)) setExtra(data.beings)
        if (Number(data.taken) > 0) setTakenSeats(Number(data.taken))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const archive = listPublicBeings(extra)
  const taken = takenSeats || archive.length
  const remaining = remainingOurBeingSeats(taken)
  const gated = joinRequiresInviteOrPayment(taken)
  const clerkOn = isClerkEnabled()
  const posts = Array.isArray(publicHub?.posts) ? publicHub.posts : []
  const events = Array.isArray(publicHub?.events) ? publicHub.events : []
  const items =
    view === 'events'
      ? events
      : posts.filter(item => domain === 'all' || item.domain === domain)
  const visible = items.slice(0, visibleCount)
  const isEvents = view === 'events'

  const chooseView = next => {
    setView(next)
    setVisibleCount(6)
  }

  return (
    <div className='ob-beings'>
      <header className='ob-beings__head'>
        <p className='ob-beings__kicker'>OUR BEINGS · 共在</p>
        <div className='ob-beings__heading'>
          <h1 className='ob-beings__title'>我们的存在</h1>
          <SmartLink href={DESK_HREF} className='ob-beings__desk'>
            我的空间 <span aria-hidden='true'>↗</span>
          </SmartLink>
        </div>
        <p className='ob-beings__lead'>
          一个人与自己周旋，也与他人相遇。
          <br />
          在这里共读，留下思考，交换值得反复进入的世界。
        </p>
        <p className='ob-beings__privacy'>
          每个人都有自己的私人空间。只有你主动公开的内容，才在这里相遇。
        </p>
      </header>

      <nav className='ob-beings__views' aria-label='浏览我们的存在'>
        <button
          type='button'
          aria-pressed={isEvents}
          aria-controls='ob-hub-panel'
          onClick={() => chooseView('events')}
        >
          阅读活动
        </button>
        <button
          type='button'
          aria-pressed={!isEvents}
          aria-controls='ob-hub-panel'
          onClick={() => chooseView('posts')}
        >
          公开内容
        </button>
      </nav>

      <section
        id='ob-hub-panel'
        className='ob-beings__panel'
        aria-labelledby='ob-hub-title'
      >
        <div className='ob-beings__section-head'>
          <div>
            <p className='ob-beings__eyebrow'>
              {isEvents ? '一起读，也一起想' : '从一个人的思考，到我们的对话'}
            </p>
            <h2 id='ob-hub-title'>{isEvents ? '阅读活动' : '近期公开内容'}</h2>
          </div>
          <span className='ob-beings__quiet'>
            {isEvents ? '线上 · 线下' : '生命记录 · 道 · 术'}
          </span>
        </div>

        {!isEvents && (
          <div className='ob-beings__filters' aria-label='筛选公开内容'>
            {FILTERS.map(filter => (
              <button
                key={filter.id}
                type='button'
                aria-pressed={domain === filter.id}
                onClick={() => {
                  setDomain(filter.id)
                  setVisibleCount(6)
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {visible.length > 0 ? (
          <>
            <ul className='ob-beings__entries'>
              {visible.map(item => (
                <li key={item.id}>
                  <article className='ob-beings__entry'>
                    <p className='ob-beings__meta'>
                      <span>{item.label}</span>
                      {item.date && (
                        <>
                          <span aria-hidden='true'> / </span>
                          <time dateTime={item.date}>
                            {isEvents ? '发布于 ' : ''}
                            {item.date}
                          </time>
                        </>
                      )}
                    </p>
                    <h3>
                      <SmartLink href={item.href}>
                        <span>{item.title}</span>
                        <span className='ob-beings__arrow' aria-hidden='true'>
                          ↗
                        </span>
                      </SmartLink>
                    </h3>
                    {item.summary && (
                      <p className='ob-beings__summary'>{item.summary}</p>
                    )}
                  </article>
                </li>
              ))}
            </ul>
            {visible.length < items.length && (
              <button
                className='ob-beings__more'
                type='button'
                onClick={() => setVisibleCount(count => count + 6)}
              >
                再读几篇 <span aria-hidden='true'>↓</span>
              </button>
            )}
            {isEvents && (
              <p className='ob-beings__note'>
                这里先呈现已发布的活动介绍。参与方式请查看活动原文，站内报名尚未接通。
              </p>
            )}
          </>
        ) : (
          <div className='ob-beings__empty'>
            <svg
              width='36'
              height='32'
              viewBox='0 0 36 32'
              fill='none'
              aria-hidden='true'
            >
              <path
                d='M18 7C13 3 7 3 2 5v22c6-2 11-1 16 2 5-3 10-4 16-2V5c-5-2-11-2-16 2Z'
                stroke='currentColor'
                strokeWidth='1.2'
                strokeLinejoin='round'
              />
              <path
                d='M18 7v22M7 11c2-.5 4 0 6 1M7 17c2-.5 4 0 6 1M23 12c2-1 4-1.5 6-1M23 18c2-1 4-1.5 6-1'
                stroke='currentColor'
                strokeWidth='1.2'
                strokeLinecap='round'
              />
            </svg>
            <h3>
              {isEvents ? '为下一次相遇，留一页空白' : '这里还没有公开的篇章'}
            </h3>
            <p>
              {isEvents
                ? '暂时没有可展示的已发布活动。活动发布与站内报名，将在后续逐步开放。'
                : '这个分类暂时没有可展示的内容。私密记录会留在各自的空间里。'}
            </p>
            {isEvents ? (
              <button
                className='ob-beings__text-button'
                type='button'
                onClick={() => chooseView('posts')}
              >
                先读一些思考 <span aria-hidden='true'>→</span>
              </button>
            ) : (
              <SmartLink className='ob-beings__link' href={DESK_HREF}>
                回到我的空间
              </SmartLink>
            )}
          </div>
        )}

        {!isEvents && (
          <div className='ob-beings__reading-paths'>
            <p>慢慢读，也带走可用的方法。</p>
            <div>
              <SmartLink href='/category/道'>
                继续读「道」 <span aria-hidden='true'>↗</span>
              </SmartLink>
              <SmartLink href='/category/术'>
                去看看「术」 <span aria-hidden='true'>↗</span>
              </SmartLink>
            </div>
            {Number(publicHub?.postsTotal) > posts.length && (
              <small>
                此处汇集最近 {posts.length} 篇内容，更多文章可从对应板块阅读。
              </small>
            )}
          </div>
        )}
        {isEvents && Number(publicHub?.eventsTotal) > events.length && (
          <p className='ob-beings__note'>
            此处显示最近 {events.length} 份活动介绍。
          </p>
        )}
      </section>

      <details className='ob-beings__archive'>
        <summary>存在者名录与现行加入方式</summary>
        <div className='ob-beings__archive-body'>
          <p className='ob-beings__archive-intro'>
            这里保留已公开的存在者档案。每个人的私人记录，仍属于自己。
          </p>
          <p className='ob-beings__count'>
            已留下 {taken} / {OUR_BEINGS_SEATS}
            {remaining > 0
              ? ` · 还余 ${remaining} 个前一百席位`
              : ' · 前一百席位已满'}
          </p>
          <section className='ob-beings__list' aria-label='已公开的存在者'>
            {archive.map(being => (
              <article key={being.id} className='ob-beings__card'>
                <p className='ob-beings__seat'>档案 {formatSeat(being.seat)}</p>
                <h2 className='ob-beings__name'>{being.name}</h2>
                {being.motto ? (
                  <p className='ob-beings__motto'>{being.motto}</p>
                ) : null}
                <SmartLink href={being.href} className='ob-beings__link'>
                  {being.isAuthor ? '进入站主的生命钟' : '进入这份存在'}
                </SmartLink>
              </article>
            ))}
          </section>
          <section id='join' className='ob-beings__join'>
            <h2>现行加入方式</h2>
            <p>
              前 {OUR_BEINGS_SEATS}{' '}
              人点右上角人像，用任何国家的邮箱免费占一个档案位。进来后会得到一张邀请码。不需要微信，也不需要中国手机号。席位满了之后，要么用老会员分享的邀请码，要么付{' '}
              {OUR_BEINGS_JOIN_PRICE_YUAN}{' '}
              元占一个档案位。这是水电费，不是课程。
            </p>
            <p>
              进来的人可以写自己的存在、道、术，默认私密，公开的才进公共池。访客只读公开内容。
            </p>
            <p className='ob-beings__en'>
              Sign in with any email, from anywhere. WeChat and a Chinese phone
              number are not required.
            </p>
            {clerkOn ? (
              <OurBeingsJoinStatus gated={gated} />
            ) : (
              <p className='ob-beings__status'>
                {gated
                  ? '前一百席位已满。之后只接受邀请码或付款。'
                  : '前一百席位仍开放。登录密钥尚未接入，现在还不能真正进来。'}
              </p>
            )}
          </section>
        </div>
      </details>

      <style jsx>{`
        .ob-beings {
          --ink: #342c24;
          --muted: #766a5f;
          --accent: #926631;
          --line: rgba(75, 57, 38, 0.16);
          --paper: rgba(255, 252, 247, 0.88);
          width: min(52rem, 100%);
          margin: 0 auto;
          padding: 1rem 0 3rem;
          color: var(--ink);
          overflow-wrap: anywhere;
        }
        .ob-beings__head {
          margin-bottom: 2.2rem;
        }
        .ob-beings__kicker {
          margin: 0 0 1rem;
          color: var(--accent);
          font-size: 0.72rem;
          letter-spacing: 0.19em;
        }
        .ob-beings__heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
        }
        .ob-beings__title {
          margin: 0;
          font-size: clamp(1.8rem, 4vw, 2.35rem);
          font-weight: 500;
          letter-spacing: 0.06em;
        }
        .ob-beings :global(.ob-beings__desk) {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          min-height: 44px;
          flex-shrink: 0;
          color: var(--accent);
          font-size: 0.85rem;
          text-underline-offset: 0.25em;
        }
        .ob-beings__lead {
          margin: 1.2rem 0 0;
          line-height: 1.95;
          font-size: 1rem;
        }
        .ob-beings__privacy {
          margin: 1.05rem 0 0;
          color: var(--muted);
          font-size: 0.8rem;
          line-height: 1.8;
        }
        .ob-beings__views {
          display: flex;
          gap: 2rem;
          border-bottom: 1px solid var(--line);
        }
        .ob-beings button {
          font: inherit;
          color: inherit;
          cursor: pointer;
        }
        .ob-beings__views button {
          min-height: 48px;
          padding: 0.7rem 0;
          background: none;
          border: 0;
          border-bottom: 2px solid transparent;
          font-size: 0.95rem;
          color: var(--muted);
        }
        .ob-beings__views button[aria-pressed='true'] {
          color: var(--ink);
          border-bottom-color: var(--accent);
        }
        .ob-beings__panel {
          padding: 1.9rem 0 0;
        }
        .ob-beings__section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.1rem;
        }
        .ob-beings__eyebrow {
          margin: 0 0 0.45rem;
          font-size: 0.75rem;
          color: var(--muted);
        }
        .ob-beings__section-head h2 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 500;
        }
        .ob-beings__quiet {
          font-size: 0.75rem;
          color: var(--muted);
          line-height: 1.8;
        }
        .ob-beings__filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.2rem 1.4rem;
          margin: 0 0 0.55rem;
        }
        .ob-beings__filters button {
          min-width: 44px;
          min-height: 44px;
          padding: 0.4rem 0;
          border: 0;
          background: none;
          color: var(--muted);
          font-size: 0.82rem;
        }
        .ob-beings__filters button[aria-pressed='true'] {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 0.4em;
        }
        .ob-beings__entries {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .ob-beings__entry {
          border-bottom: 1px solid var(--line);
          padding: 1.4rem 0;
        }
        .ob-beings__meta {
          margin: 0 0 0.5rem;
          color: var(--muted);
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          line-height: 1.7;
        }
        .ob-beings__entry h3 {
          margin: 0;
          font-size: 1.08rem;
          font-weight: 500;
          line-height: 1.7;
        }
        .ob-beings__entry h3 :global(a) {
          min-height: 44px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
          color: var(--ink);
          text-decoration: none;
          padding: 0.2rem 0;
        }
        .ob-beings__entry h3 :global(a:hover) {
          color: var(--accent);
        }
        .ob-beings__arrow {
          color: var(--accent);
          flex-shrink: 0;
        }
        .ob-beings__summary {
          margin: 0.55rem 2rem 0 0;
          color: var(--muted);
          font-size: 0.88rem;
          line-height: 1.9;
        }
        .ob-beings__empty {
          padding: 2.7rem 1.5rem;
          margin: 1.3rem 0 0;
          border: 1px solid var(--line);
          border-radius: 0.6rem;
          background: var(--paper);
          text-align: center;
        }
        .ob-beings__empty svg {
          color: var(--accent);
          margin: 0 auto 1.1rem;
          display: block;
        }
        .ob-beings__empty h3 {
          margin: 0 0 0.75rem;
          font-size: 1.08rem;
          font-weight: 400;
          line-height: 1.7;
        }
        .ob-beings__empty p {
          max-width: 24rem;
          margin: 0 auto;
          font-size: 0.85rem;
          line-height: 1.9;
          color: var(--muted);
        }
        .ob-beings__empty :global(.ob-beings__link),
        .ob-beings__text-button {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 1rem;
          min-height: 44px;
        }
        .ob-beings__text-button {
          padding: 0;
          border: 0;
          background: none;
          color: var(--accent) !important;
          font-size: 0.85rem !important;
        }
        .ob-beings__more {
          display: block;
          min-height: 44px;
          margin: 1rem auto;
          padding: 0.4rem 1rem;
          border: 1px solid var(--line);
          border-radius: 0.25rem;
          background: none;
          font-size: 0.85rem !important;
        }
        .ob-beings__note {
          margin: 1.1rem 0 0;
          color: var(--muted);
          font-size: 0.78rem;
          line-height: 1.8;
        }
        .ob-beings__reading-paths {
          margin-top: 1.6rem;
          color: var(--muted);
          font-size: 0.82rem;
          line-height: 1.8;
        }
        .ob-beings__reading-paths p {
          margin: 0 0 0.4rem;
        }
        .ob-beings__reading-paths > div {
          display: flex;
          flex-wrap: wrap;
          gap: 1.8rem;
        }
        .ob-beings__reading-paths :global(a) {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent);
        }
        .ob-beings__reading-paths small {
          display: block;
          margin-top: 0.5rem;
        }
        .ob-beings__archive {
          border-top: 1px solid var(--line);
          margin-top: 3rem;
        }
        .ob-beings__archive summary {
          min-height: 52px;
          padding: 1.2rem 0;
          cursor: pointer;
          color: var(--muted);
          font-size: 0.85rem;
          line-height: 1.7;
        }
        .ob-beings__archive-body {
          padding: 0.6rem 0 0;
        }
        .ob-beings__archive-intro,
        .ob-beings__count {
          margin: 0 0 1rem;
          font-size: 0.85rem;
          line-height: 1.8;
          color: var(--muted);
        }
        .ob-beings__list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }
        .ob-beings__card {
          padding: 1.15rem 1.2rem;
          border-radius: 0.6rem;
          background: var(--paper);
          border: 1px solid var(--line);
        }
        .ob-beings__seat {
          margin: 0 0 0.35rem;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          color: var(--accent);
        }
        .ob-beings__name {
          margin: 0 0 0.55rem;
          font-size: 1.1rem;
          font-weight: 500;
        }
        .ob-beings__motto {
          margin: 0 0 0.9rem;
          line-height: 1.8;
          font-size: 0.85rem;
        }
        .ob-beings :global(.ob-beings__link) {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 0.18em;
        }
        .ob-beings__join {
          margin-top: 2rem;
          padding-top: 1.4rem;
          border-top: 1px solid var(--line);
        }
        .ob-beings__join h2 {
          margin: 0 0 0.8rem;
          font-size: 1.05rem;
          font-weight: 500;
        }
        .ob-beings__join p {
          margin: 0 0 0.85rem;
          font-size: 0.85rem;
          line-height: 1.9;
        }
        .ob-beings__en,
        .ob-beings__status {
          color: var(--muted);
        }
        .ob-beings :global(a:focus-visible),
        .ob-beings button:focus-visible,
        .ob-beings summary:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 5px;
          border-radius: 2px;
        }
        :global(.dark) .ob-beings {
          --ink: #f1e9dc;
          --muted: #beb1a0;
          --accent: #dfbd80;
          --line: rgba(241, 233, 220, 0.2);
          --paper: rgba(27, 24, 21, 0.9);
        }
        @media (max-width: 540px) {
          .ob-beings {
            padding-top: 0.5rem;
          }
          .ob-beings__head {
            margin-bottom: 1.7rem;
          }
          .ob-beings__heading {
            align-items: flex-start;
            gap: 0.8rem;
          }
          .ob-beings :global(.ob-beings__desk) {
            font-size: 0.75rem;
            padding-top: 0.45rem;
          }
          .ob-beings__lead {
            font-size: 0.9rem;
          }
          .ob-beings__section-head {
            align-items: flex-start;
            flex-direction: column;
            gap: 0.5rem;
          }
          .ob-beings__quiet {
            font-size: 0.7rem;
          }
          .ob-beings__empty {
            padding: 2rem 1rem;
          }
          .ob-beings__list {
            grid-template-columns: minmax(0, 1fr);
          }
          .ob-beings__summary {
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default OurBeingsIndex
