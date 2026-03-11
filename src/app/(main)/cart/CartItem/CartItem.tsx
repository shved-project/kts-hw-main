import React from 'react';
import { CartItemType, useCartStore } from '@/store';
import styles from '../Cart.module.scss';
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
    <li key={item.product.documentId} className={styles.cart__item}>
      <div className={styles.cart__item_image}>
        <Image
          src={item.product.images[0]?.url}
          alt={item.product.title}
          width={80}
          height={80}
        />
      </div>
      <div className={styles.cart__item_info}>
        <Link
          href={routerData.product.create(item.product.documentId)}
          className={styles.cart__item_title}
        >
          <Text tag="h3" view="p-20" weight="medium">
            {item.product.title}
          </Text>
        </Link>
        <Text view="p-16" color="secondary">
          ${item.product.price} × {item.quantity}
        </Text>
      </div>
      <div className={styles.cart__item_actions}>
        <button
          type="button"
          className={styles.cart__item_btn}
          onClick={handleDecrease}
        >
          −
        </button>
        <span className={styles.cart__item_qty}>{item.quantity}</span>
        <button
          type="button"
          className={styles.cart__item_btn}
          onClick={handleIncrease}
        >
          +
        </button>
        <button
          type="button"
          className={styles.cart__item_remove}
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;
