import type { ReactNode } from 'react'

/** A product with its own colour for its word in the lockup. */
export type LockupTone = 'receipts' | 'agents' | 'press' | 'uploader'

interface LockupProps {
  /** The product's symbol: its icon tile, or a mark drawn in currentColor. */
  mark: ReactNode
  /** The word set under "morse", e.g. "receipts". */
  product: string
  /** Sets the product word in that product's colour. Without it the word is in the accent. */
  tone?: LockupTone
}

/** Stacked product lockup: the mark, then "morse" over the product word. */
export function Lockup({ mark, product, tone }: LockupProps) {
  return (
    <span className={tone === undefined ? 'lk' : `lk lk-${tone}`}>
      {mark}
      <span className="wm">
        <span>morse</span>
        <em>{product}</em>
      </span>
    </span>
  )
}
