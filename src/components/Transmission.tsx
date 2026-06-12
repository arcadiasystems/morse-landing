import { Reveal } from '../ui/Reveal'
import styles from './Transmission.module.css'

interface Step {
  numeral: string
  title: string
  desc: string
  tag: string
}

const STEPS: Step[] = [
  {
    numeral: '01',
    title: 'PUBLISH',
    desc: 'One command pushes markdown, schemas, and metadata into the protocol. No provisioning. No vendor queue.',
    tag: 'morse publish',
  },
  {
    numeral: '02',
    title: 'STORE',
    desc: 'Payloads land on Walrus as immutable blobs. Revisions append; nothing overwrites, nothing disappears.',
    tag: 'walrus.store()',
  },
  {
    numeral: '03',
    title: 'VERIFY',
    desc: 'A Move contract on Sui records every blob reference and capability change. Every permission is on-chain.',
    tag: 'sui.record()',
  },
  {
    numeral: '04',
    title: 'SERVE',
    desc: 'Indexers anyone can run watch contract events and serve fast, queryable state — to your app or any agent.',
    tag: 'morse.network/api',
  },
]

/** Center of step i on the signal path, as a percentage of its width. */
const nodeLeft = (i: number) => `${(100 / STEPS.length) * (i + 0.5)}%`

/**
 * §4 — the four-step protocol walk. Signal path (hairline + 4 amber nodes +
 * travelling dash) above a 4-col gap-as-border grid of step cells.
 */
export function Transmission() {
  return (
    <section id="protocol" className="section-pad" aria-labelledby="protocol-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">THE PROTOCOL</p>
          <h2 id="protocol-title" className="display-h2">
            FOUR STEPS.
            <br />
            NO MIDDLEMAN.
          </h2>
          <p className="section-lead">
            Each step is independently verifiable, deterministically reproducible, and runs on
            infrastructure anyone can host.
          </p>
        </Reveal>

        <div className={styles.path} aria-hidden="true">
          {STEPS.map((step, i) => (
            <span key={step.numeral} className={styles.node} style={{ left: nodeLeft(i) }} />
          ))}
          <span className={styles.runner} />
        </div>

        <ol className={styles.grid}>
          {STEPS.map((step, i) => (
            <li key={step.numeral} className={styles.cellSlot}>
              <Reveal delay={i * 80} className={styles.cell}>
                <span className={styles.numeral} aria-hidden="true">
                  {step.numeral}
                </span>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.desc}>{step.desc}</p>
                <code className={styles.tag}>{step.tag}</code>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
