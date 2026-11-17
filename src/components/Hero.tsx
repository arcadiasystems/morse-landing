import { AGENTS, QUICK_START_CLI, RECEIPTS } from '../lib/links'
import { useDaysSince } from '../lib/useDaysSince'
import { useSmilPlayback } from '../lib/useSmilPlayback'
import { Cta } from '../ui/Button'
import { Morse, MorseMarks } from '../ui/Morse'
import { TravellingPulse } from '../ui/TravellingPulse'

/* Signal field, drawn on a 1440×900 canvas that covers the hero. */
const PULSE_SIZES = {
  lg: { unit: 54, height: 44, from: -300, to: 1740, className: 'pulse-lg' },
  sm: { unit: 34, height: 26, from: -200, to: 1700, className: 'pulse-sm' },
}

const LANES: { y: number; size: keyof typeof PULSE_SIZES; duration: number; begin: number; opacity?: number }[] = [
  { y: 110, size: 'lg', duration: 11, begin: -3 },
  { y: 190, size: 'sm', duration: 15, begin: -9, opacity: 0.7 },
  { y: 270, size: 'lg', duration: 9, begin: -1 },
  { y: 350, size: 'sm', duration: 17, begin: -5, opacity: 0.6 },
  { y: 430, size: 'lg', duration: 13, begin: -7, opacity: 0.85 },
  { y: 510, size: 'sm', duration: 12, begin: -11, opacity: 0.6 },
  { y: 590, size: 'lg', duration: 10, begin: -4 },
  { y: 670, size: 'sm', duration: 16, begin: -2, opacity: 0.7 },
  { y: 750, size: 'lg', duration: 12, begin: -8, opacity: 0.85 },
  { y: 830, size: 'sm', duration: 14, begin: -6, opacity: 0.6 },
]

const NODES: [x: number, y: number][] = [
  [212, 190], [1090, 270], [640, 430], [1320, 510],
  [380, 670], [960, 750], [120, 350], [1240, 830],
]

const RIPPLES: { x: number; y: number; duration: number; begin: number }[] = [
  { x: 212, y: 190, duration: 4, begin: 0 },
  { x: 1090, y: 270, duration: 5, begin: -2 },
  { x: 960, y: 750, duration: 4.5, begin: -1 },
  { x: 380, y: 670, duration: 5.5, begin: -3 },
]

function SignalField() {
  const svgRef = useSmilPlayback()

  return (
    <svg
      ref={svgRef}
      className="hero__field"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="hero-glow" x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="hero-vignette" cx="50%" cy="48%" r="70%">
          <stop offset="0" stopOpacity="0" />
          <stop offset="0.65" stopOpacity="0.35" />
          <stop offset="1" stopOpacity="0.95" />
        </radialGradient>
        <linearGradient id="hero-fade-x" x1="0" x2="1">
          <stop offset="0" />
          <stop offset="0.12" stopOpacity="0" />
          <stop offset="0.88" stopOpacity="0" />
          <stop offset="1" />
        </linearGradient>
      </defs>

      <path className="grid" d={LANES.map(lane => `M0 ${lane.y}H1440`).join('')} />

      <g className="nodes">
        {NODES.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={3} />
        ))}
      </g>

      <g filter="url(#hero-glow)">
        {LANES.map(lane => {
          const size = PULSE_SIZES[lane.size]
          return (
            <TravellingPulse
              key={lane.y}
              baseline={lane.y}
              unit={size.unit}
              height={size.height}
              from={size.from}
              to={size.to}
              duration={lane.duration}
              begin={lane.begin}
              opacity={lane.opacity}
              className={size.className}
            />
          )
        })}
      </g>

      <g className="ripples">
        {RIPPLES.map(ripple => (
          <circle key={`${ripple.x}-${ripple.y}`} cx={ripple.x} cy={ripple.y} r={6}>
            <animate
              attributeName="r"
              values="4;14;4"
              dur={`${ripple.duration}s`}
              begin={`${ripple.begin}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values=".8;0;.8"
              dur={`${ripple.duration}s`}
              begin={`${ripple.begin}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      <rect width="1440" height="900" fill="url(#hero-fade-x)" />
      <rect width="1440" height="900" fill="url(#hero-vignette)" />
    </svg>
  )
}

/** Mainnet launch day. The status label counts days from it, so it is public and exact. */
const MAINNET_SINCE = '2026-09-09'

/** One pass of the telegraph tape; two passes make the seamless loop. */
function TapeWord() {
  return (
    <>
      <MorseMarks word="MORSE" />
      <i className="w" />
    </>
  )
}

/**
 * Hero status label: LIVE with a lamp, the network, days since mainnet, and
 * MORSE scrolling past as telegraph tape. Status only; the headline carries
 * the message.
 */
function StatusLabel() {
  const days = useDaysSince(MAINNET_SINCE)

  return (
    <p className="hstat r1">
      <span className="hstat__live">
        <i aria-hidden="true" />
        LIVE
      </span>
      <span className="hstat__net">WALRUS MAINNET</span>
      <span className="hstat__day" data-since={MAINNET_SINCE}>
        {days === null ? 'SINCE 9 SEP' : `DAY ${days}`}
      </span>
      <span className="hstat__tape" aria-hidden="true">
        <span className="hstat__run">
          <TapeWord />
          <TapeWord />
        </span>
      </span>
    </p>
  )
}

/* The five jobs the kit covers. Each row is marked with its initial in Morse. */
const JOBS = [
  { name: 'Store', detail: 'blobs and quilts on Walrus' },
  { name: 'Version', detail: 'append-only revisions' },
  { name: 'Encrypt', detail: 'Seal, in the client' },
  { name: 'Gate', detail: 'rights as objects on Sui' },
  { name: 'Prove', detail: 'a digest for every write' },
]

const UNDERNEATH = ['Walrus', 'Sui', 'Seal']

/**
 * The signal board: one square-wave line runs from "Your app" through the
 * five jobs down to the base plate, and a node on each row lights in turn.
 */
function SignalBoard() {
  return (
    <aside
      className="board r3"
      aria-label="What the Morse kit covers: your app on top, five jobs handled by the kit, Walrus, Sui and Seal underneath"
    >
      <div className="board__app">
        <b>YOUR APP</b>
        <span>a publication · an agent · a file app</span>
      </div>
      <ol className="board__rows">
        {JOBS.map(job => (
          <li key={job.name}>
            <div>
              <b>{job.name}</b>
              <small>{job.detail}</small>
            </div>
            <Morse word={job.name[0]} size="lg" />
          </li>
        ))}
      </ol>
      <div className="board__base">
        <b>UNDERNEATH</b>
        {UNDERNEATH.map(layer => (
          <span key={layer}>
            <i aria-hidden="true" />
            {layer}
          </span>
        ))}
      </div>
      <div className="board__ft">
        <span>npm i @arcadiasystems/morse-sdk</span>
        <span aria-hidden="true">MARKS: INITIALS IN MORSE</span>
      </div>
    </aside>
  )
}

export function Hero() {
  return (
    <section className="hero on-ink" id="top" aria-labelledby="hero-title">
      <SignalField />

      <div className="container hero__content">
        <div className="hero__left">
          <StatusLabel />
          <h1 id="hero-title" className="r2">
            The storage side
            <br />
            of your app.{' '}
            <em>One&nbsp;kit. First&nbsp;write in five&nbsp;minutes.</em>
          </h1>
          <div className="hero__code r3" aria-hidden="true">
            <Morse word="KIT" size="lg" />
            <span>KIT, IN MORSE</span>
          </div>
          <p className="hero__lead r3">
            Store, version, encrypt and gate content on Walrus and Sui with one SDK, one CLI and a set of
            contracts. You build the product, not the plumbing.
          </p>
          <div className="hero__cta r4">
            <Cta tone="bone" href={QUICK_START_CLI} hint="5 min, CLI">
              Start building
            </Cta>
            <Cta tone="outline-light" href="#kit">
              See what is in the kit
            </Cta>
          </div>
          <p className="hero__kit r4">
            Built on the kit: <a href={RECEIPTS}>Morse Receipts</a> and <a href={AGENTS}>Morse Agents</a>.
          </p>
        </div>

        <SignalBoard />
      </div>
    </section>
  )
}
