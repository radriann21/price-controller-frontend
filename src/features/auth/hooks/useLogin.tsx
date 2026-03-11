import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api/AuthApi";
import { toaster } from "@/shared/components/ui/toaster";
import { useAuthStore } from "@/shared/stores/AuthStore";
import type { LoginResponse } from "@/features/auth/interfaces/loginResponse.interface";
import type { LoginDto } from "@/features/auth/dto/login.dto";

export const useLogin = () => {
  const { login } = useAuthStore();
  return useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: (data: LoginResponse) => {
      toaster.create({
        title: "Has iniciado sesión",
        type: "success",
      })
      login({ id: data.id, username: data.username })
    },
    onError: (error) => {
      toaster.create({
        title: "Error al iniciar sesión",
        description: error.message,
        type: "error",
      })
    },
  })
}