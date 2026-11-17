import { morseMarks, type MorseMarkKind } from '../lib/morse'

/** Class on each mark's <i>: a bare <i> is a dot. */
const MARK_CLASS: Record<MorseMarkKind, string | undefined> = { dot: undefined, dash: 'd', gap: 's' }

interface MorseMarksProps {
  word: string
}

/** The marks of one word as <i> elements, for any glyph row. */
export function MorseMarks({ word }: MorseMarksProps) {
  return morseMarks(word).map((kind, i) => <i key={i} className={MARK_CLASS[kind]} />)
}

interface MorseProps {
  /** The letters or digit to key out, e.g. "KIT" or "1". */
  word: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * A word in real Morse, as a row of dots and dashes in currentColor. The
 * page's icon system: always decorative, so the text beside it carries the
 * meaning.
 */
export function Morse({ word, size = 'md' }: MorseProps) {
  return (
    <span className={size === 'md' ? 'mc' : `mc ${size}`} aria-hidden="true">
      <MorseMarks word={word} />
    </span>
  )
}
