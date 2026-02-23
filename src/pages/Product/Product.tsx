import styles from './Product.module.scss';
import ButtonBack from 'components/ButtonBack';
import Container from 'components/Container';
import classNames from 'classnames';
import ProductCard from './components/ProductCard';

const Product = () => {
  return (
    <section
      className={classNames(styles.product, styles['product__margin-top'])}
    >
      <Container>
        <ButtonBack />
        <ProductCard />
      </Container>
    </section>
  );
};

export default Product;
