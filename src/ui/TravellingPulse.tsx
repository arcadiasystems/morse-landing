import { pulsePath } from '../lib/pulse'

interface TravellingPulseProps {
  baseline: number
  unit: number
  height: number
  /** Start and end x offsets of the horizontal travel. */
  from: number
  to: number
  /** Seconds per pass. */
  duration: number
  /** Negative values start the pulse part-way through its pass. */
  begin?: number
  /** Sets stroke colour and width. */
  className: string
  opacity?: number
  /** Keeps stroke width even when the SVG stretches with preserveAspectRatio="none". */
  nonScalingStroke?: boolean
}

/** One brand pulse sliding along a wire, looping forever (SMIL). */
export function TravellingPulse({
  baseline,
  unit,
  height,
  from,
  to,
  duration,
  begin = 0,
  className,
  opacity,
  nonScalingStroke,
}: TravellingPulseProps) {
  return (
    <path
      d={pulsePath(baseline, unit, height)}
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
      vectorEffect={nonScalingStroke ? 'non-scaling-stroke' : undefined}
    >
      <animateTransform
        attributeName="transform"
        type="translate"
        from={`${from} 0`}
        to={`${to} 0`}
        dur={`${duration}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
    </path>
  )
}
