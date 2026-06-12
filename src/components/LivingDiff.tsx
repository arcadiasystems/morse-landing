import { Fragment, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import styles from './LivingDiff.module.css'

type Phase = 'idle' | 'strike' | 'type' | 'command' | 'digest' | 'stamp' | 'verified'

const PHASE_ORDER: Record<Phase, number> = {
  idle: 0,
  strike: 1,
  type: 2,
  command: 3,
  digest: 4,
  stamp: 5,
  verified: 6,
}

const reached = (phase: Phase, milestone: Phase) => PHASE_ORDER[phase] >= PHASE_ORDER[milestone]

interface DiffVariant {
  /** Index into DOC_LINES of the sentence that gets struck. */
  target: number
  replacement: string
}

const DOC_LINES = [
  'Morse anchors every entry on Sui.',
  'Payloads live on Walrus blobs.',
  'Each revision ships with a proof.',
] as const

const VARIANTS: DiffVariant[] = [
  { target: 1, replacement: 'Payloads persist on Walrus forever.' },
  { target: 2, replacement: 'Every revision carries on-chain proof.' },
  { target: 0, replacement: 'Morse anchors entries as Sui objects.' },
]

const COMMIT_CMD = 'morse entry commit'
const DIGEST_LINE = 'tx 0x4f2a…9c1b ✓ VERIFIED'
const BASE_REV = 42

const formatRev = (rev: number) => String(rev).padStart(4, '0')

interface DiffView {
  variant: number
  phase: Phase
  typed: number
  cmd: number
  digest: number
  rev: number
}

const IDLE_VIEW: DiffView = { variant: 0, phase: 'idle', typed: 0, cmd: 0, digest: 0, rev: BASE_REV }

const VERIFIED_VIEW: DiffView = {
  variant: 0,
  phase: 'verified',
  typed: VARIANTS[0].replacement.length,
  cmd: COMMIT_CMD.length,
  digest: DIGEST_LINE.length,
  rev: BASE_REV + 1,
}

/**
 * The product demo as art: a flat file plate that edits itself, commits,
 * and verifies on-chain in a ~12s loop over three scripted variations.
 * Paused off-viewport; reduced motion renders the final verified state.
 */
export function LivingDiff() {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [view, setView] = useState<DiffView>(IDLE_VIEW)
  const revRef = useRef(BASE_REV)
  const variantRef = useRef(0)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => setActive(entries[entries.length - 1].isIntersecting),
      { threshold: 0.2 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !active) return

    // The script is strictly sequential, so one pending timer is enough.
    let timer = 0
    const run = (ms: number, fn: () => void) => {
      timer = window.setTimeout(fn, ms)
    }

    const cycle = () => {
      const index = variantRef.current
      const { replacement } = VARIANTS[index]
      let frame: DiffView = {
        variant: index,
        phase: 'idle',
        typed: 0,
        cmd: 0,
        digest: 0,
        rev: revRef.current,
      }
      const push = (patch: Partial<DiffView>) => {
        frame = { ...frame, ...patch }
        setView(frame)
      }

      const hold = () =>
        run(5400, () => {
          variantRef.current = (index + 1) % VARIANTS.length
          cycle()
        })
      const roll = () => {
        revRef.current += 1
        push({ phase: 'verified', rev: revRef.current })
        hold()
      }
      const stamp = () => {
        push({ phase: 'stamp' })
        run(650, roll)
      }
      const spoolDigest = () => {
        if (frame.digest < DIGEST_LINE.length) {
          push({ phase: 'digest', digest: frame.digest + 1 })
          run(24, spoolDigest)
        } else {
          run(250, stamp)
        }
      }
      const typeCommand = () => {
        if (frame.cmd < COMMIT_CMD.length) {
          push({ phase: 'command', cmd: frame.cmd + 1 })
          run(32, typeCommand)
        } else {
          run(350, spoolDigest)
        }
      }
      const typeReplacement = () => {
        if (frame.typed < replacement.length) {
          push({ phase: 'type', typed: frame.typed + 1 })
          run(34, typeReplacement)
        } else {
          run(500, typeCommand)
        }
      }
      const strike = () => {
        push({ phase: 'strike' })
        run(800, typeReplacement)
      }

      push({})
      run(1800, strike)
    }

    cycle()
    return () => window.clearTimeout(timer)
  }, [active, reduced])

  const shown = reduced ? VERIFIED_VIEW : view
  const variant = VARIANTS[shown.variant]

  return (
    <div
      ref={rootRef}
      className={styles.plate}
      role="group"
      aria-label="Live revision demo: an entry is edited, committed, and verified on Sui"
    >
      <div aria-hidden="true">
        <div className={styles.header}>
          <span>posts/hello-world.md</span>
          <span className={styles.rev}>
            rev
            <span className={styles.revDigits}>
              <span key={shown.rev} className={styles.revValue}>
                {formatRev(shown.rev)}
              </span>
            </span>
          </span>
        </div>

        <div className={styles.body}>
          <p className={styles.heading}>
            <span className={styles.mark}>#</span>Hello World
          </p>
          {DOC_LINES.map((line, i) => {
            const isTarget = i === variant.target
            const struck = isTarget && reached(shown.phase, 'strike')
            return (
              <Fragment key={line}>
                <p className={struck ? `${styles.line} ${styles.struck}` : styles.line}>{line}</p>
                {isTarget && (
                  <p className={styles.insert}>
                    {variant.replacement.slice(0, shown.typed)}
                    {shown.phase === 'type' && <span className={styles.caret} />}
                  </p>
                )}
              </Fragment>
            )
          })}
        </div>

        <div className={styles.gutter}>
          <p className={styles.cmd}>
            <span className={styles.prompt}>$</span>
            {COMMIT_CMD.slice(0, shown.cmd)}
            {shown.phase === 'command' && <span className={styles.caret} />}
          </p>
          <p className={styles.digestRow}>
            <span className={styles.digest}>{DIGEST_LINE.slice(0, shown.digest)}</span>
            {reached(shown.phase, 'stamp') && (
              <span className={`mono-stamp ${styles.stamp}`}>ON-CHAIN</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
