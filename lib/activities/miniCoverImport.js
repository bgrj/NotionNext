import { lookup as dnsLookup } from 'node:dns/promises'
import { request as httpsRequest } from 'node:https'
import { BlockList, isIP } from 'node:net'
import { fail } from '@/apps/wuzai/miniprogram/common/activities'

const denied = new BlockList()
for (const [ip, bits] of [['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8], ['169.254.0.0', 16], ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.0.2.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15], ['198.51.100.0', 24], ['203.0.113.0', 24], ['224.0.0.0', 4], ['240.0.0.0', 4]]) denied.addSubnet(ip, bits, 'ipv4')
const globalV6 = new BlockList()
globalV6.addSubnet('2000::', 3, 'ipv6')
denied.addSubnet('2001:db8::', 32, 'ipv6')
denied.addSubnet('2001::', 23, 'ipv6')
denied.addSubnet('2002::', 16, 'ipv6')
export function publicImageAddress(address) {
  const family = isIP(address)
  return family === 4 ? !denied.check(address, 'ipv4') : family === 6 && globalV6.check(address, 'ipv6') && !denied.check(address, 'ipv6')
}
export function coverImportUrl(value) {
  let url
  try { url = new URL(value) } catch { fail('invalid_cover_url', '请输入有效的HTTPS图片链接。') }
  if (typeof value !== 'string' || value.length > 2048 || url.protocol !== 'https:' || url.username || url.password || (url.port && url.port !== '443')) fail('invalid_cover_url', '请输入有效的HTTPS图片链接。')
  const host = url.hostname.replace(/^\[|\]$/g, '')
  if (host === 'localhost' || host.endsWith('.localhost') || (isIP(host) && !publicImageAddress(host))) fail('invalid_cover_url', '图片链接须使用公开的HTTPS地址。')
  return url
}
// Pin the verified DNS answer to the connection; validate every redirect again.
export async function downloadCoverImage(value, deps = {}) {
  const lookup = deps.lookup || dnsLookup, request = deps.request || httpsRequest
  const abort = new AbortController()
  const timer = setTimeout(() => abort.abort(), 12000)
  timer.unref?.()
  try {
    let url = coverImportUrl(value)
    for (let redirects = 0; redirects <= 3; redirects++) {
      if (abort.signal.aborted) throw Error('timeout')
      const host = url.hostname.replace(/^\[|\]$/g, '')
      const answers = isIP(host) ? [{ address: host, family: isIP(host) }] : await lookup(host, { all: true, verbatim: true })
      if (!answers.length || answers.some(row => !publicImageAddress(row.address))) fail('invalid_cover_url', '图片链接须使用公开的HTTPS地址。')
      const address = answers[0]
      const response = await new Promise((resolve, reject) => {
        const req = request(url, { method: 'GET', signal: abort.signal, autoSelectFamily: false,
          lookup: (_host, _opts, callback) => callback(null, address.address, address.family),
          headers: { Accept: 'image/jpeg,image/png', 'User-Agent': 'OurBeing-CoverImport/1' }
        }, resolve)
        req.on('error', reject); req.end()
      })
      if ([301, 302, 303, 307, 308].includes(response.statusCode)) {
        response.resume()
        if (!response.headers.location || redirects === 3) fail('invalid_cover_url', '图片链接重定向过多，请使用原图链接。')
        url = coverImportUrl(new URL(response.headers.location, url).href)
        continue
      }
      if (response.statusCode !== 200 || !/^image\/(jpeg|png)(?:;|$)/i.test(response.headers['content-type'] || '')) {
        response.destroy(); fail('invalid_cover_url', '链接未返回JPG或PNG原图。')
      }
      const chunks = []; let size = 0
      if (Number(response.headers['content-length']) > 3000000) { response.destroy(); fail('invalid_cover_url', '链接图片过大，请使用3 MB以内的图片。') }
      for await (const chunk of response) {
        size += chunk.length
        if (size > 3000000) { response.destroy(); fail('invalid_cover_url', '链接图片过大，请使用3 MB以内的图片。') }
        chunks.push(chunk)
      }
      if (!size) fail('invalid_cover_url', '链接未返回JPG或PNG原图。')
      return Buffer.concat(chunks)
    }
  } catch (error) {
    if (error.status) throw error
    fail('cover_import_unavailable', '图片链接暂时无法读取，请检查链接或选择本地图片。', 400)
  } finally { clearTimeout(timer) }
}
