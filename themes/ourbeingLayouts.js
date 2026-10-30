import dynamic from 'next/dynamic'
import { LayoutBase } from '@/themes/my-theme'

// Top-level literal imports let Next register/preload before SSR. Creating a
// loadable during render can leave initial HTML as a skeleton despite ssr:true.
export const ourbeingLayouts = {
  // Keep the application shell synchronous. A suspended root layout can leave
  // the server-rendered shell behind while the client mounts another copy.
  LayoutBase,
  LayoutIndex: dynamic(() =>
    import('@/themes/my-theme').then(mod => mod.LayoutIndex)
  ),
  LayoutSlug: dynamic(() =>
    import('@/themes/my-theme').then(mod => mod.LayoutSlug)
  ),
  LayoutArchive: dynamic(() =>
    import('@/themes/my-theme').then(mod => mod.LayoutArchive)
  ),
  LayoutPostList: dynamic(() =>
    import('@/themes/my-theme').then(mod => mod.LayoutPostList)
  ),
  LayoutSearch: dynamic(() =>
    import('@/themes/my-theme').then(mod => mod.LayoutSearch)
  ),
  LayoutCategoryIndex: dynamic(() =>
    import('@/themes/my-theme').then(mod => mod.LayoutCategoryIndex)
  ),
  LayoutTagIndex: dynamic(() =>
    import('@/themes/my-theme').then(mod => mod.LayoutTagIndex)
  ),
  Layout404: dynamic(() =>
    import('@/themes/my-theme').then(mod => mod.Layout404)
  ),
  LayoutSignIn: dynamic(() =>
    import('@/themes/my-theme').then(mod => mod.LayoutSignIn)
  ),
  LayoutSignUp: dynamic(() =>
    import('@/themes/my-theme').then(mod => mod.LayoutSignUp)
  ),
  LayoutBeingDesk: dynamic(() =>
    import('@/themes/my-theme').then(mod => mod.LayoutBeingDesk)
  ),
  LayoutOurBeingsApp: dynamic(() =>
    import('@/themes/my-theme').then(mod => mod.LayoutOurBeingsApp)
  ),
  LayoutBeingProfile: dynamic(() =>
    import('@/themes/my-theme').then(mod => mod.LayoutBeingProfile)
  )
}
