import { useState } from 'react'
import { MorseGlyphs } from '../ui/MorseGlyphs'
import { Reveal } from '../ui/Reveal'
import styles from './SignalTicker.module.css'

const ITEMS = [
  'ON-CHAIN GOVERNANCE',
  'VERIFIABLE REVISIONS',
  'WALRUS-PERMANENT',
  'SEAL-ENCRYPTED',
  'OPEN PROTOCOL',
  'AI-READABLE',
]

function TickerRow({ decorative = false }: { decorative?: boolean }) {
  return (
    <ul className={styles.row} aria-hidden={decorative ? true : undefined}>
      {ITEMS.map(item => (
        <li key={item} className={styles.item}>
          <span className={styles.label}>{item}</span>
          {/* The item's first word, as its real morse encoding in chunky ink glyphs. */}
          <MorseGlyphs word={item.split(/[\s-]+/)[0]} className={styles.morse} />
        </li>
      ))}
    </ul>
  )
}

/**
 * Full-bleed amber slab carrying the protocol's capability words on an
 * infinite marquee. Duplicate track loops via translateX(-50%); pauses on
 * hover, focus, or the visible pause control; reduced motion gets a static
 * wrapped row.
 */
export function SignalTicker() {
  const [paused, setPaused] = useState(false)

  return (
    // One-time mask wipe — sanctioned slab use of the paint-cost variant.
    <Reveal variant="mask" duration={700}>
      <section className={styles.slab} aria-label="Protocol capabilities">
        <div className={styles.marquee}>
          <div className={paused ? `${styles.track} ${styles.trackPaused}` : styles.track}>
            <TickerRow />
            <TickerRow decorative />
          </div>
        </div>
        <button
          type="button"
          className={styles.pauseButton}
          aria-label={paused ? 'Play ticker' : 'Pause ticker'}
          aria-pressed={paused}
          onClick={() => setPaused(prev => !prev)}
        >
          {paused ? (
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3 1.5v9l8-4.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <rect x="2" y="1.5" width="3" height="9" fill="currentColor" />
              <rect x="7" y="1.5" width="3" height="9" fill="currentColor" />
            </svg>
          )}
        </button>
      </section>
    </Reveal>
  )
}
