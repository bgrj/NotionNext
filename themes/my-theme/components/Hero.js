import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import HandGlow from './HandGlow'
import SmartLink from '@/components/SmartLink'

/**
 * 顶部全屏大图
 * 欢迎语 + 四个核心入口 固定在导航栏下方居中。
 * 极简、优雅、呼吸感强。四个部分轻而清晰，暖金 hover。
 * 手部微光颗粒已显著增强（暖金尘埃感，正常可见但不突兀）。
 */
const Hero = (props) => {
  const { siteInfo } = props

  return (
    <header
      id='header'
      style={{ zIndex: 1 }}
      className='w-full h-screen relative bg-black'
      data-ob-minimal-hero='true'>

      {/* 固定居中于导航栏下方的欢迎区 */}
      <div className='z-30 absolute left-1/2 top-[78px] -translate-x-1/2 w-full max-w-[1020px] px-5 text-center ob-hero-text'>
        {/* 主标题 */}
        <div className='text-white/96 text-[15.8px] md:text-[17.2px] leading-[1.6] tracking-[0.025em] font-light shadow-text'>
          我们的存在
        </div>

        {/* 副标题 */}
        <div className='mt-1.5 text-[12.4px] md:text-[13.4px] text-white/62 leading-[1.58] tracking-[0.012em] font-light shadow-text'>
          让我们的思想为时代所传唱，让我们的灵魂永世不朽，让我们的存在与世界同在
        </div>

        {/* 四个核心部分：极简优雅横排，呼吸留白，暖金 hover */}
        <div className='mt-4 md:mt-[15px] flex items-center justify-center gap-x-[13px] md:gap-x-[18px] text-[11.2px] md:text-[11.8px] text-white/58 tracking-[2.8px] font-light select-none'>
          <SmartLink
            href='/category/我的存在'
            className='hover:text-[#c9a66b] hover:text-white/92 transition-all duration-200 hover:tracking-[3.1px]'>
            我的存在
          </SmartLink>
          <span className='text-white/18 select-none'>·</span>
          <SmartLink
            href='/category/我们的存在'
            className='hover:text-[#c9a66b] hover:text-white/92 transition-all duration-200 hover:tracking-[3.1px]'>
            我们的存在
          </SmartLink>
          <span className='text-white/18 select-none'>·</span>
          <SmartLink
            href='/category/道'
            className='hover:text-[#c9a66b] hover:text-white/92 transition-all duration-200 hover:tracking-[3.1px]'>
            道
          </SmartLink>
          <span className='text-white/18 select-none'>·</span>
          <SmartLink
            href='/category/术'
            className='hover:text-[#c9a66b] hover:text-white/92 transition-all duration-200 hover:tracking-[3.1px]'>
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

      <style jsx>{`
        .ob-hero-text {
          opacity: 0;
          animation: ob-hero-fade 720ms cubic-bezier(0.23, 1, 0.32, 1) 160ms forwards;
        }
        @keyframes ob-hero-fade {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ob-hero-text { animation: none; opacity: 1; }
        }
      `}</style>
    </header>
  )
}

export default Hero
