'use client';

import React from 'react';
import { useCartStore, useUserStore } from '@/store';
import { ProductType } from '@/api/req/products.api';
import Button from '@/components/Button';
import styles from './AddToCartButton.module.scss';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import routerData from '@/config/routerData';

type AddToCartButtonProps = {
  product: ProductType;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addItem, isInCart } = useCartStore();
  const inCart = isInCart(product.documentId);

  const router = useRouter();

  const handleAddToCart = React.useCallback(async () => {
    const { success, notAuthorized } = await addItem(product);

    if (!success && notAuthorized) {
      router.push(routerData.login.href);
    }
  }, [addItem, product, router]);

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
