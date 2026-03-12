import React from 'react';
import { CartItemType, useCartStore } from '@/store';
import styles from './CartItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import routerData from '@/config/routerData';
import Text from '@/components/Text';

type CartItemProps = {
  item: CartItemType;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCartStore();

  const handleDecrease = React.useCallback(() => {
    decreaseQuantity(item.product.documentId);
  }, [decreaseQuantity, item.product.documentId]);

  const handleIncrease = React.useCallback(() => {
    increaseQuantity(item.product.documentId);
  }, [increaseQuantity, item.product.documentId]);

  const handleRemove = React.useCallback(() => {
    removeItem(item.product.documentId);
  }, [removeItem, item.product.documentId]);

  return (
    <li key={item.product.documentId} className={styles.item}>
      <div className={styles.itemImage}>
        <Image
          src={item.product.images[0]?.url}
          alt={item.product.title}
          width={80}
          height={80}
        />
      </div>
      <div className={styles.itemInfo}>
        <Link
          href={routerData.product.create(item.product.documentId)}
          className={styles.itemTitle}
        >
          <Text tag="h3" view="p-20" weight="medium">
            {item.product.title}
          </Text>
        </Link>
        <Text view="p-16" color="secondary">
          ${item.product.price} × {item.quantity}
        </Text>
      </div>
      <div className={styles.itemActions}>
        <button
          type="button"
          className={styles.itemBtn}
          onClick={handleDecrease}
        >
          −
        </button>
        <span className={styles.itemQty}>{item.quantity}</span>
        <button
          type="button"
          className={styles.itemBtn}
          onClick={handleIncrease}
        >
          +
        </button>
        <button
          type="button"
          className={styles.itemRemove}
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;
