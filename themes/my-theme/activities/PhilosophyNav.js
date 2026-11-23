import { useEffect, useRef, useState } from 'react'
import SmartLink from '@/components/SmartLink'
import { useActivityLanguage } from './language'
import styles from './activities.module.css'
export default function PhilosophyNav({ active = 'our', onCreate }) {
  const { t } = useActivityLanguage()
  const [open, setOpen] = useState(false)
  const plus = useRef(null),
    panel = useRef(null)
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    panel.current?.querySelector('button')?.focus()
    const key = event => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'Tab') {
        const buttons = [...panel.current.querySelectorAll('button')]
        const first = buttons[0],
          last = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', key)
    return () => {
      document.removeEventListener('keydown', key)
      previous?.focus()
    }
  }, [open])
  const choose = kind => {
    setOpen(false)
    onCreate?.(kind)
  }
  return (
    <>
      <nav className={styles.philosophyNav} aria-label='Our Being / My Being'>
        <SmartLink
          href='/our-beings'
          aria-current={active === 'our' ? 'page' : undefined}
        >
          <span>Our Being</span>
          <small>{t('与世界同在')}</small>
        </SmartLink>
        <button
          type='button'
          ref={plus}
          onClick={() => setOpen(true)}
          aria-label='创建菜单 / Create'
          aria-expanded={open}
        >
          ＋
        </button>
        <SmartLink
          href='/our-beings/me'
          aria-current={active === 'my' ? 'page' : undefined}
        >
          <span>My Being</span>
          <small>{t('与自我疏离')}</small>
        </SmartLink>
      </nav>
      {open && (
        <div className={styles.sheetMask} onClick={() => setOpen(false)}>
          <div
            ref={panel}
            className={styles.sheet}
            role='dialog'
            aria-modal='true'
            aria-label={active === 'our' ? t('发起一次相遇') : t('我的空间')}
            onClick={event => event.stopPropagation()}
          >
            {active === 'our' ? (
              <>
                <button type='button' onClick={() => choose('reading')}>
                  {t('发起共读')}
                </button>
                <button type='button' onClick={() => choose('conversation')}>
                  {t('发起共话')}
                </button>
              </>
            ) : (
              <button type='button' onClick={() => choose('writing')}>
                {t('我的空间')}
              </button>
            )}
            <button
              type='button'
              className={styles.cancelSheet}
              onClick={() => setOpen(false)}
            >
              {t('取消')}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
