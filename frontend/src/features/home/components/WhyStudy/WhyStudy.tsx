import { useMemo } from "react"
import clsx from "clsx"
import { LOOP_COPIES, useDragCarousel } from "../../hooks/useDragCarousel"
import { ChevronLeftIcon, ChevronRightIcon } from "./icons"
import { whyStudyItems } from "./items"
import { WhyStudyCard } from "./WhyStudyCard"

const AUTO_PLAY_MS = 6_000

const getVisibleCount = (width: number) => {
  if (width < 640) {
    return 1.05
  }

  if (width < 768) {
    return 1.35
  }

  if (width < 1024) {
    return 2.12
  }

  return 3
}

export const WhyStudy = () => {
  const {
    viewportRef,
    offset,
    cardSpan,
    activeIndex,
    enableTransition,
    isDragging,
    goToNext,
    goToPrevious,
    goToIndex,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handleTransitionEnd,
    suppressClickIfDragged,
  } = useDragCarousel({
    itemCount: whyStudyItems.length,
    autoPlayMs: AUTO_PLAY_MS,
    getVisibleCount,
  })

  const trackItems = useMemo(
    () =>
      Array.from({ length: LOOP_COPIES }, (_, copyIndex) =>
        whyStudyItems.map((item) => ({
          ...item,
          key: `${item.id}-copy-${copyIndex}`,
        })),
      ).flat(),
    [],
  )

  return (
    <section
      aria-labelledby="por-que-heading"
      aria-roledescription="carousel"
      className="bg-white py-10 md:py-16"
    >
      <div className="mx-auto w-[90%] max-w-[1440px] lg:w-[70%]">
        <h2
          id="por-que-heading"
          className="mb-8 px-1 text-center font-heading text-[1.4rem] leading-tight font-bold text-primary sm:text-[1.75rem] md:mb-12 md:text-[2.15rem]"
        >
          ¿Por qué estudiar en UPRIT Languages?
        </h2>

        <div className="relative">
          <div
            ref={viewportRef}
            className={clsx(
              "relative h-[300px] touch-pan-x overflow-hidden select-none sm:h-[280px] md:h-[320px] lg:h-[300px]",
              isDragging ? "cursor-grabbing" : "cursor-grab",
            )}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onClickCapture={suppressClickIfDragged}
          >
            {cardSpan > 0 && (
              <div
                className={clsx(
                  "flex h-full will-change-transform motion-reduce:transition-none",
                  enableTransition && "transition-transform duration-700 ease-in-out",
                )}
                style={{ transform: `translate3d(${offset}px, 0, 0)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {trackItems.map((item) => (
                  <WhyStudyCard key={item.key} item={item} width={cardSpan} paintId={item.key} />
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="Beneficio anterior"
            onClick={goToPrevious}
            className="absolute top-[58%] left-1 z-10 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-dark-nav text-white shadow-md transition-opacity duration-200 hover:bg-dark-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta md:left-0 md:size-11 md:-translate-x-1/2"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Beneficio siguiente"
            onClick={goToNext}
            className="absolute top-[58%] right-1 z-10 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-dark-nav text-white shadow-md transition-opacity duration-200 hover:bg-dark-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta md:right-0 md:size-11 md:translate-x-1/2"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2.5">
          {whyStudyItems.map((item, index) => {
            const isActive = activeIndex === index

            return (
              <button
                key={item.id}
                type="button"
                aria-label={`Ver ${item.title}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goToIndex(index)}
                className={clsx(
                  "h-2.5 cursor-pointer rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta",
                  isActive ? "w-8 bg-cta" : "w-2.5 bg-primary",
                )}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
