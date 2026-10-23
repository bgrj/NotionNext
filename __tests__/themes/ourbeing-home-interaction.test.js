/** @jest-environment node */
import { renderToStaticMarkup } from 'react-dom/server'
import { createStyleRegistry, StyleRegistry } from 'styled-jsx'
import HeroPuzzle from '@/themes/my-theme/components/HeroPuzzle'
import Header from '@/themes/my-theme/components/Header'

jest.mock('@/lib/config', () => ({
  siteConfig: (_key, fallback) => fallback
}))
jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn(), events: { on() {}, off() {} } })
}))
jest.mock(
  'lodash.throttle',
  () => ({
    __esModule: true,
    default: fn => Object.assign(fn, { cancel() {} })
  }),
  { virtual: true }
)
jest.mock('next/dynamic', () => () => () => null)
jest.mock('@/components/SmartLink', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>
}))

const render = component => {
  const registry = createStyleRegistry()
  const markup = renderToStaticMarkup(
    <StyleRegistry registry={registry}>{component}</StyleRegistry>
  )
  const styles = renderToStaticMarkup(<>{registry.styles()}</>)
  registry.flush()
  return { markup, styles }
}

test('four original category links and their non-interactive preview labels survive SSR', () => {
  const { markup, styles } = render(<HeroPuzzle />)
  for (const name of ['我们的存在', '我的存在', '道', '术']) {
    expect(markup).toContain(`href="/category/${name}"`)
    expect(markup).toContain(`aria-label="${name}"`)
  }
  expect(markup.match(/class="[^"]*\bob-plate-link\b[^"]*"/g)).toHaveLength(4)
  expect(markup).toContain('ob-entry-hints')
  expect(styles).toContain(':focus-visible')
  expect(styles).toMatch(/\(hover:\s*none\)/)
  expect(styles).toContain('prefers-reduced-motion')
  expect(styles).toContain('.ob-entry-hint')
})

test('navigation keeps the complete motto and provides a reduced-motion alternative', () => {
  const { markup, styles } = render(
    <Header siteInfo={{ title: 'Our beings' }} />
  )
  for (const text of [
    '我们的存在',
    '让我们的思想为时代所传唱，',
    '让我们的灵魂永世不朽，',
    '让我们的存在与世界同在'
  ]) {
    expect(markup).toContain(`aria-label="${text}"`)
  }
  expect(styles).toContain('ob-nav-breathe')
  expect(styles).toMatch(/opacity:\s*0?\.78/)
  expect(styles).toContain('prefers-reduced-motion')
  expect(styles).not.toMatch(/&#(?:x27|39);|&quot;/)
})
