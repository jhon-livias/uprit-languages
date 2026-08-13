import empresasPhoto from "../../../../assets/programs/empresas.jpg"
import institucionesPhoto from "../../../../assets/programs/instituciones.jpg"
import trujilloPhoto from "../../../../assets/banner/office.jpg"
import virtualPhoto from "../../../../assets/learning/virtual.jpg"

export type Campus = {
  id: string
  name: string
  subtitle: string
  image: string
  imageAlt: string
  whatsappHref: string
}

export const campuses: Campus[] = [
  {
    id: "virtual",
    name: "Virtual",
    subtitle: "Clases en vivo por videoconferencia",
    image: virtualPhoto,
    imageAlt: "Estudiante en una clase virtual por videoconferencia",
    whatsappHref: "https://wa.me/?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20clases%20virtuales%20UPRIT%20Idiomas",
  },
  {
    id: "trujillo",
    name: "Trujillo",
    subtitle: "Sede principal del centro de idiomas",
    image: trujilloPhoto,
    imageAlt: "Campus de UPRIT en Trujillo",
    whatsappHref: "https://wa.me/?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20la%20sede%20Trujillo%20UPRIT%20Idiomas",
  },
  {
    id: "empresas",
    name: "Empresas",
    subtitle: "Programas in company en tu organización",
    image: empresasPhoto,
    imageAlt: "Programa de idiomas para empresas",
    whatsappHref: "https://wa.me/?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20programas%20para%20empresas%20UPRIT%20Idiomas",
  },
  {
    id: "instituciones",
    name: "Instituciones educativas",
    subtitle: "Convenios y programas para colegios",
    image: institucionesPhoto,
    imageAlt: "Programa de idiomas para instituciones educativas",
    whatsappHref: "https://wa.me/?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20instituciones%20educativas%20UPRIT%20Idiomas",
  },
]
