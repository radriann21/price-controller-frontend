import { lazy } from "react"
import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "@/features/auth/Login";
import { ProtectedRoute } from "@/shared/guards/ProtectedRoute";

// lazy
const Home = lazy(() => import("@/features/home/Home"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}