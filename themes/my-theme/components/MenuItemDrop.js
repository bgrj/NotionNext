import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

/**
 * 顶栏菜单：收紧字距，不显示一级图标，避免「友情链接」被挤出视口
 */
export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0
  const name = link?.name || link?.title

  if (!link || !link.show) {
    return null
  }

  return (
    <div
      className='ob-nav-item relative'
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>
      {!hasSubMenu && (
        <SmartLink
          href={link?.href}
          target={link?.target}
          className='menu-link ob-nav-link px-2.5 no-underline tracking-wide whitespace-nowrap block'>
          {name}
        </SmartLink>
      )}

      {hasSubMenu && (
        <>
          <div className='cursor-pointer menu-link ob-nav-link px-2.5 no-underline tracking-wide whitespace-nowrap relative'>
            {name}
            <i
              className={`ml-1 fa fa-angle-down duration-300 ${show ? 'rotate-180' : 'rotate-0'}`}></i>
            {show && (
              <div className='absolute w-full h-3 -bottom-1 left-0 bg-transparent z-30'></div>
            )}
          </div>
        </>
      )}

      {hasSubMenu && (
        <ul
          style={{ backdropFilter: 'blur(3px)' }}
          className={`${show ? 'visible opacity-100 top-12 pointer-events-auto' : 'invisible opacity-0 top-20 pointer-events-none'} drop-shadow-md overflow-hidden rounded-md text-black dark:text-white bg-white dark:bg-black transition-all duration-300 z-20 absolute block`}>
          {link.subMenus.map((sLink, index) => {
            return (
              <li
                key={index}
                className='cursor-pointer hover:bg-indigo-500 hover:text-white tracking-wide transition-all duration-200 dark:border-gray-800 py-1 pr-6 pl-3'>
                <SmartLink
                  href={sLink.href}
                  target={sLink?.target || link?.target}>
                  <span className='text-sm text-nowrap font-extralight'>
                    {sLink?.icon && <i className={sLink.icon}> &nbsp; </i>}
                    {sLink.name || sLink.title}
                  </span>
                </SmartLink>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
