import { useEffect, useRef, useState } from 'react'
import {
  crc32,
  frameTimes,
  parseChatExport,
  zipFiles
} from '@/lib/beings/community/localTools'
import s from './Community.module.css'

export function downloadLocal(data, filename, type = 'application/json') {
  const blob = data instanceof Blob ? data : new Blob([data], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}

function ChatTool() {
  const [result, setResult] = useState(null)
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const choose = async event => {
    const file = event.target.files?.[0]
    if (!file) return
    setError('')
    setResult(null)
    setBusy(true)
    try {
      if (file.size > 10 * 1024 * 1024)
        throw new Error('请选择 10 MB 以内的导出文本。')
      setResult(
        parseChatExport(
          await file.text(),
          /\.json$/i.test(file.name) ? 'json' : 'text'
        )
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }
  const visible =
    result?.messages.filter(
      x =>
        !query ||
        `${x.sender} ${x.content}`.toLowerCase().includes(query.toLowerCase())
    ) || []
  return (
    <section className={s.card} aria-labelledby='chat-tool-title'>
      <p className={s.eyebrow}>01 / KEEP THE CONVERSATION</p>
      <h2 id='chat-tool-title'>把聊天，整理成可检索的文字。</h2>
      <p>
        选择你自己持有的 TXT 或 JSON
        导出。文件只在当前浏览器读取，不上传，不登录微信，也不读取设备上的聊天数据库。
      </p>
      <details>
        <summary>支持什么格式？</summary>
        <p>
          TXT：日期时间与发送者独占一行，如「2026-10-31 10:00:00
          释哲」，下方是正文。JSON：消息数组或包含 messages 数组，每条使用
          time、sender、content，可带 attachments
          字符串数组。其他格式会保留为未识别原文，便于核对。
        </p>
        <p>
          附件只输出已有索引，不恢复未包含在导出文件中的图片、语音或已删除消息。请对照原文件检查条数与完整性。
        </p>
      </details>
      <label className={s.field}>
        选择导出文件
        <input
          type='file'
          accept='.txt,.json,text/plain,application/json'
          onChange={choose}
          disabled={busy}
        />
      </label>
      {busy && <p role='status'>正在本地读取…</p>}
      {error && (
        <p role='alert' className={s.error}>
          {error}
        </p>
      )}
      {result && (
        <>
          <p role='status' className={s.notice}>
            已整理 {result.count} 条记录 · {result.participants.length} 个发送者
            · {result.attachmentCount} 条附件索引
          </p>
          <div className={s.actions}>
            <button
              onClick={() =>
                downloadLocal(
                  result.text,
                  'ourbeings-chat.txt',
                  'text/plain;charset=utf-8'
                )
              }
            >
              下载全文 TXT
            </button>
            <button
              className={s.quiet}
              onClick={() =>
                downloadLocal(
                  JSON.stringify(result.messages, null, 2),
                  'ourbeings-chat-index.json'
                )
              }
            >
              下载结构化索引
            </button>
          </div>
          <label className={s.field}>
            在本地结果中查找
            <input
              type='search'
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder='发送者、关键词…'
            />
          </label>
          <p className={s.muted}>
            匹配 {visible.length} 条；先展示前 30 条，完整结果保留在导出中。
          </p>
          <div className={s.toolResults}>
            {visible.slice(0, 30).map(x => (
              <article key={x.index}>
                <small>
                  {x.time} · {x.sender}
                </small>
                <p>{x.content}</p>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

function VideoTool() {
  const video = useRef(null),
    objectUrl = useRef(null)
  const [metadata, setMetadata] = useState(null)
  const [range, setRange] = useState({ start: '0', end: '', step: '10' })
  const [busy, setBusy] = useState(false),
    [progress, setProgress] = useState(''),
    [error, setError] = useState(''),
    [frames, setFrames] = useState([])
  useEffect(
    () => () => {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current)
    },
    []
  )
  const clearFrames = () =>
    setFrames(prev => {
      for (const f of prev) URL.revokeObjectURL(f.url)
      return []
    })
  useEffect(
    () => () => {
      for (const f of frames) URL.revokeObjectURL(f.url)
    },
    [frames]
  )
  const choose = e => {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setMetadata(null)
    clearFrames()
    if (file.size > 800 * 1024 * 1024) {
      setError('本地试用先支持 800 MB 以内文件。请选择较短片段。')
      return
    }
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current)
    objectUrl.current = URL.createObjectURL(file)
    video.current.src = objectUrl.current
    video.current.load()
  }
  const extract = async () => {
    setError('')
    setBusy(true)
    clearFrames()
    const made = []
    try {
      const times = frameTimes({ ...range, duration: metadata.duration })
      const canvas = document.createElement('canvas')
      canvas.width = metadata.width
      canvas.height = metadata.height
      const context = canvas.getContext('2d')
      if (!context) throw new Error('当前浏览器无法建立截图画布。')
      const hashes = new Set()
      for (let i = 0; i < times.length; i += 1) {
        const time = times[i]
        setProgress(`正在提取 ${i + 1} / ${times.length}`)
        await new Promise((resolve, reject) => {
          const el = video.current
          if (Math.abs(el.currentTime - time) < 0.001 && el.readyState >= 2) {
            resolve()
            return
          }
          const cleanup = () => {
            clearTimeout(timer)
            el.removeEventListener('seeked', ready)
            el.removeEventListener('error', failed)
          }
          const ready = () => {
              cleanup()
              resolve()
            },
            failed = () => {
              cleanup()
              reject(
                new Error('该时间点无法解码，请换一个浏览器支持的视频格式。')
              )
            }
          const timer = setTimeout(() => {
            cleanup()
            reject(new Error('定位视频超时，请缩短片段或更换格式。'))
          }, 12000)
          el.addEventListener('seeked', ready, { once: true })
          el.addEventListener('error', failed, { once: true })
          el.currentTime = time
        })
        context.drawImage(video.current, 0, 0, canvas.width, canvas.height)
        const blob = await new Promise(resolve =>
          canvas.toBlob(resolve, 'image/png')
        )
        if (!blob) throw new Error('这个视频帧暂时无法导出。')
        const bytes = new Uint8Array(await blob.arrayBuffer()),
          hash = crc32(bytes)
        if (hashes.has(hash)) continue
        hashes.add(hash)
        made.push({
          time,
          blob,
          bytes,
          name: `frame-${time.toFixed(3).replace('.', '-')}.png`,
          url: URL.createObjectURL(blob)
        })
      }
      setFrames(made)
      setProgress(
        `已提取 ${made.length} 张原分辨率 PNG，过滤完全重复的导出帧。`
      )
    } catch (err) {
      for (const f of made) URL.revokeObjectURL(f.url)
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <section className={s.card} aria-labelledby='video-tool-title'>
      <p className={s.eyebrow}>02 / A FRAME TO REMEMBER</p>
      <h2 id='video-tool-title'>为值得停留的一刻，留一帧。</h2>
      <p>
        选择本地视频，按时间点提取原分辨率 PNG。处理留在浏览器；每次最多 12
        张，完整视频不会上传。
      </p>
      <label className={s.field}>
        选择视频
        <input
          type='file'
          accept='video/mp4,video/webm,video/ogg,video/quicktime'
          disabled={busy}
          onChange={choose}
        />
      </label>
      <video
        ref={video}
        controls
        preload='metadata'
        className={s.video}
        onLoadedMetadata={() => {
          const v = video.current
          if (
            !Number.isFinite(v.duration) ||
            !v.videoWidth ||
            v.videoWidth * v.videoHeight > 34000000
          ) {
            setError('当前视频尺寸或时长不适合浏览器处理。')
            return
          }
          setMetadata({
            duration: v.duration,
            width: v.videoWidth,
            height: v.videoHeight
          })
          setRange(x => ({
            ...x,
            end: String(Math.min(v.duration, 110).toFixed(2))
          }))
        }}
        onError={() =>
          setError(
            '当前浏览器不支持这个视频编码。可先转换为 MP4（H.264）或 WebM 后再试。'
          )
        }
      />
      {metadata && (
        <>
          <p className={s.muted}>
            {metadata.width} × {metadata.height} ·{' '}
            {metadata.duration.toFixed(1)} 秒
          </p>
          <div className={s.formGrid}>
            {[
              ['start', '开始秒数'],
              ['end', '结束秒数'],
              ['step', '间隔秒数']
            ].map(([key, label]) => (
              <label className={s.field} key={key}>
                {label}
                <input
                  type='number'
                  min='0'
                  step='0.1'
                  value={range[key]}
                  onChange={e =>
                    setRange(x => ({ ...x, [key]: e.target.value }))
                  }
                  disabled={busy}
                />
              </label>
            ))}
          </div>
          <button onClick={extract} disabled={busy}>
            {busy ? '正在本地提取…' : '提取截图'}
          </button>
        </>
      )}
      {error && (
        <p role='alert' className={s.error}>
          {error}
        </p>
      )}
      {progress && <p role='status'>{progress}</p>}
      {frames.length > 0 && (
        <>
          <div className={s.actions}>
            <button
              onClick={() =>
                downloadLocal(
                  zipFiles(frames),
                  'ourbeings-frames.zip',
                  'application/zip'
                )
              }
            >
              下载全部 ZIP
            </button>
          </div>
          <div className={s.frameGrid}>
            {frames.map(f => (
              <a key={f.name} href={f.url} download={f.name}>
                <img src={f.url} alt={`视频 ${f.time.toFixed(3)} 秒截图`} />
                <span>{f.time.toFixed(3)} 秒 · PNG ↓</span>
              </a>
            ))}
          </div>
        </>
      )}
      <p className={s.muted}>
        清晰度取决于原视频和浏览器解码，不做放大修复；完全相同的 PNG
        会去重。此工具不读取受保护流媒体，也不绕过播放限制。
      </p>
    </section>
  )
}

export default function CommunityTools() {
  return (
    <div className={s.stack}>
      <ChatTool />
      <VideoTool />
    </div>
  )
}
