import React from 'react';
import { useParams } from 'react-router';
import ProductInfo from '../ProductInfo';
import SwiperImages from '../SwiperImages';
import { type ProductType } from 'api/products.api';
import Loader from 'components/Loader';
import styles from '../../Product.module.scss';
import classNames from 'classnames';
import ErrorApiMessage from 'components/ErrorApiMessage';
import productDetailsStore from 'store/ProductDetailsStore';
import { observer } from 'mobx-react-lite';

const ProductCard = observer(() => {
  const { id } = useParams();

  React.useEffect(() => {
    productDetailsStore.loadProduct(id as string);
  }, [id]);

  const { isLoading, error, product } = productDetailsStore;

  if (isLoading) {
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
});

export default ProductCard;
