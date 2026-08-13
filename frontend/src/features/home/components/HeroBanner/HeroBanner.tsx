import { useCallback, useEffect, useMemo, useRef, useState, type TransitionEvent } from "react"
import clsx from "clsx"
import { ChevronLeftIcon, ChevronRightIcon } from "./icons"
import { heroSlides } from "./slides"

const AUTO_PLAY_MS = 20_000

export const HeroBanner = () => {
  const firstSlide = heroSlides[0]
  const lastSlide = heroSlides[heroSlides.length - 1]

  const trackSlides = useMemo(
    () => [
      { ...lastSlide, key: `${lastSlide.id}-clone-start` },
      ...heroSlides.map((slide) => ({ ...slide, key: slide.id })),
      { ...firstSlide, key: `${firstSlide.id}-clone-end` },
    ],
    [firstSlide, lastSlide],
  )

  const realCount = heroSlides.length
  const trackCount = trackSlides.length
  const [trackIndex, setTrackIndex] = useState(1)
  const [enableTransition, setEnableTransition] = useState(true)
  const isAnimatingRef = useRef(false)

  const goToNext = useCallback(() => {
    if (isAnimatingRef.current) {
      return
    }

    isAnimatingRef.current = true
    setTrackIndex((current) => current + 1)
  }, [])

  const goToPrevious = useCallback(() => {
    if (isAnimatingRef.current) {
      return
    }

    isAnimatingRef.current = true
    setTrackIndex((current) => current - 1)
  }, [])

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") {
      return
    }

    if (trackIndex === 0) {
      setEnableTransition(false)
      setTrackIndex(realCount)
      isAnimatingRef.current = false
      return
    }

    if (trackIndex === realCount + 1) {
      setEnableTransition(false)
      setTrackIndex(1)
      isAnimatingRef.current = false
      return
    }

    isAnimatingRef.current = false
  }

  useEffect(() => {
    if (enableTransition) {
      return
    }

    const frameId = window.requestAnimationFrame(() => {
      setEnableTransition(true)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [enableTransition, trackIndex])

  useEffect(() => {
    const timerId = window.setInterval(() => {
      goToNext()
    }, AUTO_PLAY_MS)

    return () => window.clearInterval(timerId)
  }, [goToNext, trackIndex])

  return (
    <section aria-label="Banner promocional" aria-roledescription="carousel" className="relative bg-dark-body">
      <div className="relative h-[420px] overflow-hidden md:h-[480px] lg:h-[520px]">
        <div
          className={clsx(
            "flex h-full ease-in-out motion-reduce:transition-none",
            enableTransition && "transition-transform duration-700",
          )}
          style={{
            width: `${trackCount * 100}%`,
            transform: `translateX(-${(trackIndex / trackCount) * 100}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {trackSlides.map((item) => (
            <div
              key={item.key}
              className="h-full shrink-0"
              style={{ width: `${100 / trackCount}%` }}
            >
              <img src={item.src} alt={item.alt} className="size-full object-cover object-center" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-between px-3 md:px-5">
          <button
            type="button"
            aria-label="Imagen anterior"
            onClick={goToPrevious}
            className="grid size-10 place-items-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta cursor-pointer"
          >
            <ChevronLeftIcon className="size-8" />
          </button>
          <button
            type="button"
            aria-label="Imagen siguiente"
            onClick={goToNext}
            className="grid size-10 place-items-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta cursor-pointer"
          >
            <ChevronRightIcon className="size-8" />
          </button>
        </div>
      </div>
    </section>
  )
}
