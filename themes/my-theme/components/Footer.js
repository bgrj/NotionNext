import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'

const hoverGold =
  'hover:text-[#C9A66B] dark:hover:text-[#C9A66B] transition-colors duration-150'

const FooterLink = ({ href, children, external = false, title }) => {
  const className = `block py-1 text-gray-600 dark:text-gray-300 ${hoverGold}`
  if (external) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noreferrer noopener'
        title={title}
        className={className}>
        {children}
      </a>
    )
  }
  return (
    <a href={href} title={title} className={className}>
      {children}
    </a>
  )
}

const QrItem = ({ label, icon, src }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onPointerDown = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return (
    <div
      ref={ref}
      className='relative'
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <button
        type='button'
        aria-label={label}
        aria-expanded={open}
        onClick={e => {
          e.stopPropagation()
          setOpen(v => !v)
        }}
        className={`flex items-center gap-2 py-1 text-gray-600 dark:text-gray-300 ${hoverGold}`}>
        {icon}
        <span>{label}</span>
      </button>
      <div
        className={
          (open ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
          'absolute bottom-full left-0 z-40 mb-2 transition-all duration-200'
        }>
        <div className='rounded-md bg-white p-2 shadow-xl dark:bg-hexo-black-gray'>
          {open && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={label} className='h-36 w-36 object-contain' />
          )}
        </div>
      </div>
    </div>
  )
}

const Footer = () => {
  const brandName = siteConfig('FOOTER_BRAND_NAME', 'Our Beings（吾在）', CONFIG)
  const tagline = siteConfig('FOOTER_TAGLINE', siteConfig('BIO'), CONFIG)
  const favicon = siteConfig('FOOTER_FAVICON', siteConfig('BLOG_FAVICON'), CONFIG)
  const copyright = siteConfig(
    'FOOTER_COPYRIGHT',
    '© 2026-2028 ourbeings.com',
    CONFIG
  )
  const aboutUrl = siteConfig(
    'FOOTER_ABOUT_URL',
    'https://ourbeings.com/philosophy/2026/04/01/about',
    CONFIG
  )
  const copyrightUrl = siteConfig(
    'FOOTER_COPYRIGHT_URL',
    'https://ourbeings.com/copyright',
    CONFIG
  )
  const linksUrl = siteConfig('FOOTER_LINKS_URL', siteConfig('LINK'), CONFIG)
  const email = siteConfig('FOOTER_EMAIL', 'hsz@ourbeings.com', CONFIG)
  const wechatAlbum = siteConfig('FOOTER_WECHAT_ALBUM', '', CONFIG)
  const afdianUrl = siteConfig(
    'FOOTER_AFDIAN_URL',
    'https://afdian.com/a/ourbeings',
    CONFIG
  )
  const alipayQr = siteConfig('FOOTER_ALIPAY_QR', '', CONFIG)
  const wepayQr = siteConfig('FOOTER_WEPAY_QR', '', CONFIG)
  const icpText = siteConfig(
    'FOOTER_ICP_TEXT',
    '存在者ICP备 2025032878号-1',
    CONFIG
  )
  const icpUrl = siteConfig('FOOTER_ICP_URL', 'https://ourbeings.com/', CONFIG)
  const homeUrl = siteConfig('LINK')

  return (
    <footer className='relative z-10 w-full flex-shrink-0 bg-hexo-light-gray text-sm leading-6 text-gray-600 dark:bg-black dark:text-gray-100'>
      <div className='mx-auto max-w-6xl px-6 py-10 text-left'>
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8'>
          <div>
            <a href={homeUrl} className='inline-flex items-center gap-2'>
              {favicon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={favicon} alt={brandName} className='h-8 w-8' />
              )}
              <span className='text-base font-semibold text-gray-800 dark:text-gray-100'>
                {brandName}
              </span>
            </a>
            {tagline && (
              <p className='mt-3 text-gray-500 dark:text-gray-400'>{tagline}</p>
            )}
            <div className='mt-4 text-xs tracking-wide'>
              <span className='font-medium text-[#C9A66B]'>中文</span>
              <span className='mx-1.5 text-gray-400'>|</span>
              <span
                className='cursor-not-allowed text-gray-400'
                title='coming soon'>
                English
              </span>
            </div>
            <p className='mt-4 text-xs text-gray-500 dark:text-gray-400'>
              {copyright}
            </p>
          </div>

          <div>
            <div className='mb-3 text-sm font-semibold text-gray-800 dark:text-gray-100'>
              关于
            </div>
            <nav>
              <FooterLink href={aboutUrl}>About</FooterLink>
              <FooterLink href={copyrightUrl}>版权声明</FooterLink>
              <FooterLink href={linksUrl}>友链</FooterLink>
              {email && (
                <FooterLink href={`mailto:${email}`}>{email}</FooterLink>
              )}
              {wechatAlbum && (
                <FooterLink href={wechatAlbum} external>
                  公众号
                </FooterLink>
              )}
            </nav>
          </div>

          <div>
            <div className='mb-3 text-sm font-semibold text-gray-800 dark:text-gray-100'>
              为吾在发电
            </div>
            <div>
              <FooterLink href={afdianUrl} external title='爱发电'>
                <span className='inline-flex items-center gap-2'>
                  <i className='fas fa-bolt' />
                  爱发电
                </span>
              </FooterLink>
              {alipayQr && (
                <QrItem
                  label='支付宝'
                  src={alipayQr}
                  icon={<i className='fab fa-alipay' />}
                />
              )}
              {wepayQr && (
                <QrItem
                  label='微信'
                  src={wepayQr}
                  icon={<i className='fab fa-weixin' />}
                />
              )}
            </div>
          </div>

          <div>
            <div className='mb-3 text-sm font-semibold text-gray-800 dark:text-gray-100'>
              站点
            </div>
            <div className='space-y-2'>
              <div className='flex flex-wrap gap-x-4 gap-y-1'>
                <span className='hidden busuanzi_container_site_pv'>
                  <i className='fas fa-eye' />
                  <span className='px-1 busuanzi_value_site_pv'> </span>
                </span>
                <span className='hidden busuanzi_container_site_uv'>
                  <i className='fas fa-users' />
                  <span className='px-1 busuanzi_value_site_uv'> </span>
                </span>
              </div>
              {icpText && (
                <a
                  href={icpUrl}
                  className={`block text-gray-600 dark:text-gray-300 ${hoverGold}`}>
                  {icpText}
                </a>
              )}
              <div className='text-left'>
                <PoweredBy className='justify-start' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
