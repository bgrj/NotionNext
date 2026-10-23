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
      className='w-full h-screen relative bg-black'
      data-ob-minimal-hero='true'
    >
      <HandGlow />
      <HeroPuzzle />

      <LazyImage
        priority
        id='header-cover'
        alt={siteInfo?.title}
        src={siteInfo?.pageCover}
        width={1920}
        height={1080}
        className='header-cover absolute inset-0 z-0 h-full w-full object-cover object-center'
      />
    </header>
  )
}

export default Hero
