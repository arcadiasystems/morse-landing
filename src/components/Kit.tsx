import { DOCS_AGENTS, DOCS_CLI, DOCS_CONTRACTS, DOCS_SDK, DOCS_UPLOADER } from '../lib/links'
import { Morse } from '../ui/Morse'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { CodePanel } from './CodePanel'
import { Cost } from './Cost'
import { Tracks } from './Tracks'

interface KitPart {
  name: string
  /** The package, or the part's scope where there is no package. */
  scope: string
  description: string
  /** The chore this part replaces. */
  insteadOf: string
  link: string
}

const PARTS: KitPart[] = [
  {
    name: 'Contracts',
    scope: 'Sui Move · mainnet and testnet',
    description: 'Publications, entries, revisions and rights as Move objects.',
    insteadOf: 'writing and auditing your own access contract',
    link: DOCS_CONTRACTS,
  },
  {
    name: 'SDK',
    scope: '@arcadiasystems/morse-sdk',
    description: 'Typed TypeScript for browser and server, with a documented error taxonomy.',
    insteadOf: 'wiring Walrus, Sui and Seal clients by hand',
    link: DOCS_SDK,
  },
  {
    name: 'CLI',
    scope: '@arcadiasystems/morse-cli',
    description: 'Every operation as a command with JSON output, built for scripts and agents.',
    insteadOf: 'one-off scripts for every publish and check',
    link: DOCS_CLI,
  },
  {
    name: 'React components',
    scope: '@arcadiasystems/morse-uploader',
    description: 'Hooks and components for encrypted and public file flows.',
    insteadOf: 'building upload, progress and decrypt screens',
    link: DOCS_UPLOADER,
  },
  {
    name: 'Agent docs',
    scope: 'llms.txt · Markdown twins',
    description: 'Docs written so a coding agent can read them, plus goal-first cookbooks.',
    insteadOf: 'explaining your storage stack to every agent',
    link: DOCS_AGENTS,
  },
]

/** The kit manifest: five numbered parts, each with what it is and what it replaces. */
function Manifest() {
  return (
    <div className="mani">
      <div className="mani__hd">
        <span>KIT CONTENTS · {PARTS.length} PARTS · MIT</span>
        <Morse word="KIT" />
      </div>
      <ul>
        {PARTS.map((part, i) => (
          <li key={part.name}>
            <a href={part.link}>
              <span className="no" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <b>{part.name}</b>
                <code>{part.scope}</code>
              </div>
              <p>{part.description}</p>
              <div className="inst">
                <span>Instead of</span>
                <s>{part.insteadOf}</s>
              </div>
              <span className="go" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Kit() {
  return (
    <section className="build" id="kit" aria-labelledby="kit-title">
      <div className="container">
        <div className="build__head">
          <div>
            <SectionEyebrow number={1}>What is in the kit</SectionEyebrow>
            <h2 id="kit-title">
              Everything the storage side needs. <em>Already wired together.</em>
            </h2>
          </div>
          <p>
            Install one set of packages and call typed functions. Publishing, file sharing and agent output
            all land on the same record.
          </p>
        </div>
        <Manifest />
        <div className="build__row">
          <CodePanel />
          <Tracks />
        </div>
        <Cost />
      </div>
    </section>
  )
}
