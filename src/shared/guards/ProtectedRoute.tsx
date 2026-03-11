import { Outlet, Navigate } from "react-router";
import { useAuthStore } from "@/shared/stores/AuthStore";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
}

