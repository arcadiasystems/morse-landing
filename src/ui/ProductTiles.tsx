import type { ReactNode } from 'react'
import { MARK_PATH } from '../lib/pulse'

interface ProductTileProps {
  size: number
}

interface TileProps extends ProductTileProps {
  /** The product's own dark field, or Ultramarine for Morse Uploader. */
  field: string
  children: ReactNode
}

/* The geometry of each product's favicon.svg: a 100-unit tile with a 22-unit
   corner and the mark at 0.64. Inline SVG cannot read CSS variables, so every
   colour is the literal hex from the product's own file. */
function Tile({ size, field, children }: TileProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <rect width={100} height={100} rx={22} fill={field} />
      {children}
    </svg>
  )
}

/** The Trace centred on a tile, as Receipts, Agents and Uploader draw it. */
function TraceTile({ size, field, stroke }: ProductTileProps & { field: string; stroke: string }) {
  return (
    <Tile size={size} field={field}>
      <path
        d={MARK_PATH}
        transform="translate(18 17.36) scale(0.64)"
        fill="none"
        stroke={stroke}
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Tile>
  )
}

/** Morse Receipts: paper on neutral black. */
export function ReceiptsTile({ size }: ProductTileProps) {
  return <TraceTile size={size} field="#09090A" stroke="#F6F2E7" />
}

/** Morse Agents: lime on green black. */
export function AgentsTile({ size }: ProductTileProps) {
  return <TraceTile size={size} field="#080A07" stroke="#C6F135" />
}

/** Morse Uploader: the white Trace on Ultramarine. */
export function UploaderTile({ size }: ProductTileProps) {
  return <TraceTile size={size} field="#2B3BE0" stroke="#FFFFFF" />
}

/** Morse Press: the Trace raised over the vermilion press bed, on warm black. */
export function PressTile({ size }: ProductTileProps) {
  return (
    <Tile size={size} field="#0A0807">
      <g transform="translate(18 15.52) scale(0.64)">
        <path
          d={MARK_PATH}
          transform="translate(0 -12)"
          fill="none"
          stroke="#F4F2EC"
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x={8} y={80} width={84} height={14} rx={7} fill="#FF5A36" />
      </g>
    </Tile>
  )
}
