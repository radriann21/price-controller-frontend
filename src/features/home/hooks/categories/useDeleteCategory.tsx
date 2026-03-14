import { CategoriesApi } from "../api/CategoriesApi";
import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => CategoriesApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.categories.all],
      });
      toaster.create({
        title: "Categoría eliminada",
        description: "La categoría ha sido eliminada correctamente",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Error al eliminar la categoría",
        description: error.message,
        type: "error",
      });
    },
  });
};
