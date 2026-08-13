export type WhyStudyTone = "success" | "info" | "heading" | "secondary"

export type WhyStudyIconName = "speech" | "certificate" | "puzzle" | "modes"

export type WhyStudyItem = {
  id: string
  title: string
  description: string
  tone: WhyStudyTone
  icon: WhyStudyIconName
}

export const whyStudyItems: WhyStudyItem[] = [
  {
    id: "ingles-universal",
    title: "Inglés universal",
    description: "Comprende y comunícate con personas de todos los acentos.",
    tone: "success",
    icon: "speech",
  },
  {
    id: "certificaciones",
    title: "Preparación para certificaciones",
    description: "Avanza hacia tus metas internacionales con preparación incluida en tus clases.",
    tone: "info",
    icon: "certificate",
  },
  {
    id: "metodologia",
    title: "Metodología práctica",
    description: "Dinámica, comunicativa y centrada en ti desde el primer día.",
    tone: "heading",
    icon: "puzzle",
  },
  {
    id: "modalidades",
    title: "Modalidades a tu medida",
    description: "Estudia de forma presencial, virtual o en tu empresa, con el ritmo que necesitas.",
    tone: "secondary",
    icon: "modes",
  },
]
