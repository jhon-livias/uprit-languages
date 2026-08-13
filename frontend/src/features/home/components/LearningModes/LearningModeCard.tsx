import clsx from "clsx"
import type { LearningMode } from "./modes"

type LearningModeCardProps = {
  title: string
  href: string
  src: string
  alt: string
  tone: LearningMode["tone"]
}

const barToneClass: Record<LearningMode["tone"], string> = {
  info: "bg-info text-white",
  cta: "bg-cta text-cta-fg",
  secondary: "bg-secondary text-white",
  primary: "bg-primary text-white",
}

const ArrowUpRightIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

export const LearningModeCard = ({ title, href, src, alt, tone }: LearningModeCardProps) => {
  return (
    <a
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_8px_24px_rgba(17,24,34,0.08)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cta"
    >
      <img src={src} alt={alt} className="h-[220px] w-full object-cover object-center md:h-[250px]" />
      <span
        className={clsx(
          "flex min-h-14 items-center justify-between gap-3 px-4 py-3 font-heading text-[0.95rem] leading-tight font-bold md:text-[1.05rem]",
          barToneClass[tone],
        )}
      >
        <span className="min-w-0">{title}</span>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-heading transition-transform duration-200 group-hover:scale-105">
          <ArrowUpRightIcon className="size-4" />
        </span>
      </span>
    </a>
  )
}
