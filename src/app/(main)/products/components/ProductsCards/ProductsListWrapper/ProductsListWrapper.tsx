import React from 'react';
import { useProductsStore } from '@/store/locals/products';
import { observer } from 'mobx-react-lite';
import ProductsListLoading from '../ProductsListLoading';
import ProductsList from '../ProductsList';

const ProductsListWrapper = () => {
  const { isInitLoading, loadProductsList } = useProductsStore();

  React.useEffect(() => {
    loadProductsList();
  }, [loadProductsList]);

  if (isInitLoading) {
    return <ProductsListLoading />;
  }

  return <ProductsList />;
};

export default observer(ProductsListWrapper);
