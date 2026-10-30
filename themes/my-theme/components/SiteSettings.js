import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useId, useRef, useState } from 'react'
import CONFIG from '../config'
import { UI_LANGUAGE_LABELS, uiLanguageOptions } from '../readingSettings'

const AccountLinks = dynamic(() => import('./OurBeingsHeaderAuth'), {
  ssr: false
})

/** A non-modal, keyboard-accessible popover; it never changes article content. */
export default function SiteSettings({ onOpenChange } = {}) {
  const {
    lang = 'zh-CN',
    changeLang,
    isDarkMode,
    toggleDarkMode
  } = useGlobal() || {}
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const panelId = useId()
  const english = lang.startsWith('en')
  const title = english ? 'Site settings' : '网站设置'
  const languages = uiLanguageOptions(
    siteConfig('OURBEINGS_UI_LANGUAGES', CONFIG.OURBEINGS_UI_LANGUAGES, CONFIG),
    lang
  )

  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!open) return undefined
    const closeOutside = event => {
      if (!containerRef.current?.contains(event.target)) setOpen(false)
    }
    const closeEscape = event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    const closeRoute = () => setOpen(false)
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('focusin', closeOutside)
    document.addEventListener('keydown', closeEscape)
    router.events?.on('routeChangeStart', closeRoute)
    containerRef.current?.querySelector('[data-settings-first]')?.focus()
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('focusin', closeOutside)
      document.removeEventListener('keydown', closeEscape)
      router.events?.off('routeChangeStart', closeRoute)
    }
  }, [open, router.events])

  return (
    <div className='ob-settings' ref={containerRef} lang={lang}>
      <button
        type='button'
        ref={triggerRef}
        className='ob-settings-trigger'
        aria-label={title}
        title={title}
        aria-haspopup='dialog'
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen(value => !value)}
      >
        <svg
          width='22'
          height='22'
          viewBox='0 0 24 24'
          fill='none'
          aria-hidden='true'
        >
          <path
            d='M4 6h16M4 12h16M4 18h16'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
          />
        </svg>
      </button>
      {open && (
        <section
          id={panelId}
          className='ob-settings-panel'
          role='dialog'
          aria-label={title}
        >
          <div className='ob-settings-heading'>
            <strong>{title}</strong>
            <button
              type='button'
              className='ob-settings-close'
              aria-label={english ? 'Close settings' : '关闭设置'}
              onClick={() => {
                setOpen(false)
                triggerRef.current?.focus()
              }}
            >
              ×
            </button>
          </div>
          <fieldset className='ob-settings-group'>
            <legend>{english ? 'Appearance' : '外观模式'}</legend>
            <div className='ob-settings-appearance'>
              <button
                type='button'
                data-settings-first
                aria-pressed={!isDarkMode}
                onClick={() => {
                  if (isDarkMode) toggleDarkMode?.()
                }}
              >
                {english ? 'Light' : '浅色'}
              </button>
              <button
                type='button'
                aria-pressed={Boolean(isDarkMode)}
                onClick={() => {
                  if (!isDarkMode) toggleDarkMode?.()
                }}
              >
                {english ? 'Dark' : '深色'}
              </button>
            </div>
          </fieldset>
          <div className='ob-settings-group'>
            <label htmlFor={`${panelId}-language`}>
              {english ? 'Interface language' : '界面语言'}
            </label>
            <select
              id={`${panelId}-language`}
              value={lang}
              onChange={event => changeLang?.(event.target.value, true)}
            >
              {languages.map(code => (
                <option key={code} value={code}>
                  {UI_LANGUAGE_LABELS[code]}
                </option>
              ))}
            </select>
            <p className='ob-settings-hint'>
              {english
                ? 'Changes interface labels; articles stay in their original language.'
                : '切换界面文字，文章保持原文。'}
            </p>
          </div>
          <div className='ob-settings-group'>
            <h2>{english ? 'Account' : '账户'}</h2>
            <AccountLinks english={english} onNavigate={() => setOpen(false)} />
          </div>
        </section>
      )}
      <style jsx global>{`
        #theme-my-theme .ob-settings {
          position: relative;
        }
        #theme-my-theme .ob-settings-trigger,
        #theme-my-theme .ob-settings-close {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: inherit;
          cursor: pointer;
        }
        #theme-my-theme .ob-settings-trigger:hover,
        #theme-my-theme .ob-settings-trigger[aria-expanded='true'],
        #theme-my-theme .ob-settings-close:hover {
          background: rgba(120, 104, 80, 0.12);
        }
        #theme-my-theme
          .ob-sticky-nav.ob-nav-settings-open {
          transform: none;
        }
        #theme-my-theme .ob-settings-panel {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: min(22rem, calc(100vw - 2rem));
          max-height: calc(100dvh - var(--ob-home-nav-height, 4rem) - 1.5rem);
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 0.75rem 1rem 1rem;
          border: 1px solid rgba(120, 104, 80, 0.25);
          border-radius: 16px;
          background: #fffaf2;
          color: #332b24;
          box-shadow: 0 14px 44px rgba(20, 16, 12, 0.2);
          text-align: left;
          font-size: 15px;
          line-height: 1.6;
        }
        .dark #theme-my-theme .ob-settings-panel {
          background: #1b1c1b;
          color: #f0e8dc;
          border-color: rgba(242, 201, 132, 0.28);
        }
        #theme-my-theme .ob-settings-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        #theme-my-theme .ob-settings-heading strong {
          font-size: 16px;
        }
        #theme-my-theme .ob-settings-close {
          font-size: 25px;
        }
        #theme-my-theme .ob-settings-group {
          display: block;
          min-width: 0;
          margin: 0.75rem 0 0;
          padding: 0;
          border: 0;
        }
        #theme-my-theme .ob-settings-group legend,
        #theme-my-theme .ob-settings-group label,
        #theme-my-theme .ob-settings-group h2 {
          display: block;
          padding: 0;
          margin: 0 0 0.45rem;
          font-size: 14px;
          font-weight: 600;
          color: inherit;
        }
        #theme-my-theme .ob-settings-appearance,
        #theme-my-theme .ob-settings-account-links {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        #theme-my-theme .ob-settings-appearance button,
        #theme-my-theme .ob-settings-account-links a,
        #theme-my-theme .ob-settings-group select {
          min-height: 44px;
          border: 1px solid rgba(120, 104, 80, 0.4);
          border-radius: 8px;
          padding: 0.55rem 0.8rem;
          background: transparent;
          color: inherit;
          font: inherit;
        }
        #theme-my-theme .ob-settings-appearance button,
        #theme-my-theme .ob-settings-account-links a {
          flex: 1;
          text-align: center;
          cursor: pointer;
        }
        #theme-my-theme .ob-settings-appearance button[aria-pressed='true'] {
          border-color: var(--theme-color, #c9a66b);
          background: rgba(201, 166, 107, 0.2);
          font-weight: 600;
        }
        #theme-my-theme .ob-settings-group select {
          display: block;
          width: 100%;
          cursor: pointer;
        }
        #theme-my-theme .ob-settings-group option {
          background: #fffaf2;
          color: #332b24;
        }
        .dark #theme-my-theme .ob-settings-group option {
          background: #1b1c1b;
          color: #f0e8dc;
        }
        #theme-my-theme .ob-settings-hint {
          margin: 0.5rem 0 0;
          font-size: 12px;
          opacity: 0.8;
        }
        #theme-my-theme .ob-settings :is(button, select, a):focus-visible {
          outline: 2px solid var(--theme-color, #c9a66b);
          outline-offset: 3px;
        }
        @media (max-width: 767px) {
          #theme-my-theme .ob-settings-panel {
            top: calc(100% + 4px);
          }
        }
      `}</style>
    </div>
  )
}
