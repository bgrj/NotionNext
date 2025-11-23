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
    <footer className='relative z-10 dark:bg-black flex-shrink-0 bg-hexo-light-gray justify-center text-center m-auto w-full leading-6 text-gray-600 dark:text-gray-100 text-sm p-6'>
      
      {/* ———— 1. 第一行：版权归属 + 访问统计 (已移除爱心) ———— */}
      <div className='flex justify-center items-center flex-wrap gap-2'>
        {/* 版权符号与年份 */}
        <i className='fas fa-copyright' /> {`${copyrightDate}`}
        
        {/* 作者链接 */}
        <a
          href={siteConfig('LINK')}
          className='underline font-bold dark:text-gray-300 ml-1'>
          {siteConfig('AUTHOR')}
        </a>

        {/* 访问统计 */}
        <span className='hidden busuanzi_container_site_pv ml-2'>
          <i className='fas fa-eye mr-1' />
          <span className='px-1 busuanzi_value_site_pv'> </span>
        </span>
        <span className='hidden busuanzi_container_site_uv ml-2'>
          <i className='fas fa-users mr-1' />
          <span className='px-1 busuanzi_value_site_uv'> </span>
        </span>
      </div>

      {/* ———— 2. 第二行：Bio 个人简介 ———— */}
      <h1 className='text-xs pt-4 pb-4 text-light-400 dark:text-gray-400'>
        {title} {siteConfig('BIO') && <>|</>} {siteConfig('BIO')}
      </h1>

      {/* ———— 3. 第三行：版权声明 & 具体的联系方式列表 ———— */}
      <div className='border-t border-gray-200 dark:border-gray-800 pt-4 pb-2 text-xs text-gray-500 dark:text-gray-400 font-sans flex flex-wrap justify-center items-center gap-x-1'>
          
          {/* 版权声明 (单独在左边) */}
          <a href='/copyright' className='hover:underline hover:text-indigo-600'>版权声明</a>
          
          <span className='mx-3 text-gray-300'>|</span>
          
          {/* 联系方式区域 */}
          <span>联系方式：</span> {/* 纯文本标签 */}
          
          {/* 1. 邮箱 */}
          <a href={`mailto:${siteConfig('CONTACT_EMAIL')}`} className='hover:underline hover:text-indigo-600 ml-1'>Mail</a>
          <span className='mx-2 text-gray-300'>/</span>
          
          {/* 2. 电报 (Telegram) */}
          <a href='https://t.me/BGRJETSZ' target='_blank' rel='noreferrer' className='hover:underline hover:text-indigo-600'>Telegram</a>
          <span className='mx-2 text-gray-300'>/</span>

          {/* 3. Threads (请记得替换下面的链接) */}
          <a href='https://www.threads.com/@bu.guo.ren.jian' target='_blank' rel='noreferrer' className='hover:underline hover:text-indigo-600'>Threads</a>
          <span className='mx-2 text-gray-300'>/</span>

          {/* 4. WhatsApp (请记得替换下面的链接) */}
          <a href='https://chat.whatsapp.com/BsQWGqCYYaTCw7khlsq4gx?mode=wwc' target='_blank' rel='noreferrer' className='hover:underline hover:text-indigo-600'>WhatsApp</a>
      
          {/* 5. Official Account (请记得替换下面的链接) */}
          <a href='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzk0MDQ5NTg3Nw==#wechat_redirect' target='_blank' rel='noreferrer' className='hover:underline hover:text-indigo-600'>Official Account</a>


      </div>

      {/* ———— 4. 底部：Written by ———— */}
      <div className='text-xs mt-2'>
         <span className='mr-2'><BeiAnSite /></span>
         <span className='mr-2'><BeiAnGongAn /></span>
         <div className='mt-2'>
            <PoweredBy className='justify-center' />
         </div>
      </div>

      <br />
    </footer>
  )
}

export default Footer
