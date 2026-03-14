import { ProductsApi } from "../api/ProductsApi";
import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/shared/query/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "@/shared/utils/errorHandler";
import type { UpdateProductDTO } from "../interfaces/products.interface";

interface UseUpdateProductParams {
  onSuccessCallback?: () => void;
}

export const useUpdateProduct = ({ onSuccessCallback }: UseUpdateProductParams = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: UpdateProductDTO }) =>
      ProductsApi.updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.products.all],
      });
      showSuccessToast(
        "Producto actualizado",
        "El producto ha sido actualizado correctamente"
      );
      onSuccessCallback?.();
    },
    onError: (error) => {
      showErrorToast(error, "Error al actualizar el producto");
    },
  });
};
