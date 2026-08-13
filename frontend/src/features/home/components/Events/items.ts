import examenesPhoto from "../../../../assets/programs/examenes.jpg"
import presencialPhoto from "../../../../assets/learning/presencial.jpg"
import studentsPhoto from "../../../../assets/banner/students.jpg"

const MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"] as const

export type HomeEvent = {
  id: string
  title: string
  date: string
  href: string
  image: string
  imageAlt: string
}

export const formatEventDate = (isoDate: string) => {
  const date = new Date(`${isoDate}T00:00:00`)
  const month = MONTHS[date.getMonth()]
  const day = String(date.getDate()).padStart(2, "0")

  if (!month || Number.isNaN(date.getTime())) {
    return isoDate
  }

  return `${month} ${day}, ${date.getFullYear()}`
}

export const homeEvents: HomeEvent[] = [
  {
    id: "open-house-trujillo",
    title: "Open House en la sede Trujillo",
    date: "2026-08-29",
    href: "/eventos/open-house-trujillo",
    image: studentsPhoto,
    imageAlt: "Estudiantes en un evento del centro de idiomas UPRIT",
  },
  {
    id: "noche-de-idiomas",
    title: "Noche de idiomas — edición primavera",
    date: "2026-09-18",
    href: "/eventos/noche-de-idiomas",
    image: presencialPhoto,
    imageAlt: "Encuentro cultural de idiomas en UPRIT",
  },
  {
    id: "feria-certificaciones",
    title: "Feria de certificaciones internacionales",
    date: "2026-10-03",
    href: "/eventos/feria-certificaciones",
    image: examenesPhoto,
    imageAlt: "Estudiantes en una feria de certificaciones internacionales",
  },
]
