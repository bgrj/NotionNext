const keyFor = (kind) =>
  `wuzai:{activities:v1}:subjects:${kind === 'conversation' ? 'conversation' : 'reading'}`

export async function rememberSubject(redis, kind, title) {
  const value = String(title || '').trim()
  if (!value || value === '其他' || value.length > 400) return
  await redis.sadd(keyFor(kind), value)
}

export async function listSubjects(redis) {
  const [reading, conversation] = await Promise.all([
    redis.smembers(keyFor('reading')),
    redis.smembers(keyFor('conversation'))
  ])
  const clean = (rows) =>
    (Array.isArray(rows) ? rows : [])
      .map((item) => String(item || '').trim())
      .filter((item) => item && item !== '其他')
      .slice(0, 500)
  return { reading: clean(reading), conversation: clean(conversation) }
}
