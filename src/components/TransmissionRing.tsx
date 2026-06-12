import { useEffect, useRef, useState, type ReactElement } from 'react'
import { toMorse } from '../lib/morse'
import { MorseGlyphs } from '../ui/MorseGlyphs'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import styles from './TransmissionRing.module.css'

/** viewBox geometry — the box scales, ratios hold. */
const SIZE = 560
const C = SIZE / 2
const RADII = [150, 210, 270] as const

/**
 * Morse code as stroke-dasharray: dot→4px draw, dash→14px draw, 6px gaps,
 * letter boundaries widened — the arcs literally carry the word's rhythm.
 */
function morseDashArray(word: string): string {
  const segments: number[] = []
  for (const symbol of toMorse(word)) {
    if (symbol === '-') segments.push(14, 6)
    else if (symbol === '.') segments.push(4, 6)
    else if (segments.length > 0) segments[segments.length - 1] += 8
  }
  return segments.join(' ')
}

const DASHES = morseDashArray('MORSE')

interface Chip {
  label: string
  sublabel: string
  /** Position on the ring, % of container. */
  x: number
  y: number
  /** Ambient float — budget allows two floating chips, the third sits still. */
  float: boolean
  icon: ReactElement
}

const ICON_PROPS = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

const CHIPS: Chip[] = [
  {
    label: 'SUI',
    sublabel: 'MOVE CONTRACTS',
    x: 82,
    y: 22,
    float: true,
    icon: (
      // Droplet — Sui mark shape
      <svg {...ICON_PROPS} aria-hidden="true">
        <path d="M12 3c3.5 4.2 6 7.1 6 10.2a6 6 0 0 1-12 0C6 10.1 8.5 7.2 12 3Z" />
      </svg>
    ),
  },
  {
    label: 'WALRUS',
    sublabel: 'BLOB STORAGE',
    x: 8,
    y: 50,
    float: false,
    icon: (
      // Stacked layers — distributed storage
      <svg {...ICON_PROPS} aria-hidden="true">
        <ellipse cx="12" cy="6.5" rx="7.5" ry="3" />
        <path d="M4.5 6.5v5.5c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6.5" />
        <path d="M4.5 12v5.5c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V12" />
      </svg>
    ),
  },
  {
    label: 'SEAL',
    sublabel: 'ENCRYPTION',
    x: 76,
    y: 78,
    float: true,
    icon: (
      // Padlock
      <svg {...ICON_PROPS} aria-hidden="true">
        <rect x="5.5" y="10.5" width="13" height="9.5" rx="1.5" />
        <path d="M8.5 10.5V7.75a3.5 3.5 0 0 1 7 0v2.75" />
        <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

interface TransmissionRingProps {
  /** Hero headline decode finished — gates the chip entrance. */
  decodeDone: boolean
}

/**
 * Hero centerpiece: a radial telegraph dial of the real stack. Concentric
 * arcs whose dash rhythm spells MORSE, two travelling signal dots (rotating
 * wrappers — transform-only, scales with the container), a pulsing beacon,
 * and the three protocol chips. Pauses off-viewport; reduced motion renders
 * the final lit state. Decorative throughout — described for AT by the
 * preceding sr-only sentence.
 */
export function TransmissionRing({ decodeDone }: TransmissionRingProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.1,
    })
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const animate = !reduced && inView
  const chipsLive = reduced || decodeDone

  return (
    <>
      <p className="sr-only">
        Diagram: Morse coordinates Sui contracts, Walrus storage, and Seal encryption around one
        protocol core.
      </p>
      <div
        ref={ref}
        className={[styles.ring, animate ? styles.animate : '', chipsLive ? styles.chipsLive : '']
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      >
        <svg className={styles.arcs} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
          <circle cx={C} cy={C} r={RADII[0]} className={styles.arcInner} strokeDasharray={DASHES} />
          <circle cx={C} cy={C} r={RADII[1]} className={styles.arcMid} strokeDasharray={DASHES} />
          {/* Outer arc: 270° sweep for asymmetry, open toward bottom-left. */}
          <path
            d={`M ${C} ${C - RADII[2]} A ${RADII[2]} ${RADII[2]} 0 1 1 ${C - RADII[2]} ${C}`}
            className={styles.arcOuter}
            strokeDasharray={DASHES}
          />
        </svg>

        {/* Travelling signal dots — wrapper rotates about center, dot rides the ring. */}
        <span className={`${styles.orbit} ${styles.orbitMid}`}>
          <span className={styles.traveller} />
        </span>
        <span className={`${styles.orbit} ${styles.orbitOuter}`}>
          <span className={styles.traveller} />
        </span>

        <div className={styles.beaconWrap}>
          <span className={styles.beaconHalo} />
          <div className={`${styles.beacon} border-glow`}>
            <MorseGlyphs code="--" className={styles.beaconGlyphs} />
            <span className={styles.beaconLabel}>MORSE</span>
          </div>
        </div>

        <div className={styles.chipLayer}>
          {CHIPS.map((chip, i) => (
            <div
              key={chip.label}
              className={[
                styles.chip,
                'border-glow-soft',
                chip.float ? styles.chipFloat : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{
                left: `${chip.x}%`,
                top: `${chip.y}%`,
                transitionDelay: `${i * 120}ms`,
                animationDelay: `${i * 2300}ms`,
              }}
            >
              <span className={styles.chipIcon}>{chip.icon}</span>
              <span className={styles.chipText}>
                <span className={styles.chipLabel}>{chip.label}</span>
                <span className={styles.chipSub}>{chip.sublabel}</span>
              </span>
            </div>
          ))}
        </div>

        <div className={styles.dome}>
          <svg className={styles.domeArc} viewBox="0 0 560 80" fill="none" preserveAspectRatio="none">
            <path d="M 0 80 Q 280 -40 560 80" />
          </svg>
        </div>

        <span className={`${styles.streak} ${styles.streakA}`} />
        <span className={`${styles.streak} ${styles.streakB}`} />
        <span className={`${styles.streak} ${styles.streakC}`} />
      </div>
    </>
  )
}
