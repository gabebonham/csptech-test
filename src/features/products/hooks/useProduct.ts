import { useEffect, useState } from 'react';
import { fetchProductById } from '../services/productsApi';
import { Product } from '../types/ProductType';

type UseProductResult = {
  data: Product | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

export function useProduct(productId: number): UseProductResult {
  const [data, setData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    if (!productId) return;

    async function load() {
      setIsLoading(true);
      setIsError(false);

      try {
        const product = await fetchProductById(productId);
        setData(product);
      } catch (error) {
          setIsError(true);
      } finally {
          setIsLoading(false);
      }
    }
    load();
  }, [productId, refetchTrigger]);

  function refetch() {
    setRefetchTrigger((prev) => prev + 1);
  }
  return { data, isLoading, isError, refetch };
}