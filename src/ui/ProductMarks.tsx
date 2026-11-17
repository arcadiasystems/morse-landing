import type { ReactNode } from 'react'
import { MARK_PATH } from '../lib/pulse'

interface ProductMarkProps {
  size: number
}

interface RaisedMarkProps extends ProductMarkProps {
  /** The product's accent, drawn in the band under the mark (y 80 to 94). */
  children: ReactNode
}

/** The Morse mark raised to the top of the box, over one accent in the bottom band. */
function RaisedMark({ size, children }: RaisedMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path
        d={MARK_PATH}
        transform="translate(0 -12)"
        fill="none"
        stroke="currentColor"
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g className="accent">{children}</g>
    </svg>
  )
}

/** Morse Agent Publisher: a dot and a dash, A in Morse. */
export function AgentPublisherMark({ size }: ProductMarkProps) {
  return (
    <RaisedMark size={size}>
      <circle cx={15} cy={87} r={7} />
      <rect x={30} y={80} width={62} height={14} rx={7} />
    </RaisedMark>
  )
}

const IMPORTER_SEGMENTS = [8, 38, 68]

/** Morse Site Importer: three segments, one site in and many entries out. */
export function SiteImporterMark({ size }: ProductMarkProps) {
  return (
    <RaisedMark size={size}>
      {IMPORTER_SEGMENTS.map(x => (
        <rect key={x} x={x} y={80} width={24} height={14} rx={7} />
      ))}
    </RaisedMark>
  )
}
