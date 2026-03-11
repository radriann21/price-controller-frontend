import AppRouter from "./AppRouter"
import { Toaster } from "@/shared/components/ui/toaster"
import { useAuthStore } from "@/shared/stores/AuthStore"
import { useEffect } from "react"

function App() {
  const { checkAuth } = useAuthStore()
  
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  )
}

export default App
