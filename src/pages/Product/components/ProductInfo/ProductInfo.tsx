import React from 'react';
import type { ProductType } from 'api/products.api';
import Text from 'components/Text';
import styles from '../../Product.module.scss';
import Button from 'components/Button';

type ProductInfoProps = {
  product: ProductType;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className={styles.product__info}>
      <div className={styles['product__info-text']}>
        <Text view="title" tag="h1" className={styles['product__info-title']}>
          {product?.title}
        </Text>
        <Text view="p-20" color="secondary">
          {product?.description}
        </Text>
      </div>
      <Text view="title" className={styles['product__info-price']}>
        ${product?.price}
      </Text>
      <div className={styles['product__info-buttons']}>
        <Button>Buy Now</Button>
        <Button className={styles['product__info-button-cart']}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ProductInfo);
