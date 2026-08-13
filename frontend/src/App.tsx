import { colors } from "./core/theme"
import { MainLayout } from "./layouts"

type Swatch = {
  name: string
  token: string
  value: string
  inverted?: boolean
}

type PaletteGroup = {
  title: string
  swatches: Swatch[]
}

const palette: PaletteGroup[] = [
  {
    title: "Marca",
    swatches: [
      { name: "Primary", token: "bg-primary", value: colors.primary, inverted: true },
      { name: "Primary dark", token: "bg-primary-dark", value: colors.primaryDark, inverted: true },
      { name: "Primary darker", token: "bg-primary-darker", value: colors.primaryDarker, inverted: true },
      { name: "Secondary", token: "bg-secondary", value: colors.secondary, inverted: true },
      { name: "Secondary hover", token: "bg-secondary-hover", value: colors.secondaryHover, inverted: true },
      { name: "Secondary soft", token: "bg-secondary-soft", value: colors.secondarySoft },
      { name: "Text secondary", token: "bg-text-secondary", value: colors.textSecondary, inverted: true },
      { name: "Tertiary", token: "bg-tertiary", value: colors.tertiary },
    ],
  },
  {
    title: "Neutros",
    swatches: [
      { name: "Heading", token: "bg-heading", value: colors.heading, inverted: true },
      { name: "Dark", token: "bg-dark", value: colors.dark, inverted: true },
      { name: "Body", token: "bg-body", value: colors.body, inverted: true },
      { name: "Title", token: "bg-title", value: colors.title },
      { name: "Border", token: "bg-border", value: colors.border },
      { name: "White", token: "bg-white", value: colors.white },
    ],
  },
  {
    title: "Superficies",
    swatches: [
      { name: "Background", token: "bg-bg", value: colors.bg },
      { name: "CTA", token: "bg-bg-cta", value: colors.bgCta },
      { name: "Body", token: "bg-bg-body", value: colors.bgBody },
      { name: "Lighten 01", token: "bg-lighten-01", value: colors.lighten01 },
      { name: "Lighten 03", token: "bg-lighten-03", value: colors.lighten03 },
    ],
  },
  {
    title: "Oscuros",
    swatches: [
      { name: "Dark bg", token: "bg-dark-bg", value: colors.darkBg, inverted: true },
      { name: "Dark body", token: "bg-dark-body", value: colors.darkBody, inverted: true },
      { name: "Dark surface", token: "bg-dark-surface", value: colors.darkSurface, inverted: true },
      { name: "Dark nav", token: "bg-dark-nav", value: colors.darkNav, inverted: true },
      { name: "Dark border", token: "bg-dark-border", value: colors.darkBorder, inverted: true },
    ],
  },
  {
    title: "Semánticos",
    swatches: [
      { name: "Success", token: "bg-success", value: colors.success, inverted: true },
      { name: "Danger", token: "bg-danger", value: colors.danger, inverted: true },
      { name: "Warning", token: "bg-warning", value: colors.warning, inverted: true },
      { name: "Info", token: "bg-info", value: colors.info, inverted: true },
    ],
  },
]

export const App = () => {
  return (
    <MainLayout>
      <div className="px-6 py-12 text-heading">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <div>
            <p className="font-heading text-sm font-semibold tracking-wide text-secondary uppercase">
              UPRIT
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold">Colores institucionales</h1>
            <p className="mt-2 max-w-2xl text-body">
              Paleta extraída de uprit-web. Usa clases Tailwind como{" "}
              <code className="rounded-sm bg-lighten-01 px-1.5 py-0.5 text-primary">bg-primary</code>
              {" "}o las variables SCSS en{" "}
              <code className="rounded-sm bg-lighten-01 px-1.5 py-0.5 text-primary">_variables.scss</code>.
            </p>
          </div>

        {palette.map((group) => (
          <section key={group.title} className="flex flex-col gap-4">
            <h2 className="font-heading text-lg font-semibold">{group.title}</h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {group.swatches.map((swatch) => (
                <li
                  key={swatch.name}
                  className="overflow-hidden rounded-md border border-border bg-white shadow-sm"
                >
                  <div className={`flex h-24 items-end p-3 ${swatch.token}`}>
                    <span
                      className={`text-xs font-medium ${
                        swatch.inverted ? "text-white" : "text-heading"
                      }`}
                    >
                      {swatch.value}
                    </span>
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{swatch.name}</p>
                    <p className="text-xs text-body">{swatch.token}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
        </div>
      </div>
    </MainLayout>
  )
}
