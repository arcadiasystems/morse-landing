import { useSmilPlayback } from '../lib/useSmilPlayback'
import { TravellingPulse } from '../ui/TravellingPulse'
import styles from './HowItWorks.module.css'

const STEPS = [
  {
    title: 'Publish',
    body: 'One command pushes markdown and metadata into the protocol. No provisioning, no vendor queue.',
    detail: 'morse entry add',
  },
  {
    title: 'Store',
    body: 'Payloads land on Walrus as immutable blobs, funded per storage epoch and renewable. Revisions append; nothing overwrites.',
    detail: 'Walrus blob + quilt',
  },
  {
    title: 'Record',
    body: 'A Move contract on Sui records every blob reference and every permission change. Permissions are objects.',
    detail: 'Sui Move contracts',
  },
  {
    title: 'Serve',
    body: 'Read through the SDK today. Indexers anyone can run, with a REST API for apps and agents, land in Q1 2027.',
    detail: 'SDK now · API Q1 2027',
  },
]

const CAPABILITIES = [
  { title: 'On-chain governance', body: 'Editor and admin permissions are Sui objects. Grant, revoke, prove.' },
  { title: 'Verifiable revisions', body: 'Every edit has an on-chain proof. No hidden changes.' },
  { title: 'Seal-gated access', body: 'Policies enforced by keys, not by promises.' },
  { title: 'AI-readable', body: 'Structured content any agent can query and operate.' },
  { title: 'One-command deploy', body: 'Contract addresses ship built in. No dashboard, no provisioning step.' },
  { title: 'Every layer replaceable', body: 'Only the Sui contracts are the source of truth.' },
]

/** The wire the four steps hang from. Stretches to the row; nodes live on the steps. */
function Wire() {
  const svgRef = useSmilPlayback()
  return (
    <svg ref={svgRef} className={styles.wireSvg} viewBox="0 0 1136 60" preserveAspectRatio="none" aria-hidden="true">
      <path className={styles.wireLine} d="M0 30H1136" vectorEffect="non-scaling-stroke" />
      <TravellingPulse
        baseline={30}
        unit={30}
        height={24}
        from={-160}
        to={1180}
        duration={7}
        className={styles.wirePulse}
        nonScalingStroke
      />
    </svg>
  )
}

export function HowItWorks() {
  return (
    <section id="how" className={`${styles.how} on-ink`} aria-labelledby="how-title">
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={`eyebrow ${styles.eyebrow}`}>How it works</p>
          <h2 id="how-title" className={`section-title ${styles.title}`}>
            Four steps. No middleman in any of them.
          </h2>
        </div>

        <div className={styles.wire}>
          <Wire />
          <ol className={styles.steps}>
            {STEPS.map((step, i) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
                <span className={styles.stepDetail}>{step.detail}</span>
              </li>
            ))}
          </ol>
        </div>

        <ul className={styles.caps}>
          {CAPABILITIES.map(cap => (
            <li key={cap.title} className={styles.cap}>
              <strong className={styles.capTitle}>{cap.title}</strong>
              <span className={styles.capBody}>{cap.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
