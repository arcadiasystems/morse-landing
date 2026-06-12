import { MorseGlyphs } from './MorseGlyphs'
import styles from './MorseDivider.module.css'

interface MorseDividerProps {
  /** Word whose real morse encoding becomes the divider pattern. */
  word: string
}

/**
 * Decorative hairline divider carrying the word's actual morse encoding,
 * centered between two rules. Announces nothing to screen readers; the
 * encoded word is exposed via title for the curious.
 */
export function MorseDivider({ word }: MorseDividerProps) {
  return (
    <div className={styles.divider} aria-hidden="true" title={word.toUpperCase()}>
      <span className={styles.rule} />
      <MorseGlyphs word={word} />
      <span className={styles.rule} />
    </div>
  )
}
