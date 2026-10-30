/** @jest-environment node */
import {
  crc32,
  frameTimes,
  instantFromWall,
  parseChatExport,
  zipFiles
} from '@/lib/beings/community/localTools'

test('chat text retains multiline messages and unknown preamble without discarding text', () => {
  const data = parseChatExport(
    '导出说明\n2026-10-31 10:00:00 A\nhello\nsecond line\n2026-10-31 10:01:00 B\nworld'
  )
  expect(data.count).toBe(3)
  expect(data.messages[1].content).toBe('hello\nsecond line')
  expect(data.text).toContain('导出说明')
  expect(data.text).toContain('world')
})
test('JSON export preserves attachment indexes and does not fetch attachments', () => {
  const result = parseChatExport(
    JSON.stringify({
      messages: [
        {
          time: '2026-10-31',
          sender: 'A',
          content: 'photo',
          attachments: ['images/1.jpg']
        }
      ]
    }),
    'json'
  )
  expect(result.attachmentCount).toBe(1)
  expect(result.messages[0].attachments).toEqual(['images/1.jpg'])
  expect(fetch).not.toHaveBeenCalled()
})
test.each(['', '{broken', '{}', '[null]'])(
  'malformed or empty input %s produces useful error',
  value =>
    expect(() => parseChatExport(value, value ? 'json' : 'text')).toThrow()
)
test('unstructured text is retained, never described as a complete recovered chat archive', () => {
  const result = parseChatExport('Unknown export format\nA line worth keeping')
  expect(result.messages[0].sender).toBe('未识别的原文')
  expect(result.text).toContain('A line worth keeping')
})
test('frame extraction respects exact intervals and does not request beyond duration', () => {
  expect(frameTimes({ start: 0, end: 30, step: 10, duration: 60 })).toEqual([
    0, 10, 20
  ])
  expect(frameTimes({ start: 5.2, end: 6.2, step: 0.5, duration: 8 })).toEqual([
    5.2, 5.7
  ])
})
test.each([
  { start: 0, end: 1000, step: 1, duration: 1000 },
  { start: -1, end: 10, step: 1, duration: 10 },
  { start: 10, end: 5, step: 1, duration: 10 },
  { start: 0, end: 50, step: 0, duration: 10 },
  { start: 0, end: 50, step: 10, duration: 10 }
])('invalid or excessive frame range is rejected %#', input =>
  expect(() => frameTimes(input)).toThrow()
)
test('ZIP output contains a valid stored UTF-8 entry and known CRC32', () => {
  const bytes = new TextEncoder().encode('123456789')
  expect(crc32(bytes)).toBe(0xcbf43926)
  const zip = zipFiles([{ name: 'frame-1.png', bytes }])
  const view = new DataView(zip.buffer)
  expect(view.getUint32(0, true)).toBe(0x04034b50)
  expect(view.getUint32(14, true)).toBe(0xcbf43926)
  expect(view.getUint32(18, true)).toBe(9)
  expect(view.getUint32(zip.length - 22, true)).toBe(0x06054b50)
  expect(view.getUint16(zip.length - 12, true)).toBe(1)
})
test.each([
  ['2026-11-01T12:00', 'Asia/Shanghai', '2026-11-01T04:00:00.000Z'],
  ['2026-11-01T12:00', 'UTC', '2026-11-01T12:00:00.000Z'],
  ['2026-07-01T12:00', 'America/New_York', '2026-07-01T16:00:00.000Z'],
  ['2026-01-01T12:00', 'America/New_York', '2026-01-01T17:00:00.000Z']
])(
  'event local time %s in %s maps to explicit instant',
  (value, zone, expected) => expect(instantFromWall(value, zone)).toBe(expected)
)
test('nonexistent and ambiguous daylight-saving wall times require correction', () => {
  expect(() => instantFromWall('2026-03-08T02:30', 'America/New_York')).toThrow(
    /不存在/
  )
  expect(() => instantFromWall('2026-11-01T01:30', 'America/New_York')).toThrow(
    /重复/
  )
})
