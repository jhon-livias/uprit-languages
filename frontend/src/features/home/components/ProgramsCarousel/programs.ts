import comunicativoPhoto from "../../../../assets/programs/comunicativo.jpg"
import conveniosPhoto from "../../../../assets/programs/convenios.jpg"
import docentesPhoto from "../../../../assets/programs/docentes.jpg"
import empresasPhoto from "../../../../assets/programs/empresas.jpg"
import especializadoPhoto from "../../../../assets/programs/especializado.jpg"
import examenesPhoto from "../../../../assets/programs/examenes.jpg"
import institucionesPhoto from "../../../../assets/programs/instituciones.jpg"
import otrosIdiomasPhoto from "../../../../assets/programs/otros-idiomas.jpg"

export type ProgramSlide = {
  id: string
  title: string
  href: string
  src: string
  alt: string
}

export const programSlides: ProgramSlide[] = [
  {
    id: "comunicativo",
    title: "Inglés comunicativo",
    href: "/programas/ingles-comunicativo",
    src: comunicativoPhoto,
    alt: "Grupo de estudiantes practicando inglés",
  },
  {
    id: "especializado",
    title: "Inglés especializado",
    href: "/programas/ingles-especializado",
    src: especializadoPhoto,
    alt: "Profesionales en una sesión de inglés especializado",
  },
  {
    id: "instituciones",
    title: "Instituciones educativas",
    href: "/instituciones",
    src: institucionesPhoto,
    alt: "Clase en una institución educativa",
  },
  {
    id: "empresas",
    title: "Programas para empresas",
    href: "/empresas",
    src: empresasPhoto,
    alt: "Profesional en un entorno corporativo",
  },
  {
    id: "examenes",
    title: "Preparación para exámenes internacionales",
    href: "/examenes",
    src: examenesPhoto,
    alt: "Aula lista para evaluaciones internacionales",
  },
  {
    id: "otros-idiomas",
    title: "Otros idiomas",
    href: "/programas/otros-idiomas",
    src: otrosIdiomasPhoto,
    alt: "Estudiantes conversando en el campus",
  },
  {
    id: "docentes",
    title: "Cursos para docentes",
    href: "/programas/cursos-docentes",
    src: docentesPhoto,
    alt: "Docente dictando una clase",
  },
  {
    id: "convenios",
    title: "Convenios",
    href: "/instituciones",
    src: conveniosPhoto,
    alt: "Equipo trabajando en un convenio institucional",
  },
]
