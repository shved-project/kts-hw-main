import * as React from 'react';
import { useSearchParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import Input from 'components/Input';
import styles from '../../Products.module.scss';
import Button from 'components/Button';
import { useProductsStore } from 'store/locals/products';

const ProductsFilters: React.FC = () => {
  const [, setSearchParams] = useSearchParams();
  const {
    filtersStore: {
      search,
      categoryId,
      categories,
      setSearchAndApply,
      applySearch,
      applyCategory,
      loadCategories,
      getQueryParams,
      cancelDebouncedApply,
      setSyncUrlCallback,
    },
  } = useProductsStore();

  const syncUrl = React.useCallback(() => {
    setSearchParams(getQueryParams(), { replace: true });
  }, [setSearchParams, getQueryParams]);

  React.useEffect(() => {
    loadCategories();
    setSyncUrlCallback(syncUrl);
    return () => {
      setSyncUrlCallback(null);
      cancelDebouncedApply();
    };
  }, [loadCategories, setSyncUrlCallback, syncUrl, cancelDebouncedApply]);

  const handleCategoryChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const id = e.target.value ? Number(e.target.value) : null;
      applyCategory(id);
      syncUrl();
    },
    [applyCategory, syncUrl]
  );

  const handleFindNow = React.useCallback(() => {
    applySearch();
    syncUrl();
  }, [applySearch, syncUrl]);

  return (
    <div className={styles.products__form}>
      <div className={styles['products__input-wrappper']}>
        <Input
          className={styles.products__input}
          placeholder="Search products..."
          value={search}
          onChange={setSearchAndApply}
        />
        <Button onClick={handleFindNow}>Find now</Button>
      </div>
      <div className={styles['products__filter-wrapper']}>
        <label htmlFor="category-filter" className={styles.products__filter_label}>
          Category:
        </label>
        <select
          id="category-filter"
          className={styles.products__filter_select}
          onChange={handleCategoryChange}
          value={categoryId ?? ''}
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default observer(ProductsFilters);
