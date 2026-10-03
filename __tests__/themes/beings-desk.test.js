import {
  DESK_HREF,
  BEING_ROOMS,
  formatSeat,
  inviteCodeFrom,
  sanitizeProfileInput,
  sanitizeWriting
} from '@/themes/my-theme/beings'

describe('being desk', () => {
  test('desk lives at /our-beings/me and has three rooms', () => {
    expect(DESK_HREF).toBe('/our-beings/me')
    expect(BEING_ROOMS.map(room => room.name)).toEqual(['存在', '道', '术'])
  })

  test('seat labels do not pad an em dash into 00—', () => {
    expect(formatSeat(2)).toBe('002')
    expect(formatSeat(null)).toBe('—')
    expect(formatSeat('—')).toBe('—')
  })

  test('members may edit motto and target age, not the countdown formula', () => {
    const profile = sanitizeProfileInput({
      name: '  阿麦  ',
      motto: '人有很多面',
      birth: '1990-01-01',
      newYears: '70',
      years: 80
    })
    expect(profile).toMatchObject({
      name: '阿麦',
      motto: '人有很多面',
      birth: '1990-01-01',
      newYears: 70,
      years: 80
    })
    expect(profile.newEnd).toBeUndefined()
  })

  test('invite codes are stable, seat-prefixed, and not emails', () => {
    const a = inviteCodeFrom(1, 'user_abc')
    const b = inviteCodeFrom(1, 'user_abc')
    const c = inviteCodeFrom(2, 'user_abc')
    expect(a).toBe(b)
    expect(a).toMatch(/^OB001-[A-Z0-9]{4}$/)
    expect(c).toMatch(/^OB002-/)
    expect(c).not.toBe(a)
    expect(a.includes('@')).toBe(false)
  })

  test('writings stay in existence, dao, or shu and remain short', () => {
    expect(sanitizeWriting({ room: 'note', body: 'hi' })).toBeNull()
    const writing = sanitizeWriting({
      room: 'dao',
      title: '  路  ',
      body: '人有很多面',
      public: true
    })
    expect(writing).toMatchObject({
      room: 'dao',
      title: '路',
      body: '人有很多面',
      public: true
    })
  })
})
