import type { CSSProperties } from 'react'

export interface MeshGradientProps {
  colors?: string[]
  showGrid?: boolean
  className?: string
  style?: CSSProperties
}

declare const MeshGradient: (props: MeshGradientProps) => JSX.Element
export default MeshGradient
