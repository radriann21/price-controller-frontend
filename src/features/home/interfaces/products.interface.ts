export interface Product {
  id: string;
  name: string;
  costUsd: number;
  profitMargin: number;
  priceVes: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface ProductResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateProductDTO {
  name: string;
  costUsd: number;
  profitMargin: number;
  priceVes: number;
}