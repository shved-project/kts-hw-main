'use client';

import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import styles from './Card.module.scss';

type CardSkeletonProps = {
  className?: string;
};

const CardSkeleton: React.FC<CardSkeletonProps> = ({ className }) => {
  return (
    <article className={classNames(styles.card, className)}>
      <div className={styles['card__image-wrapper']}>
        <Skeleton height="100%" borderRadius={0} />
      </div>
      <div className={styles['card__content']}>
        <div className={styles['card__content-text']}>
          <Skeleton width="30%" />
          <Skeleton />
          <Skeleton count={2} />
        </div>
        <div className={styles['card__content-action']}>
          <Skeleton width={60} height={22} />
          <Skeleton width={100} height={36} borderRadius={8} />
        </div>
      </div>
    </article>
  );
};

export default CardSkeleton;
