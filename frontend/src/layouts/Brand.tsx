import sealUprit from "../assets/logo-uprit-seal.svg"

type BrandProps = {
  href?: string
}

export const Brand = ({ href = "/" }: BrandProps) => {
  return (
    <a
      href={href}
      className="flex h-[64px] min-w-0 items-center gap-2.5 text-white sm:h-[84px] sm:gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cta"
    >
      <span className="flex min-w-0 flex-col">
        <span className="font-serif text-[1.7rem] leading-none font-bold tracking-[0.04em] sm:text-[2.15rem] md:text-[2.55rem]">
          UPRIT
        </span>
        <span className="mt-1 font-serif text-[0.88rem] leading-none font-medium tracking-[0.28em] sm:text-[1.05rem] sm:tracking-[0.42em] md:text-[1.2rem]">
          IDIOMAS
        </span>
      </span>
      <span className="h-10 w-px shrink-0 bg-white sm:h-14" aria-hidden="true" />
      <img
        src={sealUprit}
        alt="Universidad Privada de Trujillo"
        className="h-10 w-auto shrink-0 sm:h-12 md:h-16"
      />
    </a>
  )
}
