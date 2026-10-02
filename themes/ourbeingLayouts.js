import dynamic from 'next/dynamic'

// Top-level literal imports let Next register/preload before SSR. Creating a
// loadable during render can leave initial HTML as a skeleton despite ssr:true.
export const ourbeingLayouts = {
  LayoutBase: dynamic(() =>
    import('@/themes/my-theme').then(mod => mod.LayoutBase)
  ),
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
  )
}
