const CODE: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.',
  H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.',
  O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-',
  V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
}

/**
 * Encode text as morse. Letters become dot/dash strings, letters are
 * separated by a single space, words by ' / '. Unknown characters drop out.
 */
export function toMorse(text: string): string {
  return text
    .toUpperCase()
    .split(/\s+/)
    .map(word =>
      word
        .split('')
        .map(ch => CODE[ch] ?? '')
        .filter(Boolean)
        .join(' '),
    )
    .filter(Boolean)
    .join(' / ')
}

/** 'MORSE' encoded: '-- --- .-. ... .' */
export const MORSE_WORDMARK = toMorse('MORSE')

export type MorseMarkKind = 'dot' | 'dash' | 'gap'

const MARK_KIND: Record<string, MorseMarkKind> = { '.': 'dot', '-': 'dash', ' ': 'gap' }

/** One word as a row of marks: dots, dashes, and a gap between letters. */
export function morseMarks(word: string): MorseMarkKind[] {
  return [...toMorse(word)].map(symbol => MARK_KIND[symbol])
}
