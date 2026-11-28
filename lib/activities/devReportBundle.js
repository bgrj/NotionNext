// Shared validation for locally prepared development evidence and the admin UI.
export const REPORT_IMAGE_LIMIT = 600000

export function reportRecord(input) {
  const title = typeof input?.title === 'string' ? input.title.trim() : ''
  const body = input?.body
  if (!title || title.length > 120 || typeof body !== 'string' || !body.trim() || body.length > 30000)
    throw new Error('记录须包含标题和正文，标题最多120字，正文最多30000字。')

  if (input.attachment === undefined) return { title, body }
  const { name, type, sha256, data } = input.attachment || {}
  if (typeof name !== 'string' || !name.trim() || name.length > 120 ||
      /[\\/\u0000-\u001f\u007f]/.test(name) ||
      !['image/png', 'image/jpeg'].includes(type) ||
      typeof sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(sha256) ||
      typeof data !== 'string' || !data.length || data.length > Math.ceil(REPORT_IMAGE_LIMIT / 3) * 4 ||
      data.length % 4 || !/^[A-Za-z0-9+/]+={0,2}$/.test(data))
    throw new Error('截图须为600 KB以内的PNG或JPEG，并附有效摘要。')
  return { title, body, attachment: { name, type, sha256, data } }
}

export function reportBundle(input) {
  if (input?.version !== 1 || !Array.isArray(input.reports) || !input.reports.length || input.reports.length > 100)
    throw new Error('请选择包含1—100条记录的吾在验收归档文件。')
  return input.reports.map(reportRecord)
}
