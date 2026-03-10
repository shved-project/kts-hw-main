import Text from '@/components/Text';
import styles from '../../Products.module.scss';

const ProductsText = () => {
  return (
    <div className={styles.products__text}>
      <Text tag="h1" view="title">
        Products
      </Text>
      <Text view="p-20" color="secondary">
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </Text>
    </div>
  );
};

export default ProductsText;
