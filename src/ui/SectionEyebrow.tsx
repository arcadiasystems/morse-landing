import type { ReactNode } from 'react'
import { Morse } from './Morse'

interface SectionEyebrowProps {
  /** The section's number, keyed out in Morse before the label. */
  number: number
  children: ReactNode
}

/** The mono label above a numbered section's headline. */
export function SectionEyebrow({ number, children }: SectionEyebrowProps) {
  return (
    <p>
      <span className="eyebrow">
        <Morse word={String(number)} size="sm" />
        {children}
      </span>
    </p>
  )
}
