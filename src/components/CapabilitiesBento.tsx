import type { ReactElement } from 'react'
import { Reveal } from '../ui/Reveal'
import { DOCS } from '../lib/links'
import styles from './CapabilitiesBento.module.css'

const HEADING_ID = 'capabilities-heading'

interface CapabilityRow {
  name: string
  hash: string
  revoked: boolean
}

const LEDGER_ROWS: CapabilityRow[] = [
  { name: 'EditorCap', hash: '0x7be4…', revoked: false },
  { name: 'AdminCap', hash: '0x21ff…', revoked: false },
  { name: 'revoked', hash: '0x9a02…', revoked: true },
]

const REVISIONS = ['0041', '0042', '0043']

const ICON_PROPS = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

const ICONS: Record<string, ReactElement> = {
  governance: (
    // Key — capabilities are objects you grant and revoke
    <svg {...ICON_PROPS}>
      <circle cx="8" cy="8" r="4.5" />
      <path d="M11.5 11.5 20 20M16.5 16.5l2.5-2.5M13.5 13.5l2.5-2.5" />
    </svg>
  ),
  revisions: (
    // Branching history
    <svg {...ICON_PROPS}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <path d="M6 8.5v7M8.2 6.8c4 1.2 7 2.6 7.3 4.4M8.2 17.2c4-1.2 7-2.6 7.3-4.4" />
    </svg>
  ),
  seal: (
    // Padlock
    <svg {...ICON_PROPS}>
      <rect x="5.5" y="10.5" width="13" height="9.5" rx="1.5" />
      <path d="M8.5 10.5V7.75a3.5 3.5 0 0 1 7 0v2.75" />
    </svg>
  ),
  ai: (
    // Braces — structured, queryable
    <svg {...ICON_PROPS}>
      <path d="M8.5 4C6.5 4 6.5 6 6.5 7.5S6.5 11 4.5 12c2 1 2 3 2 4.5S6.5 20 8.5 20" />
      <path d="M15.5 4c2 0 2 2 2 3.5s0 3.5 2 4.5c-2 1-2 3-2 4.5s0 3.5-2 3.5" />
    </svg>
  ),
  deploy: (
    // Terminal prompt
    <svg {...ICON_PROPS}>
      <path d="M5 7l5 5-5 5M12.5 17H19" />
    </svg>
  ),
  open: (
    // Open ring — no lock-in
    <svg {...ICON_PROPS}>
      <path d="M19.5 12a7.5 7.5 0 1 1-3-6" />
      <path d="M19.5 4.5V8h-3.5" />
    </svg>
  ),
}

interface CellChrome {
  /** Grid-placement slot class — lives on the Reveal wrapper. */
  slot: string
  /** Layout class for the article itself (cellF is a row). */
  layout?: string
  icon: ReactElement
  /** Sanctioned temperatures only — see brand.md accent-temperature rule. */
  wash: 'signal' | 'verified' | 'paper' | 'none'
}

function cellClass(chrome: CellChrome): string {
  const washClass = {
    signal: styles.washSignal,
    verified: styles.washVerified,
    paper: styles.washPaper,
    none: '',
  }[chrome.wash]
  return [styles.cell, chrome.layout, washClass].filter(Boolean).join(' ')
}

export function CapabilitiesBento() {
  const cells: Array<{ chrome: CellChrome; body: ReactElement }> = [
    {
      chrome: { slot: styles.slotA, icon: ICONS.governance, wash: 'signal' },
      body: (
        <>
          <h3 className={styles.title}>ON-CHAIN GOVERNANCE</h3>
          <p className={styles.desc}>
            Version history and access control recorded on Sui. Capabilities are objects: grant
            them, revoke them, prove them.
          </p>
          <ul className={styles.ledger}>
            {LEDGER_ROWS.map(row => (
              <li
                key={row.hash}
                className={`${styles.capRow} ${row.revoked ? styles.capRevoked : ''}`}
              >
                <span className={styles.capDot} aria-hidden="true" />
                <span className={styles.capText}>
                  {row.name} <span aria-hidden="true">{row.revoked ? '✗' : '→'}</span>{' '}
                  <span className={styles.capHash}>{row.hash}</span>
                </span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      // The verification cell — the one sanctioned verified-green wash.
      chrome: { slot: styles.slotB, icon: ICONS.revisions, wash: 'verified' },
      body: (
        <>
          <h3 className={styles.title}>VERIFIABLE REVISIONS</h3>
          <p className={styles.desc}>Every edit has an on-chain proof. No hidden changes, ever.</p>
          <div className={styles.timeline} aria-hidden="true">
            {REVISIONS.map((rev, i) => (
              <span key={rev} className={styles.tlNode}>
                <span
                  className={`${styles.tlDot} ${
                    i === REVISIONS.length - 1 ? styles.tlDotLatest : ''
                  }`}
                />
                <span className={styles.tlRev}>{rev}</span>
              </span>
            ))}
          </div>
        </>
      ),
    },
    {
      chrome: { slot: styles.slotC, icon: ICONS.seal, wash: 'signal' },
      body: (
        <>
          <h3 className={styles.title}>SEAL ENCRYPTION</h3>
          <p className={styles.desc}>
            Publisher and subscription access policies, enforced by keys — not by promises.
          </p>
        </>
      ),
    },
    {
      chrome: { slot: styles.slotD, icon: ICONS.ai, wash: 'paper' },
      body: (
        <>
          <h3 className={styles.title}>AI-READABLE</h3>
          <p className={styles.desc}>
            Structured content any agent can query over an open REST surface.
          </p>
          <pre className={styles.json}>{'{ "slug": "hello-world",\n  "verified": true }'}</pre>
        </>
      ),
    },
    {
      chrome: { slot: styles.slotE, icon: ICONS.deploy, wash: 'signal' },
      body: (
        <>
          <h3 className={styles.title}>ONE-COMMAND DEPLOY</h3>
          <code className={styles.chip}>
            <span className={styles.chipPrompt} aria-hidden="true">
              $
            </span>{' '}
            morse publish ./content
          </code>
          <p className={styles.desc}>That's it. No config files.</p>
        </>
      ),
    },
    {
      chrome: { slot: styles.slotF, layout: styles.cellRow, icon: ICONS.open, wash: 'none' },
      body: (
        <>
          <div>
            <h3 className={styles.title}>OPEN PROTOCOL</h3>
            <p className={styles.desc}>
              No vendor lock-in. Self-host every layer or use the network. The contracts are the
              only source of truth.
            </p>
          </div>
          <a className={styles.entriesLink} href={`${DOCS}/entries.html`}>
            READ ABOUT ENTRIES{' '}
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </a>
        </>
      ),
    },
  ]

  return (
    <section className="hairline-top" aria-labelledby={HEADING_ID}>
      <div className="container section-pad">
        <Reveal>
          <p className="eyebrow">CAPABILITIES</p>
          <h2 id={HEADING_ID} className="display-h2">
            BUILT FOR PERMANENCE,
            <br />
            NOT PLATFORMS.
          </h2>
        </Reveal>

        <div className={styles.grid}>
          {cells.map(({ chrome, body }, i) => (
            <Reveal key={chrome.slot} variant="scale" delay={i * 60} className={chrome.slot}>
              <article className={cellClass(chrome)}>
                <span className={`${styles.iconTile} border-glow-soft`} aria-hidden="true">
                  {chrome.icon}
                </span>
                {body}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
