import { useSmilPlayback } from '../lib/useSmilPlayback'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import { TravellingPulse } from '../ui/TravellingPulse'

const STEPS = [
  {
    title: 'Publish',
    body: 'From the CLI, the SDK or an agent. One command writes an entry or a new revision.',
    detail: 'morse entry add',
  },
  {
    title: 'Store',
    body: 'The bytes go to Walrus. Storage is paid for a set period and renewed by the publisher.',
    detail: 'Walrus blob + quilt',
  },
  {
    title: 'Record',
    body: 'A contract on Sui records the blob, the author, the time and who holds publishing rights.',
    detail: 'Sui Move contracts',
  },
  {
    title: 'Check',
    body: 'Anyone verifies the bytes, the revision and the author. No account, no wallet, no trust in us.',
    detail: 'CLI now · Morse Receipts Q4 2026',
  },
]

const CAPABILITIES = [
  { title: 'Corrections append', body: 'A fix is a new revision. What it replaced stays on the record.' },
  {
    title: 'Verifiable, not irrevocable',
    body: 'History can be checked by anyone. Storage is a funded lease, not forever.',
  },
  { title: 'Agent-readable', body: 'llms.txt, Markdown docs and JSON output on every command.' },
]

/* The wire is drawn on a 1136-unit row, one node above each of the four steps. */
const WIRE_NODES = [142, 426, 710, 994]

/** The wire the four steps hang from. Stretches to the row. */
function Wire() {
  const svgRef = useSmilPlayback()
  return (
    <svg ref={svgRef} viewBox="0 0 1136 60" preserveAspectRatio="none" aria-hidden="true">
      <path className="line" d="M0 30H1136" vectorEffect="non-scaling-stroke" />
      <TravellingPulse
        baseline={30}
        unit={30}
        height={24}
        from={-160}
        to={1180}
        duration={7}
        className="pulse"
        nonScalingStroke
      />
      <g className="nodes">
        {WIRE_NODES.map(x => (
          <circle key={x} cx={x} cy={30} r={8} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  )
}

export function HowItWorks() {
  return (
    <section id="how" className="how on-ink" aria-labelledby="how-title">
      <div className="container">
        <div>
          <SectionEyebrow number={2}>What happens on every write</SectionEyebrow>
          <h2 id="how-title">Four steps. The chain stays under the hood.</h2>
        </div>

        <div className="how__wire">
          <Wire />
          <ol className="steps">
            {STEPS.map((step, i) => (
              <li key={step.title} className="step">
                <span className="n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <span className="c">{step.detail}</span>
              </li>
            ))}
          </ol>
        </div>

        <ul className="caps">
          {CAPABILITIES.map(cap => (
            <li key={cap.title} className="cap">
              <b>{cap.title}</b>
              <span>{cap.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
