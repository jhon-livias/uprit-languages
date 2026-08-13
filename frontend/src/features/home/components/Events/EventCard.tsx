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
        "group flex h-full overflow-hidden rounded-[1.75rem] bg-secondary text-white shadow-[0_8px_24px_rgba(238,74,98,0.18)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cta",
        isFeatured ? "min-h-[26rem] flex-col lg:min-h-0" : "min-h-[13.5rem] flex-col sm:flex-row",
      )}
    >
      <img
        src={event.image}
        alt={event.imageAlt}
        className={clsx(
          "object-cover object-center",
          isFeatured ? "h-1/2 min-h-[12rem] w-full flex-1" : "h-40 w-full sm:h-auto sm:w-[42%] sm:flex-none",
        )}
      />
      <div className="flex flex-1 flex-col px-5 py-5 md:px-6 md:py-6">
        <time
          dateTime={event.date}
          className="inline-flex w-fit rounded-lg bg-white px-3 py-1 font-heading text-[0.68rem] font-bold tracking-[0.06em] text-heading uppercase"
        >
          {formatEventDate(event.date)}
        </time>
        <h3 className="mt-3 font-heading text-[1.15rem] leading-tight font-bold md:text-[1.35rem]">{event.title}</h3>
        <span className="mt-auto inline-flex h-10 w-fit items-center justify-center self-center rounded-full border-2 border-white px-6 text-sm font-semibold transition-colors duration-200 group-hover:bg-white group-hover:text-secondary">
          Conocer más
        </span>
      </div>
    </a>
  )
}
