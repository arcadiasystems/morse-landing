import { useId, type ReactNode } from 'react'
import { DOCS, ECOSYSTEM_LISTING, MORSE_PRESS } from '../lib/links'
import { MORSE_WORDMARK } from '../lib/morse'
import { MARK_PATH } from '../lib/pulse'
import { CtaLabel } from '../ui/Button'
import { SealWordmark, SuiSymbol, WalrusSymbol } from '../ui/PartnerLogos'
import { MoveSymbol, TypeScriptLogo } from '../ui/ToolLogos'
import styles from './Ecosystem.module.css'

type Status = 'live' | 'exploring' | 'core'

const STATUS_LABEL: Record<Status, string> = { live: 'Live', exploring: 'Exploring', core: 'Core' }
const STATUS_CLASS: Record<Status, string> = {
  live: styles.statusLive,
  exploring: styles.statusExploring,
  core: styles.statusCore,
}

type TileTone = 'ink' | 'ultra' | 'stone' | 'outline' | 'live' | 'open'

const TILE_CLASS: Record<TileTone, string> = {
  ink: '',
  ultra: styles.tileUltra,
  stone: styles.tileStone,
  outline: styles.tileOutline,
  live: styles.tileLive,
  open: styles.tileOpen,
}

interface StackRow {
  /** Partner mark, or one or two characters for our own tools. */
  mark: ReactNode
  tone: TileTone
  name: string
  detail: string
  status: Status
}

const RUNS_ON: StackRow[] = [
  {
    mark: <WalrusSymbol className={styles.logoWalrus} />,
    tone: 'stone',
    name: 'Walrus',
    detail: 'Content storage, blob and quilt',
    status: 'live',
  },
  {
    mark: <SuiSymbol className={styles.logoSui} />,
    tone: 'ultra',
    name: 'Sui',
    detail: 'Publications, entries, caps as Move objects',
    status: 'live',
  },
  {
    mark: <SealWordmark className={styles.logoSeal} />,
    tone: 'ink',
    name: 'Seal',
    detail: 'Client-side encryption, on-chain access policy',
    status: 'live',
  },
  /* Walrus Memory has no mark of its own; as a Walrus product it carries the Walrus symbol. */
  {
    mark: <WalrusSymbol className={styles.logoWalrus} />,
    tone: 'outline',
    name: 'Walrus Memory',
    detail: 'Agent memory anchored to records',
    status: 'exploring',
  },
]

const BUILD_ON: StackRow[] = [
  { mark: '>_', tone: 'ink', name: 'morse-cli', detail: 'Publish from a terminal or CI', status: 'core' },
  {
    mark: <TypeScriptLogo className={styles.logoTypeScript} />,
    tone: 'ink',
    name: 'morse-sdk',
    detail: 'TypeScript, browser and server',
    status: 'core',
  },
  {
    mark: <MoveSymbol className={styles.logoMove} />,
    tone: 'ink',
    name: 'Contracts',
    detail: 'Call the Move package directly',
    status: 'core',
  },
]

interface EntryBase {
  name: string
  /** Foot line: the product's kind and tooling, or the call to action on the open slot. */
  category: string
  description: string
  link: string
  /** Opens in a new tab; docs links stay in the same tab. */
  external?: boolean
  /** One or two characters on the tile. */
  mark: string
}

/** A listed product, or the open slot that invites the next one. */
type EcosystemEntry = (EntryBase & { status: 'live'; tone: 'ultra' | 'live' }) | (EntryBase & { status: 'open' })

/* Adding a product to the bottom row is one entry here, before the open slot. */
const ENTRIES: EcosystemEntry[] = [
  {
    name: 'Agent publishers',
    category: 'Docs recipe · CLI or SDK',
    status: 'live',
    description:
      'Any agent with a wallet and a revocable cap can publish. llms.txt, a cookbook and a CLAUDE.md template to start.',
    link: `${DOCS}/agent-publishes.html`,
    mark: 'A',
    tone: 'ultra',
  },
  {
    name: 'Static site importer',
    category: 'Docs recipe · bash',
    status: 'live',
    description: 'Bring a Hugo, Astro or Markdown site in as one entry per post, re-runnable, with CI publishing on push.',
    link: `${DOCS}/import-a-site.html`,
    mark: '↗',
    tone: 'live',
  },
  {
    name: 'Your product here',
    category: 'Get listed',
    status: 'open',
    description:
      'Building on Morse? Open an issue with a link and a line about what it does. Anything that reads or writes Morse objects qualifies, no approval beyond that.',
    link: ECOSYSTEM_LISTING,
    external: true,
    mark: '+',
  },
]

const PRESS_CATEGORY = 'Publishing'
const PRESS_TAGS = ['Testnet', 'Open source', 'By Arcadia Systems']

function Tile({ mark, tone, size }: { mark: ReactNode; tone: TileTone; size: 'sm' | 'md' }) {
  const cls = [styles.tile, size === 'md' ? styles.tileMd : '', TILE_CLASS[tone]].filter(Boolean).join(' ')
  return (
    <span className={cls} aria-hidden="true">
      {mark}
    </span>
  )
}

function StatusPill({ status }: { status: Status }) {
  return <span className={`${styles.status} ${STATUS_CLASS[status]}`}>{STATUS_LABEL[status]}</span>
}

/** Morse Press, the reference app: the whole card is the link. */
function FeaturedProduct() {
  const ctaId = useId()

  return (
    <a
      className={`${styles.feat} on-ink`}
      href={MORSE_PRESS}
      target="_blank"
      rel="noopener noreferrer"
      aria-labelledby={ctaId}
    >
      <span className={styles.signal} aria-hidden="true">
        {MORSE_WORDMARK}
      </span>
      <span className={styles.lockup}>
        <svg className={styles.pressMark} viewBox="0 0 100 100" aria-hidden="true">
          <path
            d={MARK_PATH}
            transform="translate(0 -12)"
            fill="none"
            stroke="currentColor"
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect className={styles.pressBar} x={8} y={80} width={84} height={14} rx={7} />
        </svg>
        <span className={styles.lockupWords}>
          <span>morse</span>
          <em>press</em>
        </span>
      </span>
      <h3 className={styles.featTitle}>A newsletter nobody can take down. Not even us.</h3>
      <p className={styles.featBody}>
        The reference app on Morse: write, publish, add members and let agents post, with every post stored on
        Walrus and recorded on Sui. Open source, so anyone can run their own front end against the same objects.
      </p>
      <span className={styles.tags}>
        <span className={`${styles.tag} ${styles.tagOn}`}>{PRESS_CATEGORY}</span>
        {PRESS_TAGS.map(tag => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </span>
      <CtaLabel tone="ultra" size="md" id={ctaId} className={styles.featCta}>
        Open Morse Press
      </CtaLabel>
    </a>
  )
}

function StackCard({ title, rows }: { title: string; rows: StackRow[] }) {
  return (
    <div className={styles.stack}>
      <h3 className={styles.stackTitle}>{title}</h3>
      <ul className={styles.stackList}>
        {rows.map(row => (
          <li key={row.name} className={styles.stackRow}>
            <Tile mark={row.mark} tone={row.tone} size="sm" />
            <div>
              <strong className={styles.stackName}>{row.name}</strong>
              <span className={styles.stackDetail}>{row.detail}</span>
            </div>
            <StatusPill status={row.status} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function EntryCard({ entry }: { entry: EcosystemEntry }) {
  const titleId = useId()
  const footId = useId()
  const open = entry.status === 'open'

  return (
    <a
      className={open ? `${styles.entry} ${styles.entryOpen}` : styles.entry}
      href={entry.link}
      aria-labelledby={`${titleId} ${footId}`}
      {...(entry.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className={styles.entryTop}>
        <Tile mark={entry.mark} tone={open ? 'open' : entry.tone} size="md" />
        {!open && <StatusPill status={entry.status} />}
      </span>
      <h3 id={titleId} className={styles.entryName}>
        {entry.name}
      </h3>
      <p className={styles.entryBody}>{entry.description}</p>
      {open ? (
        <span className={styles.entryGo}>
          <span id={footId}>{entry.category}</span> <span aria-hidden="true">→</span>
        </span>
      ) : (
        <span id={footId} className={styles.entryMeta}>
          {entry.category}
        </span>
      )}
    </a>
  )
}

export function Ecosystem() {
  return (
    <section className={styles.eco} id="ecosystem" aria-labelledby="ecosystem-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <div>
            <p className={`eyebrow ${styles.eyebrow}`}>Ecosystem</p>
            <h2 id="ecosystem-title" className={`section-title ${styles.title}`}>
              Products that publish through Morse.
            </h2>
          </div>
          <p className={styles.lead}>
            Morse is a protocol, so the apps on top of it are not ours to control. Here is what runs on it today,
            what it runs on, and how to get your product on this list.
          </p>
        </div>

        <div className={styles.grid}>
          <FeaturedProduct />
          <div className={styles.col}>
            <StackCard title="Morse runs on" rows={RUNS_ON} />
            <StackCard title="Build on Morse" rows={BUILD_ON} />
          </div>
        </div>

        <ul className={styles.entries}>
          {ENTRIES.map(entry => (
            <li key={entry.name}>
              <EntryCard entry={entry} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
