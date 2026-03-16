import { ProductsApi } from "@/features/home/api/ProductsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";

export const useImportExcel = ({
  reset,
  close,
}: {
  reset: () => void;
  close: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => ProductsApi.importProducts(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.products.all] });
      toaster.create({
        title: "Éxito",
        description: "Archivo importado correctamente",
      });
      reset();
      close();
    },
    onError: (error) => {
      toaster.create({
        title: "Error",
        description: error.message,
      });
    },
  });
};
