import type { ReactNode } from 'react'
import styles from './Button.module.css'

export type CtaTone = 'bone' | 'ink' | 'ultra' | 'outline-light' | 'outline-dark' | 'outline-white'

const TONE_CLASS: Record<CtaTone, string> = {
  bone: styles.bone,
  ink: styles.ink,
  ultra: styles.ultra,
  'outline-light': styles.outlineLight,
  'outline-dark': styles.outlineDark,
  'outline-white': styles.outlineWhite,
}

type CtaSize = 'lg' | 'md'

interface CtaProps {
  tone: CtaTone
  size?: CtaSize
  href: string
  /** Opens in a new tab. */
  external?: boolean
  /** Secondary qualifier shown after the label, e.g. "5 min, CLI". */
  hint?: string
  children: ReactNode
}

function ctaClass(tone: CtaTone, size: CtaSize, extra?: string): string {
  return [styles.cta, TONE_CLASS[tone], size === 'md' ? styles.md : '', extra].filter(Boolean).join(' ')
}

export function Cta({ tone, size = 'lg', href, external, hint, children }: CtaProps) {
  return (
    <a
      className={ctaClass(tone, size)}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {hint && <small className={styles.hint}>{hint}</small>}
    </a>
  )
}

interface CtaLabelProps {
  tone: CtaTone
  size?: CtaSize
  id?: string
  className?: string
  children: ReactNode
}

/** A Cta's look on a plain span, for the button inside a card that is itself the link. */
export function CtaLabel({ tone, size = 'lg', id, className, children }: CtaLabelProps) {
  return (
    <span id={id} className={ctaClass(tone, size, className)}>
      {children}
    </span>
  )
}
