import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { buildPublicHub } from '@/lib/site/publicHub'
import { DynamicLayout } from '@/themes/theme'

export default function CommunityPage(props) {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return (
    <DynamicLayout theme={theme} layoutName='LayoutOurBeingsApp' {...props} />
  )
}
export async function getStaticProps({ locale }) {
  const props = await fetchGlobalAllData({
    from: 'ourbeings-community-app',
    locale
  })
  props.publicHub = buildPublicHub(props.allPages)
  delete props.allPages
  return { props, revalidate: process.env.EXPORT ? undefined : 120 }
}
export async function getStaticPaths() {
  return {
    paths: [[], ['about'], ['tools'], ['demo'], ['events'], ['policies']].map(
      screen => ({ params: { screen } })
    ),
    fallback: 'blocking'
  }
}
