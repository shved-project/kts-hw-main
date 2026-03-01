import styles from '../../Products.module.scss';
import Text from 'components/Text';
import Card from 'components/Card';
import Button from 'components/Button';
import { useNavigate, useSearchParams } from 'react-router';
import routerData from 'config/routerData';
import Loader from 'components/Loader';
import ErrorApiMessage from 'components/ErrorApiMessage';
import productsStore from 'store/ProductsStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';

const ProductsList = observer(() => {
  const { productsList, total, error, isAllProducts, loadProducts } =
    productsStore;

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title');

  useEffect(() => {
    if (title === '') {
      searchParams.delete('title');
      setSearchParams(searchParams);
    }
  }, [title, searchParams, setSearchParams]);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadProducts(title);
      }
    });

    if (loaderRef.current) {
      obs.observe(loaderRef.current);
    }

    return () => {
      obs.disconnect();
    };
  }, [loadProducts, title]);

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
    <>
      {productsList.length !== 0 && (
        <>
          <div className={styles['products__list-title']}>
            <Text tag="h2" view="title-h2">
              Total products
            </Text>
            <Text color="accent" weight="bold" view="p-20">
              {total}
            </Text>
          </div>
          <div className={styles.products__list}>
            {productsList.map((product) => {
              const productId = product.documentId;
              return (
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
                  onClick={() => handleClickCard(productId)}
                  key={product.id}
                />
              );
            })}
          </div>
        </>
      )}
      {!isAllProducts && (
        <div className={styles['products__loader-wrapper']} ref={loaderRef}>
          <Loader className={styles.products__loader} />
        </div>
      )}
    </>
  );
});

export default ProductsList;
