import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../services/productsApi';
import { Product } from '../types/ProductType';

export function useProducts() {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(true);

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setIsError(true);

    try {
      const products = await fetchProducts();
      setData(products);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  const refetch = useCallback(() => load(true), [load]);

  return { data, isLoading, isRefreshing, isError, refetch };
}