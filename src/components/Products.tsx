import { useId } from 'react'
import { AGENTS, RECEIPTS } from '../lib/links'
import { CtaLabel } from '../ui/Button'
import { CheckIcon } from '../ui/CheckIcon'
import { Chip } from '../ui/Chip'
import { Lockup } from '../ui/Lockup'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { MorseMark } from '../ui/MorseMark'

const RECEIPT_CHECKS = [
  'These are the bytes that were published',
  'This is the revision marked public',
  'The author had the right to publish it',
]

/* The brand pulse as a connector, on a 40×16 canvas. */
const PLUG_PATH = 'M1 8H9V2H17V8H25V2H33V8H39'

const SKELETON_PARTS = ['memory', 'publish', 'gate']

/** Morse Receipts, as a perforated slip. The whole card is the link. */
function ReceiptsCard() {
  const ctaId = useId()
  return (
    <a className="prod slip" href={RECEIPTS} aria-labelledby={ctaId}>
      <Lockup mark={<MorseMark size={34} />} product="receipts" />
      <h3>Proof of what was published.</h3>
      <p>
        A link anyone can open to check a post against its record. For newsrooms, researchers and anyone
        who has to show their work.
      </p>
      <div className="rule" />
      <ul>
        {RECEIPT_CHECKS.map(check => (
          <li key={check}>
            <i>
              <CheckIcon />
            </i>
            {check}
          </li>
        ))}
      </ul>
      <div className="st">
        <Chip tone="live">Check works today from the CLI</Chip>
        <Chip tone="next">Public page Q4 2026</Chip>
      </div>
      <CtaLabel tone="ink" size="md" id={ctaId}>
        Explore Morse Receipts →
      </CtaLabel>
      <div className="rule" />
      <div className="slipft">
        <span>NO ACCOUNT NEEDED TO CHECK</span>
        <span>
          {RECEIPT_CHECKS.length} OF {RECEIPT_CHECKS.length}
        </span>
      </div>
    </a>
  )
}

/** Morse Agents, on ink, with the brain-and-skeleton diagram. The whole card is the link. */
function AgentsCard() {
  const ctaId = useId()
  return (
    <a className="prod ink on-ink" href={AGENTS} aria-labelledby={ctaId}>
      <Lockup mark={<MorseMark size={34} />} product="agents" />
      <h3>Agent templates you fork.</h3>
      <p>
        One skeleton with memory, publishing and gating fixed, and a brain you swap. For teams shipping
        agents that have to prove what they did.
      </p>
      <div className="mini">
        <div className="mini__brain">
          <small>YOU SWAP THIS</small>
          <b>brain</b>
        </div>
        <div className="mini__plug">
          <svg
            viewBox="0 0 40 16"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d={PLUG_PATH} />
          </svg>
        </div>
        <div className="mini__skel">
          <small>FIXED IN EVERY FORK</small>
          <div>
            {SKELETON_PARTS.map(part => (
              <span key={part}>{part}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="st">
        <Chip tone="live" onInk>
          Agents publish today
        </Chip>
        <Chip tone="next" onInk>
          Template within 60 days
        </Chip>
      </div>
      <CtaLabel tone="ultra" size="md" id={ctaId}>
        Explore Morse Agents →
      </CtaLabel>
    </a>
  )
}

/** Built on the kit, part one: the head and the two products. Apps and recipes follow in Ecosystem. */
export function Products() {
  return (
    <section className="prods" id="products" aria-labelledby="products-title">
      <div className="container">
        <div className="prods__head">
          <div>
            <SectionEyebrow number={3}>Built on the kit</SectionEyebrow>
            <h2 id="products-title">Four things already built on it.</h2>
          </div>
          <p>
            Two products with one job each, and two apps you can open today. Same kit, and the same record
            underneath.
          </p>
        </div>
        <p className="rowlab">
          <b>Products</b>one job each
        </p>
        <div className="prods__grid">
          <ReceiptsCard />
          <AgentsCard />
        </div>
      </div>
    </section>
  )
}
