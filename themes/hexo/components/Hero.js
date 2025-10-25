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

    {/* --- 主要内容容器 (现在是绝对定位的上下文) --- */}
      <div style={{ zIndex: 10 }} className='text-white absolute top-0 left-0 w-full h-full'> {/* 移除了 flex 相关类 */}

        {/* --- 文字块 (绝对定位, 垂直+水平居中) --- */}
        <div style={{
          position: 'absolute',
          top: '45%', // 垂直居中
          left: '50%', // 水平居中
          transform: 'translate(-50%, -50%)', // 精确居中校准
          textAlign: 'center', // 确保内部文字居中
          width: '90%' // 防止超长标题换行时宽度溢出
        }}>
            {/* 站点标题 */}
            <div className='font-black text-4xl md:text-5xl shadow-text'>
              {siteInfo?.title || siteConfig('TITLE')}
            </div>

            {/* 站点欢迎语 */}
            <div className='mt-2 h-12 font-medium shadow-text text-lg w-full'> {/* 保持 w-full 防止晃动 */}
              <span id='typed' />
            </div>
        </div>
        {/* --- END: 文字块 --- */}


        {/* --- 首页导航大按钮 (绝对定位, 水平居中, 垂直位置可调) --- */}
        {siteConfig('HEXO_HOME_NAV_BUTTONS', null, CONFIG) && (
          <div style={{
            position: 'absolute',
            top: '40%', // <<<<< 调整这个百分比来控制按钮的垂直位置 (50% = 中心线, 数字越大越靠下)
            left: '50%', // 水平居中
            transform: 'translateX(-50%)' // 水平居中校准
          }}>
            <NavButtonGroup {...props} />
          </div>
        )}
        {/* --- END: 按钮块 --- */}

        {/* 滚动按钮 */}
        <div
          onClick={scrollToWrapper}
          className='z-10 cursor-pointer w-full text-center py-4 text-3xl absolute bottom-10 shadow-text text-white'>
          <div className='opacity-60 animate-bounce text-xs'>
            {siteConfig('HEXO_SHOW_START_READING', null, CONFIG) &&
              locale.COMMON.START_READING}
          </div>
          <i className='opacity-60 animate-bounce fas fa-angle-down' />
        </div>
      </div>


     {/* --- START: 动态柔和火烧云效果 (两层，与背景图风格统一) --- */}

      {/* 图层 1: 缓慢的“浅橙色暖光云” (z-2) */}
      <div
        className='absolute top-0 left-0 w-full h-full'
        style={{
          // 使用更柔和、明亮的浅橙色，模拟背景中的暖光
          backgroundImage:
            'linear-gradient(to right, rgba(255, 192, 128, 0) 0%, rgba(255, 192, 128, 0.15) 50%, rgba(255, 192, 128, 0) 100%)', // 浅橙色 (Peach-Orange), 15% opacity center
          backgroundSize: '200% 100%',
          animation: 'moveMist 70s linear infinite', // 速度更慢，更柔和
          zIndex: 2, // 在底层
          opacity: 0.8 // 整体 80% 透明度，让光感更明显但不过重
        }}
      />

      {/* 图层 2: 较快的“淡粉色高光云” (z-3) */}
      <div
        className='absolute top-0 left-0 w-full h-full'
        style={{
          // 使用淡粉色，模拟日落时云层边缘被染上的高光和色彩
          backgroundImage:
            'linear-gradient(to left, rgba(255, 220, 220, 0) 0%, rgba(255, 220, 220, 0.20) 50%, rgba(255, 220, 220, 0) 100%)', // 淡粉色 (Pale Pink), 20% opacity center
          backgroundSize: '200% 100%',
          animation: 'moveMist 35s linear infinite', // 速度适中，增加流动感
          zIndex: 3 // 在上层
        }}
      />

      {/* --- END: 动态柔和火烧云效果 --- */}


      {/* 背景图 (z-1) - 保持不变 */}
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
