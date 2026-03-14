import { z } from "zod";

export const globalMarginSchema = z.object({
  profitMargin: z.number("Debe ser un número").min(0, "El margen debe ser mayor o igual a 0"),
});

export type GlobalMarginFormValues = z.infer<typeof globalMarginSchema>;