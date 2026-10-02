/** @jest-environment node */
import { renderToStaticMarkup } from 'react-dom/server'
import { createStyleRegistry, StyleRegistry } from 'styled-jsx'
import Footer from '@/themes/my-theme/components/Footer'

jest.mock('@/lib/config', () => ({
  siteConfig: (_key, fallback) => fallback
}))

test('SSR footer CSS preserves quotes without raw-text hydration mismatches', () => {
  const registry = createStyleRegistry()
  const markup = renderToStaticMarkup(
    <StyleRegistry registry={registry}>
      <Footer />
    </StyleRegistry>
  )
  const styles = renderToStaticMarkup(<>{registry.styles()}</>)
  expect(markup).toContain('ob-footer')
  expect(markup).toContain('访问次数')
  expect(markup).toContain('访问人数')
  expect(markup).toContain('busuanzi_value_site_pv')
  expect(markup).not.toContain('hidden busuanzi_container')
  expect(markup).not.toContain('<style')
  expect(styles).toContain('.ob-link')
  expect(styles).toMatch(/content:\s*['"]{2}/)
  expect(styles).not.toMatch(/&#(?:x27|39);|&quot;/)
  registry.flush()
})
