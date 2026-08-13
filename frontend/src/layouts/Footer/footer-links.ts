export const footerColumns = [
  {
    id: "cursos",
    title: "Cursos",
    links: [
      { id: "ingles-comunicativo", label: "Inglés Comunicativo", href: "/programas/ingles-comunicativo" },
      { id: "ingles-especializado", label: "Inglés Especializado", href: "/programas/ingles-especializado" },
      { id: "instituciones-educativas", label: "Instituciones Educativas", href: "/instituciones" },
      { id: "programa-empresas", label: "Programa para empresas", href: "/empresas" },
      { id: "examenes-internacionales", label: "Exámenes internacionales", href: "/examenes" },
      { id: "otros-idiomas", label: "Otros idiomas", href: "/programas/otros-idiomas" },
    ],
  },
  {
    id: "servicios",
    title: "Servicios",
    links: [
      {
        id: "in-company",
        label: "In Company - Mejorando la comunicación",
        href: "/servicios/in-company",
      },
      {
        id: "instituciones-continuamente",
        label: "Instituciones educativas - Mejorando continuamente",
        href: "/servicios/instituciones",
      },
      {
        id: "examenes-suficiencia",
        label: "Exámenes de suficiencia en el idioma Inglés",
        href: "/servicios/suficiencia",
      },
    ],
  },
  {
    id: "sobre-el-centro",
    title: "Sobre el Centro de idiomas",
    links: [
      { id: "nosotros", label: "Nosotros", href: "/nosotros" },
      { id: "contactanos", label: "Contáctanos", href: "/contacto" },
      { id: "ubicacion", label: "Ubicación", href: "/ubicacion" },
      { id: "canal", label: "Canal Idiomas UPRIT", href: "/canal" },
    ],
  },
] as const

export const socialLinks = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/uptrujillo",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/upritrujillo",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@comunidaduprit",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/school/universidad-privada-de-trujillo/",
  },
] as const

export const footerMeta = {
  ruc: "20482309381",
  complaintsHref: "/libro-reclamaciones",
} as const

export type FooterColumn = (typeof footerColumns)[number]
export type SocialLink = (typeof socialLinks)[number]
