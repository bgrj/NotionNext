import { useEffect, useState } from 'react'
import SmartLink from '@/components/SmartLink'
import { useUser } from '@clerk/nextjs'
import { beingFromClerkUser } from '../beings'

const OurBeingsJoinStatus = ({ gated } = {}) => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [me, setMe] = useState(null)

  useEffect(() => {
    if (!isSignedIn) return undefined
    let cancelled = false
    fetch('/api/beings/me', { method: 'POST' })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (!cancelled && data?.being) setMe(data.being)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [isSignedIn])

  if (!isLoaded) return <p className='ob-beings__status'>正在确认登录状态…</p>

  if (isSignedIn) {
    const being = me || beingFromClerkUser(user)
    const href = being?.href
    return (
      <p className='ob-beings__status'>
        你已经进来。档案默认私密，所以名录上还只显示公开的存在者。
        {href ? (
          <>
            {' '}
            <SmartLink href={href}>进入我的档案</SmartLink>
          </>
        ) : null}
      </p>
    )
  }

  return (
    <p className='ob-beings__status'>
      {gated
        ? '前一百席位已满。之后只接受邀请码或付款。'
        : '前一百席位仍开放。点右上角用邮箱进来即可。'}
    </p>
  )
}

export default OurBeingsJoinStatus
