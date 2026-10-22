/* eslint-disable react/no-unknown-property */
import { useRouter } from 'next/router'

const PIECES = [
  {
    key: 'our',
    name: '我们的存在',
    href: '/category/我们的存在',
    dDesk: 'M730.0 59.0L717.0 76.0L704.0 77.0L699.0 81.0L679.0 118.0L679.0 124.0L689.0 133.0L690.0 140.0L656.0 174.0L655.0 184.0L660.0 189.0L680.0 191.0L692.0 207.0L726.0 208.0L732.0 215.0L736.0 229.0L731.0 235.0L720.0 237.0L712.0 246.0L662.0 263.0L649.0 270.0L649.0 281.0L659.0 288.0L671.0 290.0L676.0 298.0L673.0 305.0L643.0 339.0L640.0 345.0L641.0 351.0L651.0 356.0L669.0 344.0L677.0 343.0L692.0 360.0L706.0 361.0L725.0 369.0L744.0 365.0L754.0 356.0L763.0 338.0L782.0 337.0L789.0 330.0L789.0 321.0L781.0 311.0L760.0 307.0L755.0 301.0L760.0 279.0L765.0 274.0L778.0 273.0L791.0 275.0L802.0 293.0L817.0 297.0L822.0 303.0L820.0 313.0L785.0 367.0L789.0 377.0L799.0 378.0L819.0 361.0L825.0 361.0L837.0 376.0L846.0 379.0L854.0 374.0L861.0 361.0L913.0 347.0L918.0 341.0L917.0 334.0L912.0 327.0L904.0 324.0L899.0 318.0L908.0 303.0L908.0 297.0L901.0 289.0L885.0 284.0L878.0 276.0L880.0 268.0L889.0 262.0L894.0 254.0L893.0 245.0L868.0 234.0L859.0 237.0L850.0 249.0L844.0 249.0L838.0 242.0L838.0 227.0L833.0 213.0L816.0 200.0L816.0 194.0L821.0 188.0L837.0 190.0L845.0 185.0L849.0 175.0L847.0 160.0L850.0 138.0L856.0 133.0L876.0 126.0L881.0 127.0L886.0 133.0L885.0 159.0L880.0 165.0L865.0 168.0L860.0 175.0L862.0 180.0L897.0 198.0L905.0 199.0L913.0 194.0L915.0 190.0L915.0 135.0L918.0 118.0L913.0 98.0L898.0 90.0L873.0 98.0L856.0 94.0L835.0 98.0L820.0 86.0L813.0 88.0L805.0 97.0L799.0 97.0L789.0 85.0L761.0 78.0L749.0 62.0L736.0 58.0Z',
    dMobi: 'M827.0 138.0L808.0 153.0L803.0 164.0L803.0 172.0L793.0 186.0L793.0 193.0L809.0 205.0L822.0 206.0L827.0 211.0L826.0 226.0L829.0 241.0L819.0 251.0L798.0 258.0L793.0 262.0L792.0 268.0L798.0 280.0L791.0 290.0L789.0 298.0L794.0 303.0L809.0 302.0L826.0 308.0L844.0 307.0L851.0 315.0L856.0 317.0L863.0 315.0L881.0 316.0L892.0 308.0L907.0 304.0L912.0 298.0L912.0 291.0L908.0 284.0L909.0 276.0L904.0 268.0L902.0 256.0L895.0 251.0L881.0 249.0L877.0 245.0L876.0 218.0L866.0 202.0L872.0 195.0L880.0 193.0L892.0 198.0L902.0 198.0L907.0 194.0L910.0 156.0L901.0 147.0L879.0 148.0L873.0 145.0L863.0 145.0L858.0 148.0L846.0 146.0L838.0 139.0Z',
    desk: [
      { ch: '我', x: 728, y: 150, size: 178, rot: -9 },
      { ch: '们', x: 848, y: 144, size: 160, rot: 4 },
      { ch: '的', x: 786, y: 228, size: 136, rot: -3 },
      { ch: '存', x: 718, y: 304, size: 156, rot: 6 },
      { ch: '在', x: 848, y: 310, size: 164, rot: -5 }
    ],
    mobi: [
      { ch: '我', x: 828, y: 178, size: 70, rot: -7 },
      { ch: '们', x: 878, y: 172, size: 62, rot: 5 },
      { ch: '的', x: 852, y: 226, size: 54, rot: -2 },
      { ch: '存', x: 826, y: 278, size: 62, rot: 5 },
      { ch: '在', x: 880, y: 284, size: 66, rot: -4 }
    ]
  },
  {
    key: 'self',
    name: '我的存在',
    href: '/category/我的存在',
    dDesk: 'M1244.0 66.0L1230.0 78.0L1213.0 78.0L1202.0 86.0L1180.0 110.0L1180.0 116.0L1186.0 125.0L1185.0 129.0L1169.0 141.0L1146.0 152.0L1142.0 157.0L1144.0 167.0L1160.0 175.0L1165.0 181.0L1166.0 190.0L1174.0 197.0L1212.0 205.0L1218.0 203.0L1226.0 195.0L1241.0 195.0L1246.0 201.0L1247.0 221.0L1251.0 229.0L1250.0 237.0L1271.0 235.0L1275.0 230.0L1277.0 214.0L1282.0 208.0L1288.0 208.0L1299.0 215.0L1330.0 212.0L1336.0 214.0L1341.0 222.0L1334.0 231.0L1283.0 258.0L1282.0 267.0L1287.0 273.0L1304.0 277.0L1309.0 283.0L1304.0 300.0L1292.0 315.0L1285.0 315.0L1272.0 305.0L1253.0 304.0L1249.0 300.0L1252.0 274.0L1245.0 264.0L1249.0 255.0L1249.0 239.0L1214.0 234.0L1204.0 244.0L1188.0 252.0L1145.0 267.0L1141.0 272.0L1142.0 281.0L1152.0 288.0L1166.0 289.0L1171.0 297.0L1139.0 337.0L1136.0 350.0L1141.0 355.0L1151.0 356.0L1164.0 345.0L1173.0 344.0L1184.0 358.0L1199.0 358.0L1214.0 365.0L1229.0 366.0L1242.0 361.0L1247.0 356.0L1258.0 334.0L1267.0 333.0L1276.0 340.0L1273.0 356.0L1278.0 361.0L1287.0 360.0L1307.0 343.0L1313.0 343.0L1325.0 358.0L1337.0 359.0L1343.0 354.0L1350.0 341.0L1377.0 332.0L1401.0 328.0L1407.0 319.0L1406.0 309.0L1390.0 297.0L1397.0 285.0L1395.0 270.0L1377.0 264.0L1366.0 252.0L1382.0 228.0L1375.0 214.0L1384.0 200.0L1386.0 190.0L1382.0 151.0L1374.0 141.0L1360.0 134.0L1358.0 120.0L1353.0 111.0L1332.0 108.0L1321.0 117.0L1315.0 117.0L1271.0 94.0L1266.0 88.0L1264.0 77.0L1256.0 70.0Z',
    dMobi: 'M1242.0 243.0L1233.0 236.0L1224.0 236.0L1209.0 248.0L1191.0 258.0L1184.0 258.0L1175.0 250.0L1163.0 248.0L1131.0 262.0L1128.0 270.0L1133.0 282.0L1126.0 295.0L1127.0 302.0L1134.0 306.0L1147.0 305.0L1162.0 310.0L1177.0 308.0L1183.0 302.0L1189.0 302.0L1194.0 305.0L1208.0 303.0L1219.0 305.0L1231.0 296.0L1249.0 292.0L1253.0 285.0L1250.0 267.0L1242.0 254.0Z',
    desk: [
      { ch: '我', x: 1218, y: 150, size: 172, rot: 7 },
      { ch: '的', x: 1330, y: 164, size: 146, rot: -7 },
      { ch: '存', x: 1212, y: 302, size: 156, rot: 4 },
      { ch: '在', x: 1336, y: 290, size: 168, rot: -6 }
    ],
    mobi: [
      { ch: '我', x: 1162, y: 180, size: 68, rot: 6 },
      { ch: '的', x: 1218, y: 188, size: 60, rot: -5 },
      { ch: '存', x: 1162, y: 280, size: 62, rot: 4 },
      { ch: '在', x: 1220, y: 272, size: 68, rot: -6 }
    ]
  },
  {
    key: 'dao',
    name: '道',
    href: '/category/道',
    dDesk: 'M680.0 575.0L679.0 587.0L689.0 604.0L698.0 613.0L706.0 616.0L711.0 624.0L693.0 641.0L671.0 656.0L668.0 670.0L671.0 674.0L681.0 677.0L699.0 677.0L711.0 673.0L719.0 678.0L720.0 731.0L723.0 749.0L718.0 755.0L712.0 755.0L691.0 738.0L686.0 731.0L684.0 709.0L673.0 700.0L639.0 694.0L626.0 701.0L625.0 707.0L628.0 714.0L641.0 729.0L650.0 747.0L671.0 776.0L664.0 806.0L664.0 817.0L670.0 826.0L683.0 827.0L711.0 821.0L736.0 822.0L807.0 816.0L880.0 817.0L917.0 806.0L944.0 788.0L948.0 778.0L946.0 769.0L941.0 765.0L925.0 764.0L898.0 769.0L846.0 771.0L838.0 766.0L837.0 757.0L842.0 739.0L829.0 689.0L814.0 645.0L804.0 627.0L791.0 622.0L786.0 616.0L793.0 601.0L793.0 593.0L781.0 576.0L790.0 558.0L787.0 546.0L781.0 538.0L754.0 534.0L738.0 539.0L712.0 558.0L699.0 571.0L687.0 571.0Z',
    dMobi: 'M804.0 669.0L803.0 678.0L810.0 691.0L799.0 703.0L797.0 710.0L793.0 714.0L785.0 716.0L781.0 721.0L781.0 728.0L797.0 754.0L795.0 771.0L799.0 778.0L860.0 775.0L886.0 777.0L903.0 773.0L919.0 764.0L921.0 752.0L917.0 747.0L912.0 745.0L888.0 747.0L880.0 742.0L870.0 705.0L859.0 686.0L857.0 673.0L858.0 659.0L853.0 652.0L846.0 650.0L833.0 651.0L823.0 656.0L815.0 664.0Z',
    desk: [
      { ch: '道', x: 778, y: 688, size: 338, rot: -9 }
    ],
    mobi: [
      { ch: '道', x: 848, y: 718, size: 138, rot: -8 }
    ]
  },
  {
    key: 'shu',
    name: '术',
    href: '/category/术',
    dDesk: 'M1337.0 619.0L1323.0 606.0L1314.0 604.0L1305.0 595.0L1297.0 593.0L1274.0 563.0L1258.0 555.0L1251.0 557.0L1246.0 565.0L1251.0 586.0L1249.0 608.0L1233.0 618.0L1208.0 625.0L1184.0 628.0L1177.0 634.0L1179.0 644.0L1192.0 659.0L1214.0 675.0L1215.0 679.0L1210.0 690.0L1162.0 734.0L1149.0 743.0L1130.0 751.0L1120.0 765.0L1121.0 775.0L1131.0 782.0L1162.0 779.0L1188.0 765.0L1198.0 756.0L1208.0 754.0L1213.0 760.0L1218.0 780.0L1228.0 793.0L1244.0 805.0L1257.0 806.0L1263.0 801.0L1268.0 791.0L1271.0 742.0L1277.0 730.0L1290.0 734.0L1342.0 769.0L1356.0 775.0L1365.0 774.0L1372.0 766.0L1373.0 756.0L1370.0 745.0L1357.0 724.0L1342.0 711.0L1293.0 692.0L1284.0 684.0L1286.0 657.0L1291.0 652.0L1305.0 651.0L1331.0 643.0L1338.0 635.0Z',
    dMobi: 'M1253.0 672.0L1245.0 664.0L1234.0 659.0L1218.0 663.0L1210.0 663.0L1200.0 659.0L1192.0 661.0L1189.0 665.0L1189.0 680.0L1184.0 685.0L1175.0 686.0L1163.0 692.0L1162.0 702.0L1171.0 712.0L1172.0 716.0L1159.0 730.0L1146.0 738.0L1141.0 746.0L1142.0 756.0L1153.0 760.0L1177.0 755.0L1188.0 766.0L1201.0 768.0L1207.0 763.0L1210.0 753.0L1215.0 747.0L1222.0 747.0L1236.0 755.0L1246.0 754.0L1251.0 748.0L1250.0 734.0L1238.0 721.0L1229.0 718.0L1224.0 710.0L1229.0 704.0L1240.0 697.0L1250.0 694.0L1255.0 689.0L1257.0 680.0Z',
    desk: [
      { ch: '术', x: 1258, y: 682, size: 332, rot: 8 }
    ],
    mobi: [
      { ch: '术', x: 1200, y: 714, size: 132, rot: 7 }
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
            <clipPath key={`${piece.key}-desk`} id={`ob-clip-${piece.key}-desk`}>
              <path d={piece.dDesk} />
            </clipPath>
          ))}
          {PIECES.map(piece => (
            <clipPath key={`${piece.key}-mobi`} id={`ob-clip-${piece.key}-mobi`}>
              <path d={piece.dMobi} />
            </clipPath>
          ))}
        </defs>
        {PIECES.map(piece => (
          <a
            key={piece.key}
            href={piece.href}
            aria-label={piece.name}
            onClick={event => go(event, piece.href)}>
            <path className='ob-plate-fill ob-plate-desk' d={piece.dDesk} />
            <path className='ob-plate-fill ob-plate-mobi' d={piece.dMobi} />
            <path
              className='ob-plate-seam ob-plate-desk'
              d={piece.dDesk}
              vectorEffect='nonScalingStroke'
            />
            <path
              className='ob-plate-seam ob-plate-mobi'
              d={piece.dMobi}
              vectorEffect='nonScalingStroke'
            />
            <g
              className='ob-type-desk ob-letter'
              clipPath={`url(#ob-clip-${piece.key}-desk)`}>
              <Glyphs glyphs={piece.desk} mode='desk' />
            </g>
            <g
              className='ob-type-mobi ob-letter'
              clipPath={`url(#ob-clip-${piece.key}-mobi)`}>
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
          --ob-fill: rgba(46, 34, 20, 0.04);
          --ob-fill-hover: rgba(46, 34, 20, 0.1);
          --ob-seam: rgba(196, 154, 86, 0.38);
          --ob-seam-hover: rgba(210, 168, 96, 0.7);
          --ob-letter: rgba(96, 68, 38, 0.4);
          --ob-letter-hover: rgba(120, 82, 40, 0.58);
          --ob-hand: rgba(196, 150, 74, 0.52);
        }
        :global(html.dark) .ob-puzzle,
        :global(.dark) .ob-puzzle {
          --ob-fill: rgba(12, 10, 8, 0.06);
          --ob-fill-hover: rgba(12, 10, 8, 0.12);
          --ob-seam: rgba(212, 175, 55, 0.36);
          --ob-seam-hover: rgba(232, 196, 90, 0.66);
          --ob-letter: rgba(72, 52, 28, 0.42);
          --ob-letter-hover: rgba(168, 130, 70, 0.58);
          --ob-hand: rgba(212, 175, 55, 0.48);
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
          stroke-width: 1.15;
          stroke-linejoin: round;
          stroke-linecap: round;
          vector-effect: non-scaling-stroke;
          pointer-events: none;
          transition: stroke 220ms ease;
        }
        .ob-puzzle :global(.ob-hand-outline) {
          fill: none;
          stroke: var(--ob-hand);
          stroke-width: 1.4;
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
          filter: blur(0.4px);
        }
        .ob-puzzle :global(.ob-letter text) {
          fill: var(--ob-letter);
          stroke: rgba(232, 208, 160, 0.14);
          stroke-width: 0.01em;
          stroke-linejoin: round;
          font-family: 'ObXing', 'STXingkai', '华文行楷', serif;
          font-weight: 400;
          pointer-events: none;
        }
        .ob-puzzle :global(a:hover .ob-letter text),
        .ob-puzzle :global(a:focus-visible .ob-letter text) {
          fill: var(--ob-letter-hover);
        }
        .ob-puzzle :global(.ob-plate-mobi),
        .ob-puzzle :global(.ob-type-mobi) {
          display: none;
        }
        @media (max-width: 1023px) {
          .ob-puzzle :global(.ob-plate-desk),
          .ob-puzzle :global(.ob-type-desk) {
            display: none;
          }
          .ob-puzzle :global(.ob-plate-mobi),
          .ob-puzzle :global(.ob-type-mobi) {
            display: inline;
          }
          .ob-puzzle :global(.ob-plate-seam) {
            stroke-width: 1.05;
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
