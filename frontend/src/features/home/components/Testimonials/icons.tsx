type IconProps = {
  className?: string
}

export const ChevronLeftIcon = ({ className }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 5-7 7 7 7" />
    </svg>
  )
}

export const ChevronRightIcon = ({ className }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 5 7 7-7 7" />
    </svg>
  )
}

export const PlayIcon = ({ className }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M8.4 5.6v12.8L19.2 12 8.4 5.6Z" />
    </svg>
  )
}
