import { useParams } from 'react-router';
import ProductInfo from '../ProductInfo';
import SwiperImages from '../SwiperImages';
import { type ProductType } from 'api/products.api';
import Loader from 'components/Loader';
import styles from '../../Product.module.scss';
import classNames from 'classnames';
import ErrorApiMessage from 'components/ErrorApiMessage';
import productDetailsStore from 'store/ProductDetailsStore';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const ProductCard = observer(() => {
  const { id } = useParams();

  const { isLoading, error, product, loadProduct } = productDetailsStore;

  useEffect(() => {
    loadProduct(id as string);
  }, [id, loadProduct]);

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

  return (
    <div className={styles.product__content}>
      <SwiperImages images={product?.images || []} />
      <ProductInfo product={product as ProductType} />
    </div>
  );
});

export default ProductCard;
