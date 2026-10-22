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
 * 简洁、水平、轻量，不喧宾夺主。字体更优雅，hover 暖金。
 */
const Hero = (props) => {
  const { siteInfo } = props

  return (
    <header
      id='header'
      style={{ zIndex: 1 }}
      className='w-full h-screen relative bg-black'
      data-ob-minimal-hero='true'>

      {/* 固定在导航栏下方的欢迎语 + 四个核心入口（极简优雅） */}
      <div className='z-30 absolute left-1/2 top-[82px] -translate-x-1/2 w-full max-w-[1080px] px-5 text-center'>
        {/* 主标题 */}
        <div className='text-white/95 text-[15.5px] md:text-[17px] leading-[1.65] tracking-[0.02em] font-light shadow-text'>
          我们的存在
        </div>
        {/* 副标题 */}
        <div className='mt-1.5 text-[12.5px] md:text-[13.5px] text-white/65 leading-[1.6] tracking-[0.015em] font-light shadow-text'>
          让我们的思想为时代所传唱，让我们的灵魂永世不朽，让我们的存在与世界同在
        </div>

        {/* 四个核心部分：极简横排，极细分隔，暖金 hover */}
        <div className='mt-[13px] flex items-center justify-center gap-x-4 md:gap-x-6 text-[11.5px] md:text-[12px] text-white/42 tracking-[2px] font-light select-none'>
          <SmartLink href='/category/我的存在' className='hover:text-[#c9a66b] hover:text-white/85 transition-colors duration-200'>
            我的存在
          </SmartLink>
          <span className='text-white/12'>·</span>
          <SmartLink href='/category/我们的存在' className='hover:text-[#c9a66b] hover:text-white/85 transition-colors duration-200'>
            我们的存在
          </SmartLink>
          <span className='text-white/12'>·</span>
          <SmartLink href='/category/道' className='hover:text-[#c9a66b] hover:text-white/85 transition-colors duration-200'>
            道
          </SmartLink>
          <span className='text-white/12'>·</span>
          <SmartLink href='/category/术' className='hover:text-[#c9a66b] hover:text-white/85 transition-colors duration-200'>
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
