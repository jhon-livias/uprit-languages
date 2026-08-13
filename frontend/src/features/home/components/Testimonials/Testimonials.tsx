import { useEffect, useMemo, useState } from "react"
import clsx from "clsx"
import { LOOP_COPIES, useDragCarousel } from "../../hooks/useDragCarousel"
import { ChevronLeftIcon, ChevronRightIcon } from "./icons"
import { TestimonialSlide } from "./TestimonialSlide"
import { testimonials } from "./items"

const AUTO_PLAY_MS = 20_000

const getVisibleCount = (width: number) => {
  if (width < 640) {
    return 1.08
  }

  if (width < 1024) {
    return 1.45
  }

  return 1.85
}

export const Testimonials = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const {
    viewportRef,
    offset,
    cardSpan,
    activeIndex,
    translateOffset,
    enableTransition,
    isDragging,
    goToNext,
    goToPrevious,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handleTransitionEnd,
    suppressClickIfDragged,
  } = useDragCarousel({
    itemCount: testimonials.length,
    autoPlayMs: AUTO_PLAY_MS,
    isPaused: isPlaying,
    getVisibleCount,
    centered: true,
  })

  const active = testimonials[activeIndex]

  const trackItems = useMemo(
    () =>
      Array.from({ length: LOOP_COPIES }, (_, copyIndex) =>
        testimonials.map((item) => ({
          ...item,
          key: `${item.id}-copy-${copyIndex}`,
        })),
      ).flat(),
    [],
  )

  useEffect(() => {
    setIsPlaying(false)
  }, [activeIndex])

  if (!active) {
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
          className="mb-8 px-1 text-center font-heading text-[1.5rem] font-bold text-primary sm:text-[1.75rem] md:mb-12 md:text-[2.15rem]"
        >
          Lo que dicen de nosotros
        </h2>

        <div className="relative">
          <div
            ref={viewportRef}
            className={clsx(
              "relative h-[220px] overflow-hidden select-none sm:h-[240px] md:h-[280px] lg:h-[320px]",
              isDragging ? "cursor-grabbing touch-none" : "cursor-grab touch-pan-y",
            )}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onLostPointerCapture={handlePointerCancel}
            onClickCapture={suppressClickIfDragged}
          >
            {cardSpan > 0 && (
              <div
                className={clsx(
                  "flex h-full will-change-transform motion-reduce:transition-none",
                  enableTransition && "transition-transform duration-700 ease-in-out",
                )}
                style={{ transform: `translate3d(${translateOffset}px, 0, 0)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {trackItems.map((item, trackPosition) => {
                  const isActive = Math.round(-offset / cardSpan) === trackPosition

                  return (
                    <TestimonialSlide
                      key={item.key}
                      testimonial={item}
                      width={cardSpan}
                      isActive={isActive}
                      isPlaying={isPlaying && isActive}
                      onPlay={() => {
                        if (item.youtubeId) {
                          setIsPlaying(true)
                        }
                      }}
                    />
                  )
                })}
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 md:mt-0 md:contents">
            <button
              type="button"
              aria-label="Testimonio anterior"
              onClick={goToPrevious}
              className="grid size-10 cursor-pointer place-items-center rounded-full bg-white text-heading shadow-md transition-opacity duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta md:absolute md:top-1/2 md:left-[1%] md:z-10 md:size-10 md:-translate-y-1/2 md:bg-white/90"
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Testimonio siguiente"
              onClick={goToNext}
              className="grid size-10 cursor-pointer place-items-center rounded-full bg-white text-heading shadow-md transition-opacity duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta md:absolute md:top-1/2 md:right-[1%] md:z-10 md:size-10 md:-translate-y-1/2 md:bg-white/90"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </div>
        </div>

        <div className="relative mx-auto mt-8 max-w-2xl px-8 text-center sm:px-12 md:mt-12 md:px-16">
          <span className="absolute top-0 left-0 font-serif text-4xl leading-none text-cta sm:text-5xl md:text-6xl" aria-hidden="true">
            “
          </span>
          <span className="absolute top-0 right-0 font-serif text-4xl leading-none text-cta sm:text-5xl md:text-6xl" aria-hidden="true">
            ”
          </span>
          <p className="font-heading text-base font-bold text-primary sm:text-lg md:text-xl" aria-live="polite">
            {active.name}
          </p>
          <p className="mt-1 text-sm text-body md:text-base">{active.role}</p>
        </div>
      </div>
    </section>
  )
}
