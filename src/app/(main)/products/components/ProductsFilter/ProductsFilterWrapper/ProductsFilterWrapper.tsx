import styles from '../../../Products.module.scss';
import ProductsFilterSearch from '../ProductsFilterSearch';
import ProductsFilterCategory from '../ProductsFilterCategory';

const ProductsFilterWrapper = () => {
  return (
    <div className={styles.products__form}>
      <ProductsFilterSearch />
      <ProductsFilterCategory />
    </div>
  );
};

export default ProductsFilterWrapper;
