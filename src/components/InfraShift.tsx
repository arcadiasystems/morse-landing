import { Reveal } from '../ui/Reveal'
import styles from './InfraShift.module.css'

const HEADING_ID = 'infra-shift-heading'

type Era = 'legacy' | 'vercel' | 'morse'

interface LedgerColumn {
  era: Era
  title: string
  tag: string
  rows: string[]
}

const GLYPHS: Record<Era, string> = {
  legacy: '✕',
  vercel: '–',
  morse: '✓',
}

const COLUMNS: LedgerColumn[] = [
  {
    era: 'legacy',
    title: 'LEGACY CMS',
    tag: '2005 →',
    rows: [
      'Single host, single point of failure',
      'Per-seat licensing, vendor lock',
      'Manual backups, opaque revisions',
      'Plugin-driven attack surface',
      'Invisible to AI agents',
    ],
  },
  {
    era: 'vercel',
    title: 'VERCEL-ERA',
    tag: '2018 →',
    rows: [
      'Edge-deployed, CDN-backed',
      'API-first headless content',
      'Vendor still owns the data',
      'Mutable history, no proofs',
      'AI-readable via REST, not by default',
    ],
  },
  {
    era: 'morse',
    title: 'MORSE',
    tag: 'NOW',
    rows: [
      'Walrus-permanent, host-independent',
      'Open protocol — no vendor, no lock-in',
      'On-chain governance, verifiable revisions',
      'Move contracts as the security boundary',
      'AI-native, readable by any agent',
    ],
  },
]

export function InfraShift() {
  return (
    <section aria-labelledby={HEADING_ID}>
      <div className="container section-pad">
        <Reveal>
          <p className="eyebrow">THE SHIFT</p>
          <h2 id={HEADING_ID} className="display-h2">
            LEGACY DIES.
            <br />
            PROTOCOLS DON'T.
          </h2>
          <p className="section-lead">
            Morse does for content what Vercel did for deployment — makes it
            invisible, instant, developer-first. Then it removes the vendor.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className={styles.ledger}>
            {COLUMNS.map(col => (
              <div key={col.era} className={`${styles.column} ${styles[col.era]}`}>
                <header className={styles.head}>
                  <h3 className={styles.colTitle}>{col.title}</h3>
                  <span
                    className={
                      col.era === 'morse' ? `mono-stamp ${styles.tagStamp}` : styles.tag
                    }
                  >
                    {col.tag}
                  </span>
                </header>
                <ul className={styles.rows}>
                  {col.rows.map(row => (
                    <li key={row} className={styles.row}>
                      <span className={styles.glyph} aria-hidden="true">
                        {GLYPHS[col.era]}
                      </span>
                      {row}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
