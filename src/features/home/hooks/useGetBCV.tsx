import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/query/queryKeys";
import { PricesApi } from "@/features/home/api/PricesApi";

export const useGetBCV = () => {
  return useQuery({
    queryKey: [queryKeys.rates],
    queryFn: () => PricesApi.getBCVRate(),
  });
}