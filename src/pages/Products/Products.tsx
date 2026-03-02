import * as React from 'react';
import qs from 'qs';
import { useSearchParams } from 'react-router';
import Container from 'components/Container';
import styles from './Products.module.scss';
import ProductsText from './components/ProductsText';
import ProductsList from './components/ProductsList';
import ProductsFilters from './components/ProductsFilters';
import {
  ProductsStoreProvider,
  ProductsStore,
} from 'store/locals/products';
import { useLocalStore } from 'store/hooks';

const QUERY_SEARCH = 'search';
const QUERY_CATEGORY = 'category';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productsStore = useLocalStore(() => new ProductsStore());

  React.useLayoutEffect(() => {
    const parsed = qs.parse(searchParams.toString()) as Record<
      string,
      string | undefined
    >;
    const urlSearch = parsed[QUERY_SEARCH] ?? '';
    const urlCategory = parsed[QUERY_CATEGORY]
      ? Number(parsed[QUERY_CATEGORY])
      : null;

    const { search, categoryId } = productsStore.filtersStore;
    if (search !== urlSearch || categoryId !== urlCategory) {
      productsStore.filtersStore.setSearch(urlSearch);
      productsStore.filtersStore.setCategoryId(urlCategory);
      productsStore.resetAndLoad();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync only when URL changes
  }, [searchParams]);

  return (
    <ProductsStoreProvider store={productsStore}>
      <section className={styles.products}>
        <Container>
          <ProductsText />
          <ProductsFilters />
          <ProductsList />
        </Container>
      </section>
    </ProductsStoreProvider>
  );
};

export default Products;
