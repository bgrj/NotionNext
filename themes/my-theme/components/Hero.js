import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'
import CONFIG from '../config'
import HandGlow from './HandGlow'

/**
 * 顶部全屏大图
 * 欢迎语固定在导航栏区域正中，不再随滚动到底部。
 * 打字效果保留（如果用户配置了 GREETING_WORDS）。
 */
const Hero = (props) => {
  const { siteInfo } = props
  const GREETING_WORDS = String(siteConfig('GREETING_WORDS') || '')
  const GREETING_WORDS_TYPE_SPEED =
    Number(siteConfig('GREETING_WORDS_TYPE_SPEED')) || 200
  const GREETING_WORDS_BACK_SPEED =
    Number(siteConfig('GREETING_WORDS_BACK_SPEED')) || 100

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let disposed = false
    let typedInstance

    if (document.getElementById('typed')) {
      loadExternalResource('/js/typed.min.js', 'js')
        .then(() => {
          if (!disposed && window.Typed) {
            typedInstance = new window.Typed('#typed', {
              strings: GREETING_WORDS.split(','),
              typeSpeed: GREETING_WORDS_TYPE_SPEED,
              backSpeed: GREETING_WORDS_BACK_SPEED,
              backDelay: 400,
              showCursor: false,
              smartBackspace: true
            })
          }
        })
        .catch(() => {})
    }

    return () => {
      disposed = true
      typedInstance?.destroy()
    }
  }, [GREETING_WORDS, GREETING_WORDS_TYPE_SPEED, GREETING_WORDS_BACK_SPEED])

  return (
    <header
      id='header'
      style={{ zIndex: 1 }}
      className='w-full h-screen relative bg-black'
      data-ob-minimal-hero='true'>

      {/* 固定在导航栏区域正中的欢迎语 */}
      <div className='z-30 absolute left-1/2 top-[72px] -translate-x-1/2 w-full max-w-[1100px] px-6 text-center'>
        <div className='text-white/95 text-[15px] md:text-[17px] leading-[1.75] tracking-[0.01em] font-light shadow-text'>
          我们的存在
          <span className='block mt-1.5 text-[13px] md:text-[14.5px] text-white/75'>
            让我们的思想为时代所传唱，让我们的灵魂永世不朽，让我们的存在与世界同在
          </span>
        </div>
      </div>

      <HandGlow />

      <LazyImage
        priority
        id='header-cover'
        alt={siteInfo?.title}
        src={siteInfo?.pageCover}
        width={1920}
        height={1080}
        className={`header-cover absolute inset-0 z-0 w-full h-screen object-cover object-center ${siteConfig('HEXO_HOME_NAV_BACKGROUND_IMG_FIXED', null, CONFIG) ? 'fixed' : ''}`}
      />
    </header>
  )
}

export default Hero
