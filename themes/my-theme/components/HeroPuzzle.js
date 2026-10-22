/* eslint-disable react/no-unknown-property */
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'

const PIECES = [
  {
    key: 'our',
    name: '我们的存在',
    href: '/category/我们的存在',
    d: 'M3.2 8.6 L46.6 6.6 L48 13.2 C46.2 22.5 45 33.5 43.8 45.8 L31.2 48.2 L26.4 48.2 C26.4 48.2 26.4 42 21.5 42 C16.6 42 16.6 48.2 16.6 48.2 L3.5 49 L2.7 18.8 Z'
  },
  {
    key: 'self',
    name: '我的存在',
    href: '/category/我的存在',
    d: 'M53.8 6.5 L96.7 8.6 L97.3 20.2 L96.8 49 L83.4 48.2 C83.4 48.2 83.4 54.4 78.5 54.4 C73.6 54.4 73.6 48.2 73.6 48.2 L62.2 48.2 L57.2 45.5 C55.8 32 54.6 20 53.6 12.4 Z'
  },
  {
    key: 'dao',
    name: '道',
    href: '/category/道',
    d: 'M3.5 50.1 L16.6 49 C16.6 49 16.6 42 21.5 42 C26.4 42 26.4 49 26.4 49 L31.2 49 L43.6 47.2 C44.8 58.5 46.4 71 47.6 82.4 L45.4 93.4 L4.1 94.2 L3.1 64.2 Z'
  },
  {
    key: 'shu',
    name: '术',
    href: '/category/术',
    d: 'M57.4 46.8 L62.2 49 L73.6 49 C73.6 49 73.6 55.2 78.5 55.2 C83.4 55.2 83.4 49 83.4 49 L96.8 50.4 L97 82.2 L94.6 94.2 L56.6 93.4 C57.2 80 57.6 64 57.4 46.8 Z'
  }
]

export default function HeroPuzzle() {
  const router = useRouter()
  const go = (event, href) => {
    event.preventDefault()
    router.push(href)
  }

  return (
    <div className='ob-puzzle'>
      <svg
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
        aria-hidden='true'
        focusable='false'>
        {PIECES.map(piece => (
          <a
            key={piece.key}
            href={piece.href}
            aria-label={piece.name}
            onClick={event => go(event, piece.href)}>
            <path d={piece.d} vectorEffect='nonScalingStroke' />
          </a>
        ))}
      </svg>
      {PIECES.map(piece => (
        <SmartLink
          key={`${piece.key}-label`}
          href={piece.href}
          className={`ob-puzzle-label ob-puzzle-label-${piece.key}`}>
          {piece.name}
        </SmartLink>
      ))}
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
          overflow: visible;
        }
        .ob-puzzle :global(path) {
          fill: rgba(255, 248, 235, 0.13);
          stroke: rgba(201, 166, 107, 0.55);
          stroke-width: 0.35;
          transition: fill 220ms ease, stroke 220ms ease;
          pointer-events: auto;
          cursor: pointer;
        }
        .ob-puzzle :global(a:hover path),
        .ob-puzzle :global(a:focus-visible path) {
          fill: rgba(201, 166, 107, 0.22);
          stroke: rgba(212, 175, 55, 0.88);
        }
        .ob-puzzle :global(.ob-puzzle-label) {
          position: absolute;
          z-index: 21;
          color: rgba(44, 36, 28, 0.88);
          text-decoration: none;
          letter-spacing: 0.28em;
          font-size: 15px;
          font-weight: 400;
          line-height: 1;
          white-space: nowrap;
          pointer-events: auto;
          text-shadow: 0 1px 10px rgba(255, 244, 220, 0.7);
          transition: color 200ms ease;
        }
        .ob-puzzle :global(.ob-puzzle-label:hover),
        .ob-puzzle :global(.ob-puzzle-label:focus-visible) {
          color: #8a6a32;
        }
        .ob-puzzle :global(.ob-puzzle-label-our) {
          left: 9%;
          top: 26%;
        }
        .ob-puzzle :global(.ob-puzzle-label-self) {
          right: 9%;
          top: 26%;
        }
        .ob-puzzle :global(.ob-puzzle-label-dao) {
          left: 12%;
          bottom: 16%;
          letter-spacing: 0.42em;
          font-size: 18px;
        }
        .ob-puzzle :global(.ob-puzzle-label-shu) {
          right: 12%;
          bottom: 16%;
          letter-spacing: 0.42em;
          font-size: 18px;
        }
        @media (max-width: 767px) {
          .ob-puzzle :global(.ob-puzzle-label) {
            font-size: 13px;
            letter-spacing: 0.16em;
          }
          .ob-puzzle :global(.ob-puzzle-label-our) {
            left: 6%;
            top: 18%;
          }
          .ob-puzzle :global(.ob-puzzle-label-self) {
            right: 6%;
            top: 18%;
          }
          .ob-puzzle :global(.ob-puzzle-label-dao),
          .ob-puzzle :global(.ob-puzzle-label-shu) {
            font-size: 16px;
            letter-spacing: 0.32em;
          }
          .ob-puzzle :global(.ob-puzzle-label-dao) {
            left: 8%;
            bottom: 10%;
          }
          .ob-puzzle :global(.ob-puzzle-label-shu) {
            right: 8%;
            bottom: 10%;
          }
        }
        @media (hover: none) {
          .ob-puzzle :global(a:hover path) {
            fill: rgba(255, 248, 235, 0.13);
            stroke: rgba(201, 166, 107, 0.55);
          }
        }
      `}</style>
    </div>
  )
}
