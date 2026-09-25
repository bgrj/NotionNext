import { siteConfig } from '@/lib/config'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import { FOOTER_FRIEND_LINKS } from '../friendLinks'

const WaveText = ({
  text,
  className = '',
  duration = 2.5,
  step = 0.1,
  delayOffset = 0
}) => {
  const chars = Array.from(text || '')
  return (
    <span className={`ob-wave ${className}`} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={`${text}-${i}`}
          className='ob-wave-char'
          style={{
            animationDuration: `${duration}s`,
            animationDelay: `${delayOffset + i * step}s`
          }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  )
}

const PulseDots = () => (
  <span className='ob-dots' aria-hidden='true'>
    {[0, 0.5, 1].map(delay => (
      <span
        key={delay}
        className='ob-dot'
        style={{ animationDelay: `${delay}s` }}
      />
    ))}
  </span>
)

const SectionTitle = ({ children }) => (
  <div className='ob-section-title'>
    <div className='ob-section-label'>{children}</div>
    <PulseDots />
  </div>
)

const FooterLink = ({
  href,
  children,
  external = false,
  title,
  gold = false,
  extraClass = ''
}) => {
  const className = `ob-link${gold ? ' ob-link-gold' : ''}${extraClass ? ` ${extraClass}` : ''}`
  if (external) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noreferrer noopener'
        title={title}
        className={className}>
        {children}
      </a>
    )
  }
  return (
    <a href={href} title={title} className={className}>
      {children}
    </a>
  )
}

const QrItem = ({ label, icon, src }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onPointerDown = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return (
    <div
      ref={ref}
      className='ob-qr relative'
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <button
        type='button'
        aria-label={label}
        aria-expanded={open}
        onClick={e => {
          e.stopPropagation()
          setOpen(v => !v)
        }}
        className='ob-link ob-link-btn'>
        {icon}
        <span>{label}</span>
      </button>
      <div
        className={
          (open ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
          'ob-qr-pop absolute bottom-full z-40 mb-2 transition-all duration-200'
        }>
        <div className='rounded-md bg-white p-2 shadow-xl dark:bg-hexo-black-gray'>
          {open && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={label} className='h-36 w-36 object-contain' />
          )}
        </div>
      </div>
    </div>
  )
}

const Motto = ({ text }) => {
  if (!text) return null
  return (
    <div className='ob-motto-row'>
      <div className='ob-ripple-wrap' aria-hidden='true'>
        <span className='ob-ripple-core' />
        <span className='ob-ripple-ring' />
        <span className='ob-ripple-ring' style={{ animationDelay: '1.25s' }} />
      </div>
      <span className='ob-motto'>{text}</span>
    </div>
  )
}

const Footer = () => {
  const brandName = siteConfig('FOOTER_BRAND_NAME', 'Our Beings（吾在）', CONFIG)
  const waveTitle = siteConfig('FOOTER_WAVE_TITLE', 'OurBeing', CONFIG)
  const brandSubtitle = siteConfig('FOOTER_BRAND_SUBTITLE', '吾在', CONFIG)
  const tagline = siteConfig('FOOTER_TAGLINE', siteConfig('BIO'), CONFIG)
  const slogan = siteConfig(
    'FOOTER_SLOGAN',
    '让我们的思想为时代所传唱',
    CONFIG
  )
  const slogan2 = siteConfig(
    'FOOTER_SLOGAN_2',
    '让我们的灵魂永世不朽',
    CONFIG
  )
  const slogan3 = siteConfig(
    'FOOTER_SLOGAN_3',
    siteConfig('FOOTER_SLOGAN_ALT', '让我们的存在与世界同在', CONFIG),
    CONFIG
  )
  const motto = siteConfig(
    'FOOTER_MOTTO',
    '做 你 · 认 为 · 正 确 · 的 事',
    CONFIG
  )
  const favicon = siteConfig('FOOTER_FAVICON', siteConfig('BLOG_FAVICON'), CONFIG)
  const copyright = siteConfig(
    'FOOTER_COPYRIGHT',
    '© 2026-2028 ourbeings.com',
    CONFIG
  )
  const aboutUrl = siteConfig(
    'FOOTER_ABOUT_URL',
    'https://ourbeings.com/philosophy/2026/04/01/about',
    CONFIG
  )
  const copyrightUrl = siteConfig(
    'FOOTER_COPYRIGHT_URL',
    'https://ourbeings.com/copyright',
    CONFIG
  )
  const linksUrl = siteConfig('FOOTER_LINKS_URL', '/links', CONFIG)
  const email = siteConfig('FOOTER_EMAIL', 'hsz@ourbeings.com', CONFIG)
  const wechatAlbum = siteConfig('FOOTER_WECHAT_ALBUM', '', CONFIG)
  const afdianUrl = siteConfig(
    'FOOTER_AFDIAN_URL',
    'https://afdian.com/a/ourbeings',
    CONFIG
  )
  const alipayQr = siteConfig('FOOTER_ALIPAY_QR', '', CONFIG)
  const wepayQr = siteConfig('FOOTER_WEPAY_QR', '', CONFIG)
  const icpText = siteConfig(
    'FOOTER_ICP_TEXT',
    '存在者ICP备 2025032878号-1',
    CONFIG
  )
  const icpUrl = siteConfig('FOOTER_ICP_URL', 'https://ourbeings.com/', CONFIG)
  const homeUrl = siteConfig('LINK')
  const slogans = [slogan, slogan2, slogan3].filter(Boolean)

  return (
    <footer className='ob-footer relative z-10 w-full flex-shrink-0 bg-hexo-light-gray text-sm leading-6 dark:bg-black'>
      <style>{`
        .ob-footer {
          --ob-gold: #D4A35C;
          --ob-ink: #38302A;
          --ob-muted: #8F7E6A;
          --ob-line: rgba(56, 48, 42, 0.08);
        }
        .dark .ob-footer {
          --ob-ink: #E8E0D4;
          --ob-muted: #A39686;
          --ob-line: rgba(232, 224, 212, 0.12);
        }
        .ob-wave-char {
          display: inline-block;
          opacity: 0.3;
          animation-name: ob-wave;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes ob-wave {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .ob-shell {
          max-width: 72rem;
          margin: 0 auto;
          padding: 2.75rem 1.5rem 0;
        }
        .ob-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 2.25rem;
        }
        .ob-lockup {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        .ob-lockup img {
          width: 2rem;
          height: 2rem;
          flex-shrink: 0;
        }
        .ob-copy-block {
          margin-left: 0;
        }
        .ob-east {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.25rem;
          width: 100%;
          min-width: 0;
        }
        .ob-east-cols {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.25rem;
          width: 100%;
        }
        .ob-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ob-dots {
          display: inline-flex;
          justify-content: center;
          gap: 8px;
          align-items: center;
          margin-top: 10px;
        }
        .ob-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--ob-gold);
          animation: ob-dot 1.5s ease-in-out infinite;
        }
        @keyframes ob-dot {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .ob-section-title {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 16px;
        }
        .ob-section-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: var(--ob-ink);
          line-height: 1.3;
          white-space: nowrap;
        }
        .ob-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 6px 0;
          min-height: 44px;
          letter-spacing: 0.04em;
          color: var(--ob-muted);
          transition: color 0.25s ease, transform 0.25s ease;
        }
        .ob-link::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 2px;
          width: 0;
          height: 1px;
          background: var(--ob-gold);
          transform: translateX(-50%);
          transition: width 0.28s ease;
        }
        .ob-link:hover,
        .ob-link:focus-visible {
          color: var(--ob-gold);
        }
        .ob-link:hover::after,
        .ob-link:focus-visible::after {
          width: 100%;
        }
        .ob-link-gold { color: var(--ob-gold); }
        .ob-link-btn {
          background: none;
          border: 0;
          cursor: pointer;
          font: inherit;
          text-align: inherit;
        }
        .ob-qr-pop {
          left: 50%;
          transform: translateX(-50%);
        }
        .ob-title {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--ob-ink);
          line-height: 1.3;
          white-space: nowrap;
        }
        .ob-slogan {
          display: block;
          margin-top: 6px;
          font-size: 12px;
          letter-spacing: 0.04em;
          color: var(--ob-muted);
        }
        .ob-tagline {
          margin-top: 12px;
          font-size: 11px;
          letter-spacing: 0.04em;
          color: var(--ob-muted);
          opacity: 0.85;
        }
        .ob-sub {
          margin-top: 10px;
          font-size: 12px;
          letter-spacing: 0.28em;
          color: var(--ob-gold);
        }
        .ob-lang {
          margin-top: 10px;
          font-size: 12px;
          letter-spacing: 0.1em;
        }
        .ob-lang-current {
          color: var(--ob-gold);
          font-weight: 600;
        }
        .ob-stats {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 12px;
          color: var(--ob-muted);
          margin-bottom: 6px;
        }
        .ob-ripple-wrap {
          position: relative;
          width: 28px;
          height: 28px;
          flex-shrink: 0;
        }
        .ob-ripple-core {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--ob-gold);
        }
        .ob-ripple-ring {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: 1.5px solid var(--ob-gold);
          animation: ob-ripple 2.5s ease-out infinite;
        }
        @keyframes ob-ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(4.5); opacity: 0; }
        }
        .ob-icp {
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .ob-motto-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .ob-motto {
          letter-spacing: 0.16em;
          font-size: 10px;
          color: var(--ob-gold);
          animation: ob-motto 3s ease-in-out infinite;
        }
        @keyframes ob-motto {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .ob-copy-wrap {
          margin-top: 2.35rem;
          border-top: 1px solid var(--ob-line);
        }
        .ob-copy {
          max-width: 72rem;
          margin: 0 auto;
          padding: 1rem 1.5rem 1.75rem;
          text-align: center;
          font-size: 11px;
          color: var(--ob-muted);
          letter-spacing: 0.06em;
        }
        @media (max-width: 1023px) {
          .ob-icp { white-space: normal; max-width: 14em; }
        }
        @media (min-width: 1024px) {
          .ob-shell { padding: 3.5rem 3rem 0; }
          .ob-grid {
            display: grid;
            grid-template-columns: minmax(13.5rem, 1.05fr) minmax(10rem, 0.62fr) minmax(0, 2.55fr);
            column-gap: 3rem;
            row-gap: 2.5rem;
            align-items: start;
            text-align: left;
          }
          .ob-lockup { justify-content: flex-start; }
          .ob-lockup img { width: 2rem; height: 2rem; }
          .ob-copy-block { margin-left: 2.75rem; }
          .ob-title {
            font-size: 22px;
            letter-spacing: 0.18em;
          }
          .ob-slogan { margin-top: 7px; letter-spacing: 0.06em; }
          .ob-tagline { letter-spacing: 0.06em; }
          .ob-east { align-items: stretch; gap: 2.35rem; }
          .ob-east-cols {
            display: grid;
            grid-template-columns: max-content max-content max-content;
            column-gap: 2.75rem;
            row-gap: 2rem;
            align-items: start;
            justify-content: space-between;
            width: 100%;
          }
          .ob-motto-row {
            flex-direction: row;
            gap: 10px;
          }
          .ob-nav, .ob-section-title { align-items: flex-start; }
          .ob-dots { justify-content: flex-start; }
          .ob-link { justify-content: flex-start; min-height: 0; }
          .ob-link::after {
            left: 0;
            transform: none;
          }
          .ob-link:hover,
          .ob-link:focus-visible {
            transform: translateX(3px);
          }
          .ob-qr-pop {
            left: 0;
            transform: none;
          }
          .ob-stats { justify-content: flex-start; }
          .ob-motto {
            letter-spacing: 0.28em;
            font-size: 11px;
          }
          .ob-copy { padding: 1.25rem 3rem 1.85rem; }
          .ob-icp { white-space: nowrap; max-width: none; }
        }
        @media (min-width: 1280px) {
          .ob-shell { padding: 3.75rem 3.25rem 0; }
          .ob-grid {
            grid-template-columns: minmax(14rem, 1fr) minmax(10rem, 0.55fr) minmax(0, 2.9fr);
            column-gap: 3.5rem;
          }
          .ob-east-cols {
            column-gap: 4rem;
          }
          .ob-copy { padding: 1.25rem 3.25rem 1.85rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ob-wave-char,
          .ob-dot,
          .ob-ripple-ring,
          .ob-motto {
            animation: none !important;
            opacity: 1 !important;
          }
          .ob-ripple-ring { opacity: 0 !important; }
        }
      `}</style>

      <div className='ob-shell'>
        <div className='ob-grid'>
          <div>
            <a href={homeUrl} className='ob-lockup'>
              {favicon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={favicon} alt={brandName} />
              )}
              <span className='ob-title'>
                <WaveText text={waveTitle} duration={2.5} step={0.1} />
              </span>
            </a>
            <div className='ob-copy-block'>
              {brandSubtitle && <div className='ob-sub'>{brandSubtitle}</div>}
              {slogans.map((line, i) => (
                <span className='ob-slogan' key={line}>
                  <WaveText
                    text={line}
                    duration={2.5}
                    step={0.15}
                    delayOffset={i * 0.35}
                  />
                </span>
              ))}
              <PulseDots />
              {tagline && <p className='ob-tagline'>{tagline}</p>}
              <div className='ob-lang'>
                <span className='ob-lang-current'>中文</span>
                <span className='mx-1.5 text-gray-400'>|</span>
                <span
                  className='cursor-not-allowed text-gray-400'
                  title='coming soon'>
                  English
                </span>
              </div>
            </div>
          </div>

          <div>
            <SectionTitle>关于</SectionTitle>
            <nav className='ob-nav'>
              <FooterLink href={aboutUrl}>About</FooterLink>
              <FooterLink href={copyrightUrl}>版权声明</FooterLink>
              {email && (
                <FooterLink href={`mailto:${email}`} gold>
                  {email}
                </FooterLink>
              )}
              {wechatAlbum && (
                <FooterLink href={wechatAlbum} external>
                  公众号
                </FooterLink>
              )}
            </nav>
          </div>

          <div className='ob-east'>
            <div className='ob-east-cols'>
              <div>
                <SectionTitle>为吾在发电</SectionTitle>
                <div className='ob-nav'>
                  <FooterLink href={afdianUrl} external title='爱发电'>
                    <i className='fas fa-bolt' />
                    爱发电
                  </FooterLink>
                  {alipayQr && (
                    <QrItem
                      label='支付宝'
                      src={alipayQr}
                      icon={<i className='fab fa-alipay' />}
                    />
                  )}
                  {wepayQr && (
                    <QrItem
                      label='微信'
                      src={wepayQr}
                      icon={<i className='fab fa-weixin' />}
                    />
                  )}
                </div>
              </div>
              <div>
                <SectionTitle>友情链接</SectionTitle>
                <div className='ob-nav'>
                  {FOOTER_FRIEND_LINKS.map(item => (
                    <FooterLink key={item.url} href={item.url} external>
                      {item.name}
                    </FooterLink>
                  ))}
                  <FooterLink href={linksUrl} gold>
                    全部友情链接 →
                  </FooterLink>
                </div>
              </div>
              <div>
                <SectionTitle>站点</SectionTitle>
                <div className='ob-nav'>
                  <div className='ob-stats'>
                    <span className='hidden busuanzi_container_site_pv'>
                      <i className='fas fa-eye' />
                      <span className='px-1 busuanzi_value_site_pv'> </span>
                    </span>
                    <span className='hidden busuanzi_container_site_uv'>
                      <i className='fas fa-users' />
                      <span className='px-1 busuanzi_value_site_uv'> </span>
                    </span>
                  </div>
                  {icpText && (
                    <FooterLink href={icpUrl} extraClass='ob-icp'>
                      {icpText}
                    </FooterLink>
                  )}
                </div>
              </div>
            </div>
            <Motto text={motto} />
          </div>
        </div>
      </div>

      <div className='ob-copy-wrap'>
        <div className='ob-copy'>{copyright}</div>
      </div>
    </footer>
  )
}

export default Footer
