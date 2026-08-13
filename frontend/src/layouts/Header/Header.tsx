import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react"
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
  className?: string
}

const iconBoxClass =
  "grid place-items-center rounded-md border border-white/90 text-white transition-colors duration-200 hover:bg-white hover:text-header focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"

const IconLink = ({ href, label, children, className }: IconLinkProps) => {
  return (
    <a href={href} aria-label={label} className={clsx(iconBoxClass, className)}>
      {children}
    </a>
  )
}

const EnrollButton = ({ className }: { className?: string }) => {
  return (
    <a
      href={headerActions.enroll.href}
      className={clsx(
        "inline-flex h-[27px] max-h-[27px] items-center gap-2 rounded-full bg-cta py-0 pr-0.5 pl-3 text-[10px] font-bold tracking-[0.06em] text-cta-fg uppercase transition duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      {headerActions.enroll.label}
      <span
        className="grid size-6 place-items-center rounded-full bg-header text-cta"
        aria-hidden="true"
      >
        <ChevronIcon className="size-3" />
      </span>
    </a>
  )
}

export const Header = ({ activeHref = "/" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLElement>(null)
  const menuId = useId()

  useLayoutEffect(() => {
    const header = headerRef.current

    if (!header) {
      return
    }

    const updateHeight = () => {
      setHeaderHeight(header.getBoundingClientRect().height)
    }

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(header)

    return () => observer.disconnect()
  }, [])

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
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 bg-header text-white">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-cta focus:px-3 focus:py-2 focus:text-cta-fg"
      >
        Saltar al contenido
      </a>

      <div className={`relative z-20 ${layoutContainerClass}`}>
        <div className="flex items-center justify-between gap-3 py-3 sm:items-start sm:gap-4 sm:py-4">
          <Brand />

          <div className="flex max-h-[27px] shrink-0 items-center justify-start gap-2 sm:items-start sm:gap-2.5">
            <EnrollButton className="hidden sm:inline-flex" />
            <div className="hidden max-h-[27px] items-center gap-2 sm:flex">
              <IconLink href={headerActions.home.href} label={headerActions.home.label} className="size-[27px]">
                <HomeIcon className="h-[18px] w-[17px]" />
              </IconLink>
              <IconLink
                href={headerActions.contact.href}
                label={headerActions.contact.label}
                className="size-[27px]"
              >
                <MailIcon className="h-[18px] w-[17px]" />
              </IconLink>
            </div>
            <button
              type="button"
              className={clsx(iconBoxClass, "size-[27px] xl:hidden")}
              aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <CloseIcon className="size-4" /> : <MenuIcon className="size-4" />}
            </button>
          </div>
        </div>

        <nav aria-label="Principal" className="hidden h-12 items-center justify-center xl:flex">
          <ul className="flex flex-nowrap items-center justify-center gap-x-6 whitespace-nowrap 2xl:gap-x-10">
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
          className="fixed inset-0 z-10 cursor-default bg-black/50 xl:hidden"
          aria-label="Cerrar menú de navegación"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav
        id={menuId}
        aria-label="Móvil"
        inert={!isMenuOpen}
        className={clsx(
          "fixed top-0 right-0 z-30 flex h-full w-[min(22rem,100%)] flex-col gap-6 bg-header px-5 py-6 shadow-2xl transition-transform duration-300 sm:px-6 xl:hidden",
          isMenuOpen ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm tracking-[0.16em] uppercase">Menú</p>
          <button
            type="button"
            className={clsx(iconBoxClass, "size-9")}
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
          <IconLink href={headerActions.home.href} label={headerActions.home.label} className="size-9">
            <HomeIcon className="size-[18px]" />
          </IconLink>
          <IconLink href={headerActions.contact.href} label={headerActions.contact.label} className="size-9">
            <MailIcon className="size-[18px]" />
          </IconLink>
        </div>
      </nav>
      </header>
      <div className="shrink-0" style={{ height: headerHeight }} aria-hidden="true" />
    </>
  )
}
