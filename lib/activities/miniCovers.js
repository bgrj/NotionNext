import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { fail } from '@/apps/wuzai/miniprogram/common/activities'
import { accessToken } from './miniModeration'
import { MINI_PREFIX, wechatJson } from './miniIdentity'

export const coverKey = id => MINI_PREFIX + 'cover:' + id
export async function requireMiniCover(redis, cover) {
  const match = /^\/api\/our-beings\/covers\/([a-f0-9]{64})$/.exec(cover || '')
  if (!match || !(await redis.exists(coverKey(match[1]))))
    fail('cover_required', '请重新上传活动封面。')
}
export async function saveMiniCover(redis, actor, image) {
  if (
    typeof image !== 'string' ||
    image.length > 4200000 ||
    !/^[A-Za-z0-9+/]+={0,2}$/.test(image)
  )
    fail('invalid_cover', '图片过大或格式不正确，请选择 JPG / PNG 封面。')
  const source = Buffer.from(image, 'base64')
  let bytes
  try {
    const decoder = sharp(source, { limitInputPixels: 40000000 })
    const meta = await decoder.metadata()
    if (!['jpeg', 'png'].includes(meta.format)) throw new Error('format')
    bytes = await decoder
      .rotate()
      .resize(1200, 900, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 78 })
      .toBuffer()
  } catch {
    fail('invalid_cover', '请选择有效的 JPG / PNG 封面。')
  }
  if (bytes.length > 900000)
    fail('invalid_cover', '图片过大，请选择较小的封面。')
  const id = createHash('sha256').update(bytes).digest('hex'),
    key = coverKey(id)
  if (await redis.exists(key)) return '/api/our-beings/covers/' + id
  const quota =
    MINI_PREFIX +
    'cover-quota:' +
    createHash('sha256').update(actor.id).digest('hex') +
    ':' +
    new Date().toISOString().slice(0, 10)
  const count = await redis.incr(quota)
  if (count === 1) await redis.expire(quota, 86400)
  if (count > 12) fail('cover_limit', '今日上传封面较多，请明天再试。', 429)
  const check = async token => {
    const body = new FormData()
    body.append('media', new Blob([bytes], { type: 'image/jpeg' }), 'cover.jpg')
    return wechatJson(
      'https://api.weixin.qq.com/wxa/img_sec_check?access_token=' +
        encodeURIComponent(token),
      { method: 'POST', body }
    )
  }
  let review = await check(await accessToken(redis))
  if ([40001, 42001].includes(review.errcode))
    review = await check(await accessToken(redis, true))
  if (review.errcode !== 0)
    fail('content_review', '图片检查未通过，请更换封面后重试。')
  await redis.set(key, bytes.toString('base64'), 'NX')
  return '/api/our-beings/covers/' + id
}
