import { siteConfig } from '@/lib/config'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'

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

const FooterLink = ({ href, children, external = false, title, gold = false }) => {
  const className = `ob-link${gold ? ' ob-link-gold' : ''}`
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
      className='relative'
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
          'absolute bottom-full left-0 z-40 mb-2 transition-all duration-200'
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
  const sloganAlt = siteConfig(
    'FOOTER_SLOGAN_ALT',
    '让我们的存在与世界同在',
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
  const linksUrl = siteConfig('FOOTER_LINKS_URL', siteConfig('LINK'), CONFIG)
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

  return (
    <footer className='ob-footer relative z-10 w-full flex-shrink-0 bg-hexo-light-gray text-sm leading-6 dark:bg-black'>
      <style>{`
        .ob-footer {
          --ob-gold: #D4A35C;
          --ob-ink: #38302A;
          --ob-muted: #8F7E6A;
        }
        .dark .ob-footer {
          --ob-ink: #E8E0D4;
          --ob-muted: #A39686;
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
        .ob-dots {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          margin-top: 8px;
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
          margin-bottom: 14px;
        }
        .ob-section-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.32em;
          color: var(--ob-ink);
        }
        .ob-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 0;
          letter-spacing: 0.06em;
          color: var(--ob-muted);
          transition: color 0.25s ease, transform 0.25s ease;
        }
        .ob-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 2px;
          width: 0;
          height: 1px;
          background: var(--ob-gold);
          transition: width 0.28s ease;
        }
        .ob-link:hover,
        .ob-link:focus-visible {
          color: var(--ob-gold);
          transform: translateX(3px);
        }
        .ob-link:hover::after,
        .ob-link:focus-visible::after {
          width: 100%;
        }
        .ob-link-gold {
          color: var(--ob-gold);
        }
        .ob-link-btn {
          background: none;
          border: 0;
          cursor: pointer;
          font: inherit;
          text-align: left;
        }
        .ob-title {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: var(--ob-ink);
          line-height: 1.3;
          white-space: nowrap;
        }
        .ob-slogan {
          display: block;
          margin-top: 8px;
          font-size: 12px;
          letter-spacing: 0.18em;
          color: var(--ob-muted);
        }
        .ob-tagline {
          margin-top: 8px;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--ob-muted);
          opacity: 0.85;
        }
        .ob-sub {
          margin-top: 6px;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: var(--ob-gold);
        }
        .ob-ripple-wrap {
          position: relative;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
        }
        .ob-ripple-core {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--ob-gold);
        }
        .ob-ripple-ring {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1.5px solid var(--ob-gold);
          animation: ob-ripple 2.5s ease-out infinite;
        }
        @keyframes ob-ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(4.5); opacity: 0; }
        }
        .ob-motto {
          letter-spacing: 0.28em;
          font-size: 10px;
          color: var(--ob-gold);
          animation: ob-motto 3s ease-in-out infinite;
        }
        @keyframes ob-motto {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .ob-lang-current {
          color: var(--ob-gold);
          font-weight: 600;
        }
        @media (max-width: 640px) {
          .ob-title { font-size: 18px; letter-spacing: 0.14em; }
          .ob-slogan { letter-spacing: 0.08em; }
          .ob-motto { letter-spacing: 0.12em; }
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

      <div className='mx-auto max-w-6xl px-6 py-12 text-left'>
        <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10'>
          <div>
            <a href={homeUrl} className='inline-flex items-start gap-3'>
              {favicon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={favicon} alt={brandName} className='mt-1 h-8 w-8' />
              )}
              <span className='ob-title'>
                <WaveText text={waveTitle} duration={2.5} step={0.1} />
              </span>
            </a>
            {brandSubtitle && <div className='ob-sub'>{brandSubtitle}</div>}
            {slogan && (
              <span className='ob-slogan'>
                <WaveText text={slogan} duration={2.5} step={0.15} />
              </span>
            )}
            {sloganAlt && (
              <span className='ob-slogan'>
                <WaveText
                  text={sloganAlt}
                  duration={2.5}
                  step={0.15}
                  delayOffset={0.4}
                />
              </span>
            )}
            <PulseDots />
            {tagline && <p className='ob-tagline'>{tagline}</p>}
            <div className='mt-4 text-xs tracking-widest'>
              <span className='ob-lang-current'>中文</span>
              <span className='mx-1.5 text-gray-400'>|</span>
              <span
                className='cursor-not-allowed text-gray-400'
                title='coming soon'>
                English
              </span>
            </div>
            <p className='mt-3 text-xs' style={{ color: 'var(--ob-muted)' }}>
              {copyright}
            </p>
            {motto && (
              <div className='mt-5 flex items-center gap-3'>
                <div className='ob-ripple-wrap' aria-hidden='true'>
                  <span className='ob-ripple-core' />
                  <span className='ob-ripple-ring' />
                  <span
                    className='ob-ripple-ring'
                    style={{ animationDelay: '1.25s' }}
                  />
                </div>
                <span className='ob-motto'>{motto}</span>
              </div>
            )}
          </div>

          <div>
            <SectionTitle>关于</SectionTitle>
            <nav className='flex flex-col items-start'>
              <FooterLink href={aboutUrl}>About</FooterLink>
              <FooterLink href={copyrightUrl}>版权声明</FooterLink>
              <FooterLink href={linksUrl}>友链</FooterLink>
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

          <div>
            <SectionTitle>为吾在发电</SectionTitle>
            <div className='flex flex-col items-start'>
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
            <SectionTitle>站点</SectionTitle>
            <div className='flex flex-col items-start gap-1'>
              <div className='flex flex-wrap gap-x-4 gap-y-1 text-xs' style={{ color: 'var(--ob-muted)' }}>
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
                <FooterLink href={icpUrl}>{icpText}</FooterLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
