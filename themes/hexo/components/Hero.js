// import Image from 'next/image'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useState } from 'react' // 必须重新加回 useState
import CONFIG from '../config'
import NavButtonGroup from './NavButtonGroup'

let wrapperTop = 0

/**
 * 顶部全屏大图
 * @returns
 */
const Hero = props => {
  const [typed, changeType] = useState() // 必须恢复
  const { siteInfo } = props
  const { locale } = useGlobal()
  const scrollToWrapper = () => {
    window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
  }

  const GREETING_WORDS = siteConfig('GREETING_WORDS').split(',') // 必须恢复
  useEffect(() => {
    updateHeaderHeight()

    if (!typed && window && document.getElementById('typed')) { // 必须恢复打字机逻辑
      loadExternalResource('/js/typed.min.js', 'js').then(() => {
        if (window.Typed) {
          changeType(
            new window.Typed('#typed', {
              strings: GREETING_WORDS,
              typeSpeed: 80,      // (原 300) 打字速度：80毫秒/字 (总共约 3 秒)
              backSpeed: 30,      // (原 200) 删除速度：30毫秒/字 (快速删除)
              backDelay: 5000,    // (原 400) 打完后的停留时间：5000毫秒 (暂停 5 秒，让访客有足够时间阅读)
              showCursor: true,
              smartBackspace: true,
              loop: true // 确保它循环播放
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
        
      {/* -------------------- START: 修改点 A (添加 zIndex: 10) -------------------- */}
      <div style={{ zIndex: 10 }} className='text-white absolute bottom-0 flex flex-col h-full items-center justify-center w-full '>
      {/* -------------------- END: 修改点 A -------------------- */}

        {/* 站点标题 */}
        <div className='font-black text-4xl md:text-5xl shadow-text'>
          {siteInfo?.title || siteConfig('TITLE')}
        </div>
        
        {/* -------------------- START: 恢复的代码 -------------------- */}
        {/* 站点欢迎语 */}
        <div className='mt-2 h-12 items-center text-center font-medium shadow-text text-lg'>
          <span id='typed' />
        </div>
        {/* -------------------- END: 恢复的代码 -------------------- */}


        {/* 首页导航大按钮 */}
        {siteConfig('HEXO_HOME_NAV_BUTTONS', null, CONFIG) && (
          <NavButtonGroup {...props} />
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

    {/* -------------------- START: 动态云层效果 (两层) -------------------- */}

      {/* 图层 1: 缓慢的背景云 (z-2) */}
      <div
        className='absolute top-0 left-0 w-full h-full'
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0) 100%)',
          backgroundSize: '200% 100%',
          animation: 'moveMist 40s linear infinite', // 速度很慢 (40秒)
          zIndex: 2, // 在底层
          opacity: 0.6 // 整体 80% 透明度
        }}
      />

      {/* 图层 2: 较快的前景云 (z-3) */}
      <div
        className='absolute top-0 left-0 w-full h-full'
        style={{
          backgroundImage:
            'linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)', // 渐变方向相反 (to left)
          backgroundSize: '200% 100%',
          animation: 'moveMist 18s linear infinite', // 速度较快 (18秒)
          zIndex: 3 // 在上层 (确保在文字 z-10 之下)
        }}
      />

      {/* -------------------- END: 动态云层效果 -------------------- */}


      {/* -------------------- START: 修改点 C (添加 zIndex: 1) -------------------- */}
      <LazyImage
        id='header-cover'
        alt={siteInfo?.title}
        src={siteInfo?.pageCover}
        style={{ zIndex: 1 }} // <-- 在这里添加 zIndex
        className={`header-cover w-full h-screen object-cover object-center ${siteConfig('HEXO_HOME_NAV_BACKGROUND_IMG_FIXED', null, CONFIG) ? 'fixed' : ''}`}
      />
      {/* -------------------- END: 修改点 C -------------------- */}
    </header>
  )
}

export default Hero
