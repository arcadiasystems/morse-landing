import { DEMO_BLOG, LICENSE, QUICK_START } from '../lib/links'
import { useSmilPlayback } from '../lib/useSmilPlayback'
import { Cta } from '../ui/Button'
import { TravellingPulse } from '../ui/TravellingPulse'
import styles from './Hero.module.css'

const PARTNERS = ['Walrus Foundation', 'Sui', 'Walrus', 'Seal']

/* Signal field, drawn on a 1440×900 canvas that covers the hero. */
const PULSE_SIZES = {
  lg: { unit: 54, height: 44, from: -300, to: 1740, className: styles.pulseLg },
  sm: { unit: 34, height: 26, from: -200, to: 1700, className: styles.pulseSm },
}

const LANES: { y: number; size: keyof typeof PULSE_SIZES; duration: number; begin: number; opacity?: number }[] = [
  { y: 110, size: 'lg', duration: 11, begin: -3 },
  { y: 190, size: 'sm', duration: 15, begin: -9, opacity: 0.7 },
  { y: 270, size: 'lg', duration: 9, begin: -1 },
  { y: 350, size: 'sm', duration: 17, begin: -5, opacity: 0.6 },
  { y: 430, size: 'lg', duration: 13, begin: -7, opacity: 0.85 },
  { y: 510, size: 'sm', duration: 12, begin: -11, opacity: 0.6 },
  { y: 590, size: 'lg', duration: 10, begin: -4 },
  { y: 670, size: 'sm', duration: 16, begin: -2, opacity: 0.7 },
  { y: 750, size: 'lg', duration: 12, begin: -8, opacity: 0.85 },
  { y: 830, size: 'sm', duration: 14, begin: -6, opacity: 0.6 },
]

const NODES: [x: number, y: number][] = [
  [212, 190], [1090, 270], [640, 430], [1320, 510],
  [380, 670], [960, 750], [120, 350], [1240, 830],
]

const RIPPLES: { x: number; y: number; duration: number; begin: number }[] = [
  { x: 212, y: 190, duration: 4, begin: 0 },
  { x: 1090, y: 270, duration: 5, begin: -2 },
  { x: 960, y: 750, duration: 4.5, begin: -1 },
  { x: 380, y: 670, duration: 5.5, begin: -3 },
]

function SignalField() {
  const svgRef = useSmilPlayback()

  return (
    <svg
      ref={svgRef}
      className={styles.field}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="hero-glow" x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="hero-vignette" cx="50%" cy="48%" r="70%">
          <stop offset="0" className={styles.inkStop} stopOpacity="0" />
          <stop offset="0.65" className={styles.inkStop} stopOpacity="0.35" />
          <stop offset="1" className={styles.inkStop} stopOpacity="0.95" />
        </radialGradient>
        <linearGradient id="hero-fade-x" x1="0" x2="1">
          <stop offset="0" className={styles.inkStop} />
          <stop offset="0.12" className={styles.inkStop} stopOpacity="0" />
          <stop offset="0.88" className={styles.inkStop} stopOpacity="0" />
          <stop offset="1" className={styles.inkStop} />
        </linearGradient>
      </defs>

      <path className={styles.gridLines} d={LANES.map(lane => `M0 ${lane.y}H1440`).join('')} />

      <g className={styles.nodes}>
        {NODES.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={3} />
        ))}
      </g>

      <g filter="url(#hero-glow)">
        {LANES.map(lane => {
          const size = PULSE_SIZES[lane.size]
          return (
            <TravellingPulse
              key={lane.y}
              baseline={lane.y}
              unit={size.unit}
              height={size.height}
              from={size.from}
              to={size.to}
              duration={lane.duration}
              begin={lane.begin}
              opacity={lane.opacity}
              className={size.className}
            />
          )
        })}
      </g>

      <g className={styles.ripples}>
        {RIPPLES.map(ripple => (
          <circle key={`${ripple.x}-${ripple.y}`} cx={ripple.x} cy={ripple.y} r={6}>
            <animate
              attributeName="r"
              values="4;14;4"
              dur={`${ripple.duration}s`}
              begin={`${ripple.begin}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values=".8;0;.8"
              dur={`${ripple.duration}s`}
              begin={`${ripple.begin}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      <rect width="1440" height="900" fill="url(#hero-fade-x)" />
      <rect width="1440" height="900" fill="url(#hero-vignette)" />
    </svg>
  )
}

export function Hero() {
  return (
    <section className={`${styles.hero} on-ink`} id="top" aria-labelledby="hero-title">
      <SignalField />

      <div className={`container ${styles.content}`}>
        <p className={styles.tag}>
          <span className={styles.tagDot} aria-hidden="true" />
          <span className={styles.tagLong}>Open CMS protocol · </span>Live on Sui mainnet
        </p>
        <h1 id="hero-title" className={styles.title}>
          Content no one can take&nbsp;down.
          <br />
          <em>Not even us.</em>
        </h1>
        <p className={styles.lead}>
          Morse is an open CMS protocol on Sui and Walrus. Publish from the CLI, the SDK or your agent.
          Every entry is anchored on-chain, stored permanently, and gated by keys you hold.
        </p>
        <div className={styles.ctas}>
          <Cta tone="bone" href={QUICK_START} hint="5 min, CLI">
            Start building
          </Cta>
          <Cta tone="outline-light" href={DEMO_BLOG} hint="testnet wallet" external>
            See it live
          </Cta>
        </div>
      </div>

      <div className={styles.strip}>
        <div className={`container ${styles.stripInner}`}>
          <span className={styles.stripLabel}>Built with</span>
          {PARTNERS.map(name => (
            <span key={name} className={styles.partner}>
              {name}
            </span>
          ))}
          <a className={`${styles.stripLabel} ${styles.license}`} href={LICENSE} target="_blank" rel="noopener noreferrer">
            Open source · MIT
          </a>
        </div>
      </div>
    </section>
  )
}
