import Post, {
  getStaticProps as getPostStaticProps
} from '../../[prefix]/[slug]/[...suffix]'

// The explicit /our-beings section takes priority over /[prefix]. Keep
// dated Notion articles reachable alongside the one-segment profile routes.
export default Post

export const getStaticPaths = () => ({ paths: [], fallback: 'blocking' })

export const getStaticProps = context =>
  getPostStaticProps({
    ...context,
    params: {
      prefix: 'our-beings',
      slug: context.params.handle,
      suffix: context.params.suffix
    }
  })
