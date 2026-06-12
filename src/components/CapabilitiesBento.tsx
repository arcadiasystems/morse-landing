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

export function CapabilitiesBento() {
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

        <Reveal delay={80}>
          <div className={styles.grid}>
            <article className={`${styles.cell} ${styles.cellA}`}>
              <h3 className={styles.title}>ON-CHAIN GOVERNANCE</h3>
              <p className={styles.desc}>
                Version history and access control recorded on Sui. Capabilities
                are objects: grant them, revoke them, prove them.
              </p>
              <ul className={styles.ledger}>
                {LEDGER_ROWS.map(row => (
                  <li
                    key={row.hash}
                    className={`${styles.capRow} ${row.revoked ? styles.capRevoked : ''}`}
                  >
                    <span className={styles.capDot} aria-hidden="true" />
                    <span className={styles.capText}>
                      {row.name}{' '}
                      <span aria-hidden="true">{row.revoked ? '✗' : '→'}</span>{' '}
                      <span className={styles.capHash}>{row.hash}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            <article className={`${styles.cell} ${styles.cellB}`}>
              <h3 className={styles.title}>VERIFIABLE REVISIONS</h3>
              <p className={styles.desc}>
                Every edit has an on-chain proof. No hidden changes, ever.
              </p>
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
            </article>

            <article className={`${styles.cell} ${styles.cellC}`}>
              <h3 className={styles.title}>SEAL ENCRYPTION</h3>
              <p className={styles.desc}>
                Publisher and subscription access policies, enforced by keys —
                not by promises.
              </p>
            </article>

            <article className={`${styles.cell} ${styles.cellD}`}>
              <h3 className={styles.title}>AI-READABLE</h3>
              <p className={styles.desc}>
                Structured content any agent can query over an open REST
                surface.
              </p>
              <pre className={styles.json}>{'{ "slug": "hello-world",\n  "verified": true }'}</pre>
            </article>

            <article className={`${styles.cell} ${styles.cellE}`}>
              <h3 className={styles.title}>ONE-COMMAND DEPLOY</h3>
              <code className={styles.chip}>
                <span className={styles.chipPrompt} aria-hidden="true">
                  $
                </span>{' '}
                morse publish ./content
              </code>
              <p className={styles.desc}>That's it. No config files.</p>
            </article>

            <article className={`${styles.cell} ${styles.cellF}`}>
              <div>
                <h3 className={styles.title}>OPEN PROTOCOL</h3>
                <p className={styles.desc}>
                  No vendor lock-in. Self-host every layer or use the network.
                  The contracts are the only source of truth.
                </p>
              </div>
              <a className={styles.entriesLink} href={`${DOCS}/entries.html`}>
                READ ABOUT ENTRIES{' '}
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </a>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
