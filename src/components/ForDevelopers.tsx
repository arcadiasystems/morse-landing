import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { DOCS, QUICK_START } from '../lib/links'
import { Cta } from '../ui/Button'
import styles from './ForDevelopers.module.css'

/* Both snippets follow the published @arcadiasystems/morse-sdk and
   @arcadiasystems/morse-cli quick starts. `adapter`, `walrus` and `markdown`
   come from the SDK quick start's setup step. */
const SDK_SNIPPET = `import {
  addEntryFromBytes, createCollection,
  createPublication, morseConfig, StorageMode,
} from '@arcadiasystems/morse-sdk'

const config = morseConfig({ network: 'testnet' })

// create a publication on-chain
const { publicationId, publisherCapId } =
  await createPublication(adapter, config, {
    name: 'My Blog',
    slug: 'my-blog',
  })

// define a collection
await createCollection(adapter, config, {
  publicationId, publisherCapId,
  name: 'posts', storageMode: StorageMode.Blob,
})

// publish an entry to Walrus
await addEntryFromBytes(adapter, config, {
  walrus, publicationId, publisherCapId,
  collectionName: 'posts',
  name: 'hello-world',
  bytes: new TextEncoder().encode(markdown),
  contentType: 'text/markdown',
  upload: { epochs: 3, deletable: true },
})`

const CLI_SNIPPET = `# install
bun add -g @arcadiasystems/morse-cli

# a testnet profile and your key
morse config add testnet --network testnet
morse account import

# create a publication and a collection on Sui
morse publication create --name "My Blog" --slug my-blog
morse collection create posts

# publish a markdown file to Walrus
morse entry add hello-world --file hello.md

# give an editor a publisher capability
morse cap issue 0x9a02…

# list what is published
morse entry list`

const TABS = [
  { key: 'sdk', label: 'TypeScript', caption: 'morse-sdk · testnet', code: SDK_SNIPPET, commentPrefix: '//' },
  { key: 'cli', label: 'CLI', caption: 'morse-cli · testnet', code: CLI_SNIPPET, commentPrefix: '#' },
]

/** Splits a snippet into lines, dimming whole-line comments. */
function CodeLines({ code, commentPrefix }: { code: string; commentPrefix: string }) {
  const lines = code.split('\n')
  return lines.map((line, i) => (
    <span key={i} className={line.trimStart().startsWith(commentPrefix) ? styles.comment : undefined}>
      {line}
      {i < lines.length - 1 && '\n'}
    </span>
  ))
}

function CodePanel() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()

  /* Arrow keys move between tabs (WAI-ARIA tabs pattern, automatic activation). */
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (step === 0) return
    event.preventDefault()
    const next = (active + step + TABS.length) % TABS.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className={`${styles.code} on-ink`}>
      <div className={styles.bar}>
        <div role="tablist" aria-label="Code example" className={styles.tabs}>
          {TABS.map((tab, i) => (
            <button
              key={tab.key}
              ref={el => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.key}`}
              aria-selected={i === active}
              aria-controls={`${baseId}-panel-${tab.key}`}
              tabIndex={i === active ? 0 : -1}
              className={styles.tab}
              onClick={() => setActive(i)}
              onKeyDown={onTabKeyDown}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className={styles.caption}>{TABS[active].caption}</span>
      </div>
      <div className={styles.panels}>
        {TABS.map((tab, i) => (
          <pre
            key={tab.key}
            role="tabpanel"
            id={`${baseId}-panel-${tab.key}`}
            aria-labelledby={`${baseId}-tab-${tab.key}`}
            tabIndex={0}
            hidden={i !== active}
            className={styles.pre}
          >
            <CodeLines code={tab.code} commentPrefix={tab.commentPrefix} />
          </pre>
        ))}
      </div>
    </div>
  )
}

export function ForDevelopers() {
  return (
    <section aria-labelledby="developers-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <p className={`eyebrow ${styles.eyebrow}`}>For developers and agents</p>
          <h2 id="developers-title" className="section-title">
            Agent-first by design.
          </h2>
          <p className={styles.lead}>
            A coding agent can define collections, provision publications, publish entries and operate the
            entire backend through the CLI or SDK. No dashboard required.
          </p>
          <div className={styles.buttons}>
            <Cta tone="ink" size="md" href={QUICK_START}>
              Quick start
            </Cta>
            <Cta tone="outline-dark" size="md" href={`${DOCS}/contracts-overview.html`}>
              Contracts
            </Cta>
          </div>
          <p className={styles.note}>
            Needs Node 18+ or Bun, and a Sui address with SUI for gas and WAL for storage. Both are free on
            testnet; the quick start links the faucet.
          </p>
        </div>
        <CodePanel />
      </div>
    </section>
  )
}
