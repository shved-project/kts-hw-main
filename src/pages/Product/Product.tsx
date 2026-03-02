import { useParams } from 'react-router';
import styles from './Product.module.scss';
import ButtonBack from 'components/ButtonBack';
import Container from 'components/Container';
import classNames from 'classnames';
import ProductCard from './components/ProductCard';
import {
  ProductDetailsStoreProvider,
  ProductDetailsStore,
} from 'store/locals/product-details';
import { useLocalStore } from 'store/hooks';

const Product = () => {
  const { id } = useParams();
  const store = useLocalStore(() => new ProductDetailsStore(), [id]);

  return (
    <ProductDetailsStoreProvider store={store}>
      <section
        className={classNames(styles.product, styles['product__margin-top'])}
      >
        <Container>
          <ButtonBack />
          <ProductCard />
        </Container>
      </section>
    </ProductDetailsStoreProvider>
  );
};

export default Product;
