import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { DynamicLayout } from '@/themes/theme'
import {
  AUTHOR_BEING,
  DESK_HREF,
  findPublicBeing,
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
  if (handle === 'me') {
    return {
      redirect: { destination: DESK_HREF, permanent: false }
    }
  }
  const props = await fetchGlobalAllData({ from: 'being-profile', locale })
  delete props.allPages
  const being = findPublicBeing(handle)
  return {
    props: {
      ...props,
      handle,
      being: being || null,
      writings: []
    },
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
    paths: [{ params: { handle: AUTHOR_BEING.handle } }],
    fallback: 'blocking'
  }
}
