import { useId, useRef, useState, type KeyboardEvent } from 'react'
import styles from './Terminal.module.css'

export interface TerminalTab {
  label: string
  code: string
}

interface TerminalProps {
  tabs: TerminalTab[]
  /** Mono filename tag shown in the chrome bar, e.g. 'publish.ts'. */
  filename?: string
}

// Single pass: comments | strings | keywords. One combined regex so later
// alternatives can never re-match markup injected for earlier ones.
const TOKENS =
  /(\/\/[^\n]*|#[^\n]*)|('[^'\n]*'|"[^"\n]*")|\b(import|from|const|await|async|function|return|new|export)\b/g

function highlight(code: string): string {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return escaped.replace(TOKENS, (_, comment, str, keyword) => {
    if (comment) return `<span class="tk-comment">${comment}</span>`
    if (str) return `<span class="tk-string">${str}</span>`
    return `<span class="tk-keyword">${keyword}</span>`
  })
}

/**
 * Flat brutalist code plate: square corners, hairline border, mono tabs.
 * Syntax accents stay inside the single-accent system (amber + paper tints).
 */
export function Terminal({ tabs, filename }: TerminalProps) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const tab = tabs[active]

  // APG tabs keyboard model: arrows move focus + selection, Home/End jump.
  function onTablistKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next: number | undefined
    if (event.key === 'ArrowRight') next = (active + 1) % tabs.length
    else if (event.key === 'ArrowLeft') next = (active - 1 + tabs.length) % tabs.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tabs.length - 1
    if (next === undefined) return
    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className={styles.terminal}>
      <div className={styles.chrome}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Code examples"
          onKeyDown={onTablistKeyDown}
        >
          {tabs.map((t, i) => (
            <button
              key={t.label}
              ref={el => {
                tabRefs.current[i] = el
              }}
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              className={`${styles.tab} ${i === active ? styles.tabActive : ''}`}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {filename && <span className={styles.filename}>{filename}</span>}
      </div>
      <pre
        className={styles.pre}
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
      >
        <code dangerouslySetInnerHTML={{ __html: highlight(tab.code) }} />
      </pre>
    </div>
  )
}
