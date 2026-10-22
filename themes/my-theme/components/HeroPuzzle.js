/* eslint-disable react/no-unknown-property */
import { useRouter } from 'next/router'

const PIECES = [

  {
    key: 'our',
    name: '我们的存在',
    href: '/category/我们的存在',
    d: 'M8.00 8.00L929.55 8.00L933.10 21.23L933.65 25.73L938.09 39.23L942.64 61.74L949.42 82.73L950.99 90.52L959.02 108.57L968.98 126.57L970.11 127.56L971.03 126.95L970.40 127.18L969.30 136.72L969.14 153.30L964.36 164.36L961.24 177.31L960.37 184.77L958.09 194.96L958.38 205.29L960.92 216.55L969.59 233.17L977.84 242.29L1000.74 262.33L1010.48 269.17L1023.86 280.66L1022.65 288.65L1022.51 299.16L1017.84 318.14L1014.88 325.08L1010.52 331.15L1007.99 339.30L1003.57 349.66L993.77 369.54L990.21 381.13L988.37 394.10L989.40 407.61L995.69 446.00L8.00 446.00Z',
    desk: [
      { ch: '我', x: 322.7, y: 165.1, size: 164 },
      { ch: '们', x: 508.0, y: 165.1, size: 164 },
      { ch: '的', x: 693.3, y: 165.1, size: 164 },
      { ch: '存', x: 415.3, y: 338.9, size: 164 },
      { ch: '在', x: 600.7, y: 338.9, size: 164 }
    ],
    mobi: [
      { ch: '我', x: 872, y: 174.4, size: 58 },
      { ch: '们', x: 872, y: 238.2, size: 58 },
      { ch: '的', x: 872, y: 302.0, size: 58 },
      { ch: '存', x: 872, y: 365.8, size: 58 },
      { ch: '在', x: 872, y: 429.6, size: 58 }
    ]
  },
  {
    key: 'self',
    name: '我的存在',
    href: '/category/我的存在',
    d: 'M2040.00 8.00L2040.00 446.00L1088.11 446.00L1085.08 443.81L1079.60 441.26L1078.29 439.79L1073.44 427.28L1074.28 422.40L1074.04 418.86L1077.26 405.70L1080.98 399.43L1082.84 393.34L1084.19 392.41L1089.34 391.82L1090.47 390.76L1088.20 382.53L1089.65 381.53L1094.36 381.10L1095.12 380.49L1095.50 376.39L1098.57 374.66L1095.41 370.45L1097.92 369.46L1103.19 369.21L1105.46 368.17L1104.96 366.44L1098.77 362.20L1097.50 360.50L1100.83 353.99L1101.75 348.42L1101.26 345.01L1103.08 338.12L1108.44 332.50L1110.58 322.46L1115.93 317.25L1116.23 314.20L1121.01 299.20L1121.21 290.60L1119.31 276.12L1118.32 273.22L1118.22 266.46L1121.93 259.08L1129.43 247.58L1132.12 241.85L1134.22 232.17L1128.03 212.10L1126.01 200.55L1126.97 193.35L1130.09 183.70L1130.03 171.02L1127.25 155.12L1127.31 143.72L1126.44 141.85L1126.88 137.71L1131.18 122.83L1131.36 123.45L1139.90 108.52L1147.85 90.15L1146.77 81.10L1144.76 75.20L1142.67 72.61L1142.19 70.72L1143.32 67.62L1154.04 49.64L1154.34 50.89L1154.53 48.10L1158.22 35.07L1158.74 28.23L1161.81 18.77L1162.77 8.89L1162.65 2.06L1161.52 0.94L1161.52 8.00Z',
    desk: [
      { ch: '我', x: 1442.9, y: 165.1, size: 164 },
      { ch: '的', x: 1633.1, y: 165.1, size: 164 },
      { ch: '存', x: 1442.9, y: 338.9, size: 164 },
      { ch: '在', x: 1633.1, y: 338.9, size: 164 }
    ],
    mobi: [
      { ch: '我', x: 1186, y: 187.4, size: 64 },
      { ch: '的', x: 1186, y: 258.5, size: 64 },
      { ch: '存', x: 1186, y: 329.5, size: 64 },
      { ch: '在', x: 1186, y: 400.6, size: 64 }
    ]
  },
  {
    key: 'dao',
    name: '道',
    href: '/category/道',
    d: 'M8.00 458.00L995.40 458.00L994.48 460.33L994.79 461.25L995.86 461.19L993.25 464.27L989.24 472.00L969.68 497.66L966.22 500.74L954.71 516.39L947.71 524.67L929.65 552.91L922.33 568.47L923.24 574.20L925.20 577.32L927.64 579.46L931.03 580.33L937.79 577.24L941.26 573.95L946.76 565.81L960.80 552.28L1004.73 515.24L1006.24 515.18L1008.22 517.11L1009.71 520.20L1010.37 520.03L1006.52 529.14L996.20 542.70L987.07 561.85L976.06 572.85L971.25 579.68L962.53 587.94L954.88 598.07L951.23 604.13L939.60 618.33L937.08 623.67L934.20 635.49L934.58 638.50L937.10 644.15L944.25 649.04L948.98 649.18L942.64 660.18L939.32 674.53L939.70 677.53L941.60 681.29L944.39 684.13L947.28 685.27L956.29 685.40L962.91 683.14L977.50 674.80L984.02 672.16L991.57 667.23L1010.85 648.31L1012.39 647.88L1014.91 650.19L1015.77 650.16L1011.34 656.75L1001.56 666.57L990.93 675.32L987.42 678.85L984.95 683.11L983.67 701.60L984.05 704.60L985.15 706.86L988.47 709.99L993.66 712.11L988.66 712.11L988.66 981.00L8.00 981.00Z',
    desk: [
      { ch: '道', x: 500, y: 728, size: 488 }
    ],
    mobi: [
      { ch: '道', x: 874, y: 722, size: 128 }
    ]
  },
  {
    key: 'shu',
    name: '术',
    href: '/category/术',
    d: 'M2040.00 981.00L998.66 981.00L998.66 712.11L993.66 712.11L995.88 712.11L1001.95 709.74L1026.84 693.25L1035.15 686.37L1048.72 672.87L1063.01 656.36L1072.03 642.85L1075.70 631.97L1077.70 617.27L1080.27 605.34L1081.52 593.25L1086.35 572.29L1086.81 567.05L1090.55 555.72L1093.10 543.78L1093.72 529.25L1095.47 517.47L1094.07 507.99L1095.26 506.55L1095.43 504.74L1093.13 492.72L1092.85 474.23L1093.47 468.99L1093.10 458.00L2040.00 458.00Z',
    desk: [
      { ch: '术', x: 1536, y: 728, size: 488 }
    ],
    mobi: [
      { ch: '术', x: 1186, y: 722, size: 118 }
    ]
  }
]

const HAND_OUTLINE = 'M928.29 0.74L928.47 3.98L933.10 21.23L933.65 25.73L938.09 39.23L942.64 61.74L949.42 82.73L950.99 90.52L959.02 108.57L968.98 126.57L970.11 127.56L971.03 126.95L970.40 127.18L969.30 136.72L969.14 153.30L964.36 164.36L961.24 177.31L960.37 184.77L958.09 194.96L958.38 205.29L960.92 216.55L969.59 233.17L977.84 242.29L1000.74 262.33L1010.48 269.17L1023.86 280.66L1022.65 288.65L1022.51 299.16L1017.84 318.14L1014.88 325.08L1010.52 331.15L1007.99 339.30L1003.57 349.66L993.77 369.54L990.21 381.13L988.37 394.10L989.40 407.61L997.00 453.94L994.48 460.33L994.79 461.25L995.86 461.19L993.25 464.27L989.24 472.00L969.68 497.66L966.22 500.74L954.71 516.39L947.71 524.67L929.65 552.91L922.33 568.47L923.24 574.20L925.20 577.32L927.64 579.46L931.03 580.33L937.79 577.24L941.26 573.95L946.76 565.81L960.80 552.28L1004.73 515.24L1006.24 515.18L1008.22 517.11L1009.71 520.20L1010.37 520.03L1006.52 529.14L996.20 542.70L987.07 561.85L976.06 572.85L971.25 579.68L962.53 587.94L954.88 598.07L951.23 604.13L939.60 618.33L937.08 623.67L934.20 635.49L934.58 638.50L937.10 644.15L944.25 649.04L948.98 649.18L942.64 660.18L939.32 674.53L939.70 677.53L941.60 681.29L944.39 684.13L947.28 685.27L956.29 685.40L962.91 683.14L977.50 674.80L984.02 672.16L991.57 667.23L1010.85 648.31L1012.39 647.88L1014.91 650.19L1015.77 650.16L1011.34 656.75L1001.56 666.57L990.93 675.32L987.42 678.85L984.95 683.11L983.67 701.60L984.05 704.60L985.15 706.86L988.47 709.99L993.66 712.11L995.88 712.11L1001.95 709.74L1026.84 693.25L1035.15 686.37L1048.72 672.87L1063.01 656.36L1072.03 642.85L1075.70 631.97L1077.70 617.27L1080.27 605.34L1081.52 593.25L1086.35 572.29L1086.81 567.05L1090.55 555.72L1093.10 543.78L1093.72 529.25L1095.47 517.47L1094.07 507.99L1095.26 506.55L1095.43 504.74L1093.13 492.72L1092.85 474.23L1093.47 468.99L1092.87 451.27L1093.36 448.31L1093.07 449.59L1085.08 443.81L1079.60 441.26L1078.29 439.79L1073.44 427.28L1074.28 422.40L1074.04 418.86L1077.26 405.70L1080.98 399.43L1082.84 393.34L1084.19 392.41L1089.34 391.82L1090.47 390.76L1088.20 382.53L1089.65 381.53L1094.36 381.10L1095.12 380.49L1095.50 376.39L1098.57 374.66L1095.41 370.45L1097.92 369.46L1103.19 369.21L1105.46 368.17L1104.96 366.44L1098.77 362.20L1097.50 360.50L1100.83 353.99L1101.75 348.42L1101.26 345.01L1103.08 338.12L1108.44 332.50L1110.58 322.46L1115.93 317.25L1116.23 314.20L1121.01 299.20L1121.21 290.60L1119.31 276.12L1118.32 273.22L1118.22 266.46L1121.93 259.08L1129.43 247.58L1132.12 241.85L1134.22 232.17L1128.03 212.10L1126.01 200.55L1126.97 193.35L1130.09 183.70L1130.03 171.02L1127.25 155.12L1127.31 143.72L1126.44 141.85L1126.88 137.71L1131.18 122.83L1131.36 123.45L1139.90 108.52L1147.85 90.15L1146.77 81.10L1144.76 75.20L1142.67 72.61L1142.19 70.72L1143.32 67.62L1154.04 49.64L1154.34 50.89L1154.53 48.10L1158.22 35.07L1158.74 28.23L1161.81 18.77L1162.77 8.89L1162.65 2.06L1161.52 0.94L1155.46 3.23L1151.67 1.30L1148.80 0.95L1143.90 4.52L1143.15 4.52L1141.76 1.90L1140.46 1.31L1135.21 1.38L1131.04 2.88L1122.37 1.93L1085.81 1.98L1078.92 3.31L1074.00 6.95L1040.92 7.00L1032.10 8.00L1026.89 1.00L993.23 0.99L991.12 2.11L987.20 6.38L985.06 6.94L976.03 0.99L963.32 0.98L958.09 4.52L952.10 0.98L945.36 0.97L941.82 4.60L940.40 4.83L934.96 1.21Z'

const Glyphs = ({ glyphs, mode }) =>
  glyphs.map((g, i) => (
    <text
      key={`${mode}-${i}`}
      x={g.x}
      y={g.y}
      fontSize={g.size}
      textAnchor='middle'
      dominantBaseline='central'>
      {g.ch}
    </text>
  ))

export default function HeroPuzzle() {
  const router = useRouter()
  const go = (event, href) => {
    event.preventDefault()
    router.push(href)
  }

  return (
    <div className='ob-puzzle'>
      <svg
        viewBox='0 0 2048 989'
        preserveAspectRatio='xMidYMid slice'
        aria-hidden='true'
        focusable='false'>
        <defs>
          {PIECES.map(piece => (
            <clipPath key={piece.key} id={`ob-clip-${piece.key}`}>
              <path d={piece.d} />
            </clipPath>
          ))}
        </defs>
        {PIECES.map(piece => (
          <a
            key={piece.key}
            href={piece.href}
            aria-label={piece.name}
            onClick={event => go(event, piece.href)}>
            <path className='ob-plate-fill' d={piece.d} />
            <path className='ob-plate-seam' d={piece.d} vectorEffect='nonScalingStroke' />
            <g className='ob-type-desk ob-letter-halo' clipPath={`url(#ob-clip-${piece.key})`}>
              <Glyphs glyphs={piece.desk} mode='halo-desk' />
            </g>
            <g className='ob-type-desk ob-letter' clipPath={`url(#ob-clip-${piece.key})`}>
              <Glyphs glyphs={piece.desk} mode='desk' />
            </g>
            <g className='ob-type-mobi ob-letter-halo' clipPath={`url(#ob-clip-${piece.key})`}>
              <Glyphs glyphs={piece.mobi} mode='halo-mobi' />
            </g>
            <g className='ob-type-mobi ob-letter' clipPath={`url(#ob-clip-${piece.key})`}>
              <Glyphs glyphs={piece.mobi} mode='mobi' />
            </g>
          </a>
        ))}
        <path className='ob-hand-outline' d={HAND_OUTLINE} vectorEffect='nonScalingStroke' />
      </svg>
      <style jsx>{`
        .ob-puzzle {
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
          --ob-fill: rgba(46, 34, 20, 0.09);
          --ob-fill-hover: rgba(46, 34, 20, 0.16);
          --ob-seam: rgba(168, 122, 54, 0.9);
          --ob-seam-hover: rgba(210, 160, 70, 1);
          --ob-letter: rgba(74, 54, 32, 0.78);
          --ob-letter-hover: rgba(168, 118, 46, 0.95);
          --ob-halo: rgba(255, 248, 232, 0.28);
          --ob-hand: rgba(196, 150, 74, 0.72);
        }
        :global(html.dark) .ob-puzzle,
        :global(.dark) .ob-puzzle {
          --ob-fill: rgba(12, 10, 8, 0.16);
          --ob-fill-hover: rgba(12, 10, 8, 0.24);
          --ob-seam: rgba(212, 175, 55, 0.92);
          --ob-seam-hover: rgba(236, 200, 96, 1);
          --ob-letter: rgba(58, 42, 22, 0.84);
          --ob-letter-hover: rgba(212, 170, 80, 0.96);
          --ob-halo: rgba(255, 236, 200, 0.26);
          --ob-hand: rgba(212, 175, 55, 0.8);
        }
        .ob-puzzle :global(svg) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        .ob-puzzle :global(a) {
          pointer-events: auto;
          cursor: pointer;
        }
        .ob-puzzle :global(.ob-plate-fill) {
          fill: var(--ob-fill);
          stroke: none;
          transition: fill 220ms ease;
        }
        .ob-puzzle :global(.ob-plate-seam) {
          fill: none;
          stroke: var(--ob-seam);
          stroke-width: 2.1;
          stroke-linejoin: round;
          stroke-linecap: round;
          vector-effect: non-scaling-stroke;
          pointer-events: none;
          transition: stroke 220ms ease;
        }
        .ob-puzzle :global(.ob-hand-outline) {
          fill: none;
          stroke: var(--ob-hand);
          stroke-width: 1.55;
          stroke-linejoin: round;
          vector-effect: non-scaling-stroke;
          pointer-events: none;
        }
        .ob-puzzle :global(a:hover .ob-plate-fill),
        .ob-puzzle :global(a:focus-visible .ob-plate-fill) {
          fill: var(--ob-fill-hover);
        }
        .ob-puzzle :global(a:hover .ob-plate-seam),
        .ob-puzzle :global(a:focus-visible .ob-plate-seam) {
          stroke: var(--ob-seam-hover);
        }
        .ob-puzzle :global(.ob-letter text),
        .ob-puzzle :global(.ob-letter-halo text) {
          fill: none;
          font-family: 'Noto Serif SC', 'Noto Serif CJK SC', 'Source Han Serif SC', 'Songti SC', 'STSong', serif;
          font-weight: 300;
          pointer-events: none;
          stroke-linejoin: round;
          stroke-linecap: round;
        }
        .ob-puzzle :global(.ob-letter-halo text) {
          stroke: var(--ob-halo);
          stroke-width: 0.036em;
        }
        .ob-puzzle :global(.ob-letter text) {
          stroke: var(--ob-letter);
          stroke-width: 0.015em;
        }
        .ob-puzzle :global(a:hover .ob-letter text),
        .ob-puzzle :global(a:focus-visible .ob-letter text) {
          stroke: var(--ob-letter-hover);
        }
        .ob-puzzle :global(.ob-type-mobi) {
          display: none;
        }
        @media (max-width: 1023px) {
          .ob-puzzle :global(.ob-type-desk) {
            display: none;
          }
          .ob-puzzle :global(.ob-type-mobi) {
            display: inline;
          }
          .ob-puzzle :global(.ob-plate-seam) {
            stroke-width: 1.5;
          }
          .ob-puzzle :global(.ob-letter text) {
            stroke-width: 0.034em;
          }
          .ob-puzzle :global(.ob-letter-halo text) {
            stroke-width: 0.05em;
          }
        }
        @media (hover: none) {
          .ob-puzzle :global(a:hover .ob-plate-fill) {
            fill: var(--ob-fill);
          }
          .ob-puzzle :global(a:hover .ob-plate-seam) {
            stroke: var(--ob-seam);
          }
          .ob-puzzle :global(a:hover .ob-letter text) {
            stroke: var(--ob-letter);
          }
        }
      `}</style>
    </div>
  )
}
