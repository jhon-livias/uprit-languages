import { WhatsAppIcon } from "./icons"
import type { Campus } from "./items"

type CampusPanelProps = {
  campus: Campus
}

export const CampusPanel = ({ campus }: CampusPanelProps) => {
  return (
    <div
      role="tabpanel"
      id={`sede-panel-${campus.id}`}
      aria-labelledby={`sede-tab-${campus.id}`}
      className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-5 md:p-8"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-bold text-heading sm:text-xl md:text-2xl">{campus.name}</h3>
          <p className="mt-1 text-sm text-body">{campus.subtitle}</p>
        </div>
        <a
          href={campus.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-success px-4 py-2 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
        >
          <WhatsAppIcon className="size-5" />
          WhatsApp
        </a>
      </div>
      <img
        src={campus.image}
        alt={campus.imageAlt}
        className="h-[180px] w-full rounded-2xl object-cover object-center sm:h-[220px] md:h-[280px] lg:h-[320px]"
      />
    </div>
  )
}
