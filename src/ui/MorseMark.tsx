import { MARK_PATH } from '../lib/pulse'

interface MorseMarkProps {
  size: number
}

/** The Morse mark, drawn in currentColor. Decorative: pair it with a text label. */
export function MorseMark({ size }: MorseMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path
        d={MARK_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
