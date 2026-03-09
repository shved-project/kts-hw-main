import React from 'react';
import { useProductsStore } from '@/store/locals/products';
import styles from '../../../Products.module.scss';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Text from '@/components/Text';
import Loader from '@/components/Loader';
import { observer } from 'mobx-react-lite';

const ProductsList = () => {
  const { productsList, total, isAllLoadProducts, setupInfiniteScroll } =
    useProductsStore();

  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const cleanup = setupInfiniteScroll(loaderRef.current);

    return () => cleanup();
  }, [setupInfiniteScroll]);

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
            actionSlot={<Button>Add to cart</Button>}
            contentSlot={
              <Text weight="bold" view="p-18">
                ${product.price}
              </Text>
            }
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
