import React from 'react';
import { useProductsStore } from '@/store/locals/products';
import { observer } from 'mobx-react-lite';
import ProductsList from '../ProductsList';
import Loader from '@/components/Loader';
import styles from '../../../Products.module.scss';
import Text from '@/components/Text';
import ErrorApiMessage from '@/components/ErrorApiMessage';

const ProductsListWrapper = () => {
  const { isInitLoading, error, isEmptySearchResult, loadProductsList } =
    useProductsStore();

  React.useEffect(() => {
    loadProductsList();
  }, [loadProductsList]);

  if (isInitLoading) {
    return (
      <div className={styles['products__loader-wrapper']}>
        <Loader className={styles.products__loader} />
      </div>
    );
  }

  if (isEmptySearchResult) {
    return (
      <div className={styles['products__empty']}>
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
