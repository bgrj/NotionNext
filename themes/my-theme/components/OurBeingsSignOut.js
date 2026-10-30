import { useClerk } from '@clerk/nextjs'
import { useRef, useState } from 'react'
import { authHref } from '@/lib/beings/authNavigation'

export default function OurBeingsSignOut({ english = false }) {
  const { signOut } = useClerk()
  const pending = useRef(false)
  const [leaving, setLeaving] = useState(false)
  const [failed, setFailed] = useState(false)

  const leave = async () => {
    if (pending.current) return
    pending.current = true
    setLeaving(true)
    setFailed(false)
    try {
      await signOut({ redirectUrl: `${authHref('in')}&signed_out=1` })
    } catch {
      setFailed(true)
    } finally {
      pending.current = false
      setLeaving(false)
    }
  }

  return (
    <span className='ob-sign-out'>
      <button type='button' disabled={leaving} onClick={leave}>
        {english
          ? leaving
            ? 'Signing out…'
            : 'Sign out'
          : leaving
            ? '正在退出…'
            : '退出登录'}
      </button>
      {failed && (
        <span role='alert'>
          {english
            ? 'Sign out failed. Please retry.'
            : '未能退出，请稍后再试。'}
        </span>
      )}
      <style jsx>{`
        .ob-sign-out {
          display: inline-flex;
          flex-direction: column;
          vertical-align: middle;
          max-width: 100%;
        }
        button {
          min-width: 44px;
          min-height: 44px;
          padding: 0.35rem 0.65rem;
          border: 0;
          background: transparent;
          color: inherit;
          font: inherit;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 0.2em;
        }
        button:disabled {
          cursor: wait;
          opacity: 0.65;
        }
        button:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 3px;
        }
        [role='alert'] {
          font-size: 0.85rem;
          overflow-wrap: anywhere;
        }
      `}</style>
    </span>
  )
}
