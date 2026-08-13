export type ScheduleOption = {
  id: string
  label: string
  value: string
}

export type ScheduleField = {
  id: string
  name: string
  label: string
  tone: "solid" | "muted"
  options: ScheduleOption[]
}

export const scheduleFields: ScheduleField[] = [
  {
    id: "sede",
    name: "sede",
    label: "Sedes",
    tone: "solid",
    options: [
      { id: "trujillo", label: "Trujillo", value: "trujillo" },
      { id: "virtual", label: "Virtual", value: "virtual" },
    ],
  },
  {
    id: "programa",
    name: "programa",
    label: "Programa o curso",
    tone: "muted",
    options: [
      { id: "ingles-comunicativo", label: "Inglés comunicativo", value: "ingles-comunicativo" },
      { id: "ingles-especializado", label: "Inglés especializado", value: "ingles-especializado" },
      { id: "otros-idiomas", label: "Otros idiomas", value: "otros-idiomas" },
      { id: "cursos-docentes", label: "Cursos para docentes", value: "cursos-docentes" },
      { id: "empresas", label: "Programas para empresas", value: "empresas" },
      { id: "examenes", label: "Exámenes internacionales", value: "examenes" },
      { id: "instituciones", label: "Instituciones educativas", value: "instituciones" },
    ],
  },
  {
    id: "ciclo",
    name: "ciclo",
    label: "Ciclo",
    tone: "muted",
    options: [
      { id: "ciclo-1", label: "Ciclo 1", value: "ciclo-1" },
      { id: "ciclo-2", label: "Ciclo 2", value: "ciclo-2" },
      { id: "ciclo-3", label: "Ciclo 3", value: "ciclo-3" },
      { id: "intensivo", label: "Intensivo", value: "intensivo" },
    ],
  },
  {
    id: "modalidad",
    name: "modalidad",
    label: "Modalidad",
    tone: "muted",
    options: [
      { id: "presencial", label: "Presencial", value: "presencial" },
      { id: "virtual", label: "Virtual", value: "virtual" },
    ],
  },
  {
    id: "frecuencia",
    name: "frecuencia",
    label: "Frecuencia",
    tone: "muted",
    options: [
      { id: "lun-mie", label: "Lunes y miércoles", value: "lun-mie" },
      { id: "mar-jue", label: "Martes y jueves", value: "mar-jue" },
      { id: "sabados", label: "Sábados", value: "sabados" },
      { id: "diario", label: "Intensivo diario", value: "diario" },
    ],
  },
]
