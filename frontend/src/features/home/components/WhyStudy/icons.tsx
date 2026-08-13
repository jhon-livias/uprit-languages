type IconProps = {
  className?: string
  paintId: string
}

export const ChevronLeftIcon = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 5-7 7 7 7" />
    </svg>
  )
}

export const ChevronRightIcon = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 5 7 7-7 7" />
    </svg>
  )
}

export const SpeechBubblesIcon = ({ className, paintId }: IconProps) => {
  const gold = `${paintId}-gold`
  const wine = `${paintId}-wine`
  const shadow = `${paintId}-shadow`

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gold} x1="18" y1="8" x2="58" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE08A" />
          <stop offset="1" stopColor="#F8B81F" />
        </linearGradient>
        <linearGradient id={wine} x1="4" y1="18" x2="42" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EE4A62" />
          <stop offset="1" stopColor="#91001E" />
        </linearGradient>
        <filter id={shadow} x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.2" floodColor="#111822" floodOpacity="0.22" />
        </filter>
      </defs>
      <ellipse cx="32" cy="58" rx="16" ry="2.6" fill="#111822" opacity="0.12" />
      <path
        filter={`url(#${shadow})`}
        fill={`url(#${gold})`}
        d="M28.5 10.5h22.2c3.6 0 6.5 2.9 6.5 6.5v13.2c0 3.6-2.9 6.5-6.5 6.5H43.4L37 43.4l.8-6.7h-9.3c-3.6 0-6.5-2.9-6.5-6.5V17c0-3.6 2.9-6.5 6.5-6.5Z"
      />
      <circle cx="36.2" cy="23.6" r="1.7" fill="#7A4A00" opacity="0.45" />
      <circle cx="41.6" cy="23.6" r="1.7" fill="#7A4A00" opacity="0.45" />
      <circle cx="47" cy="23.6" r="1.7" fill="#7A4A00" opacity="0.45" />
      <path
        filter={`url(#${shadow})`}
        fill={`url(#${wine})`}
        d="M7.8 22.2h24.4c3.8 0 6.8 3 6.8 6.8v14.4c0 3.8-3 6.8-6.8 6.8H21.2L13.6 58l1.2-8H7.8c-3.8 0-6.8-3-6.8-6.8V29c0-3.8 3-6.8 6.8-6.8Z"
      />
      <circle cx="16.2" cy="36.4" r="2" fill="#fff" />
      <circle cx="22.4" cy="36.4" r="2" fill="#fff" />
      <circle cx="28.6" cy="36.4" r="2" fill="#fff" />
    </svg>
  )
}

export const CertificateIcon = ({ className, paintId }: IconProps) => {
  const paper = `${paintId}-paper`
  const seal = `${paintId}-seal`
  const shadow = `${paintId}-shadow`

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={paper} x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E8EEF2" />
        </linearGradient>
        <linearGradient id={seal} x1="28" y1="30" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EE4A62" />
          <stop offset="1" stopColor="#91001E" />
        </linearGradient>
        <filter id={shadow} x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.2" floodColor="#111822" floodOpacity="0.22" />
        </filter>
      </defs>
      <ellipse cx="32" cy="58.5" rx="15" ry="2.4" fill="#111822" opacity="0.12" />
      <rect x="16" y="8" width="34" height="42" rx="3" fill="#D7DEE4" />
      <rect filter={`url(#${shadow})`} x="12" y="11" width="34" height="42" rx="3" fill={`url(#${paper})`} />
      <rect x="18" y="18" width="22" height="3.2" rx="1.6" fill="#1D3557" opacity="0.85" />
      <rect x="18" y="25" width="18" height="2.2" rx="1.1" fill="#7EAFC4" />
      <rect x="18" y="30" width="16" height="2.2" rx="1.1" fill="#7EAFC4" />
      <circle filter={`url(#${shadow})`} cx="37.5" cy="43" r="8.2" fill={`url(#${seal})`} />
      <path fill="#F8B81F" d="M37.5 37.6 39 41.2l3.9.3-3 2.7.9 3.8-3.8-2.1-3.8 2.1.9-3.8-3-2.7 3.9-.3Z" />
    </svg>
  )
}

export const PuzzleIcon = ({ className, paintId }: IconProps) => {
  const shadow = `${paintId}-shadow`

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <filter id={shadow} x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.2" floodColor="#111822" floodOpacity="0.22" />
        </filter>
      </defs>
      <ellipse cx="32" cy="58.5" rx="16" ry="2.5" fill="#111822" opacity="0.12" />
      <g filter={`url(#${shadow})`}>
        <path fill="#EE4A62" d="M10 12h14c0 4 3 7 7 7v14H10V12Z" />
        <path fill="#1BA2DB" d="M33 12h14v14c-4 0-7 3-7 7H33V12Z" />
        <path fill="#3EB75E" d="M10 35h14c0-4 3-7 7-7v21H10V35Z" />
        <path fill="#F8B81F" d="M33 40c4 0 7-3 7-7h11v21H33V40Z" />
      </g>
    </svg>
  )
}

export const ModesIcon = ({ className, paintId }: IconProps) => {
  const screen = `${paintId}-screen`
  const body = `${paintId}-body`
  const shadow = `${paintId}-shadow`

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={screen} x1="12" y1="10" x2="52" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7EAFC4" />
          <stop offset="1" stopColor="#1D3557" />
        </linearGradient>
        <linearGradient id={body} x1="8" y1="40" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A5563" />
          <stop offset="1" stopColor="#20272F" />
        </linearGradient>
        <filter id={shadow} x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.2" floodColor="#111822" floodOpacity="0.22" />
        </filter>
      </defs>
      <ellipse cx="32" cy="58.5" rx="16" ry="2.5" fill="#111822" opacity="0.12" />
      <g filter={`url(#${shadow})`}>
        <rect x="12" y="10" width="40" height="28" rx="4" fill={`url(#${screen})`} />
        <rect x="15.5" y="13.5" width="33" height="21" rx="2" fill="#111822" opacity="0.25" />
        <path fill="#F8B81F" d="M32 18.5 36.2 27h-8.4L32 18.5Z" />
        <path fill={`url(#${body})`} d="M8 40h48l-4 8H12L8 40Z" />
      </g>
    </svg>
  )
}
