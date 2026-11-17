import type { ReactNode } from 'react'

export type CtaTone = 'bone' | 'ink' | 'ultra' | 'outline-light' | 'outline-dark' | 'outline-white'

const TONE_CLASS: Record<CtaTone, string> = {
  bone: 'btn-bone',
  ink: 'btn-ink',
  ultra: 'btn-ultra',
  'outline-light': 'btn-ghost-light',
  'outline-dark': 'btn-ghost-dark',
  'outline-white': 'btn-ghost-white',
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

function ctaClass(tone: CtaTone, size: CtaSize): string {
  return ['btn', TONE_CLASS[tone], size === 'md' ? 'btn-md' : ''].filter(Boolean).join(' ')
}

export function Cta({ tone, size = 'lg', href, external, hint, children }: CtaProps) {
  return (
    <a
      className={ctaClass(tone, size)}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {hint && <small>{hint}</small>}
    </a>
  )
}

interface CtaLabelProps {
  tone: CtaTone
  size?: CtaSize
  id?: string
  children: ReactNode
}

/** A Cta's look on a plain span, for the button inside a card that is itself the link. */
export function CtaLabel({ tone, size = 'lg', id, children }: CtaLabelProps) {
  return (
    <span id={id} className={ctaClass(tone, size)}>
      {children}
    </span>
  )
}
