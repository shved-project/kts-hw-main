import React from 'react';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Text from '@/components/Text';
import routerData from '@/config/routerData';
import { useRouter } from 'next/navigation';
import styles from './EmptyCart.module.scss';

const EmptyCart = () => {
  const router = useRouter();

  const handleGoToProducts = React.useCallback(() => {
    router.push(routerData.products.create());
  }, [router]);

  return (
    <section className={styles.cart}>
      <Container>
        <div className={styles.cartEmptyWrapper}>
          <div className={styles.cartEmptyText}>
            <Text view="title" tag="h1">
              Cart
            </Text>
            <Text view="p-20" color="secondary">
              Your cart is empty
            </Text>
          </div>
          <Button onClick={handleGoToProducts}>Go to Products</Button>
        </div>
      </Container>
    </section>
  );
};

export default EmptyCart;
