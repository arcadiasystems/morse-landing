import { Cta } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Terminal } from '../ui/Terminal'
import { FramePlate } from '../ui/FramePlate'
import { DOCS } from '../lib/links'
import styles from './AgentConsole.module.css'

const TS_SNIPPET = `import { MorseClient } from '@morse/sdk'

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
})`

const CLI_SNIPPET = `# initialise a new publication
morse init my-blog --network testnet

# create a collection schema
morse collections create posts

# publish an entry
morse publish posts/hello-world.md

# list all entries
morse entries list --pub my-blog`

export function AgentConsole() {
  return (
    <section
      className="section-pad hairline-top"
      aria-labelledby="agent-console-title"
    >
      <div className="container">
        <div className={styles.grid}>
          <Reveal>
            <p className="eyebrow">DEVELOPER EXPERIENCE</p>
            <h2 id="agent-console-title" className="display-h2">
              AGENT-FIRST
              <br />
              BY DESIGN.
            </h2>
            <p className="section-lead">
              A coding agent can define schemas, provision publications,
              publish entries, and operate the entire backend through the CLI
              or SDK. No dashboard required. No human in the provisioning loop.
            </p>
            <div className={styles.ctaRow}>
              <Cta variant="ghost" href={`${DOCS}/quick-start.html`}>
                VIEW QUICK START <span aria-hidden="true">→</span>
              </Cta>
            </div>
          </Reveal>

          <Reveal variant="scale" delay={120} className={styles.consoleCol}>
            <FramePlate caption="@morse/sdk — typescript + cli" tint="signal">
              <Terminal
                bare
                filename="morse@testnet"
                tabs={[
                  { label: 'TYPESCRIPT', code: TS_SNIPPET },
                  { label: 'CLI', code: CLI_SNIPPET },
                ]}
              />
            </FramePlate>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
