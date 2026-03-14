import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { queryKeys } from "@/shared/query/queryKeys";
import { ProductsApi } from "@/features/home/api/ProductsApi";
import type { Pagination } from "../interfaces/pagination.interface";

export const useGetProducts = (pagination: Pagination) => {
  return useQuery({
    queryKey: [queryKeys.products.all, pagination],
    queryFn: () => ProductsApi.getAllProducts(pagination),
    placeholderData: keepPreviousData,
  })
}