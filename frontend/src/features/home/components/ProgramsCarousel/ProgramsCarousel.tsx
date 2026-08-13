import { useMemo } from "react"
import clsx from "clsx"
import { ProgramCard } from "./ProgramCard"
import { programSlides } from "./programs"
import { LOOP_COPIES, useDragCarousel } from "../../hooks/useDragCarousel"

const AUTO_PLAY_MS = 5_000

export const ProgramsCarousel = () => {
  const {
    viewportRef,
    offset,
    cardSpan,
    enableTransition,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handleTransitionEnd,
    suppressClickIfDragged,
  } = useDragCarousel({
    itemCount: programSlides.length,
    autoPlayMs: AUTO_PLAY_MS,
  })

  const trackItems = useMemo(
    () =>
      Array.from({ length: LOOP_COPIES }, (_, copyIndex) =>
        programSlides.map((slide) => ({
          ...slide,
          key: `${slide.id}-copy-${copyIndex}`,
        })),
      ).flat(),
    [],
  )

  return (
    <section
      aria-labelledby="programas-heading"
      className="relative overflow-hidden bg-bg py-8 md:py-14"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-primary)_0.65px,transparent_0.65px)] bg-[size:3px_3px] opacity-[0.12]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
        <h2
          id="programas-heading"
          className="relative mb-6 px-1 text-center font-heading text-[1.05rem] tracking-[0.12em] uppercase sm:text-[1.15rem] md:mb-10 md:text-[1.4rem]"
        >
          <span className="font-medium text-primary">Conoce </span>
          <span className="font-bold text-primary">nuestros programas</span>
        </h2>

        <div
          ref={viewportRef}
          aria-roledescription="carousel"
          aria-label="Programas del centro de idiomas"
          className={clsx(
            "relative h-36 overflow-hidden select-none sm:h-40 md:h-48 lg:h-[14vw] lg:max-h-[220px]",
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
              style={{ transform: `translate3d(${offset}px, 0, 0)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {trackItems.map((item) => (
                <ProgramCard
                  key={item.key}
                  title={item.title}
                  href={item.href}
                  src={item.src}
                  alt={item.alt}
                  width={cardSpan}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
