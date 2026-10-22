import { siteConfig } from '@/lib/config'
import throttle from 'lodash.throttle'
import SmartLink from '@/components/SmartLink'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const OurBeingsHeaderAuth = dynamic(() => import('./OurBeingsHeaderAuth'), {
  ssr: false
})

/** Minimal theme chrome: brand and the existing account entry only.
 * Navigation routes remain available; no authentication behavior is changed.
 */
const Header = ({ siteInfo }) => {
  const router = useRouter()
  useEffect(() => {
    let previousTop = window.scrollY
    const topNavStyleHandler = throttle(() => {
      const scrollTop = window.scrollY
      const nav = document.getElementById('sticky-nav')
      if (!nav) return
      const hero = document.getElementById('header')
      const showNav =
        scrollTop <= previousTop ||
        scrollTop < 5 ||
        (hero && scrollTop <= hero.clientHeight + 100)
      nav.classList.toggle('top-0', Boolean(showNav))
      nav.classList.toggle('-top-20', !showNav)
      previousTop = scrollTop
    }, 200)

    window.addEventListener('scroll', topNavStyleHandler, { passive: true })
    router.events.on('routeChangeComplete', topNavStyleHandler)
    topNavStyleHandler()
    return () => {
      router.events.off('routeChangeComplete', topNavStyleHandler)
      window.removeEventListener('scroll', topNavStyleHandler)
      topNavStyleHandler.cancel()
    }
  }, [router.events])

  return (
    <div id='top-nav' className='z-40'>
      <div
        id='sticky-nav'
        className='ob-sticky-nav top-0 fixed z-20 w-full duration-300 transition-all'>
        <div className='w-full flex justify-between items-center px-4 py-2'>
          <SmartLink href='/' passHref className='ob-logo'>
            {siteInfo?.title || siteConfig('TITLE')}
          </SmartLink>
          <div className='mr-1 flex justify-end items-center'>
            <OurBeingsHeaderAuth />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
