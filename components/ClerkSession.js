import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useClerk, useUser } from '@clerk/nextjs'

const signedOut = {
  active: false,
  isLoaded: true,
  isSignedIn: false,
  user: null,
  signOut: async () => {}
}

const ClerkSessionContext = createContext({
  session: signedOut,
  setSession: () => {}
})

export function ClerkSessionProvider({ children }) {
  const [session, setSession] = useState(signedOut)
  const value = useMemo(() => ({ session, setSession }), [session])
  return (
    <ClerkSessionContext.Provider value={value}>
      {children}
    </ClerkSessionContext.Provider>
  )
}

export function useClerkSession() {
  return useContext(ClerkSessionContext).session
}

/** Mount only under ClerkProvider. Public pages stay readable without it. */
export function ClerkSessionBridge() {
  const data = useUser()
  const clerk = useClerk()
  const { setSession } = useContext(ClerkSessionContext)
  useEffect(() => {
    setSession({
      active: true,
      isLoaded: data.isLoaded,
      isSignedIn: Boolean(data.isSignedIn),
      user: data.user || null,
      signOut: (...args) => clerk.signOut(...args)
    })
    return () => setSession(signedOut)
  }, [clerk, data.isLoaded, data.isSignedIn, data.user, setSession])
  return null
}
