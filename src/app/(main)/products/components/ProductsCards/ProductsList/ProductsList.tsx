import React from 'react';
import { useProductsStore } from '@/store/locals/products';
import styles from './ProductsList.module.scss';
import Card from '@/components/Card';
import Text from '@/components/Text';
import ProductsListSkeleton from './ProductsListSkeleton';
import { observer } from 'mobx-react-lite';
import { PAGE_SIZE } from '@/api/req/products.api';
import { useRouter } from 'next/navigation';
import routerData from '@/config/routerData';
import AddToCartButton from '@/components/AddToCartButton';

const ProductsList = () => {
  const { productsList, total, isAllLoadProducts, setupInfiniteScroll } =
    useProductsStore();

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

  return (
    <>
      {total !== 0 && (
        <div className={styles.listTitle}>
          <Text tag="h2" view="title-h2">
            Total products
          </Text>
          <Text color="accent" weight="bold" view="p-20">
            {total}
          </Text>
        </div>
      )}
      <div className={styles.list}>
        {productsList.map((product) => (
          <Card
            className={styles.card}
            image={product.images[0].url}
            title={product.title}
            subtitle={product.description}
            captionSlot={product.productCategory.title}
            actionSlot={
              <div onClick={(e) => e.stopPropagation()}>
                <AddToCartButton product={product} />
              </div>
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
        <div ref={loaderRef}>
          <ProductsListSkeleton
            count={Math.min(PAGE_SIZE, total - productsList.length)}
          />
        </div>
      )}
    </>
  );
};

export default observer(ProductsList);
