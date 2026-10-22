/* eslint-disable react/no-unknown-property */
import { useRouter } from 'next/router'

const PIECES = [

  {
    key: 'our',
    name: '我们的存在',
    href: '/category/我们的存在',
    d: 'M492.1 207.5L497.2 240.3L503.8 273.0L510.1 305.9L516.8 339.3L525.6 371.0L538.1 398.6L555.5 419.8L577.5 434.4L603.8 443.6L633.4 450.6L666.7 459.5L705.1 471.2L747.3 484.5L792.6 496.1L838.8 501.4L882.7 498.2L921.1 484.6L951.4 461.9L973.0 432.2L986.6 397.4L993.0 360.1L993.7 322.4L989.6 285.8L982.6 251.2L974.4 217.2L959.9 184.1L939.1 149.9L900.0 116.8L837.5 87.6L757.2 69.2Z',
    desk: [
      { ch: '我', x: 591.5, y: 172.6, size: 132, rot: -7.4 },
      { ch: '们', x: 705.0, y: 172.6, size: 132, rot: -1.4 },
      { ch: '的', x: 818.5, y: 172.6, size: 132, rot: -5.8 },
      { ch: '存', x: 648.2, y: 283.4, size: 132, rot: -7.4 },
      { ch: '在', x: 761.8, y: 283.4, size: 132, rot: -1.4 }
    ],
    mobi: [
      { ch: '我', x: 858, y: 171.0, size: 54, rot: -3.5 },
      { ch: '们', x: 858, y: 231.5, size: 54, rot: -3.5 },
      { ch: '的', x: 858, y: 292.0, size: 54, rot: -3.5 },
      { ch: '存', x: 858, y: 352.5, size: 54, rot: -3.5 },
      { ch: '在', x: 858, y: 413.0, size: 54, rot: -3.5 }
    ]
  },
  {
    key: 'self',
    name: '我的存在',
    href: '/category/我的存在',
    d: 'M1132.7 170.1L1128.6 203.6L1124.1 237.0L1118.9 270.1L1112.4 303.2L1105.2 336.3L1099.6 368.4L1097.6 399.3L1102.8 428.0L1117.4 453.4L1142.1 474.5L1175.4 489.7L1213.5 498.1L1253.3 499.0L1291.3 493.9L1325.7 485.3L1356.6 475.6L1383.9 467.5L1409.1 461.4L1433.5 453.9L1458.5 443.1L1485.2 420.5L1512.5 382.6L1532.5 327.2L1542.5 258.8L1528.7 187.0L1485.7 124.0L1417.9 80.3Z',
    desk: [
      { ch: '我', x: 1328.6, y: 174.6, size: 132, rot: 0.6 },
      { ch: '的', x: 1447.4, y: 174.6, size: 132, rot: 6.6 },
      { ch: '存', x: 1328.6, y: 285.4, size: 132, rot: 0.6 },
      { ch: '在', x: 1447.4, y: 285.4, size: 132, rot: 6.6 }
    ],
    mobi: [
      { ch: '我', x: 1192, y: 188.6, size: 58, rot: 3.2 },
      { ch: '的', x: 1192, y: 253.5, size: 58, rot: 3.2 },
      { ch: '存', x: 1192, y: 318.5, size: 58, rot: 3.2 },
      { ch: '在', x: 1192, y: 383.4, size: 58, rot: 3.2 }
    ]
  },
  {
    key: 'dao',
    name: '道',
    href: '/category/道',
    d: 'M462.1 702.1L464.2 742.6L470.7 780.9L487.4 816.3L514.7 850.1L562.0 881.9L631.0 909.3L715.8 928.4L804.3 935.5L883.0 927.8L941.6 905.2L977.4 871.8L994.8 834.1L1002.9 796.9L1003.1 765.0L1001.0 740.3L996.8 722.4L991.1 709.1L984.6 699.4L977.2 692.0L969.1 685.9L960.9 680.2L953.3 673.3L947.7 664.0L945.1 651.1L946.9 634.5L953.0 614.7L962.2 593.7L971.8 574.0L978.4 558.7L979.1 550.6L973.3 549.8L963.1 553.7L951.6 558.6L941.4 560.4L933.9 557.1L926.7 549.2L916.1 540.1L899.1 531.8L875.2 525.6L844.9 520.0L810.5 512.2L774.2 500.7L737.2 486.2L699.2 471.4L661.9 459.2L624.8 452.8L589.4 453.9L556.2 464.3Z',
    desk: [
      { ch: '道', x: 655.0, y: 700.0, size: 348, rot: -9.2 }
    ],
    mobi: [
      { ch: '道', x: 858.0, y: 718.0, size: 128, rot: -8.2 }
    ]
  },
  {
    key: 'shu',
    name: '术',
    href: '/category/术',
    d: 'M1411.1 460.8L1386.1 466.7L1359.7 474.9L1332.6 484.8L1303.8 495.1L1273.7 503.4L1241.5 508.9L1207.8 512.9L1174.1 518.0L1142.6 528.9L1115.1 548.2L1092.4 575.5L1073.1 607.9L1056.1 641.0L1040.3 672.0L1027.3 700.3L1017.1 727.7L1009.8 758.1L1004.7 792.1L1006.2 830.1L1014.8 867.6L1041.9 900.2L1095.1 921.3L1172.7 926.8L1265.0 917.9L1357.5 899.3L1436.4 876.6L1493.6 855.4L1530.4 837.4L1555.4 821.0L1569.5 802.4L1577.3 780.7L1580.9 755.4L1582.1 727.9L1583.4 699.8L1585.7 672.5L1588.6 646.2L1590.1 619.6L1588.0 592.7L1580.8 564.3L1569.1 535.2L1552.9 507.6Z',
    desk: [
      { ch: '术', x: 1418.0, y: 698.0, size: 348, rot: 2.0 }
    ],
    mobi: [
      { ch: '术', x: 1192.0, y: 718.0, size: 122, rot: 1.3 }
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
      dominantBaseline='central'
      transform={`rotate(${g.rot} ${g.x} ${g.y})`}>
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
            <g
              className='ob-type-desk ob-letter'
              clipPath={`url(#ob-clip-${piece.key})`}>
              <Glyphs glyphs={piece.desk} mode='desk' />
            </g>
            <g
              className='ob-type-mobi ob-letter'
              clipPath={`url(#ob-clip-${piece.key})`}>
              <Glyphs glyphs={piece.mobi} mode='mobi' />
            </g>
          </a>
        ))}
        <path className='ob-hand-outline' d={HAND_OUTLINE} vectorEffect='nonScalingStroke' />
      </svg>
      <style jsx global>{`
        @font-face {
          font-family: 'ObXing';
          src: url('data:font/woff;base64,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') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
      <style jsx>{`
        .ob-puzzle {
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
          --ob-fill: rgba(46, 34, 20, 0.045);
          --ob-fill-hover: rgba(46, 34, 20, 0.1);
          --ob-seam: rgba(196, 154, 86, 0.58);
          --ob-seam-hover: rgba(210, 168, 96, 0.82);
          --ob-letter: rgba(96, 68, 38, 0.42);
          --ob-letter-hover: rgba(120, 82, 40, 0.58);
          --ob-hand: rgba(196, 150, 74, 0.58);
        }
        :global(html.dark) .ob-puzzle,
        :global(.dark) .ob-puzzle {
          --ob-fill: rgba(12, 10, 8, 0.07);
          --ob-fill-hover: rgba(12, 10, 8, 0.13);
          --ob-seam: rgba(212, 175, 55, 0.5);
          --ob-seam-hover: rgba(232, 196, 90, 0.75);
          --ob-letter: rgba(72, 52, 28, 0.4);
          --ob-letter-hover: rgba(168, 130, 70, 0.58);
          --ob-hand: rgba(212, 175, 55, 0.52);
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
          stroke-width: 1.4;
          stroke-linejoin: round;
          stroke-linecap: round;
          vector-effect: non-scaling-stroke;
          pointer-events: none;
          transition: stroke 220ms ease;
        }
        .ob-puzzle :global(.ob-hand-outline) {
          fill: none;
          stroke: var(--ob-hand);
          stroke-width: 1.5;
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
        .ob-puzzle :global(.ob-letter) {
          mix-blend-mode: multiply;
          filter: blur(0.45px);
        }
        .ob-puzzle :global(.ob-letter text) {
          fill: var(--ob-letter);
          stroke: rgba(232, 208, 160, 0.14);
          stroke-width: 0.01em;
          stroke-linejoin: round;
          font-family: 'ObXing', 'Zhi Mang Xing', 'STXingkai', '华文行楷', serif;
          font-weight: 400;
          pointer-events: none;
        }
        .ob-puzzle :global(a:hover .ob-letter text),
        .ob-puzzle :global(a:focus-visible .ob-letter text) {
          fill: var(--ob-letter-hover);
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
            stroke-width: 1.15;
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
            fill: var(--ob-letter);
          }
        }
      `}</style>
    </div>
  )
}
