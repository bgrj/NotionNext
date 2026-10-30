// These tools process only the supplied data. No network, analytics or storage.
export function parseChatExport(source, format = 'text') {
  if (typeof source !== 'string' || source.length > 10 * 1024 * 1024)
    throw new Error('请选择 10 MB 以内的文本或 JSON 导出文件。')
  let messages = []
  if (format === 'json') {
    let data
    try {
      data = JSON.parse(source)
    } catch {
      throw new Error('JSON 格式不完整，请重新导出后再试。')
    }
    const rows = Array.isArray(data) ? data : data.messages
    if (!Array.isArray(rows))
      throw new Error(
        '支持 JSON 数组或含 messages 数组的导出；每条包含 time、sender、content。'
      )
    messages = rows.map((row, index) => {
      if (!row || typeof row !== 'object' || Array.isArray(row))
        throw new Error(`第 ${index + 1} 条不是消息对象。`)
      const content =
        typeof row.content === 'string'
          ? row.content
          : typeof row.text === 'string'
            ? row.text
            : ''
      const attachments = Array.isArray(row.attachments)
        ? row.attachments
            .filter(x => typeof x === 'string')
            .map(x => x.slice(0, 1500))
            .slice(0, 20)
        : []
      return {
        index: index + 1,
        time: String(row.time ?? row.timestamp ?? '').slice(0, 80),
        sender: String(row.sender ?? row.from ?? '').slice(0, 120),
        content,
        attachments
      }
    })
  } else {
    const lines = source
      .replace(/^\uFEFF/, '')
      .replace(/\r\n?/g, '\n')
      .split('\n')
    const header =
      /^(\d{4}[-/]\d{1,2}[-/]\d{1,2}[ T]\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)$/
    let current = null
    for (const line of lines) {
      const match = line.match(header)
      if (match) {
        if (current) messages.push(current)
        current = {
          index: messages.length + 1,
          time: match[1],
          sender: match[2].trim(),
          content: '',
          attachments: []
        }
      } else if (current)
        current.content += `${current.content ? '\n' : ''}${line}`
      else if (line.trim()) {
        // Keep unrecognised text, never silently discard a preamble.
        current = {
          index: 1,
          time: '',
          sender: '未识别的原文',
          content: line,
          attachments: []
        }
      }
    }
    if (current) messages.push(current)
    messages = messages.map((m, i) => ({
      ...m,
      index: i + 1,
      content: m.content.trimEnd()
    }))
  }
  if (!messages.length) throw new Error('文件里没有可读取的消息。')
  return {
    messages,
    count: messages.length,
    participants: [...new Set(messages.map(x => x.sender).filter(Boolean))],
    attachmentCount: messages.reduce((n, x) => n + x.attachments.length, 0),
    text: messages
      .map(
        x =>
          `[${x.time || '未标时间'}] ${x.sender || '未标发送者'}\n${x.content}${x.attachments.length ? `\n附件索引：${x.attachments.join('；')}` : ''}`
      )
      .join('\n\n')
  }
}

export function frameTimes({
  start = 0,
  end,
  step = 10,
  duration,
  maximum = 12
}) {
  const a = Number(start),
    b = end === '' || end == null ? Number(duration) : Number(end),
    interval = Number(step)
  if (
    ![a, b, interval, duration].every(Number.isFinite) ||
    a < 0 ||
    interval <= 0 ||
    b <= a ||
    b > duration + 0.01
  )
    throw new Error('请检查起止秒数与间隔：结束需晚于开始，且不超过视频时长。')
  const count = Math.ceil((b - a) / interval)
  if (count > maximum)
    throw new Error(`本地批量每次最多 ${maximum} 张，请缩短区间或增大间隔。`)
  return Array.from({ length: count }, (_, i) =>
    Math.min(duration - 0.001, a + i * interval)
  ).filter(x => x >= 0)
}

export function instantFromWall(value, timeZone) {
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/)
  if (!match) throw new Error('请填写完整的日期与时间。')
  const [, year, month, day, hour, minute] = match.map(Number)
  const target = Date.UTC(year, month - 1, day, hour, minute)
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  })
  const wall = stamp => {
    const p = Object.fromEntries(
      fmt.formatToParts(new Date(stamp)).map(x => [x.type, x.value])
    )
    return Date.UTC(
      Number(p.year),
      Number(p.month) - 1,
      Number(p.day),
      Number(p.hour),
      Number(p.minute)
    )
  }
  let guess = target
  for (let i = 0; i < 4; i += 1) {
    const difference = target - wall(guess)
    if (!difference) break
    guess += difference
  }
  if (wall(guess) !== target)
    throw new Error('这个当地时间处在夏令时跳变中，并不存在。请换一个时间。')
  if (
    [-7200000, -3600000, -1800000, 1800000, 3600000, 7200000].some(
      delta => wall(guess + delta) === target
    )
  )
    throw new Error(
      '这个时间在夏令时切换中重复。请改用 UTC 填写明确时间，再核对预览。'
    )
  return new Date(guess).toISOString()
}

export function crc32(bytes) {
  let crc = -1
  for (const byte of bytes) {
    crc ^= byte
    for (let i = 0; i < 8; i += 1)
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
  }
  return (crc ^ -1) >>> 0
}
const concat = arrays => {
  const out = new Uint8Array(arrays.reduce((n, x) => n + x.length, 0))
  let offset = 0
  for (const array of arrays) {
    out.set(array, offset)
    offset += array.length
  }
  return out
}
const header = (length, values) => {
  const data = new Uint8Array(length),
    view = new DataView(data.buffer)
  for (const [offset, width, value] of values)
    width === 2
      ? view.setUint16(offset, value, true)
      : view.setUint32(offset, value, true)
  return data
}
// ZIP store mode: PNG is already compressed, so no extra dependency is needed.
export function zipFiles(files) {
  const encoder = new TextEncoder(),
    local = [],
    central = []
  let offset = 0
  if (files.length > 100) throw new Error('一次导出文件过多。')
  for (const file of files) {
    const name = encoder.encode(
      String(file.name)
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .slice(0, 100)
    )
    const bytes =
      file.bytes instanceof Uint8Array ? file.bytes : new Uint8Array(file.bytes)
    const crc = crc32(bytes)
    const l = header(30, [
      [0, 4, 0x04034b50],
      [4, 2, 20],
      [6, 2, 0x800],
      [14, 4, crc],
      [18, 4, bytes.length],
      [22, 4, bytes.length],
      [26, 2, name.length]
    ])
    const c = header(46, [
      [0, 4, 0x02014b50],
      [4, 2, 20],
      [6, 2, 20],
      [8, 2, 0x800],
      [16, 4, crc],
      [20, 4, bytes.length],
      [24, 4, bytes.length],
      [28, 2, name.length],
      [42, 4, offset]
    ])
    local.push(l, name, bytes)
    central.push(c, name)
    offset += l.length + name.length + bytes.length
  }
  const directory = concat(central)
  const end = header(22, [
    [0, 4, 0x06054b50],
    [8, 2, files.length],
    [10, 2, files.length],
    [12, 4, directory.length],
    [16, 4, offset]
  ])
  return concat([...local, directory, end])
}
