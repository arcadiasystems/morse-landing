import type { ReactNode } from 'react'
import { useSmilPlayback } from '../lib/useSmilPlayback'
import { TravellingPulse } from '../ui/TravellingPulse'
import styles from './UseCaseArt.module.css'

/* Line illustrations for the four use-case cards. All share a 520×240
   canvas and are decorative: each card's heading and copy carry the meaning. */

function ArtCanvas({ children }: { children: ReactNode }) {
  const svgRef = useSmilPlayback()
  return (
    <svg ref={svgRef} className={styles.art} viewBox="0 0 520 240" aria-hidden="true">
      {children}
    </svg>
  )
}

/** Stacked pages above a wire, anchored at one point. */
export function PublishArt() {
  return (
    <ArtCanvas>
      <rect className={styles.plate} x="150" y="40" width="200" height="130" rx="10" />
      <rect className={styles.plate} x="170" y="24" width="200" height="130" rx="10" />
      <rect className={styles.plate} x="190" y="8" width="200" height="130" rx="10" />
      <path className={styles.outline} d="M214 40H330M214 62H366M214 84H340M214 106H300" />
      <path className={styles.wire} d="M20 206H500" />
      <TravellingPulse baseline={206} unit={30} height={30} from={-160} to={560} duration={6} className={styles.pulse} />
      <circle className={styles.anchor} cx="290" cy="206" r="6" />
      <path className={styles.leader} d="M290 170V200" />
      <text className={styles.label} x="306" y="228">
        anchored · rev 0001
      </text>
    </ArtCanvas>
  )
}

/** A signal entering a keyed gate and leaving it decrypted. */
export function GateArt() {
  return (
    <ArtCanvas>
      <defs>
        <clipPath id="case-gate-in">
          <rect width="236" height="240" />
        </clipPath>
        <clipPath id="case-gate-out">
          <rect x="284" width="236" height="240" />
        </clipPath>
      </defs>
      <path className={styles.wire} d="M20 120H500" />
      <g clipPath="url(#case-gate-in)">
        <TravellingPulse baseline={120} unit={24} height={24} from={-130} to={236} duration={4} className={styles.pulse} />
      </g>
      <g clipPath="url(#case-gate-out)">
        <TravellingPulse
          baseline={120}
          unit={24}
          height={24}
          from={164}
          to={540}
          duration={4}
          begin={-0.8}
          className={styles.pulse}
        />
      </g>
      <rect className={styles.plate} x="236" y="60" width="48" height="120" rx="8" />
      <path className={styles.outline} d="M260 96V144" />
      <circle className={styles.outline} cx="260" cy="90" r="7" />
      <circle className={styles.outline} cx="120" cy="60" r="16" />
      <path className={styles.outline} d="M134 72L182 120M166 104L176 94M176 114L186 104" />
      <text className={styles.label} x="40" y="214">
        policy: recipients
      </text>
      <text className={`${styles.label} ${styles.accent}`} x="332" y="214">
        key held · decrypts
      </text>
    </ArtCanvas>
  )
}

const FAN_ROUTES = [
  'M200 120C270 120 270 48 340 48',
  'M200 120H340',
  'M200 120C270 120 270 192 340 192',
]

/** One CLI command fanning out into three published entries. */
export function AgentArt() {
  return (
    <ArtCanvas>
      <path className={styles.fan} d={FAN_ROUTES.join('')} />
      {FAN_ROUTES.map((route, i) => (
        <circle key={route} className={styles.anchor} r="4">
          <animateMotion dur="2.4s" begin={`${-0.8 * i}s`} repeatCount="indefinite" path={route} />
        </circle>
      ))}
      <rect className={styles.plate} x="30" y="86" width="170" height="68" rx="10" />
      <rect className={styles.plate} x="340" y="24" width="150" height="48" rx="8" />
      <rect className={styles.plate} x="340" y="96" width="150" height="48" rx="8" />
      <rect className={styles.plate} x="340" y="168" width="150" height="48" rx="8" />
      <text className={styles.command} x="48" y="126">
        $ morse entry add
      </text>
      <rect className={styles.anchor} x="184" y="114" width="7" height="14">
        <animate attributeName="opacity" values="1;0" calcMode="discrete" dur="1.1s" repeatCount="indefinite" />
      </rect>
      <text className={styles.label} x="356" y="53">
        posts/hello.md
      </text>
      <text className={styles.label} x="356" y="125">
        posts/roadmap.md
      </text>
      <text className={styles.label} x="356" y="197">
        pages/about.md
      </text>
    </ArtCanvas>
  )
}

const REVISIONS = [
  { x: 60, lines: 'M78 76H150M78 94H132', label: 'rev 0041' },
  { x: 205, lines: 'M223 76H295M223 94H260M223 110H290', label: 'rev 0042' },
  { x: 350, lines: 'M368 76H440M368 94H404M368 110H436', label: 'rev 0043 · current' },
]

/** Three revisions on a wire, each anchored; the newest one pulses. */
export function ArchiveArt() {
  return (
    <ArtCanvas>
      <path className={styles.wire} d="M20 150H500" />
      {REVISIONS.map((rev, i) => {
        const isCurrent = i === REVISIONS.length - 1
        const anchorX = rev.x + 55
        return (
          <g key={rev.label}>
            <rect className={styles.plate} x={rev.x} y="54" width="110" height="70" rx="8" />
            <path className={styles.outline} d={rev.lines} />
            <path className={styles.leader} d={`M${anchorX} 124V144`} />
            <circle className={styles.anchor} cx={anchorX} cy="150" r="6" />
            <text className={isCurrent ? `${styles.label} ${styles.accent}` : styles.label} x={rev.x + 32} y="190">
              {rev.label}
            </text>
            {isCurrent && (
              <circle className={styles.ring} cx={anchorX} cy="150" r="6">
                <animate attributeName="r" values="6;18;6" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values=".9;0;.9" dur="3s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        )
      })}
      <text className={styles.label} x="60" y="222">
        append only · every revision stays readable
      </text>
    </ArtCanvas>
  )
}
