import type { ReactNode } from 'react'

interface LockupProps {
  /** The product's symbol, drawn in currentColor. */
  mark: ReactNode
  /** The word set under "morse", e.g. "receipts". */
  product: string
}

/** Stacked product lockup: the mark, then "morse" over the product word in the accent. */
export function Lockup({ mark, product }: LockupProps) {
  return (
    <span className="lk">
      {mark}
      <span className="wm">
        <span>morse</span>
        <em>{product}</em>
      </span>
    </span>
  )
}
