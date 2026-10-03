import SmartLink from '@/components/SmartLink'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import {
  AUTHOR_BEING,
  beingFromClerkUser,
  beingProfileHref,
  isClerkEnabled
} from '../beings'

const GuestLink = () => (
  <SmartLink
    href='/sign-up'
    className='menu-link mr-1 whitespace-nowrap text-sm'>
    注册 / 登录
  </SmartLink>
)

const MemberLink = () => {
  const { user } = useUser()
  const being = beingFromClerkUser(user)
  const href = being?.isAuthor
    ? AUTHOR_BEING.href
    : beingProfileHref(being?.handle || 'me')
  return (
    <SmartLink href={href} className='menu-link mr-1 whitespace-nowrap text-sm'>
      我的档案
    </SmartLink>
  )
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
