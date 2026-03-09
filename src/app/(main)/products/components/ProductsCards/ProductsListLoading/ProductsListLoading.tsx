import Loader from '@/components/Loader';
import styles from '../../../Products.module.scss';

const ProductsListLoading = () => {
  return (
    <div className={styles['products__loader-wrapper']}>
      <Loader className={styles.products__loader} />
    </div>
  );
};

export default ProductsListLoading;
