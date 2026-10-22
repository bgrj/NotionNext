/* eslint-disable react/no-unknown-property */
import { useRouter } from 'next/router'

const PIECES = [
  {
    key: 'our',
    name: '我们的存在',
    href: '/category/我们的存在',
    x: 812,
    y: 198,
    mx: 896,
    my: 186,
    anchor: 'end',
    cx: 742,
    cy: 186,
    rx: 148,
    ry: 44,
    mcx: 860,
    mcy: 178,
    mrx: 92,
    mry: 32
  },
  {
    key: 'self',
    name: '我的存在',
    href: '/category/我的存在',
    x: 1236,
    y: 198,
    mx: 1176,
    my: 186,
    anchor: 'start',
    cx: 1304,
    cy: 186,
    rx: 132,
    ry: 44,
    mcx: 1218,
    mcy: 178,
    mrx: 86,
    mry: 32
  },
  {
    key: 'dao',
    name: '道',
    href: '/category/道',
    x: 812,
    y: 602,
    mx: 888,
    my: 592,
    anchor: 'end',
    cx: 768,
    cy: 588,
    rx: 64,
    ry: 48,
    mcx: 858,
    mcy: 584,
    mrx: 48,
    mry: 36
  },
  {
    key: 'shu',
    name: '术',
    href: '/category/术',
    x: 1236,
    y: 602,
    mx: 1180,
    my: 592,
    anchor: 'start',
    cx: 1280,
    cy: 588,
    rx: 64,
    ry: 48,
    mcx: 1218,
    mcy: 584,
    mrx: 48,
    mry: 36
  }
]

const HAND_OUTLINE = 'M928.29 0.74L928.47 3.98L933.10 21.23L933.65 25.73L938.09 39.23L942.64 61.74L949.42 82.73L950.99 90.52L959.02 108.57L968.98 126.57L970.11 127.56L971.03 126.95L970.40 127.18L969.30 136.72L969.14 153.30L964.36 164.36L961.24 177.31L960.37 184.77L958.09 194.96L958.38 205.29L960.92 216.55L969.59 233.17L977.84 242.29L1000.74 262.33L1010.48 269.17L1023.86 280.66L1022.65 288.65L1022.51 299.16L1017.84 318.14L1014.88 325.08L1010.52 331.15L1007.99 339.30L1003.57 349.66L993.77 369.54L990.21 381.13L988.37 394.10L989.40 407.61L997.00 453.94L994.48 460.33L994.79 461.25L995.86 461.19L993.25 464.27L989.24 472.00L969.68 497.66L966.22 500.74L954.71 516.39L947.71 524.67L929.65 552.91L922.33 568.47L923.24 574.20L925.20 577.32L927.64 579.46L931.03 580.33L937.79 577.24L941.26 573.95L946.76 565.81L960.80 552.28L1004.73 515.24L1006.24 515.18L1008.22 517.11L1009.71 520.20L1010.37 520.03L1006.52 529.14L996.20 542.70L987.07 561.85L976.06 572.85L971.25 579.68L962.53 587.94L954.88 598.07L951.23 604.13L939.60 618.33L937.08 623.67L934.20 635.49L934.58 638.50L937.10 644.15L944.25 649.04L948.98 649.18L942.64 660.18L939.32 674.53L939.70 677.53L941.60 681.29L944.39 684.13L947.28 685.27L956.29 685.40L962.91 683.14L977.50 674.80L984.02 672.16L991.57 667.23L1010.85 648.31L1012.39 647.88L1014.91 650.19L1015.77 650.16L1011.34 656.75L1001.56 666.57L990.93 675.32L987.42 678.85L984.95 683.11L983.67 701.60L984.05 704.60L985.15 706.86L988.47 709.99L993.66 712.11L995.88 712.11L1001.95 709.74L1026.84 693.25L1035.15 686.37L1048.72 672.87L1063.01 656.36L1072.03 642.85L1075.70 631.97L1077.70 617.27L1080.27 605.34L1081.52 593.25L1086.35 572.29L1086.81 567.05L1090.55 555.72L1093.10 543.78L1093.72 529.25L1095.47 517.47L1094.07 507.99L1095.26 506.55L1095.43 504.74L1093.13 492.72L1092.85 474.23L1093.47 468.99L1092.87 451.27L1093.36 448.31L1093.07 449.59L1085.08 443.81L1079.60 441.26L1078.29 439.79L1073.44 427.28L1074.28 422.40L1074.04 418.86L1077.26 405.70L1080.98 399.43L1082.84 393.34L1084.19 392.41L1089.34 391.82L1090.47 390.76L1088.20 382.53L1089.65 381.53L1094.36 381.10L1095.12 380.49L1095.50 376.39L1098.57 374.66L1095.41 370.45L1097.92 369.46L1103.19 369.21L1105.46 368.17L1104.96 366.44L1098.77 362.20L1097.50 360.50L1100.83 353.99L1101.75 348.42L1101.26 345.01L1103.08 338.12L1108.44 332.50L1110.58 322.46L1115.93 317.25L1116.23 314.20L1121.01 299.20L1121.21 290.60L1119.31 276.12L1118.32 273.22L1118.22 266.46L1121.93 259.08L1129.43 247.58L1132.12 241.85L1134.22 232.17L1128.03 212.10L1126.01 200.55L1126.97 193.35L1130.09 183.70L1130.03 171.02L1127.25 155.12L1127.31 143.72L1126.44 141.85L1126.88 137.71L1131.18 122.83L1131.36 123.45L1139.90 108.52L1147.85 90.15L1146.77 81.10L1144.76 75.20L1142.67 72.61L1142.19 70.72L1143.32 67.62L1154.04 49.64L1154.34 50.89L1154.53 48.10L1158.22 35.07L1158.74 28.23L1161.81 18.77L1162.77 8.89L1162.65 2.06L1161.52 0.94L1155.46 3.23L1151.67 1.30L1148.80 0.95L1143.90 4.52L1143.15 4.52L1141.76 1.90L1140.46 1.31L1135.21 1.38L1131.04 2.88L1122.37 1.93L1085.81 1.98L1078.92 3.31L1074.00 6.95L1040.92 7.00L1032.10 8.00L1026.89 1.00L993.23 0.99L991.12 2.11L987.20 6.38L985.06 6.94L976.03 0.99L963.32 0.98L958.09 4.52L952.10 0.98L945.36 0.97L941.82 4.60L940.40 4.83L934.96 1.21Z'

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
          <filter id='ob-plate-soft' x='-40%' y='-80%' width='180%' height='260%'>
            <feGaussianBlur stdDeviation='18' />
          </filter>
        </defs>
        <path
          className='ob-hand-outline'
          d={HAND_OUTLINE}
          vectorEffect='nonScalingStroke'
        />
        {PIECES.map(piece => (
          <a
            key={piece.key}
            href={piece.href}
            aria-label={piece.name}
            onClick={event => go(event, piece.href)}>
            <ellipse
              className='ob-plate-desk'
              cx={piece.cx}
              cy={piece.cy}
              rx={piece.rx}
              ry={piece.ry}
              filter='url(#ob-plate-soft)'
            />
            <ellipse
              className='ob-plate-mobi'
              cx={piece.mcx}
              cy={piece.mcy}
              rx={piece.mrx}
              ry={piece.mry}
              filter='url(#ob-plate-soft)'
            />
            <text
              x={piece.x}
              y={piece.y}
              textAnchor={piece.anchor}
              className={`ob-puzzle-label ob-puzzle-label-desk ob-puzzle-label-${piece.key}`}>
              {piece.name}
            </text>
            <text
              x={piece.mx}
              y={piece.my}
              textAnchor={piece.anchor}
              className={`ob-puzzle-label ob-puzzle-label-mobi ob-puzzle-label-${piece.key}`}>
              {piece.name}
            </text>
          </a>
        ))}
      </svg>
      <style jsx>{`
        .ob-puzzle {
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
        }
        .ob-puzzle :global(svg) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        .ob-puzzle :global(.ob-hand-outline) {
          fill: none;
          stroke: rgba(201, 166, 107, 0.42);
          stroke-width: 1.15;
          vector-effect: non-scaling-stroke;
          pointer-events: none;
        }
        .ob-puzzle :global(a) {
          pointer-events: auto;
          cursor: pointer;
        }
        .ob-puzzle :global(ellipse) {
          fill: rgba(255, 244, 226, 0.11);
          stroke: none;
        }
        .ob-puzzle :global(.ob-plate-mobi) {
          display: none;
        }
        .ob-puzzle :global(a:hover ellipse),
        .ob-puzzle :global(a:focus-visible ellipse) {
          fill: rgba(255, 244, 226, 0.2);
        }
        .ob-puzzle :global(.ob-puzzle-label) {
          fill: rgba(255, 248, 235, 0.04);
          stroke: rgba(92, 70, 44, 0.5);
          stroke-width: 1.35px;
          paint-order: stroke fill;
          font-size: 27px;
          letter-spacing: 0.34em;
          font-weight: 300;
          font-family: inherit;
          pointer-events: none;
        }
        .ob-puzzle :global(.ob-puzzle-label-mobi) {
          display: none;
        }
        .ob-puzzle :global(.ob-puzzle-label-dao),
        .ob-puzzle :global(.ob-puzzle-label-shu) {
          font-size: 32px;
          letter-spacing: 0.42em;
          stroke-width: 1.15px;
        }
        .ob-puzzle :global(a:hover .ob-puzzle-label),
        .ob-puzzle :global(a:focus-visible .ob-puzzle-label) {
          stroke: rgba(201, 166, 107, 0.78);
        }
        @media (max-width: 767px) {
          .ob-puzzle :global(.ob-plate-desk),
          .ob-puzzle :global(.ob-puzzle-label-desk) {
            display: none;
          }
          .ob-puzzle :global(.ob-plate-mobi),
          .ob-puzzle :global(.ob-puzzle-label-mobi) {
            display: inline;
          }
          .ob-puzzle :global(.ob-puzzle-label) {
            font-size: 17px;
            letter-spacing: 0.18em;
            stroke-width: 0.9px;
          }
          .ob-puzzle :global(.ob-puzzle-label-dao),
          .ob-puzzle :global(.ob-puzzle-label-shu) {
            font-size: 20px;
            letter-spacing: 0.28em;
          }
        }
        @media (hover: none) {
          .ob-puzzle :global(a:hover ellipse) {
            fill: rgba(255, 244, 226, 0.11);
          }
          .ob-puzzle :global(a:hover .ob-puzzle-label) {
            stroke: rgba(72, 54, 36, 0.46);
          }
        }
      `}</style>
    </div>
  )
}
