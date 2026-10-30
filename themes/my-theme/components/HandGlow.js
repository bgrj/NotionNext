/* eslint-disable react/no-unknown-property */
// Match the bundled down-hand cover's natural 2048 × 989 coordinate system.
// Particles start at the hand and drift outward like dust in the light.

const HAND = { x: 1035, y: 620 }
const GOLDEN = 2.399963229728653

const motes = (count, distMin, distMax, seed, radiusBase) =>
  Array.from({ length: count }, (_, i) => {
    const angle = (i + seed) * GOLDEN
    const t = (i + 1) / count
    const dist = distMin + Math.pow(t, 0.58) * (distMax - distMin)
    const x = HAND.x + Math.cos(angle) * dist
    const y = HAND.y + Math.sin(angle) * dist * 0.88
    return {
      x,
      y,
      radius: radiusBase + (i % 6) * (radiusBase * 0.38),
      duration: 9.2 + (i % 8) * 1.05,
      delay: -(i * 0.71 + seed * 2.4),
      dx: Math.cos(angle) * (16 + t * 52),
      dy: Math.sin(angle) * (12 + t * 38) + 14,
      far: dist > 220
    }
  })

const CORE = motes(28, 14, 200, 0.2, 2.2)
const RAYS = motes(36, 90, 420, 1.35, 1.6)
const DUST = motes(16, 70, 460, 2.7, 6.4)

export default function HandGlow() {
  return (
    <>
      <svg
        className='ob-hand-glow'
        viewBox='0 0 2048 989'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden='true'
        focusable='false'>
        {DUST.map((d, index) => (
          <g
            key={`dust-${index}`}
            className={`ob-hand-dust${d.far ? ' ob-hand-far' : ''}`}
            style={{
              animationDuration: `${d.duration + 4}s`,
              animationDelay: `${d.delay}s`,
              '--dx': `${d.dx}px`,
              '--dy': `${d.dy}px`
            }}>
            <circle cx={d.x} cy={d.y} r={d.radius} fill='#c9a66b' opacity='0.16' />
          </g>
        ))}
        {[...CORE, ...RAYS].map((mote, index) => (
          <g
            key={`mote-${index}`}
            className={`ob-hand-mote${mote.far ? ' ob-hand-far' : ''}`}
            style={{
              animationDuration: `${mote.duration}s`,
              animationDelay: `${mote.delay}s`,
              '--dx': `${mote.dx}px`,
              '--dy': `${mote.dy}px`
            }}>
            <circle
              cx={mote.x}
              cy={mote.y}
              r={mote.radius * 5.2}
              fill='#c9a66b'
              opacity='0.11'
            />
            <circle
              cx={mote.x}
              cy={mote.y}
              r={mote.radius * 1.85}
              fill={index % 4 === 0 ? '#d4af37' : '#c9a66b'}
              opacity='0.86'
            />
            {index % 5 === 0 && (
              <circle
                cx={mote.x}
                cy={mote.y}
                r={mote.radius * 0.55}
                fill='#f5e8c7'
                opacity='0.62'
              />
            )}
          </g>
        ))}
      </svg>
      <style jsx>{`
        .ob-hand-glow {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 18;
          pointer-events: none;
          overflow: hidden;
        }
        .ob-hand-mote,
        .ob-hand-dust {
          opacity: 0;
          animation-name: ob-hand-radiate;
          animation-timing-function: ease-out;
          animation-iteration-count: infinite;
        }
        @keyframes ob-hand-radiate {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.65);
          }
          14% {
            opacity: 0.95;
          }
          58% {
            opacity: 0.42;
          }
          100% {
            opacity: 0;
            transform: translate(var(--dx), var(--dy)) scale(1.12);
          }
        }
        @media (max-width: 640px) {
          .ob-hand-far:nth-child(2n) {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ob-hand-glow {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
