import { ProductsApi } from "../api/ProductsApi";
import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProductsApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.products.all],
      });
      toaster.create({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado correctamente",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Error al eliminar el producto",
        description: error.message,
        type: "error",
      });
    },
  });
};