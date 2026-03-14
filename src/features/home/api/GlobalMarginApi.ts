import axiosClient from "@/shared/api/axiosClient";
import { handleApiError } from "@/shared/utils/errorHandler";
import type { ProfitMarginDTO } from "@/features/home/interfaces/profitMargin.interfaces";

export const GlobalMarginApi = {
  async getGlobalMargin() {
    try {
      const response = await axiosClient.get("/global-margin");
      return response.data;
    } catch (error) {
      const appError = handleApiError(error);
      throw appError;
    }
  },
  async createGlobalMargin(data: ProfitMarginDTO) {
    try {
      const response = await axiosClient.post("/global-margin", data);
      return response.data;
    } catch (error) {
      const appError = handleApiError(error);
      throw appError;
    }
  },
};
