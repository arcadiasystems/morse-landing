/**
 * The brand pulse: two square humps on a baseline, the same shape as the
 * mark. Returns an SVG path that starts at (0, baseline), steps `unit` wide
 * and rises `height` above the baseline. Total length is five units.
 */
export function pulsePath(baseline: number, unit: number, height: number): string {
  const top = baseline - height
  return [
    `M0 ${baseline}`,
    `H${unit} V${top} H${unit * 2} V${baseline}`,
    `H${unit * 3} V${top} H${unit * 4} V${baseline}`,
    `H${unit * 5}`,
  ].join(' ')
}

/** The mark itself, on a 100-unit viewBox at stroke 16. */
export const MARK_PATH = 'M8 72 V30 H36 V72 H64 V30 H92 V72'
