import { Campuses, PrivateClassesCta } from "../components/Campuses"
import { Events } from "../components/Events"
import { HeroBanner } from "../components/HeroBanner"
import { LearningModes } from "../components/LearningModes"
import { ProgramsCarousel } from "../components/ProgramsCarousel"
import { ScheduleSearch } from "../components/ScheduleSearch"
import { Testimonials } from "../components/Testimonials"
import { WhyStudy } from "../components/WhyStudy"

export const HomePage = () => {
  return (
    <>
      <HeroBanner />
      <ProgramsCarousel />
      <ScheduleSearch />
      <LearningModes />
      <Testimonials />
      <Campuses />
      <PrivateClassesCta />
      <WhyStudy />
      <Events />
    </>
  )
}
