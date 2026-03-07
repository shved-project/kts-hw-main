import Container from '@/components/Container';
import styles from './Products.module.scss';
import ProductsText from './components/ProductsText';

const Products = () => {
  return (
    <section className={styles.products}>
      <Container>
        <ProductsText />
      </Container>
    </section>
  );
};

export default Products;
