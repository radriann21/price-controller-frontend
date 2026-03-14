import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { queryKeys } from "@/shared/query/queryKeys";
import { CategoriesApi } from "@/features/home/api/CategoriesApi";
import type { Pagination } from "../interfaces/pagination.interface";

export const useGetCategories = (pagination: Pagination) => {
  return useQuery({
    queryKey: [queryKeys.categories.all, pagination],
    queryFn: () => CategoriesApi.getAllCategories(pagination),
    placeholderData: keepPreviousData,
  })
}
