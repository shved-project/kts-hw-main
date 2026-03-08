import Container from '@/components/Container';
import styles from './Products.module.scss';
import ProductsText from './components/ProductsText';
import ProductsClient from './components/ProductsClient';

const Products = () => {
  return (
    <section className={styles.products}>
      <Container>
        <ProductsText />
        <ProductsClient />
      </Container>
    </section>
  );
};

export default Products;
