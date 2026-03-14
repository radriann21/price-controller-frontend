export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface CategoryResponse {
  data: Category[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateCategoryDTO {
  name: string;
  description?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
  isActive?: boolean;
}
