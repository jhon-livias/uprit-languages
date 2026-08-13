import eLearningPhoto from "../../../../assets/learning/e-learning.jpg"
import particularesPhoto from "../../../../assets/learning/particulares.jpg"
import presencialPhoto from "../../../../assets/learning/presencial.jpg"
import virtualPhoto from "../../../../assets/learning/virtual.jpg"

export type LearningModeTone = "info" | "cta" | "secondary" | "primary"

export type LearningMode = {
  id: string
  title: string
  href: string
  src: string
  alt: string
  tone: LearningModeTone
}

export const learningModes: LearningMode[] = [
  {
    id: "presencial",
    title: "Presencial",
    href: "/modalidad/presencial",
    src: presencialPhoto,
    alt: "Estudiante en una clase presencial",
    tone: "info",
  },
  {
    id: "virtual",
    title: "Virtual",
    href: "/modalidad/virtual",
    src: virtualPhoto,
    alt: "Estudiante en una clase virtual con laptop",
    tone: "cta",
  },
  {
    id: "particulares",
    title: "Clases particulares",
    href: "/modalidad/clases-particulares",
    src: particularesPhoto,
    alt: "Docente y estudiante en una clase particular",
    tone: "secondary",
  },
  {
    id: "e-learning",
    title: "E-learning",
    href: "/modalidad/e-learning",
    src: eLearningPhoto,
    alt: "Estudiantes en una sesión de e-learning",
    tone: "primary",
  },
]
