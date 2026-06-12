import { Fragment } from 'react'
import { toMorse } from '../lib/morse'

interface MorseGlyphsProps {
  /** Word to encode via toMorse. Ignored when `code` is given. */
  word?: string
  /** Raw morse string ('.', '-', ' ', '/'). */
  code?: string
  /** Extra class for size/color overrides on the .morse-glyphs wrapper. */
  className?: string
}

/**
 * The one shared dot/dash renderer. Maps '.', '-' to glyph spans and both
 * ' ' and '/' to gaps, against the global .morse-glyphs classes (index.css).
 * Always decorative — hidden from assistive tech.
 */
export function MorseGlyphs({ word, code, className }: MorseGlyphsProps) {
  const sequence = code ?? toMorse(word ?? '')

  return (
    <span
      className={['morse-glyphs', className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {sequence.split('').map((symbol, i) => (
        <Fragment key={i}>
          {symbol === '.' && <span className="dot" />}
          {symbol === '-' && <span className="dash" />}
          {(symbol === ' ' || symbol === '/') && <span className="gap" />}
        </Fragment>
      ))}
    </span>
  )
}
