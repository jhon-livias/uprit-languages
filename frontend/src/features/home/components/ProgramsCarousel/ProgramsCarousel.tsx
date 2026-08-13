import { useMemo } from "react"
import clsx from "clsx"
import { ProgramCard } from "./ProgramCard"
import { programSlides } from "./programs"
import { LOOP_COPIES, useDragCarousel } from "./useDragCarousel"

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
      className="relative overflow-hidden bg-[#ececec] py-10 md:py-14"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#c8c8c8_0.65px,transparent_0.65px)] bg-[size:3px_3px] opacity-50"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-[90%] max-w-[1440px]">
        <h2
          id="programas-heading"
          className="relative mb-8 text-center font-heading text-[1.15rem] tracking-[0.14em] uppercase md:mb-10 md:text-[1.4rem]"
        >
          <span className="font-medium text-program-kicker">Conoce </span>
          <span className="font-bold text-program-heading">nuestros programas</span>
        </h2>

        <div
          ref={viewportRef}
          aria-roledescription="carousel"
          aria-label="Programas del centro de idiomas"
          className={clsx(
            "relative h-[190px] touch-pan-x overflow-hidden select-none sm:h-[230px] md:h-[270px] lg:h-[310px]",
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
