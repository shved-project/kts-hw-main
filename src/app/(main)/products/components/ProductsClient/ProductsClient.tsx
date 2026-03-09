'use client';

import { useLocalStore } from '@/store/hooks';
import { ProductsStore, ProductsStoreProvider } from '@/store';
import ProductsListWrapper from '../ProductsListWrapper';

const ProductsClient = () => {
  const productsStore = useLocalStore(() => new ProductsStore());

  return (
    <ProductsStoreProvider store={productsStore}>
      <ProductsListWrapper />
    </ProductsStoreProvider>
  );
};

export default ProductsClient;
