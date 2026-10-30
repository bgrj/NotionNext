import SmartLink from '@/components/SmartLink'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { DESK_HREF, isClerkEnabled } from '../beings'

const OurBeingsHeaderAuth = ({ english = false, onNavigate }) => {
  const guest = (
    <div className='ob-settings-account-links'>
      <SmartLink href='/sign-in' onClick={onNavigate}>
        {english ? 'Sign in' : '登录'}
      </SmartLink>
      <SmartLink href='/sign-up' onClick={onNavigate}>
        {english ? 'Create account' : '注册'}
      </SmartLink>
    </div>
  )
  if (!isClerkEnabled()) return guest
  return (
    <>
      <SignedOut>{guest}</SignedOut>
      <SignedIn>
        <div className='ob-settings-account-links'>
          <SmartLink href={DESK_HREF} onClick={onNavigate}>
            {english ? 'My profile' : '我的档案'}
          </SmartLink>
        </div>
      </SignedIn>
    </>
  )
}

export default OurBeingsHeaderAuth
