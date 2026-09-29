import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'

/**
 * 深色模式按钮
 */
export default function ButtonDarkModeFloat() {
  const { isDarkMode, toggleDarkMode } = useGlobal()

  if (!siteConfig('HEXO_WIDGET_DARK_MODE', null, CONFIG)) {
    return <></>
  }

  return (
    <div
      onClick={toggleDarkMode}
      title={`${isDarkMode ? '浅色模式' : '深色模式'}`}
      className={
        'justify-center items-center w-7 h-7 text-center transform hover:scale-105 duration-200'
      }>
      <i
        id='darkModeButton'
        className={`${isDarkMode ? 'fa-sun' : 'fa-moon'} fas text-xs`}
      />
    </div>
  )
}
