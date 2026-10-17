import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { DOCS, LLMS_TXT, QUICK_START, UPLOADER_NPM } from '../lib/links'
import { Cta } from '../ui/Button'
import styles from './ForDevelopers.module.css'

/* Both snippets follow the published @arcadiasystems/morse-sdk and
   @arcadiasystems/morse-cli quick starts. `adapter`, `walrus` and `markdown`
   come from the SDK quick start's setup step. */
const SDK_SNIPPET = `import {
  addEntryFromBytes, createCollection,
  createPublication, morseConfig, StorageMode,
} from '@arcadiasystems/morse-sdk'

// Walrus Mainnet: morseConfig({ network: 'mainnet' })
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

const CLI_INSTALL = 'bun add -g @arcadiasystems/morse-cli'

const CLI_SNIPPET = `# a testnet profile and your key
# Walrus Mainnet: morse config add mainnet --network mainnet
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

interface CodeTab {
  key: string
  label: string
  caption: string
  code: string
  commentPrefix: string
  /** Shown above the code with a copy button. */
  install?: string
}

const TABS: CodeTab[] = [
  {
    key: 'sdk',
    label: 'TypeScript',
    caption: 'morse-sdk · testnet',
    code: SDK_SNIPPET,
    commentPrefix: '//',
  },
  {
    key: 'cli',
    label: 'CLI',
    caption: 'morse-cli · testnet',
    code: CLI_SNIPPET,
    commentPrefix: '#',
    install: CLI_INSTALL,
  },
]

type CopyResult = 'idle' | 'copied' | 'selected'

const COPY_LABEL: Record<CopyResult, string> = { idle: 'Copy', copied: 'Copied', selected: 'Selected' }

const COPY_ANNOUNCEMENT: Record<CopyResult, string> = {
  idle: '',
  copied: 'Install command copied.',
  selected: 'Copying is blocked here, so the install command is selected. Copy it with your keyboard.',
}

/** How long the button shows a result before it resets. */
const COPY_RESULT_MS = 2000

/** 14px stroke icon for the copy button, drawn in currentColor. */
function ButtonIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      className={styles.copyIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const COPY_ICON = (
  <ButtonIcon>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </ButtonIcon>
)

const CHECK_ICON = (
  <ButtonIcon>
    <path d="M4 12.5l5 5L20 6.5" />
  </ButtonIcon>
)

/** The install command with a copy button, pinned above a snippet. */
function InstallCommand({ command }: { command: string }) {
  const [result, setResult] = useState<CopyResult>('idle')
  const commandRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (result === 'idle') return
    const timer = window.setTimeout(() => setResult('idle'), COPY_RESULT_MS)
    return () => window.clearTimeout(timer)
  }, [result])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setResult('copied')
    } catch {
      /* No clipboard access (insecure context or denied permission):
         select the command so a keyboard copy picks it up. */
      if (commandRef.current) window.getSelection()?.selectAllChildren(commandRef.current)
      setResult('selected')
    }
  }

  return (
    <div className={styles.install}>
      <code className={styles.command}>
        <span className={styles.prompt} aria-hidden="true">
          {'$ '}
        </span>
        <span ref={commandRef}>{command}</span>
      </code>
      <button
        type="button"
        className={styles.copy}
        data-result={result}
        aria-label="Copy install command"
        onClick={copy}
      >
        {result === 'copied' ? CHECK_ICON : COPY_ICON}
        <span className={styles.copyLabel}>{COPY_LABEL[result]}</span>
      </button>
      <span role="status" className="sr-only">
        {COPY_ANNOUNCEMENT[result]}
      </span>
    </div>
  )
}

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
          <div
            key={tab.key}
            role="tabpanel"
            id={`${baseId}-panel-${tab.key}`}
            aria-labelledby={`${baseId}-tab-${tab.key}`}
            tabIndex={0}
            hidden={i !== active}
            className={styles.panel}
          >
            {tab.install && <InstallCommand command={tab.install} />}
            <pre className={styles.pre}>
              <CodeLines code={tab.code} commentPrefix={tab.commentPrefix} />
            </pre>
          </div>
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
            entire backend through the CLI or SDK. No dashboard required. Point yours at{' '}
            <a className={styles.inlineLink} href={LLMS_TXT}>
              llms.txt
            </a>
            , the docs index written for agents. For web apps,{' '}
            <a className={styles.inlineLink} href={UPLOADER_NPM} target="_blank" rel="noopener noreferrer">
              @arcadiasystems/morse-uploader
            </a>{' '}
            adds drop-in React upload components.
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
            testnet; the quick start links the faucet. On Walrus Mainnet they cost real money, and the
            contracts are unaudited.
          </p>
        </div>
        <CodePanel />
      </div>
    </section>
  )
}
