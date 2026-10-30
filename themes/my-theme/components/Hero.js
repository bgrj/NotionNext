import LazyImage from '@/components/LazyImage'
import HandGlow from './HandGlow'
import HeroPuzzle from './HeroPuzzle'

/**
 * 顶部全屏大图。
 * 欢迎语在导航栏内居中；四个入口绕手轮廓拼合。
 */
const Hero = props => {
  const { siteInfo } = props

  return (
    <header
      id='header'
      style={{ zIndex: 1 }}
      className='ob-home-hero w-full relative bg-black'
      data-ob-minimal-hero='true'
    >
      <HandGlow />
      <HeroPuzzle />

      <LazyImage
        priority
        id='header-cover'
        alt={siteInfo?.title}
        src='/assets/ourbeing/web-mainpage-downhand.90bc60e9a6ab.webp'
        width={1920}
        height={1080}
        className='header-cover absolute inset-0 z-0 h-full w-full object-cover object-center'
      />
      <style jsx global>{`
        #theme-my-theme.ob-home-only #ob-home-main {
          padding-top: var(--ob-home-nav-height, 64px);
        }
        #theme-my-theme .ob-home-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          height: calc(100vh - var(--ob-home-nav-height, 64px));
          height: calc(100svh - var(--ob-home-nav-height, 64px));
          min-height: 360px;
        }
      `}</style>
    </header>
  )
}

export default Hero
