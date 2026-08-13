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
    <section aria-labelledby={headingId} className="bg-primary pb-28 pt-12 rounded-tr-[80px] rounded-bl-[80px] md:pt-16">
      <div className="mx-auto w-[90%] max-w-[1440px] lg:w-[70%]">
        <h2
          id={headingId}
          className="mb-8 text-center font-heading text-[1.75rem] font-bold text-cta md:mb-10 md:text-[2.15rem]"
        >
          Descubre nuestras sedes
        </h2>

        <div className="overflow-hidden rounded-[1.75rem] bg-white/95 shadow-[0_12px_40px_rgba(17,24,34,0.18)] md:flex">
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
