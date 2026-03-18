import Button from '@/components/Button';
import styles from './ProductsFilterClear.module.scss';
import { useProductsStore } from '@/store';
import { usePathname, useRouter } from 'next/navigation';

const ProductsFilterClear = () => {
  const { clearFiltersAndReload } = useProductsStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    clearFiltersAndReload();
    router.push(pathname);
  };

  return (
    <Button className={styles.button} onClick={handleClick}>
      Clear filters
    </Button>
  );
};

export default ProductsFilterClear;
