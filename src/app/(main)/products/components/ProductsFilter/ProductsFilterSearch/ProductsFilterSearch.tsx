import React from 'react';
import Input from '@/components/Input';
import { useProductsStore } from '@/store';
import styles from './ProductsFilterSearch.module.scss';
import Button from '@/components/Button';
import { observer } from 'mobx-react-lite';
import { usePathname, useRouter } from 'next/navigation';
import { PRODUCTS_SEARCH, PRODUCTS_CATEGORY } from '@/config/queryParams';

const ProductsFilterSearch = () => {
  const {
    setSearchParam,
    clearProductsList,
    loadProductsList,
    currentCategoryId,
  } = useProductsStore();

  const pathName = usePathname();
  const router = useRouter();

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleClickButton = React.useCallback(() => {
    const searchValue = inputRef.current?.value ?? '';

    const queryParams = new URLSearchParams();

    if (searchValue) {
      queryParams.set(PRODUCTS_SEARCH, searchValue);
    } else {
      queryParams.delete(PRODUCTS_SEARCH);
    }

    if (currentCategoryId) {
      queryParams.set(PRODUCTS_CATEGORY, currentCategoryId);
    } else {
      queryParams.delete(PRODUCTS_CATEGORY);
    }

    router.replace(`${pathName}?${queryParams.toString()}`);

    if (inputRef.current) {
      setSearchParam(searchValue);
      clearProductsList();
      loadProductsList();
    }
  }, [
    setSearchParam,
    clearProductsList,
    loadProductsList,
    currentCategoryId,
    pathName,
    router,
  ]);

  React.useEffect(() => {
    const handleClickEnter = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleClickButton();
      }
    };

    document.addEventListener('keydown', handleClickEnter);

    return () => {
      document.removeEventListener('keydown', handleClickButton);
    };
  }, [handleClickButton, setSearchParam]);

  return (
    <div className={styles.inputWrapper}>
      <Input
        className={styles.input}
        placeholder="Search products..."
        ref={inputRef}
      />
      <Button onClick={handleClickButton}>Find now</Button>
    </div>
  );
};

export default observer(ProductsFilterSearch);
