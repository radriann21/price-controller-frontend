import { useQuery } from "@tanstack/react-query";
import { GlobalMarginApi } from "@/features/home/api/GlobalMarginApi";
import { queryKeys } from "@/shared/query/queryKeys";

export const useGetGlobalMargin = () => {
  return useQuery({
    queryKey: queryKeys.globalMargin,
    queryFn: () => GlobalMarginApi.getGlobalMargin(),
  });
};