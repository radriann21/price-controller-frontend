import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
