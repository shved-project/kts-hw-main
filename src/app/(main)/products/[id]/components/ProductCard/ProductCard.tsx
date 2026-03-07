'use client';

import * as React from 'react';
import ProductInfo from '../ProductInfo';
import SwiperImages from '../SwiperImages';
import { type ProductType } from '@/api/products.api';
import Loader from '@/components/Loader';
import styles from '../../Product.module.scss';
import classNames from 'classnames';
import ErrorApiMessage from '@/components/ErrorApiMessage';
import { useProductDetailsStore } from '@/store/locals/product-details';
import { observer } from 'mobx-react-lite';
import { useParams } from 'next/navigation';

const ProductCard: React.FC = () => {
  const { id } = useParams();
  const { hasInitiallyLoaded, error, product, loadProduct } =
    useProductDetailsStore();

  React.useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id, loadProduct]);

  if (!hasInitiallyLoaded) {
    return (
      <Loader
        className={classNames(
          styles.product__loader,
          styles['product__margin-top']
        )}
      />
    );
  }

  if (error) {
    return (
      <ErrorApiMessage
        error={error}
        className={styles['product__margin-top']}
      />
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className={styles.product__content}>
      <SwiperImages images={product?.images || []} />
      <ProductInfo product={product as ProductType} />
    </div>
  );
};

export default observer(ProductCard);
