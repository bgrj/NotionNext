import {
  UI_LANGUAGE_STORAGE_KEY,
  loadUiLanguagePreference,
  saveUiLanguagePreference,
  initLocale
} from '@/lib/utils/lang'
const mockQuery = {}
jest.mock('@/lib/utils', () => ({
  isBrowser: true,
  getQueryVariable: key => mockQuery[key],
  mergeDeep: (...objects) => Object.assign({}, ...objects)
}))
jest.mock('next/router', () => ({ useRouter: jest.fn() }))
let store
beforeEach(() => {
  store = {}
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    }
  })
  delete mockQuery.lang
  delete mockQuery.locale
  window.localStorage.getItem.mockImplementation(key => store[key] ?? null)
  window.localStorage.setItem.mockImplementation((key, value) => {
    store[key] = value
  })
})

test('explicit language selection survives reload', () => {
  saveUiLanguagePreference('en-US')
  expect(store[UI_LANGUAGE_STORAGE_KEY]).toBe('en-US')
  expect(loadUiLanguagePreference()).toBe('en-US')
  const change = jest.fn()
  initLocale('zh-CN', change, jest.fn())
  expect(change).toHaveBeenCalledWith('en-US')
})

test('an explicit URL language takes priority over a remembered preference', () => {
  saveUiLanguagePreference('en-US')
  mockQuery.lang = 'zh-TW'
  const change = jest.fn()
  initLocale('zh-CN', change, jest.fn())
  expect(change).toHaveBeenCalledWith('zh-TW')
})

test('invalid saved language falls back to route language', () => {
  store[UI_LANGUAGE_STORAGE_KEY] = 'invalid'
  const change = jest.fn()
  initLocale('zh-CN', change, jest.fn())
  expect(change).toHaveBeenCalledWith('zh-CN')
  saveUiLanguagePreference('invalid')
  expect(window.localStorage.setItem.mock.calls).toHaveLength(0)
})

test('blocked storage does not break language switching', () => {
  window.localStorage.getItem.mockImplementation(() => {
    throw new Error('blocked')
  })
  window.localStorage.setItem.mockImplementation(() => {
    throw new Error('blocked')
  })
  expect(loadUiLanguagePreference()).toBeNull()
  expect(() => saveUiLanguagePreference('en-US')).not.toThrow()
})
