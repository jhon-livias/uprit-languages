import { HeroBanner } from "../components/HeroBanner"
import { ProgramsCarousel } from "../components/ProgramsCarousel"
import { ScheduleSearch } from "../components/ScheduleSearch"

export const HomePage = () => {
  return (
    <>
      <HeroBanner />
      <ProgramsCarousel />
      <ScheduleSearch />
    </>
  )
}
