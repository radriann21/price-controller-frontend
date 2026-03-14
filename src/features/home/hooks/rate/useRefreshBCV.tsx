import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";

export const useRefreshBCV = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.rates] });
    toaster.create({
      title: "Tasa actualizada",
      description: "La tasa del BCV ha sido actualizada",
      type: "success",
    });
  };
};
