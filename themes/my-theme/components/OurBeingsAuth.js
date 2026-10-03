import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { useUser } from '@clerk/nextjs'
import {
  DESK_HREF,
  OUR_BEINGS_JOIN_PRICE_YUAN,
  OUR_BEINGS_SEATS,
  isClerkEnabled
} from '../beings'

const ClerkSignIn = dynamic(
  () => import('@clerk/nextjs').then(m => m.SignIn),
  { ssr: false }
)

const ClerkSignUp = dynamic(
  () => import('@clerk/nextjs').then(m => m.SignUp),
  { ssr: false }
)

const SignedPanel = ({ signingUp }) => {
  const { isLoaded, isSignedIn } = useUser()
  if (!isLoaded) return <p className='ob-join-gate__status'>正在确认登录状态…</p>
  if (isSignedIn) {
    return (
      <p className='ob-join-gate__status'>
        你已经进来。
        {' '}
        <SmartLink href={DESK_HREF}>进入我的档案</SmartLink>
        {' · '}
        <SmartLink href='/our-beings'>回到我们的存在</SmartLink>
      </p>
    )
  }
  return (
    <div className='ob-join-gate__clerk'>
      {signingUp ? (
        <ClerkSignUp routing='path' path='/sign-up' signInUrl='/sign-in' fallbackRedirectUrl={DESK_HREF} />
      ) : (
        <ClerkSignIn routing='path' path='/sign-in' signUpUrl='/sign-up' fallbackRedirectUrl={DESK_HREF} />
      )}
    </div>
  )
}

const OurBeingsJoinGate = ({ mode = 'up' } = {}) => {
  const enabled = isClerkEnabled()
  const signingUp = mode === 'up'

  return (
    <div className='ob-join-gate'>
      <p className='ob-join-gate__kicker'>Our Beings</p>
      <h1>{signingUp ? '注册' : '登录'}</h1>
      <p>
        世界各地的人都可以进来。用邮箱即可：Gmail、Outlook、大学邮箱、各国邮箱都行。不需要微信，也不需要中国手机号。
      </p>
      <p className='ob-join-gate__en'>
        Anyone, anywhere, can join with an email address. WeChat and a Chinese
        phone number are not required.
      </p>
      <p>
        前 {OUR_BEINGS_SEATS} 人免费占一个档案位。席位满了之后，要么用邀请码，要么付{' '}
        {OUR_BEINGS_JOIN_PRICE_YUAN} 元水电费。进来的人可以写自己的存在、道、术，默认私密。
      </p>
      {!enabled ? (
        <p className='ob-join-gate__status'>
          登录通道还没接上密钥。先把邮箱规则立在这里；密钥配上之后，这个页会直接收任何国家的邮箱。
        </p>
      ) : (
        <SignedPanel signingUp={signingUp} />
      )}
      <p>
        <SmartLink href='/our-beings'>回到我们的存在</SmartLink>
        {' · '}
        <SmartLink href={signingUp ? '/sign-in' : '/sign-up'}>
          {signingUp ? '已有邮箱，去登录' : '还没有档案，去注册'}
        </SmartLink>
      </p>
      <style jsx>{`
        .ob-join-gate {
          width: min(40rem, 100%);
          margin: 0 auto;
          padding: 0.5rem 0 3rem;
          color: #2c241c;
          line-height: 1.75;
        }
        .ob-join-gate__kicker {
          margin: 0 0 0.4rem;
          letter-spacing: 0.18em;
          font-size: 0.78rem;
          color: #6b5344;
        }
        .ob-join-gate h1 {
          margin: 0 0 0.9rem;
          font-size: 1.85rem;
          font-weight: 650;
        }
        .ob-join-gate p {
          margin: 0 0 0.85rem;
        }
        .ob-join-gate__en {
          color: #6b5344;
        }
        .ob-join-gate__status {
          color: #8a5a3a;
        }
        .ob-join-gate__clerk {
          margin: 1.2rem 0 1.4rem;
        }
        .ob-join-gate :global(a) {
          color: #8a5a1f;
          text-decoration: underline;
          text-underline-offset: 0.18em;
        }
        :global(.dark) .ob-join-gate {
          color: #f6f1e8;
        }
        :global(.dark) .ob-join-gate :global(a) {
          color: #e2c48a;
        }
      `}</style>
    </div>
  )
}

export const LayoutSignIn = () => <OurBeingsJoinGate mode='in' />

export const LayoutSignUp = () => <OurBeingsJoinGate mode='up' />
