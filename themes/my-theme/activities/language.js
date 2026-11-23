import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { language, translate } from '@/apps/wuzai/miniprogram/common/i18n'
import styles from './being-surface.module.css'
const Context = createContext({
  locale: 'zh',
  t: value => value,
  setLocale: () => {}
})
export function ActivityLanguageProvider({ children }) {
  const [locale, update] = useState('zh')
  useEffect(() => {
    let saved
    try {
      saved = localStorage.getItem('ourbeing:language')
    } catch {
      /* Storage can be unavailable. */
    }
    update(
      saved === 'zh' || saved === 'en' ? saved : language(navigator.language)
    )
  }, [])
  const setLocale = useCallback(next => {
    update(next)
    try {
      localStorage.setItem('ourbeing:language', next)
    } catch {
      /* Switching remains usable without storage. */
    }
  }, [])
  const t = useCallback(value => translate(value, locale), [locale])
  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  )
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export const useActivityLanguage = () => useContext(Context)
export function LanguageSwitch() {
  const { locale, setLocale } = useActivityLanguage()
  return (
    <div
      role='group'
      aria-label='中文 / English'
      className={styles.languageSwitch}
    >
      <button
        type='button'
        aria-pressed={locale === 'zh'}
        onClick={() => setLocale('zh')}
      >
        中文
      </button>
      <button
        type='button'
        aria-pressed={locale === 'en'}
        onClick={() => setLocale('en')}
      >
        English
      </button>
    </div>
  )
}
