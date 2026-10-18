import { useId } from 'react'

/* Official marks of the languages Morse is built in. Unlike the partner
   marks, these keep their own colours: TypeScript's guidelines ask for the
   blue mark with a white "TS", and Move's symbol is a two-colour gradient.
   Path geometry is unchanged from the sources. */

interface LogoProps {
  className?: string
}

/** TypeScript "TS" mark, from the typescriptlang.org/branding asset pack. Decorative: pair it with text. */
export function TypeScriptLogo({ className }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 128 128" width="128" height="128" aria-hidden="true">
      <rect fill="#3178c6" width="128" height="128" rx="6" />
      <path
        fill="#fff"
        fillRule="evenodd"
        clipRule="evenodd"
        d="m74.2622 99.468v14.026c2.2724 1.168 4.9598 2.045 8.0625 2.629 3.1027.585 6.3728.877 9.8105.877 3.3503 0 6.533-.321 9.5478-.964 3.016-.643 5.659-1.702 7.932-3.178 2.272-1.476 4.071-3.404 5.397-5.786 1.325-2.381 1.988-5.325 1.988-8.8313 0-2.5421-.379-4.7701-1.136-6.6841-.758-1.9139-1.85-3.6159-3.278-5.1062-1.427-1.4902-3.139-2.827-5.134-4.0104-1.996-1.1834-4.246-2.3011-6.752-3.353-1.8352-.7597-3.4812-1.4975-4.9378-2.2134-1.4567-.7159-2.6948-1.4464-3.7144-2.1915-1.0197-.7452-1.8063-1.5341-2.3598-2.3669-.5535-.8327-.8303-1.7751-.8303-2.827 0-.9643.2476-1.8336.7429-2.6079s1.1945-1.4391 2.0976-1.9943c.9031-.5551 2.0101-.9861 3.3211-1.2929 1.311-.3069 2.7676-.4603 4.3699-.4603 1.1658 0 2.3958.0877 3.6928.263 1.296.1753 2.6.4456 3.911.8109 1.311.3652 2.585.8254 3.824 1.3806 1.238.5552 2.381 1.198 3.43 1.9285v-13.1051c-2.127-.8182-4.45-1.4245-6.97-1.819s-5.411-.5917-8.6744-.5917c-3.3211 0-6.4674.3579-9.439 1.0738-2.9715.7159-5.5862 1.8336-7.844 3.353-2.2578 1.5195-4.0422 3.4553-5.3531 5.8075-1.311 2.3522-1.9665 5.1646-1.9665 8.4373 0 4.1785 1.2017 7.7433 3.6052 10.6945 2.4035 2.9513 6.0523 5.4496 10.9466 7.495 1.9228.7889 3.7145 1.5633 5.375 2.323 1.6606.7597 3.0954 1.5486 4.3044 2.3668s2.1628 1.7094 2.8618 2.6736c.7.9643 1.049 2.06 1.049 3.2873 0 .9062-.218 1.7462-.655 2.5202s-1.1 1.446-1.9885 2.016c-.8886.57-1.9956 1.016-3.3212 1.337-1.3255.321-2.8768.482-4.6539.482-3.0299 0-6.0305-.533-9.0021-1.6-2.9715-1.066-5.7245-2.666-8.2591-4.799zm-23.5596-34.9136h18.2974v-11.5544h-51v11.5544h18.2079v51.4456h14.4947z"
      />
    </svg>
  )
}

/**
 * Move symbol (the switch), from the move-language/move repository's
 * assets/color/SVG. The viewBox is framed to the shapes; the source canvas
 * adds empty margin. Decorative: pair it with text.
 */
export function MoveSymbol({ className }: LogoProps) {
  const id = useId()
  const pillGradient = `${id}-pill`
  const knobGradient = `${id}-knob`

  return (
    <svg className={className} viewBox="9 13 242.5 140.5" width="242.5" height="140.5" aria-hidden="true">
      <defs>
        <linearGradient id={pillGradient} gradientUnits="userSpaceOnUse" x1="9.2368" y1="84.1764" x2="209.7086" y2="84.1764">
          <stop offset="0.2383" stopColor="#113BD9" />
          <stop offset="0.7404" stopColor="#1676EA" />
          <stop offset="1" stopColor="#188FF1" />
        </linearGradient>
        <linearGradient id={knobGradient} gradientUnits="userSpaceOnUse" x1="111.3756" y1="83.1338" x2="251.2005" y2="83.1338">
          <stop offset="0" stopColor="#23C6F5" />
          <stop offset="0.4286" stopColor="#25CFF5" />
          <stop offset="0.9956" stopColor="#28E3F5" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${pillGradient})`}
        d="M177,50.79H41.94c-18.06,0-32.71,14.64-32.71,32.71v1.37c0,18.06,14.64,32.71,32.71,32.71H177 c18.06,0,32.71-14.64,32.71-32.71v-1.37C209.71,65.43,195.07,50.79,177,50.79z"
      />
      <path
        opacity="0.1"
        d="M176.31,50.77h-61.18c-5.06,9.68-7.93,20.69-7.93,32.36c0,12.52,3.29,24.27,9.05,34.43l60.05,0 c18.45,0,33.4-14.95,33.4-33.4v0C209.71,65.72,194.76,50.77,176.31,50.77z"
      />
      <circle opacity="0.85" fill={`url(#${knobGradient})`} cx="181.29" cy="83.13" r="69.91" />
    </svg>
  )
}
