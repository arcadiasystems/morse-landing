import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'

export type RevealVariant = 'rise' | 'fade' | 'scale' | 'slide' | 'mask' | 'draw'

interface RevealProps {
  children: ReactNode
  /** Entrance style. `rise` is the v1 default; `mask` is one-time headline/slab
   *  wipes only; `draw` is for lines (scaleX from origin). */
  variant?: RevealVariant
  /** Stagger delay in ms. */
  delay?: number
  /** Transition duration in ms. */
  duration?: number
  /** Offset in px for rise/slide. */
  distance?: number
  /** IntersectionObserver threshold. */
  threshold?: number
  /** Rendered element — avoids wrapper-div soup inside semantic markup. */
  as?: ElementType
  className?: string
}

/**
 * One-time viewport entrance. Variant styles live in index.css
 * (.reveal[data-variant] / .reveal-in); reduced-motion users get static
 * final-state content with no transition.
 */
export function Reveal({
  children,
  variant = 'rise',
  delay = 0,
  duration = 600,
  distance = 24,
  threshold = 0.15,
  as = 'div',
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [threshold])

  const style: CSSProperties = { '--reveal-delay': `${delay}ms` } as CSSProperties
  if (duration !== 600) (style as Record<string, string>)['--reveal-duration'] = `${duration}ms`
  if (distance !== 24) (style as Record<string, string>)['--reveal-distance'] = `${distance}px`

  const Tag = as
  return (
    <Tag
      ref={ref}
      data-variant={variant}
      className={['reveal', shown ? 'reveal-in' : '', className].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
    </Tag>
  )
}
