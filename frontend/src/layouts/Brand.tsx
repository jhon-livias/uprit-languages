import sealUprit from "../assets/logo-uprit-seal.svg"

type BrandProps = {
  href?: string
}

export const Brand = ({ href = "/" }: BrandProps) => {
  return (
    <a
      href={href}
      className="flex items-center gap-4 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cta"
    >
      <span className="flex flex-col">
        <span className="font-serif text-[2.15rem] leading-none font-bold tracking-[0.04em] md:text-[2.55rem]">
          UPRIT
        </span>
        <span className="mt-1 font-serif text-[1.05rem] leading-none font-medium tracking-[0.42em] md:text-[1.2rem]">
          IDIOMAS
        </span>
      </span>
      <span className="hidden h-14 w-px bg-white sm:block" aria-hidden="true" />
      <img
        src={sealUprit}
        alt="Universidad Privada de Trujillo"
        className="hidden h-14 w-auto sm:block md:h-16"
      />
    </a>
  )
}
