import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type TransitionEvent } from "react"
import clsx from "clsx"
import { ChevronLeftIcon, ChevronRightIcon } from "./icons"
import { heroSlides } from "./slides"

const AUTO_PLAY_MS = 20_000
const DRAG_CLICK_THRESHOLD_PX = 10
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
  const isPointerDownRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartYRef = useRef(0)
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
    const viewport = viewportRef.current

    if (!viewport) {
      return
    }

    const preventVerticalScrollWhileDragging = (event: TouchEvent) => {
      if (isDraggingRef.current) {
        event.preventDefault()
      }
    }

    viewport.addEventListener("touchmove", preventVerticalScrollWhileDragging, { passive: false })

    return () => viewport.removeEventListener("touchmove", preventVerticalScrollWhileDragging)
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

    isPointerDownRef.current = true
    isDraggingRef.current = false
    dragStartXRef.current = event.clientX
    dragStartYRef.current = event.clientY
    dragStartedAtRef.current = Date.now()
    setDragOffset(0)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) {
      return
    }

    const deltaX = event.clientX - dragStartXRef.current
    const deltaY = event.clientY - dragStartYRef.current

    if (!isDraggingRef.current) {
      if (Math.hypot(deltaX, deltaY) < DRAG_CLICK_THRESHOLD_PX) {
        return
      }

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        isPointerDownRef.current = false
        return
      }

      isDraggingRef.current = true
      isAnimatingRef.current = false
      setIsDragging(true)
      setEnableTransition(false)
      event.currentTarget.setPointerCapture(event.pointerId)
    }

    setDragOffset(deltaX)
  }

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) {
      return
    }

    isPointerDownRef.current = false
    const wasDragging = isDraggingRef.current
    isDraggingRef.current = false
    setIsDragging(false)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (!wasDragging) {
      return
    }

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
          "relative h-[240px] overflow-hidden select-none sm:h-[320px] md:h-[440px] lg:h-[520px]",
          isDragging ? "cursor-grabbing touch-none" : "cursor-grab touch-pan-y",
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={finishDrag}
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
              <img
                src={item.src}
                alt={item.alt}
                draggable={false}
                className="pointer-events-none size-full object-cover object-center [-webkit-user-drag:none]"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Imagen anterior"
          onClick={goToPrevious}
          className="absolute top-1/2 left-2 z-20 grid size-8 -translate-y-1/2 cursor-pointer place-items-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta sm:left-3 sm:size-10 md:left-5"
        >
          <ChevronLeftIcon className="size-6 sm:size-8" />
        </button>
        <button
          type="button"
          aria-label="Imagen siguiente"
          onClick={goToNext}
          className="absolute top-1/2 right-2 z-20 grid size-8 -translate-y-1/2 cursor-pointer place-items-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta sm:right-3 sm:size-10 md:right-5"
        >
          <ChevronRightIcon className="size-6 sm:size-8" />
        </button>
      </div>
    </section>
  )
}
