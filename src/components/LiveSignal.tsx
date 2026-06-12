import type { CSSProperties } from 'react'
import { Reveal } from '../ui/Reveal'
import { FramePlate } from '../ui/FramePlate'
import { LivingDiff } from './LivingDiff'
import styles from './LiveSignal.module.css'

/**
 * The product proof, framed: LivingDiff's edit→commit→verify loop inside a
 * gradient-washed plate, lit from below.
 */
export function LiveSignal() {
  return (
    <section
      className={`section-pad glow-field ${styles.section}`}
      style={{ '--glow-y': '100%', '--glow-h': '50%' } as CSSProperties}
      aria-labelledby="live-signal-title"
    >
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <p className="eyebrow">ON AIR</p>
          <h2 id="live-signal-title" className="display-h2">
            WATCH A REVISION
            <br />
            GO ON-CHAIN.
          </h2>
        </Reveal>
        <Reveal variant="scale" delay={120} className={styles.frameWrap}>
          <FramePlate caption="EDIT → COMMIT → ON-CHAIN PROOF" captionStatus="DEMO LOOP" tint="signal">
            <LivingDiff />
          </FramePlate>
        </Reveal>
      </div>
    </section>
  )
}
