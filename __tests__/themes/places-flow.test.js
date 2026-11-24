import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import LocationPicker from '@/themes/my-theme/activities/LocationPicker'
import DestinationMap from '@/themes/my-theme/activities/DestinationMap'
import { ActivityLanguageProvider } from '@/themes/my-theme/activities/language'

const point = {
  id: 'N:1',
  name: '周庄镇',
  label: '周庄镇 · 苏州市 · 江苏省 · 中国',
  countryCode: 'CN',
  kind: 'town',
  latitude: 31.1317907,
  longitude: 120.8355975
}
beforeEach(() => localStorage.setItem('ourbeing:language', 'zh'))
const wrapped = (element) => (
  <ActivityLanguageProvider>{element}</ActivityLanguageProvider>
)
test('world township search requires an explicit result selection and preserves coordinates', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ places: [point] })
  })
  const change = jest.fn()
  render(
    wrapped(<LocationPicker id='place' value='周庄镇 江苏' onChange={change} />)
  )
  fireEvent.click(screen.getByRole('button', { name: '搜索地图地点' }))
  const result = await screen.findByRole('button', { name: /周庄镇 · 苏州市/ })
  expect(change).not.toHaveBeenCalled()
  fireEvent.click(result)
  expect(change).toHaveBeenCalledWith(point.label, point)
  expect(global.fetch.mock.calls[0][0]).toContain('action=locations')
})
test('search failures retain a typed place and allow retry', async () => {
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: '地点检索暂不可用' })
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ places: [point] })
    })
  render(
    wrapped(
      <LocationPicker id='place' value='周庄镇 江苏' onChange={jest.fn()} />
    )
  )
  fireEvent.click(screen.getByRole('button', { name: '搜索地图地点' }))
  await screen.findByRole('alert')
  expect(screen.getByDisplayValue('周庄镇 江苏')).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: '搜索地图地点' }))
  await screen.findByRole('button', { name: /周庄镇 · 苏州市/ })
})
test('editing a location clears the old map pin instead of silently navigating there', () => {
  const change = jest.fn()
  render(
    wrapped(
      <LocationPicker
        id='place'
        value={point.label}
        place={point}
        onChange={change}
      />
    )
  )
  fireEvent.change(screen.getByDisplayValue(point.label), {
    target: { value: '另一个乡镇' }
  })
  expect(change).toHaveBeenCalledWith('另一个乡镇', null)
})
test('late search results cannot replace a newer location query', async () => {
  let finish
  global.fetch = jest.fn(
    () =>
      new Promise((resolve) => {
        finish = resolve
      })
  )
  const change = jest.fn()
  const { rerender } = render(
    wrapped(<LocationPicker id='place' value='旧地点' onChange={change} />)
  )
  fireEvent.click(screen.getByRole('button', { name: '搜索地图地点' }))
  rerender(
    wrapped(<LocationPicker id='place' value='新地点' onChange={change} />)
  )
  finish({ ok: true, json: () => Promise.resolve({ places: [point] }) })
  await waitFor(() =>
    expect(screen.getByRole('button', { name: '搜索地图地点' }).disabled).toBe(
      false
    )
  )
  expect(screen.queryByRole('button', { name: /周庄镇 · 苏州市/ })).toBeNull()
  expect(change).not.toHaveBeenCalled()
})
test('offline map preview is opened by the visitor and keeps demo and area-centre notices', () => {
  const { container } = render(
    wrapped(
      <DestinationMap
        event={{
          format: 'offline',
          demo: true,
          place: point,
          location: '演示场地'
        }}
      />
    )
  )
  expect(container.querySelector('iframe')).toBeNull()
  expect(screen.getByText(/请勿实际前往/)).toBeTruthy()
  expect(screen.getByText(/乡镇或区域中心/)).toBeTruthy()
  const link = screen.getByRole('link', { name: /Google Maps/ })
  expect(new URL(link.href).searchParams.get('destination')).toBe(
    '31.1317907,120.8355975'
  )
  fireEvent.click(screen.getByRole('button', { name: '查看地图' }))
  expect(screen.getByTitle('活动地点地图').getAttribute('src')).toContain(
    'marker=31.1317907%2C120.8355975'
  )
})
test('online events have no arrival navigation; manual addresses open a search', () => {
  const { rerender } = render(
    wrapped(<DestinationMap event={{ format: 'online', location: 'Online' }} />)
  )
  expect(screen.queryByText('地图与导航')).toBeNull()
  rerender(
    wrapped(
      <DestinationMap
        event={{
          format: 'offline',
          city: 'Arrowtown',
          location: 'Town library'
        }}
      />
    )
  )
  expect(screen.getByText(/尚未保存地图位置/)).toBeTruthy()
  expect(
    new URL(
      screen.getByRole('link', { name: /Google Maps/ }).href
    ).searchParams.get('destination')
  ).toBe('Arrowtown Town library')
  expect(screen.queryByRole('button', { name: '查看地图' })).toBeNull()
})
