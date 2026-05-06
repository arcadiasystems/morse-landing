export interface CodeTerminalTab {
  label: string
  language: string
  code: string
}

export interface CodeTerminalProps {
  tabs: CodeTerminalTab[]
  minHeight?: string
  showCopy?: boolean
}

declare const CodeTerminal: (props: CodeTerminalProps) => JSX.Element
export default CodeTerminal
export function CodeTerminalDemo(): JSX.Element
