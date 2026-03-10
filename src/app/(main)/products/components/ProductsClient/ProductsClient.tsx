'use client';

import { useLocalStore } from '@/store/hooks';
import { ProductsStore, ProductsStoreProvider } from '@/store';
import ProductsListWrapper from '../ProductsCards/ProductsListWrapper';
import ProductsFilterWrapper from '../ProductsFilter/ProductsFilterWrapper';
import { Suspense } from 'react';
import Loader from '@/components/Loader';
import styles from '../../Products.module.scss';

const ProductsClient = () => {
  const productsStore = useLocalStore(() => new ProductsStore());

  return (
    <ProductsStoreProvider store={productsStore}>
      <ProductsFilterWrapper />
      <Suspense fallback={<Loader className={styles.products__loader} />}>
        <ProductsListWrapper />
      </Suspense>
    </ProductsStoreProvider>
  );
};

export default ProductsClient;
