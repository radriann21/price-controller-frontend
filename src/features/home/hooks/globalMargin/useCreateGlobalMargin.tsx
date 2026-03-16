import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GlobalMarginApi } from "@/features/home/api/GlobalMarginApi";
import type { GlobalMarginFormValues } from "@/features/home/validations/globalMargin.validation";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";

export const useCreateGlobalMargin = ({ reset }: { reset: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GlobalMarginFormValues) => GlobalMarginApi.createGlobalMargin(data),
    onSuccess: () => {
      toaster.create({
        title: "Margen global creado",
        description: "El margen global se ha creado correctamente",
        type: "success"
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.globalMargin });
      reset();
    },
    onError: () => {
      toaster.create({
        title: "Error al crear el margen global",
        description: "No se pudo crear el margen global",
        type: "error",
      });
    },
  });
};