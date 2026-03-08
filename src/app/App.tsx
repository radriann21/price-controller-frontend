import AppRouter from "./AppRouter"
import { Toaster } from "@/shared/components/ui/toaster"

function App() {
  return (
    <div>
      <AppRouter />
      <Toaster />
    </div>
  )
}

export default App
