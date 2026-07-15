import { apiClient } from '../../../services/apiClient';
import { Product } from '../types/ProductType';

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>('/products');
  return data;
}

export async function fetchProductById(id: number): Promise<Product> {
  const { data } = await apiClient.get<Product>(`/products/${id}`);
  return data;
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>(`/products/category/${category}`);
  return data;
}