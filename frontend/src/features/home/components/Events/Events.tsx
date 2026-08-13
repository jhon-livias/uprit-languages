import { EventCard } from "./EventCard"
import { homeEvents } from "./items"

export const Events = () => {
  const featuredEvent = homeEvents[0]
  const compactEvents = homeEvents.slice(1)

  if (!featuredEvent) {
    return null
  }

  return (
    <section aria-labelledby="eventos-heading" className="bg-white py-12 md:py-16">
      <div className="mx-auto w-[90%] max-w-[1440px] lg:w-[70%]">
        <h2
          id="eventos-heading"
          className="mb-10 text-center font-heading text-[1.75rem] font-bold text-secondary md:mb-12 md:text-[2.15rem]"
        >
          UPRIT Eventos
        </h2>

        <div className="grid grid-cols-1 gap-5 lg:h-[36rem] lg:grid-cols-2 lg:grid-rows-2">
          <div className="lg:row-span-2">
            <EventCard event={featuredEvent} variant="featured" />
          </div>
          {compactEvents.map((event) => (
            <EventCard key={event.id} event={event} variant="compact" />
          ))}
        </div>

        <div className="mt-10 text-center md:mt-12">
          <a
            href="/eventos"
            className="inline-flex h-12 items-center justify-center rounded-full bg-secondary px-10 font-heading text-sm font-bold tracking-[0.08em] text-white uppercase transition-colors duration-200 hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
          >
            Más eventos
          </a>
        </div>
      </div>
    </section>
  )
}
