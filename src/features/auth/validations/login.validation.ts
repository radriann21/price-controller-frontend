import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string("EL nombre de usuario es requerido")
    .min(5, "El nombre de usuario debe tener al menos 5 caracteres"),
  password: z
    .string("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginType = z.infer<typeof loginSchema>;
