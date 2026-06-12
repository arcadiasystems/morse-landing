import { useEffect, useState, type CSSProperties } from 'react'
import { Cta } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { charToMorse } from '../lib/morse'
import { DOCS } from '../lib/links'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import { TransmissionRing } from './TransmissionRing'
import styles from './SignalHero.module.css'

const HEADLINE = ['CONTENT,', 'TRANSMITTED', 'FOREVER.'] as const

const LINE_OFFSETS = HEADLINE.map((_, i) =>
  HEADLINE.slice(0, i).reduce((total, line) => total + line.length, 0),
)

const TOTAL_CHARS = HEADLINE.reduce((total, line) => total + line.length, 0)

const DECODE_STEP_MS = 30

/** '.'/'-' codes as typographic dots and dashes for the decode overlay. */
const toGlyphs = (code: string) => code.replace(/\./g, '·').replace(/-/g, '−')

/**
 * Ticks decoded-character count 0→total left-to-right on mount.
 * Single interval, cleaned up on unmount; reduced motion derives to done.
 */
function useDecodeProgress(total: number, stepMs: number, reduced: boolean): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reduced) return
    let current = 0
    const id = window.setInterval(() => {
      current += 1
      setCount(current)
      if (current >= total) window.clearInterval(id)
    }, stepMs)
    return () => window.clearInterval(id)
  }, [total, stepMs, reduced])

  return reduced ? total : count
}

export function SignalHero() {
  const reduced = usePrefersReducedMotion()
  const decoded = useDecodeProgress(TOTAL_CHARS, DECODE_STEP_MS, reduced)
  const done = decoded >= TOTAL_CHARS

  return (
    <section
      className={`${styles.hero} glow-field`}
      style={{ '--glow-x': '72%', '--glow-y': '30%' } as CSSProperties}
      aria-labelledby="hero-title"
    >
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="eyebrow">TRANSMISSION 001 — DECENTRALIZED CMS PROTOCOL</p>

          <h1 id="hero-title" className={styles.title}>
            <span className="sr-only">Content, transmitted forever.</span>
            <span aria-hidden="true">
              {HEADLINE.map((line, lineIndex) => {
                const content = done
                  ? line
                  : line.split('').map((char, charIndex) => {
                      const code = charToMorse(char)
                      const isDecoded = !code || LINE_OFFSETS[lineIndex] + charIndex < decoded
                      return (
                        <span key={charIndex} className={styles.char}>
                          <span className={isDecoded ? undefined : styles.charPending}>
                            {char}
                          </span>
                          {!isDecoded && (
                            <span className={styles.charMorse}>{toGlyphs(code)}</span>
                          )}
                        </span>
                      )
                    })
                return (
                  <span key={line} className={styles.titleLine}>
                    {/* The boxed word lights up once its decode completes. */}
                    {lineIndex === 1 ? (
                      <span className={`${styles.boxedWord} ${done ? styles.boxedWordLit : ''}`}>
                        {content}
                      </span>
                    ) : (
                      content
                    )}
                  </span>
                )
              })}
            </span>
          </h1>

          <div className={styles.wave} aria-hidden="true">
            <span className={styles.wavePulse} />
          </div>

          <p className={styles.sub}>
            Morse is an open CMS protocol. Entries anchored on Sui. Payloads stored on Walrus.
            Every revision carries an on-chain proof — no vendor in the loop.
          </p>

          <div className={styles.ctas}>
            <Cta variant="solid" href={`${DOCS}/quick-start.html`}>
              START BUILDING
            </Cta>
            <Cta variant="ghost" href={`${DOCS}/core-concepts.html`}>
              READ THE PROTOCOL
            </Cta>
          </div>

          <p className={styles.stackLine}>
            MOVE CONTRACTS
            <span className={styles.middot} aria-hidden="true">
              ·
            </span>
            WALRUS STORAGE
            <span className={styles.middot} aria-hidden="true">
              ·
            </span>
            SEAL ENCRYPTION
          </p>
        </div>

        <Reveal variant="scale" delay={150}>
          <TransmissionRing decodeDone={done} />
        </Reveal>
      </div>
    </section>
  )
}
