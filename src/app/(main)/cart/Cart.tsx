'use client';

import * as React from 'react';
import styles from './Cart.module.scss';
import { useCartStore, useUserStore, useToastStore } from '@/store';
import Container from '@/components/Container';
import Text from '@/components/Text';
import Button from '@/components/Button';
import { observer } from 'mobx-react-lite';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import { CheckoutModal } from './CheckoutModal';
import { useRouter } from 'next/navigation';
import routerData from '@/config/routerData';

const Cart: React.FC = () => {
  const { items, totalCount, totalPrice, clear } = useCartStore();
  const { user } = useUserStore();
  const { show } = useToastStore();
  const router = useRouter();

  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  const handleCheckout = React.useCallback(() => {
    if (!user) {
      show('Please log in to place an order', 'error');
      router.push(routerData.login.href);
      return;
    }
    setIsCheckoutOpen(true);
  }, [user, show, router]);

  const handleCheckoutSuccess = React.useCallback(() => {
    setIsCheckoutOpen(false);
    clear();
    show('Order placed successfully!', 'success');
  }, [clear, show]);

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
          <Button className={styles.cart__checkoutBtn} onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </Container>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />
    </section>
  );
};

export default observer(Cart);
