import { useEffect, useState } from 'react'
import { FRIEND_LINK_SECTIONS, getFriendLinkToc } from '../friendLinks'

const TOC = getFriendLinkToc()

const letterOf = name => {
  const ch = Array.from(name || '')[0] || '#'
  return ch.toUpperCase ? ch : ch
}

const CardIcon = ({ item }) => {
  const [broken, setBroken] = useState(false)
  const letter = letterOf(item.name)
  const src = item.domain
    ? 'https://www.google.com/s2/favicons?sz=128&domain=' + item.domain
    : ''

  if (!src || broken) {
    return (
      <span className='ob-fl-letter' style={{ background: item.color || '#8c6b4a' }}>
        {letter}
      </span>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=''
      className='ob-fl-favicon'
      onError={() => setBroken(true)}
    />
  )
}

const FriendCard = ({ item }) => (
  <a
    className='ob-fl-card'
    href={item.url}
    target='_blank'
    rel='noreferrer noopener'
    title={item.name}>
    <span className='ob-fl-icon' aria-hidden='true'>
      <CardIcon item={item} />
    </span>
    <span className='ob-fl-meta'>
      <span className='ob-fl-name'>{item.name}</span>
      {item.desc && <span className='ob-fl-desc'>{item.desc}</span>}
    </span>
  </a>
)

const CardGrid = ({ items, sectionId }) => (
  <div className='ob-fl-grid'>
    {items.map(item => (
      <FriendCard key={`${sectionId}-${item.url}`} item={item} />
    ))}
  </div>
)

const FriendLinks = () => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(TOC[0]?.id || '')

  useEffect(() => {
    const hash = decodeURIComponent((window.location.hash || '').replace(/^#/, ''))
    if (hash && document.getElementById(hash)) {
      setActive(hash)
    }

    const els = TOC.map(item => document.getElementById(item.id)).filter(Boolean)
    if (!els.length) return undefined

    const io = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.25, 0.6] }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const onTocClick = (event, id) => {
    event.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
    setOpen(false)
    if (window.history?.replaceState) {
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <div id='notion-article' className='ob-fl'>
      <style>{`
        .ob-fl {
          --ob-gold: #C9A66B;
          --ob-ink: #38302A;
          --ob-muted: #8F7E6A;
          --ob-line: rgba(56, 48, 42, 0.10);
          --ob-card: #fff;
          color: var(--ob-ink);
          width: 100%;
          padding: 0.15rem 0 2rem;
        }
        .dark .ob-fl {
          --ob-ink: #F3EEE6;
          --ob-muted: #B5A898;
          --ob-line: rgba(243, 238, 230, 0.12);
          --ob-card: #1c1a17;
        }
        .ob-fl-shell {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          grid-template-areas:
            'hero'
            'toc'
            'main';
        }
        .ob-fl-hero { grid-area: hero; }
        .ob-fl-toc { grid-area: toc; }
        .ob-fl-main { grid-area: main; min-width: 0; }
        .ob-fl-kicker {
          font-size: 12px;
          letter-spacing: 0.22em;
          color: var(--ob-gold);
          font-weight: 700;
        }
        .ob-fl-title {
          margin: 8px 0 8px;
          font-size: 1.75rem;
          letter-spacing: 0.16em;
          font-weight: 700;
          line-height: 1.3;
        }
        .ob-fl-lead {
          margin: 0 0 0.35rem;
          color: var(--ob-muted);
          max-width: 42em;
        }
        .ob-fl-toc {
          position: sticky;
          top: 4.25rem;
          z-index: 16;
          margin: 1rem 0 1.15rem;
          padding: 0.35rem 0.6rem 0.55rem;
          background: color-mix(in srgb, var(--ob-card) 88%, transparent);
          backdrop-filter: blur(8px);
          border: 1px solid var(--ob-line);
          border-radius: 10px;
        }
        .ob-fl-toc-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: none;
          border: 0;
          padding: 6px 2px;
          font: inherit;
          color: var(--ob-ink);
          letter-spacing: 0.18em;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }
        .ob-fl-toc-kicker {
          display: none;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: var(--ob-gold);
          font-weight: 700;
        }
        .ob-fl-toc-nav {
          display: none;
          padding: 4px 0 6px;
          max-height: min(70vh, 24rem);
          overflow: auto;
        }
        .ob-fl-toc-nav.is-open {
          display: block;
        }
        .ob-fl-toc a {
          display: block;
          padding: 7px 0 7px 10px;
          color: var(--ob-muted);
          border-left: 1px solid var(--ob-line);
          font-size: 13px;
          letter-spacing: 0.06em;
          line-height: 1.35;
        }
        .ob-fl-toc a.lv2 {
          padding-left: 1.25rem;
          font-size: 12px;
        }
        .ob-fl-toc a.is-active {
          color: var(--ob-gold);
          border-left-color: var(--ob-gold);
        }
        .ob-fl-section {
          margin-top: 1.85rem;
          scroll-margin-top: 8rem;
        }
        .ob-fl-section:first-child {
          margin-top: 1.15rem;
        }
        .ob-fl-section-title {
          font-size: 1.05rem;
          letter-spacing: 0.12em;
          font-weight: 700;
          margin: 0 0 6px;
        }
        .ob-fl-section-lead,
        .ob-fl-group-lead {
          margin: 0 0 12px;
          color: var(--ob-muted);
          font-size: 14px;
        }
        .ob-fl-group {
          margin-top: 1.35rem;
          scroll-margin-top: 8rem;
        }
        .ob-fl-group-title {
          font-size: 0.95rem;
          letter-spacing: 0.1em;
          font-weight: 700;
          margin: 0 0 8px;
        }
        .ob-fl-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 12px;
        }
        .ob-fl-card {
          display: flex;
          align-items: center;
          gap: 14px;
          min-height: 72px;
          min-width: 0;
          padding: 12px 14px;
          border: 1px solid var(--ob-line);
          border-radius: 10px;
          background: color-mix(in srgb, var(--ob-card) 72%, transparent);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .ob-fl-card:hover,
        .ob-fl-card:focus-visible {
          border-color: color-mix(in srgb, var(--ob-gold) 70%, var(--ob-line));
          transform: translateY(-1px);
        }
        .ob-fl-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          flex-shrink: 0;
          overflow: hidden;
          display: grid;
          place-items: center;
          background: #f6f3ee;
        }
        .dark .ob-fl-icon { background: #2a2622; }
        .ob-fl-favicon {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }
        .ob-fl-letter {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
        }
        .ob-fl-meta {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .ob-fl-name {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.04em;
          line-height: 1.3;
        }
        .ob-fl-desc {
          margin-top: 4px;
          font-size: 14px;
          color: var(--ob-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (min-width: 640px) {
          .ob-fl-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }
          .ob-fl-title { font-size: 2rem; }
        }
        @media (min-width: 1024px) {
          .ob-fl-shell {
            grid-template-columns: 15rem minmax(0, 1fr);
            grid-template-areas:
              'toc hero'
              'toc main';
            column-gap: 2.5rem;
            align-items: start;
          }
          .ob-fl-hero {
            padding-top: 0.15rem;
          }
          .ob-fl-toc {
            top: 5.25rem;
            margin: 0;
            padding: 0.2rem 1.15rem 2.5rem 0;
            background: transparent;
            border: 0;
            border-right: 1px solid var(--ob-line);
            border-radius: 0;
            backdrop-filter: none;
            max-height: calc(100vh - 6rem);
            overflow: auto;
          }
          .ob-fl-toc-toggle {
            display: none;
          }
          .ob-fl-toc-kicker {
            display: block;
            margin-bottom: 12px;
          }
          .ob-fl-toc-nav,
          .ob-fl-toc-nav.is-open {
            display: block;
            max-height: none;
            overflow: visible;
            padding: 0;
          }
          .ob-fl-section,
          .ob-fl-group {
            scroll-margin-top: 5.5rem;
          }
          .ob-fl-section:first-child {
            margin-top: 0.35rem;
          }
        }
        @media (min-width: 1280px) {
          .ob-fl-shell {
            grid-template-columns: 16rem minmax(0, 1fr);
          }
          .ob-fl-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 1536px) {
          .ob-fl-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ob-fl-card { transition: none; }
        }
      `}</style>

      <div className='ob-fl-shell'>
        <header className='ob-fl-hero'>
          <div className='ob-fl-kicker'>FRIENDS</div>
          <h1 className='ob-fl-title'>友情链接</h1>
          <p className='ob-fl-lead'>
            彼此看见的站点、声音与影像。不是交换流量，只是把长期打开的入口放在一处。先按平台，再按主题。
          </p>
        </header>

        <aside className='ob-fl-toc' aria-label='目录'>
          <div className='ob-fl-toc-kicker'>目录</div>
          <button
            type='button'
            className='ob-fl-toc-toggle'
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}>
            <span>目录</span>
            <i className={`fa fa-angle-down duration-200 ${open ? 'rotate-180' : ''}`} />
          </button>
          <nav className={`ob-fl-toc-nav${open ? ' is-open' : ''}`}>
            {TOC.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${item.level === 2 ? 'lv2' : ''}${active === item.id ? ' is-active' : ''}`}
                onClick={event => onTocClick(event, item.id)}>
                {item.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className='ob-fl-main'>
          {FRIEND_LINK_SECTIONS.map(section => (
            <section
              className='ob-fl-section'
              key={section.id}
              id={section.id}
              aria-labelledby={`fl-${section.id}`}>
              <h2 className='ob-fl-section-title' id={`fl-${section.id}`}>
                {section.title}
              </h2>
              {section.lead && <p className='ob-fl-section-lead'>{section.lead}</p>}
              {section.groups ? (
                section.groups.map(group => (
                  <div className='ob-fl-group' key={group.id} id={group.id}>
                    <h3 className='ob-fl-group-title'>{group.title}</h3>
                    {group.lead && (
                      <p className='ob-fl-group-lead'>{group.lead}</p>
                    )}
                    <CardGrid items={group.items} sectionId={group.id} />
                  </div>
                ))
              ) : (
                <CardGrid items={section.items} sectionId={section.id} />
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FriendLinks
