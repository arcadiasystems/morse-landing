import { useEffect, useRef, useState } from 'react';

const STYLE_ID = 'morse-terminal-styles';
const HLJS_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';

const css = `
.morse-term {
  background: linear-gradient(to right top, #141414cc, #1f203f99);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  border: 1px solid rgb(70 90 120 / 0.4);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Noto Sans Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  color: rgb(127 134 241);
}

.morse-term__header {
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.morse-term__dots { display: flex; align-items: center; }
.morse-term__dot {
  width: 0.75rem; height: 0.75rem;
  border-radius: 9999px;
  margin-right: 0.5rem;
  opacity: 0.5;
  display: inline-block;
}
.morse-term__dot--red    { background: rgb(223 47 8); }
.morse-term__dot--yellow { background: rgb(253 161 16); }
.morse-term__dot--green  { background: rgb(3 169 99); }

.morse-term__copy {
  background: transparent;
  border: 0;
  cursor: pointer;
  color: rgb(202 203 249);
  padding: 0;
  width: 24px; height: 24px;
  position: relative;
  display: inline-flex; align-items: center; justify-content: center;
  transition: color 0.15s cubic-bezier(.4,0,.2,1);
}
.morse-term__copy:hover { color: rgb(165 169 245); }
.morse-term__copy svg { width: 24px; height: 24px; display: block; }

.morse-term__copy .icon-stack {
  position: relative;
  width: 24px; height: 24px;
}
.morse-term__copy .icon-stack > * {
  position: absolute; inset: 0;
  transition: opacity 1s cubic-bezier(.4,0,.2,1);
}
.morse-term__copy .icon-fade-out { opacity: 0; }
.morse-term__copy .icon-fade-in  { opacity: 1; }

.morse-term__copy .check-explode {
  position: absolute; inset: 0;
  pointer-events: none;
}
.morse-term__copy .check-explode line {
  transform-origin: 12px 12px;
  stroke: rgb(89 253 160);
  stroke-width: 1.5;
  stroke-linecap: round;
  animation:
    morse-explode 0.45s cubic-bezier(.4,0,.2,1) forwards,
    morse-fadeout 0.65s cubic-bezier(.4,0,.2,1) 0.15s forwards;
}
@keyframes morse-explode {
  0% { transform: scale(0); }
  to { transform: scale(1.5); }
}
@keyframes morse-fadeout {
  0%  { opacity: 0.8; }
  to  { opacity: 0; }
}

.morse-term__code-wrap {
  padding: 0 1.5rem 1.5rem;
  min-height: var(--morse-term-min-height, 320px);
  overflow: auto;
  flex: 1 1 auto;
  position: relative;
}
.morse-term__code {
  margin: 0;
  font-family: inherit;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: rgb(127 134 241);
  white-space: pre;
  background: transparent;
  animation: morse-fadein 0.3s ease;
}
.morse-term__code.inactive { opacity: 0; }
@keyframes morse-fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ---------- highlight.js color overrides (custom Morse palette) ---------- */
.morse-term__code .hljs                 { color: rgb(127 134 241); background: transparent; }
.morse-term__code .hljs-comment,
.morse-term__code .hljs-quote           { color: rgb(124 143 177); font-style: italic; }
.morse-term__code .hljs-keyword,
.morse-term__code .hljs-selector-tag    { color: rgb(255 107 255); }
.morse-term__code .hljs-literal,
.morse-term__code .hljs-number,
.morse-term__code .hljs-symbol,
.morse-term__code .hljs-bullet          { color: rgb(152 254 190); }
.morse-term__code .hljs-string,
.morse-term__code .hljs-regexp,
.morse-term__code .hljs-link,
.morse-term__code .hljs-meta-string     { color: rgb(249 168 212); }
.morse-term__code .hljs-built_in,
.morse-term__code .hljs-type,
.morse-term__code .hljs-meta,
.morse-term__code .hljs-attr,
.morse-term__code .hljs-attribute       { color: rgb(255 173 254); }
.morse-term__code .hljs-title,
.morse-term__code .hljs-title.function_,
.morse-term__code .hljs-title.class_,
.morse-term__code .hljs-function .hljs-title,
.morse-term__code .hljs-name            { color: rgb(219 255 75); }
.morse-term__code .hljs-variable,
.morse-term__code .hljs-template-variable,
.morse-term__code .hljs-property,
.morse-term__code .hljs-params          { color: rgb(127 134 241); }

.morse-term__tabs {
  border-top: 1px solid rgb(70 90 120);
  padding: 0.75rem 1.5rem;
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  white-space: nowrap;
  flex-shrink: 0;
  scrollbar-width: none;
}
.morse-term__tabs::-webkit-scrollbar { display: none; }

.morse-term__tab {
  position: relative;
  background: transparent;
  border: 0;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  font-size: 1.125rem;
  color: rgb(202 203 249);
  padding: 0;
  transition: all 0.3s ease;
}
.morse-term__tab:hover { color: white; }
.morse-term__tab.active { color: white; }
.morse-term__tab::after {
  content: '';
  position: absolute;
  bottom: -8px; left: 0;
  height: 4px; width: 100%;
  background: rgb(89 253 160);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.morse-term__tab.active::after { opacity: 1; }
`;

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = css;
  document.head.appendChild(s);
}

let hljsPromise = null;
function loadHljs() {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.hljs) return Promise.resolve(window.hljs);
  if (hljsPromise) return hljsPromise;
  hljsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-morse-hljs]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.hljs));
      existing.addEventListener('error', reject);
      return;
    }
    const s = document.createElement('script');
    s.src = HLJS_SRC;
    s.async = true;
    s.dataset.morseHljs = 'true';
    s.onload = () => resolve(window.hljs);
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return hljsPromise;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const PLAIN_LANGS = new Set(['plaintext', 'text', 'cli', 'shell-session', '']);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="rgb(89 253 160)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ExplodeBurst = () => (
  <span className="check-explode" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
      <line x1="12" y1="2"  x2="12" y2="6"  />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2"  y1="12" x2="6"  y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="5"  y1="5"  x2="8"  y2="8"  />
      <line x1="16" y1="16" x2="19" y2="19" />
      <line x1="19" y1="5"  x2="16" y2="8"  />
      <line x1="8"  y1="16" x2="5"  y2="19" />
    </svg>
  </span>
);

export default function CodeTerminal({ tabs, minHeight = '320px', showCopy = true }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState({});
  const copyTimer = useRef(null);

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    let cancelled = false;
    const tab = tabs[active];
    if (!tab) return;
    const lang = (tab.language || '').toLowerCase();

    if (PLAIN_LANGS.has(lang)) {
      setHighlighted(prev => ({ ...prev, [active]: escapeHtml(tab.code) }));
      return;
    }

    loadHljs()
      .then(hljs => {
        if (cancelled || !hljs) return;
        try {
          const result = hljs.highlight(tab.code, { language: lang, ignoreIllegals: true });
          setHighlighted(prev => ({ ...prev, [active]: result.value }));
        } catch {
          setHighlighted(prev => ({ ...prev, [active]: escapeHtml(tab.code) }));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHighlighted(prev => ({ ...prev, [active]: escapeHtml(tab.code) }));
        }
      });

    return () => { cancelled = true; };
  }, [active, tabs]);

  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);

  function handleCopy() {
    const tab = tabs[active];
    if (!tab) return;
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(tab.code).catch(() => {});
    }
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1600);
  }

  const current = tabs[active];
  const html = highlighted[active] ?? escapeHtml(current?.code || '');
  const lang = (current?.language || 'plaintext').toLowerCase();

  return (
    <div
      className="morse-term"
      style={{ ['--morse-term-min-height']: minHeight }}
    >
      <div className="morse-term__header">
        <div className="morse-term__dots" aria-hidden="true">
          <span className="morse-term__dot morse-term__dot--red"    />
          <span className="morse-term__dot morse-term__dot--yellow" />
          <span className="morse-term__dot morse-term__dot--green"  />
        </div>

        {showCopy && (
          <button
            type="button"
            className="morse-term__copy"
            onClick={handleCopy}
            aria-label={copied ? 'Copied to clipboard' : 'Copy code'}
          >
            <span className="icon-stack">
              <span className={copied ? 'icon-fade-out' : 'icon-fade-in'}><CopyIcon /></span>
              <span className={copied ? 'icon-fade-in'  : 'icon-fade-out'}><CheckIcon /></span>
            </span>
            {copied && <ExplodeBurst key={Date.now()} />}
          </button>
        )}
      </div>

      <div className="morse-term__code-wrap">
        <pre key={active} className="morse-term__code">
          <code
            className={`hljs language-${lang}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </pre>
      </div>

      <div className="morse-term__tabs" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`morse-term__tab ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CodeTerminalDemo() {
  const tabs = [
    {
      label: 'JAVASCRIPT',
      language: 'javascript',
      code: `import { MorseClient } from '@morse-protocol/sdk'

const morse = new MorseClient({ network: 'mainnet' })

// Publish content to Walrus — permanently
const post = await morse.publish({
  title: 'Why Decentralized CMS Wins',
  content: mdContent,
  governance: 'on-chain',
})

// Content is now immutable, AI-readable, forever
console.log(post.walrusId)   // bafkrei...
console.log(post.suiTxHash)  // 0x4f2a...`,
    },
    {
      label: 'TYPESCRIPT',
      language: 'typescript',
      code: `import { MorseClient, Post, PublishOptions } from '@morse-protocol/sdk'

const morse = new MorseClient({ network: 'mainnet' })

async function publishPost(content: string): Promise<Post> {
  const options: PublishOptions = {
    governance: 'on-chain',
    aiIndexed: true,       // AI agents can query this
    revisionPolicy: 'immutable',
  }
  return morse.publish({ content, ...options })
}`,
    },
    {
      label: 'CLI',
      language: 'plaintext',
      code: `# Install
npm install -g @morse-protocol/cli

# Authenticate with your Sui wallet
morse auth --wallet 0x4f2a...

# Publish content
morse publish ./my-article.md

# ✓ Stored on Walrus  [bafkrei...]
# ✓ Recorded on Sui   [0x4f2a...]
# ✓ AI-indexed        [morse.network/content/bafkrei...]`,
    },
  ];

  return (
    <div style={{
      background: '#141414',
      minHeight: '100vh',
      padding: '4rem 2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}>
      <div style={{ width: '100%', maxWidth: 760 }}>
        <CodeTerminal tabs={tabs} minHeight="420px" />
      </div>
    </div>
  );
}
