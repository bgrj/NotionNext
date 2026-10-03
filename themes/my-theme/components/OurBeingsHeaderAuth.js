import SmartLink from '@/components/SmartLink'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { DESK_HREF, isClerkEnabled } from '../beings'

const iconLinkClass =
  'ob-auth-icon cursor-pointer hover:bg-black hover:bg-opacity-10 rounded-full w-10 h-10 flex justify-center items-center duration-200 transition-all'

const AuthIconLink = ({ href, label }) => (
  <SmartLink href={href} title={label} aria-label={label} className={iconLinkClass}>
    <i className='fas fa-user' aria-hidden='true' />
  </SmartLink>
)

const GuestLink = () => <AuthIconLink href='/sign-up' label='注册 / 登录' />

const MemberLink = () => <AuthIconLink href={DESK_HREF} label='我的档案' />

const OurBeingsHeaderAuth = () => {
  if (!isClerkEnabled()) return <GuestLink />
  return (
    <>
      <SignedOut>
        <GuestLink />
      </SignedOut>
      <SignedIn>
        <MemberLink />
      </SignedIn>
    </>
  )
}

export default OurBeingsHeaderAuth
