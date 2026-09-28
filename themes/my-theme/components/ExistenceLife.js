import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useEffect, useMemo, useRef, useState } from 'react'
import CONFIG from '../config'
import {
  EXISTENCE_DEFAULTS,
  addYearsIso,
  daysBetween,
  formatDotDate,
  isoDay,
  mottoLines,
  ordinalInYear,
  parseIso,
  postMapFrom,
  shanghaiToday,
  shiftIso,
  slimExistencePosts
} from '../existence'

const YEAR_START = Number(EXISTENCE_DEFAULTS.birth.slice(0, 4))
const COLS = 366
const MONTH_TICKS = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335]
const MONTH_LABELS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

const STATE = {
  MENGMEI: 'mengmei',
  AWAKE: 'awake',
  WRITTEN: 'written',
  FUTURE: 'future'
}

const colorsOf = dark =>
  dark
    ? {
        ink: '#F6F1E8',
        muted: '#D2C4B0',
        line: 'rgba(246, 241, 232, 0.22)',
        mengmei: 'rgba(210, 196, 176, 0.52)',
        awake: 'rgba(226, 196, 138, 0.88)',
        written: '#F0D9A0',
        future: 'rgba(246, 241, 232, 0.16)',
        gold: '#E2C48A',
        goldDeep: '#F0D9A0',
        card: '#1a1714',
        labelShadow: 'rgba(0, 0, 0, 0.65)'
      }
    : {
        ink: '#2C241C',
        muted: '#5A4D40',
        line: 'rgba(44, 36, 28, 0.18)',
        mengmei: 'rgba(56, 48, 42, 0.42)',
        awake: 'rgba(160, 112, 40, 0.78)',
        written: '#8A5A1F',
        future: 'rgba(44, 36, 28, 0.12)',
        gold: '#C9A66B',
        goldDeep: '#8A5A1F',
        card: '#fff',
        labelShadow: 'rgba(255, 255, 255, 0.7)'
      }

const isDarkNow = () =>
  typeof document !== 'undefined' &&
  document.documentElement.classList.contains('dark')

const dayState = (iso, { birth, awakening, today, end, postMap }) => {
  if (iso < birth || iso >= end) return null
  if (postMap[iso]) return STATE.WRITTEN
  if (iso > today) return STATE.FUTURE
  if (iso < awakening) return STATE.MENGMEI
  return STATE.AWAKE
}

const buildCells = meta => {
  const { birth, end } = meta
  const start = parseIso(birth)
  const stop = parseIso(shiftIso(end, -1))
  const cells = []
  let y = start.y
  let m = start.m
  let d = start.d
  const pad = n => String(n).padStart(2, '0')
  while (y < stop.y || (y === stop.y && (m < stop.m || (m === stop.m && d <= stop.d)))) {
    const iso = `${y}-${pad(m)}-${pad(d)}`
    const state = dayState(iso, meta)
    if (state) {
      cells.push({
        iso,
        year: y,
        col: ordinalInYear(y, m, d) - 1,
        state
      })
    }
    d += 1
    const dim = [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (d > dim[m - 1]) {
      d = 1
      m += 1
      if (m > 12) {
        m = 1
        y += 1
      }
    }
  }
  return cells
}

const isLeapYear = year =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

const nf = n => n.toLocaleString('zh-CN')

const ExistenceLife = props => {
  const birth = isoDay(
    siteConfig('EXISTENCE_BIRTH', EXISTENCE_DEFAULTS.birth, CONFIG)
  ) || EXISTENCE_DEFAULTS.birth
  const years = Number(
    siteConfig('EXISTENCE_YEARS', EXISTENCE_DEFAULTS.years, CONFIG)
  ) || EXISTENCE_DEFAULTS.years
  const awakening =
    isoDay(
      siteConfig('EXISTENCE_AWAKENING', EXISTENCE_DEFAULTS.awakening, CONFIG)
    ) || EXISTENCE_DEFAULTS.awakening
  const motto = siteConfig(
    'EXISTENCE_MOTTO',
    EXISTENCE_DEFAULTS.motto,
    CONFIG
  )
  const stamp = siteConfig(
    'EXISTENCE_STAMP',
    EXISTENCE_DEFAULTS.stamp,
    CONFIG
  )
  const end = addYearsIso(birth, years)
  const today = shanghaiToday()
  const written = useMemo(
    () => slimExistencePosts(props.existencePosts || props.posts),
    [props.existencePosts, props.posts]
  )
  const postMap = useMemo(() => postMapFrom(written), [written])
  const meta = useMemo(
    () => ({ birth, awakening, today, end, postMap }),
    [birth, awakening, today, end, postMap]
  )
  const cells = useMemo(() => buildCells(meta), [meta])
  const cellIndex = useMemo(() => {
    const map = new Map()
    cells.forEach(cell => map.set(`${cell.year}-${cell.col}`, cell))
    return map
  }, [cells])
  const yearCount = Number(end.slice(0, 4)) - YEAR_START + 1
  const mengmeiEnd = shiftIso(awakening, -1)
  const lastLived = today < end ? (today < birth ? birth : today) : shiftIso(end, -1)
  const mengmeiDays = daysBetween(birth, mengmeiEnd)
  const awakeDays = today >= awakening ? daysBetween(awakening, lastLived) : 0
  const futureDays = daysBetween(shiftIso(today, 1), shiftIso(end, -1))
  const totalDays = daysBetween(birth, shiftIso(end, -1))
  const writtenDays = written.length
  const lines = mottoLines(motto)

  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const [dark, setDark] = useState(false)
  const [tip, setTip] = useState(null)
  const [links, setLinks] = useState([])
  const layoutRef = useRef(null)

  useEffect(() => {
    setDark(isDarkNow())
    const root = document.documentElement
    const obs = new MutationObserver(() => setDark(isDarkNow()))
    obs.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return undefined

    const paint = () => {
      const width = Math.max(wrap.clientWidth, 280)
      const labelW = width < 640 ? 34 : 44
      const topH = 18
      const rowH = width < 640 ? 6.2 : 8.2
      const bottomH = 8
      const height = topH + yearCount * rowH + bottomH
      const pal = colorsOf(dark)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const ctx = canvas.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const innerW = width - labelW - 4
      const colW = innerW / COLS
      const layout = { labelW, topH, rowH, colW, width, height }
      layoutRef.current = layout

      ctx.font = '10px ui-sans-serif, system-ui, sans-serif'
      ctx.fillStyle = pal.muted
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      MONTH_TICKS.forEach((ord, i) => {
        const x = labelW + (ord - 1) * colW
        ctx.fillStyle = pal.line
        ctx.fillRect(x, topH - 3, 1, yearCount * rowH + 3)
        ctx.fillStyle = pal.muted
        ctx.fillText(MONTH_LABELS[i], x + 1, 2)
      })

      const dot = Math.max(1.05, Math.min(colW, rowH) * 0.72)
      const writtenR = Math.max(2.2, Math.min(3.6, Math.min(colW, rowH) * 1.15))

      cells.forEach(cell => {
        const x = labelW + cell.col * colW + colW / 2
        const y = topH + (cell.year - YEAR_START) * rowH + rowH / 2
        if (cell.state === STATE.WRITTEN) {
          ctx.fillStyle = pal.written
          ctx.beginPath()
          ctx.arc(x, y, writtenR, 0, Math.PI * 2)
          ctx.fill()
          return
        }
        ctx.fillStyle =
          cell.state === STATE.MENGMEI
            ? pal.mengmei
            : cell.state === STATE.AWAKE
              ? pal.awake
              : pal.future
        const r =
          cell.state === STATE.AWAKE ? Math.max(dot, 1.35) : dot / 2
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      const lastYear = YEAR_START + yearCount - 1
      for (let year = YEAR_START; year <= lastYear; year += 1) {
        const special = year === YEAR_START || year === 2025 || year === lastYear
        const every = year % 5 === 0
        if (year === lastYear - 1 && lastYear % 5 === 1) continue
        if (!special && !every) continue
        const y = topH + (year - YEAR_START) * rowH + rowH / 2
        ctx.font = `${special ? 10 : 9}px ui-sans-serif, system-ui, sans-serif`
        ctx.lineWidth = 3
        ctx.strokeStyle = pal.labelShadow
        ctx.strokeText(String(year), labelW - 6, y)
        ctx.fillStyle = year === 2025 ? pal.goldDeep : pal.ink
        ctx.fillText(String(year), labelW - 6, y)
      }

      const nextLinks = written.map(post => {
        const { y, m, d } = parseIso(post.date)
        const x = labelW + (ordinalInYear(y, m, d) - 1) * colW + colW / 2
        const cy = topH + (y - YEAR_START) * rowH + rowH / 2
        const hit = Math.max(10, writtenR * 3)
        return {
          ...post,
          left: x - hit / 2,
          top: cy - hit / 2,
          size: hit
        }
      })
      setLinks(nextLinks)
    }

    paint()
    const ro = new ResizeObserver(paint)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [cells, dark, yearCount, written])

  const onMove = event => {
    const layout = layoutRef.current
    const canvas = canvasRef.current
    if (!layout || !canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const col = Math.floor((x - layout.labelW) / layout.colW)
    const row = Math.floor((y - layout.topH) / layout.rowH)
    if (col < 0 || col >= COLS || row < 0 || row >= yearCount) {
      setTip(null)
      return
    }
    const year = YEAR_START + row
    const cell = cellIndex.get(`${year}-${col}`)
    if (!cell) {
      setTip(null)
      return
    }
    const post = postMap[cell.iso]
    const phase =
      cell.state === STATE.MENGMEI
        ? '蒙昧'
        : cell.state === STATE.AWAKE
          ? '不断摆脱蒙昧'
          : cell.state === STATE.WRITTEN
            ? post?.title || '已留下'
            : '尚未到来'
    setTip({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      text: `${formatDotDate(cell.iso)}  ${phase}`
    })
  }

  return (
    <div id='notion-article' className='ob-ex'>
      <style>{`
        .ob-ex {
          --ob-gold: #C9A66B;
          --ob-gold-deep: #8A5A1F;
          --ob-ink: #2C241C;
          --ob-muted: #5A4D40;
          --ob-line: rgba(44, 36, 28, 0.16);
          --ob-card: rgba(255, 252, 247, 0.86);
          --ob-panel: rgba(255, 252, 247, 0.78);
          color: var(--ob-ink);
          width: 100%;
          max-width: 100%;
          padding: 0.2rem 0 2.5rem;
        }
        .dark .ob-ex {
          --ob-gold: #E2C48A;
          --ob-gold-deep: #F0D9A0;
          --ob-ink: #F6F1E8;
          --ob-muted: #D2C4B0;
          --ob-line: rgba(246, 241, 232, 0.18);
          --ob-card: rgba(26, 23, 20, 0.82);
          --ob-panel: rgba(22, 19, 16, 0.78);
        }
        .ob-ex-title {
          margin: 0 0 8px;
          font-size: 1.7rem;
          letter-spacing: 0.16em;
          font-weight: 700;
          line-height: 1.3;
        }
        .ob-ex-motto {
          margin: 0.65rem 0 0.2rem;
          padding: 0.85rem 0 0.85rem 1rem;
          border-left: 3px solid var(--ob-gold);
          font-size: 1.02rem;
          font-weight: 700;
          line-height: 1.7;
          letter-spacing: 0.03em;
          max-width: 36em;
        }
        .ob-ex-motto span { display: block; }
        .ob-ex-stamp {
          margin: 0.55rem 0 1.4rem;
          font-size: 12px;
          letter-spacing: 0.06em;
          color: var(--ob-muted);
        }
        .ob-ex-phases {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin: 0 0 1rem;
        }
        .ob-ex-phase {
          padding: 0.85rem 1rem 0.95rem;
          border: 1px solid var(--ob-line);
          border-radius: 12px;
          background: var(--ob-card);
          backdrop-filter: blur(10px);
        }
        .ob-ex-phase.is-awake {
          border-left: 3px solid var(--ob-gold-deep);
        }
        .ob-ex-phase.is-mengmei {
          border-left: 3px solid color-mix(in srgb, var(--ob-ink) 35%, transparent);
        }
        .ob-ex-phase-name {
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.18em;
        }
        .ob-ex-phase-range {
          margin-top: 6px;
          font-size: 13px;
          color: var(--ob-muted);
          letter-spacing: 0.04em;
        }
        .ob-ex-phase-count {
          margin-top: 4px;
          font-size: 13px;
          letter-spacing: 0.04em;
          font-variant-numeric: tabular-nums;
        }
        .ob-ex-bar {
          display: flex;
          height: 10px;
          margin: 0 0 1.35rem;
          overflow: hidden;
          border-radius: 999px;
          background: color-mix(in srgb, var(--ob-ink) 6%, transparent);
        }
        .ob-ex-bar span { display: block; height: 100%; }
        .ob-ex-bar .is-mengmei { background: color-mix(in srgb, var(--ob-ink) 28%, transparent); }
        .ob-ex-bar .is-awake { background: var(--ob-gold); }
        .ob-ex-bar .is-future { background: transparent; }
        .ob-ex-chart {
          margin-top: 0.15rem;
          padding: 0.95rem 0.9rem 1.05rem;
          border: 1px solid var(--ob-line);
          border-radius: 14px;
          background: var(--ob-panel);
          backdrop-filter: blur(12px);
        }
        .ob-ex-chart-head {
          margin: 0 0 0.7rem;
          padding-bottom: 0.7rem;
          border-bottom: 1px solid var(--ob-line);
        }
        .ob-ex-note {
          margin: 0;
          font-size: 12px;
          line-height: 1.75;
          color: var(--ob-muted);
          letter-spacing: 0.04em;
          max-width: 46em;
        }
        .ob-ex-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 18px;
          margin: 0.7rem 0 0.85rem;
          font-size: 12px;
          color: var(--ob-muted);
          letter-spacing: 0.04em;
        }
        .ob-ex-legend b {
          display: inline-block;
          width: 7px;
          height: 7px;
          margin-right: 6px;
          border-radius: 50%;
          vertical-align: 1px;
        }
        .ob-ex-legend .dot-m { background: color-mix(in srgb, var(--ob-ink) 28%, transparent); }
        .ob-ex-legend .dot-a { background: color-mix(in srgb, var(--ob-gold) 70%, transparent); }
        .ob-ex-legend .dot-w { background: var(--ob-gold); width: 8px; height: 8px; }
        .ob-ex-legend .dot-f {
          background: transparent;
          box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ob-ink) 18%, transparent);
        }
        .ob-ex-field {
          position: relative;
          width: 100%;
          min-height: 36rem;
        }
        .ob-ex-field canvas {
          display: block;
          width: 100%;
          cursor: crosshair;
        }
        .ob-ex-hit {
          position: absolute;
          display: block;
          border-radius: 50%;
          z-index: 2;
        }
        .ob-ex-hit:focus-visible {
          outline: 2px solid var(--ob-gold-deep);
          outline-offset: 1px;
        }
        .ob-ex-tip {
          position: absolute;
          z-index: 3;
          pointer-events: none;
          transform: translate(-10px, -140%);
          padding: 6px 8px;
          border-radius: 8px;
          background: var(--ob-card);
          backdrop-filter: blur(10px);
          color: var(--ob-ink);
          border: 1px solid var(--ob-line);
          font-size: 12px;
          letter-spacing: 0.03em;
          white-space: nowrap;
          max-width: min(80vw, 22rem);
          overflow: hidden;
          text-overflow: ellipsis;
          box-shadow: 0 8px 24px rgba(28, 22, 16, 0.12);
        }
        .ob-ex .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        @media (min-width: 640px) {
          .ob-ex-title { font-size: 2rem; }
          .ob-ex-motto { font-size: 1.12rem; }
          .ob-ex-phases { grid-template-columns: 1fr 1fr; gap: 16px; }
        }
        @media (min-width: 1024px) {
          .ob-ex { padding-top: 0.35rem; }
        }
      `}</style>

      <header>
        <h1 className='ob-ex-title'>我的存在</h1>
        <blockquote className='ob-ex-motto'>
          {lines.map(line => (
            <span key={line}>{line}</span>
          ))}
        </blockquote>
        {stamp ? <div className='ob-ex-stamp'>{stamp}</div> : null}
      </header>

      <div className='ob-ex-phases'>
        <div className='ob-ex-phase is-mengmei'>
          <div className='ob-ex-phase-name'>蒙昧</div>
          <div className='ob-ex-phase-range'>
            {formatDotDate(birth)} — {formatDotDate(mengmeiEnd)}
          </div>
          <div className='ob-ex-phase-count'>{nf(mengmeiDays)} 日</div>
        </div>
        <div className='ob-ex-phase is-awake'>
          <div className='ob-ex-phase-name'>不断摆脱蒙昧</div>
          <div className='ob-ex-phase-range'>{formatDotDate(awakening)} —</div>
          <div className='ob-ex-phase-count'>
            {nf(awakeDays)} 日已过 · {nf(writtenDays)} 日留下
          </div>
        </div>
      </div>

      <div
        className='ob-ex-bar'
        role='img'
        aria-label={`按 ${years} 岁计共 ${nf(totalDays)} 日`}>
        <span className='is-mengmei' style={{ flexGrow: mengmeiDays }} />
        <span className='is-awake' style={{ flexGrow: Math.max(awakeDays, 1) }} />
        <span className='is-future' style={{ flexGrow: Math.max(futureDays, 0) }} />
      </div>

      <section className='ob-ex-chart' aria-label='生命点图'>
      <div className='ob-ex-chart-head'>
        <p className='ob-ex-note'>
          按 {years} 岁计，从 {formatDotDate(birth)} 到 {formatDotDate(shiftIso(end, -1))}，共 {nf(totalDays)} 日。每一个点是一天。亮着的日子，可以进去。
        </p>
      </div>
      <div className='ob-ex-legend' aria-hidden='true'>
        <span>
          <b className='dot-m' />
          蒙昧
        </span>
        <span>
          <b className='dot-a' />
          不断摆脱蒙昧
        </span>
        <span>
          <b className='dot-w' />
          已留下
        </span>
        <span>
          <b className='dot-f' />
          尚未到来
        </span>
      </div>

      <div className='ob-ex-field' ref={wrapRef}>
        <canvas
          ref={canvasRef}
          onMouseMove={onMove}
          onMouseLeave={() => setTip(null)}
          aria-hidden='true'
        />
        {links.map(link => (
          <SmartLink
            key={link.id || link.date}
            className='ob-ex-hit'
            href={link.href}
            title={link.title}
            style={{
              left: link.left,
              top: link.top,
              width: link.size,
              height: link.size
            }}
          />
        ))}
        {tip ? (
          <div className='ob-ex-tip' style={{ left: tip.x, top: tip.y }}>
            {tip.text}
          </div>
        ) : null}
      </div>
      </section>

      <nav className='sr-only' aria-label='已留下的日子'>
        <ul>
          {written.map(post => (
            <li key={post.id || post.date}>
              <a href={post.href}>{post.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default ExistenceLife
