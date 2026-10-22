/* eslint-disable react/no-unknown-property */
// Match the bundled down-hand cover's natural 2048 × 989 coordinate system.
// Deterministic positions avoid SSR hydration differences. No canvas, timers,
// pointer tracking, external assets or animation dependencies are required.
const MOTES = Array.from({ length: 26 }, (_, i) => {
  const angle = i * 2.399963
  const spread = Math.sqrt((i + 1) / 26)
  return {
    x: 1020 + Math.cos(angle) * spread * 185,
    y: 635 + Math.sin(angle) * spread * 155,
    radius: 0.7 + (i % 4) * 0.28,
    duration: 9 + (i % 7) * 1.3,
    delay: -i * 1.7
  }
})

export default function HandGlow() {
  return (
    <>
      <svg
        className='ob-hand-glow'
        viewBox='0 0 2048 989'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden='true'
        focusable='false'>
        {MOTES.map((mote, index) => (
          <g
            key={index}
            className='ob-hand-mote'
            style={{
              animationDuration: `${mote.duration}s`,
              animationDelay: `${mote.delay}s`
            }}>
            <circle
              cx={mote.x}
              cy={mote.y}
              r={mote.radius * 3.5}
              fill='#d8b578'
              opacity='0.08'
            />
            <circle
              cx={mote.x}
              cy={mote.y}
              r={mote.radius}
              fill={index % 3 === 0 ? '#e5c590' : '#fff0d0'}
              opacity='0.7'
            />
          </g>
        ))}
      </svg>
      <style jsx>{`
        .ob-hand-glow {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }
        .ob-hand-mote {
          opacity: 0;
          animation: ob-hand-drift 12s ease-in-out infinite;
        }
        @keyframes ob-hand-drift {
          0%,
          100% {
            opacity: 0;
            transform: translate(0, 12px);
          }
          30% {
            opacity: 0.5;
          }
          65% {
            opacity: 0.32;
          }
          90% {
            opacity: 0;
            transform: translate(10px, -22px);
          }
        }
        @media (max-width: 640px) {
          .ob-hand-mote:nth-child(n + 17) {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ob-hand-glow {
            display: none;
          }
          .ob-hand-mote {
            animation: none;
          }
        }
      `}</style>
    </>
  )
}
