import { useMutation } from "@tanstack/react-query";
import { CategoriesApi } from "@/features/home/api/CategoriesApi";
import { queryKeys } from "@/shared/query/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "@/shared/utils/errorHandler";
import type { CreateCategoryDTO } from "../interfaces/categories.interface";

export const useCreateCategory = ({
  reset,
  close,
}: {
  reset: () => void;
  close: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category: CreateCategoryDTO) =>
      CategoriesApi.createCategory(category),
    mutationKey: [queryKeys.categories.all],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.categories.all] });
      showSuccessToast(
        "Categoría creada",
        "La categoría se ha creado exitosamente"
      );
      reset();
      close();
    },
    onError: (error) => {
      showErrorToast(error, "Error al crear categoría");
    },
  });
};
