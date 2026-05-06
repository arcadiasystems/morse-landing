import styles from './HowItWorks.module.css'
import DeployPipeline from './illustrations/DeployPipeline'

const steps = [
  {
    num: '01',
    title: 'Define on-chain',
    desc: 'Create a Publication and its Collections in Sui Move. The contracts issue capability objects that control who can write. Every permission change is a verifiable transaction.',
    tag: 'Sui Blockchain',
  },
  {
    num: '02',
    title: 'Publish to Walrus',
    desc: 'Content payloads are written to Walrus decentralized storage. The contract stores a verifiable blob reference. Revisions are appended, never overwritten.',
    tag: 'Walrus Storage',
  },
  {
    num: '03',
    title: 'Read anywhere',
    desc: 'Off-chain indexers listen to contract events and build fast, queryable state. Serve content from your own API or use any indexer pointed at the same contracts.',
    tag: 'Open Indexer',
  },
]

export function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.label}>How it works</p>
          <h2 className={styles.h2}>Three layers, zero vendor lock-in</h2>
          <p className={styles.lead}>
            Governance lives on Sui. Content payloads live on Walrus. Reads are served by indexers
            anyone can run. Each layer is independently replaceable.
          </p>
        </div>

        <div style={{ margin: '0 auto 72px', maxWidth: '1000px' }}>
          <DeployPipeline />
        </div>

        <div className={styles.flow}>
          {steps.map((s) => (
            <div key={s.num} className={styles.step}>
              <div className={styles.stepNum}>{s.num}</div>
              <div className={styles.stepTitle}>{s.title}</div>
              <div className={styles.stepDesc}>{s.desc}</div>
              <span className={styles.stepTag}>{s.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
