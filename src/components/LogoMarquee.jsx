import { useEffect } from 'react'

const STYLE_ID = 'morse-marquee-styles'

const css = `
.morse-marquee {
  background: #080b18;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 28px 0;
  overflow: hidden;
}

.morse-marquee__label {
  font-family: 'Noto Sans Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  color: rgba(200, 215, 235, 0.3);
  margin-bottom: 20px;
}

.morse-marquee__viewport {
  position: relative;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
}

.morse-marquee__track {
  display: flex;
  width: max-content;
  animation: morse-marquee 35s linear infinite;
}

.morse-marquee__track:hover {
  animation-play-state: paused;
}

@keyframes morse-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.morse-marquee__group {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.morse-marquee__item {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 40px;
  font-family: 'Noto Sans Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  font-weight: 600;
  color: rgba(200, 215, 235, 0.25);
  white-space: nowrap;
  letter-spacing: 0.02em;
  transition: color 0.15s cubic-bezier(.4, 0, .2, 1);
}

.morse-marquee__item:hover {
  color: rgba(200, 215, 235, 0.6);
}

.morse-marquee__item::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.08);
}

@media (prefers-reduced-motion: reduce) {
  .morse-marquee__track { animation: none; }
}
`

function injectStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const s = document.createElement('style')
  s.id = STYLE_ID
  s.textContent = css
  document.head.appendChild(s)
}

const LOGOS = [
  'Anthropic',
  'OpenAI',
  'Sui Foundation',
  'Walrus Foundation',
  'Seal Encryption',
  'Mysten Labs',
  'Cetus',
  'Scallop',
  'Navi Protocol',
  'SuiNetwork',
]

export function LogoMarquee() {
  useEffect(() => { injectStyles() }, [])

  return (
    <div className="morse-marquee">
      <p className="morse-marquee__label">Trusted by builders on Sui</p>

      <div className="morse-marquee__viewport">
        <div className="morse-marquee__track">
          {/* group 1 */}
          <div className="morse-marquee__group" aria-hidden="false">
            {LOGOS.map((name) => (
              <span key={`a-${name}`} className="morse-marquee__item">{name}</span>
            ))}
          </div>
          {/* group 2 — duplicate for seamless loop */}
          <div className="morse-marquee__group" aria-hidden="true">
            {LOGOS.map((name) => (
              <span key={`b-${name}`} className="morse-marquee__item">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
