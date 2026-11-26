import { MINI_PREFIX, wechatJson } from './miniIdentity'
import { accessToken } from './miniModeration'

const CACHE = MINI_PREFIX + 'media-readiness:v1'
function summary(result, version) {
  if (result.errcode) return { version, available: false, errcode: result.errcode }
  const responseFields = Object.keys(result).filter(key => !/owner|contact|token|secret/i.test(key))
  if (!Array.isArray(result.setting_list) && !Array.isArray(result.privacy_list) && typeof result.code_exist !== 'number')
    return { version, available: false, reason: 'unexpected_response', responseFields }
  const declared = (result.setting_list || []).filter(row => typeof row.privacy_text === 'string' && row.privacy_text.trim())
    .map(row => ({ key: row.privacy_key, label: row.privacy_label || '' }))
  const required = Array.isArray(result.privacy_list) ? result.privacy_list : []
  return { version, available: true, responseFields, codeExists: result.code_exist === 1,
    updatedAt: result.update_time || null, required, declared,
    missingDescriptions: required.filter(key => !declared.some(row => row.key === key)) }
}
export async function mediaReadiness(redis) {
  const cached = await redis.get(CACHE)
  if (cached) return JSON.parse(cached)
  let token = await accessToken(redis)
  const versions = []
  for (const version of [1, 2]) {
    const query = () => wechatJson('https://api.weixin.qq.com/cgi-bin/component/getprivacysetting?access_token=' + encodeURIComponent(token), {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ privacy_ver: version })
    })
    let result = await query()
    if ([40001, 42001].includes(result.errcode)) {
      token = await accessToken(redis, true)
      result = await query()
    }
    versions.push(summary(result, version))
  }
  // Owner contact details, contract text, access tokens and AppSecret never leave this function.
  const result = { appId: process.env.WUZAI_MINI_APP_ID, checkedAt: new Date().toISOString(), versions }
  if (versions.every(version => version.available)) await redis.set(CACHE, JSON.stringify(result), 'EX', 60)
  return result
}
