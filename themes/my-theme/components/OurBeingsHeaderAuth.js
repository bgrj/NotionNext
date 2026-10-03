import SmartLink from '@/components/SmartLink'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import {
  AUTHOR_BEING,
  beingFromClerkUser,
  beingProfileHref,
  isClerkEnabled
} from '../beings'

const iconLinkClass =
  'ob-auth-icon cursor-pointer hover:bg-black hover:bg-opacity-10 rounded-full w-10 h-10 flex justify-center items-center duration-200 transition-all'

const AuthIconLink = ({ href, label }) => (
  <SmartLink href={href} title={label} aria-label={label} className={iconLinkClass}>
    <i className='fas fa-user' aria-hidden='true' />
  </SmartLink>
)

const GuestLink = () => <AuthIconLink href='/sign-up' label='注册 / 登录' />

const MemberLink = () => {
  const { user } = useUser()
  const being = beingFromClerkUser(user)
  const href = being?.isAuthor
    ? AUTHOR_BEING.href
    : beingProfileHref(being?.handle || 'me')
  return <AuthIconLink href={href} label='我的档案' />
}

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
