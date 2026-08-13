import studentsPhoto from "../../../../assets/banner/students.jpg"
import officePhoto from "../../../../assets/banner/office.jpg"

export const heroSlides = [
  {
    id: "estudiantes",
    src: studentsPhoto,
    alt: "Estudiantes en el centro de idiomas UPRIT",
  },
  {
    id: "campus",
    src: officePhoto,
    alt: "Campus y espacios de aprendizaje UPRIT",
  },
] as const

export type HeroSlide = (typeof heroSlides)[number]
