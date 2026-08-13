import alvinaPhoto from "../../../../assets/testimonials/alvina.jpg"
import carlosPhoto from "../../../../assets/testimonials/carlos.jpg"
import mariaPhoto from "../../../../assets/testimonials/maria.jpg"

export type Testimonial = {
  id: string
  name: string
  role: string
  thumbnail: string
  thumbnailAlt: string
  youtubeId?: string
}

export const testimonials: Testimonial[] = [
  {
    id: "alvina-ruiz",
    name: "Alvina Ruiz",
    role: "Presentadora de noticias",
    thumbnail: alvinaPhoto,
    thumbnailAlt: "Alvina Ruiz en un entorno profesional",
  },
  {
    id: "carlos-mendoza",
    name: "Carlos Mendoza",
    role: "Egresado de inglés comunicativo",
    thumbnail: carlosPhoto,
    thumbnailAlt: "Carlos Mendoza, egresado del centro de idiomas",
  },
  {
    id: "maria-torres",
    name: "María Torres",
    role: "Docente de instituciones educativas",
    thumbnail: mariaPhoto,
    thumbnailAlt: "María Torres, docente de instituciones educativas",
  },
]
