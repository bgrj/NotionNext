import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useId, useRef, useState } from 'react'
import CONFIG from '../config'
import { UI_LANGUAGE_LABELS, uiLanguageOptions } from '../readingSettings'
import { DEFAULT_OPEN_SECTIONS, openHomeSections } from '../homeSections'
import { settingsMenu } from '../settingsMenu'

const AccountLinks = dynamic(() => import('./OurBeingsHeaderAuth'), {
  ssr: false
})

/** A non-modal, keyboard-accessible popover; it never changes article content. */
export default function SiteSettings({ onOpenChange, customMenu } = {}) {
  const {
    lang = 'zh-CN',
    changeLang,
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
    usesDefaultAppearance = false,
    resetAppearance
  } = useGlobal() || {}
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const panelId = useId()
  const english = lang.startsWith('en')
  const title = english ? 'Site settings' : '网站设置'
  const available = openHomeSections(
    siteConfig('OURBEINGS_OPEN_SECTIONS', DEFAULT_OPEN_SECTIONS, CONFIG)
  )
  const publicLinks = siteConfig('CUSTOM_MENU', true)
    ? settingsMenu(customMenu, available)
    : []
  const selectAppearance = dark => {
    if (!usesDefaultAppearance && Boolean(isDarkMode) === dark) return
    if (setDarkMode) setDarkMode(dark)
    else if (Boolean(isDarkMode) !== dark) toggleDarkMode?.()
  }
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
            <div>
              <strong>{title}</strong>
              <p className='ob-settings-subtitle'>
                {english ? 'Appearance, language, account' : '外观、语言与账户'}
              </p>
            </div>
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
          <fieldset className='ob-settings-group ob-settings-divided'>
            <legend>{english ? 'Appearance' : '外观模式'}</legend>
            <div className='ob-settings-appearance'>
              <button
                type='button'
                data-settings-first='true'
                aria-pressed={!usesDefaultAppearance && !isDarkMode}
                onClick={() => selectAppearance(false)}
              >
                {english ? 'Light' : '浅色'}
              </button>
              <button
                type='button'
                aria-pressed={!usesDefaultAppearance && Boolean(isDarkMode)}
                onClick={() => selectAppearance(true)}
              >
                {english ? 'Dark' : '深色'}
              </button>
              <button
                type='button'
                aria-pressed={usesDefaultAppearance}
                onClick={() => resetAppearance?.()}
              >
                {english ? 'Site default' : '跟随站点'}
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
          {publicLinks.length > 0 && (
            <nav
              className='ob-settings-group ob-settings-divided'
              aria-label={english ? 'About the site' : '网站介绍'}
            >
              <h2>{english ? 'About the site' : '网站介绍'}</h2>
              <div className='ob-settings-public-links'>
                {publicLinks.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </nav>
          )}
          <div className='ob-settings-group ob-settings-divided'>
            <h2>{english ? 'Account' : '账户'}</h2>
            <AccountLinks english={english} onNavigate={() => setOpen(false)} />
          </div>
          <p className='ob-settings-hint ob-settings-device-note'>
            {english
              ? 'Preferences are saved on this device.'
              : '阅读偏好保存在此设备。'}
          </p>
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
        #theme-my-theme .ob-sticky-nav.ob-nav-settings-open {
          transform: none;
        }
        #theme-my-theme .ob-settings-panel {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: min(22.5rem, calc(100vw - 1.5rem));
          max-height: calc(100dvh - var(--ob-home-nav-height, 4rem) - 1.5rem);
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 1.05rem 1.2rem 1.15rem;
          border: 1px solid rgba(90, 64, 32, 0.14);
          border-radius: 18px;
          background: #f7f1e6;
          color: #2c241c;
          box-shadow: 0 18px 48px rgba(40, 28, 16, 0.16);
          text-align: left;
          font-size: 16px;
          line-height: 1.55;
        }
        .dark #theme-my-theme .ob-settings-panel {
          background: #16130f;
          color: #f6efe4;
          border-color: rgba(226, 196, 138, 0.18);
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.4);
        }
        #theme-my-theme .ob-settings-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 0.85rem;
          margin-bottom: 0.15rem;
          border-bottom: 1px solid rgba(90, 64, 32, 0.14);
        }
        .dark #theme-my-theme .ob-settings-heading {
          border-bottom-color: rgba(226, 196, 138, 0.18);
        }
        #theme-my-theme .ob-settings-heading strong {
          font-family: Palatino, 'Songti SC', 'Noto Serif SC', Georgia, serif;
          font-size: 1.35rem;
          font-weight: 500;
          letter-spacing: 0.06em;
        }
        #theme-my-theme .ob-settings-subtitle {
          margin: 0.15rem 0 0;
          font-size: 13px;
          letter-spacing: 0.08em;
          color: #8a6230;
          opacity: 1;
        }
        .dark #theme-my-theme .ob-settings-subtitle {
          color: #e2c48a;
        }
        #theme-my-theme .ob-settings-public-links {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        #theme-my-theme .ob-settings-public-links a {
          min-height: 44px;
          display: flex;
          align-items: center;
          padding: 0.4rem 0.85rem;
          border: 1px solid rgba(90, 64, 32, 0.12);
          border-radius: 12px;
          background: rgba(255, 250, 242, 0.72);
          color: #2c241c;
          overflow-wrap: anywhere;
        }
        #theme-my-theme .ob-settings-public-links a:hover {
          color: #6b4a22;
          background: #fffaf2;
        }
        .dark #theme-my-theme .ob-settings-public-links a {
          border-color: rgba(246, 239, 228, 0.12);
          background: rgba(246, 239, 228, 0.05);
          color: #f6efe4;
        }
        .dark #theme-my-theme .ob-settings-public-links a:hover {
          color: #f0ddb8;
          background: rgba(246, 239, 228, 0.09);
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
        #theme-my-theme .ob-settings-group.ob-settings-divided {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(120, 104, 80, 0.2);
        }
        #theme-my-theme .ob-settings-group legend,
        #theme-my-theme .ob-settings-group label,
        #theme-my-theme .ob-settings-group h2 {
          display: block;
          padding: 0;
          margin: 0 0 0.55rem;
          font-size: 12px;
          font-weight: 650;
          letter-spacing: 0.16em;
          line-height: 1.4;
          color: #8a6230;
        }
        .dark #theme-my-theme .ob-settings-group legend,
        .dark #theme-my-theme .ob-settings-group label,
        .dark #theme-my-theme .ob-settings-group h2 {
          color: #e2c48a;
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
          min-height: 40px;
          border: 1px solid rgba(90, 64, 32, 0.16);
          border-radius: 999px;
          padding: 0.4rem 0.85rem;
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
          border-color: transparent;
          background: #4a3422;
          color: #f7f1e6;
          font-weight: 600;
        }
        .dark #theme-my-theme .ob-settings-appearance button[aria-pressed='true'] {
          background: #e2c48a;
          color: #1a140e;
        }
        #theme-my-theme .ob-settings-group select {
          display: block;
          width: 100%;
          border-radius: 12px;
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
          font-size: 13px;
          line-height: 1.5;
          letter-spacing: 0;
          color: #8a7360;
          opacity: 1;
        }
        .dark #theme-my-theme .ob-settings-hint {
          color: #cbbba6;
        }
        #theme-my-theme .ob-settings :is(button, select, a):focus-visible {
          outline: 2px solid var(--theme-color, #c9a66b);
          outline-offset: 3px;
        }
        @media (max-width: 767px) {
          /* A filtered ancestor makes fixed panels anchor to the navigation. */
          #theme-my-theme .ob-sticky-nav.ob-nav-settings-open {
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            transition: none;
          }
          #theme-my-theme .ob-settings-panel {
            position: fixed;
            top: auto;
            right: 0.75rem;
            left: 0.75rem;
            bottom: max(0.75rem, env(safe-area-inset-bottom));
            width: auto;
            max-height: calc(100svh - var(--ob-home-nav-height, 4rem) - 1.5rem);
            border-radius: 20px;
          }
        }
      `}</style>
    </div>
  )
}
