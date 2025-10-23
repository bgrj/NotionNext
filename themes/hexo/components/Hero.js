// import Image from 'next/image'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
// 我们不再需要 useState
import { useEffect } from 'react'
import CONFIG from '../config'
import NavButtonGroup from './NavButtonGroup'

let wrapperTop = 0

/**
 * 顶部全屏大图
 * @returns
 */
const Hero = props => {
  // const [typed, changeType] = useState() // 已删除
  const { siteInfo } = props
  const { locale } = useGlobal()
  const scrollToWrapper = () => {
    window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
  }

  // const GREETING_WORDS = siteConfig('GREETING_WORDS').split(',') // 已删除
  useEffect(() => {
    updateHeaderHeight()

    // if (!typed && window && document.getElementById('typed')) { ... }
    // 上面整个打字机逻辑块都已被删除

    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
    }
  }) // 依赖项数组中的 typed 也已移除

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
      <div className='text-white absolute bottom-0 flex flex-col h-full items-center justify-center w-full '>
        {/* 站点标题 */}
        <div className='font-black text-4xl md:text-5xl shadow-text'>
          {siteInfo?.title || siteConfig('TITLE')}
        </div>

        {/* -------------------- START: 这里是修改后的代码 -------------------- */}
        {/* 站点欢迎语 */}
        <div className='mt-2 items-center text-center font-medium shadow-text text-lg'>
         {/* START: 你的新静态文本 */}
          <div className='text-gray-200 text-lg sm:text-xl font-light leading-tight sm:leading-normal animate-pulse'>
              <p className='mb-3'>
                  正是我们被动与主动选择接触、理解、认可的存在，塑造了我们过去现在未来之所是。
              </p>
              <p style={{ fontFamily: 'Georgia, serif' }}>
                  It is the existence we passively and actively <br />
                  choose to encounter | to understand | and to affirm <br />
                  that has shaped who we were | who we are | and who we will be
              </p>
          </div>
          {/* END: 你的新静态文本 */}
        </div>
        {/* -------------------- END: 这里是修改后的代码 -------------------- */}


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

      <LazyImage
        id='header-cover'
        alt={siteInfo?.title}
        src={siteInfo?.pageCover}
        className={`header-cover w-full h-screen object-cover object-center ${siteConfig('HEXO_HOME_NAV_BACKGROUND_IMG_FIXED', null, CONFIG) ? 'fixed' : ''}`}
      />
    </header>
  )
}

export default Hero
