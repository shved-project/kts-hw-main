import Container from 'components/Container';
import styles from './Products.module.scss';
import ProductsText from './components/ProductsText';
import ProductsList from './components/ProductsList';
import ProductsForm from './components/ProductsForm';

const Products = () => {
  return (
    <section className={styles.products}>
      <Container>
        <ProductsText />
        <ProductsForm />
        <ProductsList />
      </Container>
    </section>
  );
};

export default Products;
