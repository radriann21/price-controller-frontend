import axiosClient from "@/shared/api/axiosClient";
import { handleApiError } from "@/shared/utils/errorHandler";
import type { CreateProductDTO, ProductResponse, UpdateProductDTO } from "../interfaces/products.interface";
import type { Pagination } from "../interfaces/pagination.interface";

export const ProductsApi = {
  async getAllProducts({ page, limit, search }: Pagination): Promise<ProductResponse> {
    try {
      const response = await axiosClient.get<ProductResponse>('/products', {
        params: {
          page,
          limit,
          search,
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
  },

  async importProducts(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosClient.post('/products/import-excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Response:", response.data);
      
      return response.data;
    } catch (error) {
      const appError = handleApiError(error);
      throw appError;
    }
  },

  async deleteProduct(id: string) {
    try {
      const response = await axiosClient.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      const appError = handleApiError(error);
      throw appError;
    }
  },

  async updateProduct(id: string, product: UpdateProductDTO) {
    try {
      const response = await axiosClient.patch(`/products/${id}`, product);
      return response.data;
    } catch (error) {
      const appError = handleApiError(error);
      throw appError;
    }
  }
};
