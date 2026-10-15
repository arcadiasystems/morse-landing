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

interface CtaProps {
  tone: CtaTone
  size?: 'lg' | 'md'
  href: string
  /** Opens in a new tab. */
  external?: boolean
  /** Secondary qualifier shown after the label, e.g. "5 min, CLI". */
  hint?: string
  children: ReactNode
}

export function Cta({ tone, size = 'lg', href, external, hint, children }: CtaProps) {
  const cls = [styles.cta, TONE_CLASS[tone], size === 'md' ? styles.md : ''].filter(Boolean).join(' ')

  return (
    <a
      className={cls}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {hint && <small className={styles.hint}>{hint}</small>}
    </a>
  )
}
