import { GITHUB } from '../lib/links'
import styles from './Roadmap.module.css'

type Status = 'live' | 'building' | 'planned' | 'proposed'

interface Milestone {
  when: string
  title: string
  detail: string
  status: Status
}

const MILESTONES: Milestone[] = [
  {
    when: 'Now',
    title: 'Protocol on Sui mainnet and testnet',
    detail: 'Move contracts, Walrus storage, Seal policies, CLI, SDK beta, demo blog on testnet',
    status: 'live',
  },
  {
    when: 'Q4 2026',
    title: 'SDK 1.0 and stable CLI',
    detail: 'Typed client, documented contracts, agent-ready command surface',
    status: 'building',
  },
  {
    when: 'Q4 2026',
    title: 'Receipts: a public verify page for any entry',
    detail: 'Open a link, see the record, the revision history and the Sui and Walrus proofs. No account, no wallet',
    status: 'planned',
  },
  {
    when: 'Nov 2026',
    title: 'Walrus Sessions 9, built on Morse',
    detail: 'An online hackathon with the Walrus Foundation: agents that remember with Walrus Memory and prove with Morse',
    status: 'proposed',
  },
  {
    when: 'Q1 2027',
    title: 'Indexer and hosted content API',
    detail: 'Event-driven read layer anyone can run, REST surface for apps and agents',
    status: 'planned',
  },
  {
    when: 'Q1 2027',
    title: 'Publish without a wallet',
    detail: 'Hosted path with sponsored gas and email or GitHub sign-in. Ownership transfers to your wallet when you connect one',
    status: 'planned',
  },
]

export function Roadmap() {
  return (
    <section id="roadmap" className={`${styles.road} on-ink`} aria-labelledby="roadmap-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <div>
            <p className={`eyebrow ${styles.eyebrow}`}>Upcoming</p>
            <h2 id="roadmap-title" className={`section-title ${styles.title}`}>
              What ships next, and when.
            </h2>
          </div>
          <p className={styles.headNote}>
            Dates are targets, updated as they move. The{' '}
            <a className={styles.inlineLink} href={GITHUB} target="_blank" rel="noopener noreferrer">
              GitHub repository
            </a>{' '}
            is the source of truth for what is shipped.
          </p>
        </div>

        <ol className={styles.list}>
          {MILESTONES.map(item => (
            <li key={item.title} className={styles.row}>
              <span className={item.status === 'live' ? `${styles.when} ${styles.now}` : styles.when}>
                {item.when}
              </span>
              <div>
                <strong className={styles.rowTitle}>{item.title}</strong>
                <span className={styles.rowDetail}>{item.detail}</span>
              </div>
              <span className={item.status === 'live' ? `${styles.status} ${styles.statusLive}` : styles.status}>
                {item.status}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
