import {
  BookIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "./icons"
import { footerColumns, footerMeta, socialLinks } from "./footer-links"
import { Brand } from "../Brand"
import { layoutContainerClass } from "../container"

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  linkedin: LinkedinIcon,
} as const

const ComplaintsBook = () => {
  return (
    <a
      href={footerMeta.complaintsHref}
      className="inline-flex items-center gap-2 rounded-sm bg-white px-2.5 py-1.5 text-header transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
    >
      <BookIcon className="size-7 shrink-0" />
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] font-semibold">Libro de</span>
        <span className="text-[11px] font-bold">Reclamaciones</span>
      </span>
    </a>
  )
}

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-header text-white">
      <div className={`${layoutContainerClass} flex flex-col items-center pt-12 pb-8`}>
        <Brand />

        <nav
          aria-label="Pie de página"
          className="mt-12 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {footerColumns.map((column) => (
            <section key={column.id}>
              <h2 className="mb-4 text-sm font-semibold text-footer-label">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.id} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white"
                      aria-hidden="true"
                    />
                    <a
                      href={link.href}
                      className="text-[13px] leading-snug text-white transition-colors duration-200 hover:text-footer-label focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>

        <hr className="mt-12 w-full border-white/40" />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <p className="text-sm font-semibold tracking-wide text-footer-label uppercase">
            Síguenos en:
          </p>
          <ul className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.id]

              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Síguenos en ${social.label}`}
                    className="grid size-10 place-items-center rounded-full border border-white text-white transition-colors duration-200 hover:bg-white hover:text-header focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="bg-footer-bar">
        <div
          className={`${layoutContainerClass} relative flex flex-col items-center gap-4 py-4 md:flex-row md:justify-center`}
        >
          <p className="text-center text-[11px] leading-relaxed text-white md:px-28">
            © Copyright - Centro de Idiomas de la Universidad Privada de Trujillo {year}{" "}
            Universidad Privada de Trujillo / RUC: {footerMeta.ruc}
          </p>
          <div className="md:absolute md:top-1/2 md:right-0 md:-translate-y-1/2">
            <ComplaintsBook />
          </div>
        </div>
      </div>
    </footer>
  )
}
