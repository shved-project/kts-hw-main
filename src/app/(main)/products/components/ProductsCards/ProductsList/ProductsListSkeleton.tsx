'use client';

import Skeleton from 'react-loading-skeleton';
import CardSkeleton from '@/components/Card/CardSkeleton';
import styles from './ProductsList.module.scss';

type ProductsListSkeletonProps = {
  count: number;
  showTitle?: boolean;
};

const ProductsListSkeleton: React.FC<ProductsListSkeletonProps> = ({
  count,
  showTitle = false,
}) => {
  return (
    <>
      {showTitle && (
        <div className={styles.listTitle}>
          <Skeleton width={160} height={28} />
          <Skeleton width={32} height={22} />
        </div>
      )}
      <div className={styles.list}>
        {Array.from({ length: count }, (_, i) => (
          <CardSkeleton key={i} className={styles.card} />
        ))}
      </div>
    </>
  );
};

export default ProductsListSkeleton;
