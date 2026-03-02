import * as React from 'react';
import styles from '../../Products.module.scss';
import Text from 'components/Text';
import Card from 'components/Card';
import Button from 'components/Button';
import { useNavigate } from 'react-router';
import routerData from 'config/routerData';
import Loader from 'components/Loader';
import ErrorApiMessage from 'components/ErrorApiMessage';
import { useProductsStore } from 'store/locals/products';
import { useCartStore } from 'store/root';
import { observer } from 'mobx-react-lite';
import type { ProductType } from 'api/products.api';

const ProductsList: React.FC = () => {
  const navigate = useNavigate();
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  const {
    productsList,
    total,
    error,
    // hasInitiallyLoaded,
    // isLoading,
    isAllProducts,
    loadProducts,
    setupInfiniteScroll,
  } = useProductsStore();
  const { addItem, isInCart } = useCartStore();

  React.useEffect(() => {
    loadProducts();
    const cleanup = setupInfiniteScroll(loaderRef.current);
    return () => cleanup();
  }, [loadProducts, setupInfiniteScroll]);

  const handleClickCard = React.useCallback(
    (id: string) => {
      navigate(routerData.product.create(id));
    },
    [navigate]
  );

  const handleClickButton = React.useCallback(
    (event: React.MouseEvent, product: ProductType) => {
      event.stopPropagation();
      addItem(product);
    },
    [addItem]
  );

  if (error) {
    return <ErrorApiMessage error={error} />;
  }

  // if (!hasInitiallyLoaded) {
  //   return (
  //     <div className={styles['products__loader-wrapper']}>
  //       <Loader className={styles.products__loader} />
  //     </div>
  //   );
  // }

  // if (productsList.length === 0 && !isLoading) {
  //   return (
  //     <div className={styles.products__empty}>
  //       <Text view="p-20" color="secondary">
  //         No products found. Try changing search or filter.
  //       </Text>
  //     </div>
  //   );
  // }

  return (
    <div>
      {total !== 0 && (
        <div className={styles['products__list-title']}>
          <Text tag="h2" view="title-h2">
            Total products
          </Text>
          <Text color="accent" weight="bold" view="p-20">
            {total}
          </Text>
        </div>
      )}
      <div className={styles.products__list}>
        {productsList.map((product) => (
          <Card
            className={styles.products__card}
            image={product.images[0].url}
            title={product.title}
            subtitle={product.description}
            captionSlot={product.productCategory.title}
            actionSlot={
              <Button
                onClick={(e) => handleClickButton(e, product)}
                disabled={isInCart(product.documentId)}
                className={
                  isInCart(product.documentId)
                    ? styles.products__button_in_cart
                    : undefined
                }
              >
                {isInCart(product.documentId) ? 'In Cart' : 'Add to Cart'}
              </Button>
            }
            contentSlot={
              <Text weight="bold" view="p-18">
                ${product.price}
              </Text>
            }
            onClick={() => handleClickCard(product.documentId)}
            key={product.id}
          />
        ))}
      </div>
      {!isAllProducts && (
        <div className={styles['products__loader-wrapper']} ref={loaderRef}>
          <Loader className={styles.products__loader} />
        </div>
      )}
    </div>
  );
};

export default observer(ProductsList);
