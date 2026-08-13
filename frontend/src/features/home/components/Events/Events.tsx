import { EventCard } from "./EventCard"
import { homeEvents } from "./items"

export const Events = () => {
  const featuredEvent = homeEvents[0]
  const compactEvents = homeEvents.slice(1)

  if (!featuredEvent) {
    return null
  }

  return (
    <section aria-labelledby="eventos-heading" className="bg-white py-10 md:py-16">
      <div className="mx-auto w-[90%] max-w-[1440px] lg:w-[70%]">
        <h2
          id="eventos-heading"
          className="mb-8 px-1 text-center font-heading text-[1.5rem] font-bold text-primary sm:text-[1.75rem] md:mb-12 md:text-[2.15rem]"
        >
          UPRIT Eventos
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:h-[32rem] md:grid-cols-2 md:grid-rows-2 lg:h-[36rem]">
          <div className="h-full md:row-span-2">
            <EventCard event={featuredEvent} variant="featured" />
          </div>
          {compactEvents.map((event) => (
            <EventCard key={event.id} event={event} variant="compact" />
          ))}
        </div>

        <div className="mt-10 text-center md:mt-12">
          <a
            href="/eventos"
            className="inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full bg-primary px-8 font-heading text-sm font-bold tracking-[0.08em] text-white uppercase transition-colors duration-200 hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta sm:w-auto sm:px-10"
          >
            Más eventos
          </a>
        </div>
      </div>
    </section>
  )
}
