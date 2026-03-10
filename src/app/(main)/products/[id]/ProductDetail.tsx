import { getProduct, ProductType } from '@/api/products.api';
import Container from '@/components/Container';
import ErrorApiMessage from '@/components/ErrorApiMessage';
import styles from './ProductDetail.module.scss';
import ButtonBack from '@/components/ButtonBack';
import SwiperImages from './components/SwiperImages';
import ProductInfo from './components/ProductInfo/ProductInfo';

type ProductDetailProps = {
  productId: string;
};

const ProductDetail: React.FC<ProductDetailProps> = async ({ productId }) => {
  let product: ProductType | null = null;
  let errorMessage: string | null = null;

  try {
    const res = await getProduct(productId);

    product = res;
  } catch (error) {
    if (error instanceof Error) {
      errorMessage = (error as Error).message;
    } else {
      errorMessage = 'Неизвестная ошибка';
    }
  }

  if (errorMessage) {
    return (
      <ErrorApiMessage className={styles.product__error} error={errorMessage} />
    );
  }

  return (
    <section className={styles.product}>
      <Container>
        <ButtonBack />
        <div className={styles.product__content}>
          <SwiperImages images={product?.images || []} />
          <ProductInfo product={product as ProductType} />
        </div>
      </Container>
    </section>
  );
};

export default ProductDetail;
