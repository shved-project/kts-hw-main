import React from 'react';
import Input from '@/components/Input';
import styles from './ProductsFilterCategory.module.scss';
import Image from 'next/image';
import arrowDownIcon from '@/assets/icons/arrow-down.svg';
import { useProductsStore } from '@/store';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import ProductsFilterCategoryItem from '../ProductsFilterCategoryItem';

const ProductsFilterCategory = () => {
  const {
    loadCategories,
    categories,
    currentCategoryId,
    setCurrentCategoryId,
    setOpenCategoriesDropdown,
    isOpenCategoriesDropdown,
  } = useProductsStore();

  const currentCategoryTitle = React.useMemo(
    () =>
      categories.find((category) => category.id === Number(currentCategoryId))
        ?.title,
    [categories, currentCategoryId]
  );

  const multiDropdownRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  React.useEffect(() => {
    const handleClickDocument = (event: MouseEvent) => {
      if (
        multiDropdownRef.current &&
        !multiDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenCategoriesDropdown(false);
      }
    };

    document.addEventListener('click', handleClickDocument);

    return () => {
      document.removeEventListener('click', handleClickDocument);
    };
  }, [setOpenCategoriesDropdown]);

  const handleClickInput = React.useCallback(() => {
    setOpenCategoriesDropdown(!isOpenCategoriesDropdown);
  }, [setOpenCategoriesDropdown, isOpenCategoriesDropdown]);

  const handleClickOption = React.useCallback(
    (categoryId: string) => {
      setCurrentCategoryId(categoryId);
    },
    [setCurrentCategoryId]
  );

  const handleClickAllProducts = React.useCallback(() => {
    setCurrentCategoryId(null);
  }, [setCurrentCategoryId]);

  return (
    <div
      className={styles.dropdownWrapper}
      ref={multiDropdownRef}
    >
      <Input
        value={currentCategoryTitle ? currentCategoryTitle : 'All categories'}
        afterSlot={<Image src={arrowDownIcon} alt="" aria-hidden="true" />}
        onClick={handleClickInput}
        role="combobox"
        aria-expanded={isOpenCategoriesDropdown}
        aria-controls="categories-dropdown"
        aria-haspopup="listbox"
      />
      <div
        className={classNames(styles.dropdown, {
          [styles['dropdown--open']]: isOpenCategoriesDropdown,
        })}
        id="categories-dropdown"
        role="listbox"
      >
        <ProductsFilterCategoryItem
          title="All categories"
          isCurrentCategory={currentCategoryId === null}
          onClick={handleClickAllProducts}
        />
        {categories.map((cat) => (
          <ProductsFilterCategoryItem
            key={cat.id}
            title={cat.title}
            isCurrentCategory={cat.id === Number(currentCategoryId)}
            onClick={() => handleClickOption(cat.id.toString())}
          />
        ))}
      </div>
    </div>
  );
};

export default observer(ProductsFilterCategory);
