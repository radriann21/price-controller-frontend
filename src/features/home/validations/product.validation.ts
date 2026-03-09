import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  costUsd: z.number().min(0, "El costo en USD debe ser mayor o igual a 0"),
  costVes: z.number().min(0, "El costo en VES debe ser mayor o igual a 0"),
  profitMargin: z.number().min(0, "El margen de ganancia debe ser mayor o igual a 0").optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;