import { useId, useState } from "react"
import { CampusPanel } from "./CampusPanel"
import { CampusTabs } from "./CampusTabs"
import { campuses } from "./items"

export const Campuses = () => {
  const headingId = useId()
  const firstCampus = campuses[0]
  const [selectedId, setSelectedId] = useState(firstCampus?.id ?? "")
  const selectedCampus = campuses.find((campus) => campus.id === selectedId) ?? firstCampus

  if (!selectedCampus) {
    return null
  }

  return (
    <section aria-labelledby={headingId} className="rounded-tr-[2.5rem] rounded-bl-[2.5rem] bg-primary pb-20 pt-10 md:rounded-tr-[80px] md:rounded-bl-[80px] md:pb-28 md:pt-16">
      <div className="mx-auto w-[90%] max-w-[1440px] lg:w-[70%]">
        <h2
          id={headingId}
          className="mb-6 px-1 text-center font-heading text-[1.5rem] font-bold text-cta sm:text-[1.75rem] md:mb-10 md:text-[2.15rem]"
        >
          Descubre nuestras sedes
        </h2>

        <div className="overflow-hidden rounded-[1.25rem] bg-white/95 shadow-[0_12px_40px_rgba(17,24,34,0.18)] md:flex md:rounded-[1.75rem]">
          <div className="bg-primary-darker md:shrink-0">
            <CampusTabs
              campuses={campuses}
              selectedId={selectedCampus.id}
              labelledBy={headingId}
              onSelect={setSelectedId}
            />
          </div>
          <CampusPanel campus={selectedCampus} />
        </div>
      </div>
    </section>
  )
}
