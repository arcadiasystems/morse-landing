import { QUICK_START_CLI } from '../lib/links'
import { useSmilPlayback } from '../lib/useSmilPlayback'
import { Cta } from '../ui/Button'
import { TravellingPulse } from '../ui/TravellingPulse'

const LANES = [
  { y: 80, duration: 12, begin: -4 },
  { y: 200, duration: 9, begin: -1 },
  { y: 320, duration: 14, begin: -8 },
]

function PulseBand() {
  const svgRef = useSmilPlayback()
  return (
    <svg ref={svgRef} viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path className="lines" d={LANES.map(lane => `M0 ${lane.y}H1440`).join('')} />
      {LANES.map(lane => (
        <TravellingPulse
          key={lane.y}
          baseline={lane.y}
          unit={54}
          height={44}
          from={-300}
          to={1740}
          duration={lane.duration}
          begin={lane.begin}
          className="pulse"
        />
      ))}
    </svg>
  )
}

export function FinalCta() {
  return (
    <section className="final" aria-labelledby="final-title">
      <PulseBand />
      <div className="container">
        <h2 id="final-title">
          Your app on top.
          <br />
          Morse underneath.
        </h2>
        <div className="final__btns">
          <Cta tone="ink" href={QUICK_START_CLI}>
            Start building
          </Cta>
          <Cta tone="outline-white" href="#kit">
            See what is in the kit
          </Cta>
        </div>
      </div>
    </section>
  )
}
