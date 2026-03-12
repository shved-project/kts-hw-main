import styles from './ProductsFilterWrapper.module.scss';
import ProductsFilterSearch from '../ProductsFilterSearch';
import ProductsFilterCategory from '../ProductsFilterCategory';

const ProductsFilterWrapper = () => {
  return (
    <div className={styles.form}>
      <ProductsFilterSearch />
      <ProductsFilterCategory />
    </div>
  );
};

export default ProductsFilterWrapper;
