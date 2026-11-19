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

/**
 * The bone Trace raised over the product's accent in the bottom band (y 80 to 94), as Press,
 * Agent Publisher and Site Importer draw it.
 */
function RaisedTile({ size, field, children }: TileProps) {
  return (
    <Tile size={size} field={field}>
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
        {children}
      </g>
    </Tile>
  )
}

/** Morse Press: the Trace raised over the vermilion press bed, on warm black. */
export function PressTile({ size }: ProductTileProps) {
  return (
    <RaisedTile size={size} field="#0A0807">
      <rect x={8} y={80} width={84} height={14} rx={7} fill="#FF5A36" />
    </RaisedTile>
  )
}

/**
 * Morse Agent Publisher: a Process Magenta dot and dash, A in Morse, on magenta black. Its
 * favicon also holds a pixel-grid drawing for 20px and under; the lockups draw the tile larger,
 * so only the full drawing is here.
 */
export function AgentPublisherTile({ size }: ProductTileProps) {
  return (
    <RaisedTile size={size} field="#0A070A">
      <circle cx={15} cy={87} r={7} fill="#FF3EA5" />
      <rect x={30} y={80} width={62} height={14} rx={7} fill="#FF3EA5" />
    </RaisedTile>
  )
}

const IMPORTER_SEGMENTS = [8, 38, 68]

/** Morse Site Importer: three Marker Yellow segments, one site in and many entries out, on yellow black. */
export function SiteImporterTile({ size }: ProductTileProps) {
  return (
    <RaisedTile size={size} field="#0A0A06">
      {IMPORTER_SEGMENTS.map(x => (
        <rect key={x} x={x} y={80} width={24} height={14} rx={7} fill="#FFE62E" />
      ))}
    </RaisedTile>
  )
}
