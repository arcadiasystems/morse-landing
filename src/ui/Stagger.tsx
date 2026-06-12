import { Children, type ReactNode } from 'react'
import { Reveal, type RevealVariant } from './Reveal'

interface StaggerProps {
  children: ReactNode
  /** Delay between consecutive children in ms. */
  step?: number
  /** Delay before the first child in ms. */
  from?: number
  variant?: RevealVariant
  /** Class applied to each generated Reveal wrapper. */
  itemClassName?: string
}

/**
 * Wraps each direct child in a <Reveal> with cascading delays —
 * replaces manual `delay={i * 80}` arithmetic at grid call sites.
 */
export function Stagger({
  children,
  step = 80,
  from = 0,
  variant = 'rise',
  itemClassName,
}: StaggerProps) {
  return (
    <>
      {Children.map(children, (child, i) => (
        <Reveal delay={from + i * step} variant={variant} className={itemClassName}>
          {child}
        </Reveal>
      ))}
    </>
  )
}
