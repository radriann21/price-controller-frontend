import axiosClient from "@/shared/api/axiosClient";
import { handleApiError } from "@/shared/utils/errorHandler";
import type { CreateProductDTO, ProductResponse } from "../interfaces/products.interface";
import type { Pagination } from "../interfaces/pagination.interface";

export const ProductsApi = {
  async getAllProducts({ page, limit }: Pagination): Promise<ProductResponse> {
    try {
      const response = await axiosClient.get<ProductResponse>('/products', {
        params: {
          page,
          limit,
        },
      });
      
      return response.data;
    } catch (error) {
      const appError = handleApiError(error);
      throw appError;
    }
  },

  async createProduct(product: CreateProductDTO) {
    try {
      const response = await axiosClient.post('/products', product);
      return response.data;
    } catch (error) {
      const appError = handleApiError(error);
      throw appError;
    }
  },

  async updateProductPrices() {
    try {
      const response = await axiosClient.patch('/products/prices/update')
      return response.data
    } catch (error) {
      const appError = handleApiError(error);
      throw appError;
    }
  }
};
