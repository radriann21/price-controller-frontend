import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "@/features/home/Home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}