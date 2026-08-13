import { LearningModeCard } from "./LearningModeCard"
import { learningModes } from "./modes"

export const LearningModes = () => {
  return (
    <section aria-labelledby="aprenderas-heading" className="bg-white py-12 md:py-16">
      <div className="mx-auto w-[90%] max-w-[1440px] lg:w-[70%]">
        <h2
          id="aprenderas-heading"
          className="mb-8 px-1 text-center font-heading text-[1.5rem] font-bold text-primary sm:text-[1.75rem] md:mb-12 md:text-[2.15rem]"
        >
          ¿Cómo aprenderás?
        </h2>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {learningModes.map((mode) => (
            <li key={mode.id}>
              <LearningModeCard
                title={mode.title}
                href={mode.href}
                src={mode.src}
                alt={mode.alt}
                tone={mode.tone}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
