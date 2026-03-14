import { useMutation } from "@tanstack/react-query";
import { ProductsApi } from "../api/ProductsApi";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/query/queryKeys";
import { showErrorToast } from "@/shared/utils/errorHandler";
import { toaster } from "@/shared/components/ui/toaster";

interface UseUpdateProductsPricesOptions {
  onSuccess?: () => void;
}

export const useUpdateProductsPrices = (options?: UseUpdateProductsPricesOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => ProductsApi.updateProductPrices(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.products.all],
      });
      toaster.create({
        title: "Precios actualizados",
        description: "Los precios se han actualizado correctamente",
        type: "success",
      });
      options?.onSuccess?.();
    },
    onError: (error) => {
      showErrorToast(error, "Error al actualizar precios");
    }
  });
};
