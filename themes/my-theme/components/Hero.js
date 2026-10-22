import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'
import CONFIG from '../config'
import HandGlow from './HandGlow'
import SmartLink from '@/components/SmartLink'

/**
 * 顶部全屏大图
 * 欢迎语 + 四个核心入口 固定在导航栏区域正中偏下。
 * 简洁、水平、轻量，不喧宾夺主。
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

      {/* 固定在导航栏下方的欢迎语 + 四个核心入口 */}
      <div className='z-30 absolute left-1/2 top-[78px] -translate-x-1/2 w-full max-w-[1120px] px-5 text-center'>
        {/* 主标题 */}
        <div className='text-white/95 text-[15.5px] md:text-[17px] leading-[1.7] tracking-[0.015em] font-light shadow-text'>
          我们的存在
        </div>
        {/* 副标题 */}
        <div className='mt-1.5 text-[12.8px] md:text-[13.8px] text-white/70 leading-[1.65] tracking-[0.01em] font-light shadow-text'>
          让我们的思想为时代所传唱，让我们的灵魂永世不朽，让我们的存在与世界同在
        </div>

        {/* 四个核心部分：简洁水平排列，浅色，hover 提亮 */}
        <div className='mt-4 flex items-center justify-center gap-x-5 md:gap-x-7 text-[12px] md:text-[12.5px] text-white/50 tracking-[1.5px] font-light'>
          <SmartLink href='/category/我的存在' className='hover:text-[#c9a66b] hover:text-white/90 transition-colors duration-200'>
            我的存在
          </SmartLink>
          <span className='text-white/15 select-none'>·</span>
          <SmartLink href='/category/我们的存在' className='hover:text-[#c9a66b] hover:text-white/90 transition-colors duration-200'>
            我们的存在
          </SmartLink>
          <span className='text-white/15 select-none'>·</span>
          <SmartLink href='/category/道' className='hover:text-[#c9a66b] hover:text-white/90 transition-colors duration-200'>
            道
          </SmartLink>
          <span className='text-white/15 select-none'>·</span>
          <SmartLink href='/category/术' className='hover:text-[#c9a66b] hover:text-white/90 transition-colors duration-200'>
            术
          </SmartLink>
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
