import { ScheduleSelect } from "./ScheduleSelect"
import { scheduleFields } from "./fields"

export const ScheduleSearch = () => {
  return (
    <section aria-labelledby="horarios-heading" className="bg-primary py-10 md:py-16">
      <form
        action="/horarios"
        method="get"
        className="relative mx-auto flex w-[90%] max-w-[1440px] flex-col items-center lg:w-[70%]"
      >
        <h2
          id="horarios-heading"
          className="mb-6 px-1 text-center font-heading text-[1.05rem] tracking-[0.12em] text-white uppercase sm:text-[1.15rem] md:mb-10 md:text-[1.4rem]"
        >
          <span className="font-medium">Buscar </span>
          <span className="font-bold">horarios</span>
        </h2>

        <div className="mb-6 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 md:mb-8 xl:grid-cols-5">
          {scheduleFields.map((field) => (
            <ScheduleSelect key={field.id} field={field} />
          ))}
        </div>

        <button
          type="submit"
          className="h-12 w-full max-w-sm cursor-pointer rounded-sm bg-dark-body px-10 font-heading text-[0.78rem] font-bold tracking-[0.12em] text-white uppercase transition-colors duration-200 hover:bg-dark-nav focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta sm:w-auto"
        >
          Buscar horarios
        </button>
      </form>
    </section>
  )
}
