import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * SMIL animations ignore CSS `animation` rules, so reduced motion has to go
 * through the SVG timeline API. Reduced-motion users get the timeline paused
 * on its opening frame (a complete static composition); everyone else gets it
 * paused whenever the SVG is off-screen.
 */
export function useSmilPlayback() {
  const ref = useRef<SVGSVGElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    if (reducedMotion) {
      svg.pauseAnimations()
      return
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) svg.unpauseAnimations()
      else svg.pauseAnimations()
    })
    io.observe(svg)
    return () => io.disconnect()
  }, [reducedMotion])

  return ref
}
