// import { getProducts, type ProductType } from 'api/products.api';
// import useResponse, { type effectFunctionType } from 'hooks/useResponse';
import styles from '../../Products.module.scss';
import Text from 'components/Text';
import Card from 'components/Card';
import Button from 'components/Button';
import { useNavigate } from 'react-router';
import routerData from 'config/routerData';
import Loader from 'components/Loader';
import ErrorApiMessage from 'components/ErrorApiMessage';
import productsStore from 'store/ProductsStore/ProductsStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';

const ProductsList = observer(() => {
  const { productsList, total, error, isAllProducts } = productsStore;

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    productsStore.loadProducts();

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        productsStore.loadProducts();
      }
    });

    if (loaderRef.current) {
      obs.observe(loaderRef.current);
    }

    return () => {
      obs.disconnect();
    };
  }, []);

  const navigate = useNavigate();

  const handleClickCard = (id: string) => {
    navigate(routerData.product.create(id));
  };

  const handleClickButton = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if (error) {
    return <ErrorApiMessage error={error} />;
  }

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
              <Button onClick={handleClickButton}>Add to Cart</Button>
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
});

export default ProductsList;
