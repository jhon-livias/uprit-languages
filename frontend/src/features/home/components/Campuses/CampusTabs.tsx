import clsx from "clsx"
import { HomePinIcon } from "./icons"
import type { Campus } from "./items"
import type { KeyboardEvent } from "react"

type CampusTabsProps = {
  campuses: Campus[]
  selectedId: string
  labelledBy: string
  onSelect: (id: string) => void
}

export const CampusTabs = ({ campuses, selectedId, labelledBy, onSelect }: CampusTabsProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = campuses.findIndex((campus) => campus.id === selectedId)

    if (currentIndex < 0) {
      return
    }

    const lastIndex = campuses.length - 1
    let nextIndex = currentIndex

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1
    } else {
      return
    }

    const nextCampus = campuses[nextIndex]

    if (!nextCampus) {
      return
    }

    event.preventDefault()
    onSelect(nextCampus.id)
    document.getElementById(`sede-tab-${nextCampus.id}`)?.focus()
  }

  return (
    <div
      role="tablist"
      aria-labelledby={labelledBy}
      onKeyDown={handleKeyDown}
      className="flex gap-2 overflow-x-auto p-4 md:w-64 md:flex-col md:overflow-visible md:p-6"
    >
      {campuses.map((campus) => {
        const isSelected = campus.id === selectedId

        return (
          <button
            key={campus.id}
            type="button"
            role="tab"
            id={`sede-tab-${campus.id}`}
            aria-selected={isSelected}
            aria-controls={`sede-panel-${campus.id}`}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelect(campus.id)}
            className={clsx(
              "h-10 shrink-0 text-start rounded-full px-4 font-heading text-[0.8rem] leading-none font-semibold tracking-[0.04em] uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta",
              isSelected
                ? "bg-white text-primary"
                : "text-white hover:bg-white/10",
            )}
          >
            {campus.name}
          </button>
        )
      })}
    </div>
  )
}
