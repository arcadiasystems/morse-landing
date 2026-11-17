import { SectionEyebrow } from '../ui/SectionEyebrow'

type Status = 'live' | 'building' | 'planned' | 'proposed'

interface Milestone {
  when: string
  title: string
  detail: string
  status: Status
}

/* Only the first row is live. Nothing below it may be described as shipped. */
const MILESTONES: Milestone[] = [
  {
    when: '9 Sep 2026',
    title: 'Protocol live on Walrus Mainnet',
    detail:
      'Contracts, SDK and CLI on mainnet and testnet. Append-only revisions, Seal-gated drafts, recipient files',
    status: 'live',
  },
  {
    when: 'Next 60 days',
    title: 'Morse Agents: the official template, with a Morse MCP or skill',
    detail:
      'A fixed skeleton and a swappable brain in the SDK. Publish, version, gate, and return a receipt from one call',
    status: 'building',
  },
  {
    when: 'Q4 2026',
    title: 'Morse Receipts: a public page for any revision',
    detail:
      'Open a link, see the record, the revision history and the Sui and Walrus proofs. No account, no wallet. A one-line embed for any post',
    status: 'planned',
  },
  {
    when: 'Q4 2026',
    title: 'SDK 1.0 and stable CLI, with sign-in and on-ramps',
    detail:
      'Typed client and documented contracts. Social and zkLogin sign-in and card on-ramps are being pulled forward into this release',
    status: 'building',
  },
  {
    when: 'Nov 2026',
    title: 'Walrus Sessions 9, built on Morse',
    detail:
      'An online hackathon with the Walrus Foundation: agents that remember with Walrus Memory and prove with Morse',
    status: 'proposed',
  },
  {
    when: 'Planned',
    title: 'Subscription and token access',
    detail: 'Reserved in the contract, not built. Required before paid content or a marketplace',
    status: 'planned',
  },
  {
    when: 'Q1 2027',
    title: 'Indexer and hosted content API',
    detail:
      'An event-driven read layer anyone can run, with a REST surface for apps, listings and newsroom tools',
    status: 'planned',
  },
]

export function Roadmap() {
  return (
    <section id="roadmap" className="road on-ink" aria-labelledby="roadmap-title">
      <div className="container">
        <div className="road__head">
          <div>
            <SectionEyebrow number={4}>Roadmap</SectionEyebrow>
            <h2 id="roadmap-title">What ships next, and when.</h2>
          </div>
          <p className="road__note">
            Dates are targets, updated as they move. The GitHub repository is the source of truth for what
            has shipped.
          </p>
        </div>

        <ol className="road__list">
          {MILESTONES.map(item => (
            <li key={item.title} className="row">
              <span className={item.status === 'live' ? 'when now' : 'when'}>{item.when}</span>
              <div>
                <b>{item.title}</b>
                <span className="d">{item.detail}</span>
              </div>
              <span className={item.status === 'live' ? 'pill live' : 'pill soon'}>{item.status}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
