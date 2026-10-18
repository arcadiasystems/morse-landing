import { DEMO_BLOG } from '../lib/links'
import { Cta } from '../ui/Button'
import styles from './LiveDemo.module.css'

const STEPS = [
  { title: 'Install a Sui wallet', body: 'Slush or Suiet, browser extension, two minutes.' },
  { title: 'Get testnet SUI from the faucet', body: 'Free. Linked from the demo and the quick start.' },
  { title: 'Connect and publish your first post', body: 'Your post, its Walrus blob and its Sui record, in under a minute.' },
]

export function LiveDemo() {
  return (
    <section className={styles.live} aria-labelledby="live-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <p className={`eyebrow ${styles.eyebrow}`}>See it live</p>
          <h2 id="live-title" className="section-title">
            A blog you actually own. On testnet, now.
          </h2>
          <p className={styles.lead}>
            The demo blog runs on the Morse SDK: wallet-native, Walrus-stored, with Seal-gated premium posts.
            Connect, publish a post, and watch its record land on Sui.
          </p>
          <div className={styles.cta}>
            <Cta tone="ultra" size="md" href={DEMO_BLOG} external>
              Open the demo blog
            </Cta>
          </div>
          <p className={styles.note}>
            Testnet data may reset. For content you mean to keep, publish on Walrus Mainnet, where storage is
            funded per epoch and renewable.
          </p>
        </div>

        <ol className={styles.steps}>
          {STEPS.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNumber} aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <strong className={styles.stepTitle}>{step.title}</strong>
                <span className={styles.stepBody}>{step.body}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
