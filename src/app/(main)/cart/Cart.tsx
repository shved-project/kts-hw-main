'use client';

import * as React from 'react';
import styles from './Cart.module.scss';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store';
import routerData from '@/config/routerData';
import Container from '@/components/Container';
import Text from '@/components/Text';
import Button from '@/components/Button';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';

const Cart: React.FC = () => {
  const router = useRouter();
  const {
    items,
    totalCount,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCartStore();

  const handleGoToProducts = React.useCallback(() => {
    router.push(routerData.products.create());
  }, [router]);

  const handleGoToProduct = React.useCallback(
    (documentId: string) => {
      router.push(routerData.product.create(documentId));
    },
    [router]
  );

  if (items.length === 0) {
    return (
      <section className={styles.cart}>
        <Container>
          <Text view="title" tag="h1" className={styles.cart__title}>
            Cart
          </Text>
          <Text view="p-20" color="secondary">
            Your cart is empty
          </Text>
          <Button className={styles.cart__back} onClick={handleGoToProducts}>
            Go to Products
          </Button>
        </Container>
      </section>
    );
  }

  return (
    <section className={styles.cart}>
      <Container>
        <Text view="title" tag="h1" className={styles.cart__title}>
          Cart ({totalCount} items)
        </Text>
        <ul className={styles.cart__list}>
          {items.map((item) => (
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
                <button
                  type="button"
                  className={styles.cart__item_title}
                  onClick={() => handleGoToProduct(item.product.documentId)}
                >
                  <Text tag="h3" view="p-20" weight="medium">
                    {item.product.title}
                  </Text>
                </button>
                <Text view="p-16" color="secondary">
                  ${item.product.price} × {item.quantity}
                </Text>
              </div>
              <div className={styles.cart__item_actions}>
                <button
                  type="button"
                  className={styles.cart__item_btn}
                  onClick={() => decreaseQuantity(item.product.documentId)}
                >
                  −
                </button>
                <span className={styles.cart__item_qty}>{item.quantity}</span>
                <button
                  type="button"
                  className={styles.cart__item_btn}
                  onClick={() => increaseQuantity(item.product.documentId)}
                >
                  +
                </button>
                <button
                  type="button"
                  className={styles.cart__item_remove}
                  onClick={() => removeItem(item.product.documentId)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.cart__footer}>
          <Text view="title-h2" weight="bold">
            Total: ${totalPrice}
          </Text>
        </div>
      </Container>
    </section>
  );
};

export default observer(Cart);
