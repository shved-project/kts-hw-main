import { getProducts, type ProductType } from 'api/products.api';
import useResponse, { type effectFunctionType } from 'hooks/useResponse';
import styles from '../../Products.module.scss';
import Text from 'components/Text';
import Card from 'components/Card';
import Button from 'components/Button';
import { useNavigate } from 'react-router';
import routerData from 'config/routerData';
import Loader from 'components/Loader';
import errorIcon from 'assets/icons/error.svg';

type ProductsState = {
  items: ProductType[];
  total: number;
};

const ProductsList = () => {
  const navigate = useNavigate();

  const handleClickCard = (id: number) => {
    navigate(routerData.product.create(id));
  };

  const handleClickButton = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const responseEffect: effectFunctionType<ProductsState, string> = async (
    setState,
    setIsLoading,
    setError
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getProducts();

      setState({
        items: response.data,
        total: response.meta.pagination.total,
      });
    } catch {
      setError('Не удалось загрузить товары. Попробуйте позже');
    } finally {
      setIsLoading(false);
    }
  };

  const { state, isLoading, error } = useResponse(
    {
      items: [],
      total: 0,
    },
    responseEffect
  );

  if (isLoading) {
    return <Loader className={styles.products__loader} />;
  }

  if (error) {
    return (
      <div className={styles.products__error}>
        <img src={errorIcon} alt="error" />
        <Text view="p-20" tag="h1" weight="semiBold">
          {error}
        </Text>
      </div>
    );
  }

  return (
    <div>
      <div className={styles['products__list-title']}>
        <Text tag="h2" view="title-h2">
          Total products
        </Text>
        <Text color="accent" weight="bold" view="p-20">
          {state.total}
        </Text>
      </div>
      <div className={styles.products__list}>
        {state.items.map((product) => (
          <Card
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
            onClick={() => handleClickCard(product.id)}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
