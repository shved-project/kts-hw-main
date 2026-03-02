import Container from 'components/Container';
import styles from './Products.module.scss';
import ProductsText from './components/ProductsText';
import ProductsList from './components/ProductsList';

const Products = () => {
  return (
    <section className={styles.products}>
      <Container>
        <ProductsText />
        <ProductsList />
      </Container>
    </section>
  );
};

export default Products;
