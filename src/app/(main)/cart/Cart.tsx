'use client';

import * as React from 'react';
import styles from './Cart.module.scss';
import { useCartStore, useToastStore, useUserStore } from '@/store';
import Container from '@/components/Container';
import Text from '@/components/Text';
import { observer } from 'mobx-react-lite';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import { useRouter } from 'next/navigation';
import routerData from '@/config/routerData';

const Cart: React.FC = () => {
  const { items, totalCount, totalPrice } = useCartStore();
  const { user, initLoading } = useUserStore();
  const { show } = useToastStore();

  const router = useRouter();

  React.useEffect(() => {
    if (!user && !initLoading) {
      show('You need to log in to view the cart page', 'error');
      router.push(routerData.login.href);
    }
  }, [router, user, show, initLoading]);

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
