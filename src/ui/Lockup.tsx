import type { ReactNode } from 'react'

/** A product with its own colour for its word in the lockup. */
export type LockupTone = 'receipts' | 'agents' | 'press' | 'uploader' | 'agent-publisher' | 'site-importer'

interface LockupProps {
  /** The product's icon tile, from `src/ui/ProductTiles.tsx`. */
  mark: ReactNode
  /** The word set under "morse", e.g. "receipts". */
  product: string
  /** Colours the product word: the product's own colour, or a tone that passes where it misses 4.5:1. */
  tone: LockupTone
}

/** Stacked product lockup: the mark, then "morse" over the product word. */
export function Lockup({ mark, product, tone }: LockupProps) {
  return (
    <span className={`lk lk-${tone}`}>
      {mark}
      <span className="wm">
        <span>morse</span>
        <em>{product}</em>
      </span>
    </span>
  )
}
