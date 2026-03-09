import { AxiosError } from "axios";
import { toaster } from "@/shared/components/ui/toaster";

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export class AppError extends Error {
  statusCode?: number;
  errors?: Record<string, string[]>;

  constructor(message: string, statusCode?: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof AxiosError) {
    const statusCode = error.response?.status;
    const responseData = error.response?.data;

    if (!error.response) {
      return new AppError(
        "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
        0
      );
    }

    if (error.code === "ECONNABORTED") {
      return new AppError(
        "La solicitud tardó demasiado tiempo. Intenta nuevamente.",
        408
      );
    }

    if (statusCode && statusCode >= 500) {
      return new AppError(
        "Error en el servidor. Por favor, intenta más tarde.",
        statusCode
      );
    }

    if (statusCode && statusCode >= 400) {
      const message = responseData?.message || "Ocurrió un error en la solicitud.";
      const errors = responseData?.errors;
      return new AppError(message, statusCode, errors);
    }

    return new AppError(
      responseData?.message || "Ocurrió un error inesperado.",
      statusCode
    );
  }

  if (error instanceof Error) {
    return new AppError(error.message);
  }

  return new AppError("Ocurrió un error inesperado.");
};

export const showErrorToast = (error: unknown, customTitle?: string) => {
  const appError = handleApiError(error);
  
  toaster.create({
    title: customTitle || "Error",
    description: appError.message,
    type: "error",
    duration: 5000,
  });

  if (import.meta.env.DEV) {
    console.error("Error details:", appError);
  }
};

export const showSuccessToast = (title: string, description?: string) => {
  toaster.create({
    title,
    description,
    type: "success",
    duration: 3000,
  });
};
