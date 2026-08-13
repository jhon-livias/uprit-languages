import { HomePage } from "./features/home"
import { MainLayout } from "./layouts"

export const App = () => {
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  )
}
