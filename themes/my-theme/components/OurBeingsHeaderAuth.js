import Link from 'next/link'
import { useRouter } from 'next/router'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { authHref } from '@/lib/beings/authNavigation'
import { DESK_HREF, isClerkEnabled } from '../beings'
import OurBeingsSignOut from './OurBeingsSignOut'

const OurBeingsHeaderAuth = ({ english = false, onNavigate }) => {
  const router = useRouter()
  const guest = (
    <div className='ob-settings-account-links'>
      <Link href={authHref('in', router.asPath)} onClick={onNavigate}>
        {english ? 'Sign in' : '登录'}
      </Link>
      <Link href={authHref('up', router.asPath)} onClick={onNavigate}>
        {english ? 'Create account' : '注册'}
      </Link>
    </div>
  )
  if (!isClerkEnabled()) return guest
  return (
    <>
      <SignedOut>{guest}</SignedOut>
      <SignedIn>
        <div className='ob-settings-account-links'>
          <Link href={DESK_HREF} onClick={onNavigate}>
            {english ? 'My space' : '我的空间'}
          </Link>
          <OurBeingsSignOut english={english} />
        </div>
      </SignedIn>
    </>
  )
}

export default OurBeingsHeaderAuth
