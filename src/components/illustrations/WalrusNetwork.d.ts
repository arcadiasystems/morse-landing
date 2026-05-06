import type { CSSProperties } from 'react'

export interface WalrusNetworkProps {
  className?: string
  style?: CSSProperties
}

declare const WalrusNetwork: (props: WalrusNetworkProps) => JSX.Element
export default WalrusNetwork
