import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type TransitionEvent } from "react"
import clsx from "clsx"
import { ChevronLeftIcon, ChevronRightIcon } from "./icons"
import { heroSlides } from "./slides"

const AUTO_PLAY_MS = 20_000
const DRAG_CLICK_THRESHOLD_PX = 6
const SNAP_DISTANCE = 0.18
const SNAP_VELOCITY = 0.35

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
  const viewportRef = useRef<HTMLDivElement>(null)
  const [trackIndex, setTrackIndex] = useState(1)
  const [enableTransition, setEnableTransition] = useState(true)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [resumeToken, setResumeToken] = useState(0)

  const isAnimatingRef = useRef(false)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartedAtRef = useRef(0)
  const trackIndexRef = useRef(1)
  const viewportWidthRef = useRef(0)

  trackIndexRef.current = trackIndex
  viewportWidthRef.current = viewportWidth

  const goToNext = useCallback(() => {
    if (isAnimatingRef.current || isDraggingRef.current) {
      return
    }

    isAnimatingRef.current = true
    setEnableTransition(true)
    setTrackIndex((current) => current + 1)
  }, [])

  const goToPrevious = useCallback(() => {
    if (isAnimatingRef.current || isDraggingRef.current) {
      return
    }

    isAnimatingRef.current = true
    setEnableTransition(true)
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
    const viewport = viewportRef.current

    if (!viewport) {
      return
    }

    const measure = () => {
      const width = viewport.clientWidth
      viewportWidthRef.current = width
      setViewportWidth(width)
    }

    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    measure()

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (enableTransition || isDragging) {
      return
    }

    const frameId = window.requestAnimationFrame(() => {
      if (isDraggingRef.current) {
        return
      }

      setEnableTransition(true)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [enableTransition, isDragging, trackIndex])

  useEffect(() => {
    if (isDragging) {
      return
    }

    const timerId = window.setInterval(() => {
      goToNext()
    }, AUTO_PLAY_MS)

    return () => window.clearInterval(timerId)
  }, [goToNext, isDragging, resumeToken, trackIndex])

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest("button")) {
      return
    }

    isDraggingRef.current = true
    isAnimatingRef.current = false
    dragStartXRef.current = event.clientX
    dragStartedAtRef.current = Date.now()
    setIsDragging(true)
    setEnableTransition(false)
    setDragOffset(0)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) {
      return
    }

    setDragOffset(event.clientX - dragStartXRef.current)
  }

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) {
      return
    }

    isDraggingRef.current = false
    setIsDragging(false)

    const width = viewportWidthRef.current
    const delta = event.clientX - dragStartXRef.current
    const elapsed = Math.max(1, Date.now() - dragStartedAtRef.current)
    const velocity = delta / elapsed
    const currentIndex = trackIndexRef.current

    let nextIndex = currentIndex

    if (width > 0 && Math.abs(delta) > DRAG_CLICK_THRESHOLD_PX) {
      const rawIndex = currentIndex - delta / width
      nextIndex = Math.round(rawIndex)

      if (velocity < -SNAP_VELOCITY || delta < -width * SNAP_DISTANCE) {
        nextIndex = Math.max(nextIndex, currentIndex + 1)
      } else if (velocity > SNAP_VELOCITY || delta > width * SNAP_DISTANCE) {
        nextIndex = Math.min(nextIndex, currentIndex - 1)
      }
    }

    nextIndex = Math.max(0, Math.min(trackCount - 1, nextIndex))

    setEnableTransition(true)
    isAnimatingRef.current = nextIndex !== currentIndex
    setTrackIndex(nextIndex)
    setDragOffset(0)
    setResumeToken((token) => token + 1)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const translateX =
    viewportWidth > 0
      ? -trackIndex * viewportWidth + dragOffset
      : undefined

  return (
    <section aria-label="Banner promocional" aria-roledescription="carousel" className="relative bg-dark-body">
      <div
        ref={viewportRef}
        className={clsx(
          "relative h-[420px] touch-pan-x overflow-hidden select-none md:h-[480px] lg:h-[520px]",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        <div
          className={clsx(
            "flex h-full ease-in-out will-change-transform motion-reduce:transition-none",
            enableTransition && !isDragging && "transition-transform duration-700",
          )}
          style={{
            width: `${trackCount * 100}%`,
            transform:
              translateX === undefined
                ? `translateX(-${(trackIndex / trackCount) * 100}%)`
                : `translate3d(${translateX}px, 0, 0)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {trackSlides.map((item) => (
            <div
              key={item.key}
              className="h-full shrink-0"
              style={{ width: `${100 / trackCount}%` }}
            >
              <img src={item.src} alt={item.alt} draggable={false} className="size-full object-cover object-center" />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-3 md:px-5">
          <button
            type="button"
            aria-label="Imagen anterior"
            onClick={goToPrevious}
            className="pointer-events-auto grid size-10 cursor-pointer place-items-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
          >
            <ChevronLeftIcon className="size-8" />
          </button>
          <button
            type="button"
            aria-label="Imagen siguiente"
            onClick={goToNext}
            className="pointer-events-auto grid size-10 cursor-pointer place-items-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
          >
            <ChevronRightIcon className="size-8" />
          </button>
        </div>
      </div>
    </section>
  )
}
