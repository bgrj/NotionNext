import {
  AUTHOR_BEING,
  OUR_BEINGS_SEATS,
  createBeingProfile,
  isOurBeingsPath,
  joinRequiresInviteOrPayment,
  listPublicBeings,
  remainingOurBeingSeats
} from '@/themes/my-theme/beings'
import { EXISTENCE_DEFAULTS } from '@/themes/my-theme/existence'

describe('our beings archive', () => {
  test('recognizes the our-beings category path', () => {
    expect(isOurBeingsPath('/category/我们的存在')).toBe(true)
    expect(isOurBeingsPath('/our-beings')).toBe(true)
    expect(isOurBeingsPath('/category/我的存在')).toBe(false)
  })

  test('keeps the author as the first public being and uses the life-clock motto', () => {
    const beings = listPublicBeings()
    expect(beings[0]).toMatchObject({
      id: 'ourbeing',
      seat: 1,
      isAuthor: true,
      motto: EXISTENCE_DEFAULTS.motto
    })
    expect(AUTHOR_BEING.href).toContain('我的存在')
  })

  test('first hundred seats are free; later seats need invite or payment', () => {
    expect(remainingOurBeingSeats(1)).toBe(OUR_BEINGS_SEATS - 1)
    expect(joinRequiresInviteOrPayment(99)).toBe(false)
    expect(joinRequiresInviteOrPayment(100)).toBe(true)
  })

  test('member life-clock fields stay complete words of profile data, not the countdown formula', () => {
    const profile = createBeingProfile({
      birth: '1990-01-01',
      newYears: 70,
      motto: '人有很多面'
    })
    expect(profile.birth).toBe('1990-01-01')
    expect(profile.newYears).toBe(70)
    expect(profile.motto).toBe('人有很多面')
    expect(profile.years).toBe(EXISTENCE_DEFAULTS.years)
  })
})
