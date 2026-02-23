import { getProduct, type ProductType } from 'api/products.api';
import axios from 'axios';
import type { effectFunctionType } from 'hooks/useResponse';
import useResponse from 'hooks/useResponse';
import { useParams } from 'react-router';
import styles from './Product.module.scss';
import ButtonBack from 'components/ButtonBack';
import Container from 'components/Container';
import classNames from 'classnames';
import SwiperImages from './components/SwiperImages';
import ProductInfo from './components/ProductInfo';

const Product = () => {
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
    return <div className={styles['product__margin-top']}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles['product__margin-top']}>{error}</div>;
  }

  return (
    <section
      className={classNames(styles.product, styles['product__margin-top'])}
    >
      <Container>
        <ButtonBack />
        <div className={styles.product__content}>
          <SwiperImages images={state?.images || []} />
          <ProductInfo product={state as ProductType} />
        </div>
      </Container>
    </section>
  );
};

export default Product;
