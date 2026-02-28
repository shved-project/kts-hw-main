// import { getProducts, type ProductType } from 'api/products.api';
// import useResponse, { type effectFunctionType } from 'hooks/useResponse';
import styles from '../../Products.module.scss';
import Text from 'components/Text';
import Card from 'components/Card';
import Button from 'components/Button';
import { Form, useNavigate, useSearchParams } from 'react-router';
import routerData from 'config/routerData';
import Loader from 'components/Loader';
import ErrorApiMessage from 'components/ErrorApiMessage';
import productsStore from 'store/ProductsStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import Input from 'components/Input';

const ProductsList = observer(() => {
  const { productsList, total, error, isAllProducts, isLoading, loadProducts } =
    productsStore;

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [searchParams] = useSearchParams();
  const title = searchParams.get('title');

  useEffect(() => {
    loadProducts(title);

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
      <Form className={styles['products__query']}>
        <div className={styles['products__query-search']}>
          <Input
            className={styles['products__query-search-input']}
            placeholder="Search product"
            name="title"
          />
          <Button type="submit">Find now</Button>
        </div>
      </Form>
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
      {productsList.length === 0 && !isLoading && (
        <ErrorApiMessage error="Ничего не найдено" />
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
