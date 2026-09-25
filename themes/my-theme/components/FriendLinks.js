import { useState } from 'react'
import { FRIEND_LINK_SECTIONS } from '../friendLinks'

const letterOf = name => {
  const ch = Array.from(name || '')[0] || '#'
  return ch.toUpperCase ? ch : ch
}

const CardIcon = ({ item }) => {
  const [broken, setBroken] = useState(false)
  const letter = letterOf(item.name)
  const src = item.domain
    ? ('https://www.google.com/s2/favicons?sz=128&domain=' + item.domain)
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

const FriendLinks = () => {
  return (
    <div id='notion-article' className='ob-fl'>
      <style>{`
        .ob-fl {
          --ob-gold: #C9A66B;
          --ob-ink: #38302A;
          --ob-muted: #8F7E6A;
          --ob-line: rgba(56, 48, 42, 0.10);
          color: var(--ob-ink);
          padding: 0.5rem 0 1.5rem;
        }
        .dark .ob-fl {
          --ob-ink: #F3EEE6;
          --ob-muted: #B5A898;
          --ob-line: rgba(243, 238, 230, 0.12);
        }
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
          margin: 0 0 1.75rem;
          color: var(--ob-muted);
          max-width: 36em;
        }
        .ob-fl-section {
          margin-top: 2rem;
        }
        .ob-fl-section-title {
          font-size: 1.05rem;
          letter-spacing: 0.12em;
          font-weight: 700;
          margin: 0 0 6px;
        }
        .ob-fl-section-lead {
          margin: 0 0 12px;
          color: var(--ob-muted);
          font-size: 14px;
        }
        .ob-fl-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        .ob-fl-card {
          display: flex;
          align-items: center;
          gap: 14px;
          min-height: 72px;
          padding: 12px 14px;
          border: 1px solid var(--ob-line);
          border-radius: 10px;
          background: rgba(255,255,255,0.72);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .dark .ob-fl-card {
          background: rgba(28, 26, 23, 0.72);
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
        @media (min-width: 720px) {
          .ob-fl-grid {
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }
          .ob-fl-title { font-size: 2rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ob-fl-card { transition: none; }
        }
      `}</style>

      <header>
        <div className='ob-fl-kicker'>FRIENDS</div>
        <h1 className='ob-fl-title'>友情链接</h1>
        <p className='ob-fl-lead'>
          彼此看见的站点、声音与影像。不是交换流量，只是把长期打开的入口放在一处。
        </p>
      </header>

      {FRIEND_LINK_SECTIONS.map(section => (
        <section className='ob-fl-section' key={section.id} aria-labelledby={`fl-${section.id}`}>
          <h2 className='ob-fl-section-title' id={`fl-${section.id}`}>
            {section.title}
          </h2>
          {section.lead && <p className='ob-fl-section-lead'>{section.lead}</p>}
          <div className='ob-fl-grid'>
            {section.items.map(item => (
              <FriendCard key={`${section.id}-${item.url}`} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default FriendLinks
