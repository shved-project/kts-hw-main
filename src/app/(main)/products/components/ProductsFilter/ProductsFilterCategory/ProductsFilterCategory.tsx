import React from 'react';
import Input from '@/components/Input';
import styles from '../../../Products.module.scss';
import Image from 'next/image';
import arrowDownIcon from '@/assets/icons/arrow-down.svg';
import { useProductsStore } from '@/store';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

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

  const handleClickAllProducts = () => {
    setCurrentCategoryId(null);
  };

  return (
    <div
      className={styles['products__category-dropdown-wrapper']}
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
        className={classNames(styles['products__category-dropdown'], {
          [styles['products__category-dropdown--open']]:
            isOpenCategoriesDropdown,
        })}
        id="categories-dropdown"
        role="listbox"
      >
        <div
          className={classNames(styles['products__category-dropdown-option'], {
            [styles['products__category-dropdown-option--selected']]:
              currentCategoryId === null,
          })}
          onClick={handleClickAllProducts}
          role="option"
          aria-selected={currentCategoryId === null}
        >
          All categories
        </div>
        {categories.map((cat) => {
          const isCurrentCategory = cat.id === Number(currentCategoryId);

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
              onClick={() => handleClickOption(cat.id.toString())}
              role="option"
              aria-selected={isCurrentCategory}
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
