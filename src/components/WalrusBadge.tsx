import { pulsePath } from '../lib/pulse'
import { useSmilPlayback } from '../lib/useSmilPlayback'
import { WalrusSymbol } from '../ui/PartnerLogos'
import styles from './WalrusBadge.module.css'

const TRACE_PATH = pulsePath(13, 6, 9)
/** Five 6-unit runs plus four 9-unit rises. */
const TRACE_LENGTH = 66

/**
 * Hero status label: the Walrus symbol on a ticket stub, a perforation,
 * the network name, and a live trace of the brand pulse sweeping through.
 */
export function WalrusBadge() {
  const traceRef = useSmilPlayback()

  return (
    <p className={styles.badge}>
      <span className={styles.stub}>
        <WalrusSymbol className={styles.symbol} />
      </span>
      <span className={styles.text}>
        Live on <strong className={styles.network}>Walrus Mainnet</strong>
      </span>
      <svg ref={traceRef} className={styles.trace} viewBox="-1 0 32 16" aria-hidden="true">
        <path className={styles.traceBed} d={TRACE_PATH} />
        <path className={styles.traceLive} d={TRACE_PATH} strokeDasharray={TRACE_LENGTH}>
          {/* Sweeps out and back in; the opening frame is the full trace. */}
          <animate
            attributeName="stroke-dashoffset"
            values={`0;${-2 * TRACE_LENGTH}`}
            dur="2.4s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </p>
  )
}
