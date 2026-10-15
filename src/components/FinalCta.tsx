import { DEMO_BLOG, QUICK_START } from '../lib/links'
import { useSmilPlayback } from '../lib/useSmilPlayback'
import { Cta } from '../ui/Button'
import { TravellingPulse } from '../ui/TravellingPulse'
import styles from './FinalCta.module.css'

const LANES = [
  { y: 80, duration: 12, begin: -4 },
  { y: 200, duration: 9, begin: -1 },
  { y: 320, duration: 14, begin: -8 },
]

function PulseBand() {
  const svgRef = useSmilPlayback()
  return (
    <svg
      ref={svgRef}
      className={styles.band}
      viewBox="0 0 1440 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path className={styles.bandLines} d={LANES.map(lane => `M0 ${lane.y}H1440`).join('')} />
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
          className={styles.bandPulse}
        />
      ))}
    </svg>
  )
}

export function FinalCta() {
  return (
    <section className={styles.final} aria-labelledby="final-title">
      <PulseBand />
      <div className={`container ${styles.inner}`}>
        <h2 id="final-title" className={styles.title}>
          Your content.
          <br />
          Your contracts.
        </h2>
        <div className={styles.buttons}>
          <Cta tone="ink" href={QUICK_START}>
            Start building
          </Cta>
          <Cta tone="outline-white" href={DEMO_BLOG} external>
            See it live
          </Cta>
        </div>
      </div>
    </section>
  )
}
