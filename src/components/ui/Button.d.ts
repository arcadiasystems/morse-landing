import type { ReactNode, MouseEventHandler, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonColor = 'ultraviolet' | 'mist' | 'off-white'
export type ButtonSize = 'default' | 'large' | 'small'

export interface ButtonProps {
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  href?: string
  disabled?: boolean
  icon?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  children?: ReactNode
  className?: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel']
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  [key: string]: unknown
}

declare const Button: (props: ButtonProps) => JSX.Element
export default Button
export function ButtonDemo(): JSX.Element
