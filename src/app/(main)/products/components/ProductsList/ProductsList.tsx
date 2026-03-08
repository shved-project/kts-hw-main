import React from 'react';
import { useProductsStore } from '@/store/locals/products';
import { observer } from 'mobx-react-lite';

const ProductsList = () => {
  const { productsList, isLoading, loadProductsList } = useProductsStore();

  React.useEffect(() => {
    loadProductsList();
  }, [loadProductsList]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  console.log(productsList);

  return <h1>Hello!</h1>;
};

export default observer(ProductsList);
