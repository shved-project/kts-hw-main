import { getProducts, type ProductType } from 'api/products.api';
import useResponse from 'hooks/useResponse';

type ProductsState = {
  items: ProductType[];
  total: number;
};

const Products = () => {
  const { state, isLoading, error } = useResponse<ProductsState, string>(
    {
      items: [],
      total: 0,
    },
    (setState, setIsLoading, setError) => {
      const fetch = async () => {
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

      fetch();
    }
  );

  console.log(state);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <h1>Products page</h1>;
};

export default Products;
