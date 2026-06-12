import { Reveal } from '../ui/Reveal'
import styles from './FailureModes.module.css'

interface FailureMode {
  index: string
  title: string
  body: string
}

const MODES: FailureMode[] = [
  {
    index: '01',
    title: 'Trust concentration',
    body: 'One vendor backend controls all identity and data. If that vendor changes pricing, policies, or shuts down, your content and permissions go with it.',
  },
  {
    index: '02',
    title: 'Weak portability',
    body: 'Publication identity and permissions are stored in proprietary systems. They don\'t travel with you. Migrating means rebuilding from scratch.',
  },
  {
    index: '03',
    title: 'Opaque history',
    body: 'Change and authorization history is hidden inside a closed system. Auditing who changed what, and when, is impossible without vendor cooperation.',
  },
]

export function FailureModes() {
  return (
    <section className="section-pad" aria-labelledby="failure-modes-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Why Morse</p>
          <h2 id="failure-modes-title" className="display-h2">
            The centralized CMS
            <br />
            fails three ways.
          </h2>
        </Reveal>

        <div className={styles.grid}>
          {MODES.map((mode, i) => (
            <Reveal key={mode.index} delay={i * 80} className={styles.col}>
              <p className={styles.index}>{mode.index}</p>
              <h3 className={styles.title}>{mode.title}</h3>
              <p className={styles.body}>{mode.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
