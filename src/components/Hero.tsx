import styles from './Hero.module.css'
import Button from './ui/Button'
import CodeTerminal from './ui/CodeTerminal'
import MeshGradient from './backgrounds/MeshGradient'

const DOCS = 'https://morse-docs.vercel.app'

const TERMINAL_TABS = [
  {
    label: 'TYPESCRIPT',
    language: 'typescript',
    code: `import { MorseClient } from '@morse/sdk'

const client = new MorseClient({ network: 'testnet' })

// create a publication on-chain
const pub = await client.createPublication({
  slug: 'my-blog',
  policy: 'public',
})

// publish to Walrus
await pub.publish({
  collection: 'posts',
  slug: 'hello-world',
  content: { title, body },
})`,
  },
  {
    label: 'JAVASCRIPT',
    language: 'javascript',
    code: `const { MorseClient } = require('@morse/sdk')

const client = new MorseClient({ network: 'testnet' })

// create a publication
const pub = await client.createPublication({ slug: 'my-blog' })

// publish content
await pub.publish({
  collection: 'posts',
  slug: 'hello-world',
  content,
})`,
  },
  {
    label: 'CLI',
    language: 'plaintext',
    code: `# initialise a new publication
morse init my-blog --network testnet

# create a collection schema
morse collections create posts

# publish an entry
morse publish posts/hello-world.md

# list all entries
morse entries list --pub my-blog`,
  },
]

export function Hero() {
  return (
    <section className={styles.hero}>
      <MeshGradient />

      <div className={styles.inner}>
        {/* Left col */}
        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Built on Sui and Walrus
          </div>

          <h1 className={styles.h1}>
            What if your content<br />
            <span className={styles.accent}>never broke?</span>
          </h1>

          <p className={styles.sub}>
            Morse is a decentralized CMS protocol built for permanence.
            On-chain governance. Verifiable revisions. Open protocol.
          </p>

          <div className={styles.actions}>
            <Button variant="primary" color="ultraviolet" href={`${DOCS}/quick-start.html`}>
              Start Building
            </Button>
            <Button variant="secondary" color="ultraviolet" href={`${DOCS}/index.html`}>
              Read the Docs
            </Button>
          </div>

          <div className={styles.stack}>
            <div className={styles.stackItem}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Move Smart Contracts
            </div>
            <div className={styles.stackSep} />
            <div className={styles.stackItem}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <ellipse cx="12" cy="12" rx="10" ry="4"/>
                <path d="M2 12c0 2.21 4.48 4 10 4s10-1.79 10-4"/>
                <path d="M2 12v6c0 2.21 4.48 4 10 4s10-1.79 10-4v-6"/>
              </svg>
              Walrus Storage
            </div>
            <div className={styles.stackSep} />
            <div className={styles.stackItem}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Seal Encryption
            </div>
          </div>
        </div>

        {/* Right col — terminal */}
        <div className={styles.right}>
          <CodeTerminal tabs={TERMINAL_TABS} minHeight="420px" />
        </div>
      </div>
    </section>
  )
}
