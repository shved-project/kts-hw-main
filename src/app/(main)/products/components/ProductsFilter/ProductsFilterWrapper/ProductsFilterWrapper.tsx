import styles from './ProductsFilterWrapper.module.scss';
import ProductsFilterSearch from '../ProductsFilterSearch';
import ProductsFilterCategory from '../ProductsFilterCategory';
import ProductsFilterClear from '../ProductsFilterClear';

const ProductsFilterWrapper = () => {
  return (
    <div className={styles.form}>
      <ProductsFilterSearch />
      <ProductsFilterCategory />
      <ProductsFilterClear />
    </div>
  );
};

export default ProductsFilterWrapper;
