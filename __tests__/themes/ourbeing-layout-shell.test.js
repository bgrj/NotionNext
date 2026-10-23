/** @jest-environment node */
import { ourbeingLayouts } from '@/themes/ourbeingLayouts'
import { LayoutBase } from '@/themes/my-theme'

jest.mock('@/themes/my-theme', () => ({
  LayoutBase: function StableApplicationShell({ children }) {
    return children
  }
}))
jest.mock('next/dynamic', () =>
  jest.fn(
    () =>
      function AsyncPage() {
        return null
      }
  )
)

test('the application shell is synchronous, not a suspended dynamic root', () => {
  expect(ourbeingLayouts.LayoutBase).toBe(LayoutBase)
  expect(typeof ourbeingLayouts.LayoutIndex).toBe('function')
})
