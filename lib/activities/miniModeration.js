import { fail } from '@/apps/wuzai/miniprogram/common/activities'
import { MINI_PREFIX, wechatJson } from './miniIdentity'

export async function accessToken(redis, refresh = false) {
  const appId = process.env.WUZAI_MINI_APP_ID,
    secret = process.env.WUZAI_MINI_APP_SECRET
  if (!appId || !secret)
    fail('wechat_not_configured', '微信服务尚未配置完成，请稍后重试。', 503)
  const key = MINI_PREFIX + 'access-token:' + appId
  if (!refresh) {
    const cached = await redis.get(key)
    if (cached) return cached
  }
  const data = await wechatJson(
    'https://api.weixin.qq.com/cgi-bin/stable_token',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credential',
        appid: appId,
        secret,
        force_refresh: refresh
      })
    }
  )
  if (!data.access_token || data.errcode)
    fail('content_service_unavailable', '内容检查暂不可用，请稍后重试。', 503)
  await redis.set(
    key,
    data.access_token,
    'EX',
    Math.max(60, Math.min(7000, Number(data.expires_in) - 120 || 6000))
  )
  return data.access_token
}
const guidance = {
  10001: [
    '推广或诱导信息',
    '删除诱导分享、强制加群、夸大宣传或与活动无关的营销，直接说明真实活动安排。'
  ],
  20001: [
    '平台提示需核查的公共事务内容',
    '核对信息来源，删除未经证实的指控或煽动性表述，清楚说明客观的阅读与讨论范围。'
  ],
  20002: [
    '色情或性招揽风险',
    '删除露骨描写、性交易或招揽内容；如为合法教育讨论，请使用客观、非露骨的主题说明。'
  ],
  20003: [
    '辱骂或人身攻击',
    '删除针对个人或群体的贬损、威胁与攻击，改为中性的问题描述和讨论安排。'
  ],
  20006: [
    '违法活动风险',
    '删除组织、招揽或教授违法行为的安排；如为风险防范讨论，请写清教育目的及合法的讨论范围。'
  ],
  20008: [
    '欺诈或误导承诺',
    '删除保本、保证收益、虚假资质和无法核实的承诺，如实写明费用、风险与退款条件。'
  ],
  20012: [
    '低俗表达',
    '删除低俗、挑逗或侮辱性表达，使用客观、尊重参与者的活动说明。'
  ],
  20013: [
    '版权风险',
    '删除未经授权的完整作品或下载传播安排，仅使用获准材料、合法引用或公开来源。'
  ]
}
export async function reviewDescription(redis, actor, description) {
  if (
    typeof description !== 'string' ||
    !description.trim() ||
    description.length > 4000
  )
    fail('invalid_description', '请填写 1–4000 字的活动简介。')
  let token = await accessToken(redis)
  const openid = actor.id.slice(`wx:${process.env.WUZAI_MINI_APP_ID}:`.length)
  const check = async content => {
    const run = access =>
      wechatJson(
        'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' +
          encodeURIComponent(access),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ openid, scene: 2, version: 2, content })
        }
      )
    let result = await run(token)
    if ([40001, 42001].includes(result.errcode)) {
      token = await accessToken(redis, true)
      result = await run(token)
    }
    if (result.errcode || !result.result?.suggest)
      fail(
        'content_service_unavailable',
        '内容审核暂不可用，请稍后重新检查。',
        503
      )
    return result
  }
  const issues = [],
    characters = Array.from(description)
  let offset = 0
  function issue(text, at, result) {
    const details = (result.detail || []).filter(
      row => row.suggest && row.suggest !== 'pass'
    )
    const hit = details.find(
      row =>
        typeof row.keyword === 'string' &&
        row.keyword &&
        text.includes(row.keyword)
    )
    const category = guidance[
      hit?.label || details[0]?.label || result.result?.label
    ] || [
      '平台提示存在内容风险',
      '核实事实与授权，删除违法招揽、人身攻击、隐私泄露或误导承诺，改为真实、清楚的活动安排后重新检查。'
    ]
    const local = hit ? text.indexOf(hit.keyword) : 0
    issues.push({
      field: 'description',
      line: description.slice(0, at + local).split('\n').length,
      excerpt: hit
        ? text.slice(Math.max(0, local - 30), local + hit.keyword.length + 50)
        : text.slice(0, 160),
      precise: !!hit,
      reason: category[0],
      suggestion: category[1]
    })
  }
  for (let index = 0; index < characters.length; index += 2200) {
    const text = characters.slice(index, index + 2400).join(''),
      result = await check(text)
    if (result.result.suggest !== 'pass') {
      const keywords = (result.detail || []).some(
        row =>
          row.keyword && text.includes(row.keyword) && row.suggest !== 'pass'
      )
      if (keywords) issue(text, offset, result)
      else {
        const paragraphs = [...text.matchAll(/[^\n]+/g)]
        if (paragraphs.length > 1 && paragraphs.length <= 4) {
          let found = false
          for (const paragraph of paragraphs) {
            const checked = await check(paragraph[0])
            if (checked.result.suggest !== 'pass') {
              issue(paragraph[0], offset + paragraph.index, checked)
              found = true
            }
          }
          if (!found) issue(text, offset, result)
        } else issue(text, offset, result)
      }
    }
    if (index + 2400 >= characters.length) break
    offset += characters.slice(index, index + 2200).join('').length
  }
  return { passed: !issues.length, issues }
}
export async function moderateMini(redis, actor, input) {
  if (input.description) {
    const review = await reviewDescription(redis, actor, input.description)
    if (!review.passed) {
      const error = new Error('活动简介需修改，请查看具体提示。')
      Object.assign(error, {
        code: 'content_review',
        status: 400,
        issues: review.issues
      })
      throw error
    }
  }
  const fields = [
    'title',
    'book',
    'location',
    'city',
    'joinInstructions',
    'body',
    'bio',
    'hostIntro',
    'preparation',
    'accessibility',
    'cancellationPolicy',
    'cost',
    'languageDetail',
    'channelDetail'
  ]
  const content = fields
    .map(field => input[field])
    .concat(
      Object.values(
        input.place && typeof input.place === 'object' ? input.place : {}
      )
    )
    .filter(value => typeof value === 'string')
    .join('\n')
  if (content.length > 10000) fail('content_too_long', '内容过长，请分次提交。')
  if (!content) return
  let token = await accessToken(redis)
  const openid = actor.id.slice(`wx:${process.env.WUZAI_MINI_APP_ID}:`.length)
  const characters = Array.from(content)
  for (let offset = 0; offset < characters.length; offset += 2200) {
    const body = JSON.stringify({
      openid,
      scene: 2,
      version: 2,
      content: characters.slice(offset, offset + 2400).join('')
    })
    const check = access =>
      wechatJson(
        'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' +
          encodeURIComponent(access),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body
        }
      )
    let review = await check(token)
    if ([40001, 42001].includes(review.errcode)) {
      token = await accessToken(redis, true)
      review = await check(token)
    }
    if (review.errcode || review.result?.suggest !== 'pass')
      fail('content_review', '请检查内容后再提交，或稍后重试。')
    if (offset + 2400 >= characters.length) break
  }
}
