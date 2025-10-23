import QrCode from '@/components/QrCode'
import { siteConfig } from '@/lib/config'
import { useRef, useState } from 'react'
import { handleEmailClick } from '@/lib/plugins/mailEncrypt'

/**
 * 社交联系方式按钮组 (BGRJ 定制版)
 * @returns {JSX.Element}
 * @constructor
 */
const SocialButton = () => {
  // --- 1. 只定义你需要的 5 个变量 ---
  const CONTACT_EMAIL = siteConfig('CONTACT_EMAIL')
  const CONTACT_TELEGRAM = siteConfig('CONTACT_TELEGRAM')
  const CONTACT_THREADS = siteConfig('CONTACT_THREADS')
  const CONTACT_WHATSAPP = siteConfig('CONTACT_WHATSAPP')
  const CONTACT_WEHCHAT_PUBLIC = siteConfig('CONTACT_WEHCHAT_PUBLIC')

  // --- 2. 保留 Email 和 WeChat 需要的辅助功能 ---
  const [qrCodeShow, setQrCodeShow] = useState(false)
  const openPopover = () => {
    setQrCodeShow(true)
  }
  const closePopover = () => {
    setQrCodeShow(false)
  }
  const emailIcon = useRef(null)

  return (
    <div className='w-full justify-center flex-wrap flex'>
      <div className='space-x-3 text-xl flex items-center text-gray-600 dark:text-gray-300 '>
        
        {/* --- 3. 按你的顺序重新排列图标 --- */}

        {/* 1. 邮箱 (Email) */}
        {CONTACT_EMAIL && (
          <a
            onClick={e => handleEmailClick(e, emailIcon, CONTACT_EMAIL)}
            title='email'
            className='cursor-pointer'
            ref={emailIcon}>
            <i className='transform hover:scale-125 duration-150 fas fa-envelope dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {/* 2. Telegram */}
        {CONTACT_TELEGRAM && (
          <a
            target='_blank'
            rel='noreferrer'
            href={CONTACT_TELEGRAM}
            title={'telegram'}>
            <i className='transform hover:scale-125 duration-150 fab fa-telegram dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

       {/* 3. Threads (使用SVG) */}
      {CONTACT_THREADS && (
        <a
          target='_blank'
          rel='noreferrer'
          title={'threads'}
          href={CONTACT_THREADS}
          className={'transform hover:scale-125 duration-150'}>
          {/* 使用 img 标签加载 SVG 图标, 并用 dark:invert 在暗黑模式下反色 */}
          <img
            className='w-6 h-6 dark:invert'
            src='/svg/threads.svg'
            alt='threads'
          />
        </a>
      )}

        {/* 4. WhatsApp (新添加) */}
        {CONTACT_WHATSAPP && (
          <a
            target='_blank'
            rel='noreferrer'
            href={CONTACT_WHATSAPP}
            title={'whatsapp'}>
            <i className='transform hover:scale-125 duration-150 fab fa-whatsapp dark:hover:text-indigo-400 hover:text-indigo-600' />
          </a>
        )}

        {/* 5. 微信公众号 (WeChat Public) */}
        {CONTACT_WEHCHAT_PUBLIC && (
          <button
            onMouseEnter={openPopover}
            onMouseLeave={closePopover}
            aria-label={'微信公众号'}>
            <div id='wechat-button'>
              <i className='transform scale-105 hover:scale-125 duration-150 fab fa-weixin  dark:hover:text-indigo-400 hover:text-indigo-600' />
            </div>
            {/* 二维码弹框 */}
            <div className='absolute'>
              <div
                id='pop'
                className={
                  (qrCodeShow ? 'opacity-100 ' : ' invisible opacity-0') +
                  ' z-40 absolute bottom-10 -left-10 bg-white shadow-xl transition-all duration-200 text-center'
                }>
                <div className='p-2 mt-1 w-28 h-28'>
                  {qrCodeShow && <QrCode value={CONTACT_WEHCHAT_PUBLIC} />}
                </div>
              </div>
            </div>
          </button>
        )}

      </div>
    </div>
  )
}
export default SocialButton
