import { siteConfig } from '@/lib/config'
import throttle from 'lodash.throttle'
import SmartLink from '@/components/SmartLink'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const OurBeingsHeaderAuth = dynamic(() => import('./OurBeingsHeaderAuth'), {
  ssr: false
})

const MOTTO_TITLE = '我们的存在'
const MOTTO_LINES = [
  '让我们的思想为时代所传唱，',
  '让我们的灵魂永世不朽，',
  '让我们的存在与世界同在'
]

const MottoWave = ({ text, offset = 0, duration = 2.5, step = 0.1 }) => (
  <span className='ob-nav-wave' aria-label={text}>
    {Array.from(text).map((char, index) => (
      <span
        key={index}
        aria-hidden='true'
        className='ob-nav-wave-char'
        style={{
          animationDuration: `${duration}s`,
          animationDelay: `${-duration + offset + index * step}s`
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
)

/** Minimal theme chrome: brand, centered motto, existing account entry.
 * Navigation routes remain available; no authentication behavior is changed.
 */
const Header = ({ siteInfo }) => {
  const router = useRouter()
  useEffect(() => {
    let previousTop = window.scrollY
    const topNavStyleHandler = throttle(() => {
      const scrollTop = window.scrollY
      const nav = document.getElementById('sticky-nav')
      if (!nav) return
      const hero = document.getElementById('header')
      const showNav =
        scrollTop <= previousTop ||
        scrollTop < 5 ||
        (hero && scrollTop <= hero.clientHeight + 100)
      nav.classList.toggle('top-0', Boolean(showNav))
      nav.classList.toggle('ob-nav-hidden', !showNav)
      previousTop = scrollTop
    }, 200)

    window.addEventListener('scroll', topNavStyleHandler, { passive: true })
    router.events.on('routeChangeComplete', topNavStyleHandler)
    topNavStyleHandler()
    return () => {
      router.events.off('routeChangeComplete', topNavStyleHandler)
      window.removeEventListener('scroll', topNavStyleHandler)
      topNavStyleHandler.cancel()
    }
  }, [router.events])

  return (
    <div id='top-nav' className='z-40'>
      <div
        id='sticky-nav'
        className='ob-sticky-nav top-0 fixed z-20 w-full duration-300 transition-all'
      >
        <div className='ob-nav-inner'>
          <div className='ob-nav-row'>
            <SmartLink href='/' passHref className='ob-logo'>
              {siteInfo?.title || siteConfig('TITLE')}
            </SmartLink>
            <div className='ob-nav-right'>
              <OurBeingsHeaderAuth />
            </div>
          </div>
          <div className='ob-nav-motto'>
            <div className='ob-nav-motto-title'>
              <MottoWave text={MOTTO_TITLE} />
            </div>
            <div className='ob-nav-motto-line'>
              {MOTTO_LINES.map((line, index) => (
                <MottoWave key={line} text={line} offset={index * 0.65} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        #theme-my-theme .ob-nav-inner {
          position: relative;
        }
        #theme-my-theme .ob-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 3.25rem;
          padding: 0.42rem 1.05rem;
        }
        #theme-my-theme .ob-nav-right {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
        }
        #theme-my-theme .ob-logo {
          position: relative;
          z-index: 2;
        }
        #theme-my-theme .ob-nav-motto {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          pointer-events: none;
          max-width: min(58vw, 44rem);
          padding: 0 0.5rem;
        }
        #theme-my-theme .ob-nav-motto-title {
          font-size: 15px;
          letter-spacing: 0.22em;
          font-weight: 400;
          line-height: 1.2;
          color: #8d6230;
        }
        .dark #theme-my-theme .ob-nav-motto-title {
          color: #e2c48a;
        }
        #theme-my-theme .ob-nav-motto-line {
          margin-top: 3px;
          font-size: 11px;
          letter-spacing: 0.045em;
          font-weight: 300;
          line-height: 1.35;
          white-space: nowrap;
          color: #8f7e6a;
        }
        .dark #theme-my-theme .ob-nav-motto-line {
          color: #cbb79a;
        }
        #theme-my-theme .ob-nav-wave {
          display: inline-block;
          white-space: nowrap;
        }
        #theme-my-theme .ob-nav-motto-line .ob-nav-wave + .ob-nav-wave {
          margin-left: 0.35em;
        }
        #theme-my-theme .ob-nav-wave-char {
          display: inline-block;
          opacity: 0.32;
          animation-name: ob-nav-breathe;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes ob-nav-breathe {
          0%,
          100% {
            opacity: 0.32;
          }
          50% {
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          #theme-my-theme .ob-nav-wave-char {
            animation: none;
            opacity: 1;
          }
        }
        #theme-my-theme .ob-sticky-nav.ob-nav-hidden {
          transform: translateY(-110%);
        }
        @media (max-width: 1100px) {
          #theme-my-theme .ob-nav-motto-line {
            white-space: normal;
          }
        }
        @media (max-width: 767px) {
          #theme-my-theme {
            --ob-below-nav: 6.5rem;
          }
          html:has(#theme-my-theme) {
            scroll-padding-top: 6.5rem;
          }
          #theme-my-theme .ob-nav-row {
            min-height: 2.55rem;
            padding: 0.3rem 0.7rem 0;
          }
          #theme-my-theme .ob-nav-motto {
            position: static;
            transform: none;
            max-width: none;
            padding: 0 0.75rem 0.5rem;
          }
          #theme-my-theme .ob-nav-motto-title {
            font-size: 13px;
            letter-spacing: 0.16em;
          }
          #theme-my-theme .ob-nav-motto-line {
            font-size: 9.5px;
            letter-spacing: 0.02em;
            white-space: normal;
          }
        }
      `}</style>
    </div>
  )
}

export default Header
