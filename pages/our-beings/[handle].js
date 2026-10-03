import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { DynamicLayout } from '@/themes/theme'
import {
  findPublicBeing,
  listPublicBeings,
  normalizeHandle
} from '@/themes/my-theme/beings'

export default function BeingProfile(props) {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return (
    <DynamicLayout theme={theme} layoutName='LayoutBeingProfile' {...props} />
  )
}

export async function getStaticProps({ params, locale }) {
  const handle = normalizeHandle(params?.handle)
  const props = await fetchGlobalAllData({ from: 'being-profile', locale })
  delete props.allPages
  const being = findPublicBeing(handle)
  if (!being) {
    return {
      notFound: true,
      revalidate: process.env.EXPORT
        ? undefined
        : siteConfig(
            'NEXT_REVALIDATE_SECOND',
            BLOG.NEXT_REVALIDATE_SECOND,
            props.NOTION_CONFIG
          )
    }
  }
  return {
    props: { ...props, being },
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}

export function getStaticPaths() {
  return {
    paths: listPublicBeings().map(being => ({
      params: { handle: being.handle }
    })),
    fallback: 'blocking'
  }
}
