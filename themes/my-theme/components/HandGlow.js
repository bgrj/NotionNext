/* eslint-disable react/no-unknown-property */
// Match the bundled down-hand cover's natural 2048 × 989 coordinate system.
// More motes (42), higher visibility warm gold (#C9A66B and #d4af37), soft dust orbs.
// Prominent but calm, slow floating dust in light. Higher opacity for normal presence.

const MOTES = Array.from({ length: 42 }, (_, i) => {
  const angle = i * 2.399963 + (i % 5) * 0.35
  const spread = Math.sqrt((i + 1) / 42) * 1.08
  return {
    x: 1020 + Math.cos(angle) * spread * 195,
    y: 632 + Math.sin(angle) * spread * 165,
    radius: 0.9 + (i % 5) * 0.35,
    duration: 8.2 + (i % 6) * 1.05,
    delay: -i * 1.48
  }
})

// Larger soft dust orbs — floating in light, low but visible opacity
const DUST = Array.from({ length: 14 }, (_, i) => {
  const angle = i * 2.8 + 0.9
  const spread = 0.58 + (i % 5) * 0.12
  return {
    x: 1040 + Math.cos(angle) * spread * 215,
    y: 618 + Math.sin(angle) * spread * 178,
    radius: 6.5 + (i % 4) * 2.8,
    duration: 15 + (i % 4) * 2.1,
    delay: -i * 2.3
  }
})

export default function HandGlow() {
  return (
    <>
      <svg
        className="ob-hand-glow"
        viewBox="0 0 2048 989"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false">
        {/* soft dust orbs (behind) */}
        {DUST.map((d, index) => (
          <g
            key={`dust-${index}`}
            className="ob-hand-dust"
            style={{
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`
            }}>
            <circle
              cx={d.x}
              cy={d.y}
              r={d.radius}
              fill="#c9a66b"
              opacity="0.065"
            />
          </g>
        ))}

        {MOTES.map((mote, index) => (
          <g
            key={index}
            className="ob-hand-mote"
            style={{
              animationDuration: `${mote.duration}s`,
              animationDelay: `${mote.delay}s`
            }}>
            {/* soft halo for presence */}
            <circle
              cx={mote.x}
              cy={mote.y}
              r={mote.radius * 5.8}
              fill="#c9a66b"
              opacity="0.12"
            />
            {/* main warm particle */}
            <circle
              cx={mote.x}
              cy={mote.y}
              r={mote.radius * 1.9}
              fill={index % 4 === 0 ? "#d4af37" : "#c9a66b"}
              opacity="0.88"
            />
            {/* subtle bright core */}
            {index % 5 === 0 && (
              <circle
                cx={mote.x}
                cy={mote.y}
                r={mote.radius * 0.6}
                fill="#f5e8c7"
                opacity="0.6"
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
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }
        .ob-hand-mote {
          opacity: 0;
          animation: ob-hand-drift 10.5s ease-in-out infinite;
        }
        .ob-hand-dust {
          opacity: 0;
          animation: ob-hand-drift 15.5s ease-in-out infinite;
        }
        @keyframes ob-hand-drift {
          0%, 100% {
            opacity: 0;
            transform: translate(0, 8px);
          }
          18% {
            opacity: 0.78;
          }
          52% {
            opacity: 0.42;
          }
          78% {
            opacity: 0;
            transform: translate(7px, -16px);
          }
        }
        @media (max-width: 640px) {
          .ob-hand-mote:nth-child(n + 28) {
            display: none;
          }
          .ob-hand-dust:nth-child(n + 8) {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ob-hand-glow {
            display: none;
          }
          .ob-hand-mote, .ob-hand-dust {
            animation: none;
          }
        }
      `}</style>
    </>
  )
}
