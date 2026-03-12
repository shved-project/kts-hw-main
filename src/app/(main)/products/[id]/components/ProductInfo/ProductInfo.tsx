import * as React from 'react';
import type { ProductType } from '@/api/products.api';
import Text from '@/components/Text';
import styles from './ProductInfo.module.scss';
import Button from '@/components/Button';
import AddToCartButton from '../AddToCartButton';

type ProductInfoProps = {
  product: ProductType;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className={styles.info}>
      <div className={styles.infoText}>
        <Text view="title" tag="h1" className={styles.infoTitle}>
          {product?.title}
        </Text>
        <Text view="p-20" color="secondary">
          {product?.description}
        </Text>
      </div>
      <Text view="title" className={styles.infoPrice}>
        ${product?.price}
      </Text>
      <div className={styles.infoButtons}>
        <Button>Buy Now</Button>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductInfo;
