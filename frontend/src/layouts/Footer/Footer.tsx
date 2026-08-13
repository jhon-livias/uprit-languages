import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "./icons"
import { footerColumns, footerMeta, socialLinks } from "./footer-links"
import { Brand } from "../Brand"
import { layoutContainerClass } from "../container"
import libroReclamaciones from "../../assets/libro-reclamaciones.png"

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
      className="shrink-0 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
    >
      <img
        src={libroReclamaciones}
        alt="Libro de Reclamaciones"
        className="h-12 w-auto"
      />
    </a>
  )
}

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark-nav text-white">
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
                      className="text-[13px] leading-snug text-white transition-colors duration-200 hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
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
                    className="grid size-10 place-items-center rounded-full border border-white text-white transition-colors duration-200 hover:bg-white hover:text-dark-nav focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
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
        <div className="flex items-center justify-center gap-6 px-4 py-4">
          <p className="flex flex-col items-center text-center text-xs leading-relaxed text-white/90">
            <span>
              © Copyright - Centro de Idiomas de la Universidad Privada de Trujillo {year}
            </span>
            <span>
              Universidad Privada de Trujillo / RUC: {footerMeta.ruc}
            </span>
          </p>
          <ComplaintsBook />
        </div>
      </div>
    </footer>
  )
}
