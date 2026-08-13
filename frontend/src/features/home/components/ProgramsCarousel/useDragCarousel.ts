import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
  type TransitionEvent,
} from "react"

export const LOOP_COPIES = 3

const DRAG_CLICK_THRESHOLD_PX = 6
const SNAP_VELOCITY = 0.35

const getVisibleCount = (width: number) => {
  if (width < 640) {
    return 1.35
  }

  if (width < 768) {
    return 2.2
  }

  if (width < 1024) {
    return 3.25
  }

  return 4
}

type UseDragCarouselOptions = {
  itemCount: number
  autoPlayMs: number
}

export const useDragCarousel = ({ itemCount, autoPlayMs }: UseDragCarouselOptions) => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [cardSpan, setCardSpan] = useState(0)
  const [enableTransition, setEnableTransition] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [resumeToken, setResumeToken] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  const offsetRef = useRef(0)
  const cardSpanRef = useRef(0)
  const isDraggingRef = useRef(false)
  const isAnimatingRef = useRef(false)
  const didDragRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartOffsetRef = useRef(0)
  const dragStartedAtRef = useRef(0)
  const reduceMotionRef = useRef(false)

  useEffect(() => {
    offsetRef.current = offset
  }, [offset])

  const wrapToMiddle = useCallback(
    (value: number, span: number) => {
      const loopWidth = itemCount * span

      if (loopWidth === 0) {
        return value
      }

      let next = value
      const min = -loopWidth * 2
      const max = 0

      while (next <= min) {
        next += loopWidth
      }

      while (next >= max) {
        next -= loopWidth
      }

      return next
    },
    [itemCount],
  )

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncPreference = () => {
      reduceMotionRef.current = media.matches
      setReduceMotion(media.matches)
    }

    syncPreference()
    media.addEventListener("change", syncPreference)

    return () => media.removeEventListener("change", syncPreference)
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current

    if (!viewport) {
      return
    }

    const measure = () => {
      const width = viewport.clientWidth

      if (width === 0 || itemCount === 0) {
        return
      }

      const nextSpan = width / getVisibleCount(width)
      const prevSpan = cardSpanRef.current

      if (prevSpan === 0) {
        const start = -itemCount * nextSpan
        cardSpanRef.current = nextSpan
        offsetRef.current = start
        setCardSpan(nextSpan)
        setOffset(start)
        return
      }

      if (Math.abs(prevSpan - nextSpan) < 0.5) {
        return
      }

      const logicalIndex = Math.round(-offsetRef.current / prevSpan)
      const wrappedIndex = ((logicalIndex % itemCount) + itemCount) % itemCount
      const nextOffset = -((itemCount + wrappedIndex) * nextSpan)

      cardSpanRef.current = nextSpan
      offsetRef.current = nextOffset
      setEnableTransition(false)
      setCardSpan(nextSpan)
      setOffset(nextOffset)
    }

    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    measure()

    return () => observer.disconnect()
  }, [itemCount])

  const goToNext = useCallback(() => {
    if (isDraggingRef.current || isAnimatingRef.current || cardSpanRef.current === 0) {
      return
    }

    if (reduceMotionRef.current) {
      setOffset((current) => wrapToMiddle(current - cardSpanRef.current, cardSpanRef.current))
      return
    }

    isAnimatingRef.current = true
    setEnableTransition(true)
    setOffset((current) => current - cardSpanRef.current)
  }, [wrapToMiddle])

  useEffect(() => {
    if (reduceMotion || cardSpan === 0 || isDragging) {
      return
    }

    const timerId = window.setInterval(goToNext, autoPlayMs)

    return () => window.clearInterval(timerId)
  }, [autoPlayMs, cardSpan, goToNext, isDragging, reduceMotion, resumeToken])

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || cardSpanRef.current === 0) {
      return
    }

    isDraggingRef.current = true
    isAnimatingRef.current = false
    didDragRef.current = false
    dragStartXRef.current = event.clientX
    dragStartOffsetRef.current = offsetRef.current
    dragStartedAtRef.current = Date.now()
    setIsDragging(true)
    setEnableTransition(false)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) {
      return
    }

    const delta = event.clientX - dragStartXRef.current

    if (Math.abs(delta) > DRAG_CLICK_THRESHOLD_PX) {
      didDragRef.current = true
    }

    let next = dragStartOffsetRef.current + delta
    const wrapped = wrapToMiddle(next, cardSpanRef.current)

    if (Math.abs(wrapped - next) > 0.5) {
      dragStartOffsetRef.current += wrapped - next
      next = wrapped
    }

    offsetRef.current = next
    setOffset(next)
  }

  const snapOffset = (value: number, velocity: number) => {
    const span = cardSpanRef.current

    if (span === 0) {
      return value
    }

    const rawIndex = -value / span
    let targetIndex = Math.round(rawIndex)

    if (velocity < -SNAP_VELOCITY) {
      targetIndex = Math.ceil(rawIndex)
    } else if (velocity > SNAP_VELOCITY) {
      targetIndex = Math.floor(rawIndex)
    }

    return -targetIndex * span
  }

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) {
      return
    }

    isDraggingRef.current = false
    setIsDragging(false)

    const delta = event.clientX - dragStartXRef.current
    const elapsed = Math.max(1, Date.now() - dragStartedAtRef.current)
    const velocity = delta / elapsed
    const snapped = snapOffset(dragStartOffsetRef.current + delta, velocity)

    setEnableTransition(true)
    isAnimatingRef.current = true
    offsetRef.current = snapped
    setOffset(snapped)
    setResumeToken((token) => token + 1)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") {
      return
    }

    const wrapped = wrapToMiddle(offsetRef.current, cardSpanRef.current)

    if (Math.abs(wrapped - offsetRef.current) > 0.5) {
      setEnableTransition(false)
      offsetRef.current = wrapped
      setOffset(wrapped)
    }

    isAnimatingRef.current = false
  }

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
  }, [enableTransition, isDragging, offset])

  const suppressClickIfDragged = (event: MouseEvent<HTMLDivElement>) => {
    if (!didDragRef.current) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    didDragRef.current = false
  }

  return {
    viewportRef,
    offset,
    cardSpan,
    enableTransition: enableTransition && !isDragging && !reduceMotion,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp: finishDrag,
    handlePointerCancel: finishDrag,
    handleTransitionEnd,
    suppressClickIfDragged,
  }
}
