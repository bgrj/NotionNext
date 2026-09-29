import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import NavButtonGroup from '@/themes/hexo/components/NavButtonGroup'

let wrapperTop = 0

/**
 * 首页全屏头图。遮罩放在 header 上，而不是 img::before（对 img 无效）。
 */
const Hero = props => {
  const [typed, changeType] = useState()
  const { siteInfo } = props
  const { locale } = useGlobal()
  const scrollToWrapper = () => {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
    window.scrollTo({ top: wrapperTop - 2 * rem, behavior: 'smooth' })
  }

  const GREETING_WORDS = siteConfig('GREETING_WORDS').split(',')
  const GREETING_WORDS_TYPE_SPEED =
    Number(siteConfig('GREETING_WORDS_TYPE_SPEED')) || 200
  const GREETING_WORDS_BACK_SPEED =
    Number(siteConfig('GREETING_WORDS_BACK_SPEED')) || 100
  useEffect(() => {
    updateHeaderHeight()

    if (!typed && window && document.getElementById('typed')) {
      loadExternalResource('/js/typed.min.js', 'js').then(() => {
        if (window.Typed) {
          changeType(
            new window.Typed('#typed', {
              strings: GREETING_WORDS,
              typeSpeed: GREETING_WORDS_TYPE_SPEED,
              backSpeed: GREETING_WORDS_BACK_SPEED,
              backDelay: 400,
              showCursor: true,
              smartBackspace: true
            })
          )
        }
      })
    }

    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
    }
  })

  function updateHeaderHeight() {
    requestAnimationFrame(() => {
      const wrapperElement = document.getElementById('wrapper')
      wrapperTop = wrapperElement?.offsetTop
    })
  }

  return (
    <header
      id='header'
      style={{ zIndex: 1 }}
      className='relative h-screen w-full bg-[#1c1814]'>
      <LazyImage
        priority
        id='header-cover'
        alt={siteInfo?.title}
        src={siteInfo?.pageCover}
        width={1920}
        height={1080}
        className={`header-cover absolute inset-0 h-screen w-full object-cover object-center ${siteConfig('HEXO_HOME_NAV_BACKGROUND_IMG_FIXED', null, CONFIG) ? 'fixed' : ''}`}
      />
      <div className='ob-hero-scrim' aria-hidden='true' />

      <div className='ob-hero-copy absolute bottom-0 z-10 flex h-full w-full flex-col items-center justify-center text-white'>
        <div className='ob-hero-title px-5 text-center font-bold text-4xl md:text-5xl'>
          {siteInfo?.title || siteConfig('TITLE')}
        </div>
        <div className='ob-hero-greet mt-3 max-w-[22rem] px-5 text-center text-lg font-light leading-relaxed md:max-w-xl'>
          <span id='typed' />
        </div>

        {siteConfig('HEXO_HOME_NAV_BUTTONS', null, CONFIG) && (
          <NavButtonGroup {...props} />
        )}

        <div
          onClick={scrollToWrapper}
          className='absolute bottom-10 z-10 w-full cursor-pointer py-4 text-center text-3xl text-white'>
          <div className='animate-bounce text-xs opacity-80'>
            {siteConfig('HEXO_SHOW_START_READING', null, CONFIG) &&
              locale.COMMON.START_READING}
          </div>
          <i className='fas fa-angle-down animate-bounce opacity-80' />
        </div>
      </div>
    </header>
  )
}

export default Hero
