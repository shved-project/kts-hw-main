import * as React from 'react';
import { useSearchParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import Input from 'components/Input';
import styles from '../../Products.module.scss';
import Button from 'components/Button';
import { useProductsStore } from 'store/locals/products';
import classNames from 'classnames';
import arrowDownIcon from 'assets/icons/arrow-down.svg';

const ProductsFilters: React.FC = () => {
  const multiDropdownRef = React.useRef<HTMLDivElement>(null);

  const [, setSearchParams] = useSearchParams();
  const {
    filtersStore: {
      search,
      categories,
      isDropdownOpen,
      setIsDropdownOpen,
      currentCategoryTitle,
      setCurrentCategoryTitle,
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
  React.useEffect(() => {
    const handleClickDocument = (event: MouseEvent) => {
      if (
        multiDropdownRef.current &&
        !multiDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickDocument);

    return () => {
      document.removeEventListener('click', handleClickDocument);
    };
  }, []);

  const handleCategoryChange = React.useCallback(
    (id: number | null) => {
      applyCategory(id);
      syncUrl();
    },
    [applyCategory, syncUrl]
  );

  const handleFindNow = React.useCallback(() => {
    applySearch();
    syncUrl();
  }, [applySearch, syncUrl]);

  const handleOpenDropdown = React.useCallback(() => {
    setIsDropdownOpen(true);
  }, [setIsDropdownOpen]);

  const handleClickOption = React.useCallback(
    (id: number | null, title: string) => {
      handleCategoryChange(id);
      setCurrentCategoryTitle(title);
      setIsDropdownOpen(false);
    },
    [handleCategoryChange, setIsDropdownOpen, setCurrentCategoryTitle]
  );

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
        <div
          className={styles['products__filter-dropdown-wrapper']}
          ref={multiDropdownRef}
        >
          <Input
            value={''}
            onClick={handleOpenDropdown}
            placeholder={currentCategoryTitle}
            afterSlot={<img src={arrowDownIcon} alt="arrow down" />}
          />
          <div
            className={classNames(styles['products__filter-dropdown'], {
              [styles['products__filter-dropdown--open']]: isDropdownOpen,
            })}
          >
            <div
              className={styles['products__filter-dropdown-option']}
              onClick={() => handleClickOption(null, 'All categories')}
            >
              All categories
            </div>
            {categories.map((cat) => (
              <div
                className={styles['products__filter-dropdown-option']}
                key={cat.id}
                onClick={() => handleClickOption(+cat.id, cat.title)}
              >
                {cat.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ProductsFilters);
