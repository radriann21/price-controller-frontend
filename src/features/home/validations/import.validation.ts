import { z } from "zod";

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ACCEPTED_FILE_TYPES = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
];

export const importSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Debes seleccionar un archivo")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "El archivo no debe superar 10MB"
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Solo se aceptan archivos Excel (.xls, .xlsx) o CSV"
    ),
});

export type ImportFormData = z.infer<typeof importSchema>;