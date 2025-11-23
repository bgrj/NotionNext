import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'

const Footer = ({ title }) => {
  // ———— 逻辑部分完全保留 ————
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer className='relative z-10 dark:bg-black flex-shrink-0 bg-hexo-light-gray justify-center text-center m-auto w-full leading-6 text-gray-600 dark:text-gray-100 text-sm p-6'>
      
      {/* ———— 1. 第一行：版权归属 + 访问统计 ———— */}
      {/* 使用 flex 布局替代原来的 <br/>，实现单行居中 */}
      <div className='flex justify-center items-center flex-wrap gap-2'>
        <i className='fas fa-copyright' /> {`${copyrightDate}`}
        <span className='mx-1 animate-pulse'>
           <i className='fas fa-heart text-red-500' />
        </span>
        <a
          href={siteConfig('LINK')}
          className='underline font-bold dark:text-gray-300 '>
          {siteConfig('AUTHOR')}
        </a>

        {/* 访问统计 (保留原类名以便脚本抓取数据) */}
        <span className='hidden busuanzi_container_site_pv ml-2'>
          <i className='fas fa-eye mr-1' />
          <span className='px-1 busuanzi_value_site_pv'> </span>
        </span>
        <span className='hidden busuanzi_container_site_uv ml-2'>
          <i className='fas fa-users mr-1' />
          <span className='px-1 busuanzi_value_site_uv'> </span>
        </span>
      </div>

      {/* ———— 2. 第二行：Bio (保留原代码) ———— */}
      <h1 className='text-xs pt-4 pb-4 text-light-400 dark:text-gray-400'>
        {title} {siteConfig('BIO') && <>|</>} {siteConfig('BIO')}
      </h1>

      {/* ———— 3. 第三行：新增的链接板块 (版权声明、联系方式、Telegram) ———— */}
      {/* 这是一个新增的 div，用于实现你想要的“官网风格”链接栏 */}
      <div className='border-t border-gray-200 dark:border-gray-800 pt-4 pb-2 text-xs text-gray-500 dark:text-gray-400 font-sans flex flex-wrap justify-center items-center gap-x-1'>
          
          <a href='/copyright' className='hover:underline hover:text-indigo-600'>版权声明</a>
          <span className='mx-2 text-gray-300'>|</span>
          
          <a href='/contact' className='hover:underline hover:text-indigo-600'>联系方式</a>
          <span className='mx-2 text-gray-300'>|</span>
          
          <a href='https://t.me/BGRJETSZ' target='_blank' rel='noreferrer' className='hover:underline hover:text-indigo-600'>Telegram</a>
          <span className='mx-2 text-gray-300'>|</span>
          
          <a href={`mailto:${siteConfig('CONTACT_EMAIL')}`} className='hover:underline hover:text-indigo-600'>公开信箱</a>
      </div>

      {/* ———— 4. 底部：保留未变动的组件 (备案 & PoweredBy) ———— */}
      <div className='text-xs mt-2'>
         {/* 保留 BeiAn 组件，虽然你可能没填数据，但保留代码不删除 */}
         <span className='mr-2'><BeiAnSite /></span>
         <span className='mr-2'><BeiAnGongAn /></span>
         
         {/* Written by (即修改后的 PoweredBy) */}
         <div className='mt-2'>
            <PoweredBy className='justify-center' />
         </div>
      </div>

      <br />
    </footer>
  )
}

export default Footer
