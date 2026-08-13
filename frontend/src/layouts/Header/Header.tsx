import { useEffect, useId, useState, type ReactNode } from "react"
import clsx from "clsx"
import { Brand } from "../Brand"
import { layoutContainerClass } from "../container"
import {
  ChevronIcon,
  CloseIcon,
  HomeIcon,
  MailIcon,
  MenuIcon,
} from "./icons"
import { headerActions, navItems } from "./nav-items"

type HeaderProps = {
  activeHref?: string
}

type IconLinkProps = {
  href: string
  label: string
  children: ReactNode
}

const iconBoxClass =
  "grid size-10 place-items-center rounded-[5px] border border-white text-white transition-colors duration-200 hover:bg-white hover:text-header focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"

const IconLink = ({ href, label, children }: IconLinkProps) => {
  return (
    <a href={href} aria-label={label} className={iconBoxClass}>
      {children}
    </a>
  )
}

const EnrollButton = ({ className }: { className?: string }) => {
  return (
    <a
      href={headerActions.enroll.href}
      className={clsx(
        "inline-flex h-10 items-center gap-3 rounded-full bg-cta pr-1.5 pl-5 text-[13px] font-bold tracking-[0.08em] text-cta-fg uppercase transition duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      {headerActions.enroll.label}
      <span
        className="grid size-7 place-items-center rounded-full bg-header text-white"
        aria-hidden="true"
      >
        <ChevronIcon className="size-3.5" />
      </span>
    </a>
  )
}

export const Header = ({ activeHref = "/" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-50 bg-header text-white">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-cta focus:px-3 focus:py-2 focus:text-cta-fg"
      >
        Saltar al contenido
      </a>

      <div className={`relative z-20 ${layoutContainerClass}`}>
        <div className="flex items-center justify-between gap-4 py-2.5">
          <Brand />

          <div className="flex items-center gap-3">
            <EnrollButton className="hidden sm:inline-flex" />
            <div className="hidden items-center gap-2 sm:flex">
              <IconLink href={headerActions.home.href} label={headerActions.home.label}>
                <HomeIcon className="size-[18px]" />
              </IconLink>
              <IconLink
                href={headerActions.contact.href}
                label={headerActions.contact.label}
              >
                <MailIcon className="size-[18px]" />
              </IconLink>
            </div>
            <button
              type="button"
              className={clsx(iconBoxClass, "lg:hidden")}
              aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
            </button>
          </div>
        </div>

        <nav aria-label="Principal" className="hidden h-12 items-center justify-center lg:flex">
          <ul className="flex flex-nowrap items-center justify-center gap-x-8 whitespace-nowrap xl:gap-x-10">
            {navItems.map((item) => {
              const isActive = activeHref === item.href

              return (
                <li key={item.id} className="shrink-0">
                  <a
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={clsx(
                      "inline-flex items-center text-[13px] leading-none font-semibold tracking-[0.16em] uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cta",
                      isActive ? "text-secondary" : "text-white hover:text-secondary",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {isMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-10 cursor-default bg-black/50 lg:hidden"
          aria-label="Cerrar menú de navegación"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav
        id={menuId}
        aria-label="Móvil"
        inert={!isMenuOpen}
        className={clsx(
          "fixed top-0 right-0 z-30 flex h-full w-[min(22rem,100%)] flex-col gap-6 bg-header px-6 py-6 shadow-2xl transition-transform duration-300 lg:hidden",
          isMenuOpen ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm tracking-[0.16em] uppercase">Menú</p>
          <button
            type="button"
            className={iconBoxClass}
            aria-label="Cerrar menú de navegación"
            onClick={() => setIsMenuOpen(false)}
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <EnrollButton className="self-start" />

        <ul className="flex flex-col gap-5">
          {navItems.map((item) => {
            const isActive = activeHref === item.href

            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    "text-[13px] font-semibold tracking-[0.16em] uppercase",
                    isActive ? "text-secondary" : "text-white",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="mt-auto flex gap-2">
          <IconLink href={headerActions.home.href} label={headerActions.home.label}>
            <HomeIcon className="size-[18px]" />
          </IconLink>
          <IconLink href={headerActions.contact.href} label={headerActions.contact.label}>
            <MailIcon className="size-[18px]" />
          </IconLink>
        </div>
      </nav>
    </header>
  )
}
