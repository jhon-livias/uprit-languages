import type { ReactNode } from "react"
import { Footer } from "./Footer"
import { Header } from "./Header"

type MainLayoutProps = {
  children: ReactNode
  activeHref?: string
}

export const MainLayout = ({ children, activeHref = "/" }: MainLayoutProps) => {
  return (
    <div className="flex min-h-svh flex-col bg-bg">
      <Header activeHref={activeHref} />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
