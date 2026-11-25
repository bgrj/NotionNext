import { createHash, randomUUID } from 'node:crypto'
import { fail, requireActor } from '@/apps/wuzai/miniprogram/common/activities'

const prefix = 'wuzai:{writings:v1}:'
const publicIndex = prefix + 'public'
const digest = value => createHash('sha256').update(value).digest('hex')
const userIndex = actor =>
  prefix + 'user:' + createHash('sha256').update(actor.id).digest('hex')
const fields = item => ({
  id: item.id,
  room: item.room,
  title: item.title,
  body: item.body,
  public: item.public,
  author: item.author,
  createdAt: item.createdAt
})
const save = `local existing=redis.call('GET',KEYS[1])
if existing then return existing end
if redis.call('ZCARD', KEYS[2]) >= 100 then return 0 end
redis.call('SET', KEYS[1], ARGV[1])
redis.call('ZADD', KEYS[2], ARGV[2], ARGV[3])
if ARGV[4] == '1' then redis.call('ZADD', KEYS[3], ARGV[2], ARGV[3]) end
return 1`

export async function activityWritings(
  redis,
  action,
  input,
  actor,
  now = Date.now()
) {
  if (!['saveWriting', 'writings', 'publicWritings'].includes(action))
    fail('invalid_action', '不支持的操作。')
  if (action !== 'publicWritings') {
    requireActor(actor)
    if (actor.platform !== 'wechat')
      fail(
        'wechat_login_required',
        '请在小程序中使用微信账号保存和查看创作。',
        403
      )
  }
  if (action === 'saveWriting') {
    if (
      input.clientRequestId !== undefined &&
      (typeof input.clientRequestId !== 'string' ||
        !/^[a-zA-Z0-9-]{8,60}$/.test(input.clientRequestId))
    )
      fail('invalid_request_id', '没有找到这份保存记录。')
    if (input.public !== undefined && typeof input.public !== 'boolean')
      fail('invalid_visibility', '请选择公开或私密。')
    if (!['dao', 'shu', 'existence'].includes(input.room))
      fail('invalid_room', '请选择道、术或我的存在。')
    if (
      typeof input.title !== 'string' ||
      input.title.trim().length < 1 ||
      input.title.trim().length > 80
    )
      fail('invalid_title', '请填写 1–80 字的题目。')
    if (
      typeof input.body !== 'string' ||
      input.body.trim().length < 1 ||
      input.body.trim().length > 4000
    )
      fail('invalid_body', '请填写 1–4000 字的正文。')
    const content = {
      room: input.room,
      title: input.title.trim(),
      body: input.body.trim(),
      public: input.public === true
    }
    const item = {
      // The account and client request jointly identify one save, including retries.
      id: input.clientRequestId
        ? digest(actor.id + '\n' + input.clientRequestId)
        : randomUUID(),
      owner: actor.id,
      author: actor.name || '存在者',
      ...content,
      requestHash: digest(JSON.stringify(content)),
      createdAt: new Date(now).toISOString()
    }
    const result = await redis.eval(
      save,
      3,
      prefix + item.id,
      userIndex(actor),
      publicIndex,
      JSON.stringify(item),
      now,
      item.id,
      item.public ? '1' : '0'
    )
    if (typeof result === 'string') {
      const existing = JSON.parse(result)
      if (
        existing.owner !== actor.id ||
        existing.requestHash !== item.requestHash
      )
        fail(
          'writing_conflict',
          '上次内容已保存，请先查看「我的创作」，再保存新内容。',
          409
        )
      return { writing: fields(existing) }
    }
    if (result !== 1) fail('writings_full', '当前账号最多保存 100 段创作。')
    return { writing: fields(item) }
  }
  const ids = await redis.zrevrange(
    action === 'publicWritings' ? publicIndex : userIndex(actor),
    0,
    action === 'publicWritings' ? 39 : 99
  )
  const rows = ids.length ? await redis.mget(ids.map(id => prefix + id)) : []
  const items = rows
    .filter(Boolean)
    .map(row => JSON.parse(row))
    .filter(item =>
      action === 'publicWritings'
        ? item.public === true
        : item.owner === actor.id
    )
  return { writings: items.map(fields) }
}
