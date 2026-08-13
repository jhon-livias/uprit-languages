import { HeroBanner } from "../components/HeroBanner"
import { LearningModes } from "../components/LearningModes"
import { ProgramsCarousel } from "../components/ProgramsCarousel"
import { ScheduleSearch } from "../components/ScheduleSearch"
import { Testimonials } from "../components/Testimonials"

export const HomePage = () => {
  return (
    <>
      <HeroBanner />
      <ProgramsCarousel />
      <ScheduleSearch />
      <LearningModes />
      <Testimonials />
    </>
  )
}
