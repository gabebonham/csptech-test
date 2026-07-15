import { apiClient } from '../../../services/apiClient';

export async function fetchCategories(): Promise<string[]> {
  const { data } = await apiClient.get<string[]>('/products/categories');
  return data;
}

