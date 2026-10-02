/** @jest-environment node */
import { mapImgUrl } from '@/lib/db/notion/mapImage'
import assets from '@/lib/ourbeing-assets.json'

test('rewrites known Our Being artwork at the image mapper', () => {
  const block = { id: 'cover-id', type: 'page', format: {} }
  const mapped = mapImgUrl(assets[1].source + '?t=old', block, 'collection', false)
  expect(mapped).toBe(assets[1].path)
})
