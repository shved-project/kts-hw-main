import { useParams } from 'react-router';
import ProductInfo from '../ProductInfo';
import SwiperImages from '../SwiperImages';
import { getProduct, type ProductType } from 'api/products.api';
import type { effectFunctionType } from 'hooks/useResponse';
import axios from 'axios';
import useResponse from 'hooks/useResponse';
import Loader from 'components/Loader';
import styles from '../../Product.module.scss';
import classNames from 'classnames';
import ErrorApiMessage from 'components/ErrorApiMessage';

const ProductCard = () => {
  const { id } = useParams();

  const responseEffect: effectFunctionType<ProductType | null, string> = async (
    setState,
    setIsLoading,
    setError
  ) => {
    if (id) {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getProduct(id);

        setState(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setError('Товар не найден');
          } else {
            setError('Не удалось загрузить товар. Попробуйте позже');
          }
        } else {
          setError('Произошла неизвестная ошибка. Попробуйте позже');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const { state, isLoading, error } = useResponse(null, responseEffect);

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
      <SwiperImages images={state?.images || []} />
      <ProductInfo product={state as ProductType} />
    </div>
  );
};

export default ProductCard;
