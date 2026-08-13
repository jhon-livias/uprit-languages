type ProgramCardProps = {
  title: string
  href: string
  src: string
  alt: string
  width: number
}

const titleClass =
  "font-heading text-center text-[0.72rem] leading-snug font-semibold tracking-[0.06em] text-white uppercase sm:text-[0.88rem] md:text-[0.95rem] lg:text-[1.02rem]"

export const ProgramCard = ({ title, href, src, alt, width }: ProgramCardProps) => {
  return (
    <a
      href={href}
      draggable={false}
      onDragStart={(event) => event.preventDefault()}
      className="group relative block h-full shrink-0 overflow-hidden [-webkit-user-drag:none] [-webkit-touch-callout:none] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-cta"
      style={{ width }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="pointer-events-none size-full object-cover object-center [-webkit-user-drag:none]"
      />
      <span className="absolute inset-0 bg-black/25" aria-hidden="true" />

      <span
        className="absolute inset-0 flex items-center justify-center px-2 transition-opacity duration-500 ease-out motion-reduce:transition-none sm:px-4 [@media(hover:hover)]:group-hover:opacity-0 [@media(hover:hover)]:group-focus-visible:opacity-0"
      >
        <span className={titleClass}>{title}</span>
      </span>

      <span
        className="absolute inset-x-0 bottom-0 flex h-[38%] items-center justify-center bg-primary/85 px-2 opacity-0 transition-opacity duration-500 ease-out motion-reduce:transition-none sm:px-4 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100"
        aria-hidden="true"
      >
        <span className={titleClass}>{title}</span>
      </span>
    </a>
  )
}
