import { useEffect } from 'react';

const STYLE_ID = 'morse-button-styles';

const css = `
.morse-btn {
  font-family: 'Noto Sans Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-weight: 500;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  box-sizing: border-box;
  transition-property: color, background-color, border-color, box-shadow;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: 0.15s;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 2px;
  --tw-ring-offset-color: #141414;
  --tw-ring-color: transparent;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
}
@media (min-width: 640px) {
  .morse-btn { font-size: 1rem; }
}

.morse-btn--default { height: 3.5rem;  padding: 0 1.5rem; }
.morse-btn--large   { height: 5rem;    padding: 0 4rem;   }
.morse-btn--small   { height: 2.75rem; padding: 0 1rem;   }

.morse-btn:disabled,
.morse-btn[aria-disabled="true"] { cursor: not-allowed; }

/* ---------- Primary Ultraviolet ---------- */
.morse-btn--primary-ultraviolet {
  color: rgb(248 250 252);
  background-image: linear-gradient(45deg, #b664ff, #444ce7);
  border-radius: 4px;
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), 0 0 #0000;
}
.morse-btn--primary-ultraviolet:hover:not(:disabled):not([aria-disabled="true"]) {
  --tw-ring-color: rgb(68 76 231 / 0.7);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), 0 0 #0000;
}
.morse-btn--primary-ultraviolet:active:not(:disabled):not([aria-disabled="true"]) {
  color: rgb(202 203 249);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), 0 0 #0000;
}
.morse-btn--primary-ultraviolet:disabled,
.morse-btn--primary-ultraviolet[aria-disabled="true"] {
  background-image: linear-gradient(0deg, #0000004d, #0000004d), linear-gradient(45deg, #b664ff, #444ce7);
  color: rgb(248 250 252 / 0.4);
}

/* ---------- Secondary Ultraviolet ---------- */
.morse-btn--secondary-ultraviolet {
  color: white;
  border: 2px solid transparent;
  border-radius: 4px;
  background:
    linear-gradient(#141414, #141414) padding-box,
    linear-gradient(45deg, #444ce7, #b664ff) border-box;
}
.morse-btn--secondary-ultraviolet:hover:not(:disabled):not([aria-disabled="true"]) {
  border: 2px solid rgb(127 134 241);
  background: #141414;
}
.morse-btn--secondary-ultraviolet:disabled,
.morse-btn--secondary-ultraviolet[aria-disabled="true"] {
  color: rgb(255 255 255 / 0.4);
}

/* ---------- Ghost Off-White ---------- */
.morse-btn--ghost-off-white {
  color: rgb(248 250 252);
  background: transparent;
  border-radius: 0;
}
.morse-btn--ghost-off-white:hover:not(:disabled):not([aria-disabled="true"]) {
  color: rgb(146 164 195);
}

/* ---------- Ghost Mist ---------- */
.morse-btn--ghost-mist {
  background-image: linear-gradient(to right, #59fda0, #ff6bff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  width: fit-content;
  border-radius: 0;
}
.morse-btn--ghost-mist:hover:not(:disabled):not([aria-disabled="true"]) {
  background-image: none;
  -webkit-text-fill-color: rgb(248 250 252);
  color: rgb(248 250 252);
}
`;

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

export default function Button({
  variant = 'primary',
  color = 'ultraviolet',
  size = 'default',
  href,
  disabled = false,
  icon,
  onClick,
  children,
  className: extraClassName,
  ...rest
}) {
  useEffect(() => { injectStyles(); }, []);

  const className = [
    'morse-btn',
    `morse-btn--${size}`,
    `morse-btn--${variant}-${color}`,
    extraClassName,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      <span>{children}</span>
      {icon ? <span aria-hidden="true" style={{ display: 'inline-flex' }}>{icon}</span> : null}
    </>
  );

  if (href && !disabled) {
    return (
      <a className={className} href={href} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {content}
    </button>
  );
}

export function ButtonDemo() {
  const arrow = <span style={{ fontSize: '1.1em', lineHeight: 1 }}>→</span>;

  const row = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    alignItems: 'center',
  };
  const label = {
    fontFamily: "'Noto Sans Mono', ui-monospace, monospace",
    color: 'rgb(146 164 195)',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '0.75rem',
  };

  return (
    <div style={{
      background: '#141414',
      minHeight: '100vh',
      padding: '4rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '3rem',
      alignItems: 'flex-start',
    }}>
      <section>
        <div style={label}>Variants — default size</div>
        <div style={row}>
          <Button variant="primary" color="ultraviolet" icon={arrow}>Get started</Button>
          <Button variant="secondary" color="ultraviolet" icon={arrow}>Learn more</Button>
          <Button variant="ghost" color="off-white" icon={arrow}>Read docs</Button>
          <Button variant="ghost" color="mist" icon={arrow}>Explore Morse</Button>
        </div>
      </section>

      <section>
        <div style={label}>Sizes — primary ultraviolet</div>
        <div style={row}>
          <Button variant="primary" color="ultraviolet" size="small">Small</Button>
          <Button variant="primary" color="ultraviolet" size="default">Default</Button>
          <Button variant="primary" color="ultraviolet" size="large" icon={arrow}>Large CTA</Button>
        </div>
      </section>

      <section>
        <div style={label}>Disabled states</div>
        <div style={row}>
          <Button variant="primary" color="ultraviolet" disabled>Primary disabled</Button>
          <Button variant="secondary" color="ultraviolet" disabled>Secondary disabled</Button>
        </div>
      </section>

      <section>
        <div style={label}>As link (href)</div>
        <div style={row}>
          <Button variant="primary" color="ultraviolet" href="#" icon={arrow}>Link button</Button>
        </div>
      </section>
    </div>
  );
}
