// import Image from 'next/image'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import NavButtonGroup from './NavButtonGroup'

let wrapperTop = 0

/**
 * 顶部全屏大图
 * @returns
 */
const Hero = props => {
  const [typed, changeType] = useState()
  const { siteInfo } = props
  const { locale } = useGlobal()
  const scrollToWrapper = () => {
    window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
  }

  const GREETING_WORDS = siteConfig('GREETING_WORDS').split(',')
  useEffect(() => {
    updateHeaderHeight()

    if (!typed && window && document.getElementById('typed')) {
      loadExternalResource('/js/typed.min.js', 'js').then(() => {
        if (window.Typed) {
          changeType(
            new window.Typed('#typed', {
              strings: GREETING_WORDS,
              typeSpeed: 80,
              backSpeed: 30,
              backDelay: 3000,
              showCursor: true,
              smartBackspace: true,
              loop: true
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
      className='w-full h-screen relative bg-black'>

     {/* --- 主要内容容器 --- */}
      <div style={{ zIndex: 10 }} className='text-white absolute bottom-0 flex flex-col h-full items-center justify-center w-full '>

        {/* --- START: 文字包裹器，添加 text-center --- */}
        <div className='mt-90 text-center'> {/* <<<<< 修改点 1: 添加 text-center */}
            {/* 站点标题 */}
            <div className='font-black text-4xl md:text-5xl shadow-text'>
              {siteInfo?.title || siteConfig('TITLE')}
            </div>

            {/* 站点欢迎语 */}
            {/* <<<<< 修改点 2: 移除 text-center 和 items-center */}
            <div className='mt-2 h-12 font-medium shadow-text text-lg'> 
              <span id='typed' />
            </div>
        </div>
        {/* --- END: 文字包裹器 --- */}

       {/* 首页导航大按钮 */}
        {siteConfig('HEXO_HOME_NAV_BUTTONS', null, CONFIG) && (
          <div style={{ position: 'relative', top: '-40px' }}> {/* <<<<< 在外面包一层 div 并添加样式 */}
            <NavButtonGroup {...props} />
          </div>
        )}

        {/* 滚动按钮 */}
        <div
          onClick={scrollToWrapper}
          className='z-10 cursor-pointer w-full text-center py-4 text-3xl absolute bottom-10 text-white'>
          <div className='opacity-70 animate-bounce text-xs'>
            {siteConfig('HEXO_SHOW_START_READING', null, CONFIG) &&
              locale.COMMON.START_READING}
          </div>
          <i className='opacity-70 animate-bounce fas fa-angle-down' />
        </div>
      </div>


      {/* --- 背景图与云雾效果 (保持不变) --- */}
      {/* 图层 1: 缓慢的“暖色高光云” (z-2) */}
      <div
        className='absolute top-0 left-0 w-full h-full'
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 245, 220, 0) 0%, rgba(255, 245, 220, 0.25) 50%, rgba(255, 245, 220, 0) 100%)',
          backgroundSize: '200% 100%',
          animation: 'moveMist 50s linear infinite',
          zIndex: 2,
          opacity: 0.6
        }}
      />
      {/* 图层 2: 较快的“冷色阴影云” (z-3) */}
      <div
        className='absolute top-0 left-0 w-full h-full'
        style={{
          backgroundImage:
            'linear-gradient(to left, rgba(180, 190, 210, 0) 0%, rgba(180, 190, 210, 0.15) 50%, rgba(180, 190, 210, 0) 100%)',
          backgroundSize: '200% 100%',
          animation: 'moveMist 22s linear infinite',
          zIndex: 3
        }}
      />
      {/* 背景图 (z-1) */}
      <LazyImage
        id='header-cover'
        alt={siteInfo?.title}
        src={siteInfo?.pageCover}
        style={{ zIndex: 1 }}
        className={`header-cover w-full h-screen object-cover object-center ${siteConfig('HEXO_HOME_NAV_BACKGROUND_IMG_FIXED', null, CONFIG) ? 'fixed' : ''}`}
      />
    </header>
  )
}

export default Hero
