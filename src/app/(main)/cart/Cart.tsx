'use client';

import * as React from 'react';
import styles from './Cart.module.scss';
import { useCartStore } from '@/store';
import Container from '@/components/Container';
import Text from '@/components/Text';
import { observer } from 'mobx-react-lite';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';

const Cart: React.FC = () => {
  const { items, totalCount, totalPrice } = useCartStore();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className={styles.cart}>
      <Container>
        <Text view="title" tag="h1" className={styles.cart__title}>
          Cart ({totalCount} items)
        </Text>
        <ul className={styles.cart__list}>
          {items.map((item) => (
            <CartItem item={item} key={item.product.id} />
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
