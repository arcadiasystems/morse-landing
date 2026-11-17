import { useId, useRef, useState, type KeyboardEvent } from 'react'

/* Both snippets are verified against the published packages: every CLI
   command and flag against `morse <command> --help` on morse-cli 0.13.0, and
   the TypeScript type-checked with `tsc --strict` against morse-sdk 0.11.0
   and its pinned peers. Re-check them before changing a line, and keep
   every line to 57 characters so nothing is cut off on desktop. */
const CLI_SNIPPET = `# install the CLI
npm i -g @arcadiasystems/morse-cli

# a profile and a key. testnet is the default, and free
morse config add testnet --network testnet
morse account import

# a publication (slugs are global: pick your own)
morse publication create --name "Field Notes" \\
  --slug field-notes
morse collection create posts

# publish: bytes to Walrus, record to Sui
morse entry add hello --file post.md

# read it back, checked against Walrus storage nodes
morse entry read <entry-id>`

const SDK_SNIPPET = `// npm i @arcadiasystems/morse-sdk @mysten/sui@2.38.0 \\
//   @mysten/walrus@1.2.37 @mysten/seal@1.5.2
import { SuiGrpcClient } from "@mysten/sui/grpc";
import { Ed25519Keypair }
  from "@mysten/sui/keypairs/ed25519";
import {
  KeypairAdapter, morseConfig, StorageMode,
  createPublication, createCollection, addEntryFromBytes,
  DefaultWalrusWriteAdapter,
} from "@arcadiasystems/morse-sdk";

// testnet first: on mainnet, SUI and WAL are real money
const config = morseConfig({ network: "testnet" });
const client = new SuiGrpcClient({
  network: "testnet", baseUrl: config.rpcUrl,
});
const keypair = Ed25519Keypair.fromSecretKey(privateKey);
const adapter = new KeypairAdapter(keypair, client);

// a publication you own, and a collection in it
const pub = await createPublication(adapter, config, {
  name: "Field Notes", slug: \`field-notes-\${Date.now()}\`,
});
const ids = {
  publicationId: pub.publicationId,
  publisherCapId: pub.publisherCapId,
};
await createCollection(adapter, config, {
  ...ids, name: "posts", storageMode: StorageMode.Blob,
});

// bytes to Walrus, record to Sui
const walrus = DefaultWalrusWriteAdapter.fromConfig(
  { network: "testnet", suiClient: client }, keypair,
);
const entry = await addEntryFromBytes(adapter, config, {
  ...ids, walrus, collectionName: "posts", name: "hello",
  bytes: new TextEncoder().encode("hello world"),
  contentType: "text/plain",
  upload: { epochs: 3, deletable: true },
});
// entry.entryId and entry.digest: the start of a receipt`

interface CodeTab {
  key: string
  label: string
  code: string
  commentPrefix: string
}

/* The CLI tab leads: it is the five-minute path the headline promises. */
const TABS: CodeTab[] = [
  { key: 'cli', label: 'CLI', code: CLI_SNIPPET, commentPrefix: '#' },
  { key: 'ts', label: 'TypeScript', code: SDK_SNIPPET, commentPrefix: '//' },
]

/** Splits a snippet into lines, dimming whole-line comments. */
function CodeLines({ code, commentPrefix }: Pick<CodeTab, 'code' | 'commentPrefix'>) {
  const lines = code.split('\n')
  return lines.map((line, i) => (
    <span key={i} className={line.startsWith(commentPrefix) ? 'c' : undefined}>
      {line}
      {i < lines.length - 1 && '\n'}
    </span>
  ))
}

export function CodePanel() {
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
    <div className="code on-ink">
      <div className="code__bar">
        <div role="tablist" aria-label="Code example" className="code__tabs">
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
              className="code__tab"
              onClick={() => setActive(i)}
              onKeyDown={onTabKeyDown}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="code__versions">CLI 0.13 · SDK 0.11</span>
      </div>
      {TABS.map((tab, i) => (
        <div
          key={tab.key}
          role="tabpanel"
          id={`${baseId}-panel-${tab.key}`}
          aria-labelledby={`${baseId}-tab-${tab.key}`}
          tabIndex={0}
          hidden={i !== active}
        >
          <pre>
            <CodeLines code={tab.code} commentPrefix={tab.commentPrefix} />
          </pre>
        </div>
      ))}
    </div>
  )
}
