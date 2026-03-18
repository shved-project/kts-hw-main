import React from 'react';
import { useProductsStore } from '@/store/locals/products';
import { observer } from 'mobx-react-lite';
import ProductsList from '../ProductsList';
import ProductsListSkeleton from '../ProductsList/ProductsListSkeleton';
import styles from './ProductsListWrapper.module.scss';
import Text from '@/components/Text';
import ErrorApiMessage from '@/components/ErrorApiMessage';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS_CATEGORY, PRODUCTS_SEARCH } from '@/config/queryParams';
import { PAGE_SIZE } from '@/api/req/products.api';

const ProductsListWrapper = () => {
  const {
    isInitLoading,
    error,
    isEmptySearchResult,
    loadProductsList,
    setSearchParam,
    setCurrentCategoryId,
  } = useProductsStore();

  const searchParams = useSearchParams();
  const title = searchParams.get(PRODUCTS_SEARCH);
  const categoryId = searchParams.get(PRODUCTS_CATEGORY);

  React.useEffect(() => {
    setSearchParam(title ?? '');
    setCurrentCategoryId(categoryId ?? null);
  }, [categoryId, setCurrentCategoryId, setSearchParam, title]);

  React.useEffect(() => {
    loadProductsList();
  }, [loadProductsList]);

  if (isInitLoading) {
    return <ProductsListSkeleton count={PAGE_SIZE} showTitle />;
  }

  if (isEmptySearchResult) {
    return (
      <div className={styles.empty}>
        <Text view="p-20" color="secondary">
          No products found. Try changing search or filter.
        </Text>
      </div>
    );
  }

  if (error) {
    return <ErrorApiMessage error={error} />;
  }

  return <ProductsList />;
};

export default observer(ProductsListWrapper);
