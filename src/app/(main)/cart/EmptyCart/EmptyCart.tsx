import React from 'react';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Text from '@/components/Text';
import routerData from '@/config/routerData';
import { useRouter } from 'next/navigation';
import styles from '../Cart.module.scss';

const EmptyCart = () => {
  const router = useRouter();

  const handleGoToProducts = React.useCallback(() => {
    router.push(routerData.products.create());
  }, [router]);

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
};

export default EmptyCart;
