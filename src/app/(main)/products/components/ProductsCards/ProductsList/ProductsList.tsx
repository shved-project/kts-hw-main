import React from 'react';
import { useProductsStore } from '@/store/locals/products';
import styles from '../../../Products.module.scss';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Text from '@/components/Text';
import Loader from '@/components/Loader';
import { observer } from 'mobx-react-lite';
import { useCartStore } from '@/store';
import { ProductType } from '@/api/products.api';
import { useRouter } from 'next/navigation';
import routerData from '@/config/routerData';

const ProductsList = () => {
  const { productsList, total, isAllLoadProducts, setupInfiniteScroll } =
    useProductsStore();
  const { addItem, isInCart } = useCartStore();

  const router = useRouter();

  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const cleanup = setupInfiniteScroll(loaderRef.current);

    return () => cleanup();
  }, [setupInfiniteScroll]);

  const handleClickCard = React.useCallback(
    (id: string) => {
      router.push(routerData.product.create(id));
    },
    [router]
  );

  const handleClickButton = React.useCallback(
    (event: React.MouseEvent, product: ProductType) => {
      event.stopPropagation();
      addItem(product);
    },
    [addItem]
  );

  return (
    <>
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
                Add to cart
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
      {!isAllLoadProducts && (
        <div className={styles['products__loader-wrapper']} ref={loaderRef}>
          <Loader className={styles.products__loader} />
        </div>
      )}
    </>
  );
};

export default observer(ProductsList);
