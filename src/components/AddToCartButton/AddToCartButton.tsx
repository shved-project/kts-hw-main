'use client';

import React from 'react';
import { useCartStore } from '@/store';
import { ProductType } from '@/api/req/products.api';
import Button from '@/components/Button';
import styles from './AddToCartButton.module.scss';
import { observer } from 'mobx-react-lite';

type AddToCartButtonProps = {
  product: ProductType;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addItem, removeOneItem, isInCart, items } = useCartStore();

  const inCart = isInCart(product.documentId);
  const quantity =
    items.find((item) => item.product.documentId === product.documentId)
      ?.quantity ?? 0;

  const handleAdd = React.useCallback(async () => {
    await addItem(product);
  }, [addItem, product]);

  const handleDecrease = React.useCallback(async () => {
    await removeOneItem(product.id);
  }, [removeOneItem, product.id]);

  if (inCart) {
    return (
      <div className={styles.quantityControl}>
        <button
          className={styles.quantityBtn}
          onClick={handleDecrease}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className={styles.quantity}>{quantity}</span>
        <button
          className={styles.quantityBtn}
          onClick={handleAdd}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <Button className={styles.buttonCart} onClick={handleAdd}>
      Add to Cart
    </Button>
  );
};

export default observer(AddToCartButton);
