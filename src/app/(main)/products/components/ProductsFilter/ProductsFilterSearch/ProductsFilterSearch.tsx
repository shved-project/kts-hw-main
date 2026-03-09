import React from 'react';
import Input from '@/components/Input';
import { useProductsStore } from '@/store';
import styles from '../../../Products.module.scss';
import Button from '@/components/Button';
import { observer } from 'mobx-react-lite';

const ProductsFilterSearch = () => {
  const { setSearchParam, clearProductsList, loadProductsList } =
    useProductsStore();

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleClickButton = React.useCallback(() => {
    if (inputRef.current) {
      setSearchParam(inputRef.current?.value);
      clearProductsList();
      loadProductsList();
    }
  }, [setSearchParam, clearProductsList, loadProductsList]);

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
    <div className={styles['products__input-wrappper']}>
      <Input
        className={styles.products__input}
        placeholder="Search products..."
        ref={inputRef}
      />
      <Button onClick={handleClickButton}>Find now</Button>
    </div>
  );
};

export default observer(ProductsFilterSearch);
