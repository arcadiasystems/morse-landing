import styles from './CodeSection.module.css'
import Button from './ui/Button'
import CodeTerminal from './ui/CodeTerminal'

const DOCS = 'https://morse-docs.vercel.app'

const TABS = [
  {
    label: 'PUBLISH.TS',
    language: 'typescript',
    code: `import { MorseClient } from '@morse/sdk'

const client = new MorseClient({ network: 'testnet' })

// create a publication on-chain
const pub = await client.createPublication({
  slug: 'my-blog',
  policy: 'public',
})

// define a collection schema
await pub.createCollection({ name: 'posts' })

// publish an entry to Walrus
await pub.publish({
  collection: 'posts',
  slug: 'hello-world',
  content: { title: 'Hello World', body },
})`,
  },
]

export function CodeSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.text}>
            <p className={styles.label}>Developer Experience</p>
            <h2 className={styles.h2}>Agent-first by design</h2>
            <p className={styles.lead}>
              A coding agent can define content structures, provision publications, publish entries,
              and operate the entire backend via CLI or SDK without waiting for centralized provisioning.
            </p>
            <Button
              variant="ghost"
              color="off-white"
              href={`${DOCS}/quick-start.html`}
              icon={
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              }
            >
              View Quick Start
            </Button>
          </div>

          <div>
            <CodeTerminal tabs={TABS} minHeight="420px" />
          </div>
        </div>
      </div>
    </section>
  )
}
