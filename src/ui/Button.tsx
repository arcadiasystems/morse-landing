import type { ReactNode } from 'react'
import styles from './Button.module.css'

interface CtaProps {
  variant?: 'solid' | 'ghost'
  size?: 'md' | 'sm'
  href: string
  external?: boolean
  children: ReactNode
  icon?: ReactNode
}

export function Cta({ variant = 'solid', size = 'md', href, external, children, icon }: CtaProps) {
  const cls = [
    styles.cta,
    variant === 'solid' ? styles.solid : styles.ghost,
    size === 'sm' ? styles.sm : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <a
      className={cls}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className={styles.label}>{children}</span>
      {icon}
    </a>
  )
}
