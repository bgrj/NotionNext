/** @jest-environment node */
import { renderToStaticMarkup } from 'react-dom/server'
import { createStyleRegistry, StyleRegistry } from 'styled-jsx'
import ExistenceLife from '@/themes/my-theme/components/ExistenceLife'

jest.mock('@/lib/config', () => ({
  siteConfig: (_key, fallback) => fallback
}))
jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() })
}))
jest.mock('@/components/SmartLink', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>
}))

const renderSnapshot = initialRenderTime => {
  const registry = createStyleRegistry()
  const markup = renderToStaticMarkup(
    <StyleRegistry registry={registry}>
      <ExistenceLife posts={[]} initialRenderTime={initialRenderTime} />
    </StyleRegistry>
  )
  registry.flush()
  return markup
}

test('SSG and client initialization use the same clock and calendar snapshot', () => {
  const snapshot = Date.parse('2026-10-01T15:59:58Z')
  const now = jest.spyOn(Date, 'now')
  now.mockReturnValue(snapshot)
  const serverMarkup = renderSnapshot(snapshot)
  now.mockReturnValue(snapshot + 120000) // crosses midnight in Shanghai
  expect(renderSnapshot(snapshot)).toBe(serverMarkup)
  expect(renderSnapshot(snapshot + 120000)).not.toBe(serverMarkup)
})