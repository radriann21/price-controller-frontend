import axiosClient from "@/shared/api/axiosClient";
import { handleApiError } from "@/shared/utils/errorHandler";
import type { Rate } from "../interfaces/rate.interface";

export const PricesApi = {
  async getBCVRate(): Promise<Rate> {
    try {
      const response = await axiosClient.get<Rate>('/rates/actual');
      return response.data;
    } catch (error) {
      const appError = handleApiError(error);
      throw appError;
    }
  }
}