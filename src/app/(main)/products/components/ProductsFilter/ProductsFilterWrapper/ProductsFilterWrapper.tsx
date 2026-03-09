import Input from '@/components/Input';
import styles from '../../../Products.module.scss';
import ProductsFilterSearch from '../ProductsFilterSearch';

const ProductsFilterWrapper = () => {
  return (
    <div className={styles.products__form}>
      <ProductsFilterSearch />
      <div className={styles['products__filter-wrapper']}>
        <div className={styles['products__filter-dropdown-wrapper']}>
          <Input
            value={''}
            placeholder={'Category...'}
            // afterSlot={<Image src={arrowDownIcon} alt="arrow down" />}
          />
          <div className={styles['products__filter-dropdown']}>
            <div className={styles['products__filter-dropdown-option']}>
              All categories
            </div>
            {/* {categories.map((cat) => ( */}
            <div className={styles['products__filter-dropdown-option']}>
              Заголовок
            </div>
            <div className={styles['products__filter-dropdown-option']}>
              Заголовок
            </div>
            <div className={styles['products__filter-dropdown-option']}>
              Заголовок
            </div>
            <div className={styles['products__filter-dropdown-option']}>
              Заголовок
            </div>
            {/* ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilterWrapper;
