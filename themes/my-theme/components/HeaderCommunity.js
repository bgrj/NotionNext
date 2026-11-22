import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import CONFIG from '../config'

const FEEDBACK_QR = '/images/ourbeing-site-feedback.png'

const Heart = () => (
  <svg viewBox='0 0 24 24' width='16' height='16' aria-hidden='true'>
    <path
      d='M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinejoin='round'
    />
  </svg>
)

const Chat = () => (
  <svg viewBox='0 0 24 24' width='16' height='16' aria-hidden='true'>
    <path
      d='M6 17.5 3.5 20V6.5A2 2 0 0 1 5.5 4.5h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6z'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinejoin='round'
    />
  </svg>
)

/** Header actions that match the learning site: support, and feedback for 吾在. */
export default function HeaderCommunity() {
  const { lang = 'zh-CN' } = useGlobal() || {}
  const english = String(lang).startsWith('en')
  const [open, setOpen] = useState('')
  const [mounted, setMounted] = useState(false)
  const returnFocus = useRef(null)
  const closeRef = useRef(null)
  const titleId = useId()
  const afdian = siteConfig(
    'FOOTER_AFDIAN_URL',
    CONFIG.FOOTER_AFDIAN_URL,
    CONFIG
  )
  const alipay = siteConfig('FOOTER_ALIPAY_QR', CONFIG.FOOTER_ALIPAY_QR, CONFIG)
  const wepay = siteConfig('FOOTER_WEPAY_QR', CONFIG.FOOTER_WEPAY_QR, CONFIG)

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = event => {
      if (event.key === 'Escape') setOpen('')
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
      returnFocus.current?.focus()
    }
  }, [open])

  const show = (kind, event) => {
    returnFocus.current = event.currentTarget
    setOpen(kind)
  }
  const supportTitle = english ? 'Support Our beings' : '支持吾在'
  const feedbackTitle = english ? 'Ideas for Our beings' : '吾在网站意见'

  const dialog =
    open && mounted
      ? createPortal(
          <div className='ob-community-layer'>
            <button
              type='button'
              className='ob-community-backdrop'
              aria-label={english ? 'Close' : '关闭'}
              onClick={() => setOpen('')}
            />
            <section
              className='ob-community-dialog'
              role='dialog'
              aria-modal='true'
              aria-labelledby={titleId}
            >
              <div className='ob-community-heading'>
                <h2 id={titleId}>
                  {open === 'support' ? supportTitle : feedbackTitle}
                </h2>
                <button
                  ref={closeRef}
                  type='button'
                  className='ob-community-close'
                  aria-label={english ? 'Close' : '关闭'}
                  onClick={() => setOpen('')}
                >
                  ×
                </button>
              </div>
              {open === 'support' ? (
                <>
                  <p>
                    {english
                      ? 'The same channels as the footer. Use whichever is convenient.'
                      : '和页脚同一处。选一个你方便的渠道即可。'}
                  </p>
                  <a
                    className='ob-community-afdian'
                    href={afdian}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {english ? 'Afdian' : '爱发电'}
                  </a>
                  <div className='ob-community-codes'>
                    {alipay && (
                      <figure>
                        <img src={alipay} alt={english ? 'Alipay' : '支付宝收款码'} />
                        <figcaption>{english ? 'Alipay' : '支付宝'}</figcaption>
                      </figure>
                    )}
                    {wepay && (
                      <figure>
                        <img src={wepay} alt={english ? 'WeChat Pay' : '微信收款码'} />
                        <figcaption>{english ? 'WeChat Pay' : '微信'}</figcaption>
                      </figure>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p>
                    {english
                      ? 'Scan the code and tell us, in the WeChat group, what could be better.'
                      : '这个站哪里可以更好，扫码进微信群说一声。'}
                  </p>
                  <img
                    className='ob-community-qr'
                    src={FEEDBACK_QR}
                    alt={
                      english
                        ? 'WeChat group QR code: 吾在网站 优化调整意见箱'
                        : '微信群二维码：吾在网站 优化调整意见箱'
                    }
                  />
                  <p className='ob-community-note'>
                    {english
                      ? 'Group: 吾在网站 优化调整意见箱. The code is valid until 29 Nov and refreshes after you join.'
                      : '群名：吾在网站 优化调整意见箱。群码有效期至 11 月 29 日，进群后会更新。'}
                  </p>
                </>
              )}
            </section>
          </div>,
          document.body
        )
      : null

  return (
    <div className='ob-community'>
      <button
        type='button'
        className='ob-community-entry'
        aria-haspopup='dialog'
        aria-expanded={open === 'support'}
        onClick={event => show('support', event)}
      >
        <Heart />
        <span>{english ? 'Support' : '支持'}</span>
      </button>
      <button
        type='button'
        className='ob-community-entry'
        aria-haspopup='dialog'
        aria-expanded={open === 'feedback'}
        onClick={event => show('feedback', event)}
      >
        <Chat />
        <span>{english ? 'Ideas' : '意见'}</span>
      </button>
      {dialog}
      <style jsx global>{`
        #theme-my-theme .ob-community {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        #theme-my-theme .ob-community-entry {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          min-height: 36px;
          padding: 0 0.7rem;
          border: 1px solid rgba(74, 52, 34, 0.18);
          border-radius: 999px;
          background: transparent;
          color: inherit;
          font: inherit;
          font-size: 14px;
          letter-spacing: 0.04em;
          cursor: pointer;
        }
        #theme-my-theme .ob-community-entry:hover,
        #theme-my-theme .ob-community-entry[aria-expanded='true'] {
          border-color: rgba(138, 98, 40, 0.55);
          background: rgba(201, 166, 107, 0.16);
        }
        .dark #theme-my-theme .ob-community-entry {
          border-color: rgba(226, 196, 138, 0.28);
        }
        .ob-community-layer {
          position: fixed;
          inset: 0;
          z-index: 80;
          display: grid;
          place-items: center;
          padding: 1rem;
        }
        .ob-community-backdrop {
          position: absolute;
          inset: 0;
          border: 0;
          background: rgba(28, 20, 12, 0.46);
          cursor: pointer;
        }
        .ob-community-dialog {
          position: relative;
          width: min(36rem, 100%);
          max-height: min(88dvh, 52rem);
          overflow: auto;
          padding: 1.15rem 1.25rem 1.35rem;
          border: 1px solid rgba(90, 64, 32, 0.16);
          border-radius: 18px;
          background: #f7f1e6;
          color: #2c241c;
          box-shadow: 0 24px 60px rgba(28, 18, 8, 0.28);
        }
        .ob-community-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .ob-community-heading h2 {
          margin: 0;
          font-family: Palatino, 'Songti SC', 'Noto Serif SC', Georgia, serif;
          font-size: 1.35rem;
          font-weight: 500;
          letter-spacing: 0.04em;
        }
        .ob-community-close {
          width: 40px;
          height: 40px;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: inherit;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .ob-community-dialog p {
          margin: 0.35rem 0 0;
          color: #6d5b48;
          line-height: 1.6;
        }
        .ob-community-afdian {
          display: inline-flex;
          margin-top: 0.9rem;
          min-height: 40px;
          align-items: center;
          padding: 0 1rem;
          border-radius: 999px;
          background: #4a3422;
          color: #f7f1e6;
          text-decoration: none;
        }
        .ob-community-codes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem;
          margin-top: 1rem;
        }
        .ob-community-codes figure {
          margin: 0;
          display: grid;
          justify-items: center;
          gap: 0.35rem;
        }
        .ob-community-codes img,
        .ob-community-qr {
          width: min(100%, 220px);
          height: auto;
          border-radius: 12px;
          background: #fff;
        }
        .ob-community-qr {
          display: block;
          width: min(100%, 280px);
          margin: 0.8rem auto 0;
          background: #111;
        }
        .ob-community-codes figcaption,
        .ob-community-note {
          font-size: 0.92rem;
        }
        .ob-community-dialog :focus-visible {
          outline: 2px solid #c9a66b;
          outline-offset: 3px;
        }
        @media (max-width: 767px) {
          #theme-my-theme .ob-community-entry {
            min-height: 32px;
            padding: 0 0.45rem;
            font-size: 13px;
            gap: 0.15rem;
          }
          #theme-my-theme .ob-community-entry svg {
            width: 14px;
            height: 14px;
          }
          .ob-community-codes {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
