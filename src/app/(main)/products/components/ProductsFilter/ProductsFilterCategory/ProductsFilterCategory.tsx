import React from 'react';
import Input from '@/components/Input';
import styles from '../../../Products.module.scss';
import Image from 'next/image';
import arrowDownIcon from '@/assets/icons/arrow-down.svg';
import { useProductsStore } from '@/store';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { ProductCategoryType } from '@/api/products.api';

const ProductsFilterCategory = () => {
  const {
    loadCategories,
    categories,
    currentCategory,
    setCurrentCategory,
    setOpenCategoriesDropdown,
    isOpenCategoriesDropdown,
  } = useProductsStore();

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
    (category: ProductCategoryType) => {
      setCurrentCategory(category);
    },
    [setCurrentCategory]
  );

  const handleClickAllProducts = () => {
    setCurrentCategory(null);
  };

  return (
    <div
      className={styles['products__category-dropdown-wrapper']}
      ref={multiDropdownRef}
    >
      <Input
        value={currentCategory ? currentCategory.title : 'All categories'}
        afterSlot={<Image src={arrowDownIcon} alt="arrow down" />}
        onClick={handleClickInput}
      />
      <div
        className={classNames(styles['products__category-dropdown'], {
          [styles['products__category-dropdown--open']]:
            isOpenCategoriesDropdown,
        })}
      >
        <div
          className={classNames(styles['products__category-dropdown-option'], {
            [styles['products__category-dropdown-option--selected']]:
              currentCategory === null,
          })}
          onClick={handleClickAllProducts}
        >
          All categories
        </div>
        {categories.map((cat) => {
          const isCurrentCategory = cat.id === currentCategory?.id;

          return (
            <div
              key={cat.id}
              className={classNames(
                styles['products__category-dropdown-option'],
                {
                  [styles['products__category-dropdown-option--selected']]:
                    isCurrentCategory,
                }
              )}
              onClick={() => handleClickOption(cat)}
            >
              {cat.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default observer(ProductsFilterCategory);
