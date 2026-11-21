import SmartLink from '@/components/SmartLink'
import { useClerkSession } from '@/components/ClerkSession'
import { DESK_HREF, isClerkEnabled } from '../beings'

const OurBeingsHeaderAuth = ({ english = false, onNavigate }) => {
  const session = useClerkSession()
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
  if (!isClerkEnabled() || !session.isSignedIn) return guest
  return (
    <div className='ob-settings-account-links'>
      <SmartLink href={DESK_HREF} onClick={onNavigate}>
        {english ? 'My profile' : '我的档案'}
      </SmartLink>
    </div>
  )
}

export default OurBeingsHeaderAuth
