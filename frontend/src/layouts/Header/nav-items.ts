export const navItems = [
  { id: "nosotros", label: "Nosotros", href: "/nosotros" },
  { id: "programas", label: "Programas y cursos", href: "/programas" },
  { id: "empresas", label: "Empresas", href: "/empresas" },
  { id: "instituciones", label: "Instituciones educativas", href: "/instituciones" },
  { id: "examenes", label: "Exámenes internacionales", href: "/examenes" },
] as const

export const headerActions = {
  home: { href: "/", label: "Inicio" },
  contact: { href: "/contacto", label: "Contacto" },
  enroll: { href: "/matricula", label: "Matrícula online" },
} as const

export type NavItem = (typeof navItems)[number]
