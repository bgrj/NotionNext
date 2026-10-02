import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import {
  fetchGlobalAllData,
  finalizeListPageProps
} from '@/lib/db/SiteDataApi'
import { DynamicLayout } from '@/themes/theme'

/**
 * 404
 * @param {*} props
 * @returns
 */
const NoFound = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='Layout404' {...props} />
}

export async function getStaticProps(req) {
  const { locale } = req

  const props = (await fetchGlobalAllData({ from: '404', locale })) || {}
  props.posts = []
  finalizeListPageProps(props)
  return { props }
}

export default NoFound
