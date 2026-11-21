import { UserProfile } from '@clerk/nextjs'
import { useClerkSession } from '@/components/ClerkSession'
/**
 * 控制台用户账号面板
 * @returns
 */
export default function DashboardUser() {
  const session = useClerkSession()
  const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  if (!enableClerk || !session.active) {
    return null
  }
  return (
    <UserProfile
      appearance={{
        elements: {
          cardBox: 'w-full',
          rootBox: 'w-full'
        }
      }}
      className='bg-blue-300'
      routing='path'
      path='/dashboard/user-profile'
    />
  )
}
