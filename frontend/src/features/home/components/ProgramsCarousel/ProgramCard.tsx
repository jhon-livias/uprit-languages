type ProgramCardProps = {
  title: string
  href: string
  src: string
  alt: string
  width: number
}

const titleClass =
  "font-heading text-center text-[0.8rem] leading-snug font-semibold tracking-[0.06em] text-white uppercase sm:text-[0.88rem] md:text-[0.95rem] lg:text-[1.02rem]"

export const ProgramCard = ({ title, href, src, alt, width }: ProgramCardProps) => {
  return (
    <a
      href={href}
      draggable={false}
      onDragStart={(event) => event.preventDefault()}
      className="group relative block h-full shrink-0 overflow-hidden [-webkit-user-drag:none] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-cta"
      style={{ width }}
    >
      <img src={src} alt={alt} draggable={false} className="size-full object-cover object-center" />
      <span className="absolute inset-0 bg-black/25" aria-hidden="true" />

      <span
        className="absolute inset-0 flex items-center justify-center px-4 transition-opacity duration-500 ease-out group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none"
      >
        <span className={titleClass}>{title}</span>
      </span>

      <span
        className="absolute inset-x-0 bottom-0 flex h-[38%] items-center justify-center bg-program-overlay/80 px-4 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        aria-hidden="true"
      >
        <span className={titleClass}>{title}</span>
      </span>
    </a>
  )
}
