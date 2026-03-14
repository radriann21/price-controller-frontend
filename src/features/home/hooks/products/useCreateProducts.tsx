import { useMutation } from "@tanstack/react-query";
import { ProductsApi } from "@/features/home/api/ProductsApi";
import { queryKeys } from "@/shared/query/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "@/shared/utils/errorHandler";
import type { CreateProductDTO } from "../interfaces/products.interface";

export const useCreateProducts = ({
  reset,
  close,
}: {
  reset: () => void;
  close: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: CreateProductDTO) =>
      ProductsApi.createProduct(product),
    mutationKey: [queryKeys.products.all],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.products.all] });
      showSuccessToast(
        "Producto creado",
        "El producto se ha creado exitosamente",
      );
      reset();
      close();
    },
    onError: (error) => {
      showErrorToast(error, "Error al crear producto");
    },
  });
};
