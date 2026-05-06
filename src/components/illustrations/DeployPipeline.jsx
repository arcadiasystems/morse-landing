/**
 * DeployPipeline — SVG schematic of the Morse content pipeline.
 *
 *   Publish ───► Walrus ───► Sui ───► AI Agents
 *
 * Pure SVG. No external assets, no JS animation — all motion via SMIL.
 */

const VB_W = 700
const VB_H = 220
const CARD_W = 120
const CARD_H = 120
const CARD_Y = 50
const ROW_Y = CARD_Y + CARD_H / 2 // 110

// 4 cards, evenly spaced inside a 16px side margin
const STEPS = [
  {
    num: '01',
    label: 'Publish',
    hash: 'publish.md',
    color: '#444ce7', // ultraviolet
    icon: PublishIcon,
  },
  {
    num: '02',
    label: 'Walrus',
    hash: 'bafkrei9a…',
    color: '#1ff1a5', // mint
    icon: WalrusIcon,
  },
  {
    num: '03',
    label: 'Sui',
    hash: '0x4f2a…',
    color: '#b664ff', // violet
    icon: SuiIcon,
  },
  {
    num: '04',
    label: 'AI Agents',
    hash: 'agent://*',
    color: '#dbff4b', // lime
    icon: AgentIcon,
  },
]

const N = STEPS.length
const MARGIN = 16
const TOTAL_CARD_W = N * CARD_W
const GAP = (VB_W - 2 * MARGIN - TOTAL_CARD_W) / (N - 1) // 63
const CARD_X = (i) => MARGIN + i * (CARD_W + GAP)

// ---------- Icons ----------

function PublishIcon({ color }) {
  // Document with folded corner
  return (
    <g stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round">
      <path d="M -10 -14 L 6 -14 L 12 -8 L 12 14 L -10 14 Z" />
      <path d="M 6 -14 L 6 -8 L 12 -8" />
      <line x1="-5" y1="-2" x2="7" y2="-2" />
      <line x1="-5" y1="3" x2="7" y2="3" />
      <line x1="-5" y1="8" x2="3" y2="8" />
    </g>
  )
}

function WalrusIcon({ color }) {
  // Stacked storage layers (cylinder-ish blob shards)
  return (
    <g stroke={color} strokeWidth="1.5" fill="none">
      <ellipse cx="0" cy="-10" rx="13" ry="4" />
      <path d="M -13 -10 L -13 -2 A 13 4 0 0 0 13 -2 L 13 -10" />
      <path d="M -13 -2 L -13 6  A 13 4 0 0 0 13 6  L 13 -2" />
      <path d="M -13 6  L -13 14 A 13 4 0 0 0 13 14 L 13 6"  />
    </g>
  )
}

function SuiIcon({ color }) {
  // Hexagon block with inner cell
  return (
    <g stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round">
      <path d="M 0 -14 L 12 -7 L 12 7 L 0 14 L -12 7 L -12 -7 Z" />
      <path d="M 0 -7 L 6 -3.5 L 6 3.5 L 0 7 L -6 3.5 L -6 -3.5 Z" />
      <line x1="0" y1="-14" x2="0" y2="-7" />
      <line x1="12" y1="-7" x2="6" y2="-3.5" />
      <line x1="-12" y1="-7" x2="-6" y2="-3.5" />
    </g>
  )
}

function AgentIcon({ color }) {
  // Hub-and-spoke network
  return (
    <g stroke={color} strokeWidth="1.5" fill="none">
      <circle cx="0" cy="0" r="4" />
      <circle cx="-11" cy="-9" r="2.5" />
      <circle cx="11"  cy="-9" r="2.5" />
      <circle cx="-11" cy="9"  r="2.5" />
      <circle cx="11"  cy="9"  r="2.5" />
      <line x1="-3" y1="-2.5" x2="-9" y2="-7.5" />
      <line x1="3"  y1="-2.5" x2="9"  y2="-7.5" />
      <line x1="-3" y1="2.5"  x2="-9" y2="7.5" />
      <line x1="3"  y1="2.5"  x2="9"  y2="7.5" />
    </g>
  )
}

// ---------- Component ----------

export default function DeployPipeline({ className = '', style }) {
  const segments = []
  for (let i = 0; i < N - 1; i++) {
    const x1 = CARD_X(i) + CARD_W
    const x2 = CARD_X(i + 1)
    segments.push({ x1, x2, y: ROW_Y, accent: STEPS[i + 1].color, idx: i })
  }

  return (
    <svg
      className={className}
      style={{ width: '100%', height: 'auto', display: 'block', ...style }}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      role="img"
      aria-label="Morse pipeline: Publish to Walrus to Sui to AI Agents"
    >
      {/* Connecting lines (drawn behind cards) */}
      {segments.map(({ x1, x2, y, accent, idx }) => {
        const begin = `${(idx * 0.4).toFixed(1)}s`
        return (
          <g key={`seg-${idx}`}>
            {/* Static rail underneath for visual continuity */}
            <line
              x1={x1} y1={y} x2={x2} y2={y}
              stroke={accent} strokeOpacity="0.18" strokeWidth="2"
            />
            {/* Animated dashed line */}
            <line
              x1={x1} y1={y} x2={x2} y2={y}
              stroke={accent} strokeOpacity="0.85"
              strokeWidth="2" strokeDasharray="6 4"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0" to="-20" dur="1.2s"
                begin={begin}
                repeatCount="indefinite"
              />
            </line>
            {/* Traveling dot */}
            <circle r="3.5" fill={accent}>
              <animateMotion
                dur="1.6s"
                begin={begin}
                repeatCount="indefinite"
                path={`M ${x1} ${y} L ${x2} ${y}`}
                rotate="auto"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.85;1"
                dur="1.6s"
                begin={begin}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        )
      })}

      {/* Cards */}
      {STEPS.map((s, i) => {
        const x = CARD_X(i)
        const cx = x + CARD_W / 2
        const Icon = s.icon
        return (
          <g key={s.num}>
            {/* Step number above card */}
            <text
              x={cx} y={32}
              fill={s.color} fillOpacity="0.85"
              fontFamily="'Noto Sans Mono', ui-monospace, monospace"
              fontSize="13" fontWeight="600"
              textAnchor="middle" letterSpacing="0.1em"
            >
              {`STEP ${s.num}`}
            </text>

            {/* Card body */}
            <rect
              x={x} y={CARD_Y}
              width={CARD_W} height={CARD_H}
              rx="10" ry="10"
              fill={s.color} fillOpacity="0.08"
              stroke={s.color} strokeOpacity="0.3"
              strokeWidth="1"
            />

            {/* Icon */}
            <g transform={`translate(${cx} ${CARD_Y + 38})`}>
              <Icon color={s.color} />
            </g>

            {/* Label */}
            <text
              x={cx} y={CARD_Y + 78}
              fill="#f0f2f8"
              fontFamily="'Inter', system-ui, sans-serif"
              fontSize="14" fontWeight="600"
              textAnchor="middle"
            >
              {s.label}
            </text>

            {/* Hash preview pill */}
            <rect
              x={cx - 42} y={CARD_Y + 90}
              width="84" height="18" rx="9" ry="9"
              fill={s.color} fillOpacity="0.06"
              stroke={s.color} strokeOpacity="0.22"
              strokeWidth="0.75"
            />
            <text
              x={cx} y={CARD_Y + 102}
              fill={s.color} fillOpacity="0.85"
              fontFamily="'Noto Sans Mono', ui-monospace, monospace"
              fontSize="10"
              textAnchor="middle"
            >
              {s.hash}
            </text>

            {/* Hash text below card (full path) */}
            <text
              x={cx} y={VB_H - 14}
              fill="#6b7fa3"
              fontFamily="'Noto Sans Mono', ui-monospace, monospace"
              fontSize="9" letterSpacing="0.05em"
              textAnchor="middle"
            >
              {`0x${(i * 731 + 4093).toString(16).padStart(6, '0')}…${((i + 1) * 251 + 9001).toString(16).slice(-4)}`}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
