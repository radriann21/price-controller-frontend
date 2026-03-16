import { CategoriesApi } from "@/features/home/api/CategoriesApi";
import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/shared/query/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "@/shared/utils/errorHandler";
import type { UpdateCategoryDTO } from "@/features/home/interfaces/categories.interface";

interface UseUpdateCategoryParams {
  onSuccessCallback?: () => void;
}

export const useUpdateCategory = ({ onSuccessCallback }: UseUpdateCategoryParams = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, category }: { id: string; category: UpdateCategoryDTO }) =>
      CategoriesApi.updateCategory(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.categories.all],
      });
      showSuccessToast(
        "Categoría actualizada",
        "La categoría ha sido actualizada correctamente"
      );
      onSuccessCallback?.();
    },
    onError: (error) => {
      showErrorToast(error, "Error al actualizar la categoría");
    },
  });
};
