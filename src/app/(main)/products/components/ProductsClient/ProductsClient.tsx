'use client';

import { useLocalStore } from '@/store/hooks';
import { ProductsStore, ProductsStoreProvider } from '@/store';
import ProductsListWrapper from '../ProductsCards/ProductsListWrapper';
import ProductsFilterWrapper from '../ProductsFilter/ProductsFilterWrapper';
import { Suspense } from 'react';

const ProductsClient = () => {
  const productsStore = useLocalStore(() => new ProductsStore());

  return (
    <ProductsStoreProvider store={productsStore}>
      <ProductsFilterWrapper />
      <Suspense fallback={null}>
        <ProductsListWrapper />
      </Suspense>
    </ProductsStoreProvider>
  );
};

export default ProductsClient;
