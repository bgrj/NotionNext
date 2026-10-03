import { extractClickWords } from '@/lib/clickThoughts'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

const EFFECTS = ['rise', 'burst', 'pulse', 'ink', 'orbit']
const COLORS = ['#2C241C', '#5C4033', '#3D5A4C', '#6B5344', '#8A5A3A', '#3F4A5A']
const SPARK_COLORS = [
  '255, 196, 120',
  '210, 168, 112',
  '140, 176, 156',
  '196, 140, 120',
  '168, 176, 196'
]
const IGNORE_SELECTOR =
  'input, textarea, select, option, [contenteditable="true"], [contenteditable=""], audio, video'
const MAX_LIVE = 8

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function shouldIgnore(target) {
  if (!target || !target.closest) return true
  return Boolean(target.closest(IGNORE_SELECTOR))
}

function readOpenArticleText() {
  const el =
    document.querySelector('#article-wrapper') ||
    document.querySelector('article') ||
    document.querySelector('.notion')
  return el?.innerText || ''
}

function spawnThought(x, y, word, effect) {
  const host = document.createElement('span')
  host.className = `ob-click-thoughts ob-click-thoughts--${effect}`
  host.style.left = `${x}px`
  host.style.top = `${y}px`
  host.setAttribute('aria-hidden', 'true')

  const label = document.createElement('span')
  label.className = 'ob-click-thoughts__word'
  label.textContent = word
  label.style.color = randomItem(COLORS)
  host.appendChild(label)

  const sparkCount = effect === 'rise' || effect === 'pulse' ? 4 : 12
  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('i')
    spark.className = 'ob-click-thoughts__spark'
    const angle = (Math.PI * 2 * i) / sparkCount + Math.random() * 0.4
    const distance = 18 + Math.random() * (effect === 'burst' ? 42 : 28)
    spark.style.setProperty('--dx', `${Math.cos(angle) * distance}px`)
    spark.style.setProperty('--dy', `${Math.sin(angle) * distance}px`)
    spark.style.setProperty('--c', randomItem(SPARK_COLORS))
    spark.style.animationDelay = `${i * 12}ms`
    host.appendChild(spark)
  }

  document.body.appendChild(host)
  window.setTimeout(() => host.remove(), 1300)
  return host
}

/**
 * Click / tap the page: a complete word from site articles appears,
 * with a rotating visual (rise, firework burst, pulse, ink, orbit).
 */
const ClickThoughts = ({ pages = [], currentPost = null }) => {
  const router = useRouter()
  const lastWordRef = useRef('')
  const lastAtRef = useRef(0)
  const liveRef = useRef([])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const sourcePages = currentPost ? [currentPost, ...pages] : pages
    const words = extractClickWords(sourcePages, readOpenArticleText())

    const onPointerDown = event => {
      if (event.pointerType === 'mouse' && event.button !== 0) return
      if (shouldIgnore(event.target)) return
      if (window.getSelection?.()?.toString()) return
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
        return
      }

      const now = Date.now()
      if (now - lastAtRef.current < 90) return
      lastAtRef.current = now

      let word = randomItem(words)
      if (words.length > 1 && word === lastWordRef.current) {
        word = randomItem(words.filter(item => item !== lastWordRef.current))
      }
      lastWordRef.current = word

      const live = liveRef.current
      if (live.length >= MAX_LIVE) {
        const oldest = live.shift()
        oldest?.remove()
      }
      const node = spawnThought(
        event.clientX,
        event.clientY,
        word,
        randomItem(EFFECTS)
      )
      live.push(node)
    }

    document.addEventListener('pointerdown', onPointerDown, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      liveRef.current.forEach(node => node.remove())
      liveRef.current = []
    }
  }, [pages, currentPost, router.asPath])

  return (
    <style jsx global>{`
      .ob-click-thoughts {
        position: fixed;
        z-index: 80;
        pointer-events: none;
        transform: translate(-50%, -50%);
        font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
      }
      .ob-click-thoughts__word {
        display: block;
        font-size: 18px;
        letter-spacing: 0.08em;
        font-weight: 600;
        white-space: nowrap;
        text-shadow:
          0 1px 8px rgba(255, 255, 255, 0.55),
          0 0 2px rgba(44, 36, 28, 0.28);
      }
      .dark .ob-click-thoughts__word {
        text-shadow:
          0 1px 10px rgba(0, 0, 0, 0.55),
          0 0 2px rgba(255, 255, 255, 0.18);
      }
      .ob-click-thoughts__spark {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 5px;
        height: 5px;
        margin: -2.5px 0 0 -2.5px;
        border-radius: 999px;
        background: rgba(var(--c), 0.92);
        box-shadow: 0 0 8px rgba(var(--c), 0.55);
      }
      .ob-click-thoughts--rise .ob-click-thoughts__word {
        animation: ob-thought-rise 1.1s ease-out forwards;
      }
      .ob-click-thoughts--pulse .ob-click-thoughts__word {
        animation: ob-thought-pulse 1s ease-out forwards;
      }
      .ob-click-thoughts--burst .ob-click-thoughts__word,
      .ob-click-thoughts--orbit .ob-click-thoughts__word,
      .ob-click-thoughts--ink .ob-click-thoughts__word {
        animation: ob-thought-hold 1.15s ease-out forwards;
      }
      .ob-click-thoughts--burst .ob-click-thoughts__spark {
        animation: ob-thought-burst 0.9s ease-out forwards;
      }
      .ob-click-thoughts--orbit .ob-click-thoughts__spark {
        animation: ob-thought-orbit 1.05s ease-in-out forwards;
      }
      .ob-click-thoughts--ink::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 12px;
        height: 12px;
        border: 1px solid rgba(92, 64, 51, 0.35);
        border-radius: 999px;
        transform: translate(-50%, -50%);
        animation: ob-thought-ink 1s ease-out forwards;
      }
      .ob-click-thoughts--rise .ob-click-thoughts__spark,
      .ob-click-thoughts--pulse .ob-click-thoughts__spark,
      .ob-click-thoughts--ink .ob-click-thoughts__spark {
        animation: ob-thought-burst 0.8s ease-out forwards;
        opacity: 0.65;
      }
      @keyframes ob-thought-rise {
        0% {
          transform: translateY(8px) scale(0.92);
          opacity: 0;
        }
        18% {
          opacity: 1;
        }
        100% {
          transform: translateY(-52px) scale(1);
          opacity: 0;
        }
      }
      @keyframes ob-thought-pulse {
        0% {
          transform: scale(0.6);
          opacity: 0;
        }
        24% {
          transform: scale(1.08);
          opacity: 1;
        }
        100% {
          transform: scale(0.9) translateY(-18px);
          opacity: 0;
        }
      }
      @keyframes ob-thought-hold {
        0% {
          transform: scale(0.84);
          opacity: 0;
        }
        16% {
          transform: scale(1);
          opacity: 1;
        }
        100% {
          transform: scale(1) translateY(-24px);
          opacity: 0;
        }
      }
      @keyframes ob-thought-burst {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(var(--dx), var(--dy)) scale(0.15);
          opacity: 0;
        }
      }
      @keyframes ob-thought-orbit {
        0% {
          transform: rotate(0deg) translateX(14px) rotate(0deg);
          opacity: 0.9;
        }
        100% {
          transform: rotate(280deg) translateX(26px) rotate(-280deg);
          opacity: 0;
        }
      }
      @keyframes ob-thought-ink {
        0% {
          width: 10px;
          height: 10px;
          opacity: 0.5;
        }
        100% {
          width: 88px;
          height: 88px;
          opacity: 0;
        }
      }
      @media (max-width: 640px) {
        .ob-click-thoughts__word {
          font-size: 16px;
        }
      }
    `}</style>
  )
}

export default ClickThoughts
