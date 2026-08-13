type IconProps = {
  className?: string
}

export const FacebookIcon = ({ className }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M14.5 8.5V6.8c0-.7.5-1.1 1.2-1.1h1.3V3h-2.3C12.2 3 11 4.5 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7z" />
    </svg>
  )
}

export const InstagramIcon = ({ className }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.7" cy="7.3" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export const YoutubeIcon = ({ className }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M21.6 8.2a2.8 2.8 0 0 0-2-2C17.8 6 12 6 12 6s-5.8 0-7.6.2a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.2 12a29 29 0 0 0 .2 3.8 2.8 2.8 0 0 0 2 2C6.2 18 12 18 12 18s5.8 0 7.6-.2a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .2-3.8 29 29 0 0 0-.2-3.8zM10.2 14.8V9.2L15.2 12l-5 2.8z" />
    </svg>
  )
}

export const LinkedinIcon = ({ className }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M7.1 9.3H4.4V20h2.7V9.3zM5.7 4C4.8 4 4 4.8 4 5.8s.8 1.8 1.7 1.8 1.8-.8 1.8-1.8S6.7 4 5.7 4zM20 20h-2.7v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H11V9.3h2.6v1.5h.1c.4-.7 1.3-1.7 2.8-1.7 3 0 3.5 2 3.5 4.5V20z" />
    </svg>
  )
}
