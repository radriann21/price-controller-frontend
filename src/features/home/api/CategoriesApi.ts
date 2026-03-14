import axiosClient from "@/shared/api/axiosClient";
import { handleApiError } from "@/shared/utils/errorHandler";
import type { CreateCategoryDTO, CategoryResponse, UpdateCategoryDTO } from "../interfaces/categories.interface";
import type { Pagination } from "../interfaces/pagination.interface";

export const CategoriesApi = {
  async getAllCategories({ page, limit, search }: Pagination): Promise<CategoryResponse> {
    try {
      const response = await axiosClient.get<CategoryResponse>('/categories', {
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

  async createCategory(category: CreateCategoryDTO) {
    try {
      const response = await axiosClient.post('/categories', category);
      return response.data;
    } catch (error) {
      const appError = handleApiError(error);
      throw appError;
    }
  },

  async deleteCategory(id: string) {
    try {
      const response = await axiosClient.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      const appError = handleApiError(error);
      throw appError;
    }
  },

  async updateCategory(id: string, category: UpdateCategoryDTO) {
    try {
      const response = await axiosClient.patch(`/categories/${id}`, category);
      return response.data;
    } catch (error) {
      const appError = handleApiError(error);
      throw appError;
    }
  }
};
