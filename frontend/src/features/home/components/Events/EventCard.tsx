import clsx from "clsx"
import { formatEventDate, type HomeEvent } from "./items"

type EventCardProps = {
  event: HomeEvent
  variant: "featured" | "compact"
}

export const EventCard = ({ event, variant }: EventCardProps) => {
  const isFeatured = variant === "featured"

  return (
    <a
      href={event.href}
      aria-label={`Conocer más sobre ${event.title}`}
      className={clsx(
        "group flex h-full overflow-hidden rounded-[1.75rem] bg-primary text-white shadow-[0_8px_24px_rgba(238,74,98,0.18)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cta",
        isFeatured ? "min-h-[22rem] flex-col md:min-h-0" : "min-h-0 flex-col sm:min-h-[13.5rem] sm:flex-row",
      )}
    >
      <img
        src={event.image}
        alt={event.imageAlt}
        className={clsx(
          "object-cover object-center",
          isFeatured
            ? "h-[11rem] w-full md:h-auto md:min-h-0 md:flex-1"
            : "h-40 w-full shrink-0 sm:h-[13.5rem] sm:w-[42%] md:h-full",
        )}
      />
      <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6">
        <time
          dateTime={event.date}
          className="inline-flex w-fit rounded-lg bg-white px-3 py-1 font-heading text-[0.65rem] font-bold tracking-[0.06em] text-heading uppercase sm:text-[0.68rem]"
        >
          {formatEventDate(event.date)}
        </time>
        <h3 className="mt-3 font-heading text-[1.05rem] leading-tight font-bold sm:text-[1.15rem] md:text-[1.35rem]">{event.title}</h3>
        <span className="mt-4 inline-flex h-9 w-fit items-center justify-center self-center rounded-full border-2 border-white px-5 text-xs font-semibold transition-colors duration-200 group-hover:bg-white group-hover:text-primary sm:mt-auto sm:h-10 sm:px-6 sm:text-sm">
          Conocer más
        </span>
      </div>
    </a>
  )
}
