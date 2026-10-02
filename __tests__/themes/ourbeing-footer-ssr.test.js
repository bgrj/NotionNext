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
  expect(markup).not.toContain('<style')
  expect(styles).toContain('.ob-link')
  expect(styles).toMatch(/content:\s*['"]{2}/)
  expect(styles).not.toMatch(/&#(?:x27|39);|&quot;/)
  registry.flush()
})
