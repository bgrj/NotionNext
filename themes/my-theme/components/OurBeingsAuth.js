import { Component, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useClerk, useUser } from '@clerk/nextjs'
import {
  authHref,
  authReturnFromQuery,
  AUTH_DEFAULT_RETURN
} from '@/lib/beings/authNavigation'
import {
  OUR_BEINGS_JOIN_PRICE_YUAN,
  OUR_BEINGS_SEATS,
  isClerkEnabled
} from '../beings'

const reloadPage = () => window.location.reload()

function LoadingPanel() {
  const [slow, setSlow] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setSlow(true), 12000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className='ob-auth__state' role='status' aria-live='polite'>
      <p>{slow ? '登录服务加载较慢' : '正在准备登录…'}</p>
      <p className='ob-auth__muted'>
        {slow
          ? '请检查网络后重试；也可以先浏览公开内容。'
          : '正在确认账户状态，请稍候。'}
      </p>
      {slow && (
        <button
          className='ob-auth__button ob-auth__button--quiet'
          type='button'
          onClick={reloadPage}
        >
          刷新重试
        </button>
      )}
    </div>
  )
}

const ClerkSignIn = dynamic(() => import('@clerk/nextjs').then(m => m.SignIn), {
  ssr: false,
  loading: LoadingPanel
})
const ClerkSignUp = dynamic(() => import('@clerk/nextjs').then(m => m.SignUp), {
  ssr: false,
  loading: LoadingPanel
})

class AuthBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) {
      return (
        <div className='ob-auth__state' role='alert'>
          <h2>暂时无法打开登录服务</h2>
          <p>请刷新后重试。此时不要重复提交；你仍可以浏览公开内容。</p>
          <button
            type='button'
            className='ob-auth__button'
            onClick={reloadPage}
          >
            刷新重试
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// Preserve the provider's native verification, recovery, MFA and challenge screens.
// Do not replace them with a form that merely looks like authentication.
const appearance = {
  variables: {
    colorPrimary: '#785620',
    colorText: '#302a23',
    colorTextSecondary: '#655e54',
    colorBackground: '#fffdf8',
    colorInputBackground: '#fffefa',
    colorInputText: '#302a23',
    colorDanger: '#a53830',
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: '1rem',
    borderRadius: '0.5rem'
  },
  elements: {
    rootBox: 'ob-auth__root',
    cardBox: 'ob-auth__card-box',
    card: 'ob-auth__card',
    headerTitle: 'ob-auth__provider-title',
    headerSubtitle: 'ob-auth__provider-subtitle',
    formFieldLabel: 'ob-auth__label',
    formFieldInput: 'ob-auth__input',
    formButtonPrimary: 'ob-auth__submit',
    socialButtonsBlockButton: 'ob-auth__social',
    otpCodeFieldInput: 'ob-auth__code',
    footer: 'ob-auth__provider-footer',
    footerActionLink: 'ob-auth__inline-link',
    formFieldAction: 'ob-auth__inline-link',
    formResendCodeLink: 'ob-auth__inline-link',
    identityPreviewText: 'ob-auth__identity'
  }
}

function useAuthAppearance() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const sync = () =>
      setDark(
        document.documentElement.classList.contains('dark') ||
          document.body.classList.contains('dark')
      )
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    })
    return () => observer.disconnect()
  }, [])
  return useMemo(
    () =>
      dark
        ? {
            ...appearance,
            variables: {
              ...appearance.variables,
              colorPrimary: '#d6bc88',
              colorBackground: '#25221e',
              colorInputBackground: '#302b24',
              colorText: '#f3eee5',
              colorInputText: '#f3eee5',
              colorTextSecondary: '#c6bbaa',
              colorTextOnPrimaryBackground: '#25221e',
              colorNeutral: '#c6bbaa',
              colorDanger: '#f09c8a'
            }
          }
        : appearance,
    [dark]
  )
}

function SignedPanel({ signingUp, returnTo }) {
  const { isLoaded, isSignedIn } = useUser()
  const { signOut } = useClerk()
  const authAppearance = useAuthAppearance()
  const [leaving, setLeaving] = useState(false)
  const [error, setError] = useState('')
  if (!isLoaded) return <LoadingPanel />
  if (isSignedIn) {
    return (
      <div className='ob-auth__state'>
        <p className='ob-auth__eyebrow'>已登录</p>
        <h2>不必再次登录</h2>
        <p>继续回到刚才要去的页面，或进入自己的空间。</p>
        <div className='ob-auth__actions'>
          <Link className='ob-auth__button' href={returnTo}>
            继续访问
          </Link>
          {returnTo !== AUTH_DEFAULT_RETURN && (
            <Link
              className='ob-auth__button ob-auth__button--quiet'
              href={AUTH_DEFAULT_RETURN}
            >
              我的存在
            </Link>
          )}
          <button
            type='button'
            disabled={leaving}
            className='ob-auth__button ob-auth__button--quiet'
            onClick={async () => {
              setLeaving(true)
              setError('')
              try {
                await signOut({
                  redirectUrl: authHref(signingUp ? 'up' : 'in', returnTo)
                })
              } catch {
                setError('未能退出，请稍后再试。')
                setLeaving(false)
              }
            }}
          >
            {leaving ? '正在退出…' : '退出并切换账号'}
          </button>
        </div>
        {error && <p role='alert'>{error}</p>}
      </div>
    )
  }
  const shared = {
    routing: 'path',
    appearance: authAppearance,
    forceRedirectUrl: returnTo,
    fallbackRedirectUrl: returnTo
  }
  return signingUp ? (
    <ClerkSignUp
      {...shared}
      path='/sign-up'
      signInUrl={authHref('in', returnTo)}
      signInForceRedirectUrl={returnTo}
      signInFallbackRedirectUrl={returnTo}
    />
  ) : (
    <ClerkSignIn
      {...shared}
      path='/sign-in'
      signUpUrl={authHref('up', returnTo)}
      signUpForceRedirectUrl={returnTo}
      signUpFallbackRedirectUrl={returnTo}
    />
  )
}

function UnavailablePanel() {
  return (
    <div className='ob-auth__state' role='status'>
      <h2>登录服务暂未开放</h2>
      <p>当前无法登录或创建账户。请稍后再来，也可以先看看公开内容。</p>
      <Link
        href='/our-beings'
        className='ob-auth__button ob-auth__button--quiet'
      >
        浏览我们的存在
      </Link>
    </div>
  )
}

function AuthShell({
  signingUp = false,
  prompt = false,
  returnTo = AUTH_DEFAULT_RETURN,
  children
}) {
  return (
    <section className='ob-auth' aria-labelledby='ob-auth-title'>
      <div className='ob-auth__intro'>
        <p className='ob-auth__eyebrow'>
          OUR BEINGS <span aria-hidden='true'>／</span> 吾在
        </p>
        <h1 id='ob-auth-title'>
          {prompt
            ? '这是你的私人空间'
            : signingUp
              ? '为自己，留一处空间。'
              : '回到我的存在。'}
        </h1>
        <p className='ob-auth__lead'>
          {prompt
            ? '登录后，继续自己的记录与整理。'
            : signingUp
              ? '从一个账户开始，慢慢记录、阅读与整理。'
              : '继续记录生活，整理阅读，写下尚未完成的思考。'}
        </p>
        <p className='ob-auth__privacy'>
          新建内容默认私密。
          <br />
          是否公开，由你主动选择。
        </p>
        <Link className='ob-auth__browse' href='/our-beings'>
          先看看我们的存在 <span aria-hidden='true'>↗</span>
        </Link>
      </div>
      <div className='ob-auth__panel'>
        {!prompt && (
          <nav className='ob-auth__tabs' aria-label='账户入口'>
            <Link
              href={authHref('in', returnTo)}
              aria-current={!signingUp ? 'page' : undefined}
            >
              登录
            </Link>
            <Link
              href={authHref('up', returnTo)}
              aria-current={signingUp ? 'page' : undefined}
            >
              注册
            </Link>
          </nav>
        )}
        <AuthBoundary key={`${signingUp}-${prompt}`}>{children}</AuthBoundary>
        {!prompt && (
          <div className='ob-auth__help'>
            <details>
              <summary>登录与验证帮助</summary>
              <p>
                请使用注册时的登录方式。可用方式以表单为准，第三方登录仅在通道开放时显示。
              </p>
              <p>
                如表单要求验证码，请检查收件箱与垃圾邮件；若提供“忘记密码”，可在登录流程中重置。未显示的方式暂不可用。
              </p>
            </details>
            <details>
              <summary>注册与现有加入说明</summary>
              <p>
                创建账户不等于支付，也不自动公开内容。现有档案席位、邀请码与加入机制保持不变：前{' '}
                {OUR_BEINGS_SEATS} 个席位免费，之后沿用邀请码或{' '}
                {OUR_BEINGS_JOIN_PRICE_YUAN}{' '}
                元加入规则，实际资格以私人空间中的结果为准。
              </p>
            </details>
          </div>
        )}
      </div>
      <style jsx>{`
        .ob-auth {
          --ob-auth-ink: #302a23;
          --ob-auth-muted: #655e54;
          --ob-auth-paper: #fffdf8;
          --ob-auth-line: #d7cdbc;
          --ob-auth-control: #9b8a70;
          --ob-auth-gold: #785620;
          --ob-auth-soft: #f3eee4;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 28rem);
          gap: clamp(2rem, 6vw, 5rem);
          align-items: start;
          width: min(64rem, 100%);
          margin: clamp(1rem, 4vw, 3rem) auto;
          padding: clamp(1.25rem, 3vw, 2.5rem);
          border: 1px solid var(--ob-auth-line);
          border-radius: 12px;
          background: var(--ob-auth-paper);
          color: var(--ob-auth-ink);
          font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            sans-serif;
          line-height: 1.65;
        }
        .ob-auth__intro {
          min-width: 0;
          padding-top: 1.25rem;
        }
        .ob-auth__eyebrow {
          margin: 0 0 1.5rem;
          font-size: 0.875rem;
          letter-spacing: 0.12em;
          color: var(--ob-auth-muted);
        }
        .ob-auth h1 {
          margin: 0 0 1.25rem;
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          line-height: 1.3;
          font-weight: 600;
          letter-spacing: -0.025em;
          text-wrap: balance;
        }
        .ob-auth__lead {
          margin: 0;
          max-width: 25rem;
          font-size: 1rem;
        }
        .ob-auth__privacy {
          margin: 2rem 0 1.5rem;
          padding-left: 1rem;
          border-left: 2px solid var(--ob-auth-gold);
          font-size: 1rem;
          color: var(--ob-auth-muted);
        }
        .ob-auth :global(a) {
          text-underline-offset: 0.25em;
        }
        .ob-auth :global(.ob-auth__browse) {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          min-height: 44px;
          color: var(--ob-auth-gold);
          text-decoration: underline;
          font-size: 1rem;
        }
        .ob-auth__panel {
          min-width: 0;
        }
        .ob-auth__tabs {
          display: flex;
          border-bottom: 1px solid var(--ob-auth-line);
          margin-bottom: 1.5rem;
        }
        .ob-auth__tabs :global(a) {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          flex: 1;
          padding: 0.5rem 1rem;
          color: var(--ob-auth-muted);
          text-decoration: none;
          border-bottom: 2px solid transparent;
        }
        .ob-auth__tabs :global(a[aria-current='page']) {
          border-color: var(--ob-auth-gold);
          color: var(--ob-auth-ink);
          font-weight: 600;
        }
        .ob-auth__help {
          margin-top: 1.5rem;
          border-top: 1px solid var(--ob-auth-line);
          color: var(--ob-auth-muted);
          font-size: 0.875rem;
        }
        .ob-auth__help details {
          border-bottom: 1px solid var(--ob-auth-line);
        }
        .ob-auth__help summary {
          cursor: pointer;
          min-height: 48px;
          padding: 0.75rem 0;
        }
        .ob-auth__help p {
          margin: 0 0 1rem;
          overflow-wrap: anywhere;
        }
        .ob-auth :global(.ob-auth__state) {
          padding: 1.25rem 0;
          font-size: 1rem;
          overflow-wrap: anywhere;
        }
        .ob-auth :global(.ob-auth__state h2) {
          font-size: 1.375rem;
          font-weight: 600;
          margin: 0 0 0.75rem;
        }
        .ob-auth :global(.ob-auth__state p) {
          margin: 0 0 1rem;
        }
        .ob-auth :global(.ob-auth__muted) {
          color: var(--ob-auth-muted);
        }
        .ob-auth :global(.ob-auth__actions) {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .ob-auth :global(.ob-auth__button) {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          min-height: 48px;
          max-width: 100%;
          padding: 0.625rem 1.25rem;
          border: 1px solid var(--ob-auth-gold);
          border-radius: 8px;
          background: var(--ob-auth-gold);
          color: #fff;
          font: inherit;
          font-weight: 500;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
        }
        .ob-auth :global(.ob-auth__button--quiet) {
          background: transparent;
          color: var(--ob-auth-gold);
        }
        .ob-auth :global(button:disabled) {
          cursor: wait;
          opacity: 0.7;
        }
        .ob-auth :global(a:focus-visible),
        .ob-auth :global(button:focus-visible),
        .ob-auth :global(input:focus-visible),
        .ob-auth summary:focus-visible {
          outline: 2px solid var(--ob-auth-gold);
          outline-offset: 3px;
        }
        .ob-auth :global(.ob-auth__root),
        .ob-auth :global(.ob-auth__card-box),
        .ob-auth :global(.ob-auth__card) {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-shadow: none;
        }
        .ob-auth :global(.ob-auth__card-box) {
          background: transparent;
          border-radius: 0;
        }
        .ob-auth :global(.ob-auth__card) {
          background: transparent;
          padding: 0 0 1rem;
          border: 0;
          border-radius: 0;
        }
        .ob-auth :global(.ob-auth__provider-title) {
          color: var(--ob-auth-ink);
          font-size: 1.375rem;
          line-height: 1.4;
        }
        .ob-auth :global(.ob-auth__provider-subtitle),
        .ob-auth :global(.ob-auth__provider-footer) {
          color: var(--ob-auth-muted);
        }
        .ob-auth :global(.ob-auth__provider-footer) {
          background: transparent;
        }
        .ob-auth :global(.cl-footerAction) {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          flex-wrap: wrap;
        }
        .ob-auth :global(.cl-footerActionText) {
          color: var(--ob-auth-muted);
          font-size: 0.875rem;
        }
        .ob-auth :global(.ob-auth__provider-footer a) {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }
        .ob-auth :global(.cl-formFieldInputShowPasswordButton) {
          min-width: 44px;
          min-height: 44px;
        }
        .ob-auth :global(.ob-auth__label) {
          font-size: 0.875rem;
          color: var(--ob-auth-ink);
        }
        .ob-auth :global(.ob-auth__input),
        .ob-auth :global(.ob-auth__code) {
          min-height: 48px;
          background: var(--ob-auth-paper);
          color: var(--ob-auth-ink);
          border: 1px solid var(--ob-auth-control);
          font-size: 1rem;
          box-shadow: none;
        }
        .ob-auth :global(.ob-auth__submit),
        .ob-auth :global(.ob-auth__social) {
          min-height: 48px;
          font-size: 1rem;
          box-shadow: none;
        }
        .ob-auth :global(.ob-auth__submit) {
          background: var(--ob-auth-gold);
          color: #fff;
          text-transform: none;
        }
        .ob-auth :global(.ob-auth__social) {
          background: var(--ob-auth-paper);
          color: var(--ob-auth-ink);
          border: 1px solid var(--ob-auth-control);
        }
        .ob-auth :global(.ob-auth__inline-link) {
          color: var(--ob-auth-gold);
          font-size: 0.875rem;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }
        .ob-auth :global(.ob-auth__identity) {
          overflow-wrap: anywhere;
        }
        .ob-auth :global(.cl-otpCodeFieldInputs) {
          display: flex;
          gap: 0.5rem;
          max-width: 100%;
        }
        .ob-auth :global(.ob-auth__code) {
          flex: 1 1 0;
          min-width: 0;
          width: clamp(1.75rem, 8vw, 2.75rem);
          max-width: 2.75rem;
        }
        :global(.dark) .ob-auth {
          --ob-auth-ink: #f3eee5;
          --ob-auth-muted: #c6bbaa;
          --ob-auth-paper: #25221e;
          --ob-auth-line: #746959;
          --ob-auth-control: #a5957e;
          --ob-auth-gold: #d6bc88;
          --ob-auth-soft: #302b24;
        }
        :global(.dark) .ob-auth :global(.ob-auth__submit),
        :global(.dark)
          .ob-auth
          :global(.ob-auth__button:not(.ob-auth__button--quiet)) {
          color: #25221e;
        }
        @media (max-width: 760px) {
          .ob-auth {
            grid-template-columns: minmax(0, 1fr);
            gap: 1.5rem;
            margin: 1rem auto 2rem;
            padding: 1.5rem;
          }
          .ob-auth__intro {
            padding-top: 0;
          }
          .ob-auth__eyebrow {
            margin-bottom: 1rem;
          }
          .ob-auth__privacy {
            margin: 1rem 0 0.5rem;
          }
          .ob-auth h1 {
            margin-bottom: 0.75rem;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ob-auth :global(*) {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export function OurBeingsAccountPrompt({ available = true }) {
  return (
    <AuthShell prompt>
      {available ? (
        <div className='ob-auth__state'>
          <h2>先登录，再继续</h2>
          <p>已有账户直接登录；第一次来，可以创建账户。</p>
          <div className='ob-auth__actions'>
            <Link className='ob-auth__button' href={authHref('in')}>
              登录
            </Link>
            <Link
              className='ob-auth__button ob-auth__button--quiet'
              href={authHref('up')}
            >
              创建账户
            </Link>
          </div>
        </div>
      ) : (
        <UnavailablePanel />
      )}
    </AuthShell>
  )
}

function OurBeingsJoinGate({ mode = 'in' }) {
  const router = useRouter()
  const signingUp = mode === 'up'
  const returnTo = authReturnFromQuery(router.query)
  return (
    <AuthShell signingUp={signingUp} returnTo={returnTo}>
      {!isClerkEnabled() ? (
        <UnavailablePanel />
      ) : !router.isReady ? (
        <LoadingPanel />
      ) : (
        <SignedPanel signingUp={signingUp} returnTo={returnTo} />
      )}
    </AuthShell>
  )
}

export const LayoutSignIn = () => <OurBeingsJoinGate mode='in' />
export const LayoutSignUp = () => <OurBeingsJoinGate mode='up' />
