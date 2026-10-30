import {
  AUTHOR_BEING,
  OUR_BEINGS_LOGIN,
  OUR_BEINGS_SEATS,
  beingFromClerkUser,
  beingProfileHref,
  createBeingProfile,
  findPublicBeing,
  handleFromEmail,
  isAuthorLoginEmail,
  isOurBeingsAuthPath,
  isOurBeingsPath,
  isWorldwideEmail,
  joinRequiresInviteOrPayment,
  listPublicBeings,
  normalizeHandle,
  remainingOurBeingSeats
} from '@/themes/my-theme/beings'
import { EXISTENCE_DEFAULTS } from '@/themes/my-theme/existence'

describe('our beings archive', () => {
  test('recognizes the our-beings category path', () => {
    expect(isOurBeingsPath('/category/我们的存在')).toBe(true)
    expect(isOurBeingsPath('/our-beings')).toBe(true)
    expect(isOurBeingsPath('/our-beings/ourbeing')).toBe(true)
    expect(isOurBeingsPath('/category/我的存在')).toBe(false)
  })

  test('treats sign-in and sign-up as worldwide auth paths', () => {
    expect(isOurBeingsAuthPath('/sign-up')).toBe(true)
    expect(isOurBeingsAuthPath('/sign-in/factor-one')).toBe(true)
    expect(isOurBeingsAuthPath('/category/我们的存在')).toBe(false)
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
    expect(findPublicBeing('OurBeing').handle).toBe('ourbeing')
    expect(beingProfileHref('Our Being')).toBe('/our-beings/our-being')
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
    expect(profile.newEnd).toBe('2095-03-27')
  })

  test('empty member profiles do not inherit the author birth date', () => {
    const profile = createBeingProfile({}, { defaults: false })
    expect(profile.birth).toBe('')
    expect(profile.awakening).toBe('')
    expect(profile.newEnd).toBe('')
    expect(profile.motto).toBe('')
  })

  test('login accepts any country email and does not require WeChat or phone', () => {
    expect(OUR_BEINGS_LOGIN.primary).toBe('email')
    expect(OUR_BEINGS_LOGIN.notRequired).toEqual(
      expect.arrayContaining(['wechat', 'phone'])
    )
    expect(isWorldwideEmail('someone@gmail.com')).toBe(true)
    expect(isWorldwideEmail('a@b.co.uk')).toBe(true)
    expect(isWorldwideEmail('名前@example.jp')).toBe(true)
    expect(isWorldwideEmail('not-an-email')).toBe(false)
    expect(normalizeHandle('  東京 太郎 ')).toBe('東京-太郎')
  })

  test('maps the author login email to archive 001 and keeps other members private by default', () => {
    expect(isAuthorLoginEmail('hsz@ourbeings.com')).toBe(true)
    expect(handleFromEmail('maya@gmail.com')).toBe('maya')
    const author = beingFromClerkUser({
      id: 'user_1',
      primaryEmailAddress: { emailAddress: 'hsz@ourbeings.com' }
    })
    expect(author).toMatchObject({ handle: 'ourbeing', seat: 1, isAuthor: true })
    const member = beingFromClerkUser({
      id: 'user_2',
      firstName: 'Anthe',
      lastName: 'n',
      primaryEmailAddress: { emailAddress: 'maya@gmail.com' },
      publicMetadata: { handle: 'maya', seat: 2 }
    })
    expect(member.public).toBe(false)
    expect(member.href).toBe('/our-beings/maya')
    expect(member.name).toBe('maya')
  })
})
