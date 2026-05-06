import type { CSSProperties } from 'react'

export interface DeployPipelineProps {
  className?: string
  style?: CSSProperties
}

declare const DeployPipeline: (props: DeployPipelineProps) => JSX.Element
export default DeployPipeline
