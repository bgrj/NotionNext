import { useEffect, useMemo, useRef, useState } from 'react'
import {
  FRIEND_LINK_SECTIONS,
  FRIEND_LINKS_MOTTO,
  getFriendLinkToc
} from '../friendLinks'

const AXIS_LABEL = {
  time: '时间',
  space: '空间',
  info: '信息',
  language: '语言',
  tech: '技术'
}

const letterOf = name => {
  const ch = Array.from(name || '')[0] || '#'
  return ch.toUpperCase ? ch : ch
}

const titleOf = (id, toc) => {
  for (const section of toc) {
    if (section.id === id) return section.title
    for (const group of section.groups || []) {
      if (group.id === id) return group.title
    }
  }
  return ''
}

const haystackOf = (item, group, section) =>
  [
    item.name,
    item.desc,
    item.domain,
    item.url,
    group.title,
    section.title,
    ...(item.axes || []).flatMap(axis => [axis, AXIS_LABEL[axis] || ''])
  ]
    .join(' ')
    .toLowerCase()

const filterSections = (sections, q) => {
  const tokens = String(q || '')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
  if (!tokens.length) return sections
  return sections
    .map(section => ({
      ...section,
      groups: (section.groups || [])
        .map(group => ({
          ...group,
          items: (group.items || []).filter(item => {
            const hay = haystackOf(item, group, section)
            return tokens.every(token => hay.includes(token))
          })
        }))
        .filter(group => (group.items || []).length)
    }))
    .filter(section => (section.groups || []).length)
}

const countItems = sections =>
  sections.reduce(
    (n, section) =>
      n +
      (section.groups || []).reduce(
        (m, group) => m + (group.items || []).length,
        0
      ),
    0
  )

const replaceLoc = ({ query, hash } = {}) => {
  if (typeof window === 'undefined' || !window.history?.replaceState) return
  const url = new URL(window.location.href)
  const nextQuery = query === undefined ? url.searchParams.get('q') : query
  const trimmed = String(nextQuery || '').trim()
  if (trimmed) url.searchParams.set('q', trimmed)
  else url.searchParams.delete('q')
  const nextHash =
    hash === undefined ? url.hash.replace(/^#/, '') : String(hash || '')
  const next =
    url.pathname + url.search + (nextHash ? `#${nextHash}` : '')
  const cur =
    window.location.pathname + window.location.search + window.location.hash
  if (next !== cur) window.history.replaceState(null, '', next)
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

const weightClass = item => {
  if ((item.weight || 0) >= 5) return ' is-core'
  if ((item.weight || 0) >= 4) return ' is-strong'
  return ''
}

const sortedItems = items =>
  [...(items || [])].sort((a, b) => (b.weight || 0) - (a.weight || 0))

const FriendCard = ({ item }) => (
  <a
    className={`ob-fl-card${weightClass(item)}`}
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
    {sortedItems(items).map(item => (
      <FriendCard key={`${sectionId}-${item.url}`} item={item} />
    ))}
  </div>
)

const GroupBlock = ({ group }) => (
  <div className='ob-fl-group' id={group.id}>
    <h3 className='ob-fl-group-title'>
      {group.title}
      <span className='ob-fl-group-count'>{(group.items || []).length}</span>
    </h3>
    <CardGrid items={group.items} sectionId={group.id} />
  </div>
)

const FriendLinks = () => {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')
  const [ready, setReady] = useState(false)
  const [stuck, setStuck] = useState(false)
  const composingRef = useRef(false)
  const slotRef = useRef(null)
  const inputRef = useRef(null)

  const visible = useMemo(
    () => filterSections(FRIEND_LINK_SECTIONS, query),
    [query]
  )
  const toc = useMemo(() => getFriendLinkToc(visible), [visible])
  const [active, setActive] = useState(toc[0]?.id || '')
  const hitCount = countItems(visible)
  const searching = Boolean(query.trim())
  const activeTitle = titleOf(active, toc)

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q') || ''
    setDraft(q)
    setQuery(q)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    replaceLoc({ query })
  }, [query, ready])

  useEffect(() => {
    const ids = []
    toc.forEach(section => {
      ids.push(section.id)
      ;(section.groups || []).forEach(group => ids.push(group.id))
    })
    if (active && ids.includes(active)) return
    setActive(ids[0] || '')
  }, [toc, active])

  useEffect(() => {
    const hash = decodeURIComponent((window.location.hash || '').replace(/^#/, ''))
    if (hash && document.getElementById(hash)) {
      setActive(hash)
    }

    const ids = []
    toc.forEach(section => {
      ids.push(section.id)
      ;(section.groups || []).forEach(group => ids.push(group.id))
    })
    const els = ids.map(id => document.getElementById(id)).filter(Boolean)
    if (!els.length) return undefined

    const io = new IntersectionObserver(
      entries => {
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visibleEntries[0]?.target?.id) {
          setActive(visibleEntries[0].target.id)
        }
      },
      { rootMargin: '-16% 0px -68% 0px', threshold: [0, 0.2, 0.55] }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [toc])

  useEffect(() => {
    const slot = slotRef.current
    if (!slot) return undefined

    const update = () => {
      const mobile = window.matchMedia('(max-width: 1023px)').matches
      if (!mobile) {
        setStuck(false)
        return
      }
      const headerOffset = 68
      setStuck(slot.getBoundingClientRect().top <= headerOffset)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const commitQuery = value => {
    setQuery(value)
  }

  const clearQuery = () => {
    composingRef.current = false
    setDraft('')
    setQuery('')
    inputRef.current?.focus()
  }

  const onTocClick = (event, id) => {
    event.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
    setOpen(false)
    replaceLoc({ query, hash: id })
  }

  return (
    <div id='notion-article' className={`ob-fl${stuck ? ' is-search-stuck' : ''}`}>
      <style>{`
        .ob-fl {
          --ob-gold: #C9A66B;
          --ob-gold-deep: #8A5A1F;
          --ob-ink: #2C241C;
          --ob-muted: #5A4D40;
          --ob-line: rgba(44, 36, 28, 0.16);
          --ob-card: #fff;
          color: var(--ob-ink);
          width: 100%;
          max-width: 100%;
          overflow-x: clip;
          padding: 0.15rem 0 2rem;
        }
        .dark .ob-fl {
          --ob-gold-deep: #E2C48A;
          --ob-ink: #F3EEE6;
          --ob-muted: #C9B8A4;
          --ob-line: rgba(243, 238, 230, 0.16);
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
        .ob-fl-hero { grid-area: hero; min-width: 0; }
        .ob-fl-toc { grid-area: toc; min-width: 0; }
        .ob-fl-main { grid-area: main; min-width: 0; }
        .ob-fl-hero {
          display: grid;
          gap: 0.85rem;
        }
        .ob-fl-title {
          margin: 4px 0 8px;
          font-size: 1.7rem;
          letter-spacing: 0.16em;
          font-weight: 700;
          line-height: 1.3;
        }
        .ob-fl-motto {
          margin: 0.65rem 0 0.2rem;
          padding: 0.85rem 0 0.85rem 1rem;
          border-left: 3px solid var(--ob-gold);
          font-size: 1.02rem;
          font-weight: 700;
          line-height: 1.65;
          letter-spacing: 0.03em;
          max-width: 28em;
          color: var(--ob-ink);
        }
        .ob-fl-search-slot {
          min-width: 0;
        }
        .ob-fl-search {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ob-fl-search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          padding: 0 12px;
          border: 1px solid var(--ob-line);
          border-radius: 12px;
          background: color-mix(in srgb, var(--ob-card) 88%, transparent);
          backdrop-filter: blur(8px);
        }
        .ob-fl-search-box:focus-within {
          border-color: color-mix(in srgb, var(--ob-gold-deep) 70%, var(--ob-line));
        }
        .ob-fl-search-box .ob-fl-search-icon {
          color: var(--ob-muted);
          flex-shrink: 0;
          width: 1.1em;
          text-align: center;
        }
        .ob-fl-search-box input {
          flex: 1;
          min-width: 0;
          border: 0;
          background: transparent;
          color: var(--ob-ink);
          font: inherit;
          font-size: 14px;
          letter-spacing: 0.04em;
          outline: none;
          min-height: 44px;
        }
        .ob-fl-search-box input::placeholder {
          color: var(--ob-muted);
          opacity: 0.86;
        }
        .ob-fl-search-clear {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border: 0;
          border-radius: 999px;
          background: none;
          color: var(--ob-muted);
          cursor: pointer;
          display: grid;
          place-items: center;
        }
        .ob-fl-search-clear:hover,
        .ob-fl-search-clear:focus-visible {
          color: var(--ob-ink);
          background: color-mix(in srgb, var(--ob-card) 70%, transparent);
        }
        .ob-fl-search-meta {
          font-size: 12px;
          color: var(--ob-muted);
          letter-spacing: 0.04em;
          line-height: 1.4;
          min-height: 1.2em;
        }
        .ob-fl .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .ob-fl-empty {
          margin: 1.2rem 0 0;
          padding: 0.2rem 0 0.4rem;
          color: var(--ob-muted);
          font-size: 0.95rem;
          letter-spacing: 0.04em;
        }
        .ob-fl-axes {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 0.9rem 0 0.15rem;
        }
        .ob-fl-axis {
          font-size: 12px;
          letter-spacing: 0.18em;
          color: var(--ob-ink);
          border: 1px solid var(--ob-line);
          padding: 5px 11px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--ob-card) 72%, transparent);
        }
        .ob-fl-toc {
          position: sticky;
          top: 4.25rem;
          z-index: 16;
          margin: 0.9rem 0 1.05rem;
          padding: 0.2rem 0.7rem 0.45rem;
          background: color-mix(in srgb, var(--ob-card) 90%, transparent);
          backdrop-filter: blur(8px);
          border: 1px solid var(--ob-line);
          border-radius: 12px;
        }
        .ob-fl-toc-motto {
          display: none;
          margin: 0 0 1rem;
          padding: 0 0 0.95rem;
          border-bottom: 1px solid var(--ob-line);
          font-size: 12px;
          line-height: 1.7;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--ob-ink);
        }
        .ob-fl-toc-toggle {
          width: 100%;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: none;
          border: 0;
          padding: 8px 2px;
          font: inherit;
          color: var(--ob-ink);
          letter-spacing: 0.08em;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          text-align: left;
        }
        .ob-fl-toc-toggle-label {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ob-fl-toc-kicker {
          display: none;
          font-size: 13px;
          letter-spacing: 0.28em;
          color: var(--ob-ink);
          font-weight: 700;
          width: max-content;
          padding-bottom: 6px;
          border-bottom: 2px solid var(--ob-gold-deep);
        }
        .ob-fl-toc-nav {
          display: none;
          padding: 2px 0 8px;
          max-height: min(62vh, 28rem);
          overflow: auto;
          -webkit-overflow-scrolling: touch;
        }
        .ob-fl-toc-nav.is-open {
          display: block;
        }
        .ob-fl-toc-block + .ob-fl-toc-block {
          margin-top: 0.85rem;
          padding-top: 0.7rem;
          border-top: 1px solid var(--ob-line);
        }
        .ob-fl-toc a {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
          color: var(--ob-muted);
          text-decoration: none;
          line-height: 1.35;
        }
        .ob-fl-toc a.lv1 {
          color: var(--ob-ink);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.34em;
          padding: 10px 8px 8px 2px;
        }
        .ob-fl-toc a.lv2 {
          min-height: 40px;
          align-items: center;
          padding: 8px 8px 8px 0.85rem;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          border-left: 2px solid transparent;
        }
        .ob-fl-toc a.is-active {
          color: var(--ob-gold-deep);
        }
        .ob-fl-toc a.lv2.is-active {
          border-left-color: var(--ob-gold-deep);
        }
        .ob-fl-toc-count {
          flex-shrink: 0;
          color: var(--ob-muted);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0;
          font-variant-numeric: tabular-nums;
        }
        .ob-fl-section {
          margin-top: 1.7rem;
          scroll-margin-top: 8rem;
        }
        .ob-fl-section:first-child {
          margin-top: 0.85rem;
        }
        .ob-fl-section-title {
          font-size: 1.28rem;
          letter-spacing: 0.28em;
          font-weight: 700;
          margin: 0 0 2px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--ob-line);
        }
        .ob-fl-group {
          margin-top: 1.35rem;
          scroll-margin-top: 8rem;
        }
        .ob-fl-group-title {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-size: 0.92rem;
          letter-spacing: 0.14em;
          font-weight: 700;
          margin: 0 0 10px;
          color: var(--ob-ink);
        }
        .ob-fl-group-count {
          color: var(--ob-muted);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0;
          font-variant-numeric: tabular-nums;
        }
        .ob-fl-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 10px;
        }
        .ob-fl-card {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 68px;
          min-width: 0;
          padding: 11px 12px;
          border: 1px solid var(--ob-line);
          border-radius: 10px;
          background: color-mix(in srgb, var(--ob-card) 72%, transparent);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .ob-fl-card.is-strong {
          box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ob-gold) 42%, transparent);
        }
        .ob-fl-card.is-core {
          border-left: 3px solid var(--ob-gold-deep);
          background: color-mix(in srgb, var(--ob-card) 88%, transparent);
        }
        .ob-fl-card:hover,
        .ob-fl-card:focus-visible {
          border-color: color-mix(in srgb, var(--ob-gold-deep) 70%, var(--ob-line));
          transform: translateY(-1px);
        }
        .ob-fl-icon {
          width: 40px;
          height: 40px;
          border-radius: 9px;
          flex-shrink: 0;
          overflow: hidden;
          display: grid;
          place-items: center;
          background: #f6f3ee;
        }
        .dark .ob-fl-icon { background: #2a2622; }
        .ob-fl-favicon {
          width: 26px;
          height: 26px;
          object-fit: contain;
        }
        .ob-fl-letter {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
        }
        .ob-fl-meta {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .ob-fl-name {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.03em;
          line-height: 1.3;
          word-break: break-word;
        }
        .ob-fl-desc {
          margin-top: 3px;
          font-size: 13px;
          color: var(--ob-muted);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 1023px) {
          .ob-fl-search.is-stuck {
            position: fixed;
            top: 4.25rem;
            left: 0;
            right: 0;
            z-index: 19;
            padding: 8px 16px 10px;
            background: color-mix(in srgb, var(--ob-card) 92%, transparent);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--ob-line);
          }
          .ob-fl.is-search-stuck .ob-fl-toc {
            top: calc(4.25rem + 3.7rem);
          }
          .ob-fl.is-search-stuck .ob-fl-section,
          .ob-fl.is-search-stuck .ob-fl-group {
            scroll-margin-top: 11.6rem;
          }
        }
        @media (min-width: 640px) {
          .ob-fl-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }
          .ob-fl-title { font-size: 2rem; }
          .ob-fl-motto { font-size: 1.16rem; }
        }
        @media (min-width: 1024px) {
          .ob-fl-shell {
            grid-template-columns: 16.25rem minmax(0, 1fr);
            grid-template-areas:
              'toc hero'
              'toc main';
            column-gap: 2.35rem;
            align-items: start;
          }
          .ob-fl-hero {
            padding-top: 0.1rem;
            grid-template-columns: minmax(0, 1fr) minmax(16.5rem, 22.5rem);
            align-items: start;
            column-gap: 1.4rem;
          }
          .ob-fl-search-slot {
            padding-top: 0.45rem;
          }
          .ob-fl-toc {
            top: 5.25rem;
            margin: 0;
            padding: 0.85rem 1rem 1.5rem 0.9rem;
            background: color-mix(in srgb, #F4EDE1 82%, transparent);
            border: 1px solid var(--ob-line);
            border-radius: 12px;
            backdrop-filter: blur(8px);
            max-height: calc(100vh - 6rem);
            overflow: auto;
          }
          .dark .ob-fl-toc {
            background: color-mix(in srgb, #1c1a17 82%, transparent);
          }
          .ob-fl-toc-toggle { display: none; }
          .ob-fl-toc-kicker {
            display: block;
            margin-bottom: 12px;
          }
          .ob-fl-toc-motto { display: block; }
          .ob-fl-toc-nav,
          .ob-fl-toc-nav.is-open {
            display: block;
            max-height: none;
            overflow: visible;
            padding: 0;
          }
          .ob-fl-toc-block + .ob-fl-toc-block {
            margin-top: 1.15rem;
            padding-top: 1rem;
          }
          .ob-fl-toc a.lv1 {
            font-size: 1.05rem;
            letter-spacing: 0.38em;
            padding: 2px 0 10px;
          }
          .ob-fl-toc a.lv2 {
            min-height: 0;
            padding: 6px 0 6px 0.75rem;
            font-size: 13px;
          }
          .ob-fl-section,
          .ob-fl-group {
            scroll-margin-top: 5.5rem;
          }
          .ob-fl-section:first-child {
            margin-top: 0.2rem;
          }
        }
        @media (min-width: 1280px) {
          .ob-fl-shell {
            grid-template-columns: 17.25rem minmax(0, 1fr);
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
          <div className='ob-fl-hero-copy'>
            <h1 className='ob-fl-title'>友情链接</h1>
            <blockquote className='ob-fl-motto'>{FRIEND_LINKS_MOTTO}</blockquote>
          </div>
          <div className='ob-fl-search-slot' ref={slotRef}>
            <form
              className={`ob-fl-search${stuck ? ' is-stuck' : ''}`}
              role='search'
              onSubmit={event => event.preventDefault()}>
              <label className='sr-only' htmlFor='ob-fl-search-input'>
                搜索友链
              </label>
              <div className='ob-fl-search-box'>
                <i className='fa-solid fa-magnifying-glass ob-fl-search-icon' aria-hidden='true' />
                <input
                  id='ob-fl-search-input'
                  ref={inputRef}
                  type='text'
                  name='q'
                  value={draft}
                  autoComplete='off'
                  spellCheck='false'
                  enterKeyHint='search'
                  placeholder='在友链里找站点'
                  onChange={event => {
                    const value = event.target.value
                    setDraft(value)
                    if (!composingRef.current) commitQuery(value)
                  }}
                  onCompositionStart={() => {
                    composingRef.current = true
                  }}
                  onCompositionEnd={event => {
                    composingRef.current = false
                    const value = event.target.value
                    setDraft(value)
                    commitQuery(value)
                  }}
                  onKeyDown={event => {
                    if (event.key === 'Escape') {
                      event.preventDefault()
                      clearQuery()
                    }
                  }}
                />
                {draft ? (
                  <button
                    type='button'
                    className='ob-fl-search-clear'
                    aria-label='清除'
                    onClick={clearQuery}>
                    <i className='fa-solid fa-xmark' aria-hidden='true' />
                  </button>
                ) : null}
              </div>
              <div className='ob-fl-search-meta' aria-live='polite'>
                {searching
                  ? hitCount
                    ? `找到 ${hitCount} 个`
                    : `没有叫「${query.trim()}」的站点`
                  : ''}
              </div>
            </form>
          </div>
        </header>

        <aside className='ob-fl-toc' aria-label='目录'>
          <div className='ob-fl-toc-kicker'>目录</div>
          <p className='ob-fl-toc-motto'>{FRIEND_LINKS_MOTTO}</p>
          <button
            type='button'
            className='ob-fl-toc-toggle'
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}>
            <span className='ob-fl-toc-toggle-label'>
              {activeTitle ? `目录 · ${activeTitle}` : '目录'}
            </span>
            <i className={`fa fa-angle-down duration-200 ${open ? 'rotate-180' : ''}`} />
          </button>
          <nav className={`ob-fl-toc-nav${open ? ' is-open' : ''}`}>
            {toc.map(section => (
              <div className='ob-fl-toc-block' key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`lv1${active === section.id ? ' is-active' : ''}`}
                  onClick={event => onTocClick(event, section.id)}>
                  <span>{section.title}</span>
                  <span className='ob-fl-toc-count'>{section.count}</span>
                </a>
                {(section.groups || []).map(group => (
                  <a
                    key={group.id}
                    href={`#${group.id}`}
                    className={`lv2${active === group.id ? ' is-active' : ''}`}
                    onClick={event => onTocClick(event, group.id)}>
                    <span>{group.title}</span>
                    <span className='ob-fl-toc-count'>{group.count}</span>
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <div className='ob-fl-main'>
          {visible.length === 0 ? (
            <p className='ob-fl-empty'>没有叫「{query.trim()}」的站点</p>
          ) : (
            visible.map(section => (
              <section
                className='ob-fl-section'
                key={section.id}
                id={section.id}
                aria-labelledby={`fl-${section.id}`}>
                <h2 className='ob-fl-section-title' id={`fl-${section.id}`}>
                  {section.title}
                </h2>
                {(section.groups || []).map(group => (
                  <GroupBlock key={group.id} group={group} />
                ))}
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default FriendLinks
