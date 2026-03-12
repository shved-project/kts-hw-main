'use client';

import React from 'react';
import { useCartStore } from '@/store';
import { ProductType } from '@/api/products.api';
import Button from '@/components/Button';
import styles from './AddToCartButton.module.scss';
import { observer } from 'mobx-react-lite';

type AddToCartButtonProps = {
  product: ProductType;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addItem, isInCart } = useCartStore();
  const inCart = isInCart(product.documentId);

  const handleAddToCart = React.useCallback(() => {
    addItem(product);
  }, [addItem, product]);

  return (
    <Button
      className={styles.buttonCart}
      onClick={handleAddToCart}
      disabled={inCart}
    >
      {inCart ? 'In Cart' : 'Add to Cart'}
    </Button>
  );
};

export default observer(AddToCartButton);
