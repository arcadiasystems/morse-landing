import { useEffect, useRef, useState } from 'react'
import { Cta } from '../ui/Button'
import { GitHubIcon } from '../ui/GitHubIcon'
import { MorseGlyphs } from '../ui/MorseGlyphs'
import { Reveal } from '../ui/Reveal'
import { MORSE_WORDMARK } from '../lib/morse'
import { DOCS, GITHUB } from '../lib/links'
import styles from './FinalTransmission.module.css'

const COPY_COMMAND = 'morse init my-blog'

function CopyIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

/** Giant morse encoding of "MORSE" as a faint texture behind the headline. */
function MorseBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <MorseGlyphs code={MORSE_WORDMARK} className={styles.backdropGlyphs} />
    </div>
  )
}

export function FinalTransmission() {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(COPY_COMMAND)
    } catch {
      // Clipboard unavailable (permissions / insecure context):
      // keep the command visible so it can be copied manually.
      return
    }
    setCopied(true)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section
      className={`${styles.section} hairline-top`}
      aria-labelledby="final-transmission-title"
    >
      {/* Aurora — the second sanctioned ambient zone. Base field is static;
          two layers drift slowly. Pure gradient paint, no blur. */}
      <div className={styles.aurora} aria-hidden="true">
        <span className={`${styles.auroraLayer} ${styles.driftA}`} />
        <span className={`${styles.auroraLayer} ${styles.driftB}`} />
        <span className={styles.horizon} />
      </div>
      <MorseBackdrop />
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <p className="eyebrow">Final transmission</p>
        </Reveal>
        <h2 id="final-transmission-title" className={styles.title}>
          <Reveal as="span" variant="mask" className={styles.titleLine}>
            Your content.
          </Reveal>
          <Reveal as="span" variant="mask" delay={120} className={styles.titleLine}>
            Your contracts.
          </Reveal>
        </h2>
        <Reveal delay={200}>
          <p className={styles.sub}>
            Deploy on Sui Testnet in minutes. No signup. No vendor. No lock-in.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className={styles.ctas}>
            <Cta variant="solid" href={`${DOCS}/quick-start.html`}>
              Start building
            </Cta>
            <Cta variant="ghost" href={GITHUB} external icon={<GitHubIcon size={16} />}>
              View on GitHub
            </Cta>
          </div>
        </Reveal>

        <Reveal delay={420}>
          <button
            type="button"
            className={styles.chip}
            onClick={handleCopy}
            aria-label={`Copy command: ${COPY_COMMAND}`}
          >
            <span className={styles.prompt} aria-hidden="true">
              $
            </span>
            <span className={`${styles.chipLabel} ${copied ? styles.chipCopied : ''}`}>
              {copied ? 'COPIED ✓' : COPY_COMMAND}
            </span>
            <CopyIcon />
            <span role="status" className="sr-only">
              {copied ? 'Command copied to clipboard' : ''}
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  )
}
