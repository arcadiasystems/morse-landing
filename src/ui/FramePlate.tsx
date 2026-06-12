import type { ReactNode } from 'react'
import styles from './FramePlate.module.css'

type FrameTint = 'signal' | 'verified' | 'paper'

interface FramePlateProps {
  children: ReactNode
  /** Mono caption row under the content (filename-style left, status right). */
  caption?: string
  captionStatus?: string
  /** Wash hue — sanctioned temperatures only (see brand.md). */
  tint?: FrameTint
  className?: string
}

const TINT_CLASS: Record<FrameTint, string> = {
  signal: styles.tintSignal,
  verified: styles.tintVerified,
  paper: styles.tintPaper,
}

/**
 * Raised framed plate: gradient hairline border, plate shadow, and a
 * bottom-half gradient wash — the product-frame treatment for demos and
 * terminals. Pure gradient paint, no blur.
 */
export function FramePlate({
  children,
  caption,
  captionStatus,
  tint = 'signal',
  className,
}: FramePlateProps) {
  return (
    <div
      className={[styles.plate, 'border-glow', TINT_CLASS[tint], className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.content}>{children}</div>
      <span className={styles.wash} aria-hidden="true" />
      {caption && (
        <div className={styles.caption}>
          <span>{caption}</span>
          {captionStatus && <span className={styles.captionStatus}>{captionStatus}</span>}
        </div>
      )}
    </div>
  )
}
