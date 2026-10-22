import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'
import CONFIG from '../config'
import HandGlow from './HandGlow'

/**
 * 顶部全屏大图
 * @returns
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
      <div className='z-20 text-white absolute bottom-0 flex flex-col h-full items-center justify-center w-full '>
        {/* 站点标题 */}
        <h1 className='font-bold text-4xl md:text-5xl shadow-text'>
          {siteInfo?.title || siteConfig('TITLE')}
        </h1>
        {/* 站点欢迎语 */}
        <div className='mt-2 min-h-[3rem] px-6 max-w-5xl items-center text-center font-light shadow-text text-lg'>
          <span id='typed'>{GREETING_WORDS.split(',')[0]}</span>
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
