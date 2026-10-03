import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import SmartLink from '@/components/SmartLink'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import { isClerkEnabled } from '../beings'
import ButtonRandomPost from '@/themes/hexo/components/ButtonRandomPost'
import CategoryGroup from '@/themes/hexo/components/CategoryGroup'
import { MenuListTop } from './MenuListTop'
import SearchButton from './SearchButton'
import SearchDrawer from '@/themes/hexo/components/SearchDrawer'
import SideBar from '@/themes/hexo/components/SideBar'
import SideBarDrawer from '@/themes/hexo/components/SideBarDrawer'
import TagGroups from '@/themes/hexo/components/TagGroups'

const OurBeingsHeaderAuth = dynamic(() => import('./OurBeingsHeaderAuth'), {
  ssr: false
})

let windowTop = 0

/**
 * 顶部导航：始终保持可读底与字色，不随头图改成白字。
 */
const Header = props => {
  const searchDrawer = useRef()
  const { tags, currentTag, categories, currentCategory, siteInfo } = props
  const { locale, isDarkMode, toggleDarkMode } = useGlobal()
  const router = useRouter()
  const [isOpen, changeShow] = useState(false)
  const showSearchButton = siteConfig('HEXO_MENU_SEARCH', false, CONFIG)
  const showRandomButton = siteConfig('HEXO_MENU_RANDOM', false, CONFIG)
  const showDarkButton = siteConfig('HEXO_WIDGET_DARK_MODE', true, CONFIG)

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  const toggleSideBarClose = () => {
    changeShow(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', topNavStyleHandler, { passive: true })
    router.events.on('routeChangeComplete', topNavStyleHandler)
    topNavStyleHandler()
    return () => {
      router.events.off('routeChangeComplete', topNavStyleHandler)
      window.removeEventListener('scroll', topNavStyleHandler)
    }
  }, [])

  const throttleMs = 200

  const topNavStyleHandler = useCallback(
    throttle(() => {
      const scrollS = window.scrollY
      const nav = document.querySelector('#sticky-nav')
      if (!nav) return
      const header = document.querySelector('#header')
      const showNav =
        scrollS <= windowTop ||
        scrollS < 5 ||
        (header && scrollS <= header.clientHeight + 100)
      if (!showNav) {
        nav.classList.replace('top-0', '-top-20')
      } else {
        nav.classList.replace('-top-20', 'top-0')
      }
      windowTop = scrollS
    }, throttleMs)
  )

  const searchDrawerSlot = (
    <>
      {categories && (
        <section className='mt-8'>
          <div className='text-sm flex flex-nowrap justify-between font-light px-2'>
            <div className='text-gray-600 dark:text-gray-200'>
              <i className='mr-2 fas fa-th-list' />
              {locale.COMMON.CATEGORY}
            </div>
            <SmartLink
              href={'/category'}
              passHref
              className='mb-3 text-gray-400 hover:text-black dark:text-gray-400 dark:hover:text-white hover:underline cursor-pointer'>
              {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
            </SmartLink>
          </div>
          <CategoryGroup
            currentCategory={currentCategory}
            categories={categories}
          />
        </section>
      )}

      {tags && (
        <section className='mt-4'>
          <div className='text-sm py-2 px-2 flex flex-nowrap justify-between font-light dark:text-gray-200'>
            <div className='text-gray-600 dark:text-gray-200'>
              <i className='mr-2 fas fa-tag' />
              {locale.COMMON.TAGS}
            </div>
            <SmartLink
              href={'/tag'}
              passHref
              className='text-gray-400 hover:text-black  dark:hover:text-white hover:underline cursor-pointer'>
              {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
            </SmartLink>
          </div>
          <div className='p-2'>
            <TagGroups tags={tags} currentTag={currentTag} />
          </div>
        </section>
      )}
    </>
  )

  return (
    <div id='top-nav' className='z-40'>
      <SearchDrawer cRef={searchDrawer} slot={searchDrawerSlot} />

      <div id='sticky-nav' className='ob-sticky-nav top-0 fixed z-20 w-full duration-300 transition-all'>
        <div className='w-full flex justify-between items-center px-4 py-2'>
          <SmartLink href='/' passHref className='ob-logo'>
            {siteInfo?.title || siteConfig('TITLE')}
          </SmartLink>

          <div className='mr-1 flex justify-end items-center'>
            <div className='hidden lg:flex ob-top-nav items-center'>
              <MenuListTop {...props} />
            </div>
            <div
              onClick={toggleMenuOpen}
              className='w-8 justify-center items-center h-8 cursor-pointer flex lg:hidden'>
              {isOpen ? (
                <i className='fas fa-times' />
              ) : (
                <i className='fas fa-bars' />
              )}
            </div>
            {isClerkEnabled() ? (
              <OurBeingsHeaderAuth />
            ) : (
              <SmartLink
                href={'/sign-up'}
                className='menu-link mr-1 whitespace-nowrap text-sm'>
                注册 / 登录
              </SmartLink>
            )}
            {showDarkButton && (
              <button
                type='button'
                className='ob-dark-toggle'
                onClick={toggleDarkMode}
                title={isDarkMode ? '浅色模式' : '深色模式'}
                aria-label={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}>
                <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`} />
              </button>
            )}
            {showSearchButton && <SearchButton />}
            {showRandomButton && <ButtonRandomPost {...props} />}
          </div>
        </div>
      </div>

      <SideBarDrawer isOpen={isOpen} onClose={toggleSideBarClose}>
        <SideBar {...props} />
      </SideBarDrawer>
    </div>
  )
}

export default Header
