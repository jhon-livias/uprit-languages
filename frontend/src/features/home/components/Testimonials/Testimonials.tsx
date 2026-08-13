import { useCallback, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "./icons"
import { TestimonialSlide } from "./TestimonialSlide"
import { testimonials } from "./items"

const wrapIndex = (index: number, length: number) => {
  return ((index % length) + length) % length
}

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const lastIndex = testimonials.length - 1
  const active = testimonials[activeIndex]
  const previous = testimonials[wrapIndex(activeIndex - 1, testimonials.length)]
  const next = testimonials[wrapIndex(activeIndex + 1, testimonials.length)]

  const goTo = useCallback((index: number) => {
    setIsPlaying(false)
    setActiveIndex(wrapIndex(index, testimonials.length))
  }, [])

  const goToPrevious = () => {
    goTo(activeIndex === 0 ? lastIndex : activeIndex - 1)
  }

  const goToNext = () => {
    goTo(activeIndex === lastIndex ? 0 : activeIndex + 1)
  }

  if (!active || !previous || !next) {
    return null
  }

  return (
    <section
      aria-labelledby="testimonios-heading"
      aria-roledescription="carousel"
      className="bg-white py-12 md:py-16"
    >
      <div className="mx-auto w-[90%] max-w-[1440px] lg:w-[70%]">
        <h2
          id="testimonios-heading"
          className="mb-10 text-center font-heading text-[1.75rem] font-bold text-primary md:mb-12 md:text-[2.15rem]"
        >
          Lo que dicen de nosotros
        </h2>

        <div className="relative">
          <div className="grid h-[200px] grid-cols-[1fr_minmax(0,1.7fr)_1fr] items-stretch gap-3 overflow-hidden md:h-[280px] md:gap-5 lg:h-[320px]">
            <TestimonialSlide
              testimonial={previous}
              variant="peek-left"
              isPlaying={false}
              onPlay={() => undefined}
              onSelect={() => goTo(activeIndex - 1)}
            />
            <TestimonialSlide
              testimonial={active}
              variant="active"
              isPlaying={isPlaying}
              onPlay={() => {
                if (active.youtubeId) {
                  setIsPlaying(true)
                }
              }}
              onSelect={() => undefined}
            />
            <TestimonialSlide
              testimonial={next}
              variant="peek-right"
              isPlaying={false}
              onPlay={() => undefined}
              onSelect={() => goTo(activeIndex + 1)}
            />
          </div>

          <button
            type="button"
            aria-label="Testimonio anterior"
            onClick={goToPrevious}
            className="absolute top-1/2 left-[14%] z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-heading shadow-md transition-opacity duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta md:left-[16%]"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Testimonio siguiente"
            onClick={goToNext}
            className="absolute top-1/2 right-[14%] z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-heading shadow-md transition-opacity duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta md:right-[16%]"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>

        <div className="relative mx-auto mt-10 max-w-2xl px-12 text-center md:mt-12 md:px-16">
          <span className="absolute top-0 left-0 font-serif text-5xl leading-none text-cta md:text-6xl" aria-hidden="true">
            “
          </span>
          <span className="absolute top-0 right-0 font-serif text-5xl leading-none text-cta md:text-6xl" aria-hidden="true">
            ”
          </span>
          <p className="font-heading text-lg font-bold text-primary md:text-xl" aria-live="polite">
            {active.name}
          </p>
          <p className="mt-1 text-sm text-body md:text-base">{active.role}</p>
        </div>
      </div>
    </section>
  )
}
