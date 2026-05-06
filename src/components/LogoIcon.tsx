export function LogoIcon({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="34" height="34" rx="8" fill="#0D1A2E" stroke="rgba(0,212,180,0.25)" strokeWidth="1"/>
      <path d="M5 26V10L12 19L17 12L22 19L29 10V26" stroke="#00D4B4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="17" cy="21" r="2" fill="#00D4B4"/>
      <rect x="11" y="27" width="4" height="1.5" rx="0.75" fill="#00D4B4" opacity="0.7"/>
      <rect x="16.5" y="27" width="7" height="1.5" rx="0.75" fill="#00D4B4" opacity="0.7"/>
    </svg>
  )
}
