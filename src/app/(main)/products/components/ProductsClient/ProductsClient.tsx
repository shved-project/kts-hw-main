'use client';

import { useLocalStore } from '@/store/hooks';
import { ProductsStore, ProductsStoreProvider } from '@/store';
import ProductsListWrapper from '../ProductsCards/ProductsListWrapper';
import ProductsFilterWrapper from '../ProductsFilter/ProductsFilterWrapper';

const ProductsClient = () => {
  const productsStore = useLocalStore(() => new ProductsStore());

  return (
    <ProductsStoreProvider store={productsStore}>
      <ProductsFilterWrapper />
      <ProductsListWrapper />
    </ProductsStoreProvider>
  );
};

export default ProductsClient;
