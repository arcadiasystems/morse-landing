import type { CSSProperties } from 'react'

export interface MeshGradientProps {
  colors?: string[]
  showGrid?: boolean
  showNoise?: boolean
  showVignette?: boolean
  showAurora?: boolean
  className?: string
  style?: CSSProperties
}

declare const MeshGradient: (props: MeshGradientProps) => JSX.Element
export default MeshGradient
