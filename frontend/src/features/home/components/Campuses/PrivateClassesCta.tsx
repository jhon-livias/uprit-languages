import particularesCtaPhoto from "../../../../assets/campuses/particulares-cta.jpg"

export const PrivateClassesCta = () => {
  return (
    <section aria-labelledby="particulares-heading" className="relative mx-auto max-w-[75rem] bg-cta px-4 pb-10 pt-20 sm:px-6 md:rounded-b-[3rem] md:pb-16 md:pt-28">
      <img
        src={particularesCtaPhoto}
        alt=""
        className="absolute top-0 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover object-center shadow-lg ring-4 ring-white sm:h-28 sm:w-28 md:h-36 md:w-36"
      />
      <div className="mx-auto w-full max-w-xl text-center">
        <h2
          id="particulares-heading"
          className="font-heading text-[1.35rem] font-bold text-primary sm:text-[1.6rem] md:text-[2rem]"
        >
          Accede a clases particulares
        </h2>
        <p className="mt-3 text-sm text-cta-fg md:text-base">
          Aprendizaje personalizado a tu ritmo, enfocado en tus necesidades y estilo de aprendizaje.
        </p>
        <a
          href="/contacto"
          className="mt-6 inline-flex h-11 w-full max-w-xs items-center justify-center rounded-full bg-primary px-8 font-heading text-sm font-bold tracking-[0.06em] text-white uppercase transition-colors duration-200 hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
        >
          Contáctanos
        </a>
      </div>
    </section>
  )
}
