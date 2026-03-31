import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer className='relative z-10 w-full flex-shrink-0 bg-white dark:bg-black/90 backdrop-blur-sm border-t border-gray-200 dark:border-white/5 transition-colors duration-300'>
      <div className='max-w-6xl mx-auto px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>

        {/* 左栏：版权 + 统计 */}
        <div className='flex flex-col gap-3 text-center md:text-left text-black dark:text-gray-300'>
          <a
            href='https://ourbeings.com/philosophy/2026/04/01/about'
            className='text-sm font-light tracking-wide text-black dark:text-gray-300 hover:text-[#C18A62] dark:hover:text-[#C18A62] transition-colors duration-300'>
            © 2026-2027 · Our beings
          </a>
          <div className='flex justify-center md:justify-start items-center gap-4 text-xs text-gray-600 dark:text-gray-400'>
            <span className='busuanzi_container_site_pv inline-flex items-center gap-1.5'>
              <i className='fas fa-eye' />
              <span>访问量</span>
              <span className='busuanzi_value_site_pv'>—</span>
            </span>
            <span className='busuanzi_container_site_uv inline-flex items-center gap-1.5'>
              <i className='fas fa-users' />
              <span>访客数</span>
              <span className='busuanzi_value_site_uv'>—</span>
            </span>
          </div>
        </div>

        {/* 中栏：哲言 + PoweredBy */}
        <div className='flex flex-col items-center gap-3 text-center'>
          <p className='text-xs leading-relaxed text-black dark:text-gray-300 font-light transition-colors duration-300'>
            让我们的存在与世界同在
          </p>
          <PoweredBy className='justify-center text-black dark:text-gray-300' />
        </div>

        {/* 右栏：ICP备案 + 赞赏 */}
        <div className='flex flex-col items-center md:items-end gap-3 text-center md:text-right'>
          <a
            href='https://ourbeings.com'
            title='查看存在者alliance详情'
            className='font-light text-black dark:text-gray-300 hover:text-[#C18A62] dark:hover:text-[#C18A62] transition-colors duration-300 text-sm'>
            存在者ICP备：2026033100号-01
          </a>
          <a
            href='https://afdian.com/a/ourbeings'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 text-black dark:text-gray-300 hover:text-[#C18A62] dark:hover:text-[#C18A62] transition-colors duration-300 text-xs font-light'>
            <i className='fas fa-bolt' />
            <span>为我们的存在发电</span>
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer