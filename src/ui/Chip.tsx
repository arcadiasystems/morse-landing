import type { ReactNode } from 'react'

/** live: works today. next: dated and coming. plan: outlined, not live. */
export type ChipTone = 'live' | 'next' | 'plan'

interface ChipProps {
  tone: ChipTone
  /** Set on ink grounds. */
  onInk?: boolean
  children: ReactNode
}

/** A small mono status label. */
export function Chip({ tone, onInk, children }: ChipProps) {
  return <span className={onInk ? `chip on-ink ${tone}` : `chip ${tone}`}>{children}</span>
}
