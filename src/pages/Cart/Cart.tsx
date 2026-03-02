import * as React from 'react';
import Container from 'components/Container';
import Text from 'components/Text';
import Button from 'components/Button';
import { useCartStore } from 'store/root';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import routerData from 'config/routerData';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    totalCount,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCartStore();

  const handleGoToProducts = React.useCallback(() => {
    navigate(routerData.products.create());
  }, [navigate]);

  const handleGoToProduct = React.useCallback(
    (documentId: string) => {
      navigate(routerData.product.create(documentId));
    },
    [navigate]
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
          <Button
            className={styles.cart__back}
            onClick={handleGoToProducts}
          >
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
                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.title}
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
