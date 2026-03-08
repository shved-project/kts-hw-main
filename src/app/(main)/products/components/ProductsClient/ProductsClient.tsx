'use client';

import { useLocalStore } from '@/store/hooks';
import ProductsList from '../ProductsList';
import { ProductsStore, ProductsStoreProvider } from '@/store';

const ProductsClient = () => {
  const productsStore = useLocalStore(() => new ProductsStore());

  return (
    <ProductsStoreProvider store={productsStore}>
      <ProductsList />
    </ProductsStoreProvider>
  );
};

export default ProductsClient;
